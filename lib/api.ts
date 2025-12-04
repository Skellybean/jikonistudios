const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const getAuthToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('admin_token')
    }
    return null
}

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = getAuthToken()
    
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
    }

    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers,
    })

    if (response.status === 401) {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('admin_token')
            localStorage.removeItem('admin_user')
            window.location.href = '/admin/login'
        }
    }

    return response
}

export const authAPI = {
    login: async (username: string, password: string) => {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
        return response.json()
    },

    getProfile: async () => {
        const response = await fetchWithAuth('/api/auth/profile')
        return response.json()
    },

    updateProfile: async (data: { email?: string; new_password?: string }) => {
        const response = await fetchWithAuth('/api/auth/profile', {
            method: 'PUT',
            body: JSON.stringify(data),
        })
        return response.json()
    },
}

export const productsAPI = {
    getAll: async (params?: { category?: string; page?: number; per_page?: number; featured?: boolean }) => {
        const queryParams = new URLSearchParams()
        if (params?.category) queryParams.append('category', params.category)
        if (params?.page) queryParams.append('page', params.page.toString())
        if (params?.per_page) queryParams.append('per_page', params.per_page.toString())
        if (params?.featured) queryParams.append('featured', 'true')

        const url = `/api/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`
        const response = await fetch(`${API_URL}${url}`)
        return response.json()
    },

    getOne: async (id: number) => {
        const response = await fetch(`${API_URL}/api/products/${id}`)
        return response.json()
    },

    create: async (data: {
        name: string
        category: string
        description?: string
        price?: number
        image_url?: string
        featured?: boolean
    }) => {
        const response = await fetchWithAuth('/api/products', {
            method: 'POST',
            body: JSON.stringify(data),
        })
        return response.json()
    },

    update: async (id: number, data: {
        name?: string
        category?: string
        description?: string
        price?: number
        image_url?: string
        featured?: boolean
    }) => {
        const response = await fetchWithAuth(`/api/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
        return response.json()
    },

    delete: async (id: number) => {
        const response = await fetchWithAuth(`/api/products/${id}`, {
            method: 'DELETE',
        })
        return response.json()
    },
}

export const messagesAPI = {
    getAll: async (params?: { status?: string; page?: number; per_page?: number }) => {
        const queryParams = new URLSearchParams()
        if (params?.status) queryParams.append('status', params.status)
        if (params?.page) queryParams.append('page', params.page.toString())
        if (params?.per_page) queryParams.append('per_page', params.per_page.toString())

        const url = `/api/messages${queryParams.toString() ? '?' + queryParams.toString() : ''}`
        const response = await fetchWithAuth(url)
        return response.json()
    },

    getOne: async (id: number) => {
        const response = await fetchWithAuth(`/api/messages/${id}`)
        return response.json()
    },

    create: async (data: {
        name: string
        email: string
        phone?: string
        message: string
    }) => {
        const response = await fetch(`${API_URL}/api/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        return response.json()
    },

    updateStatus: async (id: number, status: 'new' | 'read' | 'replied') => {
        const response = await fetchWithAuth(`/api/messages/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        })
        return response.json()
    },

    delete: async (id: number) => {
        const response = await fetchWithAuth(`/api/messages/${id}`, {
            method: 'DELETE',
        })
        return response.json()
    },
}

export const dashboardAPI = {
    getStats: async () => {
        const response = await fetchWithAuth('/api/dashboard/stats')
        return response.json()
    },
}

export const categoriesAPI = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/api/categories`)
        return response.json()
    },
}

export const healthCheck = async () => {
    const response = await fetch(`${API_URL}/api/health`)
    return response.json()
}

export { API_URL }