// src/pages/EditPost.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    coverImgUrl: ""
  });

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/posts/${id}`);
        const data = await res.json();
        setFormData({
          title: data.title,
          content: data.content,
          coverImgUrl: data.coverImgUrl
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching post:", err);
        alert("Failed to load post");
        navigate("/profile");
      }
    };

    fetchPost();
  }, [id, navigate]);

  // Handle image file upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: form
      });
      const data = await res.json();
      setFormData((prev) => ({ ...prev, coverImgUrl: data.secure_url }));
    } catch (err) {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_URL}/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (res.ok) {
        alert("Post updated successfully!");
        navigate("/profile");
      } else {
        alert(result.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong.");
    }
  };

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F7F7F7] p-4 rounded-xl">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Your Post</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full mb-3 p-2 border rounded"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <textarea
          placeholder="Content"
          className="w-full mb-3 p-2 border rounded"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full mb-3 outline-dashed outline-gray-300 p-2 rounded"
        />

        {uploading && <p className="text-blue-600 mb-2">Uploading image...</p>}

        {formData.coverImgUrl && (
          <img src={formData.coverImgUrl} alt="cover" className="w-full h-60 object-cover rounded-xl mb-3" />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-2xl hover:bg-blue-700"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}

export default EditPost;
