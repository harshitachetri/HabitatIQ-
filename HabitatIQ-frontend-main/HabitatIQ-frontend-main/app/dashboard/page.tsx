"use client";

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Home, Heart, ArrowRightLeft, TrendingUp, LineChart, Calendar, ArrowRight } from 'lucide-react';

export default function DashboardHomePage() {
    const { user } = useAuth();

    const metrics = [
        { name: 'Discover Properties', icon: Home, href: '/dashboard/properties', desc: 'Browse all listings' },
        { name: 'Saved Properties', icon: Heart, href: '/dashboard/saved', desc: 'Your wishlist' },
        { name: 'Compare Properties', icon: ArrowRightLeft, href: '/dashboard/compare', desc: 'Side-by-side analysis' },
        { name: 'AI Price Prediction', icon: TrendingUp, href: '/dashboard/predict', desc: 'ML-powered forecasts' },
        { name: 'Investment Analysis', icon: LineChart, href: '/dashboard/investment', desc: 'ROI calculator' },
        { name: 'Visit Requests', icon: Calendar, href: '/dashboard/visits', desc: 'Schedule property tours' },
    ];

    return (
        <div>
            {/* Header */}
            <div className="mb-10">
                <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--accent)' }}>
                    Dashboard
                </p>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: '#ffffff' }}>
                    Welcome back, {user?.name?.split(' ')[0] || 'User'} 👋
                </h1>
                <p className="mt-1.5 text-sm" style={{ color: 'var(--muted)' }}>
                    Here&apos;s what&apos;s happening with your account today.
                </p>
            </div>

            {/* Quick action cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {metrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                        <Link
                            key={metric.name}
                            href={metric.href}
                            className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 group"
                            style={{
                                background: 'var(--card-bg)',
                                border: '1px solid var(--card-border)',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(182,255,59,0.25)';
                                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = 'var(--card-border)';
                                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                            }}
                        >
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                                style={{ background: 'rgba(182,255,59,0.1)' }}
                            >
                                <Icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold" style={{ color: '#ffffff' }}>{metric.name}</p>
                                <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{metric.desc}</p>
                            </div>
                            <ArrowRight
                                className="w-4 h-4 shrink-0 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200"
                                style={{ color: 'var(--accent)' }}
                            />
                        </Link>
                    );
                })}
            </div>

            {/* Get started callout */}
            <div
                className="rounded-2xl p-8 relative overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, rgba(182,255,59,0.08) 0%, rgba(182,255,59,0.02) 100%)',
                    border: '1px solid rgba(182,255,59,0.15)',
                }}
            >
                <div className="max-w-2xl relative z-10">
                    <h2 className="text-xl font-bold mb-3" style={{ color: '#ffffff' }}>Get Started with HabitatIQ</h2>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                        HabitatIQ empowers you with data-driven real estate insights. Start by exploring our extensive
                        property catalog, save properties that catch your eye, and utilize our advanced AI tools to
                        predict prices and analyze your investment ROI.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/dashboard/properties"
                            className="flex items-center gap-2 font-bold py-2.5 px-6 rounded-xl text-sm transition-all duration-200 hover:scale-[1.03]"
                            style={{ background: 'var(--accent)', color: '#0f1720' }}
                        >
                            Browse Properties <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/dashboard/investment"
                            className="flex items-center gap-2 font-semibold py-2.5 px-6 rounded-xl text-sm transition-all duration-200 hover:border-white/20"
                            style={{
                                border: '1px solid rgba(255,255,255,0.12)',
                                color: 'rgba(255,255,255,0.7)',
                            }}
                        >
                            Analyze Investment
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
