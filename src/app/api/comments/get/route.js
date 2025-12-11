import { NextResponse } from "next/server";
// import connectDB from "@/lib/connectDB";
import Comment from "@/models/Comment";
import connectDB from "@/lib/mongodb";

export async function GET(req) {
    await connectDB();

    const blogId = req.nextUrl.searchParams.get("blogId");

    const comments = await Comment.find({ blogId }).sort({ createdAt: -1 });

    return NextResponse.json({ comments });
}
