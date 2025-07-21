import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate,Link } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [servermsg, setservermsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();
  const postForm = async (data) => {
    try {
      // console.log("Backend URL is:", BACKEND_URL);
      let r = await fetch(`${BACKEND_URL}/api/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",  //very importent for cookies
        body: JSON.stringify(data)
      });

      let res = await r.json(); 
      // console.log(data, res);
      setservermsg(res.message);

      if (res.success) {
        // console.log("under success")
        const me = await fetch(`${BACKEND_URL}/api/user/me`, { credentials: "include" });
        const meData = await me.json();
        // console.log(meData)
        setUser(meData.user); // update context immediately

        navigate('/landingpage');
      }

    } catch (err) {
      console.error("Error during signup:", err);
    }
  }
  return (

    <form onSubmit={handleSubmit(postForm)} className='align-middle'>
      {servermsg && (
        <div className='bg-blue-200 mt-5 w-full p-3 rounded-4xl'>
          <span>{servermsg}</span>
        </div>
      )}
      {isSubmitting && <h4>Submitting...</h4>}
      <div className="w-full flex justify-center items-center">
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 min-h-[50vh] bg-white flex flex-col flex-wrap justify-evenly items-center rounded-2xl m-5 shadow-[6px_6px_10px_#a3a3a3,-8px_-8px_14px_#ffffff]">
          <div className="w-[7rem] px-3 py-2 rounded-xl shadow-[inset_3px_3px_5px_#a3a3a3,inset_3px_3px_4px_#ffffff]">
            <span className='text-xl font-bold text-pink-400'>Login</span>
          </div>
          <div className=' w-full flex flex-col justify-center items-center'>
            <span>Enter Email</span>
            <input type="text" placeholder='Email'
              className="w-2/3 p-1.5 text-lg  rounded-xl outline-none shadow-[inset_3px_3px_5px_#a3a3a3,inset_3px_3px_4px_#ffffff]"
              {...register("email", {
                required: { value: true, message: "This fild is required.." },
              })}
            />
            {errors.email && <div className='bg-red-400 text-white p-1.5 rounded-3xl'>{errors.email.message}</div>}
          </div>
          <div className=' w-full flex flex-col justify-center items-center'>
            <span>Enter Password</span>
            <input type="password" placeholder='Password'
              className="w-2/3 p-1.5 text-lg rounded-xl outline-none shadow-[inset_3px_3px_5px_#a3a3a3,inset_3px_3px_4px_#ffffff]"
              {...register("password", {
                required: { value: true, message: "This fild is required.." },
                minLength: { value: 4, message: "Minimum length of the password is 4" }
              })}
            />
            {errors.password && <div className='bg-red-400 text-white p-1.5 rounded-3xl'>{errors.password.message}</div>}
          </div>
          <div className="bg-white rounded-xl px-8 py-2 text-lg text-green-400 font-bold hover:cursor-pointer shadow-[inset_3px_3px_5px_#a3a3a3,inset_3px_3px_4px_#ffffff]">
            <input disabled={isSubmitting} type="submit" value="Submit" className='hover:cursor-pointer' />
          </div>
          <div>
            <span>Create a new account</span>
            <Link
            to="/signup"
            className='text-blue-400 underline ml-3'
            >Signup</Link>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Login