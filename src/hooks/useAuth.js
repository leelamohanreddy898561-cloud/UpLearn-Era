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

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const saveUser = async (u) => {
    if (!db || !u) return;
    try {
      await setDoc(
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
    } catch {
      // sign-in already succeeded — never block the user on the email list
    }
  };

  const googleSignIn = async () => {
    if (!auth) throw new Error("Setup in progress");
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    await saveUser(result.user);
    return result.user;
  };

  const logout = () => (auth ? signOut(auth) : Promise.resolve());

  const resendVerification = async () => {
    if (!auth?.currentUser) return;
    await sendEmailVerification(auth.currentUser);
  };

  return { user, loading, googleSignIn, logout, resendVerification };
}
