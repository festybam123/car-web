import React, { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      alert('Message sent — we will contact you shortly (if backend configured).')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      console.warn(err)
      alert('Message noted locally — backend may be unavailable.')
    }
  }

  return (
    <div className='container-custom section-padding'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-3xl font-bold mb-4'>Contact Us</h1>
        <p className='text-gray-700 dark:text-gray-300 mb-6'>We'd love to hear from you — send a message, request a test drive, or schedule a service.</p>

        <form onSubmit={submit} className='grid gap-4'>
          <input name='name' value={form.name} onChange={handleChange} placeholder='Full name' className='px-3 py-2 rounded border bg-white dark:bg-gray-800' />
          <input name='email' value={form.email} onChange={handleChange} placeholder='Email' className='px-3 py-2 rounded border bg-white dark:bg-gray-800' />
          <input name='phone' value={form.phone} onChange={handleChange} placeholder='Phone' className='px-3 py-2 rounded border bg-white dark:bg-gray-800' />
          <textarea name='message' value={form.message} onChange={handleChange} placeholder='How can we help?' className='px-3 py-2 rounded border bg-white dark:bg-gray-800' rows={6} />
          <div className='flex gap-2'>
            <button className='btn-primary px-6 py-2'>Send Message</button>
            <a href='https://wa.me/15551234567' className='px-6 py-2 bg-green-500 text-white rounded'>WhatsApp</a>
          </div>
        </form>

        <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='p-4 border rounded'>
            <h3 className='font-semibold'>Office</h3>
            <p className='text-sm text-gray-600 dark:text-gray-300'>1234 Auto Drive, Motor City</p>
            <p className='text-sm mt-2'>Phone: + (234) 8160779706</p>
            <p className='text-sm'>Email: festusbamikole2018@gmail.com</p>
            <p className='text-sm mt-2'>Hours: Mon-Fri 9am–6pm</p>
          </div>

          <div className='p-4 border rounded'>
            <h3 className='font-semibold'>Find Us</h3>
            <div className='mt-2'>
              <iframe title='map' src='https://www.google.com/maps/embed?pb=!1m18' className='w-full h-48 rounded' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
