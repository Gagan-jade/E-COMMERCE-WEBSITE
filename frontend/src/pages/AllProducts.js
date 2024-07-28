import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    console.log("product data", dataResponse)

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])

  return (
    <div className='bg-gray-800 min-h-screen p-6'>
      <div className='bg-gradient-to-r from-gray-700 to-gray-600 py-2 px-4 flex justify-between items-center rounded-lg shadow-md'>
        <h2 className='font-bold text-lg text-gray-100'>All Products</h2>
        <button
          className='border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all py-1 px-3 rounded-full'
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll scrollbar-none'>
        {allProduct.map((product, index) => (
          <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />
        ))}
      </div>

      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
      )}
    </div>
  )
}

export default AllProducts
