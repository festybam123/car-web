import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiFilter } from 'react-icons/fi'
import { carAPI } from '../services/api'
import CarCard from '../components/CarCard'
import { useFilterStore } from '../context/store'
import demoCars from '../data/demoCars'

export default function CarsListing() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const { filters, setFilters } = useFilterStore()
  const [showFilters, setShowFilters] = useState(false)

  const getFilteredDemoCars = () => {
    let filtered = [...demoCars]
    if (filters.brand) {
      filtered = filtered.filter(c => c.brand.toLowerCase() === filters.brand.toLowerCase())
    }
    if (filters.priceMin) {
      filtered = filtered.filter(c => c.price >= Number(filters.priceMin))
    }
    if (filters.priceMax) {
      filtered = filtered.filter(c => c.price <= Number(filters.priceMax))
    }
    if (filters.fuel) {
      filtered = filtered.filter(c => c.fuel.toLowerCase() === filters.fuel.toLowerCase())
    }
    if (filters.transmission) {
      filtered = filtered.filter(c => c.transmission.toLowerCase() === filters.transmission.toLowerCase())
    }
    if (filters.year) {
      filtered = filtered.filter(c => c.year === Number(filters.year))
    }
    if (filters.sort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (filters.sort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (filters.sort === 'popular') {
      filtered.sort((a, b) => (b.totalReviews || 0) - (a.totalReviews || 0))
    }
    return filtered
  }

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true)
        const response = await carAPI.getCars({
          ...filters,
          page,
          limit: 12
        })
        setCars(response.data.cars)
        setTotal(response.data.pagination.total)

        if (response.data.cars.length === 0) {
          const filteredDemo = getFilteredDemoCars()
          setCars(filteredDemo)
          setTotal(filteredDemo.length)
        }
      } catch (error) {
        console.error('Error fetching cars:', error)
        const filteredDemo = getFilteredDemoCars()
        setCars(filteredDemo)
        setTotal(filteredDemo.length)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [filters, page])

  const brands = ['Toyota', 'BMW', 'Mercedes-Benz', 'Tesla', 'Honda', 'Audi']
  const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric']
  const transmissions = ['Manual', 'Automatic', 'CVT']

  return (
    <div>
      {/* Header */}
      <section className='bg-gradient-to-r from-gray-900 to-black text-white py-12'>
        <div className='container-custom text-center'>
          <h1 className='text-5xl font-bold mb-4'>Browse Cars</h1>
          <p className='text-xl text-gray-400'>Discover thousands of vehicles from trusted dealers</p>
        </div>
      </section>

      <div className='container-custom section-padding'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden'} lg:block`}
          >
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg sticky top-24'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-xl font-bold'>Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className='lg:hidden text-2xl'
                >
                  ✕
                </button>
              </div>

              {/* Brand Filter */}
              <div className='mb-6'>
                <h4 className='font-semibold mb-4'>Brand</h4>
                <select
                  value={filters.brand}
                  onChange={(e) => { setFilters({ brand: e.target.value }); setPage(1); }}
                  className='w-full px-4 py-2 border dark:border-gray-700 rounded-lg'
                >
                  <option value=''>All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div className='mb-6'>
                <h4 className='font-semibold mb-4'>Price Range</h4>
                <input
                  type='number'
                  placeholder='Min'
                  className='w-full px-4 py-2 border dark:border-gray-700 rounded-lg mb-2'
                  value={filters.priceMin}
                  onChange={(e) => { setFilters({ priceMin: e.target.value }); setPage(1); }}
                />
                <input
                  type='number'
                  placeholder='Max'
                  className='w-full px-4 py-2 border dark:border-gray-700 rounded-lg'
                  value={filters.priceMax}
                  onChange={(e) => { setFilters({ priceMax: e.target.value }); setPage(1); }}
                />
              </div>

              {/* Fuel Type */}
              <div className='mb-6'>
                <h4 className='font-semibold mb-4'>Fuel Type</h4>
                <select
                  value={filters.fuel}
                  onChange={(e) => { setFilters({ fuel: e.target.value }); setPage(1); }}
                  className='w-full px-4 py-2 border dark:border-gray-700 rounded-lg'
                >
                  <option value=''>All Types</option>
                  {fuelTypes.map((fuel) => (
                    <option key={fuel} value={fuel}>{fuel}</option>
                  ))}
                </select>
              </div>

              {/* Transmission */}
              <div className='mb-6'>
                <h4 className='font-semibold mb-4'>Transmission</h4>
                <select
                  value={filters.transmission}
                  onChange={(e) => { setFilters({ transmission: e.target.value }); setPage(1); }}
                  className='w-full px-4 py-2 border dark:border-gray-700 rounded-lg'
                >
                  <option value=''>All Types</option>
                  {transmissions.map((trans) => (
                    <option key={trans} value={trans}>{trans}</option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div className='mb-6'>
                <h4 className='font-semibold mb-4'>Year</h4>
                <select
                  value={filters.year}
                  onChange={(e) => { setFilters({ year: e.target.value }); setPage(1); }}
                  className='w-full px-4 py-2 border dark:border-gray-700 rounded-lg'
                >
                  <option value=''>All Years</option>
                  {[...Array(20)].map((_, i) => {
                    const year = new Date().getFullYear() - i
                    return <option key={year} value={year}>{year}</option>
                  })}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Cars Grid */}
          <div className='lg:col-span-3'>
            {/* Toolbar */}
            <div className='flex items-center justify-between mb-8'>
              <h2 className='text-2xl font-bold'>
                {total} Cars Found
              </h2>
              <div className='flex gap-4 items-center'>
                <select
                  value={filters.sort}
                  onChange={(e) => { setFilters({ sort: e.target.value }); setPage(1); }}
                  className='px-4 py-2 border dark:border-gray-700 rounded-lg'
                >
                  <option value='newest'>Newest</option>
                  <option value='price-low'>Price: Low to High</option>
                  <option value='price-high'>Price: High to Low</option>
                  <option value='popular'>Most Popular</option>
                </select>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className='lg:hidden flex items-center gap-2 px-4 py-2 bg-gold-500 text-white rounded-lg'
                >
                  <FiFilter /> Filters
                </button>
              </div>
            </div>

            {/* Cars */}
            {loading ? (
              <div className='text-center py-12'>Loading cars...</div>
            ) : cars.length === 0 ? (
              <div className='text-center py-12'>No cars found matching your criteria</div>
            ) : (
              <>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
                  {cars.map((car) => (
                    <CarCard key={car._id} car={car} />
                  ))}
                </div>

                {/* Pagination */}
                <div className='flex justify-center gap-2 flex-wrap'>
                  {[...Array(Math.ceil(total / 12))].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => { setPage(i + 1); window.scrollTo(0, 0); }}
                      className={`px-4 py-2 rounded-lg ${
                        page === i + 1
                          ? 'bg-gold-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
