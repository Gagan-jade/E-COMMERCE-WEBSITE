import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from 'react-icons/fa6';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector((state) => state?.user?.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div className='flex min-h-[calc(100vh-120px)]'>
            {/* Sidebar */}
            <aside className='bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 min-h-full w-full max-w-[250px] shadow-lg'>
                <div className='h-40 bg-gradient-to-b from-gray-700 to-gray-600 flex flex-col items-center justify-center p-4'>
                    <div className='relative'>
                        {user?.profilePic ? (
                            <img
                                src={user?.profilePic}
                                className='w-24 h-24 rounded-full border-4 border-gray-800 shadow-lg'
                                alt={user?.name}
                            />
                        ) : (
                            <FaRegCircleUser className='text-6xl text-gray-300' />
                        )}
                    </div>
                    <p className='mt-2 text-xl font-semibold text-gray-100'>{user?.name}</p>
                    <p className='text-sm text-gray-400'>{user?.role}</p>
                </div>

                <nav className='p-4'>
                    <Link
                        to='all-users'
                        className='block py-2 px-4 text-gray-300 hover:bg-gray-600 rounded transition duration-300'
                    >
                        All Users
                    </Link>
                    <Link
                        to='all-products'
                        className='block py-2 px-4 text-gray-300 hover:bg-gray-600 rounded transition duration-300'
                    >
                        All Products
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className='flex-1 p-6 bg-gray-800'>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminPanel;
