import React, { useState } from 'react'

export default function Careers() {
  const [app, setApp] = useState({ name: '', email: '', role: '', resume: null })

  const handleFile = (e) => setApp({ ...app, resume: e.target.files[0] })

  const submit = (e) => {
    e.preventDefault()
    alert('Application submitted (if backend configured).')
  }

  return (
    <div className='container-custom section-padding'>
      <h1 className='text-3xl font-bold mb-4'>Careers at festybam</h1>
      <p className='text-gray-700 dark:text-gray-300 mb-6'>Join our growing team. We value diversity, learning, and customer obsession.</p>

      <div className='grid md:grid-cols-2 gap-6'>
        <div>
          <h3 className='font-semibold mb-2'>Open Positions</h3>
          <ul className='list-disc ml-6'>
            <li>Sales Consultant</li>
            <li>Service Technician</li>
            <li>Marketing Associate</li>
          </ul>
        </div>

        <div>
          <h3 className='font-semibold mb-2'>Apply Online</h3>
          <form onSubmit={submit} className='grid gap-3'>
            <input placeholder='Full name' className='px-3 py-2 rounded border' />
            <input placeholder='Email' className='px-3 py-2 rounded border' />
            <select className='px-3 py-2 rounded border'>
              <option>Choose role</option>
              <option>Sales Consultant</option>
              <option>Service Technician</option>
            </select>
            <input type='file' onChange={handleFile} />
            <button className='btn-primary'>Submit Application</button>
          </form>
        </div>
      </div>
    </div>
  )
}
