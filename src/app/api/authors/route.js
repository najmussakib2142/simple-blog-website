import Blog from "@/models/Blog";

export async function GET() {
    try {
        const topAuthors = await Blog.aggregate([
            {
                $group: {
                    _id: "$authorUid",
                    authorName: { $first: "$author" },
                    authorEmail: { $first: "$authorEmail" },
                    authorImage: { $first: "$authorImage" },
                    totalBlogs: { $sum: 1 },
                },
            },
            { $sort: { totalBlogs: -1 } },
            { $limit: 5 }, // top 5 authors
        ]);

        return Response.json(topAuthors);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
