import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube, FaTiktok } from 'react-icons/fa'

export default function Footer() {
  const [email, setEmail] = useState('')

  const subscribe = async (e) => {
    e.preventDefault()
    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      setEmail('')
      alert('Thanks — subscription saved (if backend configured).')
    } catch (err) {
      console.warn(err)
      alert('Subscribed locally — backend may be unavailable.')
    }
  }

  return (
    <footer className='bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 border-t dark:border-gray-800 mt-12'>
      <div className='container-custom py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <Link to='/' className='flex items-center gap-3'>
              <div className='w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center'>
                <span className='text-white text-2xl'>🚗</span>
              </div>
              <div>
                <h3 className='text-xl font-bold'>festybam Motors</h3>
                <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>Premium cars. Expert care. Trusted service.</p>
              </div>
            </Link>

            <ul className='mt-4 text-sm space-y-1'>
              <li>1234 Auto Drive, Motor City</li>
              <li>Mon - Fri: 9:00am - 6:00pm</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Email: hello@festybam.com</li>
            </ul>

            <div className='flex gap-3 mt-4'>
              <a aria-label='facebook' href='#' className='p-2 rounded bg-gray-100 dark:bg-gray-800'><FaFacebookF /></a>
              <a aria-label='instagram' href='#' className='p-2 rounded bg-gray-100 dark:bg-gray-800'><FaInstagram /></a>
              <a aria-label='twitter' href='#' className='p-2 rounded bg-gray-100 dark:bg-gray-800'><FaTwitter /></a>
              <a aria-label='linkedin' href='#' className='p-2 rounded bg-gray-100 dark:bg-gray-800'><FaLinkedinIn /></a>
              <a aria-label='youtube' href='#' className='p-2 rounded bg-gray-100 dark:bg-gray-800'><FaYoutube /></a>
              <a aria-label='tiktok' href='#' className='p-2 rounded bg-gray-100 dark:bg-gray-800'><FaTiktok /></a>
            </div>
          </div>

          <div>
            <h4 className='font-semibold mb-3'>Quick Links</h4>
            <ul className='text-sm space-y-2'>
              <li><Link to='/cars' className='hover:text-gold-500'>Browse Cars</Link></li>
              <li><Link to='/about' className='hover:text-gold-500'>About Us</Link></li>
              <li><Link to='/contact' className='hover:text-gold-500'>Contact</Link></li>
              <li><Link to='/blog' className='hover:text-gold-500'>Blog</Link></li>
              <li><Link to='/support' className='hover:text-gold-500'>Support</Link></li>
              <li><Link to='/careers' className='hover:text-gold-500'>Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className='font-semibold mb-3'>Resources</h4>
            <ul className='text-sm space-y-2'>
              <li><Link to='/faq' className='hover:text-gold-500'>FAQ</Link></li>
              <li><Link to='/help' className='hover:text-gold-500'>Help Center</Link></li>
              <li><Link to='/privacy' className='hover:text-gold-500'>Privacy Policy</Link></li>
              <li><Link to='/terms' className='hover:text-gold-500'>Terms & Conditions</Link></li>
              <li><Link to='/legal' className='hover:text-gold-500'>Legal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className='font-semibold mb-3'>Newsletter</h4>
            <p className='text-sm text-gray-600 dark:text-gray-300'>Get car deals, buying tips, and service offers delivered to your inbox.</p>
            <form onSubmit={subscribe} className='mt-4 flex gap-2'>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='you@domain.com' className='flex-1 px-3 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800' />
              <button className='btn-primary px-4'>Subscribe</button>
            </form>

            <div className='mt-6'>
              <h5 className='text-sm font-medium mb-2'>We accept</h5>
              <div className='flex gap-3 items-center'>
                <img src='/payment-visa.svg' alt='Visa' className='h-6' />
                <img src='/payment-mastercard.svg' alt='Mastercard' className='h-6' />
                <img src='/payment-paystack.svg' alt='Paystack' className='h-6' />
                <img src='/payment-verve.svg' alt='Verve' className='h-6' />
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 border-t dark:border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between text-sm'>
          <div>© {new Date().getFullYear()} festybam Motors. All rights reserved.</div>
          <div className='mt-3 md:mt-0'>
            <Link to='/disclaimer' className='mr-4 hover:text-gold-500'>Disclaimer</Link>
            <Link to='/cookies' className='mr-4 hover:text-gold-500'>Cookie Policy</Link>
            <Link to='/privacy' className='hover:text-gold-500'>Privacy</Link>
          </div>
        </div>

        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label='Back to top' className='fixed bottom-6 right-6 p-3 rounded-full bg-gold-500 text-white shadow-lg hover:scale-105 transition-transform'>↑</button>
      </div>
    </footer>
  )
}

