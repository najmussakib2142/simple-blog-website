import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const { uid, name, email, photoURL, role } = await req.json();

    if (!uid || !name || !email) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 200,
      });
    }

    const user = await User.create({
      uid,
      name,
      email,
      photoURL: photoURL || "",
      createdAt: new Date(),
      role: role || "user",
    });

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const users = await User.find().select("-_id uid name email photoURL createdAt role");
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}