'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Stats {
    total_products: number
    total_messages: number
    new_messages: number
    featured_products: number
}

interface Product {
    id: number
    name: string
    category: string
    created_at: string
}

interface Message {
    id: number
    name: string
    email: string
    status: string
    created_at: string
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null)
    const [recentProducts, setRecentProducts] = useState<Product[]>([])
    const [recentMessages, setRecentMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(true)
    const [adminUser, setAdminUser] = useState<any>(null)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('admin_token')
        const user = localStorage.getItem('admin_user')
        
        if (!token) {
            router.push('/admin/login')
            return
        }

        if (user) {
            setAdminUser(JSON.parse(user))
        }

        fetchDashboardData(token)
    }, [router])

    const fetchDashboardData = async (token: string) => {
        try {
            const response = await fetch('http://localhost:5000/api/dashboard/stats', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                setStats(data.stats)
                setRecentProducts(data.recent_products)
                setRecentMessages(data.recent_messages)
            } else {
                router.push('/admin/login')
            }
        } catch (err) {
            console.error('Error fetching dashboard data:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_user')
        router.push('/admin/login')
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation */}
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-yellow-600">Jikoni Studios</span>
                            <span className="ml-2 text-gray-500">Admin Panel</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">{adminUser?.username}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-lg min-h-screen">
                    <div className="p-4">
                        <nav className="space-y-2">
                            <Link
                                href="/admin/dashboard"
                                className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-yellow-50 text-yellow-600"
                            >
                                <span>📊</span>
                                <span>Dashboard</span>
                            </Link>
                            <Link
                                href="/admin/products"
                                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-yellow-50 text-gray-700 hover:text-yellow-600"
                            >
                                <span>📦</span>
                                <span>Products</span>
                            </Link>
                            <Link
                                href="/admin/messages"
                                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-yellow-50 text-gray-700 hover:text-yellow-600"
                            >
                                <span>✉️</span>
                                <span>Messages</span>
                            </Link>
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-600 mt-2">Welcome back, {adminUser?.username}!</p>
                    </div>

                    {/* Stats Cards */}
                    {stats && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow p-6">
                                <p className="text-gray-600 text-sm">Total Products</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.total_products}</p>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <p className="text-gray-600 text-sm">Total Messages</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.total_messages}</p>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <p className="text-gray-600 text-sm">New Messages</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.new_messages}</p>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <p className="text-gray-600 text-sm">Featured Products</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.featured_products}</p>
                            </div>
                        </div>
                    )}

                    {/* Recent Products */}
                    <div className="bg-white rounded-lg shadow mb-8">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Recent Products</h2>
                        </div>
                        <div className="p-6">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-gray-600 text-sm">
                                        <th className="pb-4">Product</th>
                                        <th className="pb-4">Category</th>
                                        <th className="pb-4">Added</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentProducts.map((product) => (
                                        <tr key={product.id} className="border-t border-gray-100">
                                            <td className="py-4">{product.name}</td>
                                            <td className="py-4">
                                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="py-4 text-gray-600">
                                                {new Date(product.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-4 text-center">
                                <Link href="/admin/products" className="text-yellow-600 hover:text-yellow-700 font-medium">
                                    View All Products →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Recent Messages */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Recent Messages</h2>
                        </div>
                        <div className="p-6">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-gray-600 text-sm">
                                        <th className="pb-4">Name</th>
                                        <th className="pb-4">Email</th>
                                        <th className="pb-4">Status</th>
                                        <th className="pb-4">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentMessages.map((message) => (
                                        <tr key={message.id} className="border-t border-gray-100">
                                            <td className="py-4">{message.name}</td>
                                            <td className="py-4">{message.email}</td>
                                            <td className="py-4">
                                                <span className={`px-3 py-1 rounded-full text-sm ${
                                                    message.status === 'new' ? 'bg-green-100 text-green-800' :
                                                    message.status === 'read' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {message.status}
                                                </span>
                                            </td>
                                            <td className="py-4 text-gray-600">
                                                {new Date(message.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-4 text-center">
                                <Link href="/admin/messages" className="text-yellow-600 hover:text-yellow-700 font-medium">
                                    View All Messages →
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}