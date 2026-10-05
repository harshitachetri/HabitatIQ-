"use client";

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{ background: 'var(--background)' }}
            >
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin" style={{ color: 'var(--accent)' }} />
                    <p className="text-sm font-medium animate-pulse" style={{ color: 'var(--muted)' }}>
                        Loading Workspace...
                    </p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)' }}>
            <Navbar />
            <div className="flex flex-1 pt-[73px]"> {/* Offset for fixed navbar */}
                <Sidebar />
                <main className="flex-1 md:pl-64 overflow-x-hidden min-h-[calc(100vh-73px)]">
                    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
