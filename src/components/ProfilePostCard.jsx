import { Link } from "react-router-dom";
import { useState } from "react";
import { Heart, MessageCircle,Trash, FilePenLine } from "lucide-react";
import { format } from "timeago.js"; // or wherever your format comes from

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // adjust to your env var

const ProfilePostCard = ({ post, comments, likes, user, toggleLike, onDelete }) => {
    const imageUrl = post.createdBy?.profileImageURL?.startsWith("http")
        ? post.createdBy.profileImageURL
        : `${BACKEND_URL}${post.createdBy?.profileImageURL}`;

    const postComments = comments.filter((c) => c.postId === post._id);
    const postLikes = likes.filter((l) => l.postId === post._id);
    const isLiked = postLikes.some((like) => like.userId === user?._id);
    
    {/* handle delete*/}
    const [posts, setPosts] = useState([]);
    const handleDelete = async (postId) => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/posts/delete/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        // Filter out the deleted post from local state
        onDelete(postId); // Notify parent component about deletion
        alert("Post deleted successfully.");
      } else {
       alert(data.message + " — " + (data.error || ""));
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong.");
    }
  };

    return (
        <div className="bg-gradient-to-r from-[#013e7b] to-[#123] border-r border-[#55a7f9] border-y-[#043efc]
         p-3 rounded-xl shadow flex flex-col justify-center items-start gap-1 mx-2">
            {/* {console.log(post)} */}
            {/* Author row */}
            <div className="w-full text-sm text-gray-100 flex flex-wrap">
                <div className="flex justify-center items-center gap-2 flex-wrap">
                    <img
                        src={imageUrl}
                        crossOrigin="anonymous"
                        alt="profile"
                        className="h-9 w-9 rounded-full object-cover"
                    />
                    <span>{post.createdBy?.fullname || "Unknown"}</span>
                    :
                    <span className="italic text-gray-400">{format(post.createdAt)}</span>
                </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-200">{post.title}</h2>

            {/* Cover image */}
            <Link to={`/post/${post._id}`} className="w-full">
                <div className="w-full flex justify-start items-center bg-gray-100 rounded">
                    <img
                        src={post.coverImgUrl}
                        alt={post.title}
                        className="h-[40vh] w-full object-cover"
                    />
                </div>
            </Link>

            {/* Content preview */}
            <div className="flex justify-start items-center w-full gap-1">
                <p className="text-gray-100">
                    {post.content.length > 25
                        ? post.content.slice(0, 25) + "..."
                        : post.content}
                </p>
                <Link
                    to={`/post/${post._id}`}
                    className="text-blue-500 hover:underline mt-1 text-sm italic"
                >
                    Read more
                </Link>
            </div>

            {/* Like & Comment row */}
            <div className="w-full flex justify-evenly grow items-center">

                {/* Like */}
                <div className="flex items-center gap-1 mt-2">
                    <Heart
                        onClick={() => toggleLike(post._id)}
                        className={`cursor-pointer text-xl transform hover:scale-110 transition duration-150 ${isLiked ? "text-red-600" : "text-gray-200"
                            }`}
                    />
                    <span className="text-sm text-gray-200">{postLikes.length}</span>
                </div>

                {/* Comment */}
                <div className="flex items-center gap-1 mt-2">
                    <Link to={`/post/${post._id}`} className="flex items-center">
                        <MessageCircle className="text-blue-400 hover:text-green-500 transform hover:scale-110 transition duration-150" />
                        <span className="text-gray-200">{postComments.length}</span>
                    </Link>
                </div>

                {/* Update */}
                <div className="flex items-center gap-1 mt-2">
                    <Link to={`/postedit/${post._id}`} className="flex items-center">
                        <FilePenLine className="text-green-400 hover:text-green-500 transform hover:scale-110 transition duration-150" />
                    </Link>
                </div>

                {/* Delete*/}

                <div className="flex items-center gap-1 mt-2">
                    <button onClick={()=>{handleDelete(post._id)}}>
                        <Trash className="text-red-500 hover:text-red-700 transform hover:scale-110 transition duration-150 cursor-pointer" />
                   </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePostCard;