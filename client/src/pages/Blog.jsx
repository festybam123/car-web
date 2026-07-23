import React from 'react'
import { Link } from 'react-router-dom'

const samplePosts = [
  { id: 1, title: 'EVs in 2026: What to Expect', excerpt: 'An overview of the electric vehicle market and what buyers should know.' },
  { id: 2, title: 'Top 10 Maintenance Tips', excerpt: 'Keep your car running longer with these practical maintenance tips.' },
  { id: 3, title: 'How to Finance Your Next Car', excerpt: 'A guide to getting the best financing terms.' }
]

export default function Blog() {
  return (
    <div className='container-custom section-padding'>
      <h1 className='text-3xl font-bold mb-6'>festybam Blog</h1>
      <div className='grid md:grid-cols-3 gap-6'>
        {samplePosts.map(p => (
          <article key={p.id} className='p-4 border rounded-lg'>
            <h3 className='font-semibold'>{p.title}</h3>
            <p className='text-sm text-gray-600 dark:text-gray-300 mt-2'>{p.excerpt}</p>
            <Link to={`/blog/${p.id}`} className='text-gold-500 mt-3 block'>Read more</Link>
          </article>
        ))}
      </div>
    </div>
  )
}
