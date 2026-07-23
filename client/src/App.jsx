import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import CarsListing from './pages/CarsListing'
import CarDetails from './pages/CarDetails'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import './index.css'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BrowseCars from './pages/BrowseCars'
import FAQ from './pages/FAQ'
import Support from './pages/Support'
import Careers from './pages/Careers'

function App() {
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cars' element={<CarsListing />} />
            <Route path='/browse' element={<BrowseCars />} />
            <Route path='/cars/:id' element={<CarDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/support' element={<Support />} />
            <Route path='/careers' element={<Careers />} />
            <Route path='/dashboard/*' element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
