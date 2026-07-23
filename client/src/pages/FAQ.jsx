import React from 'react'

const faqs = [
  { q: 'How do I buy a vehicle?', a: 'Select a car, choose Buy Now or Reserve, and follow the checkout.' },
  { q: 'Can I finance my purchase?', a: 'Yes — we partner with lenders to provide financing options.' },
  { q: 'How do I schedule a test drive?', a: 'Use the Book Test Drive button on each car details page.' }
]

export default function FAQ() {
  return (
    <div className='container-custom section-padding'>
      <h1 className='text-3xl font-bold mb-6'>Frequently Asked Questions</h1>
      <div className='grid gap-4'>
        {faqs.map((f, i) => (
          <details key={i} className='p-4 border rounded'>
            <summary className='font-semibold'>{f.q}</summary>
            <p className='mt-2 text-gray-700 dark:text-gray-300'>{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
