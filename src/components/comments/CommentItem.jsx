import Image from "next/image";
import {  MessageCircle, MoreHorizontal } from "lucide-react";
import { FaHandsClapping } from "react-icons/fa6";

export default function CommentItem({ comment }) {
    return (
        <div className="p-4 border-y border-gray-200">
            {/* User info */}
            <div className="flex items-center gap-3 mb-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                        src={comment.photoURL || "/default-avatar.png"}
                        alt="avatar"
                        fill
                        className="object-cover"
                    />
                </div>

                <div>
                    <p className="font-medium text-gray-900">
                        {comment.username}
                    </p>
                    <p className="text-sm text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()} •{" "}
                        {new Date(comment.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                </div>
            </div>

            {/* Comment text */}
            <p className="text-gray-800 leading-relaxed mb-3">
                {comment.comment}
            </p>

            {/* Action bar (Medium style) */}
            <div className="flex items-center justify-between text-gray-500 text-sm">
                <div className="flex items-center gap-6">
                    {/* Like */}
                    <button className="flex items-center gap-2 hover:text-gray-900 transition">
                        <FaHandsClapping size={18} />
                        <span>{comment.likes || 0}</span>
                    </button>

                    {/* Reply */}
                    <button className="flex items-center gap-1 hover:text-gray-900 transition">
                        <MessageCircle size={18} />
                        <span>Reply</span>
                    </button>
                </div>

                {/* More options */}
                <button className="hover:text-gray-900 transition">
                    <MoreHorizontal size={18} />
                </button>
            </div>
        </div>
    );
}
