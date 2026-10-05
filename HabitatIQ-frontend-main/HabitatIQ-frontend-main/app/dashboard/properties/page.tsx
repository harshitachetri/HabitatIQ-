"use client";

import React from 'react';

import { useState, useEffect, useCallback } from 'react';
import { Property } from '@/types/property';
import { fetchApi } from '@/lib/api';
import PropertyCard from '@/components/PropertyCard';
import { Search, Loader2, SlidersHorizontal, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface PropertyFilters {
    keyword: string;
    propertyType: string;
    bedrooms: string;
    minPrice: string;
    maxPrice: string;
}

const PROPERTY_TYPES = ['', 'apartment', 'house', 'villa', 'plot'];
const BEDROOM_OPTIONS = ['', '1', '2', '3', '4', '5'];

export default function PropertiesDiscovery() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [savedPropertyIds, setSavedPropertyIds] = useState<Set<string>>(new Set());
    const [compareIds, setCompareIds] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);
    const [compareLoading, setCompareLoading] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState<PropertyFilters>({
        keyword: '',
        propertyType: '',
        bedrooms: '',
        minPrice: '',
        maxPrice: '',
    });
    const [appliedFilters, setAppliedFilters] = useState<PropertyFilters>({
        keyword: '',
        propertyType: '',
        bedrooms: '',
        minPrice: '',
        maxPrice: '',
    });

    const buildQueryString = (f: PropertyFilters, pageNum: number) => {
        const params = new URLSearchParams();
        if (f.keyword) params.set('keyword', f.keyword);
        if (f.propertyType) params.set('propertyType', f.propertyType);
        if (f.bedrooms) params.set('bedrooms', f.bedrooms);
        if (f.minPrice) params.set('minPrice', f.minPrice);
        if (f.maxPrice) params.set('maxPrice', f.maxPrice);
        params.set('pageNumber', String(pageNum));
        return params.toString();
    };

    const fetchData = useCallback(async (f: PropertyFilters, pageNum: number) => {
        setLoading(true);
        try {
            const qs = buildQueryString(f, pageNum);
            const [propsData, savedData, compareData] = await Promise.all([
                fetchApi<{ properties: Property[]; pages: number; page: number }>(`/properties?${qs}`, { requiresAuth: true }),
                fetchApi<any[]>('/saved', { requiresAuth: true }).catch(() => []),
                fetchApi<any[]>('/compare', { requiresAuth: true }).catch(() => []),
            ]);

            setProperties(propsData.properties);
            setTotalPages(propsData.pages);

            if (savedData && Array.isArray(savedData)) {
                const savedIds = new Set<string>(savedData
                    .map(item => {
                        const prop = item.propertyId;
                        return typeof prop === 'string' ? prop : prop?._id;
                    })
                    .filter(Boolean));
                setSavedPropertyIds(savedIds);
            }

            if (compareData && Array.isArray(compareData)) {
                const cIds = new Set<string>(compareData
                    .map(item => {
                        const prop = item.propertyId;
                        return typeof prop === 'string' ? prop : prop?._id;
                    })
                    .filter(Boolean));
                setCompareIds(cIds);
            }
        } catch (error) {
            console.error('Failed to fetch data', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(appliedFilters, page);
    }, [appliedFilters, page, fetchData]);

    const handleApplyFilters = () => {
        setPage(1);
        setAppliedFilters({ ...filters });
        setShowFilters(false);
    };

    const handleClearFilters = () => {
        const empty: PropertyFilters = { keyword: '', propertyType: '', bedrooms: '', minPrice: '', maxPrice: '' };
        setFilters(empty);
        setAppliedFilters(empty);
        setPage(1);
    };

    const activeFilterCount = Object.values(appliedFilters).filter(v => v !== '').length;

    const handleSaveToggle = async (propertyId: string) => {
        try {
            const isSaved = savedPropertyIds.has(propertyId);
            if (isSaved) {
                await fetchApi(`/saved/${propertyId}`, { method: 'DELETE', requiresAuth: true });
                setSavedPropertyIds(prev => { const next = new Set(prev); next.delete(propertyId); return next; });
            } else {
                await fetchApi(`/saved/${propertyId}`, { method: 'POST', requiresAuth: true });
                setSavedPropertyIds(prev => new Set(prev).add(propertyId));
            }
        } catch (error: any) {
            console.error('Failed to toggle save status', error);
            alert(error.message || 'Failed to save property. Please try again.');
        }
    };

    const handleAddToCompare = async (propertyId: string) => {
        if (compareIds.has(propertyId)) return;  // already in list
        if (compareIds.size >= 3) {
            alert('You can compare up to 3 properties at a time. Remove one from your compare list first.');
            return;
        }
        setCompareLoading(propertyId);
        try {
            await fetchApi('/compare', {
                method: 'POST',
                requiresAuth: true,
                body: JSON.stringify({ propertyId })
            });
            setCompareIds(prev => new Set(prev).add(propertyId));
        } catch (error: any) {
            console.error('Failed to add to compare', error);
            alert(error.message || 'Failed to add to compare list.');
        } finally {
            setCompareLoading(null);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--accent)' }}>Listings</p>
                    <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: '#ffffff' }}>Discover Properties</h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Find the perfect property that fits your needs.</p>
                </div>

                <div className="flex gap-3">
                    {/* Keyword search */}
                    <div className="relative flex-1 md:w-64">
                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={filters.keyword}
                            onChange={(e) => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
                            onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
                            style={{
                                width: '100%',
                                paddingLeft: '40px',
                                paddingRight: '16px',
                                paddingTop: '10px',
                                paddingBottom: '10px',
                                background: 'var(--card-bg)',
                                border: '1px solid var(--card-border)',
                                borderRadius: '12px',
                                color: '#ffffff',
                                fontSize: '14px',
                                outline: 'none',
                            }}
                            onFocus={e => (e.target.style.borderColor = 'rgba(182,255,59,0.4)')}
                            onBlur={e => (e.target.style.borderColor = 'var(--card-border)')}
                        />
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
                    </div>

                    {/* Filters toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 relative"
                        style={{
                            background: activeFilterCount > 0 ? 'rgba(182,255,59,0.12)' : 'var(--card-bg)',
                            border: activeFilterCount > 0 ? '1px solid rgba(182,255,59,0.3)' : '1px solid var(--card-border)',
                            color: activeFilterCount > 0 ? 'var(--accent)' : 'rgba(255,255,255,0.7)',
                        }}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                        {activeFilterCount > 0 && (
                            <span
                                className="absolute -top-2 -right-2 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                                style={{ background: 'var(--accent)', color: '#0f1720' }}
                            >
                                {activeFilterCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Compare bar */}
            {compareIds.size > 0 && (
                <div
                    className="mb-4 px-4 py-3 rounded-xl flex items-center justify-between"
                    style={{ background: 'rgba(182,255,59,0.08)', border: '1px solid rgba(182,255,59,0.2)' }}
                >
                    <p className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                        {compareIds.size} propert{compareIds.size === 1 ? 'y' : 'ies'} in compare list
                    </p>
                    <a
                        href="/dashboard/compare"
                        className="text-sm font-semibold hover:underline"
                        style={{ color: 'var(--accent)' }}
                    >
                        View Comparison →
                    </a>
                </div>
            )}

            {/* Filters panel */}
            {showFilters && (
                <div
                    className="mb-6 p-5 rounded-2xl"
                    style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {
                                label: 'Property Type',
                                element: (
                                    <select
                                        value={filters.propertyType}
                                        onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value }))}
                                        style={{ width: '100%', padding: '9px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff', fontSize: '13px', outline: 'none' }}
                                    >
                                        <option value="" style={{ background: '#14202e' }}>All Types</option>
                                        {PROPERTY_TYPES.filter(Boolean).map(type => (
                                            <option key={type} value={type} style={{ background: '#14202e' }}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                        ))}
                                    </select>
                                )
                            },
                            {
                                label: 'Bedrooms',
                                element: (
                                    <select
                                        value={filters.bedrooms}
                                        onChange={(e) => setFilters(prev => ({ ...prev, bedrooms: e.target.value }))}
                                        style={{ width: '100%', padding: '9px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff', fontSize: '13px', outline: 'none' }}
                                    >
                                        <option value="" style={{ background: '#14202e' }}>Any</option>
                                        {BEDROOM_OPTIONS.filter(Boolean).map(b => (
                                            <option key={b} value={b} style={{ background: '#14202e' }}>{b} BHK</option>
                                        ))}
                                    </select>
                                )
                            },
                            {
                                label: 'Min Price (₹)',
                                element: (
                                    <input type="number" min="0" step="100000" placeholder="e.g. 2000000" value={filters.minPrice}
                                        onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                                        style={{ width: '100%', padding: '9px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff', fontSize: '13px', outline: 'none' }}
                                    />
                                )
                            },
                            {
                                label: 'Max Price (₹)',
                                element: (
                                    <input type="number" min="0" step="100000" placeholder="e.g. 10000000" value={filters.maxPrice}
                                        onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                                        style={{ width: '100%', padding: '9px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff', fontSize: '13px', outline: 'none' }}
                                    />
                                )
                            },
                        ].map(({ label, element }) => (
                            <div key={label}>
                                <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--muted)' }}>{label}</label>
                                {element}
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-3 mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                        <button
                            onClick={handleApplyFilters}
                            className="font-semibold px-5 py-2 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02]"
                            style={{ background: 'var(--accent)', color: '#0f1720' }}
                        >
                            Apply Filters
                        </button>
                        {activeFilterCount > 0 && (
                            <button
                                onClick={handleClearFilters}
                                className="flex items-center gap-1.5 font-medium px-4 py-2 rounded-xl text-sm transition-all duration-200"
                                style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
                            >
                                <X className="w-4 h-4" />
                                Clear All
                            </button>
                        )}
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-10 h-10 animate-spin" style={{ color: 'var(--accent)' }} />
                </div>
            ) : properties.length === 0 ? (
                <div
                    className="p-12 rounded-2xl text-center"
                    style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                >
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#ffffff' }}>No properties found</h3>
                    <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>Try adjusting your search or filters.</p>
                    {activeFilterCount > 0 && (
                        <button onClick={handleClearFilters} className="text-sm font-semibold hover:underline" style={{ color: 'var(--accent)' }}>
                            Clear filters
                        </button>
                    )}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map(property => (
                            <PropertyCard
                                key={property._id}
                                property={property}
                                isSaved={savedPropertyIds.has(property._id)}
                                onSaveToggle={handleSaveToggle}
                                isInCompare={compareIds.has(property._id)}
                                onAddToCompare={compareLoading === property._id ? undefined : handleAddToCompare}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-12">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', color: 'rgba(255,255,255,0.7)' }}
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Prev
                            </button>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter(p => Math.abs(p - page) <= 2 || p === 1 || p === totalPages)
                                    .map((p, idx, arr) => (
                                        <React.Fragment key={p}>
                                            {idx > 0 && arr[idx - 1] !== p - 1 && (
                                                <span className="px-1" style={{ color: 'var(--muted)' }}>…</span>
                                            )}
                                            <button
                                                onClick={() => setPage(p)}
                                                className="w-9 h-9 rounded-xl text-sm font-semibold transition-all"
                                                style={p === page
                                                    ? { background: 'var(--accent)', color: '#0f1720' }
                                                    : { background: 'var(--card-bg)', border: '1px solid var(--card-border)', color: 'rgba(255,255,255,0.6)' }
                                                }
                                            >
                                                {p}
                                            </button>
                                        </React.Fragment>
                                    ))
                                }
                            </div>

                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', color: 'rgba(255,255,255,0.7)' }}
                            >
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

