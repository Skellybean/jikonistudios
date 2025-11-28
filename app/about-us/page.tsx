import React from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const team = [
  { name: 'Asha Mwangi', role: 'Founder & Creative Director', bio: 'Oversees design and creative direction.' },
  { name: 'David Kimani', role: 'Head of Production', bio: 'Leads product development and operations.' },
  { name: 'Maya Patel', role: 'Marketing & Partnerships', bio: 'Builds brand and community relationships.' },
]

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white text-gray-900">
      <Navbar />

      <header className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Jikoni Studios</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          We design memorable products inspired by everyday kitchens and the stories that come with them.
          Our team blends craft, photography and product design to bring unique pieces to life.
        </p>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Our mission</h2>
            <p className="text-gray-700 mb-4">
              To create high-quality, thoughtful products that celebrate home cooking and shared moments.
              We focus on sustainable materials, clean design and accessible pricing.
            </p>

            <ul className="space-y-2 text-gray-700">
              <li>• Sustainably sourced materials</li>
              <li>• Hand-finished quality</li>
              <li>• Community-focused stories</li>
            </ul>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg bg-white">
            <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500">
              Hero image placeholder
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600">
                We prototype locally and test with real kitchens to ensure utility and durability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-semibold mb-6 text-center">Meet the team</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {team.map((member) => (
            <div key={member.name} className="bg-white p-5 rounded-lg shadow-sm">
              <div className="w-full h-36 bg-gray-100 rounded-md mb-4 flex items-center justify-center text-gray-400">
                Photo
              </div>
              <h4 className="font-semibold">{member.name}</h4>
              <p className="text-sm text-yellow-700 mb-2">{member.role}</p>
              <p className="text-sm text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h4 className="text-xl font-medium mb-3">Want to work with us or learn more?</h4>
        <p className="text-gray-700 mb-6">Reach out — we love collaborating with makers, stores and creators.</p>
        <a
          href="/contact-us"
          className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-3 rounded-md transition"
        >
          Contact Us
        </a>
      </section>

      <Footer />
    </div>
  )
}
