import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { Icon } from "./Icon";
import BrandWordmark from "./BrandWordmark";
import { auth, FIREBASE_READY } from "../utils/firebase";
import { useToast } from "./Toast";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.2c0-.8-.1-1.6-.2-2.3H12v4.5h6.4a5.5 5.5 0 01-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.8z" />
      <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3a7.2 7.2 0 01-10.7-3.8H1.3v3.1A12 12 0 0012 24z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 010-4.6V6.6H1.3a12 12 0 000 10.8l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.5-3.5A12 12 0 001.3 6.6l4 3.1A7.2 7.2 0 0112 4.8z" />
    </svg>
  );
}

// common email typos: suggest the right domain before the user is locked out
const COMMON_DOMAINS = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "rediffmail.com", "proton.me"];

function domainDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] !== b[j - 1] ? 1 : 0));
  return dp[a.length][b.length];
}

function suggestEmail(email) {
  const at = email.lastIndexOf("@");
  if (at < 0) return null;
  const local = email.slice(0, at);
  const domain = email.slice(at + 1).toLowerCase();
  if (!local || !domain || COMMON_DOMAINS.includes(domain)) return null;
  for (const d of COMMON_DOMAINS) {
    if (domainDistance(domain, d) <= 2) return `${local}@${d}`;
  }
  return null;
}

export default function AuthModal({ open, onClose, mode = "signin", onGoogle, onUserSaved }) {
  const [toast, toastEl] = useToast();
  const [tab, setTab] = useState(mode);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (open) {
      setTab(mode);
      setErrors({});
      setForm({ name: "", email: "", password: "" });
    }
  }, [open, mode]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.classList.add("no-scroll");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
    };
  }, [open, onClose]);

  if (!open) return null;

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined, form: undefined }));
  };

  const firebaseError = (err) => {
    const map = {
      "auth/invalid-email": "Enter a valid email address.",
      "auth/missing-password": "Enter your password.",
      "auth/weak-password": "Use at least 6 characters.",
      "auth/email-already-in-use": "This email already has an account — try Sign In.",
      "auth/invalid-credential": "Wrong email or password.",
      "auth/user-not-found": "No account with this email — try Sign Up.",
      "auth/wrong-password": "Wrong email or password.",
      "auth/popup-closed-by-user": "Google popup was closed.",
      "auth/popup-blocked": "Allow popups for this site, then try again.",
      "auth/unauthorized-domain": "This domain isn't authorized in Firebase yet.",
    };
    return map[err.code] || err.message || "Something went wrong. Try again.";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!auth) {
      setErrors({ form: "Sign in is being connected — check back soon!" });
      return;
    }
    const next = {};
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      next.email = "Enter a valid email address.";
    if (form.password.length < 6) next.password = "Use at least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setBusy(true);
    try {
      if (tab === "signup") {
        const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
        // The name field used to be collected and then thrown away. Attach it
        // to the profile so the lead record carries a real name.
        if (form.name.trim()) {
          await updateProfile(cred.user, { displayName: form.name.trim() });
          // The auth listener already fired before the profile existed, so
          // re-save the lead now that the name is on the user.
          onUserSaved?.(cred.user);
        }
        await sendEmailVerification(cred.user);
        toast("Account created — verify via the email we sent!");
      } else {
        await signInWithEmailAndPassword(auth, form.email, form.password);
        toast("Signed in — welcome back!");
      }
      onClose();
    } catch (err) {
      setErrors({ form: firebaseError(err) });
    } finally {
      setBusy(false);
    }
  };

  const resetPassword = async () => {
    if (!auth) {
      setErrors({ form: "Password reset is being connected — check back soon!" });
      return;
    }
    if (!form.email) {
      setErrors({ email: "Enter your email first, then tap Forgot password." });
      return;
    }
    setBusy(true);
    try {
      await sendPasswordResetEmail(auth, form.email);
      toast("Reset link sent — check your inbox");
      onClose();
    } catch (err) {
      setErrors({ form: firebaseError(err) });
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    if (!FIREBASE_READY) {
      setErrors({ form: "Google sign in is being connected — check back soon!" });
      return;
    }
    setBusy(true);
    try {
      await onGoogle();
      toast("Signed in with Google!");
      onClose();
    } catch (err) {
      setErrors({ form: firebaseError(err) });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-modal" onClick={onClose} role="dialog" aria-modal="true" aria-label="Sign in or sign up">
      {toastEl}
      <div className="auth-card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose} aria-label="Close">
          <Icon name="close" size={18} />
        </button>

        <div className="auth-brand">
          <span className="brand-mark sm">
            <img src="/logo.jpg" alt="" width={34} height={34} />
          </span>
          <span className="auth-brand-word">
            <BrandWordmark />
          </span>
        </div>

        <div className="auth-tabs" role="tablist">
          <button
            className={`auth-tab${tab === "signin" ? " on" : ""}`}
            onClick={() => setTab("signin")}
            role="tab"
            aria-selected={tab === "signin"}
          >
            Sign in
          </button>
          <button
            className={`auth-tab${tab === "signup" ? " on" : ""}`}
            onClick={() => setTab("signup")}
            role="tab"
            aria-selected={tab === "signup"}
          >
            Sign up
          </button>
        </div>

        <button className="btn btn-google" onClick={google} disabled={busy}>
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="auth-divider">
          <span>or use email</span>
        </div>

        <form className="auth-form" onSubmit={onSubmit} noValidate>
          {tab === "signup" && (
            <label className="fld">
              <span>Full name</span>
              <input
                type="text"
                value={form.name}
                onChange={set("name")}
                placeholder="Priya Sharma"
              />
            </label>
          )}
          <label className="fld">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="you@college.edu"
              aria-invalid={!!errors.email}
            />
            {errors.email && <em>{errors.email}</em>}
          </label>
          {suggestEmail(form.email) && (
            <button
              type="button"
              className="auth-suggest"
              onClick={() => {
                setForm((f) => ({ ...f, email: suggestEmail(f.email) }));
                setErrors((p) => ({ ...p, email: undefined }));
              }}
            >
              Did you mean <b>{suggestEmail(form.email)}</b>?
            </button>
          )}
          <label className="fld">
            <span>Password</span>
            <input
              type="password"
              value={form.password}
              onChange={set("password")}
              placeholder="At least 6 characters"
              aria-invalid={!!errors.password}
            />
            {errors.password && <em>{errors.password}</em>}
          </label>
          {tab === "signin" && (
            <button type="button" className="auth-forgot" onClick={resetPassword}>
              Forgot password?
            </button>
          )}
          {errors.form && <p className="auth-form-error">{errors.form}</p>}
          <button className="btn btn-primary block" type="submit" disabled={busy}>
            {busy ? "Please wait…" : tab === "signup" ? "Create account" : "Sign in"}
          </button>
        </form>

        <p className="auth-note">
          {tab === "signup"
            ? "Already have an account? "
            : "New to UpLearn Era? "}
          <button className="auth-link" onClick={() => setTab(tab === "signup" ? "signin" : "signup")}>
            {tab === "signup" ? "Sign in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}
