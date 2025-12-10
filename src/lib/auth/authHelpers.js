import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

// Register new user
export async function registerUser(name, email, password, photoURL = "") {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, {
    displayName: name,
    photoURL: photoURL || "",
  });

  // Sync user to your MongoDB
  const token = await userCredential.user.getIdToken();
  await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      uid: userCredential.user.uid,
      name,
      email,
      photoURL,
      role: "user",
    }),
  });

  return userCredential.user;
}

// Login user
export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// Logout user
export async function logoutUser() {
  await signOut(auth);
}

// Listen to auth state changes
export function subscribeToAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

// Get fresh token (use this before API calls)
export async function getAuthToken() {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user");
  return await user.getIdToken(true); // Force refresh
}