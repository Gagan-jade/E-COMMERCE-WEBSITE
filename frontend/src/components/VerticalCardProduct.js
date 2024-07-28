import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);

    const scrollElement = useRef();

    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const categoryProduct = await fetchCategoryWiseProduct(category);
            setData(categoryProduct?.data || []);
        } catch (error) {
            console.error("Error fetching category products:", error);
            setData([]); // Set data to empty array on error
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    };

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    };

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4 text-white'>{heading}</h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll overflow-y-hidden scrollbar-none transition-all bg-[#141414] rounded-lg py-2' ref={scrollElement}>
                <button className='bg-yellow-300 text-yellow-800 shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}>
                    <FaAngleLeft />
                </button>
                <button className='bg-yellow-300 text-yellow-800 shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}>
                    <FaAngleRight />
                </button>

                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-yellow-200 rounded-sm shadow-md'>
                            <div className='bg-yellow-300 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'></div>
                            <div className='p-4 grid gap-3'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-yellow-500 p-1 py-2 animate-pulse rounded-full bg-yellow-300'></h2>
                                <p className='capitalize text-yellow-400 p-1 animate-pulse rounded-full bg-yellow-300 py-2'></p>
                                <div className='flex gap-3'>
                                    <p className='text-red-500 font-medium p-1 animate-pulse rounded-full bg-yellow-300 w-full py-2'></p>
                                    <p className='text-yellow-400 line-through p-1 animate-pulse rounded-full bg-yellow-300 w-full py-2'></p>
                                </div>
                                <button className='text-sm text-yellow-800 px-3 py-2 rounded-full bg-yellow-300 animate-pulse'></button>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product) => (
                        <Link key={product?._id} to={`product/${product?._id}`} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-yellow-50 rounded-sm shadow-md'>
                            <div className='bg-gray-300 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                <img src={product?.productImage[0]} alt={product?.productName} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                            </div>
                            <div className='p-4 grid gap-3'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-yellow-700'>{product?.productName}</h2>
                                <p className='capitalize text-yellow-500'>{product?.category}</p>
                                <div className='flex gap-3'>
                                    <p className='text-red-700 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                    <p className='text-yellow-900 line-through'>{displayINRCurrency(product?.price)}</p>
                                </div>
                                <button 
                                    className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-full transition-transform transform hover:scale-125' 
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

export default VerticalCardProduct;
