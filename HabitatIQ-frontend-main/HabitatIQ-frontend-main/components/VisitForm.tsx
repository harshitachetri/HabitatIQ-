"use client";

import { useState } from 'react';
import { fetchApi } from '@/lib/api';
import { Calendar, Loader2 } from 'lucide-react';

interface VisitFormProps {
    propertyId: string;
}

export default function VisitForm({ propertyId }: VisitFormProps) {
    const [datetimeValue, setDatetimeValue] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!datetimeValue) {
            setErrorMsg('Please select a date and time');
            return;
        }

        // Split "2024-06-15T14:30" → visitDate: "2024-06-15", visitTime: "14:30"
        const [visitDate, visitTime] = datetimeValue.split('T');

        setStatus('loading');
        setErrorMsg('');

        try {
            await fetchApi('/visits/request', {
                method: 'POST',
                requiresAuth: true,
                body: JSON.stringify({
                    propertyId,
                    visitDate,
                    visitTime,
                    message
                })
            });
            setStatus('success');
            setDatetimeValue('');
            setMessage('');
        } catch (error: any) {
            setStatus('error');
            setErrorMsg(error.message || 'Failed to schedule visit');
        }
    };

    if (status === 'success') {
        return (
            <div className="p-6 rounded-xl text-center" style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(52,211,153,0.2)', color: '#34d399' }}>
                    <Calendar className="w-6 h-6" />
                </div>
                <h4 className="font-medium mb-2" style={{ color: '#34d399' }}>Visit Requested!</h4>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>The property owner has been notified and will review your request shortly.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 text-sm font-medium hover:text-white underline transition-colors"
                    style={{ color: '#34d399' }}
                >
                    Schedule another visit
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="text-left p-6 rounded-xl shadow-sm" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#ffffff' }}>Schedule a Visit</h3>

            {status === 'error' && (
                <div className="text-sm p-3 rounded-lg mb-4" style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)' }}>
                    {errorMsg}
                </div>
            )}

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    Date & Time
                </label>
                <input
                    type="datetime-local"
                    required
                    value={datetimeValue}
                    onChange={(e) => setDatetimeValue(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                    className="w-full px-4 py-2 rounded-lg outline-none transition-all"
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#ffffff',
                        colorScheme: 'dark'
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    Message to Owner (Optional)
                </label>
                <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="I'm interested in..."
                    className="w-full px-4 py-2 rounded-lg outline-none transition-all resize-none"
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#ffffff'
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
            </div>

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full font-bold py-3 rounded-xl transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02]"
                style={{
                    background: 'var(--accent)',
                    color: '#0f1720',
                    boxShadow: '0 0 24px rgba(182,255,59,0.3)'
                }}
            >
                {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <>
                        <Calendar className="w-5 h-5" />
                        Request Visit
                    </>
                )}
            </button>
        </form>
    );
}
