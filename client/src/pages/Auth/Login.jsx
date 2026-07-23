import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../../services/api'
import { useAuthStore } from '../../context/store'
import { motion } from 'framer-motion'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { setToken, setUser } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await authAPI.login(formData)
      setToken(response.data.token)
      setUser(response.data.user)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
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
            <h1 className='text-3xl font-bold gradient-text mb-2'>Welcome Back</h1>
            <p className='text-gray-600 dark:text-gray-400'>Sign in to your festybam account</p>
          </div>

          {error && (
            <div className='bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg mb-6'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label className='block text-sm font-medium mb-2'>Email</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                className='w-full px-4 py-3 border dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500'
                placeholder='your@email.com'
              />
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
                placeholder='••••••••'
              />
            </div>

            <div className='flex items-center justify-between text-sm'>
              <label className='flex items-center gap-2'>
                <input type='checkbox' className='rounded' />
                Remember me
              </label>
              <Link to='/forgot-password' className='text-gold-500 hover:text-gold-600'>
                Forgot password?
              </Link>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='btn-primary w-full'
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className='text-center mt-6 text-gray-600 dark:text-gray-400'>
            Don't have an account?{' '}
            <Link to='/register' className='text-gold-500 font-medium hover:text-gold-600'>
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
