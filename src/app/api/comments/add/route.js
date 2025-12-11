import { NextResponse } from "next/server";
// import connectDB from "@/lib/connectDB";
import Comment from "@/models/Comment";
import connectDB from "@/lib/mongodb";

export async function POST(req) {
    await connectDB();
    const { blogId, uid, username, photoURL, comment } = await req.json();

    if (!comment.trim()) {
        return NextResponse.json({ error: "Comment cannot be empty" });
    }

    const newComment = await Comment.create({
        blogId,
        uid,
        username,
        photoURL,
        comment,
    });

    return NextResponse.json({ success: true, newComment });
}
