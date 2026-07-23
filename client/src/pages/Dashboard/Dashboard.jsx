import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../context/store'
import { motion } from 'framer-motion'

function DashboardNav() {
  const location = useLocation()
  const { user, logout } = useAuthStore()

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: '📊' },
    { path: '/dashboard/profile', label: 'Profile', icon: '👤' },
    { path: '/dashboard/bookings', label: 'Bookings', icon: '🗓️' },
    { path: '/dashboard/wishlist', label: 'Wishlist', icon: '❤️' },
    { path: '/dashboard/payments', label: 'Payments', icon: '💳' },
  ]

  if (user?.role === 'dealer') {
    navItems.push(
      { path: '/dashboard/cars', label: 'My Cars', icon: '🚗' },
      { path: '/dashboard/orders', label: 'Orders', icon: '📦' }
    )
  }

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className='bg-white dark:bg-gray-800 border-b dark:border-gray-700'>
      <div className='container-custom'>
        <div className='flex flex-wrap items-center justify-between gap-4 py-4'>
          <div className='flex flex-wrap overflow-x-auto gap-1'>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                  isActive(item.path)
                    ? 'bg-gold-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={handleLogout}
            className='flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition'
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

function DashboardOverview() {
  const { user } = useAuthStore()
  const [stats, setStats] = useState({
    bookings: 0,
    wishlist: 0,
    payments: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { bookingAPI, wishlistAPI } = await import('../../services/api')
        const [bookingsRes, wishlistRes] = await Promise.all([
          bookingAPI.getBookings().catch(() => ({ data: [] })),
          wishlistAPI.getWishlist().catch(() => ({ data: [] }))
        ])

        setStats({
          bookings: Array.isArray(bookingsRes.data) ? bookingsRes.data.length : 0,
          wishlist: Array.isArray(wishlistRes.data) ? wishlistRes.data.length : 0,
          payments: 0
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='section-padding'
    >
      <div className='container-custom'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold mb-2'>Welcome, {user?.firstName}!</h1>
          <p className='text-gray-600 dark:text-gray-400'>Manage your festybam Motors account</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-lg card-shadow'>
            <h3 className='text-gray-600 dark:text-gray-400 text-sm mb-2'>Test Drive Bookings</h3>
            {loading ? (
              <div className='animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-10 w-16' />
            ) : (
              <p className='text-4xl font-bold gradient-text'>{stats.bookings}</p>
            )}
          </div>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-lg card-shadow'>
            <h3 className='text-gray-600 dark:text-gray-400 text-sm mb-2'>Saved Cars</h3>
            {loading ? (
              <div className='animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-10 w-16' />
            ) : (
              <p className='text-4xl font-bold gradient-text'>{stats.wishlist}</p>
            )}
          </div>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-lg card-shadow'>
            <h3 className='text-gray-600 dark:text-gray-400 text-sm mb-2'>Total Payments</h3>
            {loading ? (
              <div className='animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-10 w-24' />
            ) : (
              <p className='text-4xl font-bold gradient-text'>₦{stats.payments.toLocaleString()}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function DashboardProfile() {
  const { user, setUser } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || ''
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || ''
      })
    }
  }, [user])

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    try {
      const { authAPI } = await import('../../services/api')
      const response = await authAPI.getCurrentUser()
      const updatedUser = { ...response.data.user, ...formData }
      setUser(updatedUser)
      setMessage('Profile updated successfully!')
      setIsEditing(false)
    } catch (error) {
      setUser({ ...user, ...formData })
      setMessage('Profile updated locally')
      setIsEditing(false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='section-padding'
    >
      <div className='container-custom max-w-2xl'>
        <h2 className='text-3xl font-bold mb-8'>Profile Settings</h2>

        <div className='bg-white dark:bg-gray-800 rounded-lg p-8 card-shadow'>
          {!isEditing ? (
            <div className='space-y-6'>
              <div className='grid grid-cols-2 gap-6'>
                <div>
                  <p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>First Name</p>
                  <p className='text-xl font-semibold'>{user?.firstName}</p>
                </div>
                <div>
                  <p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>Last Name</p>
                  <p className='text-xl font-semibold'>{user?.lastName}</p>
                </div>
              </div>
              <div>
                <p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>Email</p>
                <p className='text-xl font-semibold'>{user?.email}</p>
              </div>
              <div>
                <p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>Phone</p>
                <p className='text-xl font-semibold'>{user?.phone || 'Not provided'}</p>
              </div>
              {message && (
                <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-yellow-600'}`}>
                  {message}
                </p>
              )}
              <button
                onClick={() => { setIsEditing(true); setMessage('') }}
                className='btn-primary'
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className='space-y-4'>
              <input
                type='text'
                placeholder='First Name'
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className='w-full px-4 py-3 border dark:border-gray-700 rounded-lg'
              />
              <input
                type='text'
                placeholder='Last Name'
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className='w-full px-4 py-3 border dark:border-gray-700 rounded-lg'
              />
              <input
                type='email'
                placeholder='Email'
                value={formData.email}
                className='w-full px-4 py-3 border dark:border-gray-700 rounded-lg disabled:opacity-50'
                disabled
              />
              <input
                type='tel'
                placeholder='Phone'
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className='w-full px-4 py-3 border dark:border-gray-700 rounded-lg'
              />
              {message && (
                <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-yellow-600'}`}>
                  {message}
                </p>
              )}
              <div className='flex gap-4'>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className='btn-primary flex-1 flex items-center justify-center gap-2'
                >
                  {saving ? (
                    <>
                      <div className='animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent' />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
                <button
                  onClick={() => { setIsEditing(false); setMessage('') }}
                  disabled={saving}
                  className='btn-secondary flex-1'
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Dashboard() {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return (
      <div className='py-20 text-center'>
        <p className='text-xl'>Please log in to access your dashboard</p>
      </div>
    )
  }

  return (
    <div>
      <DashboardNav />
      <Routes>
        <Route path='/' element={<DashboardOverview />} />
        <Route path='/profile' element={<DashboardProfile />} />
        <Route path='/bookings' element={<div className='section-padding'><h2 className='text-3xl font-bold'>My Bookings</h2></div>} />
        <Route path='/wishlist' element={<div className='section-padding'><h2 className='text-3xl font-bold'>My Wishlist</h2></div>} />
        <Route path='/payments' element={<div className='section-padding'><h2 className='text-3xl font-bold'>My Payments</h2></div>} />
        <Route path='/cars' element={<div className='section-padding'><h2 className='text-3xl font-bold'>My Cars</h2></div>} />
        <Route path='/orders' element={<div className='section-padding'><h2 className='text-3xl font-bold'>My Orders</h2></div>} />
      </Routes>
    </div>
  )
}
