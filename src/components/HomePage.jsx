import React from 'react'
import homepageImg from "../assets/snowmountain.jpg"
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="h-screen w-full bg-no-repeat bg-cover bg-center flex justify-center items-center font-serif"
      style={{ backgroundImage: `url(${homepageImg})` }}
    >
      <div className=" w-full p-2 m-5 sm:w-2/3  bg-white/12 backdrop-blur-sm rounded-3xl flex flex-col justify-center items-center gap-4 overflow-hidden">
      <span className='text-white text-[2rem] '>Welcome to PingMe</span>
      <span className='text-gray-800 font-bold text-2xl  w-2/3'>A platform to write,post,and express with clarity and purpose</span>
      <div className='bg-white text-black w-2/3 md:w-2/6 lg:w-1/6 p-3 rounded-3xl hover:cursor-pointer hover:bg-gray-200 transition duration-200'>
        <Link
        to="/login"
        >Get Started</Link>
      </div>
      </div>
    </div>
  );
}

export default HomePage