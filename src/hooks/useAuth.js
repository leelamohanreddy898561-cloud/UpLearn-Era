import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth, db, FIREBASE_READY } from "../utils/firebase";

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
    });
    return unsub;
  }, []);

  // Store the user for the email list. NEVER awaited by sign-in — Firestore
  // can hang when the API is disabled, and the login must never depend on it.
  // A hard timeout keeps it from blocking anything, even in the background.
  const saveUser = (u) => {
    if (!db || !u) return Promise.resolve();
    const write = setDoc(
      doc(db, "users", u.uid),
      {
        email: u.email || "",
        name: u.displayName || "",
        photo: u.photoURL || "",
        provider: u.providerData?.[0]?.providerId || "",
        lastLoginAt: serverTimestamp(),
      },
      { merge: true }
    );
    const timeout = new Promise((resolve) => setTimeout(resolve, 5000));
    return Promise.race([write, timeout]).catch(() => {});
  };

  const googleSignIn = async () => {
    if (!auth) throw new Error("Setup in progress");
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    // fire-and-forget: sign-in returns immediately, the list save runs in the
    // background and can never freeze the modal again
    saveUser(result.user);
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

  return { user, loading, googleSignIn, logout, resendVerification, refreshUser };
}
