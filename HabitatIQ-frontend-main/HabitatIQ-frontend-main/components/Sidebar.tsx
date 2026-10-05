"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Home,
    Heart,
    ArrowRightLeft,
    Calendar,
    TrendingUp,
    LineChart,
    LogOut,
    Building2,
    PlusCircle
} from 'lucide-react';

import { useAuth } from '@/context/AuthContext';

const NAV_ITEMS = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Properties', href: '/dashboard/properties', icon: Home },
    { name: 'Saved', href: '/dashboard/saved', icon: Heart },
    { name: 'Compare', href: '/dashboard/compare', icon: ArrowRightLeft },
    { name: 'Visits', href: '/dashboard/visits', icon: Calendar },
    { name: 'Price Predict', href: '/dashboard/predict', icon: TrendingUp },
    { name: 'Investment', href: '/dashboard/investment', icon: LineChart },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { logout, user } = useAuth();
    
    // Add Sell Property link for everyone
    const dynamicNavItems = [...NAV_ITEMS];
    dynamicNavItems.splice(2, 0, { name: 'Sell Property', href: '/dashboard/properties/add', icon: PlusCircle });

    return (
        <aside
            className="w-64 flex-col h-full hidden md:flex fixed left-0 top-0 bottom-0 z-40 pt-20"
            style={{
                background: '#0a1219',
                borderRight: '1px solid rgba(255,255,255,0.07)',
            }}
        >
            <div className="flex-1 overflow-y-auto py-4">
                {/* User greeting */}
                <div className="px-6 mb-8 mt-3">
                    <div
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={{ background: 'rgba(182,255,59,0.07)', border: '1px solid rgba(182,255,59,0.12)' }}
                    >
                        <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm"
                            style={{ background: 'var(--accent)', color: '#0f1720' }}
                        >
                            {(user?.name || 'U')[0].toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>
                                Welcome back,
                            </p>
                            <p className="text-sm font-semibold truncate" style={{ color: '#ffffff' }}>
                                {user?.name || 'User'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1 px-3">
                    {dynamicNavItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                                style={{
                                    background: isActive ? 'rgba(182,255,59,0.12)' : 'transparent',
                                    color: isActive ? 'var(--accent)' : 'rgba(255,255,255,0.55)',
                                    border: isActive ? '1px solid rgba(182,255,59,0.2)' : '1px solid transparent',
                                }}
                                onMouseEnter={e => {
                                    if (!isActive) {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                                        (e.currentTarget as HTMLElement).style.color = '#ffffff';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!isActive) {
                                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                                        (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)';
                                    }
                                }}
                            >
                                <Icon
                                    className="w-4.5 h-4.5 shrink-0"
                                    style={{ color: isActive ? 'var(--accent)' : 'rgba(255,255,255,0.35)' }}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Logout */}
            <div
                className="p-4"
                style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-sm font-medium transition-all duration-200"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.1)';
                        (e.currentTarget as HTMLElement).style.color = '#ef4444';
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                        (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)';
                    }}
                >
                    <LogOut className="w-4 h-4 shrink-0" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
