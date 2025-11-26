// /src/app/api/categories/route.js

import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET() {
    await connectDB();

    // your static categories list
    const categories = [
        "Tech",
        "Lifestyle",
        "Health",
        "Business",
        "Education",
        "Travel",
    ];

    // get counts from DB
    const dbCounts = await Blog.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    // convert to easy lookup
    const countMap = {};
    dbCounts.forEach((c) => {
        countMap[c._id] = c.count;
    });

    // final list → ensure categories with 0 blogs show 0
    const final = categories.map((cat) => ({
        category: cat,
        count: countMap[cat] || 0,
    }));

    return Response.json(final);
}
