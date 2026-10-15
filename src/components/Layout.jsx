import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { Icon } from "./Icon";
import AuthModal from "./AuthModal";
import BrandWordmark from "./BrandWordmark";
import { NAV_GROUPS, SITE, SOCIALS } from "../data/site";
import { readTheme, applyTheme } from "../utils/theme";
import { useAuth } from "../hooks/useAuth";
import { useInstallPrompt, isIOS } from "../hooks/useInstallPrompt";

const NAV_ITEMS = NAV_GROUPS.flatMap((g) => g.items);

function ThemeToggle() {
  const [theme, setTheme] = useState(() => readTheme());

  const toggle = () =>
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });

  const label = `Switch to ${theme === "dark" ? "light" : "dark"} theme`;
  return (
    <button className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
      <Icon name="moon" size={18} className="icon-moon" />
      <Icon name="sun" size={18} className="icon-sun" />
    </button>
  );
}

// Install-app button + how-to modal (native Chrome prompt when available,
// manual steps for iOS / browsers that do not fire the prompt).
function InstallAppButton() {
  const { canInstall, installed, promptInstall } = useInstallPrompt();
  const [modal, setModal] = useState(false);
  const ios = isIOS();

  if (installed) return null;

  const openInstall = async () => {
    if (canInstall) {
      await promptInstall();
      return;
    }
    setModal(true);
  };

  return (
    <>
      <button
        className="btn btn-install"
        onClick={openInstall}
        title="Install UpLearn Era as an app"
      >
        <Icon name="download" size={16} />
        <span>Install App</span>
      </button>
      {modal && (
        <div
          className="install-modal"
          onClick={() => setModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Install instructions"
        >
          <div className="install-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="auth-close"
              onClick={() => setModal(false)}
              aria-label="Close"
            >
              <Icon name="close" size={18} />
            </button>
            <span className="brand-mark sm">
              <img src="/logo.jpg" alt="" width={34} height={34} />
            </span>
            <h3>Install UpLearn Era</h3>
            <p>Add the app to your home screen for the full app experience.</p>
            {ios ? (
              <ol className="install-steps">
                <li>
                  Tap the <b>Share</b> button in Safari&rsquo;s toolbar
                </li>
                <li>
                  Scroll down and tap <b>Add to Home Screen</b>
                </li>
                <li>
                  Tap <b>Add</b> — done!
                </li>
              </ol>
            ) : (
              <ol className="install-steps">
                <li>
                  Open the browser menu (the <b>&#8942;</b> or <b>&#8943;</b> button)
                </li>
                <li>
                  Tap <b>Add to Home screen</b> or <b>Install app</b>
                </li>
                <li>
                  Tap <b>Install</b> — done!
                </li>
              </ol>
            )}
            <button className="btn btn-primary block" onClick={() => setModal(false)}>
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Banner for signed-in-but-unverified users. Once the user clicks the email
// link and taps "I've verified", refreshUser() re-checks the server status —
// verified users never see this banner again.
function VerifyBanner({ user, onResend, onRefresh }) {
  const [dismissed, setDismissed] = useState(false);
  const [sent, setSent] = useState(false);
  const [checking, setChecking] = useState(false);
  const [notYet, setNotYet] = useState(false);

  if (!user || user.emailVerified || dismissed) return null;

  const checkVerified = async () => {
    setChecking(true);
    setNotYet(false);
    try {
      const ok = await onRefresh();
      if (!ok) setNotYet(true); // still unverified on the server
    } catch {
      setNotYet(true);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="verify-banner">
      <div className="wrap verify-in">
        <span className="vb-icon">
          <Icon name="mail" size={18} />
        </span>
        <p>
          <b>Verify your email</b> — we sent a confirmation link to{" "}
          <b>{user.email}</b>. Open the link in your inbox, then tap
          &ldquo;I&rsquo;ve verified&rdquo; below.
        </p>
        <div className="vb-actions">
          {notYet && (
            <span className="vb-notyet">
              Not yet — click the link in your inbox first
            </span>
          )}
          <button
            className="btn btn-sm btn-primary"
            onClick={async () => {
              try {
                await onResend();
                setSent(true);
              } catch {
                setSent(true);
              }
            }}
          >
            {sent ? "Link sent!" : "Resend link"}
          </button>
          <button
            className="btn btn-sm btn-ghost"
            onClick={checkVerified}
            disabled={checking}
          >
            {checking ? "Checking…" : "I’ve verified"}
          </button>
          <button
            className="vb-close"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
          >
            <Icon name="close" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function UserMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const initial = (user.displayName || user.email || "U")[0].toUpperCase();

  return (
    <div className={`user-menu${open ? " open" : ""}`}>
      <button
        className="user-avatar"
        onClick={() => setOpen((o) => !o)}
        aria-label="Account menu"
        aria-expanded={open}
      >
        {user.photoURL ? (
          <img src={user.photoURL} alt="" width={34} height={34} referrerPolicy="no-referrer" />
        ) : (
          <span>{initial}</span>
        )}
      </button>
      {open && (
        <div className="user-dropdown">
          <div className="ud-head">
            <b>{user.displayName || "Learner"}</b>
            <small>{user.email}</small>
          </div>
          <Link to="/courses" onClick={() => setOpen(false)}>
            <Icon name="book" size={15} /> My courses
          </Link>
          <a href={`mailto:${SITE.email}`} onClick={() => setOpen(false)}>
            <Icon name="mail" size={15} /> Help
          </a>
          <button onClick={onLogout} className="ud-signout">
            <Icon name="external" size={15} /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}

function Header({ open, onToggle, onAuth, user, onLogout }) {
  return (
    <header className="site-header">
      <div className="wrap nav-in">
        <button
          className={`burger${open ? " on" : ""}`}
          onClick={onToggle}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <Icon name={open ? "close" : "menu"} size={22} />
        </button>

        <Link to="/" className="brand" aria-label={`${SITE.name} — home`}>
          <span className="brand-mark">
            <img src="/logo.jpg" alt="" width={40} height={40} />
          </span>
          <span className="brand-text">
            <BrandWordmark />
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <InstallAppButton />
          {user ? (
            <UserMenu user={user} onLogout={onLogout} />
          ) : (
            <>
              <button
                className="btn btn-auth-outline"
                onClick={() => onAuth("signin")}
              >
                Sign in
              </button>
              <button className="btn btn-auth" onClick={() => onAuth("signup")}>
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

// Mobile navigation drawer (mirrors the reference site's hamburger menu).
function MobileDrawer({ open, onClose, onAuth, user, onLogout }) {
  return (
    <div className={`mobile-drawer${open ? " open" : ""}`} aria-hidden={!open}>
      <nav aria-label="Mobile">
        {NAV_GROUPS.map((group) => (
          <div className="md-group" key={group.label}>
            <span className="md-label">{group.label}</span>
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => `md-item${isActive ? " active" : ""}`}
                onClick={onClose}
              >
                <span className="md-icon">
                  <Icon name={item.icon} size={19} />
                </span>
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <div className="md-auth">
        {user ? (
          <>
            <span className="md-user">{user.email}</span>
            <button className="btn btn-auth-outline" onClick={onLogout}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-auth-outline"
              onClick={() => {
                onClose();
                onAuth("signin");
              }}
            >
              Sign in
            </button>
            <button
              className="btn btn-auth"
              onClick={() => {
                onClose();
                onAuth("signup");
              }}
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot-grid">
        <div className="foot-col">
          <Link to="/" className="foot-brand">
            <span className="brand-mark sm">
              <img src="/logo.jpg" alt="" width={34} height={34} />
            </span>
            <span className="foot-brand-word">
              <BrandWordmark onDark />
            </span>
          </Link>
          <p className="foot-p">{SITE.description}</p>
          <div className="foot-social">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                title={s.label}
              >
                <Icon name={s.icon} size={18} fill />
              </a>
            ))}
          </div>
        </div>

        <div className="foot-col">
          <h5>Explore</h5>
          {NAV_ITEMS.map((i) => (
            <Link key={i.to} to={i.to}>
              {i.label}
            </Link>
          ))}
        </div>

        <div className="foot-col">
          <h5>Say hello</h5>
          <a className="foot-p" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          <a className="foot-p" href={SITE.youtube} target="_blank" rel="noreferrer">
            YouTube @uplearnera
          </a>
          <p className="foot-p">{SITE.location}</p>
        </div>
      </div>

      <div className="foot-bottom">
        <div className="wrap">
          <p>
            &copy; {SITE.since}–2026 Up Learn Era · Built for B.Tech students who
            learn by building
          </p>
        </div>
      </div>
    </footer>
  );
}

// App shell: top bar + header, mobile drawer, main content, footer.
export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [authMode, setAuthMode] = useState(null); // null | "signin" | "signup"
  const { user, googleSignIn, logout, resendVerification, refreshUser } = useAuth();

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  // close the drawer if the window grows to desktop width
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1080 && open) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  return (
    <div className="layout">
      <Header
        open={open}
        onToggle={() => setOpen((o) => !o)}
        onAuth={setAuthMode}
        user={user}
        onLogout={logout}
      />
      <VerifyBanner user={user} onResend={resendVerification} onRefresh={refreshUser} />
      <div
        className={`drawer-overlay${open ? " open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <MobileDrawer
        open={open}
        onClose={() => setOpen(false)}
        onAuth={setAuthMode}
        user={user}
        onLogout={logout}
      />
      <main className="main">{children}</main>
      <Footer />
      <AuthModal
        open={authMode !== null}
        mode={authMode || "signin"}
        onGoogle={googleSignIn}
        onClose={() => setAuthMode(null)}
      />
    </div>
  );
}
