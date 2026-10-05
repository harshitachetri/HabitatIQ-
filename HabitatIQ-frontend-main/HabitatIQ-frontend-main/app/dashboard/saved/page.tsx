"use client";

import { useState, useEffect } from 'react';
import { Property, SavedItem } from '@/types/property';
import { fetchApi } from '@/lib/api';
import PropertyCard from '@/components/PropertyCard';
import { Loader2, HeartCrack, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SavedPropertiesPage() {
    const [savedProperties, setSavedProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSaved = async () => {
            try {
                // Backend returns SavedProperty docs with propertyId populated
                const data = await fetchApi<SavedItem[]>('/saved', { requiresAuth: true });
                const properties = data
                    .map(item => typeof item.propertyId === 'object' ? item.propertyId as Property : null)
                    .filter((p): p is Property => p !== null);
                setSavedProperties(properties);
            } catch (error) {
                console.error('Failed to fetch saved properties', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSaved();
    }, []);

    const handleRemoveSaved = async (propertyId: string) => {
        try {
            await fetchApi(`/saved/${propertyId}`, { method: 'DELETE', requiresAuth: true });
            setSavedProperties(prev => prev.filter(p => p._id !== propertyId));
        } catch (error) {
            console.error('Failed to remove saved property', error);
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
            <div className="mb-8">
                <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--accent)' }}>Wishlist</p>
                <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: '#ffffff' }}>Saved Properties</h1>
                <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Properties you have wishlisted for later.</p>
            </div>

            {savedProperties.length === 0 ? (
                <div
                    className="p-16 rounded-2xl text-center"
                    style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                >
                    <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                        style={{ background: 'rgba(182,255,59,0.08)' }}
                    >
                        <HeartCrack className="w-8 h-8" style={{ color: 'var(--accent)' }} />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#ffffff' }}>No saved properties yet</h3>
                    <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
                        You haven&apos;t saved any properties yet. Start exploring and click the heart icon to save properties you like.
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedProperties.map(property => (
                        <PropertyCard
                            key={property._id}
                            property={property}
                            isSaved={true}
                            onSaveToggle={handleRemoveSaved}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
