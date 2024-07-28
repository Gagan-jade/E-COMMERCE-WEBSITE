import React, { useState } from 'react';
import loginIcons from '../assets/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
      profilePic: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
      const { name, value } = e.target;
      setData((prev) => ({
          ...prev,
          [name]: value
      }));
  }

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((prev) => ({
      ...prev,
      profilePic: imagePic
    }));
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (data.password === data.confirmPassword) {
        const dataResponse = await fetch(SummaryApi.signUP.url, {
            method: SummaryApi.signUP.method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const dataApi = await dataResponse.json();
        if (dataApi.success) {
          toast.success(dataApi.message);
          navigate("/login");
        }
        if (dataApi.error) {
          toast.error(dataApi.message);
        }
      } else {
        toast.error("Please check password and confirm password");
      }
  }

  return (
    <section id='signup' className='bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 min-h-screen flex items-center justify-center relative'>
        <div className='absolute top-4 left-4'>
          <div className='text-white font-extrabold text-3xl'>
            <h1>GAGAN</h1>
          </div>
        </div>

        {/* Sign Up Form */}
        <div className='p-6 border-4 border-gradient-glow rounded-lg w-full max-w-md shadow-lg bg-gray-800'>
            <div className='flex flex-col items-center mb-4'>
                <div className='relative w-32 h-32'>
                    <img src={data.profilePic || loginIcons} alt='Profile' className='w-full h-full object-cover rounded-full border-4 border-gray-700 shadow-md' />
                </div>
                <label className='mt-2'>
                    <div className='flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-400 to-red-500 p-2 rounded-full cursor-pointer shadow-lg hover:shadow-2xl transition-all'>
                        <span className='text-white text-sm font-semibold'>Upload Photo</span>
                        <input type='file' className='hidden' onChange={handleUploadPic} />
                    </div>
                </label>
            </div>

            <form className='pt-6 flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <label className='text-gray-300'>Name:</label>
                    <input
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={data.name}
                        onChange={handleOnChange}
                        required
                        className='p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition'
                    />
                </div>

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

                <div className='flex flex-col relative'>
                    <label className='text-gray-300'>Confirm Password:</label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        value={data.confirmPassword}
                        onChange={handleOnChange}
                        required
                        className='p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition pr-12'
                    />
                    <div className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl'>
                        {showConfirmPassword ? <FaEyeSlash onClick={() => setShowConfirmPassword(prev => !prev)} /> : <FaEye onClick={() => setShowConfirmPassword(prev => !prev)} />}
                    </div>
                </div>

                <button type='submit' className='bg-gradient-to-r from-purple-500 via-pink-400 to-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-500 hover:to-red-600 transition-transform transform hover:scale-105'>
                    Sign Up
                </button>
            </form>

            <p className='mt-6 text-center text-gray-400'>
                Already have an account? <Link to="/login" className='text-red-500 hover:underline'>Login</Link>
            </p>
        </div>
    </section>
  );
}

export default SignUp;
