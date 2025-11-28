'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Product {
    id: number
    name: string
    category: string
    description: string
    image_path: string
    price: number
    featured: boolean
    created_at: string
}

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        category: 'Kitchen',
        description: '',
        price: '',
        featured: false,
        image_path: ''
    })
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('admin_token')
        if (!token) {
            router.push('/admin/login')
            return
        }
        fetchProducts()
    }, [router])

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products')
            if (response.ok) {
                const data = await response.json()
                setProducts(data.products)
            }
        } catch (err) {
            console.error('Error fetching products:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = localStorage.getItem('admin_token')

        const url = editingProduct
            ? `http://localhost:5000/api/products/${editingProduct.id}`
            : 'http://localhost:5000/api/products'

        const method = editingProduct ? 'PUT' : 'POST'

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    price: formData.price ? parseFloat(formData.price) : null
                }),
            })

            if (response.ok) {
                setShowModal(false)
                setEditingProduct(null)
                setFormData({
                    name: '',
                    category: 'Kitchen',
                    description: '',
                    price: '',
                    featured: false,
                    image_path: ''
                })
                fetchProducts()
            }
        } catch (err) {
            console.error('Error saving product:', err)
        }
    }

    const handleEdit = (product: Product) => {
        setEditingProduct(product)
        setFormData({
            name: product.name,
            category: product.category,
            description: product.description || '',
            price: product.price?.toString() || '',
            featured: product.featured,
            image_path: product.image_path || ''
        })
        setShowModal(true)
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return

        const token = localStorage.getItem('admin_token')
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (response.ok) {
                fetchProducts()
            }
        } catch (err) {
            console.error('Error deleting product:', err)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_user')
        router.push('/admin/login')
    }

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation */}
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-yellow-600">Jikoni Studios</span>
                        </div>
                        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-lg min-h-screen">
                    <div className="p-4">
                        <nav className="space-y-2">
                            <Link href="/admin/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-yellow-50 text-gray-700">
                                <span>📊</span><span>Dashboard</span>
                            </Link>
                            <Link href="/admin/products" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-yellow-50 text-yellow-600">
                                <span>📦</span><span>Products</span>
                            </Link>
                            <Link href="/admin/messages" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-yellow-50 text-gray-700">
                                <span>✉️</span><span>Messages</span>
                            </Link>
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <div className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                            <p className="text-gray-600 mt-2">Manage your product catalog</p>
                        </div>
                        <button
                            onClick={() => {
                                setEditingProduct(null)
                                setFormData({
                                    name: '',
                                    category: 'Kitchen',
                                    description: '',
                                    price: '',
                                    featured: false,
                                    image_path: ''
                                })
                                setShowModal(true)
                            }}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold"
                        >
                            + Add Product
                        </button>
                    </div>

                    {/* Products Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr className="text-left text-gray-600 text-sm">
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Featured</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="border-t border-gray-100">
                                        <td className="px-6 py-4 font-medium">{product.name}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.price ? `KSh ${product.price.toLocaleString()}` : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.featured ? '⭐' : ''}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-screen overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">
                            {editingProduct ? 'Edit Product' : 'Add Product'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="Kitchen">Kitchen</option>
                                    <option value="Wardrobe">Wardrobe</option>
                                    <option value="Cabinetry">Cabinetry</option>
                                    <option value="Custom">Custom</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Price (KSh)</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        className="mr-2"
                                    />
                                    <span className="text-gray-700 font-medium">Featured Product</span>
                                </label>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold"
                                >
                                    {editingProduct ? 'Update' : 'Create'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}