import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from 'react-icons/md';
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: '',
        name: '',
        role: '',
        _id: ''
    });

    const fetchAllUsers = async () => {
        try {
            const fetchData = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include'
            });

            const dataResponse = await fetchData.json();

            if (dataResponse.success) {
                setAllUsers(dataResponse.data);
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            toast.error('Failed to fetch users');
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div className='bg-gray-100 min-h-screen p-6'>
            <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
                <table className='w-full table-auto border-collapse'>
                    <thead className='bg-gradient-to-r from-gray-800 to-gray-600 text-white'>
                        <tr>
                            <th className='p-4 text-left text-sm font-semibold'>Sr.</th>
                            <th className='p-4 text-left text-sm font-semibold'>Name</th>
                            <th className='p-4 text-left text-sm font-semibold'>Email</th>
                            <th className='p-4 text-left text-sm font-semibold'>Role</th>
                            <th className='p-4 text-left text-sm font-semibold'>Created Date</th>
                            <th className='p-4 text-left text-sm font-semibold'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white text-gray-800'>
                        {allUser.map((el, index) => (
                            <tr key={el._id} className='border-b hover:bg-gray-50 transition-colors duration-200'>
                                <td className='p-4 text-sm'>{index + 1}</td>
                                <td className='p-4 text-sm'>{el?.name}</td>
                                <td className='p-4 text-sm'>{el?.email}</td>
                                <td className='p-4 text-sm'>{el?.role}</td>
                                <td className='p-4 text-sm'>{moment(el?.createdAt).format('LL')}</td>
                                <td className='p-4 text-sm'>
                                    <button
                                        className='bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        onClick={() => {
                                            setUpdateUserDetails(el);
                                            setOpenUpdateRole(true);
                                        }}
                                    >
                                        <MdModeEdit size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {openUpdateRole && (
                <ChangeUserRole
                    onClose={() => setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )}
        </div>
    );
};

export default AllUsers;
