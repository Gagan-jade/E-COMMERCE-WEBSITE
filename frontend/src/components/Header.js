// import React, { useContext, useState, useEffect, useRef } from 'react';
// import { GrSearch } from "react-icons/gr";
// import { FaRegCircleUser } from "react-icons/fa6";
// import { FaShoppingCart } from "react-icons/fa";
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import SummaryApi from '../common';
// import { toast } from 'react-toastify';
// import { setUserDetails } from '../store/userSlice';
// import ROLE from '../common/role';
// import { useCart } from '../context/CartContext';

// const Header = () => {
//   const user = useSelector(state => state?.user?.user);
//   const dispatch = useDispatch();
//   const [menuDisplay, setMenuDisplay] = useState(false);
//   const { cartProductCount } = useCart(); // Use the cart context
//   const navigate = useNavigate();
//   const location = useLocation();
//   const searchInput = location.search;
//   const URLSearch = new URLSearchParams(searchInput);
//   const searchQuery = URLSearch.get("q");
//   const [search, setSearch] = useState(searchQuery);
  
//   const menuRef = useRef(null);

//   const handleLogout = async () => {
//     const fetchData = await fetch(SummaryApi.logout_user.url, {
//       method: SummaryApi.logout_user.method,
//       credentials: 'include'
//     });

//     const data = await fetchData.json();

//     if (data.success) {
//       toast.success(data.message);
//       dispatch(setUserDetails(null));
//       navigate("/");
//     }

//     if (data.error) {
//       toast.error(data.message);
//     }
//   };

//   const handleSearch = (e) => {
//     const { value } = e.target;
//     setSearch(value);

//     if (value) {
//       navigate(`/search?q=${value}`);
//     } else {
//       navigate("/search");
//     }
//   };

//   // Determine if the search bar should be visible
//   const hideSearchBarPages = ['/signin', '/signup'];
//   const hideSearchBar = hideSearchBarPages.includes(location.pathname);

//   // Close menu if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setMenuDisplay(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [menuRef]);

//   return (
//     <header className='h-16 shadow-md bg-gradient-to-r from-gray-900 via-black to-gray-900 fixed w-full z-40'>
//       <div className='h-full container mx-auto flex items-center px-4 justify-between'>
//         <div className='flex items-center'>
//           <Link to={"/"}>
//             <div className='relative flex items-center text-white font-bold text-4xl'>
//               <div className='absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-lg blur-md z-[-1]' />
//               <div className='text-white'>
//                 JADES
//               </div>
//             </div>
//           </Link>
//         </div>

//         {!hideSearchBar && (
//           <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full bg-gray-800 relative'>
//             <input
//               type='text'
//               placeholder='Search product...'
//               className='w-full outline-none bg-transparent text-white placeholder-gray-400 rounded-l-full py-2 px-4'
//               onChange={handleSearch}
//               value={search}
//             />
//             <div className='absolute right-0 top-0 h-full flex items-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 rounded-r-full px-3'>
//               <div className='flex items-center justify-center h-full text-lg cursor-pointer'>
//                 <GrSearch className='text-white' />
//               </div>
//             </div>
//           </div>
//         )}

//         <div className='flex items-center gap-7'>
//           <div className='relative flex items-center' ref={menuRef}>
//             {user?._id && (
//               <div
//                 className='text-3xl cursor-pointer relative'
//                 onClick={() => setMenuDisplay(prev => !prev)}
//               >
//                 {user?.profilePic ? (
//                   <img
//                     src={user?.profilePic}
//                     className='w-10 h-10 rounded-full border-2 border-yellow-500'
//                     alt={user?.name}
//                   />
//                 ) : (
//                   <FaRegCircleUser className='text-yellow-500' />
//                 )}

//                 {menuDisplay && (
//                   <div className='absolute bg-gray-800 top-12 right-0 w-48 p-2 shadow-lg rounded-md'>
//                     <nav>
//                       {user?.role === ROLE.ADMIN && (
//                         <Link
//                           to={"/admin-panel/all-products"}
//                           className='block text-white text-sm hover:bg-yellow-500 p-1 rounded-md'
//                           onClick={() => setMenuDisplay(prev => !prev)}
//                         >
//                           Admin Panel
//                         </Link>
//                       )}
//                       <button
//                         onClick={handleLogout}
//                         className='block w-full text-left text-white text-sm hover:bg-red-700 p-1 rounded-md'
//                       >
//                         Logout
//                       </button>
//                     </nav>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {user?._id && (
//             <Link to={"/cart"} className='text-2xl relative'>
//               <FaShoppingCart className='text-white' />
//               <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
//                 <p className='text-xs'>{cartProductCount}</p>
//               </div>
//             </Link>
//           )}

//           <div>
//             {!user?._id && (
//               <Link
//                 to={"/login"}
//                 className='px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition'
//               >
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


import React, { useState, useEffect, useRef } from 'react';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import { useCart } from '../context/CartContext';

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const { cartProductCount } = useCart(); // Use the cart context
  const navigate = useNavigate();
  const location = useLocation();
  const searchInput = location.search;
  const URLSearch = new URLSearchParams(searchInput);
  const searchQuery = URLSearch.get("q");
  const [search, setSearch] = useState(searchQuery);
  
  const menuRef = useRef(null);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  // Determine if the search bar should be visible
  const hideSearchBarPages = ['/signin', '/signup'];
  const hideSearchBar = hideSearchBarPages.includes(location.pathname);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuDisplay(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <header className='h-16 shadow-md fixed w-full z-40'>
      <div className='relative h-full bg-gradient-to-r from-gray-700 via-gray-900 to-black'>
        <div className='absolute inset-0 bg-[url("https://your-background-image-url.jpg")] bg-cover bg-blur-md opacity-60' />
        <div className='relative container mx-auto flex items-center px-4 justify-between h-full'>
          <div className='flex items-center'>
            <Link to={"/"}>
              <div className='relative flex items-center text-white font-bold text-4xl'>
                <div className='absolute inset-0 bg-gradient-to-r from-purple-900 via-blue-900 to-teal-900 rounded-lg blur-md z-[-1]' />
                <div className='text-white'>
                  JADES
                </div>
              </div>
            </Link>
          </div>

          {!hideSearchBar && (
            <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full bg-gray-800 relative'>
              <input
                type='text'
                placeholder='Search product...'
                className='w-full outline-none bg-transparent text-white placeholder-gray-400 rounded-l-full py-2 px-4'
                onChange={handleSearch}
                value={search}
              />
              <div className='absolute right-0 top-0 h-full flex items-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 rounded-r-full px-3'>
                <div className='flex items-center justify-center h-full text-lg cursor-pointer'>
                  <GrSearch className='text-white' />
                </div>
              </div>
            </div>
          )}

          <div className='flex items-center gap-7'>
            <div className='relative flex items-center' ref={menuRef}>
              {user?._id && (
                <div
                  className='text-3xl cursor-pointer relative'
                  onClick={() => setMenuDisplay(prev => !prev)}
                >
                  {user?.profilePic ? (
                    <img
                      src={user?.profilePic}
                      className='w-10 h-10 rounded-full border-2 border-yellow-500'
                      alt={user?.name}
                    />
                  ) : (
                    <FaRegCircleUser className='text-yellow-500' />
                  )}

                  {menuDisplay && (
                    <div className='absolute bg-gray-800 top-12 right-0 w-48 p-2 shadow-lg rounded-md'>
                      <nav>
                        {user?.role === ROLE.ADMIN && (
                          <Link
                            to={"/admin-panel/all-products"}
                            className='block text-white text-sm hover:bg-yellow-500 p-1 rounded-md'
                            onClick={() => setMenuDisplay(prev => !prev)}
                          >
                            Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className='block w-full text-left text-white text-sm hover:bg-red-700 p-1 rounded-md'
                        >
                          Logout
                        </button>
                      </nav>
                    </div>
                  )}
                </div>
              )}
            </div>

            {user?._id && (
              <Link to={"/cart"} className='text-2xl relative'>
                <FaShoppingCart className='text-white' />
                <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-xs'>{cartProductCount}</p>
                </div>
              </Link>
            )}

            <div>
              {!user?._id && (
                <Link
                  to={"/login"}
                  className='px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition'
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
