"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/user';
import { getToken, removeToken } from '../lib/auth';
import { fetchApi } from '../lib/api';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadUser = async () => {
            const token = getToken();
            if (token) {
                try {
                    const userData = await fetchApi<User>('/auth/me', { requiresAuth: true });
                    setUser(userData);
                } catch (error) {
                    console.error('Failed to load user', error);
                    removeToken();
                }
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    const login = (token: string, userData: User) => {
        setUser(userData);
    };

    const logout = () => {
        removeToken();
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
