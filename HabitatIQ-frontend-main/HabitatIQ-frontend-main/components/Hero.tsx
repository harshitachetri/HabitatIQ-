import Link from 'next/link';
import { Search, ArrowRight, MapPin, TrendingUp, Star } from 'lucide-react';

export default function Hero() {
    return (
        <div className="relative min-h-screen flex flex-col justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"
                    alt="Luxury property"
                    className="w-full h-full object-cover"
                />
                {/* Layered gradient overlays */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(105deg, #0f1720 40%, rgba(15,23,32,0.85) 65%, rgba(15,23,32,0.3) 100%)',
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, #0f1720 0%, transparent 40%)' }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-40 pb-24 w-full">
                <div className="max-w-2xl xl:max-w-3xl">
                    {/* Eyebrow */}
                    <div
                        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-8"
                        style={{
                            background: 'rgba(182,255,59,0.12)',
                            color: 'var(--accent)',
                            border: '1px solid rgba(182,255,59,0.25)',
                        }}
                    >
                        <Star className="w-3 h-3 fill-current" />
                        Premium Real Estate Intelligence
                    </div>

                    {/* Main Heading */}
                    <h1
                        className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6"
                        style={{ color: '#ffffff' }}
                    >
                        Smart Real Estate
                        <br />
                        <span style={{ color: 'var(--accent)' }}>Decisions</span> with
                        <br />
                        HabitatIQ
                    </h1>

                    {/* Subheading */}
                    <p
                        className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
                        style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                        Discover, compare, and analyze properties with AI price predictions and
                        robust investment ROI calculators. Find your perfect habitat today.
                    </p>

                    {/* Search Bar */}
                    <div
                        className="flex flex-col md:flex-row items-center gap-3 p-2 rounded-2xl mb-12 max-w-2xl"
                        style={{
                            background: 'rgba(255,255,255,0.07)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            backdropFilter: 'blur(16px)',
                        }}
                    >
                        <div className="flex-1 flex items-center w-full px-4 gap-3">
                            <Search className="w-5 h-5 shrink-0" style={{ color: 'var(--accent)' }} />
                            <input
                                type="text"
                                placeholder="Search by city, neighborhood, or property ID..."
                                className="w-full bg-transparent border-none outline-none text-base py-3 focus:ring-0"
                                style={{
                                    color: '#ffffff',
                                    caretColor: 'var(--accent)',
                                }}
                            />
                        </div>
                        <Link
                            href="/dashboard/properties"
                            className="w-full md:w-auto flex items-center justify-center gap-2 font-bold py-3.5 px-8 rounded-xl transition-all duration-200 group whitespace-nowrap hover:scale-[1.02]"
                            style={{
                                background: 'var(--accent)',
                                color: '#0f1720',
                                boxShadow: '0 0 24px rgba(182,255,59,0.35)',
                            }}
                        >
                            Explore Properties
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Stats Row */}
                    <div className="flex flex-wrap gap-8 md:gap-12">
                        {[
                            { value: '10k+', label: 'Properties Listed' },
                            { value: '98%', label: 'Prediction Accuracy' },
                            { value: '5k+', label: 'Happy Investors' },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col">
                                <span
                                    className="text-3xl font-extrabold tracking-tight"
                                    style={{ color: 'var(--accent)' }}
                                >
                                    {stat.value}
                                </span>
                                <span
                                    className="text-sm mt-0.5"
                                    style={{ color: 'rgba(255,255,255,0.5)' }}
                                >
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating badge */}
            <div
                className="absolute bottom-10 right-8 md:right-16 z-10 hidden lg:flex flex-col items-center gap-2 rounded-2xl p-5 animate-float"
                style={{
                    background: 'rgba(20,32,46,0.85)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(16px)',
                }}
            >
                <MapPin className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                <span className="text-white font-bold text-sm">Mumbai</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>Top Destination</span>
                <TrendingUp className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            </div>
        </div>
    );
}
