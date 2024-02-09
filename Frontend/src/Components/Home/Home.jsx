import React from 'react'
import Herosection from './Herosection'
import Howitwork from './Howitwork'
import Popularcompanies from './Popularcompanies'
import PopularCategory from './PopularCategory'

const Home = () => {
  return (
 <>
  <section className="homePage page">
        <Herosection />
        <Howitwork />
        <PopularCategory />
        <Popularcompanies />
      </section>
 </>
  )
}

export default Home