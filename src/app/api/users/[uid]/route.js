import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { verifyUser } from "@/lib/verifyUser";

export async function GET(req, { params }) {
  await connectDB();

  const decoded = await verifyUser(req);
  if (!decoded) return new Response("Unauthorized", { status: 401 });

  // unwrap params
  const actualParams = await params; // <--- fix here
  const user = await User.findOne({ uid: actualParams.uid }).lean();

  if (!user) return new Response("Not found", { status: 404 });

  return new Response(JSON.stringify(user), { status: 200 });
}
