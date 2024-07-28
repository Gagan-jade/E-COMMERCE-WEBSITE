import React, { useContext, useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import scrollTop from '../helpers/scrollTop';

const CategoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    e.preventDefault(); // Prevent the default link behavior
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data || []);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className='container mx-auto px-4 my-6'>
      <h2 className='text-2xl font-semibold mb-4'>{heading}</h2>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] gap-6 overflow-x-scroll scrollbar-none'>
        {loading ? (
          loadingList.map((_, index) => (
            <div key={index} className='w-full bg-white rounded-lg shadow-lg p-4 animate-pulse'>
              <div className='bg-slate-200 h-48 rounded-lg mb-4'></div>
              <div className='p-4'>
                <div className='bg-slate-200 h-6 mb-2 rounded'></div>
                <div className='bg-slate-200 h-4 mb-4 rounded'></div>
                <div className='flex gap-4'>
                  <div className='bg-slate-200 h-6 w-1/2 rounded'></div>
                  <div className='bg-slate-200 h-6 w-1/2 rounded'></div>
                </div>
                <div className='bg-slate-200 h-8 w-1/2 mt-4 rounded'></div>
              </div>
            </div>
          ))
        ) : (
          data.map((product) => (
            <Link
              to={`/product/${product?._id}`}
              className='w-full bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105'
              key={product?._id}
              onClick={scrollTop}
            >
              <div className='bg-slate-200 h-48 flex justify-center items-center'>
                <img
                  src={product.productImage[0]}
                  alt={product.productName}
                  className='object-cover h-full w-full transition-transform transform hover:scale-110'
                />
              </div>
              <div className='p-4'>
                <h2 className='text-lg font-semibold text-black mb-2 truncate'>{product?.productName}</h2>
                <p className='capitalize text-slate-500 mb-2'>{product?.category}</p>
                <div className='flex gap-4 mb-2'>
                  <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                  <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                </div>
                <button
                  className='text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full'
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
