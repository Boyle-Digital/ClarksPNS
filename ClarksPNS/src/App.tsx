import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from '@/components/site/HeaderNav'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/util/ScrollToTop'

import Home from '@/pages/Home'
import About from '@/pages/About'
import Charity from '@/pages/Charity'
import Food from '@/pages/Food'
import Sponsorship from '@/pages/Sponsorship'
import ClarksRewards from '@/pages/clarksrewards'
import CarWash from '@/pages/CarWash'
import Locations from '@/pages/Locations'
import Careers from '@/pages/Careers'
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
          <Route path='/about-us' element={<About />} />
          <Route path='/Charity' element={<Charity />} />
          <Route path='/Food' element={<Food />} />
          <Route path='/Careers' element={<Careers />} />
          <Route path='/Sponsorship' element={<Sponsorship />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
