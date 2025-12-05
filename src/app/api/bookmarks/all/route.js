import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

// ✅ Require both models explicitly
import User from "@/models/User";
import Blog from "@/models/Blog"; // This ensures Mongoose knows about "Blog"

export async function POST(req) {
  try {
    await connectDB();

    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json({ error: "Missing uid" }, { status: 400 });
    }

    // ✅ First, find user
    const user = await User.findOne({ uid });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // ✅ Populate bookmarks
    const populatedUser = await User.findOne({ uid }).populate("bookmarks");

    return NextResponse.json({
      success: true,
      bookmarks: populatedUser.bookmarks || [],
    });

  } catch (error) {
    console.error("🔥 BOOKMARK ALL API CRASH:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
