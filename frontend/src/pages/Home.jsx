import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="flex flex-col md:flex-row gap-6 px-4 sm:px-10 my-10">
        <div className="w-full md:w-1/2">
          <LatestCollection />
        </div>
        <div className="w-full md:w-1/2">
          <BestSeller />
        </div>
      </div>
      <OurPolicy />
      <NewsLetterBox />
    </div>
  )
}

export default Home