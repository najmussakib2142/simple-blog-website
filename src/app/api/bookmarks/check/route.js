import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
// import User from "@/models/users";

export async function POST(req) {
  try {
    await connectDB();

    const { uid, blogId } = await req.json();

    if (!uid || !blogId) {
      return NextResponse.json({ bookmarked: false });
    }

    const user = await User.findOne({ uid });

    if (!user) {
      return NextResponse.json({ bookmarked: false });
    }

    const isBookmarked = user.bookmarks.some(
      (id) => id.toString() === blogId
    );

    return NextResponse.json({ bookmarked: isBookmarked });

  } catch (err) {
    return NextResponse.json({ bookmarked: false });
  }
}
