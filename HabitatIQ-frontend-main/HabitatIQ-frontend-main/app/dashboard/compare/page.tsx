"use client";

import { useState, useEffect } from 'react';
import { Property, CompareItem } from '@/types/property';
import { fetchApi } from '@/lib/api';
import CompareTable from '@/components/CompareTable';
import { Loader2, ArrowRightLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ComparePropertiesPage() {
    const [comparedProperties, setComparedProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompared = async () => {
            try {
                // Backend returns Comparison docs with propertyId populated
                const data = await fetchApi<CompareItem[]>('/compare', { requiresAuth: true });
                const properties = data
                    .map(item => typeof item.propertyId === 'object' ? item.propertyId as Property : null)
                    .filter((p): p is Property => p !== null);
                setComparedProperties(properties);
            } catch (error) {
                console.error('Failed to fetch compared properties', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCompared();
    }, []);

    const handleRemove = async (propertyId: string) => {
        try {
            await fetchApi(`/compare/${propertyId}`, { method: 'DELETE', requiresAuth: true });
            setComparedProperties(prev => prev.filter(p => p._id !== propertyId));
        } catch (error) {
            console.error('Failed to remove property from comparison', error);
            alert('Failed to remove property. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center flex-col items-center h-full min-h-[50vh]">
                <Loader2 className="w-10 h-10 animate-spin" style={{ color: 'var(--accent)' }} />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--accent)' }}>Analysis</p>
                    <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: '#ffffff' }}>Compare Properties</h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Side-by-side analysis of your selected properties.</p>
                </div>
                {comparedProperties.length > 0 && (
                    <span
                        className="text-sm font-medium px-3 py-1.5 rounded-lg"
                        style={{ background: 'rgba(182,255,59,0.1)', color: 'var(--accent)' }}
                    >
                        {comparedProperties.length}/3 selected
                    </span>
                )}
            </div>

            {comparedProperties.length === 0 ? (
                <div
                    className="p-16 rounded-2xl text-center"
                    style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                >
                    <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                        style={{ background: 'rgba(182,255,59,0.08)' }}
                    >
                        <ArrowRightLeft className="w-8 h-8" style={{ color: 'var(--accent)' }} />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#ffffff' }}>Nothing to compare</h3>
                    <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
                        You haven&apos;t added any properties to your comparison list yet. Browse properties and click the compare icon to add up to 3 properties.
                    </p>
                    <Link
                        href="/dashboard/properties"
                        className="inline-flex items-center gap-2 font-bold py-3 px-8 rounded-xl transition-all duration-200 hover:scale-[1.03] text-sm"
                        style={{ background: 'var(--accent)', color: '#0f1720' }}
                    >
                        Browse Properties <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            ) : (
                <CompareTable properties={comparedProperties} onRemove={handleRemove} />
            )}
        </div>
    );
}
