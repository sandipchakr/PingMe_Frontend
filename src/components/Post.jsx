// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';


// const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
// const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// function Post() {
//   const {
//     register,
//     handleSubmit,
//     setError,
//     formState: { errors, isSubmitting }
//   } = useForm();

//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState('');

//   const onsubmit = async (data) => {
//     try {
//       setUploading(true);

//       // Step 1: Upload image to Cloudinary
//       const formData = new FormData();
//       formData.append('file', data.coverImgUrl[0]);
//       formData.append('upload_preset', UPLOAD_PRESET);

//       const cloudinaryRes = await fetch(CLOUDINARY_URL, {
//         method: 'POST',
//         body: formData,
//       });

//       const cloudinaryData = await cloudinaryRes.json();

//       if (!cloudinaryData.secure_url) {
//         throw new Error("Cloudinary upload failed");
//       }

//       // Step 2: Combine image URL with form data
//       const finalPostData = {
//         title: data.title,
//         content: data.content,
//         coverImgUrl: cloudinaryData.secure_url,
//       };

//       // Step 3: Send post data to your backend
//       const res = await fetch(`${BACKEND_URL}/api/posts`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: "include", // 🧠 VERY IMPORTANT: this sends the cookie!
//         body: JSON.stringify(finalPostData),
//       });

//       const result = await res.json();
//       if (!res.ok) throw new Error(result.message || "Failed to save post");

//       setMessage("Post uploaded successfully!");
//     } catch (err) {
//       console.error(err);
//       setError("coverImgUrl", { message: err.message });
//       setMessage("Something went wrong.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4">
//       <form
//         onSubmit={handleSubmit(onsubmit)}
//         className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full space-y-6"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-800">Create a New Post</h2>

//         <div>
//           <label className="block mb-1 font-medium text-gray-700">Upload Image</label>
//           <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:border-blue-400 transition">
//             <input
//               type="file"
//               accept="image/*"
//               {...register("coverImgUrl", { required: "Image is required" })}
//               onChange={handleImageChange}
//               className="absolute w-full h-full opacity-0 cursor-pointer"
//             />
//             {preview ? (
//               <img src={preview} alt="Preview" className="h-40 object-cover rounded-md" />
//             ) : (
//               <div className="flex flex-col items-center text-gray-500">
//                 <ImagePlus className="w-10 h-10 mb-2" />
//                 <span>Click to upload</span>
//               </div>
//             )}
//           </div>
//           {errors.coverImgUrl && <p className="text-red-500 text-sm mt-1">{errors.coverImgUrl.message}</p>}
//         </div>

//         <div>
//           <label className="block mb-1 font-medium text-gray-700">Title</label>
//           <input
//             type="text"
//             placeholder="Enter post title"
//             {...register("title", { required: "Title is required" })}
//             className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
//         </div>

//         <div>
//           <label className="block mb-1 font-medium text-gray-700">Content</label>
//           <textarea
//             rows="4"
//             placeholder="Enter post content..."
//             {...register("content", { required: "Content is required" })}
//             className="w-full border border-gray-300 p-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
//         </div>

//         <button
//           type="submit"
//           disabled={uploading || isSubmitting}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition flex items-center justify-center"
//         >
//           {uploading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : <UploadCloud className="w-5 h-5 mr-2" />}
//           {uploading ? "Uploading..." : "Post"}
//         </button>

//         {message && <p className="text-center text-sm text-green-600">{message}</p>}
//       </form>
//     </div>
//   );
// }

// export default Post;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImagePlus, Loader2, UploadCloud } from 'lucide-react'; // optional icons if you use lucide-react

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Post() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm();

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(null);

  const onsubmit = async (data) => {
    try {
      setUploading(true);
      setMessage("");

      // Step 1: Upload image to Cloudinary
      const formData = new FormData();
      formData.append('file', data.coverImgUrl[0]);
      formData.append('upload_preset', UPLOAD_PRESET);

      const cloudinaryRes = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      });

      const cloudinaryData = await cloudinaryRes.json();

      if (!cloudinaryData.secure_url) {
        throw new Error("Cloudinary upload failed");
      }

      // Step 2: Combine image URL with form data
      const finalPostData = {
        title: data.title,
        content: data.content,
        coverImgUrl: cloudinaryData.secure_url,
      };

      // Step 3: Send post data to your backend
      const res = await fetch(`${BACKEND_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(finalPostData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to save post");

      setMessage(" Post uploaded successfully!");
    } catch (err) {
      console.error(err);
      setError("coverImgUrl", { message: err.message });
      setMessage(" Something went wrong.");
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Create a New Post</h2>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Upload Image</label>
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:border-blue-400 transition">
            <input
              type="file"
              accept="image/*"
              {...register("coverImgUrl", { required: "Image is required" })}
              onChange={handleImageChange}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
            {preview ? (
              <img src={preview} alt="Preview" className="h-40 object-cover rounded-md" />
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <ImagePlus className="w-10 h-10 mb-2" />
                <span>Click to upload</span>
              </div>
            )}
          </div>
          {errors.coverImgUrl && <p className="text-red-500 text-sm mt-1">{errors.coverImgUrl.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Enter post title"
            {...register("title", { required: "Title is required" })}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Content</label>
          <textarea
            rows="4"
            placeholder="Enter post content..."
            {...register("content", { required: "Content is required" })}
            className="w-full border border-gray-300 p-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
        </div>

        <button
          type="submit"
          disabled={uploading || isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition flex items-center justify-center"
        >
          {uploading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : <UploadCloud className="w-5 h-5 mr-2" />}
          {uploading ? "Uploading..." : "Post"}
        </button>

        {message && <p className="text-center text-sm text-green-600">{message}</p>}
      </form>
    </div>
  );
}

export default Post;

