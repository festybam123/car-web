import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { carAPI, bookingAPI } from '../services/api'
import CarCard from '../components/CarCard'
import demoCars from '../data/demoCars'

export default function BrowseCars() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')

  const getFilteredDemoCars = () => {
    let filtered = [...demoCars]
    if (selectedBrand) {
      filtered = filtered.filter(c => c.brand.toLowerCase() === selectedBrand.toLowerCase())
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(c =>
        c.brand.toLowerCase().includes(term) ||
        c.model.toLowerCase().includes(term)
      )
    }
    return filtered
  }

  useEffect(() => {
    let mounted = true
    const fetchCars = async () => {
      try {
        setLoading(true)
        const params = { page, limit: 12 }
        if (selectedBrand) params.brand = selectedBrand
        if (searchTerm) params.search = searchTerm
        const response = await carAPI.getCars(params)
        if (mounted) {
          setCars(response.data.cars || [])
          setTotal(response.data.pagination?.total || 0)
        }

        if (mounted && (!response.data.cars || response.data.cars.length === 0)) {
          const filteredDemo = getFilteredDemoCars()
          setCars(filteredDemo)
          setTotal(filteredDemo.length)
        }
      } catch (error) {
        console.error('Error fetching cars:', error)
        if (mounted) {
          const filteredDemo = getFilteredDemoCars()
          setCars(filteredDemo)
          setTotal(filteredDemo.length)
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchCars()
    return () => { mounted = false }
  }, [page, selectedBrand, searchTerm])

  const brands = ['Toyota', 'BMW', 'Mercedes-Benz', 'Tesla', 'Honda', 'Audi', 'Lexus', 'Porsche', 'Nissan', 'Hyundai', 'Ford']

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    const fetchCars = async () => {
      try {
        setLoading(true)
        const params = { page: 1, limit: 12 }
        if (selectedBrand) params.brand = selectedBrand
        if (searchTerm) params.search = searchTerm
        const response = await carAPI.getCars(params)
        if (response.data.cars && response.data.cars.length > 0) {
          setCars(response.data.cars)
          setTotal(response.data.pagination?.total || 0)
        } else {
          const filteredDemo = getFilteredDemoCars()
          setCars(filteredDemo)
          setTotal(filteredDemo.length)
        }
      } catch (error) {
        console.error('Error:', error)
        const filteredDemo = getFilteredDemoCars()
        setCars(filteredDemo)
        setTotal(filteredDemo.length)
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }

  return (
    <div>
      {/* Header */}
      <section className='bg-gradient-to-r from-gray-900 to-black text-white py-16'>
        <div className='container-custom text-center'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-5xl font-bold mb-4'
          >
            Browse Cars
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='text-xl text-gray-400'
          >
            Discover your perfect vehicle from our curated collection
          </motion.p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className='bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-20'>
        <div className='container-custom py-4'>
          <form onSubmit={handleSearch} className='flex flex-col md:flex-row gap-4 items-end'>
            <div className='flex-1 w-full'>
              <label className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block'>
                Search
              </label>
              <input
                type='text'
                placeholder='Search by brand, model, or keyword...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full px-4 py-2.5 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-gold-500 outline-none'
              />
            </div>
            <div className='w-full md:w-48'>
              <label className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block'>
                Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => { setSelectedBrand(e.target.value); setPage(1) }}
                className='w-full px-4 py-2.5 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-gold-500 outline-none'
              >
                <option value=''>All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            <button type='submit' className='btn-primary w-full md:w-auto px-8 py-2.5'>
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Cars Grid */}
      <section className='section-padding bg-gray-50 dark:bg-gray-900'>
        <div className='container-custom'>
          <div className='flex items-center justify-between mb-8'>
            <h2 className='text-2xl font-bold'>
              {loading ? 'Searching...' : `${total} Car${total !== 1 ? 's' : ''} Found`}
            </h2>
            <div className='flex gap-2'>
              <select
                className='px-4 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800'
                onChange={(e) => {
                  const fetchSorted = async () => {
                    try {
                      setLoading(true)
                      const params = { page: 1, limit: 12, sort: e.target.value }
                      if (selectedBrand) params.brand = selectedBrand
                      const response = await carAPI.getCars(params)
                      setCars(response.data.cars || [])
                      setTotal(response.data.pagination?.total || 0)
                    } catch (error) {
                      console.error('Error:', error)
                    } finally {
                      setLoading(false)
                    }
                  }
                  fetchSorted()
                }}
              >
                <option value='newest'>Newest First</option>
                <option value='price-low'>Price: Low to High</option>
                <option value='price-high'>Price: High to Low</option>
                <option value='popular'>Most Popular</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className='flex justify-center py-20'>
              <div className='animate-spin rounded-full h-12 w-12 border-4 border-gold-500 border-t-transparent'></div>
            </div>
          ) : cars.length === 0 ? (
            <div className='text-center py-20'>
              <div className='text-6xl mb-4'>🔍</div>
              <h3 className='text-2xl font-bold mb-2'>No Cars Found</h3>
              <p className='text-gray-600 dark:text-gray-400'>
                Try adjusting your search or filter criteria to find more vehicles.
              </p>
            </div>
          ) : (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
                {cars.map((car) => (
                  <motion.div
                    key={car._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CarCard car={car} />
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {total > 12 && (
                <div className='flex justify-center gap-2 flex-wrap'>
                  {[...Array(Math.ceil(total / 12))].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => { setPage(i + 1); window.scrollTo(0, 0) }}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        page === i + 1
                          ? 'bg-gold-500 text-white'
                          : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border dark:border-gray-600'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

