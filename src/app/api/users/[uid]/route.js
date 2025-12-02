// /app/api/users/[uid]/route.js

import connectDB from "@/lib/mongodb";
// import User from "@/models/User";
import { verifyUser } from "@/lib/verifyUser";
import User from "@/models/User";
import { Route } from "lucide-react";

// export async function GET(req, { params }) {
//   await connectDB();

//   const { uid } = await params;   // ✅ params.uid comes from the URL
//   const user = await User.findOne({ uid }).lean();

//   if (!user) {
//     return new Response("Not found", { status: 404 });
//   }

//   return new Response(JSON.stringify(user), { status: 200 });
// }

export async function GET(req, { params }) {
  await connectDB();

  // ✅ Require token
  const decoded = await verifyUser(req);
  if (!decoded) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { uid } = await params;
  const user = await User.findOne({ uid }).lean();

  if (!user) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(JSON.stringify(user), { status: 200 });
}