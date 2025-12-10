// // import { authAdmin } from "./firebaseAdmin";
// // import User from "@/models/User";

// import User from "@/models/User";
// import { adminDb } from "./auth/firebaseAdmin";

// export async function verifyUser(req) {
//   try {
//     const authHeader = req.headers.get("authorization") || "";
//     const token = authHeader.startsWith("Bearer ")
//       ? authHeader.split("Bearer ")[1]
//       : null;

//     if (!token) {
//       return { error: "No token provided", status: 401 };
//     }

//     // Verify Firebase token
//     const decoded = await adminDb.verifyIdToken(token);
//     if (!decoded || !decoded.uid) {
//       return { error: "Invalid token", status: 401 };
//     }

//     // Find user in MongoDB
//     const dbUser = await User.findOne({ uid: decoded.uid });
//     if (!dbUser) {
//       return { error: "User not found in database", status: 401 };
//     }

//     return { user: dbUser };
//   } catch (err) {
//     console.error("verifyUser error:", err);
//     return { error: "Invalid or expired token", status: 401 };
//   }
// }





// // import { authAdmin } from "./firebaseAdmin";

// // import { authAdmin } from "./firebaseAdmin";

// // export async function verifyUser(req) {
// //   const authHeader = req.headers.get("authorization") || "";
// //   const token = authHeader.startsWith("Bearer ") ? authHeader.split("Bearer ")[1] : null;
// //   if (!token) throw new Error("No token provided");

// //   const decoded = await authAdmin.verifyIdToken(token);
// //   return decoded; // contains uid, email, etc.
// // }


