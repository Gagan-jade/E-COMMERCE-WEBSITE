import React, { useContext, useState } from 'react';
import loginIcons from '../assets/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            toast.success(dataApi.message);
            navigate('/');
            fetchUserDetails();
            fetchUserAddToCart();
        } else if (dataApi.error) {
            toast.error(dataApi.message);
        }
    };

    return (
        <section id='login' className='bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 min-h-screen flex items-center justify-center relative'>
            {/* GAGAN Text */}
            <div className='absolute top-4 left-4'>
                <div className='text-white font-extrabold text-3xl'>
                    <h1>GAGAN</h1>
                </div>
            </div>

            <div className='p-6 border-4 border-gradient-glow rounded-lg w-full max-w-sm bg-gray-800'>
                <div className='flex flex-col items-center mb-4'>
                    <div className='w-20 h-20 mb-4'>
                        <img src={loginIcons} alt='Login' className='w-full h-full object-cover rounded-full border-4 border-gray-700 shadow-md' />
                    </div>

                    <form className='pt-6 flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div className='flex flex-col'>
                            <label className='text-gray-300'>Email:</label>
                            <input
                                type='email'
                                placeholder='Email'
                                name='email'
                                value={data.email}
                                onChange={handleOnChange}
                                required
                                className='p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition'
                            />
                        </div>

                        <div className='flex flex-col relative'>
                            <label className='text-gray-300'>Password:</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder='Password'
                                name='password'
                                value={data.password}
                                onChange={handleOnChange}
                                required
                                className='p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition pr-12'
                            />
                            <div className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl'>
                                {showPassword ? <FaEyeSlash onClick={() => setShowPassword(prev => !prev)} /> : <FaEye onClick={() => setShowPassword(prev => !prev)} />}
                            </div>
                        </div>

                        <Link to='/forgot-password' className='text-red-500 hover:underline text-sm text-right block mt-2'>
                            Forgot password?
                        </Link>

                        <button type='submit' className='bg-gradient-to-r from-red-500 via-pink-400 to-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-gradient-to-r hover:from-red-600 hover:via-pink-500 hover:to-red-700 transition-transform transform hover:scale-105'>
                            Login
                        </button>
                    </form>

                    <p className='my-5 text-center text-gray-400'>
                        Don't have an account? <Link to="/sign-up" className='text-red-500 hover:underline'>Sign up</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Login;
