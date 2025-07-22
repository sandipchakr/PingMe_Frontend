import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js'; // for count the time when the post send
import homepageImg from "../assets/snowmountain.jpg"
import { ImagePlus, MessageCircle, Heart } from 'lucide-react';
import { useAuth } from "../context/AuthProvider"

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
    <div className="w-full min-h-screen bg-[#FFECDB] flex flex-col justify-start items-center p-3"
    >
      <div className=" sm:w-2/6 md:w-2/6 lg:w-1/6 bg-gray-100 rounded-lg shadow-md p-3 mb-4 flex justify-center iteam-center">
        <Link
          to="/post"
        >
          <div className="hover:cursor-pointer">
            <ImagePlus className="w-8 h-8 " />
          </div>
        </Link>
      </div>

      {/* Post List */}
      <div className="w-full sm:w-3/6 md:w-3/6 lg:w-2/6 space-y-4 font-serif">
        {loading ? (<div class="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4">
          <div class="flex animate-pulse space-x-4">
            <div class="size-10 rounded-full bg-gray-200"></div>
            <div class="flex-1 space-y-6 py-1">
              <div class="h-2 rounded bg-gray-200"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="col-span-2 h-2 rounded bg-gray-200"></div>
                  <div class="col-span-1 h-2 rounded bg-gray-200"></div>
                </div>
                <div class="h-2 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>) : posts.length === 0 ? (<p className="text-gray-500">No posts yet.</p>) : (


          posts.map((post) => {
            const imageUrl = post.createdBy?.profileImageURL?.startsWith('http')
              ? post.createdBy.profileImageURL
              : `${BACKEND_URL}${post.createdBy?.profileImageURL}`;

            const postComments = comments.filter(comment => comment.postId === post._id);
            const postLikes = likes.filter(like => like.postId === post._id);
            // console.log(comments)

            return (

              <div key={post._id} className="bg-[#faf7f6f2] p-3 rounded-xl shadow flex flex-col justify-center items-start gap-1 mx-2">

                <div className="w-full text-sm text-gray-700 flex flex-wrap">
                  <div className="flex justify-center items-center gap-2 flex-wrap">
                    <div>
                      <img src={imageUrl}
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
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
                </div>
                <Link key={post._id} to={`/post/${post._id}`} className="w-full ">
                  <div className="w-full flex justify-start items-center bg-gray-100 rounded">
                    <img
                      src={post.coverImgUrl}
                      alt={post.title}
                      className="h-[40vh] w-full object-cover"
                    />
                  </div>
                </Link>
                <div className="flex justify-start iteam-center w-full gap-1">
                  <p className="text-gray-600">
                    {post.content.length > 25
                      ? post.content.slice(0, 25) + '...'
                      : post.content}
                  </p>
                  <Link to={`/post/${post._id}`} className="text-blue-500 hover:underline mt-1 text-sm italic">
                    Read more
                  </Link>
                </div>
                <div className="w-full flex justify-evenly grow items-center">
                  <div>
                    <div className="flex items-center gap-1 mt-2">
                      {postLikes.some(like => like.userId === user?._id) ? (
                        <Heart
                          className="text-red-600 cursor-pointer text-xl hover:text-red-500 transform hover:scale-110 transition duration-150"
                          onClick={() => toggleLike(post._id)}
                        />
                      ) : (
                        <Heart
                          className="text-gray-500 cursor-pointer text-xl hover:text-red-500 transform hover:scale-110 transition duration-150"
                          onClick={() => toggleLike(post._id)}
                        />
                      )}
                      <span className="text-sm text-gray-600 ">{postLikes.length}</span>
                    </div>
                  </div>
                  <div className='flex items-center gap-1 mt-2 '>
                    <Link to={`/post/${post._id}`} className="flex items-center">
                      <MessageCircle className='hover:text-green-500 transform hover:scale-110 transition duration-150' />
                      <span>{postComments.length}</span>
                    </Link>
                  </div>
                </div>

              </div>
            )
          }))}
      </div>
    </div>

  );
}

export default LandingPage;
