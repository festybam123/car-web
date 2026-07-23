import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiX, FiSearch, FiShoppingCart, FiUser, FiChevronDown } from 'react-icons/fi'
import { useAuthStore } from '../context/store'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuthStore()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  const handleLogout = () => {
    setDropdownOpen(false)
    logout()
    navigate('/')
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false)
      }
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [dropdownOpen])

  return (
    <nav className='sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md'>
      <div className='container-custom'>
        <div className='flex items-center justify-between py-4'>
          {/* Logo */}
          <Link to='/' className='flex items-center gap-2'>
            <div className='w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center'>
              <span className='text-white font-bold text-xl'>🚗</span>
            </div>
            <span className='text-2xl font-bold gradient-text'>festybam</span>
          </Link>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center gap-8'>
            <Link to='/cars' className='hover:text-gold-500 transition'>
              Browse Cars
            </Link>
            <Link to='/about' className='hover:text-gold-500 transition'>
              About
            </Link>
            <Link to='/contact' className='hover:text-gold-500 transition'>
              Contact
            </Link>
          </div>

          {/* Right Section */}
          <div className='flex items-center gap-4'>
            <button className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg'>
              <FiSearch className='text-xl' />
            </button>
            <button className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg'>
              <FiShoppingCart className='text-xl' />
            </button>

            {isAuthenticated ? (
              <div className='relative' ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className='flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition'
                >
                  <FiUser className='text-xl' />
                  <span className='hidden md:inline'>{user?.firstName}</span>
                  <FiChevronDown className={`text-sm transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 overflow-hidden'>
                    <Link
                      to='/dashboard'
                      className='flex items-center gap-2 px-4 py-2 hover:bg-gold-500 hover:text-white transition'
                      onClick={() => setDropdownOpen(false)}
                    >
                      📊 Dashboard
                    </Link>
                    <Link
                      to='/dashboard/profile'
                      className='flex items-center gap-2 px-4 py-2 hover:bg-gold-500 hover:text-white transition'
                      onClick={() => setDropdownOpen(false)}
                    >
                      👤 Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gold-500 hover:text-white transition'
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className='flex gap-2'>
                <Link to='/login' className='px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'>
                  Sign In
                </Link>
                <Link to='/register' className='btn-primary'>
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg'
            >
              {isOpen ? <FiX className='text-2xl' /> : <FiMenu className='text-2xl' />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className='md:hidden border-t dark:border-gray-800 py-4 space-y-2'>
            <Link to='/cars' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded'>
              Browse Cars
            </Link>
            <Link to='/about' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded'>
              About
            </Link>
            <Link to='/contact' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded'>
              Contact
            </Link>
            {isAuthenticated && (
              <>
                <Link to='/dashboard' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded'>
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className='w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded'
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
