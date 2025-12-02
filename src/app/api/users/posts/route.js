import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog"; // Assuming you have a Blog model
import { verifyUser } from "@/lib/verifyUser"; // Assuming this verifies a JWT/Session

// GET request to fetch posts by authorUid
export async function GET(req) {
    await connectDB();

    // 1. Authorization: This is a protected route since we are in the private profile
    const decoded = await verifyUser(req);
    if (!decoded) {
        return new Response(JSON.stringify({ message: "Unauthorized: Missing or invalid token." }), { status: 401 });
    }

    try {
        // 2. Extract authorUid from URL query parameters
        const { searchParams } = new URL(req.url);
        const authorUid = searchParams.get('authorUid');

        if (!authorUid) {
            return new Response(JSON.stringify({ message: "Missing authorUid parameter." }), { status: 400 });
        }

        // 3. Security check: Ensure the requested UID matches the authenticated user's UID
        if (authorUid !== decoded.uid) {
            return new Response(JSON.stringify({ message: "Forbidden: Cannot access other users' posts." }), { status: 403 });
        }

        // 4. Fetch the posts.
        // MODIFICATION: Selecting fields, INCLUDING author and authorImage 
        const posts = await Blog.find({ authorUid: authorUid })
            .select('_id title slug status readingTime createdAt updatedAt author authorImage') 
            .sort({ createdAt: -1 }) 
            .lean(); 

        // 5. Success Response
        return new Response(JSON.stringify({ success: true, data: posts }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("API error fetching user posts:", error);
        return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}