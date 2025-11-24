// import { authAdmin } from "./firebaseAdmin";

import { authAdmin } from "./firebaseAdmin";

export async function verifyUser(req) {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split("Bearer ")[1] : null;
  if (!token) throw new Error("No token provided");

  const decoded = await authAdmin.verifyIdToken(token);
  return decoded; // contains uid, email, etc.
}
