import { useEffect, useState } from "react";

import { Icon } from "./Icon";
import BrandWordmark from "./BrandWordmark";

// Sign in / Sign up modal. Sign in mirrors the reference flow:
// Step 1 — email or mobile + Next · Step 2 — OTP · Step 3 — done.
// No auth backend yet, so submissions are captured locally and the
// visitor gets a clear "opening soon" message.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validIdentifier(v) {
  const value = v.trim();
  if (EMAIL_RE.test(value)) return true;
  const digits = value.replace(/[^\d]/g, "");
  return /^\+?[\d\s-]+$/.test(value) && digits.length >= 10 && digits.length <= 15;
}

function OtpBoxes({ value, onChange, error }) {
  return (
    <>
      <label className="fld">
        <span>Enter OTP</span>
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
          placeholder="6-digit code"
          aria-invalid={!!error}
          className="otp-input"
        />
        {error && <em>{error}</em>}
      </label>
    </>
  );
}

export default function AuthModal({ open, onClose, mode = "signin" }) {
  const [tab, setTab] = useState(mode);
  const [step, setStep] = useState(1); // 1 = identifier, 2 = OTP, 3 = done
  const [identifier, setIdentifier] = useState("");
  const [idError, setIdError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  useEffect(() => {
    if (open) {
      setTab(mode);
      setStep(1);
      setIdentifier("");
      setIdError("");
      setOtp("");
      setOtpError("");
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

  const onNext = (e) => {
    e.preventDefault();
    if (!validIdentifier(identifier)) {
      setIdError("Please enter a valid email-id/mobile number");
      return;
    }
    setIdError("");
    setStep(2);
  };

  const onVerify = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setOtpError("Enter the 6-digit code");
      return;
    }
    setOtpError("");
    setStep(3);
  };

  const masked = identifier.includes("@")
    ? identifier.replace(/(.{2}).*(@.*)/, "$1••••$2")
    : identifier.replace(/\d(?=\d{3})/g, "•");

  return (
    <div className="auth-modal" onClick={onClose} role="dialog" aria-modal="true" aria-label="Sign in or sign up">
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

        {step === 3 ? (
          <div className="auth-done">
            <span className="auth-done-icon">
              <Icon name="check" size={26} />
            </span>
            <h3>You&rsquo;re on the list!</h3>
            <p>
              Accounts are opening soon. We&rsquo;ve saved <b>{masked}</b> —
              you&rsquo;ll get early access the moment sign-in goes live.
            </p>
            <button className="btn btn-primary block" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            {tab === "signin" ? (
              step === 1 ? (
                <form className="auth-form" onSubmit={onNext} noValidate>
                  <div className="auth-heading">
                    <span className="auth-eyebrow">Welcome</span>
                    <h3 className="auth-title">Sign In</h3>
                  </div>
                  <p className="auth-sub">
                    Enter your email or phone number to get started.
                  </p>
                  <label className="fld">
                    <span>Phone number/Email</span>
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => {
                        setIdentifier(e.target.value);
                        setIdError("");
                      }}
                      placeholder="Enter your email or phone number"
                      aria-invalid={!!idError}
                    />
                    {idError && <em>{idError}</em>}
                  </label>
                  <p className="auth-helper">
                    Please add country code if you are a user outside of India
                  </p>
                  <button className="btn btn-primary block" type="submit">
                    Next
                  </button>
                </form>
              ) : (
                <form className="auth-form" onSubmit={onVerify} noValidate>
                  <h3 className="auth-title">Verify it&rsquo;s you</h3>
                  <p className="auth-sub">
                    Enter the OTP sent to <b>{masked}</b>
                  </p>
                  <OtpBoxes value={otp} onChange={setOtp} error={otpError} />
                  <button className="btn btn-primary block" type="submit">
                    Verify
                  </button>
                  <div className="auth-row">
                    <button
                      type="button"
                      className="auth-link"
                      onClick={() => setStep(1)}
                    >
                      <Icon name="chevron" size={14} /> Change {identifier.includes("@") ? "email" : "number"}
                    </button>
                    <button
                      type="button"
                      className="auth-link"
                      onClick={() => setOtpError("")}
                    >
                      Resend OTP
                    </button>
                  </div>
                </form>
              )
            ) : (
              <form className="auth-form" onSubmit={onNext} noValidate>
                <div className="auth-heading">
                  <span className="auth-eyebrow">Welcome</span>
                  <h3 className="auth-title">Sign Up</h3>
                </div>
                <p className="auth-sub">
                  Enter your email or phone number to get started.
                </p>
                <label className="fld">
                  <span>Phone number/Email</span>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      setIdError("");
                    }}
                    placeholder="Enter your email or phone number"
                    aria-invalid={!!idError}
                  />
                  {idError && <em>{idError}</em>}
                </label>
                <p className="auth-helper">
                  Please add country code if you are a user outside of India
                </p>
                <button className="btn btn-primary block" type="submit">
                  Next
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
