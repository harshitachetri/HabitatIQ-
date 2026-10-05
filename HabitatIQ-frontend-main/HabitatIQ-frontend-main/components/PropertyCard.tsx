import Link from 'next/link';
import { Property } from '@/types/property';
import { MapPin, BedDouble, Bath, Maximize, Heart, ArrowRightLeft } from 'lucide-react';
import React from 'react';

interface PropertyCardProps {
    property: Property;
    onSaveToggle?: (id: string) => void;
    isSaved?: boolean;
    onAddToCompare?: (id: string) => void;
    isInCompare?: boolean;
}

const formatPrice = (price: number) => {
    // Format in Indian number system (lakhs/crores)
    if (price >= 10000000) {
        return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    if (price >= 100000) {
        return `₹${(price / 100000).toFixed(2)} L`;
    }
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
};

export default function PropertyCard({ property, onSaveToggle, isSaved = false, onAddToCompare, isInCompare = false }: PropertyCardProps) {
    const imageUrl = property.images && property.images.length > 0
        ? property.images[0]
        : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

    return (
        <div
            className="rounded-2xl overflow-hidden group transition-all duration-400 hover:-translate-y-2"
            style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(182,255,59,0.2)';
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
            }}
        >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Gradient overlay on image */}
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(15,23,32,0.7) 0%, transparent 50%)' }}
                />

                {/* Status badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span
                        className="text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider"
                        style={{
                            background: 'var(--accent)',
                            color: '#0f1720',
                        }}
                    >
                        {(property.constructionStatus || 'unknown').replace('-', ' ')}
                    </span>
                    <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg uppercase tracking-wider"
                        style={{
                            background: 'rgba(255,255,255,0.12)',
                            color: '#ffffff',
                            backdropFilter: 'blur(8px)',
                        }}
                    >
                        {property.propertyType || 'property'}
                    </span>
                </div>

                {/* Action buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                    {onSaveToggle && (
                        <button
                            onClick={(e) => { e.preventDefault(); onSaveToggle(property._id); }}
                            className="p-2 rounded-xl transition-all duration-200 hover:scale-110"
                            style={{
                                background: isSaved ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.1)',
                                color: isSaved ? '#ef4444' : 'rgba(255,255,255,0.8)',
                                backdropFilter: 'blur(8px)',
                            }}
                            title={isSaved ? 'Remove from saved' : 'Save property'}
                        >
                            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                        </button>
                    )}
                    {onAddToCompare && (
                        <button
                            onClick={(e) => { e.preventDefault(); onAddToCompare(property._id); }}
                            className="p-2 rounded-xl transition-all duration-200 hover:scale-110"
                            style={{
                                background: isInCompare ? 'rgba(182,255,59,0.2)' : 'rgba(255,255,255,0.1)',
                                color: isInCompare ? 'var(--accent)' : 'rgba(255,255,255,0.8)',
                                backdropFilter: 'blur(8px)',
                            }}
                            title={isInCompare ? 'In compare list' : 'Add to compare'}
                        >
                            <ArrowRightLeft className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Card Body */}
            <Link href={`/dashboard/properties/${property._id}`} className="block p-5">
                <h3 className="text-lg font-bold mb-1.5 truncate" style={{ color: '#ffffff' }}>
                    {property.title}
                </h3>
                <p className="flex items-center text-sm mb-4 truncate" style={{ color: 'var(--muted)' }}>
                    <MapPin className="w-3.5 h-3.5 mr-1 shrink-0" style={{ color: 'var(--accent)' }} />
                    {property.locality && `${property.locality}, `}{property.city || 'Unknown City'}, {property.state || 'Unknown State'}
                </p>

                {/* Specs */}
                <div
                    className="flex items-center justify-between py-3.5 mb-4 rounded-xl px-4"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                    <div className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        <BedDouble className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                        <span className="font-medium">{property.bedrooms} Beds</span>
                    </div>
                    <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.1)' }} />
                    <div className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        <Bath className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                        <span className="font-medium">{property.bathrooms} Baths</span>
                    </div>
                    <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.1)' }} />
                    <div className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        <Maximize className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                        <span className="font-medium">{property.areaSqft} sqft</span>
                    </div>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs mb-0.5" style={{ color: 'var(--muted)' }}>Price</p>
                        <p className="text-xl font-extrabold" style={{ color: 'var(--accent)' }}>
                            {formatPrice(property.price)}
                        </p>
                    </div>
                    <span
                        className="text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200"
                        style={{
                            background: 'rgba(182,255,59,0.1)',
                            color: 'var(--accent)',
                            border: '1px solid rgba(182,255,59,0.25)',
                        }}
                    >
                        View Details →
                    </span>
                </div>
            </Link>
        </div>
    );
}
