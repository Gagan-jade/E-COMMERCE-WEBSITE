import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from 'react-icons/fa';
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from 'react-icons/md';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState('');

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url],
    }));
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => ({
      ...prev,
      productImage: [...newProductImage],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchdata();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-200 bg-opacity-60 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl h-full max-h-[90%] overflow-auto'>
        <div className='flex justify-between items-center pb-4'>
          <h2 className='font-bold text-2xl text-black'>Edit Product</h2>
          <div
            className='text-3xl text-red-600 cursor-pointer hover:text-red-700'
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form className='grid gap-4' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <label htmlFor='productName' className='block text-lg font-semibold text-black'>Product Name:</label>
            <input
              type='text'
              id='productName'
              placeholder='Enter product name'
              name='productName'
              value={data.productName}
              onChange={handleOnChange}
              className='w-full p-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-black'
              required
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='brandName' className='block text-lg font-semibold text-black'>Brand Name:</label>
            <input
              type='text'
              id='brandName'
              placeholder='Enter brand name'
              value={data.brandName}
              name='brandName'
              onChange={handleOnChange}
              className='w-full p-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-black'
              required
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='category' className='block text-lg font-semibold text-black'>Category:</label>
            <select
              id='category'
              name='category'
              value={data.category}
              onChange={handleOnChange}
              className='w-full p-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-black'
              required
            >
              <option value='' className='text-black'>Select Category</option>
              {productCategory.map((el, index) => (
                <option value={el.value} key={el.value + index} className='text-black'>
                  {el.label}
                </option>
              ))}
            </select>
          </div>

          <div className='space-y-2'>
            <label htmlFor='productImage' className='block text-lg font-semibold text-black'>Product Image:</label>
            <label htmlFor='uploadImageInput'>
              <div className='p-4 bg-gray-100 border border-gray-300 rounded-lg h-40 w-full flex flex-col items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300'>
                <div className='text-black flex flex-col items-center gap-2'>
                  <FaCloudUploadAlt className='text-4xl' />
                  <p className='text-sm text-black'>Upload Product Image</p>
                  <input
                    type='file'
                    id='uploadImageInput'
                    className='hidden'
                    onChange={handleUploadProduct}
                  />
                </div>
              </div>
            </label>
            <div className='flex flex-wrap gap-2'>
              {data.productImage[0] ? (
                data.productImage.map((el, index) => (
                  <div className='relative group' key={index}>
                    <img
                      src={el}
                      alt={el}
                      width={100}
                      height={100}
                      className='bg-gray-100 border border-gray-300 rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300'
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div
                      className='absolute top-1 right-1 p-1 text-white bg-red-600 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer'
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-red-600 text-xs'>*Please upload product image</p>
              )}
            </div>
          </div>

          <div className='space-y-2'>
            <label htmlFor='price' className='block text-lg font-semibold text-black'>Price:</label>
            <input
              type='number'
              id='price'
              placeholder='Enter price'
              value={data.price}
              name='price'
              onChange={handleOnChange}
              className='w-full p-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-black'
              required
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='sellingPrice' className='block text-lg font-semibold text-black'>Selling Price:</label>
            <input
              type='number'
              id='sellingPrice'
              placeholder='Enter selling price'
              value={data.sellingPrice}
              name='sellingPrice'
              onChange={handleOnChange}
              className='w-full p-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-black'
              required
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='description' className='block text-lg font-semibold text-black'>Description:</label>
            <textarea
              id='description'
              placeholder='Enter product description'
              rows={4}
              onChange={handleOnChange}
              name='description'
              value={data.description}
              className='w-full p-3 bg-gray-100 border border-gray-300 rounded-lg resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-black'
            />
          </div>

          <button
            type='submit'
            className='w-full px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-300'
          >
            Update Product
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </div>
  );
};

export default AdminEditProduct;
