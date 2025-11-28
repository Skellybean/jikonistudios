'use client'
import React, { useState } from 'react'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { messagesAPI } from "@/lib/api"

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState<{
        type: 'success' | 'error' | null
        message: string
    }>({ type: null, message: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setStatus({ type: null, message: '' })

        try {
            const response = await messagesAPI.create(formData)
            
            if (response.message === 'Message sent successfully') {
                setStatus({
                    type: 'success',
                    message: 'Thank you for contacting us! We will get back to you soon.'
                })
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                })
            } else {
                throw new Error(response.message || 'Failed to send message')
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Failed to send message. Please try again or contact us directly via email.'
            })
            console.error('Error sending message:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <section className="bg-gradient-to-br from-yellow-50 to-gray-100 py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Contact Us
                        </h1>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                            Get in touch with us for custom designs and consultations
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Let's Talk About Your Project
                            </h2>
                            <p className="text-gray-700 mb-8">
                                Whether you're looking to transform your kitchen, design a custom wardrobe, 
                                or need expert cabinetry work, we're here to help bring your vision to life.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-yellow-100 p-3 rounded-lg">
                                        <span className="text-2xl">📍</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                                        <p className="text-gray-600">Nairobi, Kenya</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-yellow-100 p-3 rounded-lg">
                                        <span className="text-2xl">📧</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                        <p className="text-gray-600">info@jikonistudios.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-yellow-100 p-3 rounded-lg">
                                        <span className="text-2xl">📱</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                                        <p className="text-gray-600">+254 XXX XXX XXX</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-yellow-100 p-3 rounded-lg">
                                        <span className="text-2xl">🕐</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                                        <p className="text-gray-600">
                                            Monday - Friday: 8:00 AM - 6:00 PM<br />
                                            Saturday: 9:00 AM - 4:00 PM<br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Send Us a Message
                            </h2>

                            {status.type && (
                                <div className={`mb-6 p-4 rounded-lg ${
                                    status.type === 'success' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {status.message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        placeholder="+254 XXX XXX XXX"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        placeholder="Tell us about your project..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-4 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                        Visit Our Showroom
                    </h2>
                    <p className="text-center text-gray-600 mb-8">
                        Come see our latest designs and discuss your project with our team
                    </p>
                    <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
                        <p className="text-gray-600">
                            Map will be displayed here
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default ContactUs