// src/pages/PostDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from 'timeago.js';
import { useForm } from "react-hook-form";
import { Send, MessageCircle } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function PostDetails() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const onSubmit = async (data) => {
    const res = await fetch(`${BACKEND_URL}/api/posts/comment/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ content: data.comment }),
    });
    const newCom = await res.json();
    setComments((prev) => [newCom, ...prev]);
    reset(); // ✅ clear input after submit
  };

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`${BACKEND_URL}/api/posts/${id}`);
      const data = await res.json();
      setPost(data.post);
      setComments(data.comments);
    };
    fetchPost();
  }, [id]);

  if (!post) return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#02001b] to-blue-800 flex justify-center items-center">
      <p className="text-blue-300 animate-pulse text-lg tracking-widest">Loading...</p>
    </div>
  );

  const profileUrl = post.createdBy?.profileImageURL?.startsWith('http')
    ? post.createdBy.profileImageURL
    : `${BACKEND_URL}${post.createdBy?.profileImageURL}`;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#02001b] to-blue-800 flex justify-center py-10 px-4">
      <div className="w-full max-w-xl flex flex-col gap-4">

        {/* Post Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">

          {/* Author Row */}
          <div className="flex items-center gap-3 px-5 pt-5 pb-3">
            <img
              src={profileUrl}
              crossOrigin="anonymous"
              alt="profile"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-400/50"
            />
            <div>
              <p className="text-white font-semibold text-sm">
                {post.createdBy?.fullname || "Unknown"}
              </p>
              <p className="text-blue-300 text-xs italic">{format(post.createdAt)}</p>
            </div>
          </div>

          {/* Title */}
          <div className="px-5 pb-3">
            <h2 className="text-2xl font-bold text-white">{post.title}</h2>
          </div>

          {/* Cover Image */}
          <div className="bg-black/20">
            <img
              src={post.coverImgUrl}
              alt={post.title}
              className="w-full max-h-[50vh] object-contain"
            />
          </div>

          {/* Content */}
          <div className="px-5 py-4">
            <p className="text-blue-100/80 text-sm leading-relaxed">{post.content}</p>
          </div>
        </div>

        {/* Comment Input */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl px-5 py-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                {...register("comment", {
                  required: "Comment can't be empty",           // ✅ validation
                  validate: (val) => val.trim() !== "" || "Comment can't be just spaces", // ✅ trim check
                })}
                placeholder="Write a comment..."
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder-blue-300/50 
                  rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-400 focus:ring-1 
                  focus:ring-blue-400 transition"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white 
                  rounded-xl px-4 py-2 transition flex items-center gap-1.5 text-sm font-medium"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </div>

            {/* ✅ Error message */}
            {errors.comment && (
              <p className="text-red-400 text-xs pl-1">{errors.comment.message}</p>
            )}
          </form>
        </div>

        {/* Comments Section */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl px-5 py-4 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <MessageCircle className="w-4 h-4 text-blue-400" />
            Comments ({comments.length})
          </div>

          {comments.length === 0 ? (
            <p className="text-blue-300/50 text-sm italic text-center py-4">No comments yet. Be the first!</p>
          ) : (
            comments.map((comment) => {
              const commentImgUrl = comment.createdBy?.profileImageURL?.startsWith('http')
                ? comment.createdBy.profileImageURL
                : `${BACKEND_URL}${comment.createdBy?.profileImageURL}`;
              return (
                <div key={comment._id} className="flex gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
                  <img
                    src={commentImgUrl}
                    crossOrigin="anonymous"
                    alt="profile"
                    className="h-8 w-8 rounded-full object-cover ring-1 ring-blue-400/40 shrink-0"
                  />
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-xs font-semibold">
                        {comment.createdBy?.fullname}
                      </span>
                      <span className="text-blue-300/60 text-xs italic">
                        {format(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-blue-100/80 text-sm">{comment.content}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}

export default PostDetails;