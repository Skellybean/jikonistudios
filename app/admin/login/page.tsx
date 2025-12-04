'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        if (!username || !password) {
            setError('Please enter username and password')
            return
        }

        setLoading(true)
        try {
            const res = await fetch(`${API_BASE}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            })

            let data: any = null
            try {
                data = await res.json()
            } catch {
                
            }

            if (res.ok && data?.token) {
                localStorage.setItem('admin_token', data.token)
                if (data.admin) localStorage.setItem('admin_user', JSON.stringify(data.admin))
                router.push('/admin/dashboard')
                return
            }

            setError(data?.message || res.statusText || 'Login failed')
        } catch (err) {
            setError('Unable to connect to server')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-gray-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Jikoni Studios</h1>
                    <p className="text-gray-600">Admin Panel</p>
                </div>

                {error && (
                    <div role="alert" className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} aria-busy={loading}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            autoComplete="username"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            autoComplete="current-password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50"
                        aria-disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    )
}