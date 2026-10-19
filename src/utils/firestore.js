import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { db } from "./firebase";

// Firestore collection holding the email lead list: one document per signed-in
// user, keyed by their Firebase Auth uid (so the security rules can verify
// that a visitor may only ever touch their own record).
const USERS = "users";

/**
 * Saves/updates the signed-in user in the lead list.
 *
 * Never throws and never hangs: sign-in must not depend on the database, and a
 * failed write should never leave the visitor staring at a frozen button.
 *
 * @returns {Promise<"saved" | "skipped" | "failed">}
 */
export async function saveLead(user) {
  if (!db || !user?.uid) return "skipped";
  if (!user.email) return "skipped"; // rules require a real email on create

  const email = user.email;
  const write = setDoc(
    doc(db, USERS, user.uid),
    {
      email,
      name: user.displayName || "",
      photo: user.photoURL || "",
      provider: user.providerData?.[0]?.providerId || "",
      emailVerified: Boolean(user.emailVerified),
      lastLoginAt: serverTimestamp(),
    },
    { merge: true }
  );

  const timeout = new Promise((resolve) => setTimeout(resolve, 5000));
  try {
    await Promise.race([write, timeout]);
    return "saved";
  } catch (err) {
    console.warn("[firestore] lead could not be saved:", err?.code || err);
    return "failed";
  }
}

/**
 * Reads a single lead back (own record only — the rules enforce this).
 * @returns {Promise<object|null>}
 */
export async function getLead(uid) {
  if (!db || !uid) return null;
  try {
    const snap = await getDoc(doc(db, USERS, uid));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  } catch {
    return null;
  }
}