'use client';

import VisitForm from '@/components/VisitForm';
import { fetchApi } from '@/lib/api';
import { Property } from '@/types/property';
import { User } from '@/types/user';
import {
    MapPin, BedDouble, Bath, Maximize, Loader2, ArrowLeft,
    Link as LinkIcon, Mail, MessageCircle, ArrowRightLeft,
    ExternalLink, CheckCircle2, ChevronLeft, ChevronRight, Building2, Phone
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { use } from 'react';

const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
};

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = use(params);
    const { id } = unwrappedParams;

    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeImage, setActiveImage] = useState(0);
    const [shareToast, setShareToast] = useState('');
    const [isInCompare, setIsInCompare] = useState(false);
    const [compareLoading, setCompareLoading] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const data = await fetchApi<Property>(`/properties/${id}`, { requiresAuth: true });
                setProperty(data);

                // Check compare status
                try {
                    const compareList = await fetchApi<any[]>('/compare', { requiresAuth: true });
                    const inList = compareList.some(item => {
                        const prop = item.propertyId;
                        const pid = typeof prop === 'string' ? prop : prop?._id;
                        return pid === data._id;
                    });
                    setIsInCompare(inList);
                } catch { }
            } catch (err: any) {
                setError(err.message || 'Failed to load property');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProperty();
    }, [id]);

    const handleShare = async (platform: 'whatsapp' | 'email' | 'link') => {
        const propertyUrl = `${window.location.origin}/dashboard/properties/${id}`;
        const title = property?.title || 'Property';

        try {
            await fetchApi(`/share/${id}`, {
                method: 'POST',
                requiresAuth: true,
                body: JSON.stringify({ platform })
            });
        } catch { /* track silently */ }

        if (platform === 'link') {
            navigator.clipboard.writeText(propertyUrl).then(() => {
                setShareToast('Link copied!');
                setTimeout(() => setShareToast(''), 2500);
            });
        } else if (platform === 'whatsapp') {
            window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this property: ${title}\n${propertyUrl}`)}`, '_blank');
        } else if (platform === 'email') {
            window.open(`mailto:?subject=${encodeURIComponent(`Property: ${title}`)}&body=${encodeURIComponent(`I found this property on HabitatIQ:\n${title}\n${propertyUrl}`)}`, '_blank');
        }
    };

    const handleAddToCompare = async () => {
        if (isInCompare || !property) return;
        setCompareLoading(true);
        try {
            await fetchApi('/compare', {
                method: 'POST',
                requiresAuth: true,
                body: JSON.stringify({ propertyId: property._id })
            });
            setIsInCompare(true);
        } catch (err: any) {
            alert(err.message || 'Failed to add to compare list');
        } finally {
            setCompareLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center flex-col items-center h-full min-h-[50vh]">
                <Loader2 className="w-10 h-10 animate-spin" style={{ color: 'var(--accent)' }} />
                <p className="mt-4 font-medium animate-pulse" style={{ color: 'var(--muted)' }}>Loading property details...</p>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div 
                className="p-8 rounded-2xl text-center"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}
            >
                <h3 className="text-xl font-bold mb-2" style={{ color: '#fca5a5' }}>Error</h3>
                <p style={{ color: '#fca5a5' }}>{error || 'Property not found'}</p>
                <Link href="/dashboard/properties" className="mt-4 inline-block underline font-medium hover:text-white transition-colors" style={{ color: '#fca5a5' }}>
                    Return to properties
                </Link>
            </div>
        );
    }

    const images = property.images && property.images.length > 0
        ? property.images
        : ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'];

    const owner = typeof property.owner === 'object' ? property.owner as User : null;

    return (
        <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Link href="/dashboard/properties" className="inline-flex items-center text-sm font-medium hover:text-white mb-6 transition-colors group" style={{ color: 'var(--muted)' }}>
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Properties
            </Link>

            <div className="rounded-2xl overflow-hidden mb-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                {/* Image Gallery */}
                <div className="relative w-full h-[400px]" style={{ background: '#0a1219' }}>
                    <img
                        src={images[activeImage]}
                        alt={`${property.title} - image ${activeImage + 1}`}
                        className="w-full h-full object-cover transition-opacity duration-300"
                    />

                    {/* Gallery navigation */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={() => setActiveImage(i => (i - 1 + images.length) % images.length)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full shadow transition-all hover:scale-110"
                                style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
                            >
                                <ChevronLeft className="w-5 h-5 text-white" />
                            </button>
                            <button
                                onClick={() => setActiveImage(i => (i + 1) % images.length)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full shadow transition-all hover:scale-110"
                                style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
                            >
                                <ChevronRight className="w-5 h-5 text-white" />
                            </button>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                                {images.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        className={`w-2 h-2 rounded-full transition-all ${i === activeImage ? 'w-5' : 'opacity-50 hover:opacity-100'}`}
                                        style={{ background: i === activeImage ? 'var(--accent)' : '#ffffff' }}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Badges */}
                    <div className="absolute top-6 left-6 flex gap-2">
                        <span className="text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wide shadow-sm" style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', backdropFilter: 'blur(4px)' }}>
                            {(property.constructionStatus || 'unknown').replace(/-/g, ' ')}
                        </span>
                        <span className="text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wide shadow-sm" style={{ background: 'var(--accent)', color: '#0f1720', backdropFilter: 'blur(4px)' }}>
                            {property.propertyType || 'property'}
                        </span>
                    </div>

                    <div className="absolute top-4 right-6 text-xs font-medium px-2 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)' }}>
                        {activeImage + 1} / {images.length}
                    </div>
                </div>

                {/* Thumbnail strip */}
                {images.length > 1 && (
                    <div className="flex gap-2 px-4 py-3 overflow-x-auto border-b" style={{ background: 'rgba(0,0,0,0.2)', borderColor: 'rgba(255,255,255,0.05)' }}>
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveImage(i)}
                                className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === activeImage ? '' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                style={{ borderColor: i === activeImage ? 'var(--accent)' : 'transparent' }}
                            >
                                <img src={img} alt={`thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}

                <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                        <div className="flex-1">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <h1 className="text-3xl md:text-4xl font-extrabold" style={{ color: '#ffffff' }}>{property.title}</h1>

                                {/* Share buttons */}
                                <div className="flex items-center gap-2 shrink-0 relative">
                                    {shareToast && (
                                        <span className="absolute -top-8 right-0 text-white text-xs px-2 py-1 rounded whitespace-nowrap flex items-center gap-1" style={{ background: '#0a1219', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            <CheckCircle2 className="w-3 h-3" /> {shareToast}
                                        </span>
                                    )}
                                    <button onClick={() => handleShare('whatsapp')} className="p-2 rounded-lg transition-colors hover:bg-white/10" style={{ background: 'rgba(255,255,255,0.05)', color: '#ffffff' }} title="Share on WhatsApp">
                                        <MessageCircle className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleShare('email')} className="p-2 rounded-lg transition-colors hover:bg-white/10" style={{ background: 'rgba(255,255,255,0.05)', color: '#ffffff' }} title="Share via Email">
                                        <Mail className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleShare('link')} className="p-2 rounded-lg transition-colors hover:bg-white/10" style={{ background: 'rgba(255,255,255,0.05)', color: '#ffffff' }} title="Copy Link">
                                        <LinkIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <p className="flex items-center text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                <MapPin className="w-5 h-5 mr-2 shrink-0" style={{ color: 'var(--accent)' }} />
                                {property.locality && `${property.locality}, `}{property.city || 'City'}, {property.state || 'State'}
                            </p>

                            <div className="flex flex-wrap items-center gap-8 py-6 border-y mb-8" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                                <div className="flex items-center">
                                    <div className="p-3 rounded-xl mr-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                        <BedDouble className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                                    </div>
                                    <div>
                                        <span className="block text-2xl font-bold" style={{ color: '#ffffff' }}>{property.bedrooms}</span>
                                        <span className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--muted)' }}>Bedrooms</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="p-3 rounded-xl mr-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                        <Bath className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                                    </div>
                                    <div>
                                        <span className="block text-2xl font-bold" style={{ color: '#ffffff' }}>{property.bathrooms}</span>
                                        <span className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--muted)' }}>Bathrooms</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="p-3 rounded-xl mr-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                        <Maximize className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                                    </div>
                                    <div>
                                        <span className="block text-2xl font-bold" style={{ color: '#ffffff' }}>{property.areaSqft}</span>
                                        <span className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--muted)' }}>Sq Ft</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="p-3 rounded-xl mr-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                        <Building2 className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                                    </div>
                                    <div>
                                        <span className="block text-sm font-bold capitalize" style={{ color: '#ffffff' }}>{(property.furnishingStatus || 'unfurnished').replace(/-/g, ' ')}</span>
                                        <span className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--muted)' }}>Furnishing</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-4" style={{ color: '#ffffff' }}>About this property</h3>
                                <p className="leading-relaxed whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                    {property.description}
                                </p>
                            </div>

                            {/* Virtual Tour Link */}
                            {property.virtualTourUrl && (
                                <div className="mb-8">
                                    <a
                                        href={property.virtualTourUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 font-medium px-4 py-2.5 rounded-lg transition-colors hover:bg-white/10 text-sm"
                                        style={{ background: 'rgba(255,255,255,0.05)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.1)' }}
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Take Virtual Tour
                                    </a>
                                </div>
                            )}

                            {/* Owner Info */}
                            {owner && (
                                <div className="rounded-xl p-5 border" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}>
                                    <h4 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--muted)' }}>Listed By</h4>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff' }}>
                                            {owner.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium" style={{ color: '#ffffff' }}>{owner.name}</p>
                                            <p className="text-sm" style={{ color: 'var(--muted)' }}>{owner.email}</p>
                                            {owner.phone && <p className="text-sm flex items-center gap-1 mt-0.5" style={{ color: 'var(--muted)' }}><Phone className="w-3 h-3" />{owner.phone}</p>}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="w-full md:w-80 shrink-0">
                            <div className="sticky top-24">
                                <div className="rounded-2xl p-6 mb-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <p className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--muted)' }}>Listed Price</p>
                                    <p className="text-4xl font-extrabold" style={{ color: 'var(--accent)' }}>{formatPrice(property.price)}</p>
                                </div>

                                {/* Add to Compare */}
                                <button
                                    onClick={handleAddToCompare}
                                    disabled={isInCompare || compareLoading}
                                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all mb-4 ${isInCompare ? 'cursor-default' : 'hover:scale-[1.02]'}`}
                                    style={{
                                        background: isInCompare ? 'rgba(255,255,255,0.1)' : 'var(--accent)',
                                        color: isInCompare ? '#ffffff' : '#0f1720',
                                        border: isInCompare ? '1px solid rgba(255,255,255,0.1)' : 'none',
                                        boxShadow: !isInCompare ? '0 0 24px rgba(182,255,59,0.3)' : 'none',
                                    }}
                                >
                                    {compareLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRightLeft className="w-4 h-4" />}
                                    {isInCompare ? 'Added to Compare' : 'Add to Compare'}
                                </button>

                                {isInCompare && (
                                    <Link href="/dashboard/compare" className="block text-center text-xs hover:underline mb-4" style={{ color: 'var(--accent)' }}>
                                        View Compare List →
                                    </Link>
                                )}

                                <VisitForm propertyId={property._id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
