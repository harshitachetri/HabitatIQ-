import { getToken, removeToken } from './auth';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

interface FetchOptions extends RequestInit {
    requiresAuth?: boolean;
}

export const fetchApi = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
    const { requiresAuth = false, headers, ...customOptions } = options;

    const baseHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...((headers as Record<string, string>) || {}),
    };

    if (requiresAuth) {
        const token = getToken();
        if (token) {
            baseHeaders['Authorization'] = `Bearer ${token}`;
        }
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: baseHeaders,
            ...customOptions,
        });

        // Handle 401 Unauthorized globally
        if (response.status === 401) {
            removeToken();
            if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                 window.location.href = '/login';
            }
            throw new Error('Unauthorized');
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'API Error');
        }

        return data as T;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
