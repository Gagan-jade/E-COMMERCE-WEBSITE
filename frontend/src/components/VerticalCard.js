import React, { useContext, useState } from 'react';
import scrollTop from '../helpers/scrollTop';
import displayINRCurrency from '../helpers/displayCurrency';
import Context from '../context';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';

const VerticalCard = ({ loading, data = [] }) => {
    const loadingList = new Array(13).fill(null);
    const { fetchUserAddToCart } = useContext(Context);
    const [cartItems, setCartItems] = useState({});

    const handleAddToCart = async (e, id) => {
        e.preventDefault(); // Prevent default form behavior if button is inside a form
        try {
            await addToCart(e, id);
            await fetchUserAddToCart();
            setCartItems((prevCartItems) => ({
                ...prevCartItems,
                [id]: (prevCartItems[id] || 0) + 1,
            }));
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const handleIncrement = (e, id) => {
        e.preventDefault();
        setCartItems((prevCartItems) => ({
            ...prevCartItems,
            [id]: prevCartItems[id] + 1,
        }));
    };

    const handleDecrement = (e, id) => {
        e.preventDefault();
        setCartItems((prevCartItems) => {
            const newCartItems = { ...prevCartItems };
            if (newCartItems[id] > 1) {
                newCartItems[id] -= 1;
            } else {
                delete newCartItems[id];
            }
            return newCartItems;
        });
    };

    return (
        <div className='flex flex-wrap gap-6 justify-center overflow-x-auto py-6 px-4'>
            {loading ? (
                loadingList.map((_, index) => (
                    <div
                        key={index}
                        className='w-full max-w-[280px] md:max-w-[320px] bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'
                    >
                        <div className='bg-slate-200 h-48 flex justify-center items-center'>
                            <div className='w-full h-full animate-pulse bg-slate-300'></div>
                        </div>
                        <div className='p-4'>
                            <h2 className='text-lg font-semibold text-transparent bg-slate-200 h-6 animate-pulse rounded-md'></h2>
                            <p className='text-slate-500 bg-slate-200 h-4 mt-2 animate-pulse rounded-md'></p>
                            <div className='flex gap-3 mt-4'>
                                <p className='text-red-600 bg-slate-200 h-6 w-24 animate-pulse rounded-md'></p>
                                <p className='text-slate-500 bg-slate-200 h-6 w-24 line-through animate-pulse rounded-md'></p>
                            </div>
                            <button className='mt-4 w-full py-2 text-sm font-medium text-white bg-slate-200 rounded-full animate-pulse'></button>
                        </div>
                    </div>
                ))
            ) : (
                data.map((product) => (
                    <Link
                        key={product?._id}
                        to={`/product/${product?._id}`}
                        className='w-full max-w-[280px] md:max-w-[300px] bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'
                        onClick={scrollTop}
                    >
                        <div className='bg-slate-200 h-48 flex justify-center items-center'>
                            <img
                                src={product?.productImage[0]}
                                alt={product?.productName}
                                className='object-cover h-full w-full transition-transform duration-300 transform hover:scale-105'
                            />
                        </div>
                        <div className='p-4'>
                            <h2 className='text-lg font-semibold text-gray-800'>{product?.productName}</h2>
                            <p className='text-slate-500 capitalize'>{product?.category}</p>
                            <div className='flex gap-3 mt-2'>
                                <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                            </div>
                            {cartItems[product?._id] ? (
                                <div className='flex items-center justify-between mt-4'>
                                    <button
                                        className='w-8 h-8 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-full transition-colors duration-300'
                                        onClick={(e) => handleDecrement(e, product?._id)}
                                    >
                                        -
                                    </button>
                                    <span className='text-gray-800'>{cartItems[product?._id]}</span>
                                    <button
                                        className='w-8 h-8 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-full transition-colors duration-300'
                                        onClick={(e) => handleIncrement(e, product?._id)}
                                    >
                                        +
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className='mt-4 w-full py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-full transition-colors duration-300'
                                    onClick={(e) => handleAddToCart(e, product?._id)}
                                >
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
};

export default VerticalCard;
