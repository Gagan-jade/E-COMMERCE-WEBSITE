import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({ data, fetchdata }) => {
    const [editProduct, setEditProduct] = useState(false);

    return (
        <div className='bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center mb-2'>
                    <img src={data?.productImage[0]} className='mx-auto object-cover h-full w-full rounded-lg' alt={data.productName} />
                </div>
                <h1 className='text-gray-900 font-semibold text-center mb-1 line-clamp-2 h-12 overflow-hidden'>
                    {data.productName}
                </h1>
                <div className='text-center'>
                    <p className='text-xl font-bold text-green-600 mb-2'>
                        {displayINRCurrency(data.sellingPrice)}
                    </p>
                    <div 
                        className='w-fit mx-auto p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-full cursor-pointer transition-all duration-300 ease-in-out'
                        onClick={() => setEditProduct(true)}
                    >
                        <MdModeEditOutline size={24} />
                    </div>
                </div>
            </div>

            {editProduct && (
                <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
            )}
        </div>
    );
}

export default AdminProductCard;
