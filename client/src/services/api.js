import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: import.meta.env.VITE_API_TIMEOUT || 10000
})

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth
export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getCurrentUser: () => API.get('/auth/me'),
  logout: () => API.post('/auth/logout')
}

// Cars
export const carAPI = {
  getCars: (params) => API.get('/cars', { params }),
  getCarById: (id) => API.get(`/cars/${id}`),
  getFeaturedCars: () => API.get('/cars/featured'),
  createCar: (data) => API.post('/cars', data),
  updateCar: (id, data) => API.put(`/cars/${id}`, data),
  deleteCar: (id) => API.delete(`/cars/${id}`)
}

// Bookings
export const bookingAPI = {
  createBooking: (data) => API.post('/bookings', data),
  getBookings: () => API.get('/bookings'),
  getBookingById: (id) => API.get(`/bookings/${id}`),
  updateBooking: (id, data) => API.put(`/bookings/${id}`, data),
  cancelBooking: (id, data) => API.patch(`/bookings/${id}/cancel`, data)
}

// Wishlist
export const wishlistAPI = {
  addToWishlist: (data) => API.post('/wishlist', data),
  getWishlist: () => API.get('/wishlist'),
  removeFromWishlist: (carId) => API.delete(`/wishlist/${carId}`)
}

// Reviews
export const reviewAPI = {
  createReview: (data) => API.post('/reviews', data),
  getCarReviews: (carId) => API.get(`/reviews/car/${carId}`),
  updateReview: (id, data) => API.put(`/reviews/${id}`, data),
  deleteReview: (id) => API.delete(`/reviews/${id}`)
}

// Payments
export const paymentAPI = {
  initializePayment: (data) => API.post('/payments/initialize', data),
  verifyPayment: (data) => API.post('/payments/verify', data)
}

export default API
