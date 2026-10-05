"use client";

import { useState } from 'react';
import { fetchApi } from '@/lib/api';
import { PricePrediction } from '@/types/property';
import { TrendingUp, Loader2, Info } from 'lucide-react';

const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
};

export default function PredictPricePage() {
    const [formData, setFormData] = useState({
        state: '',
        city: '',
        locality: '',
        areaSqft: '',
        bedrooms: '',
        bathrooms: '',
        propertyType: 'apartment'
    });

    const [prediction, setPrediction] = useState<PricePrediction | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (isNaN(Number(formData.areaSqft)) || isNaN(Number(formData.bedrooms)) || isNaN(Number(formData.bathrooms))) {
            setError("Area, Bedrooms, and Bathrooms must be numbers.");
            setLoading(false);
            return;
        }

        try {
            const data = await fetchApi<PricePrediction>('/predict-price', {
                method: 'POST',
                requiresAuth: true,
                body: JSON.stringify({
                    ...formData,
                    areaSqft: Number(formData.areaSqft),
                    bedrooms: Number(formData.bedrooms),
                    bathrooms: Number(formData.bathrooms)
                })
            });
            setPrediction(data);
        } catch (err: any) {
            setError(err.message || 'Failed to predict price');
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full px-4 py-3 rounded-xl focus:outline-none transition-all";
    const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
                <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm"
                    style={{ background: 'rgba(182,255,59,0.08)' }}
                >
                    <TrendingUp className="w-8 h-8" style={{ color: 'var(--accent)' }} />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: '#ffffff' }}>AI Price Prediction</h1>
                <p className="mt-2 text-sm max-w-lg mx-auto" style={{ color: 'var(--muted)' }}>
                    Estimate the market value of a property using our advanced analysis engine.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div
                    className="rounded-2xl p-8 shadow-sm"
                    style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>State</label>
                                <input required name="state" value={formData.state} onChange={handleInputChange} placeholder="e.g. Maharashtra" className={inputClass} style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>City</label>
                                <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="e.g. Mumbai" className={inputClass} style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Locality / Neighbourhood</label>
                            <input required name="locality" value={formData.locality} onChange={handleInputChange} placeholder="e.g. Bandra West" className={inputClass} style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Property Type</label>
                            <select name="propertyType" value={formData.propertyType} onChange={handleInputChange} className={inputClass} style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}>
                                <option value="apartment" style={{ background: '#14202e' }}>Apartment</option>
                                <option value="house" style={{ background: '#14202e' }}>House</option>
                                <option value="villa" style={{ background: '#14202e' }}>Villa</option>
                                <option value="plot" style={{ background: '#14202e' }}>Plot</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Area (sqft)</label>
                                <input required name="areaSqft" type="number" min="100" value={formData.areaSqft} onChange={handleInputChange} placeholder="e.g. 1200" className={inputClass} style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Bedrooms</label>
                                <input required name="bedrooms" type="number" min="0" value={formData.bedrooms} onChange={handleInputChange} placeholder="e.g. 3" className={inputClass} style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Bathrooms</label>
                                <input required name="bathrooms" type="number" min="0" value={formData.bathrooms} onChange={handleInputChange} placeholder="e.g. 2" className={inputClass} style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                            </div>
                        </div>

                        {error && <p className="text-sm mt-2 p-3 rounded-xl border" style={{ background: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.2)', color: '#fca5a5' }}>{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full font-bold py-3.5 rounded-xl transition-all duration-200 mt-6 flex justify-center items-center gap-2 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ background: 'var(--accent)', color: '#0f1720' }}
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Predict Property Value'}
                        </button>
                    </form>
                </div>

                <div>
                    {prediction ? (
                        <div
                            className="rounded-2xl p-8 shadow-xl border relative overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, rgba(182,255,59,0.1) 0%, rgba(15,23,32,1) 100%)',
                                borderColor: 'rgba(182,255,59,0.2)'
                            }}
                        >
                            <div className="absolute top-0 right-0 p-32 bg-lime-500/5 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>

                            <div className="relative z-10">
                                <h2 className="font-bold uppercase tracking-widest text-xs mb-3" style={{ color: 'var(--accent)' }}>Estimated Market Value</h2>
                                <div className="text-5xl font-extrabold mb-2 tracking-tight" style={{ color: '#ffffff' }}>
                                    {formatPrice(prediction.predictedPrice)}
                                </div>
                                <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
                                    ≈ ₹{Math.round(prediction.predictedPrice / (Number(formData.areaSqft) || 1)).toLocaleString('en-IN')} per sqft
                                </p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center border-b pb-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                                        <span className="text-sm" style={{ color: 'var(--muted)' }}>Confidence Score</span>
                                        <span className="font-bold text-sm px-3 py-1 rounded-lg" style={{ background: 'rgba(182,255,59,0.15)', color: 'var(--accent)' }}>
                                            {(prediction.confidenceScore * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center border-b pb-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                                        <span className="text-sm" style={{ color: 'var(--muted)' }}>Location Multiplier</span>
                                        <span className="font-bold text-sm" style={{ color: '#ffffff' }}>{prediction.details.locationMultiplier}x</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b pb-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                                        <span className="text-sm" style={{ color: 'var(--muted)' }}>Size Efficiency</span>
                                        <span className="font-bold text-sm px-2 py-0.5 rounded-md" style={{ background: 'rgba(255,255,255,0.05)', color: '#ffffff' }}>{prediction.details.sizeEfficiency.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b pb-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                                        <span className="text-sm" style={{ color: 'var(--muted)' }}>Bedroom Factor</span>
                                        <span className="font-bold text-sm" style={{ color: '#ffffff' }}>{prediction.details.bedroomFactor.toFixed(2)}x</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm" style={{ color: 'var(--muted)' }}>Bathroom Factor</span>
                                        <span className="font-bold text-sm" style={{ color: '#ffffff' }}>{prediction.details.bathroomFactor.toFixed(2)}x</span>
                                    </div>
                                </div>

                                <div className="rounded-xl p-4 flex gap-3 items-start border" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}>
                                    <Info className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
                                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                        This prediction is generated based on current market trends and historical data for similar properties in this area. It serves as an estimate and is not a guaranteed appraisal.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="border border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[400px]"
                            style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}
                        >
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-4"
                                style={{ background: 'rgba(255,255,255,0.05)' }}
                            >
                                <TrendingUp className="w-8 h-8" style={{ color: 'rgba(255,255,255,0.2)' }} />
                            </div>
                            <p className="text-sm max-w-xs" style={{ color: 'var(--muted)' }}>
                                Fill out the property details and generate a smart price prediction in ₹.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
