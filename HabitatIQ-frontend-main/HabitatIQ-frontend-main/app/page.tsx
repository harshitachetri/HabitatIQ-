"use client";

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PropertyCard from '@/components/PropertyCard';
import { TrendingUp, LineChart, ArrowRightLeft, Building2, Home, Users, Star, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Property } from '@/types/property';
import { fetchApi } from '@/lib/api';
import Link from 'next/link';

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await fetchApi<{ properties: Property[] }>('/properties');
        // Just take the first 3 for featured
        setFeaturedProperties(data.properties.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch properties', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <main style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <Navbar />
      <Hero />

      {/* ───── 1. FEATURE ICON ROW ───── */}
      <section
        style={{
          background: 'rgba(20,32,46,0.8)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Building2, value: '8,500+', label: 'Elegant Apartments' },
              { icon: Home,      value: '3,200+', label: 'Luxury Houses' },
              { icon: Star,      value: '12,000+', label: 'Satisfied Guests' },
              { icon: Users,     value: '5,400+', label: 'Happy Owners' },
            ].map(({ icon: Icon, value, label }, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(182,255,59,0.1)' }}
                >
                  <Icon className="w-7 h-7" style={{ color: 'var(--accent)' }} />
                </div>
                <span className="text-3xl font-extrabold" style={{ color: 'var(--accent)' }}>{value}</span>
                <span className="text-sm font-medium" style={{ color: 'var(--muted)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 2. FEATURED PROPERTIES ───── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-14">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
              Handpicked For You
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: '#ffffff' }}>
              Featured Properties
            </h2>
            <p className="mt-2 text-base" style={{ color: 'var(--muted)' }}>
              Explore some of our handpicked real estate opportunities.
            </p>
          </div>
          <Link
            href="/dashboard/properties"
            className="hidden md:flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.03]"
            style={{
              background: 'rgba(182,255,59,0.1)',
              color: 'var(--accent)',
              border: '1px solid rgba(182,255,59,0.2)',
            }}
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div
              className="animate-spin rounded-full h-12 w-12 border-b-2"
              style={{ borderColor: 'var(--accent)' }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map(property => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </section>

      <div className="section-divider mx-6 md:mx-12" />

      {/* ───── 3. TOOLS / BENEFITS ───── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>Why HabitatIQ</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: '#ffffff' }}>
            Powerful Tools for Smart Investors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: ArrowRightLeft,
              title: 'Property Comparison',
              desc: 'Compare multiple properties side-by-side. Analyze dimensions, prices, and features instantly to find the best match.',
              accent: 'rgba(182,255,59,0.1)',
            },
            {
              icon: TrendingUp,
              title: 'Price Prediction',
              desc: 'Leverage our AI-driven models to predict future property values based on location, amenities, and market trends.',
              accent: 'rgba(182,255,59,0.07)',
            },
            {
              icon: LineChart,
              title: 'Investment Analysis',
              desc: 'Calculate ROI, appreciation rates, and investment scores to make data-backed real estate decisions effortlessly.',
              accent: 'rgba(182,255,59,0.05)',
            },
          ].map(({ icon: Icon, title, desc, accent }, i) => (
            <div
              key={i}
              className="flex flex-col p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: accent }}
              >
                <Icon className="w-7 h-7" style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#ffffff' }}>{title}</h3>
              <p className="leading-relaxed text-sm" style={{ color: 'var(--muted)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider mx-6 md:mx-12" />

      {/* ───── 4. WELCOME / ABOUT ───── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image grid */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Luxury interior"
              className="rounded-2xl w-full h-64 object-cover"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            />
            <img
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Luxury pool"
              className="rounded-2xl w-full h-64 object-cover mt-8"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>
              About Us
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 leading-tight" style={{ color: '#ffffff' }}>
              Welcome to{' '}
              <span style={{ color: 'var(--accent)' }}>Modern Luxury</span>{' '}
              Real Estate
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              HabitatIQ is India&apos;s premier AI-powered real estate intelligence platform.
              We combine cutting-edge machine learning with extensive market data to help buyers,
              sellers, and investors make smarter property decisions.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
              From luxury apartments in Mumbai to heritage homes in Jaipur — we connect you to
              the finest properties across India, backed by transparent data and expert insights.
            </p>
            <Link
              href="/dashboard/properties"
              className="self-start flex items-center gap-2 font-bold py-3.5 px-8 rounded-xl transition-all duration-200 hover:scale-[1.03]"
              style={{
                background: 'var(--accent)',
                color: '#0f1720',
                boxShadow: '0 0 24px rgba(182,255,59,0.25)',
              }}
            >
              Explore Properties <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="section-divider mx-6 md:mx-12" />

      {/* ───── 5. DESTINATIONS / CITIES ───── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
            Top Markets
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: '#ffffff' }}>
            Discover Prime Destinations
          </h2>
          <p className="mt-3 text-base" style={{ color: 'var(--muted)' }}>
            Premium real estate in India&apos;s most sought-after cities
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { city: 'Mumbai', sub: '4,200+ listings', img: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
            { city: 'Delhi', sub: '3,100+ listings', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
            { city: 'Bangalore', sub: '2,800+ listings', img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
            { city: 'Hyderabad', sub: '1,900+ listings', img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
          ].map(({ city, sub, img }) => (
            <Link
              key={city}
              href="/dashboard/properties"
              className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer block"
            >
              <img
                src={img}
                alt={city}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div
                className="absolute inset-0 transition-all duration-300"
                style={{
                  background: 'linear-gradient(to top, rgba(15,23,32,0.9) 0%, rgba(15,23,32,0.3) 60%, transparent 100%)',
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-lg font-extrabold" style={{ color: '#ffffff' }}>{city}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--accent)' }}>{sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="section-divider mx-6 md:mx-12" />

      {/* ───── 6. BLOG / ARTICLES ───── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-14">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
              Insights
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: '#ffffff' }}>
              Latest Articles
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              img: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
              tag: 'Investment',
              title: 'Top 5 Cities for Real Estate Investment in 2025',
              author: 'Aditya Sharma',
              date: 'Mar 8, 2025',
            },
            {
              img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
              tag: 'Luxury',
              title: 'Inside India\'s Most Exclusive Luxury Developments',
              author: 'Priya Nair',
              date: 'Mar 5, 2025',
            },
            {
              img: 'https://images.unsplash.com/photo-1573496774426-fe3db3dd1731?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
              tag: 'Market Trends',
              title: 'AI-Powered Predictions: Where Property Prices Are Headed',
              author: 'Rahul Verma',
              date: 'Mar 1, 2025',
            },
            {
              img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
              tag: 'Guide',
              title: 'First-Time Buyer\'s Complete Guide to Home Loans in India',
              author: 'Kavya Reddy',
              date: 'Feb 26, 2025',
            },
          ].map(({ img, tag, title, author, date }, i) => (
            <div
              key={i}
              className="flex gap-5 rounded-2xl overflow-hidden p-4 transition-all duration-300 hover:-translate-y-1 group"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
              }}
            >
              <img
                src={img}
                alt={title}
                className="w-32 h-28 object-cover rounded-xl shrink-0 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
                <div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-lg"
                    style={{ background: 'rgba(182,255,59,0.12)', color: 'var(--accent)' }}
                  >
                    {tag}
                  </span>
                  <h3 className="text-sm font-bold mt-2.5 leading-snug line-clamp-2" style={{ color: '#ffffff' }}>
                    {title}
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>
                    {author} · {date}
                  </p>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: 'var(--accent)' }}
                  >
                    Read More →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider mx-6 md:mx-12" />

      {/* ───── 7. CTA SECTION ───── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div
          className="relative rounded-3xl overflow-hidden flex flex-col lg:flex-row items-center"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
        >
          {/* Left content */}
          <div className="flex-1 p-12 md:p-16 z-10">
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>
              Get Started
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6" style={{ color: '#ffffff' }}>
              Your Satisfaction Is
              <br />
              <span style={{ color: 'var(--accent)' }}>Our Commitment</span>
            </h2>
            <p className="text-base mb-10 max-w-md leading-relaxed" style={{ color: 'var(--muted)' }}>
              Join thousands of smart investors and homebuyers who trust HabitatIQ to make the right real estate decisions.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 font-bold py-4 px-10 rounded-xl text-base transition-all duration-200 hover:scale-[1.04]"
              style={{
                background: 'var(--accent)',
                color: '#0f1720',
                boxShadow: '0 0 32px rgba(182,255,59,0.35)',
              }}
            >
              Get In Touch <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Right image */}
          <div className="relative lg:w-[45%] h-72 lg:h-auto self-stretch hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
              alt="Luxury home"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, var(--card-bg) 0%, transparent 30%)' }}
            />
          </div>
        </div>
      </section>

      {/* ───── 8. FOOTER ───── */}
      <footer
        className="mt-8 border-t"
        style={{ background: '#0a1219', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--accent)' }}
                >
                  <Building2 className="w-5 h-5" style={{ color: '#0f1720' }} />
                </div>
                <span className="text-lg font-bold" style={{ color: '#ffffff' }}>
                  Habitat<span style={{ color: 'var(--accent)' }}>IQ</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                India&apos;s premier AI-powered real estate intelligence platform. Smart decisions. Premium properties.
              </p>
            </div>

            {/* Explore */}
            <div>
              <p className="text-sm font-bold mb-5 uppercase tracking-widest" style={{ color: '#ffffff' }}>Explore</p>
              <ul className="space-y-3">
                {['Properties', 'Price Predictions', 'Compare', 'Investment Tools', 'Dashboard'].map(item => (
                  <li key={item}>
                    <Link
                      href="/dashboard"
                      className="text-sm transition-colors duration-200 hover:text-white"
                      style={{ color: 'var(--muted)' }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Utilities */}
            <div>
              <p className="text-sm font-bold mb-5 uppercase tracking-widest" style={{ color: '#ffffff' }}>Utilities</p>
              <ul className="space-y-3">
                {['About Us', 'Blog', 'Privacy Policy', 'Terms of Service', 'Support'].map(item => (
                  <li key={item}>
                    <span
                      className="text-sm cursor-pointer transition-colors duration-200 hover:text-white"
                      style={{ color: 'var(--muted)' }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-sm font-bold mb-5 uppercase tracking-widest" style={{ color: '#ffffff' }}>Contact</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    1201, Prestige Tower, MG Road, Bangalore 560001
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 shrink-0" style={{ color: 'var(--accent)' }} />
                  <span className="text-sm" style={{ color: 'var(--muted)' }}>+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 shrink-0" style={{ color: 'var(--accent)' }} />
                  <span className="text-sm" style={{ color: 'var(--muted)' }}>hello@habitatiq.in</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted)' }}
          >
            <p>© {new Date().getFullYear()} HabitatIQ. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
