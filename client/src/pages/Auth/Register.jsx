import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../../services/api'
import { useAuthStore } from '../../context/store'
import { motion } from 'framer-motion'

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    phone: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { setToken, setUser } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await authAPI.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone
      })
      setToken(response.data.token)
      setUser(response.data.user)
      navigate('/dashboard')
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      console.error('Registration error:', err.response?.data || err.message);
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center py-12'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='w-full max-w-md'
      >
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold gradient-text mb-2'>Join festybam Motors</h1>
            <p className='text-gray-600 dark:text-gray-400'>Create your account to get started</p>
          </div>

          {error && (
            <div className='bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg mb-6'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium mb-2'>First Name</label>
                <input
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-3 border dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500'
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-2'>Last Name</label>
                <input
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-3 border dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500'
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>Email</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                className='w-full px-4 py-3 border dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>Phone</label>
              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='w-full px-4 py-3 border dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>Account Type</label>
              <select
                name='role'
                value={formData.role}
                onChange={handleChange}
                className='w-full px-4 py-3 border dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500'
              >
                <option value='customer'>Customer</option>
                <option value='dealer'>Dealer</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>Password</label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                className='w-full px-4 py-3 border dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>Confirm Password</label>
              <input
                type='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className='w-full px-4 py-3 border dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500'
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='btn-primary w-full mt-6'
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className='text-center mt-6 text-gray-600 dark:text-gray-400'>
            Already have an account?{' '}
            <Link to='/login' className='text-gold-500 font-medium hover:text-gold-600'>
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
