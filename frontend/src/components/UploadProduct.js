import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from 'react-icons/fa';
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from 'react-icons/md';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: '',
    brandName: '',
    category: '',
    productImage: [],
    description: '',
    price: '',
    sellingPrice: '',
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
  
    if (!file) {
      console.error('No file selected');
      return;
    }
  
    try {
      const uploadImageCloudinary = await uploadImage(file);
      console.log(uploadImageCloudinary);
  
      setData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.secure_url], // Use secure_url or url depending on the response
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => ({
      ...prev,
      productImage: [...newProductImage],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
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
      fetchData();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg w-full max-w-4xl h-full max-h-[80%] overflow-auto shadow-lg'>
        <div className='flex justify-between items-center pb-4'>
          <h2 className='text-2xl font-semibold text-black'>Upload Product</h2>
          <button 
            className='text-2xl text-black hover:text-red-600 transition' 
            onClick={onClose}
          >
            <CgClose />
          </button>
        </div>

        <form className='grid gap-4' onSubmit={handleSubmit}>
          <label htmlFor='productName' className='font-medium text-black'>Product Name:</label>
          <input 
            type='text' 
            id='productName' 
            placeholder='Enter product name' 
            name='productName'
            value={data.productName} 
            onChange={handleOnChange}
            className='p-3 border rounded-lg bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-black'
            required
          />

          <label htmlFor='brandName' className='font-medium text-black'>Brand Name:</label>
          <input 
            type='text' 
            id='brandName' 
            placeholder='Enter brand name' 
            value={data.brandName} 
            name='brandName'
            onChange={handleOnChange}
            className='p-3 border rounded-lg bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-black'
            required
          />

          <label htmlFor='category' className='font-medium text-black'>Category:</label>
          <select 
            id='category' 
            name='category' 
            value={data.category} 
            onChange={handleOnChange} 
            className='p-3 border rounded-lg bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-black'
            required
          >
            <option value='' className='text-black'>Select Category</option>
            {productCategory.map((el, index) => (
              <option value={el.value} key={el.value + index} className='text-black'>{el.label}</option>
            ))}
          </select>

          <label htmlFor='productImage' className='font-medium text-black'>Product Image:</label>
          <label htmlFor='uploadImageInput'>
            <div className='p-4 border rounded-lg bg-gray-100 border-gray-300 flex flex-col items-center cursor-pointer'>
              <FaCloudUploadAlt className='text-4xl text-black mb-2' />
              <p className='text-sm text-black'>Upload Product Image</p>
              <input 
                type='file' 
                id='uploadImageInput' 
                className='hidden' 
                onChange={handleUploadProduct} 
              />
            </div>
          </label>
          <div>
            {data?.productImage.length > 0 ? (
              <div className='flex flex-wrap gap-2'>
                {data.productImage.map((el, index) => (
                  <div className='relative group' key={index}>
                    <img 
                      src={el} 
                      alt={`Uploaded ${index}`} 
                      className='w-24 h-24 object-cover border rounded-lg cursor-pointer'
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }} 
                    />
                    <button 
                      className='absolute top-1 right-1 p-1 text-white bg-red-600 rounded-full hidden group-hover:block'
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-red-600 text-xs'>*Please upload product image</p>
            )}
          </div>

          <label htmlFor='price' className='font-medium text-black'>Price:</label>
          <input 
            type='number' 
            id='price' 
            placeholder='Enter price' 
            value={data.price} 
            name='price'
            onChange={handleOnChange}
            className='p-3 border rounded-lg bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-black'
            required
          />

          <label htmlFor='sellingPrice' className='font-medium text-black'>Selling Price:</label>
          <input 
            type='number' 
            id='sellingPrice' 
            placeholder='Enter selling price' 
            value={data.sellingPrice} 
            name='sellingPrice'
            onChange={handleOnChange}
            className='p-3 border rounded-lg bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-black'
            required
          />

          <label htmlFor='description' className='font-medium text-black'>Description:</label>
          <textarea 
            id='description'
            placeholder='Enter product description' 
            rows={4} 
            onChange={handleOnChange} 
            name='description'
            value={data.description}
            className='p-3 border rounded-lg bg-gray-100 border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-black text-black'
          ></textarea>

          <button 
            type='submit' 
            className='mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition'
          >
            Upload Product
          </button>
        </form>
      </div>

      {/* Display image full screen */}
      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </div>
  );
};

export default UploadProduct;
