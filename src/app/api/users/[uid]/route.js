// /app/api/users/[uid]/route.js
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { d } from "@/middleware/withAuth";
import { withAuth } from "@/middleware/withAuth";

/**
 * GET /api/users/[uid]
 * Fetch user data by UID
 * Protected: User can only fetch their own data (unless admin)
 */
export const GET = withAuth(async (req, { params, user }) => {
  try {
    await connectDB();

    const { uid } = await params;

    // 🔒 Security: Users can only access their own data (unless admin)
    if (user.uid !== uid && user.role !== "admin") {
      return new Response(
        JSON.stringify({ error: "Forbidden: You can only access your own data" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch user from database
    const dbUser = await User.findOne({ uid }).select("-_id uid name email photoURL role createdAt").lean();

    if (!dbUser) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(dbUser),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("GET /api/users/[uid] error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});