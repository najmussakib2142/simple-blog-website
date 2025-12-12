import Image from "next/image";

export default function CommentItem({ comment }) {
    return (
        <div className="p-4  border-y border-y-gray-200  ">
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
                    <p className="font-medium text-gray-900">{comment.username}</p>
                    <p className="text-sm text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()} • {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
            </div>

            {/* Comment text */}
            <p className="text-gray-800 leading-relaxed">{comment.comment}</p>
        </div>
    );
}
