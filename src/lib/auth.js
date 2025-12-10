// // lib/auth.js
// import { auth } from "./firebase";
// import {
//   createUserWithEmailAndPassword,
//   updateProfile,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";

// // Register new user
// export async function registerUser(name, email, password) {
//   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//   await updateProfile(userCredential.user, { displayName: name });
//   return userCredential.user;
// }

// // Login user
// export async function loginUser(email, password) {
//   const userCredential = await signInWithEmailAndPassword(auth, email, password);
//   return userCredential.user;
// }

// // Logout user
// export async function logoutUser() {
//   await signOut(auth);
// }

// // Listen for auth state changes
// export function subscribeToAuth(callback) {
//   return onAuthStateChanged(auth, callback);
// }


