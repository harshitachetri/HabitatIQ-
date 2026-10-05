"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Building2, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav
            className="fixed w-full top-0 z-50 border-b"
            style={{
                background: 'rgba(15,23,32,0.88)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderColor: 'rgba(255,255,255,0.07)',
            }}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                        style={{ background: 'var(--accent)' }}
                    >
                        <Building2 className="w-5 h-5" style={{ color: '#0f1720' }} />
                    </div>
                    <span
                        className="text-xl font-bold tracking-tight"
                        style={{ color: '#ffffff' }}
                    >
                        Habitat<span style={{ color: 'var(--accent)' }}>IQ</span>
                    </span>
                </Link>

                {/* Nav items */}
                <div className="flex items-center gap-2">
                    {user ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
                                style={{ color: 'rgba(255,255,255,0.7)' }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.color = '#ffffff';
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                                }}
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Dashboard
                            </Link>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ml-1"
                                style={{ color: 'rgba(255,255,255,0.5)' }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.color = '#ff6b6b';
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,107,107,0.1)';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                                }}
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-sm font-medium px-5 py-2 rounded-lg transition-all duration-200"
                                style={{ color: 'rgba(255,255,255,0.7)' }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.color = '#ffffff';
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                                }}
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.03]"
                                style={{
                                    background: 'var(--accent)',
                                    color: '#0f1720',
                                    boxShadow: '0 0 20px rgba(182,255,59,0.25)',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(182,255,59,0.4)';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(182,255,59,0.25)';
                                }}
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
