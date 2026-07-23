import { Link, useNavigate } from 'react-router-dom'
import { FiStar, FiMapPin, FiShoppingCart } from 'react-icons/fi'
import { bookingAPI } from '../services/api'
import ImageWithFallback from './ImageWithFallback'

export default function CarCard({ car }) {
  const navigate = useNavigate()

  const handleOrder = async (e) => {
    e.preventDefault()
    e.stopPropagation()

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
        message: `I would like to order the ${car.year} ${car.brand} ${car.model}.`
      })
      if (response.data.success) {
        navigate(`/cars/${car._id}?order=success`)
      }
    } catch (error) {
      console.error('Error placing order:', error)
      navigate(`/cars/${car._id}?order=error`)
    }
  }

  return (
    <Link to={`/cars/${car._id}`}>
      <div className='bg-white dark:bg-gray-800 rounded-lg overflow-hidden card-shadow hover:scale-105 transition-transform'>
        {/* Image */}
        <div className='relative w-full aspect-video bg-gray-300 overflow-hidden'>
          <ImageWithFallback
            src={car.images?.[0] || '/images/car1.jpg'}
            alt={`${car.brand} ${car.model}`}
            fallbackSrc='/images/car1.jpg'
            className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
          />
          {car.discountPrice && (
            <div className='absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold'>
              Sale
            </div>
          )}
          {/* Order Now Button */}
          <button
            onClick={handleOrder}
            className='absolute bottom-3 left-3 bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl'
          >
            <FiShoppingCart />
            Order Now
          </button>
        </div>

        {/* Content */}
        <div className='p-4'>
          {/* Title */}
          <h3 className='text-lg font-bold mb-1'>
            {car.year} {car.brand} {car.model}
          </h3>
          <p className='text-gray-600 dark:text-gray-400 text-sm mb-4'>{car.condition}</p>

          {/* Rating */}
          <div className='flex items-center gap-2 mb-4'>
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={i < Math.floor(car.rating || 0) ? 'fill-gold-500 text-gold-500' : 'text-gray-400'}
              />
            ))}
            <span className='text-sm text-gray-600 dark:text-gray-400'>({car.totalReviews || 0})</span>
          </div>

          {/* Price */}
          <div className='mb-4'>
            <div className='text-2xl font-bold gradient-text'>
              ₦{car.price?.toLocaleString()}
            </div>
            {car.discountPrice && (
              <p className='text-gray-500 line-through text-sm'>
                ₦{car.discountPrice.toLocaleString()}
              </p>
            )}
          </div>

          {/* Specs */}
          <div className='grid grid-cols-2 gap-2 text-sm mb-4 pb-4 border-b dark:border-gray-700'>
            <span className='text-gray-600 dark:text-gray-400'>{car.fuel}</span>
            <span className='text-gray-600 dark:text-gray-400'>{car.transmission}</span>
            <span className='text-gray-600 dark:text-gray-400'>{car.mileage?.toLocaleString() || 'N/A'} km</span>
            <span className='text-gray-600 dark:text-gray-400'>{car.year}</span>
          </div>

          {/* Dealer */}
          <div className='flex items-center gap-2 text-sm'>
            <FiMapPin className='text-gold-500' />
            <span className='text-gray-600 dark:text-gray-400 truncate'>
              {car.dealer?.company || car.dealer?.firstName || 'Trusted Dealer'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

