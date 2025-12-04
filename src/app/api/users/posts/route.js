import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog"; // Assuming you have a Blog model
import { verifyUser } from "@/lib/verifyUser"; // Assuming this verifies a JWT/Session

// GET request to fetch posts by authorUid
export async function GET(req) {
    try {
        await connectDB();

        let decoded;
        try {
            decoded = await verifyUser(req);
        } catch (err) {
            return new Response(
                JSON.stringify({ message: "Unauthorized: Invalid token" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        if (!decoded) {
            return new Response(
                JSON.stringify({ message: "Unauthorized" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        const { searchParams } = new URL(req.url);
        const authorUid = searchParams.get("authorUid");

        if (!authorUid) {
            return new Response(
                JSON.stringify({ message: "Missing authorUid parameter." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        if (authorUid !== decoded.uid) {
            return new Response(
                JSON.stringify({ message: "Forbidden: Cannot access other users' posts." }),
                { status: 403, headers: { "Content-Type": "application/json" } }
            );
        }

        const posts = await Blog.find({ authorUid })
            .select("_id title slug status readingTime createdAt updatedAt author authorImage")
            .sort({ createdAt: -1 })
            .lean();

        return new Response(
            JSON.stringify({ success: true, data: posts }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
        console.error("API error fetching user posts:", error);
        return new Response(
            JSON.stringify({ message: "Internal server error." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
