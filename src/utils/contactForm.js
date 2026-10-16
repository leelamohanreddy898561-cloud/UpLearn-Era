import { CONTACT_FORM, SITE } from "../data/site";

export function isFormConfigured() {
  return Boolean(CONTACT_FORM.accessKey.trim());
}

/**
 * Sends a contact message straight to the site owner's inbox.
 *
 * The visitor's browser can never send email by itself, so the message is
 * handed to a form-to-email service (Web3Forms), whose server then delivers it
 * to the address the access key was created with. The visitor sees a plain
 * success message — no mail app is ever opened.
 *
 * Throws with a human-readable message so the UI can show a real failure
 * instead of pretending the message was sent.
 */
export async function sendContactMessage(form) {
  if (!isFormConfigured()) {
    throw new Error(
      `Message delivery is not switched on yet. Please email us directly at ${SITE.email}.`
    );
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
        replyto: form.email, // so "Reply" goes straight back to the customer
        topic: form.topic,
        message: form.message,
      }),
    });
  } catch {
    throw new Error(
      `Could not reach the mail service. Check your connection and try again, or email us at ${SITE.email}.`
    );
  }

  const result = await response.json().catch(() => ({}));

  if (response.ok && result.success) return { ok: true };

  // Bots that trip the honeypot are told nothing — no point confirming.
  if (result.message?.toLowerCase().includes("bot")) return { ok: true };

  throw new Error(
    result.message ||
      `Sending failed (error ${response.status}). Please try again, or email us at ${SITE.email}.`
  );
}