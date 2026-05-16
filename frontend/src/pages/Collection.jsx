import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import Fuse from 'fuse.js'



const Collection = () => {

  const {products, search} = useContext(ShopContext)
  const [showFilter , SetshowFilter] = useState(false)
  const [filterProducts, setfilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setsubCategory] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortType, setSortType] = useState('relevant')

  const productsPerPage = 16

  const toggleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }
  }

  const toggleSubCategory = (e)=>{
    if(subCategory.includes(e.target.value)){
      setsubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setsubCategory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = ()=>{
    let productCopy = products.slice()

    if (search) {
      const fuse = new Fuse(productCopy, {
        keys: ['name', 'category', 'subCategory'],
        threshold: 0.4
      })
      productCopy = fuse.search(search).map(result => result.item)
    }

    if(category.length >0){
      productCopy = productCopy.filter(item => category.includes(item.category))
    }

    if(subCategory.length >0){
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setfilterProducts(productCopy)
  }

  const sortProduct =()=>{
    let fpcopy = filterProducts.slice()

    switch(sortType){
      case 'low-high':
        setfilterProducts(fpcopy.sort((a,b)=>(a.price - b.price )))
        break;
        case 'high-low':
        setfilterProducts(fpcopy.sort((a,b)=>(b.price - a.price )))
        break;
        default:
        applyFilter();
        break;  
      }
  }

  useEffect(() =>{
    sortProduct()
  },[sortType])

  const indexOfLastProduct = currentPage * productsPerPage

const indexOfFirstProduct =
  indexOfLastProduct - productsPerPage

const currentProducts = filterProducts.slice(
  indexOfFirstProduct,
  indexOfLastProduct
)

const totalPages = Math.ceil(
  filterProducts.length / productsPerPage
)


 useEffect(() => {
  applyFilter()
  setCurrentPage(1)
}, [category, subCategory, search])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter */}
      <div className='min-w-60 sm:sticky sm:top-20 h-fit'>
        <p onClick={() => {SetshowFilter(!showFilter)}} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}  alt="" />
        </p>
        {/* category */}
        <div className={`border border-gray-300 pl-3 py-3 mt-6 ${showFilter? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input type="checkbox" value={'Men'} className='w-3' onChange={toggleCategory} /> Men
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" value={'Women'} className='w-3' onChange={toggleCategory} /> Women
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" value={'Kids'} className='w-3' onChange={toggleCategory} /> Kids
              </p>
          </div>
        </div>

        {/* Sub-Category */}
        <div className={`border border-gray-300 pl-3 py-3 my-5 mt-6 ${showFilter? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input type="checkbox" value={'Topwear'} onChange={toggleSubCategory}  className='w-3' /> Topwear
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} className='w-3' /> Bottomwear
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} className='w-3' /> Winterwear
              </p>
          </div>
        </div>
      </div>


    {/* Right */}
    <div className='flex-1'>
      <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavant">Sort by: Relavant</option>
            <option value="low-high">Sort by: low to high</option>
            <option value="high-low">Sort by: high to low</option>
          </select>
      </div>

      {/* products */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
           currentProducts.map((items , index)=>(
              <ProductItem key={index} name={items.name} id={items._id} price={items.price} image={items.image}/>
            ))
          }
      </div>
      <div className='flex justify-center items-center gap-3 mt-10'>

  {[...Array(totalPages)].map((_, index) => (

    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      className={`px-4 py-2 border ${
        currentPage === index + 1
          ? 'bg-black text-white'
          : ''
      }`}
    >
      {index + 1}
    </button>

  ))}

</div>
    </div>

    
    </div>
  )
}

export default Collection