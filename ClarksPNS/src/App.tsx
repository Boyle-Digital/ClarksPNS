import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from '@/components/site/HeaderNav'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/util/ScrollToTop'

import Home from '@/pages/Home'
import About from '@/pages/About'
import Charity from '@/pages/Charity'
import Food from '@/pages/Food'
// import Sponsorship from '@/pages/Sponsorship'
import ClarksRewards from '@/pages/clarksrewards'
import CarWash from '@/pages/CarWash'
import Locations from '@/pages/Locations'
import StoreDetail from '@/pages/StoreDetail'
import FoodBrand from '@/pages/FoodBrand'
import BeerCave from '@/pages/BeerCave'
import Community from '@/pages/Community'
import Scholarship from '@/pages/Scholarship'
import Fleet from '@/pages/Fleet'
import Careers from '@/pages/Careers'
import Terms from '@/pages/Terms'
import Privacy from '@/pages/Privacy'
import NotFound from '@/pages/NotFound'

import { SpeedInsights } from '@vercel/speed-insights/react'

// test


export default function App () {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <div className='min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/clarks-rewards' element={<ClarksRewards />} />
          <Route path='/rewards' element={<ClarksRewards />} />
          <Route path='/car-wash' element={<CarWash />} />
          <Route path='/carwash' element={<CarWash />} />
          <Route path='/locations' element={<Locations />} />
          <Route path='/locations/:slug' element={<StoreDetail />} />
          <Route path='/about-us' element={<About />} />
          <Route path='/Charity' element={<Charity />} />
          <Route path='/Food' element={<Food />} />
          <Route path='/food/:slug' element={<FoodBrand />} />
          <Route path='/beer-cave' element={<BeerCave />} />
          <Route path='/community' element={<Community />} />
          <Route path='/scholarship' element={<Scholarship />} />
          <Route path='/fleet' element={<Fleet />} />
          <Route path='/Careers' element={<Careers />} />
          <Route path='/terms' element={<Terms />} />
          <Route path='/privacy' element={<Privacy />} />
          {/* <Route path='/Sponsorship' element={<Sponsorship />} /> */}
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      <SpeedInsights />
      </div>
    </BrowserRouter>
  )
}
