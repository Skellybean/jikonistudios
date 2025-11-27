import React from 'react'
import Navbar from "@/components/navbar"
import Image from 'next/image'
import Footer from "@/components/footer";

const Products = () => {
    const products = [
        { src: '/product1.jpg', name: 'Modern Kitchen Design', category: 'Kitchen' },
        { src: '/product2.jpg', name: 'Luxury Wardrobe', category: 'Wardrobe' },
        { src: '/product3.jpg', name: 'Contemporary Kitchen', category: 'Kitchen' },
        { src: '/product4.jpg', name: 'Walk-in Closet', category: 'Wardrobe' },
        { src: '/product5.jpg', name: 'Minimalist Kitchen', category: 'Kitchen' },
        { src: '/product6.jpg', name: 'Custom Cabinetry', category: 'Cabinetry' },
        { src: '/product7.jpg', name: 'Elegant Wardrobe', category: 'Wardrobe' },
        { src: '/product8.jpg', name: 'Classic Kitchen', category: 'Kitchen' },
        { src: '/product9.jpg', name: 'Storage Solutions', category: 'Cabinetry' },
    ]

    const services = [
        {
            icon: '🍳',
            title: 'Custom Kitchen Design & Installation',
            description: 'Sleek, space-efficient, and tailored to your cooking style.'
        },
        {
            icon: '👔',
            title: 'Wardrobe Design & Fitting',
            description: 'Elegant storage solutions for modern living.'
        },
        {
            icon: '🔨',
            title: 'Cabinetry & Joinery Works',
            description: 'Precision-built cabinets, drawers, and finishes.'
        },
        {
            icon: '📐',
            title: '3D Design & Visualization',
            description: 'Realistic previews before we begin the build.'
        },
        {
            icon: '✨',
            title: 'Renovations & Makeovers',
            description: 'Upgrade your existing kitchen or wardrobes with a modern touch.'
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-grey-50 to-yellow-50 py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Our Products & Services
                        </h1>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                            Complete interior solutions designed to make your home both functional and inspiring
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        What We Offer
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-yellow-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200"
                            >
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Gallery */}
            <section className="py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Our Portfolio
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
                            >
                                <div className="relative h-64 bg-gray-200 overflow-hidden">
                                    <img
                                        src={product.src}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {product.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {product.name}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-16 bg-yellow-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                        Ready to Transform Your Space?
                    </h2>
                    <p className="text-xl text-black mb-8">
                        Let's bring your vision to life with expert design and craftsmanship
                    </p>
                    <a
                        href="/contact-us"
                        className="inline-block bg-white text-black font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg"
                    >
                        Get in Touch
                    </a>
                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default Products