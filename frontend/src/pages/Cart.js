import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { useCart } from '../context/CartContext';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from 'react-icons/md';

const Cart = () => {
    const [loading, setLoading] = useState(false);
    const { cart, updateCart } = useCart();

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.addToCartProductView.url, {
                method: SummaryApi.addToCartProductView.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData = await response.json();

            if (responseData.success) {
                updateCart(responseData.data);
            } else {
                console.error(responseData.message);
            }
        } catch (error) {
            console.error('Failed to fetch cart data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateQuantity = async (id, quantity) => {
        if (quantity <= 0) return;

        try {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: id, quantity }),
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData(); // Refresh cart data
            }
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

    const deleteCartProduct = async (id) => {
        try {
            const response = await fetch(SummaryApi.deleteCartProduct.url, {
                method: SummaryApi.deleteCartProduct.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: id }),
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData(); // Refresh cart data
            }
        } catch (error) {
            console.error('Failed to delete cart product:', error);
        }
    };

    const totalQty = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.quantity * item.productId.sellingPrice, 0);

    return (
        <div className='flex flex-col min-h-screen bg-gray-900 text-white'>
            <div className='relative flex-1 overflow-hidden'>
                <div className='absolute inset-0 -z-10 bg-cover bg-center bg-[url("https://your-background-image-url.jpg")] bg-blur-2xl'></div>
                <div className='relative z-10 container mx-auto p-6'>
                    <div className='text-center text-2xl mb-6'>
                        {cart.length === 0 && !loading && <p className='bg-gray-800 py-5 rounded-lg shadow-md text-gray-400'>No Items in Cart</p>}
                    </div>

                    <div className='flex flex-col lg:flex-row gap-6 lg:gap-10'>
                        <div className='w-full max-w-4xl'>
                            {loading ? (
                                new Array(4).fill(null).map((_, index) => (
                                    <div key={index} className='bg-gray-800 h-32 my-2 rounded-lg shadow animate-pulse' />
                                ))
                            ) : (
                                cart.map((product) => (
                                    <div key={product._id} className='bg-gray-800 h-32 my-2 rounded-lg shadow-lg flex items-center'>
                                        <div className='w-32 h-32 overflow-hidden'>
                                            <img
                                                src={product.productId.productImage[0]}
                                                alt={product.productId.productName}
                                                className='w-full h-full object-cover'
                                            />
                                        </div>
                                        <div className='flex-1 px-4 py-2'>
                                            <div className='flex justify-between items-center'>
                                                <h2 className='text-xl font-semibold'>{product.productId.productName}</h2>
                                                <div
                                                    className='text-red-600 cursor-pointer hover:text-red-400'
                                                    onClick={() => deleteCartProduct(product._id)}
                                                >
                                                    <MdDelete size={24} />
                                                </div>
                                            </div>
                                            <p className='text-gray-400'>{product.productId.category}</p>
                                            <div className='flex items-center justify-between mt-2'>
                                                <p className='text-red-500 font-medium'>{displayINRCurrency(product.productId.sellingPrice)}</p>
                                                <p className='text-gray-200 font-semibold'>{displayINRCurrency(product.productId.sellingPrice * product.quantity)}</p>
                                            </div>
                                            <div className='flex items-center gap-2 mt-2'>
                                                <button
                                                    className='border border-red-500 text-red-500 hover:bg-red-500 hover:text-white w-8 h-8 flex items-center justify-center rounded-full'
                                                    onClick={() => updateQuantity(product._id, product.quantity - 1)}
                                                >
                                                    -
                                                </button>
                                                <span className='text-lg font-semibold'>{product.quantity}</span>
                                                <button
                                                    className='border border-red-500 text-red-500 hover:bg-red-500 hover:text-white w-8 h-8 flex items-center justify-center rounded-full'
                                                    onClick={() => updateQuantity(product._id, product.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className='w-full max-w-sm'>
                            {loading ? (
                                <div className='bg-gray-800 h-36 rounded-lg shadow animate-pulse' />
                            ) : (
                                <div className='bg-gray-800 rounded-lg shadow-lg p-4'>
                                    <h2 className='text-xl font-semibold bg-red-600 p-2 rounded-t-lg'>Summary</h2>
                                    <div className='flex items-center justify-between mt-2 text-gray-200 font-medium'>
                                        <p>Quantity</p>
                                        <p>{totalQty}</p>
                                    </div>
                                    <div className='flex items-center justify-between mt-2 text-gray-200 font-medium'>
                                        <p>Total Price</p>
                                        <p>{displayINRCurrency(totalPrice)}</p>
                                    </div>
                                    <button className='bg-blue-600 text-white p-2 w-full mt-4 rounded-lg hover:bg-blue-700'>Proceed to Payment</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

           
        </div>
    );
};

export default Cart;
