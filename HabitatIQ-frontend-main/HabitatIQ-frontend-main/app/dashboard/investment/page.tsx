"use client";

import { useState } from 'react';
import { fetchApi } from '@/lib/api';
import { InvestmentAnalysis } from '@/types/property';
import { LineChart, Loader2, Info } from 'lucide-react';

const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
};

export default function InvestmentAnalysisPage() {
    const [formData, setFormData] = useState({
        purchasePrice: 5000000,
        estimatedRent: 25000,
        appreciationRate: 3.5
    });

    const [analysis, setAnalysis] = useState<InvestmentAnalysis | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: Number(value) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Backend returns: { annualROI, fiveYearROI, investmentScore, purchasePrice, estimatedRent, appreciationRate }
            const data = await fetchApi<InvestmentAnalysis>('/investment/analyze', {
                method: 'POST',
                requiresAuth: true,
                body: JSON.stringify(formData)
            });
            setAnalysis(data);
        } catch (err: any) {
            setError(err.message || 'Failed to analyze investment');
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full pl-8 pr-4 py-3 rounded-xl focus:outline-none transition-all text-sm";
    const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'rgba(16, 185, 129, 1)'; // emerald
        if (score >= 60) return 'rgba(245, 158, 11, 1)'; // amber
        return 'rgba(239, 68, 68, 1)'; // red
    };

    const getScoreBg = (score: number) => {
        if (score >= 80) return 'rgba(16, 185, 129, 0.1)';
        if (score >= 60) return 'rgba(245, 158, 11, 0.1)';
        return 'rgba(239, 68, 68, 0.1)';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return 'Excellent Investment';
        if (score >= 60) return 'Moderate Investment';
        return 'Poor Investment';
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
                <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm"
                    style={{ background: 'rgba(182,255,59,0.08)' }}
                >
                    <LineChart className="w-8 h-8" style={{ color: 'var(--accent)' }} />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: '#ffffff' }}>Investment Analysis</h1>
                <p className="mt-2 text-sm max-w-lg mx-auto" style={{ color: 'var(--muted)' }}>
                    Calculate ROI and assess the long-term wealth potential of a property.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div
                    className="rounded-2xl p-8 shadow-sm"
                    style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                >
                    <h3 className="text-lg font-bold mb-6" style={{ color: '#ffffff' }}>Investment Parameters</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Purchase Price (₹)</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>₹</span>
                                <input
                                    name="purchasePrice"
                                    type="number"
                                    min="100000"
                                    step="100000"
                                    required
                                    value={formData.purchasePrice}
                                    onChange={handleInputChange}
                                    className={inputClass}
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                />
                            </div>
                            <p className="text-xs mt-1.5" style={{ color: 'rgba(182,255,59,0.8)' }}>{formatPrice(formData.purchasePrice)}</p>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Estimated Monthly Rent (₹)</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>₹</span>
                                <input
                                    name="estimatedRent"
                                    type="number"
                                    min="0"
                                    step="1000"
                                    required
                                    value={formData.estimatedRent}
                                    onChange={handleInputChange}
                                    className={inputClass}
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                />
                            </div>
                            <p className="text-xs mt-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>₹{formData.estimatedRent.toLocaleString('en-IN')} / month</p>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Annual Appreciation Rate (%)</label>
                            <div className="relative">
                                <input
                                    name="appreciationRate"
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    required
                                    value={formData.appreciationRate}
                                    onChange={handleInputChange}
                                    className="w-full pl-4 pr-10 py-3 rounded-xl focus:outline-none transition-all text-sm"
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                />
                                <span className="absolute inset-y-0 right-0 pr-4 flex items-center font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>%</span>
                            </div>
                        </div>

                        {error && <p className="text-sm mt-2 p-3 rounded-xl border" style={{ background: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.2)', color: '#fca5a5' }}>{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full font-bold py-3.5 rounded-xl transition-all duration-200 mt-2 flex justify-center items-center gap-2 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ background: 'var(--accent)', color: '#0f1720' }}
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Calculate ROI'}
                        </button>
                    </form>
                </div>

                <div>
                    {analysis ? (
                        <div
                            className="rounded-2xl border flex flex-col h-full overflow-hidden"
                            style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
                        >

                            <div className="p-8 text-center border-b" style={{ background: getScoreBg(analysis.investmentScore), borderColor: 'var(--card-border)' }}>
                                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Investment Score</p>
                                <div className="text-6xl font-extrabold tracking-tighter" style={{ color: getScoreColor(analysis.investmentScore) }}>
                                    {analysis.investmentScore}
                                    <span className="text-2xl font-medium ml-1" style={{ color: 'rgba(255,255,255,0.3)' }}>/100</span>
                                </div>
                                <p className="mt-3 text-sm font-semibold" style={{ color: getScoreColor(analysis.investmentScore) }}>{getScoreLabel(analysis.investmentScore)}</p>
                            </div>

                            <div className="p-8 flex-1 flex flex-col justify-center">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Annual ROI</h4>
                                        <div className="flex items-end gap-3">
                                            <span className="text-3xl font-extrabold" style={{ color: '#ffffff' }}>{analysis.annualROI.toFixed(2)}%</span>
                                            <span className="text-sm font-medium pb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>per year</span>
                                        </div>
                                        <div className="w-full rounded-full h-2 mt-3 overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                                            <div className="h-full rounded-full" style={{ background: 'var(--accent)', width: `${Math.min(analysis.annualROI * 5, 100)}%` }}></div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                                        <h4 className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Projected 5-Year Return</h4>
                                        <div className="flex items-end gap-3">
                                            <span className="text-3xl font-extrabold" style={{ color: '#ffffff' }}>{analysis.fiveYearROI.toFixed(1)}%</span>
                                            <span className="text-sm font-medium pb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>total growth</span>
                                        </div>
                                        <p className="text-sm mt-3 font-medium" style={{ color: 'var(--muted)' }}>
                                            Estimated value in 5 years: <span className="font-bold" style={{ color: 'var(--accent)' }}>
                                                {formatPrice(formData.purchasePrice * Math.pow(1 + (formData.appreciationRate / 100), 5))}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                                        <h4 className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Rental Yield</h4>
                                        <div className="flex items-end gap-3">
                                            <span className="text-3xl font-extrabold" style={{ color: '#ffffff' }}>
                                                {((formData.estimatedRent * 12 / formData.purchasePrice) * 100).toFixed(2)}%
                                            </span>
                                            <span className="text-sm font-medium pb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>gross yield</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 flex gap-3 text-sm border-t items-start" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'var(--card-border)', color: 'rgba(255,255,255,0.5)' }}>
                                <Info className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
                                <p className="text-xs leading-relaxed">A score above 80 indicates an excellent opportunity. Real estate investments carry risk; perform thorough due diligence.</p>
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
                                <LineChart className="w-8 h-8" style={{ color: 'rgba(255,255,255,0.2)' }} />
                            </div>
                            <p className="text-sm max-w-xs" style={{ color: 'var(--muted)' }}>
                                Enter your investment parameters to see the projected ROI and analysis score.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
