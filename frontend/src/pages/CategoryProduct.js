import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'

const CategoryProduct = () => {
    const [data,setData] = useState([])
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el =>{
      urlCategoryListObject[el] = true
    })

    const [selectCategory,setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList,setFilterCategoryList] = useState([])

    const [sortBy,setSortBy] = useState("")

    const fetchData = async()=>{
      const response = await fetch(SummaryApi.filterProduct.url,{
        method : SummaryApi.filterProduct.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          category : filterCategoryList
        })
      })

      const dataResponse = await response.json()
      setData(dataResponse?.data || [])
    }

    const handleSelectCategory = (e) =>{
      const {name , value, checked} =  e.target

      setSelectCategory((preve)=>{
        return{
          ...preve,
          [value] : checked
        }
      })
    }

    useEffect(()=>{
      fetchData()
    },[filterCategoryList])

    useEffect(()=>{
      const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName =>{
        if(selectCategory[categoryKeyName]){
          return categoryKeyName
        }
        return null
      }).filter(el => el)

      setFilterCategoryList(arrayOfCategory)

      //format for url change when change on the checkbox
      const urlFormat = arrayOfCategory.map((el,index) => {
        if((arrayOfCategory.length - 1 ) === index  ){
          return `category=${el}`
        }
        return `category=${el}&&`
      })

      navigate("/product-category?"+urlFormat.join(""))
    },[selectCategory])


    const handleOnChangeSortBy = (e)=>{
      const { value } = e.target

      setSortBy(value)

      if(value === 'asc'){
        setData(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
      }

      if(value === 'dsc'){
        setData(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
      }
    }

    useEffect(()=>{

    },[sortBy])
    
    return (
      <div className='min-h-screen bg-black text-white'>
        <div className='container mx-auto p-4'>
          <div className='lg:grid lg:grid-cols-[200px,1fr] lg:gap-4'>
            {/* Left Sidebar */}
            <div className='bg-gray-800 p-4 rounded-lg min-h-[calc(100vh-120px)] overflow-y-auto'>
              {/* Sort By */}
              <div className='mb-4'>
                <h3 className='text-lg font-semibold text-slate-300 border-b pb-2 border-slate-600'>Sort by</h3>
                <form className='mt-2'>
                  <div className='flex items-center mb-2'>
                    <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"} className='mr-2'/>
                    <label>Price - Low to High</label>
                  </div>
                  <div className='flex items-center'>
                    <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"} className='mr-2'/>
                    <label>Price - High to Low</label>
                  </div>
                </form>
              </div>
  
              {/* Filter by Category */}
              <div>
                <h3 className='text-lg font-semibold text-slate-300 border-b pb-2 border-slate-600'>Category</h3>
                <form className='mt-2'>
                  {
                    productCategory.map((categoryName) => (
                      <div key={categoryName.value} className='flex items-center mb-2'>
                        <input
                          type='checkbox'
                          name={"category"}
                          checked={selectCategory[categoryName.value]}
                          value={categoryName.value}
                          id={categoryName.value}
                          onChange={handleSelectCategory}
                          className='mr-2'
                        />
                        <label htmlFor={categoryName.value}>{categoryName.label}</label>
                      </div>
                    ))
                  }
                </form>
              </div>
            </div>
  
            {/* Right Side (Product List) */}
            <div className='px-4'>
              <p className='font-medium text-slate-300 text-lg my-4'>Search Results: {data.length}</p>
              <div className='flex flex-wrap gap-4'>
                {
                  data.length !== 0 && !loading && (
                    <VerticalCard data={data} loading={loading} />
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default CategoryProduct