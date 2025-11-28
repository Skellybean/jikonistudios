'use client'
import Navbar from "@/components/navbar";
import Link from "next/link";
import Footer from "@/components/footer";
import Loadingscreen from "@/components/loadingscreen";
import { useEffect, useState } from "react";

export default function Home() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return <Loadingscreen progress={100}/>
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main>
                <section className="bg-gradient-to-br from-yellow-50 to-gray-100 py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                                Jikoni Studios Interior
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                                Transform spaces into modern, practical, and elegant interiors
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-6">
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    At Jikoni Studios, we believe that every home deserves a kitchen and wardrobe that perfectly blends function, beauty, and craftsmanship.
                                    Founded in Nairobi, we specialize in custom kitchen and wardrobe design, fabrication, and installation — combining modern design aesthetics with local expertise.
                                </p>

                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Our mission is simple: to transform spaces into modern, practical, and elegant interiors that reflect your lifestyle and personality.
                                    With a team of skilled designers and technicians, we take pride in delivering projects that are crafted to perfection — from the first sketch to the final finish.
                                </p>

                                <div className="pt-6">
                                    <Link
                                        href="/products"
                                        className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
                                    >
                                        View Our Products
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center p-6">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">🎨</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Design</h3>
                                <p className="text-gray-600">Tailored solutions that match your unique style and needs</p>
                            </div>

                            <div className="text-center p-6">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">🔨</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Craftsmanship</h3>
                                <p className="text-gray-600">Quality fabrication by skilled local technicians</p>
                            </div>

                            <div className="text-center p-6">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">✨</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Full Installation</h3>
                                <p className="text-gray-600">Complete service from design to final installation</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer/>
        </div>
    );
}