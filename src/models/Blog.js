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
        }
    },
    { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
