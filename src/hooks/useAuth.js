import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth, FIREBASE_READY } from "../utils/firebase";
import { saveLead } from "../utils/firestore";

// Tracks the signed-in user across the app and stores each user in the
// Firestore "users" collection (the lead/email list).
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(FIREBASE_READY);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      // Every sign-in path funnels through here — Google, email/password, a
      // brand-new signup, or a returning user — so this one spot keeps the
      // lead list complete. Previously only Google sign-in was saved, which
      // silently dropped everyone who registered with email + password.
      if (u) saveLead(u);
    });
    return unsub;
  }, []);

  // Exposed so callers can re-save after changing the profile (e.g. adding a
  // display name right after signup, which happens after the auth listener
  // has already fired).
  const saveUser = (u) => saveLead(u);

  const googleSignIn = async () => {
    if (!auth) throw new Error("Setup in progress");
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    // fire-and-forget: sign-in returns immediately, the lead save runs in the
    // background and can never freeze the modal again
    saveLead(result.user);
    return result.user;
  };

  const logout = () => (auth ? signOut(auth) : Promise.resolve());

  const resendVerification = async () => {
    if (!auth?.currentUser) return;
    await sendEmailVerification(auth.currentUser);
  };

  // Re-fetch the user's verification status from the server. Must be called
  // after the user clicks the link in their inbox — the cached user object
  // keeps the old emailVerified value until this refresh runs.
  const refreshUser = async () => {
    const u = auth?.currentUser;
    if (!u) return false;
    await u.reload();
    forceUpdate((n) => n + 1); // force a re-render with the refreshed status
    return u.emailVerified === true;
  };

  return { user, loading, googleSignIn, logout, resendVerification, refreshUser, saveUser };
}
