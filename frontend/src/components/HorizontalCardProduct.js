import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const HorizontalCardProduct = ({ category, heading }) => {
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

            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all bg-[#141414] rounded-lg py-2 overflow-y-hidden' ref={scrollElement}>
                <button className='bg-yellow-300 text-yellow-800 shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}>
                    <FaAngleLeft />
                </button>
                <button className='bg-yellow-300 text-yellow-800 shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}>
                    <FaAngleRight />
                </button>

                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-yellow-200 rounded-sm shadow-md flex'>
                            <div className='bg-yellow-300 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'></div>
                            <div className='p-4 grid w-full gap-2'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-yellow-500 bg-yellow-300 animate-pulse p-1 rounded-full'></h2>
                                <p className='capitalize text-yellow-400 p-1 bg-yellow-300 animate-pulse rounded-full'></p>
                                <div className='flex gap-3 w-full'>
                                    <p className='text-red-500 font-medium p-1 bg-yellow-300 w-full animate-pulse rounded-full'></p>
                                    <p className='text-yellow-400 line-through p-1 bg-yellow-300 w-full animate-pulse rounded-full'></p>
                                </div>
                                <button className='text-sm text-yellow-800 px-3 py-0.5 rounded-full w-full bg-yellow-300 animate-pulse'></button>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product) => (
                        <Link key={product?._id} to={`product/${product?._id}`} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-yellow-50 rounded-sm shadow-md flex'>
                            <div className='bg-gray-300 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                <img src={product?.productImage[0]} alt={product?.productName} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                            </div>
                            <div className='p-4 grid w-full gap-2'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-yellow-700'>{product?.productName}</h2>
                                <div className='flex gap-3 w-full'>
                                    <p className='text-red-700 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                    <p className='text-yellow-900 line-through'>{displayINRCurrency(product?.price)}</p>
                                </div>
                                <button
                                    className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full w-full transition-transform transform hover:scale-110'
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

export default HorizontalCardProduct;
