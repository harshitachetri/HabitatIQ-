"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Building2, ArrowRight, Loader2, Mail, Lock, User, Phone, Shield } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { setToken } from '@/lib/auth';
import { AuthResponse } from '@/types/user';

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 14px 11px 44px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
};

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('buyer');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const data = await fetchApi<AuthResponse>('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, phone, password, role })
            });

            setToken(data.token);
            login(data.token, data);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to register');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex"
            style={{ background: 'var(--background)' }}
        >
            {/* Left panel — decorative */}
            <div className="hidden lg:flex flex-1 flex-col justify-between p-12 relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Luxury home"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(15,23,32,0.95) 0%, rgba(15,23,32,0.5) 100%)' }}
                />
                <Link href="/" className="relative z-10 flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent)' }}>
                        <Building2 className="w-5 h-5" style={{ color: '#0f1720' }} />
                    </div>
                    <span className="text-xl font-bold" style={{ color: '#ffffff' }}>
                        Habitat<span style={{ color: 'var(--accent)' }}>IQ</span>
                    </span>
                </Link>
                <div className="relative z-10">
                    <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>Join 5,000+ investors</p>
                    <blockquote className="text-3xl font-extrabold leading-tight mb-4" style={{ color: '#ffffff' }}>
                        &ldquo;Smarter decisions,
                        <br />
                        <span style={{ color: 'var(--accent)' }}>better returns.</span>&rdquo;
                    </blockquote>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        Backed by AI · Trusted by thousands
                    </p>
                </div>
            </div>

            {/* Right panel — form */}
            <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-20 overflow-y-auto">
                {/* Mobile logo */}
                <Link href="/" className="flex items-center gap-2.5 mb-10 lg:hidden">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent)' }}>
                        <Building2 className="w-5 h-5" style={{ color: '#0f1720' }} />
                    </div>
                    <span className="text-xl font-bold" style={{ color: '#ffffff' }}>
                        Habitat<span style={{ color: 'var(--accent)' }}>IQ</span>
                    </span>
                </Link>

                <div className="max-w-sm w-full mx-auto lg:mx-0">
                    <h1 className="text-3xl font-extrabold mb-2" style={{ color: '#ffffff' }}>
                        Create account
                    </h1>
                    <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>
                        Already have an account?{' '}
                        <Link href="/login" style={{ color: 'var(--accent)' }} className="font-semibold hover:underline">
                            Sign in instead
                        </Link>
                    </p>

                    {error && (
                        <div
                            className="mb-6 p-4 rounded-xl text-sm"
                            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
                        >
                            {error}
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Full name */}
                        <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted)' }} />
                                <input
                                    id="name" name="name" type="text" required
                                    value={name} onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    style={inputStyle}
                                    onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Email address</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted)' }} />
                                <input
                                    id="email" name="email" type="email" autoComplete="email" required
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    style={inputStyle}
                                    onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted)' }} />
                                <input
                                    id="phone" name="phone" type="tel" autoComplete="tel" required
                                    value={phone} onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+91 98765 43210"
                                    style={inputStyle}
                                    onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                                />
                            </div>
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>I am a...</label>
                            <div className="relative">
                                <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted)' }} />
                                <select
                                    id="role" name="role"
                                    value={role} onChange={(e) => setRole(e.target.value)}
                                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                                    onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                                >
                                    <option value="buyer" style={{ background: '#14202e' }}>Buyer — looking for properties</option>
                                    <option value="seller" style={{ background: '#14202e' }}>Seller — listing properties</option>
                                </select>
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted)' }} />
                                <input
                                    id="password" name="password" type="password" autoComplete="new-password" required
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    style={inputStyle}
                                    onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed group mt-2"
                            style={{
                                background: 'var(--accent)',
                                color: '#0f1720',
                                boxShadow: '0 0 24px rgba(182,255,59,0.3)',
                            }}
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Create account
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
