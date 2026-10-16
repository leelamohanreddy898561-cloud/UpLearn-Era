import { useState } from "react";

import { Icon } from "../components/Icon";
import { PageHead, SectionHead } from "../components/ui";
import { useToast } from "../components/Toast";
import { SITE, SOCIALS } from "../data/site";
import { sendContactMessage } from "../utils/contactForm";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FAQS = [
  {
    q: "Are the courses beginner friendly?",
    a: "Yes. If you can write a for-loop, you can start with Python for AI and work up. Every course lists its level, and each lesson links the videos it assumes.",
  },
  {
    q: "Do free videos cover the same topics as paid courses?",
    a: "The channel covers a lot for free, but courses add structure, complete source code, project guides and doubt replies — the accountability that finishes a track.",
  },
  {
    q: "Can I request a video or project topic?",
    a: "Please do. Send it through this form or comment on YouTube. Requests get voted on by the community and the best ones get scheduled.",
  },
  {
    q: "I'm stuck on a college project — can you help?",
    a: "Send the error, what you expected, and what you tried. Specific questions get answered; 'send me the full code' ones don't. Debugging with you is how you learn it.",
  },
];

export default function ContactPage() {
  const [toast, toastEl] = useToast();
  const EMPTY_FORM = {
    name: "",
    email: "",
    topic: "Course question",
    message: "",
    botcheck: "",
  };

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(form.email)) next.email = "Enter a valid email address.";
    if (form.message.trim().length < 15)
      next.message = "A little more detail helps — at least 15 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (sending || !validate()) return;
    setSending(true);
    setError("");
    try {
      const { method } = await sendContactMessage(form);
      setSent(true);
      toast(
        method === "mailto"
          ? "Opening your mail app — press send there"
          : "Message sent — we usually reply within 2 days"
      );
      setForm(EMPTY_FORM);
    } catch (err) {
      setError(err.message);
      toast("Message could not be sent. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="page">
      {toastEl}
      <div className="wrap">
        <PageHead
          current="Contact"
          title="Contact"
          sub="Questions about a course, a bug in a project repo, or a topic you want covered — send it over."
        />

        <div className="contact">
          <div className="c-cards">
            <a className="c-card" href={`mailto:${SITE.email}`}>
              <span className="c-icon">
                <Icon name="mail" size={20} />
              </span>
              <span className="c-label">Email</span>
              <b>{SITE.email}</b>
              <small>Best for detailed questions</small>
            </a>
            <a className="c-card" href={SITE.youtube} target="_blank" rel="noreferrer">
              <span className="c-icon">
                <Icon name="youtube" size={20} fill />
              </span>
              <span className="c-label">YouTube</span>
              <b>@uplearnera</b>
              <small>Comments get answered fastest</small>
            </a>
            <div className="c-card static">
              <span className="c-icon">
                <Icon name="pin" size={20} />
              </span>
              <span className="c-label">Based in</span>
              <b>{SITE.location}</b>
              <small>DM for collaboration</small>
            </div>
          </div>

          <form className="c-form" onSubmit={onSubmit} noValidate>
            <h3>Send a message</h3>

            <div className="two">
              <label className="fld">
                <span>Your name</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Priya Sharma"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <em>{errors.name}</em>}
              </label>
              <label className="fld">
                <span>Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="uplearnera@gmail.com"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <em>{errors.email}</em>}
              </label>
            </div>

            <label className="fld">
              <span>Topic</span>
              <select value={form.topic} onChange={set("topic")}>
                <option>Course question</option>
                <option>Video request</option>
                <option>Project help</option>
                <option>Collaboration</option>
                <option>Something else</option>
              </select>
            </label>

            <label className="fld">
              <span>Message</span>
              <textarea
                rows={6}
                value={form.message}
                onChange={set("message")}
                placeholder="Paste the error, what you expected, and what you already tried."
                aria-invalid={!!errors.message}
              />
              {errors.message && <em>{errors.message}</em>}
            </label>

            {/* spam trap — hidden from people, tempting for bots */}
            <label className="hp" aria-hidden="true">
              <span>Leave this field empty</span>
              <input
                type="text"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                value={form.botcheck}
                onChange={set("botcheck")}
              />
            </label>

            <button className="btn btn-primary block" type="submit" disabled={sending}>
              <Icon name="arrowRight" size={16} />
              {sending ? "Sending…" : "Send message"}
            </button>
            <p className="fine">
              Messages land straight in our inbox at {SITE.email}. We usually
              reply within 2 days.
            </p>

            {error && (
              <div className="done err">
                <b>
                  <Icon name="info" size={15} /> Could not send
                </b>
                <span>
                  {error} You can also write to us directly at{" "}
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
                </span>
              </div>
            )}

            {sent && !error && (
              <div className="done">
                <b>
                  <Icon name="checkCircle" size={15} /> Message sent
                </b>
                <span>
                  Thanks {form.name ? "" : ""}— we got it and will reply to your
                  email address soon.
                </span>
              </div>
            )}
          </form>
        </div>

        <div className="faq-wrap">
          <SectionHead tag="FAQ" title="Before you ask" />
          <div className="faq">
            {FAQS.map((f, i) => (
              <details className="faq-item" key={f.q} open={i === 0}>
                <summary>
                  {f.q}
                  <Icon name="chevron" size={16} />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>

          <div className="social-strip">
            <span>Elsewhere:</span>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
                <Icon name={s.icon} size={16} fill /> {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
