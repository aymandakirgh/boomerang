import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Company from './pages/Company'
import Demo from './pages/Demo'
import Home from './pages/Home'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'
import Pricing from './pages/Pricing'
import Product from './pages/Product'
import Solutions from './pages/Solutions'

export default function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/company" element={<Company />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/legal/:doc" element={<Legal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}
