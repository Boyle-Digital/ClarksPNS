import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from '@/components/site/HeaderNav'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import ClarksRewards from '@/pages/clarksrewards'
import CarWash from "@/pages/CarWash";
import Locations from "@/pages/Locations";



export default function App () {
  return (
    <BrowserRouter>
      <div className='min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50'>
        <Header />
        <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clarks-rewards" element={<ClarksRewards />} />
      <Route path="/rewards" element={<ClarksRewards />} />
      <Route path="/car-wash" element={<CarWash />} />
      <Route path="/carwash" element={<CarWash />} />
            <Route path="/locations" element={<Locations />} />

    </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
