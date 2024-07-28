import './App.css';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { CartProvider } from './context/CartContext';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const location = useLocation(); // Get the current route location

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();

    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    /**user Details */
    fetchUserDetails();
    /**user Details cart product */
    fetchUserAddToCart();
  }, []);

  // Determine if the current route is login or sign-up
  const isAuthPage = ['/login', '/sign-up'].includes(location.pathname);

  console.log('Current path:', location.pathname); // Debugging

  return (
    <>
        <CartProvider>
          <Context.Provider
            value={{
              fetchUserDetails, // user detail fetch
              cartProductCount, // current user add to cart product count,
              fetchUserAddToCart,
            }}
          >
            <ToastContainer position="top-center" />

            {/* Conditionally render Header */}
            {!isAuthPage && <Header />}

            <main
              className={`${isAuthPage ? 'min-h-screen pt-0' : 'min-h-[calc(100vh-120px)] pt-16'
                }`}
            >
              <Outlet />
            </main>

            {/* Conditionally render Footer */}
            <Footer />
          </Context.Provider>
        </CartProvider>
    </>
  );
}

export default App;
