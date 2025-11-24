// /models/Blog.js
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        content: { type: String, required: true },
        imageUrl: {
            type: String,
            default: null
        },
        author: { type: String, default: "Unknown Author" },
        authorUid: { type: String, required: true },
        authorEmail: { type: String },
    },
    { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
