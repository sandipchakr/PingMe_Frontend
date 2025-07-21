import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from "../../context/AuthProvider";
import logo from "../../assets/logo.png";
import homepageImg from "../../assets/homepagepic.jpg"
import Profile from '../Profile';
import { House } from 'lucide-react';

function Header() {
    const { user, loading } = useAuth();
    return (
        <header className="shadow sticky z-50 top-0 font-serif">
            <nav className="bg-blue-400 shadow-md px-4 lg:px-4 py-2.5 ">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/">
                        <img src={logo} alt="logo"
                            className="mr-3 h-16 w-auto"
                        />
                    </Link>
                    <div className="w-2/3 sm:w-1/3  flex justify-end iteam-center">

                        {user ? (
                            <>
                            <div className="flex justify-center iteam-center p-3 ">
                                <Link
                                    to="/landingpage"
                                    className="w-full"
                                >
                                      <House className="w-9 h-9 text-white"/>
                                </Link>
                            </div>
                            {/* {console.log(user)} */}
                            {/* console.log(user),
                            // <p>Welcome, {user.fullname}</p> // should be add profile component, */}
                            <div className="flex justify-center items-center p-2 ">
                                <Link
                                    to="/profile"
                                    className='w-full flex justify-center items-center'
                                >
                                    <img src={user.profileImageURL}
                                        crossOrigin="anonymous"
                                        alt="profile"
                                        className="h-9 w-9 rounded-full object-cover"
                                    />
                                </Link>
                            </div>
                            </>
                        ) :
                        <div className=""> <div className="flex items-center ">
                            <Link
                                to="/login"
                                className="bg-blue-500 text-white px-4 py-2 rounded-full mr-2  hover:bg-blue-700 transition duration-200"
                            >
                                Signin
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-blue-500 text-white px-4 py-2 rounded-full  hover:bg-blue-700 transition duration-200"
                            >
                                Signup
                            </Link>
                        </div>
                        </div>}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header