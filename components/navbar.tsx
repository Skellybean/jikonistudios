'use client'
import React, { useState } from 'react'
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5"
import Link from 'next/link'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/products', label: 'Products' },
        { href: '/about-us', label: 'About Us' },
        { href: '/contact-us', label: 'Contact Us' }
    ]

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-gray-800">
                            <img src="/logo.png" alt="Jikoni Studios Logo" className="h-10 w-10 rounded-full" />
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <ul className="flex space-x-8">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-lg p-2"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <IoCloseOutline className="text-3xl" />
                            ) : (
                                <IoMenuOutline className="text-3xl" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <ul className="px-4 pt-2 pb-4 space-y-2 bg-gray-50">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block py-2 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200 font-medium"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar