
// /app/api/users/posts/route.js
// import { withAuth } from "@/middleware/withAuth";
import Blog from "@/models/Blog";
import connectDB from "@/lib/mongodb";
import { withAuth } from "@/middleware/withAuth";
import { NextResponse } from "next/server";

// export const GET = withAuth(async (req, { user }) => {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const authorUid = searchParams.get("authorUid");

//     // Ensure users can only fetch their own posts
//     if (authorUid !== user.uid && user.role !== "admin") {
//         return new Response(
//             JSON.stringify({ error: "Unauthorized" }),
//             { status: 403 }
//         );
//     }

//     const blogs = await Blog.find({ authorUid }).lean();

//     return new Response(
//         JSON.stringify({ data: blogs }),
//         { status: 200 }
//     );
// });

// Admin-only route example

export const GET = withAuth(async (req, { user }) => {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const authorUid = searchParams.get("authorUid");

    if (!authorUid) {
        return NextResponse.json({ error: "authorUid is missing" }, { status: 400 });
    }

    // Allow only:
    // 1️⃣ User fetching their own posts
    // 2️⃣ Admin fetching any user's posts
    if (authorUid !== user.uid && user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const blogs = await Blog.find({ authorUid }).lean();

    return NextResponse.json(
        { data: blogs },
        { status: 200 }
    );
});

export const DELETE = withAuth(
    async (req, { user }) => {
        // Only admins can delete
        // ... deletion logic
    },
    { allowedRoles: ["admin"] }
);
