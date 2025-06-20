import { db } from "./firebase";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

// Generate a unique test session and save initial data
export async function createTestSession(userData) {
  const id = crypto.randomUUID();
  await setDoc(doc(collection(db, "testSessions"), id), {
    userData,
    answers: {},
    createdAt: Date.now(),
  });
  return id;
}

// Save progress for a session
export async function saveTestProgress(id, data) {
  await setDoc(doc(db, "testSessions", id), data, { merge: true });
}

// Load progress for a session
export async function loadTestProgress(id) {
  const snap = await getDoc(doc(db, "testSessions", id));
  if (snap.exists()) return snap.data();
  return null;
}
