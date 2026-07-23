import React from 'react'

export default function Support() {
  return (
    <div className='container-custom section-padding'>
      <h1 className='text-3xl font-bold mb-4'>Support Center</h1>
      <p className='text-gray-700 dark:text-gray-300 mb-4'>Need help? Choose an option below to contact our support team.</p>

      <div className='grid md:grid-cols-3 gap-6'>
        <div className='p-4 border rounded'>
          <h3 className='font-semibold'>Live Chat</h3>
          <p className='text-sm text-gray-600 dark:text-gray-300'>Start a live chat for quick answers.</p>
          <button className='btn-primary mt-3'>Start Chat</button>
        </div>

        <div className='p-4 border rounded'>
          <h3 className='font-semibold'>Submit a Ticket</h3>
          <p className='text-sm text-gray-600 dark:text-gray-300'>Create a support ticket and track responses.</p>
          <a href='/support/ticket' className='text-gold-500 mt-3 block'>Open Ticket</a>
        </div>

        <div className='p-4 border rounded'>
          <h3 className='font-semibold'>Warranty & Roadside</h3>
          <p className='text-sm text-gray-600 dark:text-gray-300'>Call our emergency hotline +1 (555) 999-0000.</p>
        </div>
      </div>
    </div>
  )
}
