import React, { useState } from 'react';
import ROLE from '../common/role';
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {
    const [userRole, setUserRole] = useState(role);

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);
    }

    const updateUserRole = async () => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole
            })
        });

        const responseData = await fetchResponse.json();

        if (responseData.success) {
            toast.success(responseData.message);
            onClose();
            callFunc();
        } else {
            toast.error(responseData.message);
        }
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50'>
            <div className='mx-auto bg-white shadow-md p-6 w-full max-w-sm rounded-lg'>
                <button className='block ml-auto text-gray-500 hover:text-gray-800' onClick={onClose}>
                    <IoMdClose size={24} />
                </button>
                <h1 className='pb-4 text-xl font-semibold text-gray-800'>Change User Role</h1>
                <p className='text-gray-700 mb-2'><strong>Name:</strong> {name}</p>
                <p className='text-gray-700 mb-4'><strong>Email:</strong> {email}</p>
                <div className='flex items-center justify-between mb-4'>
                    <p className='text-gray-700'><strong>Role:</strong></p>
                    <select
                        className='border border-gray-300 px-4 py-2 rounded text-gray-700'
                        value={userRole}
                        onChange={handleOnChangeSelect}
                    >
                        {Object.values(ROLE).map(el => (
                            <option value={el} key={el}>{el}</option>
                        ))}
                    </select>
                </div>
                <button
                    className='w-full py-2 mt-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    onClick={updateUserRole}
                >
                    Change Role
                </button>
            </div>
        </div>
    );
}

export default ChangeUserRole;
