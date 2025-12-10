import { adminAuth } from "./firebaseAdmin";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";

/**
 * Verifies Firebase token and returns user data
 * @param {Request} req - Next.js request object
 * @returns {Promise<{user: Object} | {error: string, status: number}>}
 */
export async function verifyToken(req) {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.get("authorization") || "";

        if (!authHeader.startsWith("Bearer ")) {
            return { error: "Missing or invalid authorization header", status: 401 };
        }

        const token = authHeader?.split("Bearer ")[1];
        
        // Verify token with Firebase Admin
        const decodedToken = await adminAuth.verifyIdToken(token);

        if (!decodedToken?.uid) {
            return { error: "Invalid token payload", status: 401 };
        }

        // Optional: Fetch user from MongoDB for role/permissions
        await connectDB();
        const dbUser = await User.findOne({ uid: decodedToken.uid }).lean();

        return {
            user: {
                uid: decodedToken.uid,
                email: decodedToken.email,
                role: dbUser?.role || "user",
                ...dbUser, // Include other DB fields
            },
        };

    } catch (error) {
        console.error("Token verification error:", error);

        if (error.code === "auth/id-token-expired") {
            return { error: "Token expired", status: 401 };
        }

        return { error: "Authentication failed", status: 401 };
    }
}