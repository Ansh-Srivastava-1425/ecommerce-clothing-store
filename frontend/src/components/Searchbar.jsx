import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Searchbar = () => {

    const {search, setSearch} = useContext(ShopContext)
    const navigate = useNavigate();

    const handleSearch = () => {
        if(search.trim()) navigate('/collection')
    }

  return (
    <div className='flex items-center justify-center gap-2 px-4 py-2'>
        <div className='flex items-center border px-3 py-1.5 rounded-md w-64'>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className='flex-1 outline-none bg-inherit text-sm'
                type="text"
                placeholder='Search'
            />
            <img onClick={handleSearch} className='w-3.5 ml-2 opacity-60 cursor-pointer' src={assets.search_icon} alt="" />
        </div>
    </div>
  )
}

export default Searchbar