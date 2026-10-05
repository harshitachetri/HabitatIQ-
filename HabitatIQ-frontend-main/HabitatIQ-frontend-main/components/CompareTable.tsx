import { Property } from '@/types/property';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';

interface CompareTableProps {
    properties: Property[];
    onRemove: (id: string) => void;
}

const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
};

const ROWS: { label: string; render: (p: Property) => string | number }[] = [
    { label: 'Price', render: p => formatPrice(p.price) },
    { label: 'Type', render: p => p.propertyType },
    { label: 'Construction', render: p => (p.constructionStatus || 'N/A').replace(/-/g, ' ') },
    { label: 'Furnishing', render: p => (p.furnishingStatus || 'N/A').replace(/-/g, ' ') },
    { label: 'Area', render: p => `${p.areaSqft} sqft` },
    { label: 'Bedrooms', render: p => p.bedrooms },
    { label: 'Bathrooms', render: p => p.bathrooms },
    { label: 'Locality', render: p => p.locality || '—' },
    { label: 'City', render: p => p.city || '—' },
    { label: 'State', render: p => p.state || '—' },
    { label: 'Price / sqft', render: p => `₹${Math.round(p.price / p.areaSqft).toLocaleString('en-IN')}` },
];

export default function CompareTable({ properties, onRemove }: CompareTableProps) {
    if (properties.length === 0) return null;

    return (
        <div
            className="overflow-x-auto rounded-xl shadow-sm"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
        >
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th
                            className="p-4 md:p-6 border-b border-r min-w-[160px] align-bottom"
                            style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'var(--card-border)' }}
                        >
                            <span className="text-lg font-bold" style={{ color: '#ffffff' }}>Compare</span>
                            <p className="text-sm font-normal mt-1" style={{ color: 'var(--muted)' }}>{properties.length} properties</p>
                        </th>
                        {properties.map(property => {
                            const imgUrl = property.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                            return (
                                <th
                                    key={property._id}
                                    className="p-4 md:p-6 border-b min-w-[260px] w-[260px] align-top relative group"
                                    style={{ borderColor: 'var(--card-border)' }}
                                >
                                    <button
                                        onClick={() => onRemove(property._id)}
                                        className="absolute top-2 right-2 p-1.5 rounded-md shadow-sm transition-all opacity-0 group-hover:opacity-100 z-10 hover:scale-110"
                                        style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
                                        title="Remove from comparison"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="w-full h-36 rounded-lg overflow-hidden mb-3 relative">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-0" />
                                        <img src={imgUrl} alt={property.title} className="w-full h-full object-cover" />
                                    </div>
                                    <Link
                                        href={`/dashboard/properties/${property._id}`}
                                        className="text-base font-bold hover:underline line-clamp-2 transition-colors hover:opacity-80"
                                        style={{ color: '#ffffff' }}
                                    >
                                        {property.title}
                                    </Link>
                                    <p className="font-normal text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                        {property.locality ? `${property.locality}, ` : ''}{property.city}
                                    </p>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {ROWS.map((row, rowIdx) => (
                        <tr
                            key={row.label}
                            style={{ background: rowIdx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}
                        >
                            <td
                                className="p-4 border-b border-r font-semibold text-sm"
                                style={{ borderColor: 'var(--card-border)', background: 'rgba(255,255,255,0.01)', color: 'var(--muted)' }}
                            >
                                {row.label}
                            </td>
                            {properties.map(p => (
                                <td
                                    key={p._id}
                                    className="p-4 border-b text-sm capitalize"
                                    style={{ borderColor: 'var(--card-border)', color: 'rgba(255,255,255,0.8)' }}
                                >
                                    {row.render(p)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
