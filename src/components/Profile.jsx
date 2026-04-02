import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import { useNavigate, Link } from 'react-router-dom';
import homepageImg from "../assets/snowmountain.jpg"
import { format } from 'timeago.js';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { LogOut, ImagePlus, Heart, MessageCircle, Trash, FilePenLine } from 'lucide-react';
{/* <Trash /> */ }

function Profile() {
  const { user, loading, setUser } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    // Fetch all posts when page loads
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BACKEND_URL}/api/posts/myPosts`, {
          credentials: 'include'
        });
        const data = await res.json();
        // console.log(data)
        setPosts(data.myPosts);
        setLikes(data.likes);
        setComments(data.comments);

      } catch (error) {
        console.error("Failed to load posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [])

  if (loading) {
    return <div className="text-center text-gray-500 p-10">Loading user data...</div>;
  }

  if (!user) {
    return <div className="text-center text-red-500 p-10">User not logged in.</div>;
  }


  //handle delete:-
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
        setPosts((prevPosts) => prevPosts.filter((p) => p._id !== postId));
        alert("Post deleted successfully.");
      } else {
        alert(data.message || "Failed to delete post.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong.");
    }
  };

  const logout = async () => {
    try {
      const r = await fetch(`${BACKEND_URL}/api/user/logout`, { credentials: "include" });
      const res = await r.json();

      if (res.success) {
        const me = await fetch(`${BACKEND_URL}/api/user/me`, { credentials: "include" });
        const meData = await me.json();

        setUser(meData.user);
        navigate('/');
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  //for likes:-
  const toggleLike = async (postId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/posts/like/${postId}`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();

      if (data.likes) {
        setLikes(data.likes); // only update if `likes` is returned
      } else {
        // refetch all likes if unliked, or alternatively remove manually
        const updated = await fetch(`${BACKEND_URL}/api/posts`);
        const fresh = await updated.json();
        setLikes(fresh.likes); // ensure likes is never undefined
      }
    } catch (error) {
      console.error("Failed to like/unlike:", error);
    }
  };


  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#02001b] to-blue-800 flex flex-col justify-start items-center p-2"
    >
     {/*profile section*/}
<div className="w-full sm:w-3/6 md:w-3/6 lg:w-2/6 mb-6">
  
  {/* Cover Banner */}
  <div className="relative h-24 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 overflow-hidden">
    {/* Decorative blobs */}
    <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
    <div className="absolute -bottom-4 right-8 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl" />
  </div>

  {/* Card Body */}
  <div className="relative bg-[#0d1b3e]/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl px-5 pt-10 pb-5 -mt-6 mx-2">

    {/* Avatar — overlaps the banner */}
    <div className="absolute -top-8 left-5">
      <div className="relative">
        <img
          src={user.profileImageURL}
          crossOrigin="anonymous"
          alt="profile"
          className="h-16 w-16 rounded-2xl object-cover ring-4 ring-[#0d1b3e] shadow-lg"
        />
        {/* Online dot */}
        <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full ring-2 ring-[#0d1b3e]" />
      </div>
    </div>

    {/* Name + Email */}
    <div className="mb-4">
      <h2 className="text-white font-bold text-lg leading-tight">
        {user.fullname || "Unknown"}
      </h2>
      <p className="text-blue-300/80 text-sm">{user.email}</p>
    </div>

    {/* Stats Row */}
    <div className="flex justify-around bg-white/5 rounded-xl py-3 mb-4 border border-white/10">
      <div className="flex flex-col items-center">
        <span className="text-white font-bold text-lg">{posts.length}</span>
        <span className="text-gray-400 text-xs">Posts</span>
      </div>
      <div className="w-px bg-white/10" />
      <div className="flex flex-col items-center">
        <span className="text-white font-bold text-lg">
          {posts.reduce((acc, p) => acc + likes.filter(l => l.postId === p._id).length, 0)}
        </span>
        <span className="text-gray-400 text-xs">Likes</span>
      </div>
      <div className="w-px bg-white/10" />
      <div className="flex flex-col items-center">
        <span className="text-white font-bold text-lg">
          {posts.reduce((acc, p) => acc + comments.filter(c => c.postId === p._id).length, 0)}
        </span>
        <span className="text-gray-400 text-xs">Comments</span>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex gap-2">
      <Link to="/post" className="flex-1">
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 
          text-white text-sm font-semibold py-2 rounded-xl transition-all duration-200 hover:shadow-[0_0_16px_rgba(59,130,246,0.5)]">
          <ImagePlus className="w-4 h-4" />
          New Post
        </button>
      </Link>
      <button
        onClick={logout}
        className="flex items-center justify-center gap-2 bg-white/5 hover:bg-red-500/20 border border-white/10
          hover:border-red-500/40 text-gray-300 hover:text-red-400 text-sm font-semibold px-4 py-2 
          rounded-xl transition-all duration-200"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>

  </div>
</div>
<div className="bg-[#0307fc54] w-full border-r shadow-xl border-blue-300 p-3 text-xl font-bold text-white sm:w-1/3  rounded-xl mb-4">
  <p>
          Total Posts: {posts.length}
        </p></div>
      {/* Post List */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2">
        
        {Loading ? ([1, 2, 3].map((_, index) => (
          <div key={index} className="mx-auto w-full max-w-sm rounded-md p-4 animate-pulse bg-white">
            <div className="flex space-x-4">
              <div className="size-10 rounded-full bg-gray-200"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 rounded bg-gray-200"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                    <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                  </div>
                  <div className="h-2 rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        ))) :
          posts.length === 0 ? (<p className="text-gray-500 italic">No posts yet.</p>) :
            (posts.map((post) => {
              const imageUrl = post.createdBy?.profileImageURL?.startsWith('http')
                ? post.createdBy.profileImageURL
                : `${BACKEND_URL}${post.createdBy?.profileImageURL}`;

              const postComments = comments.filter(comment => comment.postId === post._id);
              const postLikes = likes.filter(like => like.postId === post._id);
              return (
                <div key={post._id} className="bg-gradient-to-r from-[#013e7b] to-[#123] border-r border-[#55a7f9] 
              border-y-[#043efc] p-3 rounded-xl shadow flex flex-col justify-center items-start gap-2 mx-2">
                  <Link to={`/post/${post._id}`} className="w-full flex flex-col items-start gap-1">
                    <div className="text-sm text-gray-200 flex items-center gap-2">
                      <img
                        src={imageUrl}
                        crossOrigin="anonymous"
                        alt="profile"
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <span>{post.createdBy?.fullname || "Unknown"}</span>:
                      <span className="italic text-gray-100">{format(post.createdAt)}</span>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-gray-200">{post.title}</h2>
                    </div>

                    <div className="w-full flex justify-start items-center bg-gray-100 rounded">
                      <img
                        src={post.coverImgUrl}
                        alt={post.title}
                        className="h-[40vh] w-full object-cover"
                      />
                    </div>
                  </Link>
                  <div className="flex justify-start iteam-center w-full gap-1">
                    <p className="text-gray-200">
                      {post.content.length > 25
                        ? post.content.slice(0, 25) + '...'
                        : post.content}
                    </p>
                    <Link to={`/post/${post._id}`} className="text-blue-500 hover:underline mt-1 text-sm italic">
                      Read more
                    </Link>
                  </div>
                  <div className="flex justify-evenly items-center w-full mt-2 ">
                    <div className="w-full flex justify-evenly  items-center">
                      <div>
                        <div className="flex items-center gap-1 ">
                          {postLikes.some(like => like.userId === user?._id) ? (
                            <Heart
                              className="text-red-600 cursor-pointer text-xl hover:text-red-500 transform hover:scale-110 transition duration-150"
                              onClick={() => toggleLike(post._id)}
                            />
                          ) : (
                            <Heart
                              className="text-gray-300 cursor-pointer text-xl hover:text-red-500 transform hover:scale-110 transition duration-150"
                              onClick={() => toggleLike(post._id)}
                            />
                          )}
                          <span className="text-sm text-gray-300">{postLikes.length}</span>
                        </div>
                      </div>
                      <div className='flex items-center gap-1  hover:text-green-500 transform hover:scale-110 transition duration-150'>
                        <Link to={`/post/${post._id}`} className="flex items-center text-purple-400">
                          <MessageCircle />
                          <span className='text-gray-300'>{postComments.length}</span>
                        </Link>
                      </div>
                    </div>

                    <button
                      className="px-2 rounded-full text-red-400 hover:text-red-600 hover:cursor-pointer transform hover:scale-110 transition duration-200"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(post._id);
                      }}
                    >
                      <Trash />
                    </button>

                    <Link to={`/postedit/${post._id}`} className='flex items-center'>
                      <button className="px-2 rounded-full text-blue-400 hover:text-blue-600 transform hover:scale-110 hover:cursor-pointer transition duration-200">
                        <FilePenLine />
                      </button>
                    </Link>
                  </div>
                </div>


              )
            }))}
      </div>
    </div>

  )
}

export default Profile