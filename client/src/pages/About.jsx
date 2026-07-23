import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className='container-custom section-padding'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-4'>About Festybam Motors</h1>
        <p className='text-gray-700 dark:text-gray-300 mb-4'>festybam Motors began as a small family-owned dealership with a simple mission: connect drivers with vehicles that match their lifestyle and budget. Over the years we've grown into a trusted marketplace combining curated listings, transparent pricing, and full-service vehicle care.</p>

        <h2 className='text-2xl font-semibold mt-6 mb-2'>Mission</h2>
        <p className='text-gray-700 dark:text-gray-300'>To simplify car buying and ownership with honesty, expert service, and exceptional selection.</p>

        <h2 className='text-2xl font-semibold mt-6 mb-2'>Vision</h2>
        <p className='text-gray-700 dark:text-gray-300'>A world where buying a car is seamless, fair, and enjoyable for everyone.</p>

        <h2 className='text-2xl font-semibold mt-6 mb-2'>Core Values</h2>
        <ul className='list-disc ml-6 text-gray-700 dark:text-gray-300'>
          <li>Transparency</li>
          <li>Customer-first approach</li>
          <li>Quality & integrity</li>
          <li>Continuous improvement</li>
        </ul>

        <h2 className='text-2xl font-semibold mt-6 mb-2'>Meet Our Team</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='p-4 border rounded-lg'>
            <h3 className='font-semibold'>Jane Doe</h3>
            <p className='text-sm text-gray-600 dark:text-gray-300'>CEO & Founder</p>
            <p className='mt-2 text-sm text-gray-700 dark:text-gray-300'>Jane brings 15 years of automotive experience and customer-first leadership.</p>
          </div>
          <div className='p-4 border rounded-lg'>
            <h3 className='font-semibold'>John Smith</h3>
            <p className='text-sm text-gray-600 dark:text-gray-300'>Head of Sales</p>
            <p className='mt-2 text-sm text-gray-700 dark:text-gray-300'>John leads our buying and sourcing operations to ensure the best inventory.</p>
          </div>
        </div>

        <h2 className='text-2xl font-semibold mt-6 mb-2'>Testimonials</h2>
        <blockquote className='p-4 border-l-4 border-gold-500 bg-white dark:bg-gray-800 rounded'>
          “festybam made buying my car effortless — great selection and honest pricing.” — Sarah K.
        </blockquote>

        <h2 className='text-2xl font-semibold mt-6 mb-2'>Partners & Certifications</h2>
        <p className='text-gray-700 dark:text-gray-300'>Proud partners with leading finance and inspection providers. Certified dealer-inspected vehicles.</p>
      </div>
    </div>
  )
}
