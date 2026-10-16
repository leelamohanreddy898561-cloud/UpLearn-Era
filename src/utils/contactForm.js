import { CONTACT_FORM, SITE } from "../data/site";

// Builds the "mailto:" link used as a fallback when the form service is
// unreachable (or not configured yet), so a message is never lost silently.
function buildMailto({ name, email, topic, message }) {
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Topic: ${topic}`,
    "",
    message,
  ].join("\n");
  return `mailto:${SITE.email}?subject=${encodeURIComponent(
    `Website message — ${name}`
  )}&body=${encodeURIComponent(body)}`;
}

export function isFormConfigured() {
  return Boolean(CONTACT_FORM.accessKey.trim());
}

/**
 * Sends a contact message to the site owner's inbox.
 * Resolves to { ok: true, method: "web" | "mailto" } on success.
 * Throws with a human-readable message when the service rejects the send.
 */
export async function sendContactMessage(form) {
  // No access key configured yet — hand the message to the visitor's mail app.
  if (!isFormConfigured()) {
    window.location.href = buildMailto(form);
    return { ok: true, method: "mailto" };
  }

  let response;
  try {
    response = await fetch(CONTACT_FORM.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: CONTACT_FORM.accessKey.trim(),
        subject: CONTACT_FORM.subject,
        from_name: CONTACT_FORM.fromName,
        name: form.name,
        email: form.email,
        replyto: form.email, // so "Reply" goes straight to the customer
        topic: form.topic,
        message: form.message,
      }),
    });
  } catch {
    // Network/CORS/offline — fall back rather than telling the user it worked.
    window.location.href = buildMailto(form);
    return { ok: true, method: "mailto" };
  }

  const result = await response.json().catch(() => ({}));

  if (response.ok && result.success) {
    return { ok: true, method: "web" };
  }

  // Honeypot fields and similar: pretend success so bots stop trying.
  if (result.message?.toLowerCase().includes("bot")) {
    return { ok: true, method: "web" };
  }

  throw new Error(
    result.message ||
      `Sending failed (error ${response.status}). Please email us directly.`
  );
}