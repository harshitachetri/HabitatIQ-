"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';
import { 
    Building2, MapPin, 
    Home, Maximize,
    Bed, Bath,
    IndianRupee, Info,
    Loader2
} from 'lucide-react';

const inputStyle = {
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

const textareaStyle = {
    ...inputStyle,
    padding: '14px',
    minHeight: '120px',
    resize: 'vertical' as 'vertical'
};

export default function AddPropertyPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        propertyType: 'apartment',
        price: '',
        bedrooms: '',
        bathrooms: '',
        areaSqft: '',
        furnishingStatus: 'unfurnished',
        constructionStatus: 'ready-to-move',
        state: '',
        city: '',
        locality: ''
    });

    // Allow all users to access this page

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Convert numerical fields
            const submitData = {
                ...formData,
                price: Number(formData.price),
                bedrooms: Number(formData.bedrooms),
                bathrooms: Number(formData.bathrooms),
                areaSqft: Number(formData.areaSqft),
            };

            const newProperty = await fetchApi('/properties', {
                method: 'POST',
                requiresAuth: true,
                body: JSON.stringify(submitData)
            });

            if (newProperty) {
                router.push('/dashboard/properties');
                router.refresh();
            }
        } catch (err: any) {
            setError(err.message || 'Failed to list property');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold mb-2" style={{ color: '#ffffff' }}>
                    Sell a Property
                </h1>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                    List a new property for buyers to discover and invest in.
                </p>
            </div>

            {error && (
                <div 
                    className="p-4 rounded-xl text-sm"
                    style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
                >
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div 
                    className="p-6 md:p-8 rounded-2xl"
                    style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}
                >
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: '#ffffff' }}>
                        <Info className="w-5 h-5" style={{ color: 'var(--accent)' }}/>
                        Basic Information
                    </h2>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Property Title *</label>
                            <input
                                name="title" required
                                value={formData.title} onChange={handleChange}
                                placeholder="e.g. Luxurious 3BHK in Downtown"
                                style={{ ...inputStyle, paddingLeft: '14px' }}
                                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Description *</label>
                            <textarea
                                name="description" required
                                value={formData.description} onChange={handleChange}
                                placeholder="Describe the key features and highlights of the property..."
                                style={textareaStyle}
                                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                        </div>
                    </div>
                </div>

                {/* Property Details */}
                <div 
                    className="p-6 md:p-8 rounded-2xl"
                    style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}
                >
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: '#ffffff' }}>
                        <Building2 className="w-5 h-5" style={{ color: 'var(--accent)' }}/>
                        Property Details
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Property Type *</label>
                            <div className="relative">
                                <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted)' }} />
                                <select
                                    name="propertyType" required
                                    value={formData.propertyType} onChange={handleChange}
                                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                >
                                    <option value="apartment" style={{ background: '#0a1219' }}>Apartment</option>
                                    <option value="house" style={{ background: '#0a1219' }}>House / Villa</option>
                                    <option value="plot" style={{ background: '#0a1219' }}>Plot</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Price (₹) *</label>
                            <div className="relative">
                                <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted)' }} />
                                <input
                                    type="number" min="0" name="price" required
                                    value={formData.price} onChange={handleChange}
                                    placeholder="e.g. 15000000"
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Area (Sq. Ft.) *</label>
                            <div className="relative">
                                <Maximize className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted)' }} />
                                <input
                                    type="number" min="0" name="areaSqft" required
                                    value={formData.areaSqft} onChange={handleChange}
                                    placeholder="e.g. 1200"
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                />
                            </div>
                        </div>

                        {formData.propertyType !== 'plot' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Bedrooms *</label>
                                    <div className="relative">
                                        <Bed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted)' }} />
                                        <input
                                            type="number" min="0" name="bedrooms" required
                                            value={formData.bedrooms} onChange={handleChange}
                                            placeholder="e.g. 3"
                                            style={inputStyle}
                                            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Bathrooms *</label>
                                    <div className="relative">
                                        <Bath className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted)' }} />
                                        <input
                                            type="number" min="0" name="bathrooms" required
                                            value={formData.bathrooms} onChange={handleChange}
                                            placeholder="e.g. 2"
                                            style={inputStyle}
                                            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Furnishing Status</label>
                                    <select
                                        name="furnishingStatus"
                                        value={formData.furnishingStatus} onChange={handleChange}
                                        style={{ ...inputStyle, paddingLeft: '14px', appearance: 'none', cursor: 'pointer' }}
                                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                    >
                                        <option value="unfurnished" style={{ background: '#0a1219' }}>Unfurnished</option>
                                        <option value="semi-furnished" style={{ background: '#0a1219' }}>Semi-furnished</option>
                                        <option value="fully-furnished" style={{ background: '#0a1219' }}>Fully-furnished</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Construction Status</label>
                                    <select
                                        name="constructionStatus"
                                        value={formData.constructionStatus} onChange={handleChange}
                                        style={{ ...inputStyle, paddingLeft: '14px', appearance: 'none', cursor: 'pointer' }}
                                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                    >
                                        <option value="under-construction" style={{ background: '#0a1219' }}>Under Construction</option>
                                        <option value="ready-to-move" style={{ background: '#0a1219' }}>Ready to Move</option>
                                    </select>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Location Map */}
                <div 
                    className="p-6 md:p-8 rounded-2xl"
                    style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}
                >
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: '#ffffff' }}>
                        <MapPin className="w-5 h-5" style={{ color: 'var(--accent)' }}/>
                        Location
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>State *</label>
                            <input
                                name="state" required
                                value={formData.state} onChange={handleChange}
                                placeholder="e.g. Maharashtra"
                                style={{ ...inputStyle, paddingLeft: '14px' }}
                                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>City *</label>
                            <input
                                name="city" required
                                value={formData.city} onChange={handleChange}
                                placeholder="e.g. Mumbai"
                                style={{ ...inputStyle, paddingLeft: '14px' }}
                                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Locality *</label>
                            <input
                                name="locality" required
                                value={formData.locality} onChange={handleChange}
                                placeholder="e.g. Andheri West"
                                style={{ ...inputStyle, paddingLeft: '14px' }}
                                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed group w-full md:w-auto"
                        style={{
                            background: 'var(--accent)',
                            color: '#0f1720',
                            boxShadow: '0 0 24px rgba(182,255,59,0.3)',
                        }}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            'List Property for Sale'
                        )}
                    </button>
                </div>
                
                <p className="text-center text-xs mt-4" style={{ color: 'var(--muted)' }}>
                    Note: Images can be uploaded to the listing from the property dashboard after creation.
                </p>
            </form>
        </div>
    );
}
