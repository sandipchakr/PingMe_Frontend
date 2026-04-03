import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js'; // for count the time when the post send
import homepageImg from "../assets/snowmountain.jpg"
import { ImagePlus, MessageCircle, Heart } from 'lucide-react';
import { useAuth } from "../context/AuthProvider"
import SkeletonCard from '../animation/SkeletonCard';
import PostCard from './PostCard';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function LandingPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch all posts when page loads
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BACKEND_URL}/api/posts`);
        const data = await res.json();
        setPosts(data.posts);
        setComments(data.comments);
        setLikes(data.likes);
        // console.log(data[0])
      } catch (error) {
        console.error("Failed to load posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  //for Likes:-
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
    <div className="w-full min-h-screen bg-gradient-to-br from-[#02001b] to-blue-800 flex flex-col justify-start items-center p-3"
    >
      {/*send post button */}
      <Link to="/post">
        <div className="fixed bottom-6 right-6 z-50 group">
          <div className="relative flex items-center justify-center w-14 h-14 rounded-full 
      bg-gradient-to-br from-[#458cd2] to-[#123]
      shadow-[0_0_20px_rgba(74,222,128,0.5)] 
      hover:shadow-[0_0_32px_rgba(74,222,128,0.8)]
      transition-all duration-300 hover:scale-110 cursor-pointer">
            <ImagePlus className="w-6 h-6 text-white" />
          </div>
          {/* Tooltip label */}
          <span className="absolute right-16 top-1/2 -translate-y-1/2 
      whitespace-nowrap text-xs font-semibold text-green-300
      bg-[#011a3c] border border-green-700 px-2 py-1 rounded-md
      opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            New Post
          </span>
        </div>
      </Link>

      {/* Post List */}

      {loading ? (
        <div className='w-full grid md:grid-cols-3 lg:grid-cols-4 gap-2 p-2'>
          {[...Array(6)].map((_, index) => <SkeletonCard key={index} />)}
        </div>
      ) : posts.length === 0 ? (<p className="text-gray-500">No posts yet.</p>) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2"> 
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              comments={comments}
              likes={likes}
              user={user}
              toggleLike={toggleLike}
            />
          ))}
        </div>)}
    </div>

  );
}

export default LandingPage;
