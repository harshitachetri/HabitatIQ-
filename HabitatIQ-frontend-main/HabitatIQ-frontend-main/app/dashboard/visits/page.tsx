"use client";

import { useState, useEffect } from 'react';
import { fetchApi } from '@/lib/api';
import { VisitRequest, Property } from '@/types/property';
import { User } from '@/types/user';
import { Loader2, Calendar, MapPin, Clock, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function VisitsPage() {
    const [activeTab, setActiveTab] = useState<'my-requests' | 'incoming'>('my-requests');
    const [requests, setRequests] = useState<VisitRequest[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchVisits = async () => {
        setLoading(true);
        try {
            const endpoint = activeTab === 'my-requests' ? '/visits/my-requests' : '/visits/owner';
            const data = await fetchApi<VisitRequest[]>(endpoint, { requiresAuth: true });
            setRequests(data);
        } catch (error) {
            console.error('Failed to fetch visits', error);
            setRequests([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVisits();
    }, [activeTab]);

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            await fetchApi(`/visits/${id}/status`, {
                method: 'PUT',
                requiresAuth: true,
                body: JSON.stringify({ status: newStatus })
            });
            fetchVisits();
        } catch (error) {
            console.error('Failed to update status', error);
            alert('Failed to update status.');
        }
    };

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-emerald-100 text-emerald-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-amber-100 text-amber-800';
        }
    };

    const formatVisitDateTime = (visitDate: string, visitTime: string) => {
        try {
            const date = new Date(visitDate);
            const dateStr = date.toLocaleDateString('en-IN', {
                weekday: 'short', month: 'short', day: 'numeric'
            });
            return `${dateStr} at ${visitTime}`;
        } catch {
            return `${visitDate} at ${visitTime}`;
        }
    };

    return (
        <div>
            <div className="mb-8">
                <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--accent)' }}>Schedule</p>
                <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: '#ffffff' }}>Visit Requests</h1>
                <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Manage your property tours and incoming visit requests.</p>
            </div>

            <div className="flex border-b mb-8" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <button
                    className={`pb-4 px-4 font-semibold text-sm transition-all duration-200 border-b-2`}
                    style={{
                        borderColor: activeTab === 'my-requests' ? 'var(--accent)' : 'transparent',
                        color: activeTab === 'my-requests' ? 'var(--accent)' : 'rgba(255,255,255,0.5)',
                    }}
                    onClick={() => setActiveTab('my-requests')}
                >
                    My Requests
                </button>
                <button
                    className={`pb-4 px-4 font-semibold text-sm transition-all duration-200 border-b-2`}
                    style={{
                        borderColor: activeTab === 'incoming' ? 'var(--accent)' : 'transparent',
                        color: activeTab === 'incoming' ? 'var(--accent)' : 'rgba(255,255,255,0.5)',
                    }}
                    onClick={() => setActiveTab('incoming')}
                >
                    Incoming Requests
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center flex-col items-center h-48">
                    <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--accent)' }} />
                </div>
            ) : requests.length === 0 ? (
                <div
                    className="p-16 rounded-2xl text-center"
                    style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                >
                    <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                        style={{ background: 'rgba(182,255,59,0.08)' }}
                    >
                        <Calendar className="w-8 h-8" style={{ color: 'var(--accent)' }} />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#ffffff' }}>No visits found</h3>
                    <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
                        {activeTab === 'my-requests'
                            ? "You haven't requested any property visits yet."
                            : "You don't have any incoming visit requests for your properties."}
                    </p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {requests.map(request => {
                        // Backend populates propertyId and buyerId
                        const property = typeof request.propertyId === 'object' ? request.propertyId as Property : null;
                        const buyer = typeof request.buyerId === 'object' ? request.buyerId as User : null;

                        return (
                            <div
                                key={request._id}
                                className="rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6 transition-all duration-300 group hover:-translate-y-1"
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
                                <div className="flex-1">
                                    {property ? (
                                        <Link
                                            href={`/dashboard/properties/${property._id}`}
                                            className="text-lg font-bold mb-2 inline-block transition-colors hover:opacity-80"
                                            style={{ color: '#ffffff' }}
                                        >
                                            {property.title}
                                        </Link>
                                    ) : (
                                        <div className="text-lg font-bold mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Property Unavailable</div>
                                    )}

                                    <div className="flex flex-col gap-2 text-sm mb-4" style={{ color: 'var(--muted)' }}>
                                        {property && (
                                            <div className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-2" style={{ color: 'rgba(255,255,255,0.3)' }} />
                                                {property.locality && `${property.locality}, `}{property.city}, {property.state}
                                            </div>
                                        )}
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-2" style={{ color: 'var(--accent)' }} />
                                            <span
                                                className="font-medium px-2 py-0.5 rounded"
                                                style={{ background: 'rgba(182,255,59,0.08)', color: 'var(--accent)' }}
                                            >
                                                {formatVisitDateTime(request.visitDate, request.visitTime)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="flex flex-col md:items-end justify-between gap-4 md:w-64 pt-4 md:pt-0 md:pl-6 shrink-0"
                                    style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                                >
                                    <div className="w-full">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusBadgeColor(request.status)}`}>
                                            {request.status}
                                        </span>

                                        {activeTab === 'incoming' && buyer && (
                                            <div className="mt-4 text-sm p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                                <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--muted)' }}>Requested By</p>
                                                <p className="font-semibold mb-0.5" style={{ color: '#ffffff' }}>{buyer.name}</p>
                                                <p style={{ color: 'rgba(255,255,255,0.6)' }} className="text-xs">{buyer.email}</p>
                                                {buyer.phone && <p style={{ color: 'rgba(255,255,255,0.6)' }} className="text-xs">{buyer.phone}</p>}
                                            </div>
                                        )}
                                    </div>

                                    {activeTab === 'incoming' && request.status === 'pending' && (
                                        <div className="flex gap-2 w-full mt-4">
                                            <button
                                                onClick={() => handleUpdateStatus(request._id, 'approved')}
                                                className="flex-1 text-sm font-bold py-2 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5"
                                                style={{ background: '#10b981', color: '#ffffff' }}
                                            >
                                                <CheckCircle2 className="w-4 h-4" />
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(request._id, 'rejected')}
                                                className="flex-1 text-sm font-bold py-2 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5"
                                                style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}
                                            >
                                                <XCircle className="w-4 h-4" />
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
