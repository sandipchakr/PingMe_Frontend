// src/pages/PostDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { format, register } from 'timeago.js';
import { useForm } from "react-hook-form";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function PostDetails() {
    const {
        register,
        handleSubmit,
        setError,
        formState = { error, isSubmitting }
    } = useForm();

    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    const onsubmit = async (data) => {
        const res = await fetch(`${BACKEND_URL}/api/posts/comment/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ content: data.comment }), // use form data
        });

        const newCom = await res.json();
        console.log(newCom);
        setComments((prev) => [newCom, ...prev]);
    };

    useEffect(() => {
        const fetchPost = async () => {
            let res = await fetch(`${BACKEND_URL}/api/posts/${id}`);
            let data = await res.json();
            console.log("Post fetch response:", data);
            setPost(data.post);
            setComments(data.comments);
        };

        fetchPost();
    }, [id]);

    if (!post) return <p>Loading...</p>;

    const imageUrl = post.createdBy?.profileImageURL?.startsWith('http')
        ? post.createdBy.profileImageURL
        : `${BACKEND_URL}${post.createdBy?.profileImageURL}`;

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-full sm:w-3/6 md:w-3/6 lg:w-2/6 ">
                <div key={post._id} className="bg-white p-3 rounded-xl shadow flex flex-col justify-center items-start gap-2 mx-2">
                    <div className="text-sm text-gray-700 flex items-center gap-2">
                        <div>
                            <img
                                src={imageUrl}
                                crossOrigin="anonymous"
                                alt="profile"
                                className="h-9 w-9 rounded-full object-cover"
                            />
                        </div>

                        <span>
                            {post.createdBy?.fullname || "Unknown"}
                        </span>
                        :
                        <span className="italic text-gray-400">
                            {format(post.createdAt)}
                        </span>

                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
                    </div>
                    <div className="w-full flex justify-start items-center bg-gray-100 rounded">
                        <img
                            src={post.coverImgUrl}
                            alt={post.title}
                            className="h-[40vh] w-full object-contain"
                        />
                    </div>
                    <div>
                        <p className="text-gray-600">{post.content}</p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onsubmit)}
                        className="mt-4 flex flex-col gap-2"
                    >
                        <input
                            type="text"
                            {...register("comment")}
                            placeholder="Write a comment..."
                            className="p-2 border rounded"
                        />
                        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
                            Add Comment
                        </button>
                    </form>

                    <div className="mt-4 w-full flex flex-col">
                        <div>
                            <h3 className="text-md font-semibold">Comments ({comments.length})</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            {comments.map((comment) => {
                                const imageUrl = comment.createdBy?.profileImageURL?.startsWith('http')
                                    ? comment.createdBy.profileImageURL
                                    : `${BACKEND_URL}${comment.createdBy?.profileImageURL}`;
                                return (
                                    <div key={comment._id} className="bg-gray-100 p-2 rounded flex items-center gap-2 flex-wrap">
                                       <div className="flex items-center gap-3">
                                         <div>
                                            <img
                                                src={imageUrl}
                                                // {...console.log(comment.createdBy?.profileImageURL)}
                                                crossOrigin="anonymous"
                                                alt="profile"
                                                className="h-9 w-9 rounded-full object-cover"
                                            />
                                        </div>
                                        <p className="text-sm text-gray-700">
                                            <span className="font-semibold">{comment.createdBy?.fullname}</span> :
                                            <span className="italic"> {format(comment.createdAt)}</span>
                                        </p>
                                       </div>
                                       <div className="text-black">
                                        <span>{comment.content}</span>
                                       </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostDetails;
