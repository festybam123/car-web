import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { carAPI, bookingAPI } from '../services/api'
import { FiMapPin, FiPhone, FiMail, FiShoppingCart, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import ImageWithFallback from '../components/ImageWithFallback'
import demoCars from '../data/demoCars'

export default function CarDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookingType, setBookingType] = useState('test-drive')
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderError, setOrderError] = useState(false)

  useEffect(() => {
    // Check URL for order status
    if (searchParams.get('order') === 'success') {
      setOrderSuccess(true)
      setTimeout(() => setOrderSuccess(false), 5000)
    }
    if (searchParams.get('order') === 'error') {
      setOrderError(true)
      setTimeout(() => setOrderError(false), 5000)
    }
  }, [searchParams])

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await carAPI.getCarById(id)
        setCar(response.data.car)
      } catch (error) {
        console.error('Error fetching car:', error)
        // Fallback to demo data
        const demo = demoCars.find(c => c._id === id)
        if (demo) {
          setCar(demo)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchCar()
  }, [id])

  const handleDirectOrder = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    try {
      const response = await bookingAPI.createBooking({
        carId: car._id,
        bookingType: 'purchase',
        preferredDate: new Date().toISOString().split('T')[0],
        preferredTime: new Date().toTimeString().split(' ')[0].slice(0, 5),
        message: `I would like to purchase the ${car.year} ${car.brand} ${car.model}.${car.vin ? ` VIN: ${car.vin}` : ''}`
      })
      if (response.data.success) {
        setOrderSuccess(true)
        setTimeout(() => setOrderSuccess(false), 5000)
      }
    } catch (error) {
      setOrderError(true)
      setTimeout(() => setOrderError(false), 5000)
    }
  }

  if (loading) return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
      <div className='animate-spin rounded-full h-16 w-16 border-4 border-gold-500 border-t-transparent'></div>
    </div>
  )
  if (!car) return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
      <div className='text-center'>
        <div className='text-6xl mb-4'>🚗</div>
        <h2 className='text-3xl font-bold mb-2'>Car Not Found</h2>
        <p className='text-gray-600 dark:text-gray-400 mb-6'>The vehicle you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate('/cars')} className='btn-primary'>
          Browse Cars
        </button>
      </div>
    </div>
  )

const images = car.images?.length > 0 ? car.images : ['/images/car1.jpg']

  return (
    <div>
      {/* Success/Error Notifications */}
      <AnimatePresence>
        {orderSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className='fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-8 py-4 rounded-lg shadow-2xl flex items-center gap-3'
          >
            <FiCheckCircle className='text-2xl' />
            <div>
              <p className='font-bold'>Order Placed Successfully!</p>
              <p className='text-sm opacity-90'>The dealer will contact you shortly to confirm your purchase.</p>
            </div>
          </motion.div>
        )}
        {orderError && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className='fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-8 py-4 rounded-lg shadow-2xl flex items-center gap-3'
          >
            <FiAlertCircle className='text-2xl' />
            <div>
              <p className='font-bold'>Order Failed</p>
              <p className='text-sm opacity-90'>Please try again or contact support.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Gallery */}
      <section className='py-8 bg-gray-50 dark:bg-gray-800'>
        <div className='container-custom'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Main Image */}
            <div className='lg:col-span-2'>
              <div className='w-full aspect-video bg-gray-300 rounded-lg overflow-hidden'>
                <ImageWithFallback
                  src={images[selectedImage]}
                  alt={`${car.brand} ${car.model}`}
                  fallbackSrc='/images/car1.jpg'
                  className='w-full h-full object-cover'
                />
              </div>
              {images.length > 1 && (
                <div className='grid grid-cols-4 gap-4 mt-4'>
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        idx === selectedImage ? 'border-gold-500 ring-2 ring-gold-500/30' : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                    <ImageWithFallback
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fallbackSrc='/images/car1.jpg'
                        className='w-full h-full object-cover'
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Car Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-white dark:bg-gray-700 p-8 rounded-lg card-shadow h-fit sticky top-20'
            >
              <h1 className='text-3xl font-bold mb-2'>
                {car.year} {car.brand} {car.model}
              </h1>
              <p className='text-gray-600 dark:text-gray-400 mb-4'>{car.condition}</p>
              
              <div className='mb-6'>
                <div className='text-4xl font-bold gradient-text mb-2'>
                  ₦{car.price?.toLocaleString()}
                </div>
                {car.discountPrice && (
                  <p className='text-gray-500 line-through'>
                    ₦{car.discountPrice.toLocaleString()}
                  </p>
                )}
              </div>

              {/* Order / Test Drive Buttons */}
              <button
                onClick={handleDirectOrder}
                className='btn-primary w-full mb-3 flex items-center justify-center gap-2'
              >
                <FiShoppingCart /> Order Now
              </button>
              <button
                onClick={() => {
                  const token = localStorage.getItem('token')
                  if (!token) { navigate('/login'); return }
                  setShowBookingForm(!showBookingForm)
                }}
                className='btn-secondary w-full'
              >
                Book Test Drive
              </button>

              <AnimatePresence>
                {showBookingForm && (
                  <BookingForm carId={car._id} onClose={() => setShowBookingForm(false)} />
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className='section-padding bg-white dark:bg-gray-800'>
        <div className='container-custom'>
          <h2 className='text-3xl font-bold mb-8'>Specifications</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {[
              { label: 'Engine', value: car.engine },
              { label: 'Transmission', value: car.transmission },
              { label: 'Fuel Type', value: car.fuel },
              { label: 'Mileage', value: `${car.mileage?.toLocaleString() || 'N/A'} km` },
              { label: 'Seats', value: car.seats },
              { label: 'Doors', value: car.doors },
              { label: 'Color', value: car.exteriorColor },
              { label: 'Drive Type', value: car.driveType }
            ].map((spec, index) => (
              <div key={index} className='p-6 bg-gray-50 dark:bg-gray-700 rounded-lg'>
                <p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>{spec.label}</p>
                <p className='text-xl font-semibold'>{spec.value || 'N/A'}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description & Features */}
      <section className='section-padding bg-gray-50 dark:bg-gray-900'>
        <div className='container-custom max-w-3xl'>
          <h2 className='text-3xl font-bold mb-8'>Description</h2>
          <p className='text-lg text-gray-700 dark:text-gray-400 leading-relaxed mb-8'>
            {car.description || 'No description available.'}
          </p>

          {car.features?.length > 0 && (
            <>
              <h3 className='text-2xl font-bold mb-4'>Features</h3>
              <ul className='grid grid-cols-2 gap-4'>
                {car.features.map((feature, idx) => (
                  <li key={idx} className='flex items-center gap-2'>
                    <span className='text-gold-500'>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      {/* Dealer Information */}
      <section className='section-padding bg-white dark:bg-gray-800'>
        <div className='container-custom'>
          <h2 className='text-3xl font-bold mb-8'>Dealer Information</h2>
          <div className='bg-gray-50 dark:bg-gray-700 p-8 rounded-lg'>
            <h3 className='text-2xl font-semibold mb-4'>{car.dealer?.company || car.dealer?.firstName || 'Trusted Dealer'}</h3>
            <div className='space-y-4'>
              {car.dealer?.phone && (
                <div className='flex items-center gap-4'>
                  <FiPhone className='text-gold-500 text-xl' />
                  <span>{car.dealer.phone}</span>
                </div>
              )}
              {car.dealer?.email && (
                <div className='flex items-center gap-4'>
                  <FiMail className='text-gold-500 text-xl' />
                  <span>{car.dealer.email}</span>
                </div>
              )}
              <div className='flex items-center gap-4'>
                <FiMapPin className='text-gold-500 text-xl' />
                <span>{car.dealer?.address?.city || 'Lagos, Nigeria'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function BookingForm({ carId, onClose }) {
  const [formData, setFormData] = useState({
    preferredDate: '',
    preferredTime: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await bookingAPI.createBooking({
        carId,
        bookingType: 'test-drive',
        ...formData
      })
      setSuccess(true)
      setTimeout(() => onClose(), 2000)
    } catch (error) {
      console.error('Booking error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className='mt-6 pt-6 border-t space-y-4 text-center'
      >
        <FiCheckCircle className='text-4xl text-green-500 mx-auto' />
        <p className='font-semibold text-green-600'>Test Drive Booked!</p>
        <p className='text-sm text-gray-600 dark:text-gray-400'>The dealer will confirm your appointment shortly.</p>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      onSubmit={handleSubmit}
      className='mt-6 pt-6 border-t dark:border-gray-600 space-y-4'
    >
      <h4 className='font-semibold'>Schedule Test Drive</h4>
      <input
        type='date'
        required
        value={formData.preferredDate}
        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
        className='w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-600 rounded-lg'
      />
      <input
        type='time'
        required
        value={formData.preferredTime}
        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
        className='w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-600 rounded-lg'
      />
      <textarea
        placeholder='Additional message (optional)'
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className='w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-600 rounded-lg h-24 resize-none'
      />
      <div className='flex gap-2'>
        <button type='submit' disabled={submitting} className='btn-primary flex-1 flex items-center justify-center gap-2'>
          {submitting ? (
            <>
              <div className='animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent'></div>
              Booking...
            </>
          ) : 'Confirm Booking'}
        </button>
        <button type='button' onClick={onClose} className='px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'>
          Cancel
        </button>
      </div>
    </motion.form>
  )
}

