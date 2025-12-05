import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
// import User from "@/models/users";

export async function POST(req) {
  try {
    await connectDB();

    const { uid, blogId } = await req.json();

    if (!uid || !blogId) {
      return NextResponse.json(
        { error: "Missing uid or blogId" },
        { status: 400 }
      );
    }

    // ✅ FIND USER BY FIREBASE UID
    const user = await User.findOne({ uid });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const isBookmarked = user.bookmarks.some(
      (id) => id.toString() === blogId
    );

    if (isBookmarked) {
      // ✅ REMOVE
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== blogId
      );
    } else {
      // ✅ ADD
      user.bookmarks.push(blogId);
    }

    await user.save();

    return NextResponse.json({
      success: true,
      bookmarked: !isBookmarked,
    });

  } catch (err) {
    console.error("BOOKMARK TOGGLE ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
