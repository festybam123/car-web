import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { carAPI } from '../services/api'
import CarCard from '../components/CarCard'
import demoCars from '../data/demoCars'

export default function Home() {
  const [featuredCars, setFeaturedCars] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const response = await carAPI.getFeaturedCars()
        setFeaturedCars(response.data.cars || demoCars.slice(0, 8))
      } catch (error) {
        console.error('Error fetching cars:', error)
        setFeaturedCars(demoCars.slice(0, 8))
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedCars()
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className='relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center overflow-hidden'>
        <div className='absolute inset-0 opacity-30'>
          <div className='absolute w-96 h-96 bg-gold-500 rounded-full blur-3xl top-20 left-10'></div>
          <div className='absolute w-96 h-96 bg-gold-600 rounded-full blur-3xl bottom-20 right-10'></div>
        </div>

        <div className='container-custom relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='max-w-3xl'
          >
            <h1 className='text-5xl md:text-7xl font-bold text-white mb-6'>
              Find Your Perfect <span className='gradient-text'>Car</span>
            </h1>
            <p className='text-xl text-gray-300 mb-8'>
              Discover premium vehicles from trusted dealers. Financing, test drives, and expert support available.
            </p>
            <div className='flex gap-4'>
              <Link to='/cars' className='btn-primary'>
                Browse Cars
              </Link>
              <button className='btn-secondary'>
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className='section-padding bg-white dark:bg-gray-800'>
        <div className='container-custom'>
          <h2 className='text-3xl font-bold mb-8 text-center'>Find Your Car</h2>
          <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
            <input type='text' placeholder='Brand' className='px-4 py-3 border dark:border-gray-700 rounded-lg' />
            <input type='text' placeholder='Model' className='px-4 py-3 border dark:border-gray-700 rounded-lg' />
            <select className='px-4 py-3 border dark:border-gray-700 rounded-lg'>
              <option>Price Range</option>
            </select>
            <select className='px-4 py-3 border dark:border-gray-700 rounded-lg'>
              <option>Year</option>
            </select>
            <button className='btn-primary'>Search</button>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className='section-padding bg-gray-50 dark:bg-gray-900'>
        <div className='container-custom'>
          <h2 className='text-3xl font-bold mb-12 text-center'>Featured Cars</h2>
          {loading ? (
            <div className='text-center py-12'>Loading cars...</div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {featuredCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className='section-padding bg-white dark:bg-gray-800'>
        <div className='container-custom'>
          <h2 className='text-3xl font-bold mb-12 text-center'>Why Choose festybam Motors</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              { title: 'Trusted Dealers', description: 'Work with verified and certified dealers' },
              { title: 'Best Prices', description: 'Competitive pricing and financing options' },
              { title: 'Test Drive', description: 'Free test drive and inspection available' }
            ].map((item, index) => (
              <div key={index} className='text-center p-8 card-shadow rounded-lg'>
                <div className='text-4xl mb-4'>
                  {index === 0 && '🤝'}
                  {index === 1 && '💰'}
                  {index === 2 && '🏁'}
                </div>
                <h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
                <p className='text-gray-600 dark:text-gray-400'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='section-padding bg-gradient-to-r from-gold-500 to-gold-600'>
        <div className='container-custom text-center'>
          <h2 className='text-4xl font-bold text-white mb-4'>Ready to Find Your Car?</h2>
          <p className='text-lg text-white mb-8 opacity-90'>Browse thousands of vehicles and find the perfect match</p>
          <Link to='/cars' className='inline-block px-8 py-4 bg-white text-gold-600 font-bold rounded-lg hover:bg-gray-100'>
            Start Browsing
          </Link>
        </div>
      </section>
    </div>
  )
}
