import Link from 'next/link';
import { Zap, Cpu, Monitor, Gamepad2, Tablet, HardDrive, ArrowRight, Shield, Truck, CreditCard, Headphones, ChevronRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Product } from '@/types';
import Categories from '@/components/Categories';
import Brands from '@/components/Brands';

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: { isFeatured: true },
      take: 4,
      orderBy: { rating: 'desc' },
    });
    return products as unknown as Product[];
  } catch {
    return [];
  }
}

async function getHotDeals(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: { isHotDeal: true },
      take: 4,
      orderBy: { discountPercent: 'desc' },
    });
    return products as unknown as Product[];
  } catch {
    return [];
  }
}



const TRUST_BADGES = [
  { icon: Truck, label: 'Free Delivery', desc: 'Orders above ৳2,000' },
  { icon: Shield, label: 'Genuine Products', desc: '100% authorized dealer' },
  { icon: CreditCard, label: 'Easy EMI', desc: '0% interest available' },
  { icon: Headphones, label: '24/7 Support', desc: 'Call 01800-000000' },
];


export default async function HomePage() {
  const [featured, hotDeals] = await Promise.all([getFeaturedProducts(), getHotDeals()]);

  return (
    <>
      <Header />
      <main>
        {/* ── HERO ──────────────────────────────────────────────── */}
        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: '580px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Animated grid background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(0, 212, 255, 0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 255, 0.04) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
            }}
          />

          {/* Glow orbs */}
          <div
            style={{
              position: 'absolute',
              top: '-100px',
              left: '-100px',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-80px',
              right: '-80px',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,230,122,0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px', position: 'relative', zIndex: 1, width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>

              {/* Left: Copy */}
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'var(--accent-cyan-dim)',
                    border: '1px solid rgba(0,212,255,0.2)',
                    borderRadius: '100px',
                    padding: '6px 14px',
                    marginBottom: '24px',
                  }}
                >
                  <Zap size={12} style={{ color: 'var(--accent-cyan)' }} />
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-cyan)', letterSpacing: '0.08em' }}>
                    BEST PRICES IN BANGLADESH
                  </span>
                </div>

                <h1
                  style={{
                    fontSize: 'clamp(36px, 5vw, 64px)',
                    fontWeight: 900,
                    lineHeight: 1.05,
                    letterSpacing: '-0.04em',
                    marginBottom: '20px',
                  }}
                >
                  Your Ultimate
                  <br />
                  <span className="gradient-text">Tech Partner</span>
                  <br />
                  in BD
                </h1>

                <p
                  style={{
                    fontSize: '16px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    marginBottom: '36px',
                    maxWidth: '440px',
                  }}
                >
                  From gaming rigs to pro ultrabooks — we carry the world's top brands with genuine warranty, EMI options, and delivery across all 64 districts.
                </p>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Link
                    href="/products"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'linear-gradient(135deg, var(--accent-cyan), #0099cc)',
                      color: '#0a0a0f',
                      fontWeight: 800,
                      fontSize: '14px',
                      padding: '14px 28px',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Shop All Products
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/products?isHotDeal=true"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'transparent',
                      color: 'var(--accent-red)',
                      fontWeight: 700,
                      fontSize: '14px',
                      padding: '14px 28px',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      border: '1px solid var(--accent-red)',
                    }}
                  >
                    🔥 Hot Deals
                  </Link>
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', gap: '32px', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border-subtle)' }}>
                  {[
                    { value: '5,000+', label: 'Products' },
                    { value: '64', label: 'Districts' },
                    { value: '50K+', label: 'Happy Customers' },
                  ].map(({ value, label }) => (
                    <div key={label}>
                      <div style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.04em' }} className="gradient-text">
                        {value}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Feature cards stack */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { title: 'MacBook Pro M3', desc: 'From ৳2,65,000', badge: 'NEW', color: '#00d4ff', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80' },
                  { title: 'RTX 4070 Gaming', desc: 'From ৳1,59,999', badge: '12% OFF', color: '#ff3355', img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80' },
                  { title: 'Xiaomi Pad 2', desc: '৳22,999', badge: '8% OFF', color: '#00e67a', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80' },
                  { title: 'RTX 4060 Ti', desc: '৳48,500', badge: 'HOT', color: '#ffd700', img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400&q=80' },
                ].map(({ title, desc, badge, color, img }) => (
                  <Link key={title} href="/products" style={{ textDecoration: 'none' }}>
                    <div
                      className="glass-card"
                      style={{ overflow: 'hidden', cursor: 'pointer' }}
                    >
                      <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                        <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 50%)' }} />
                        <span
                          style={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            background: color,
                            color: '#0a0a0f',
                            fontSize: '9px',
                            fontWeight: 800,
                            padding: '2px 7px',
                            borderRadius: '4px',
                          }}
                        >
                          {badge}
                        </span>
                        <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '10px 12px' }}>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{title}</div>
                          <div style={{ fontSize: '10px', color, fontWeight: 700 }}>{desc}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST BADGES ──────────────────────────────────────── */}
        <section
          style={{
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: '0 auto',
              padding: '24px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0',
            }}
          >
            {TRUST_BADGES.map(({ icon: Icon, label, desc }, i) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '16px 24px',
                  borderRight: i < TRUST_BADGES.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    background: 'var(--accent-cyan-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} style={{ color: 'var(--accent-cyan)' }} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{label}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CATEGORIES ────────────────────────────────────────── */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-cyan)', letterSpacing: '0.1em', marginBottom: '8px' }}>
                BROWSE BY CATEGORY
              </p>
              <h2 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.03em' }}>
                What are you looking for?
              </h2>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
              gap: '12px',
            }}
          >
            <Categories  />
          </div>
        </section>

        {/* ── FEATURED PRODUCTS ──────────────────────────────────── */}
        {featured.length > 0 && (
          <section style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-cyan)', letterSpacing: '0.1em', marginBottom: '6px' }}>
                  HANDPICKED FOR YOU
                </p>
                <h2 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.03em' }}>Featured Products</h2>
              </div>
              <Link
                href="/products?isFeatured=true"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'var(--accent-cyan)',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                }}
              >
                View All <ChevronRight size={15} />
              </Link>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '16px',
              }}
            >
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* ── PROMO BANNER ─────────────────────────────────────── */}
        <section style={{ maxWidth: 1280, margin: '64px auto 0', padding: '0 24px' }}>
          <div
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 50%, #0a1628 100%)',
              border: '1px solid rgba(0,212,255,0.15)',
              padding: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '32px',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '300px', height: '300px',
                background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-cyan)', letterSpacing: '0.12em', marginBottom: '12px' }}>
                ⚡ LIMITED TIME
              </div>
              <h2 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '10px' }}>
                Up to <span className="gradient-text">40% OFF</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '24px' }}>
                On selected gaming laptops, tablets, and accessories. Limited stock — grab yours now.
              </p>
              <Link
                href="/products?isHotDeal=true"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, var(--accent-cyan), #0099cc)',
                  color: '#0a0a0f',
                  fontWeight: 800,
                  fontSize: '14px',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                }}
              >
                Shop Hot Deals <ArrowRight size={15} />
              </Link>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <img
                src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80"
                alt="Gaming Laptop Deal"
                style={{ width: '280px', borderRadius: '12px', boxShadow: '0 20px 60px rgba(0,212,255,0.15)' }}
              />
            </div>
          </div>
        </section>

        {/* ── HOT DEALS ─────────────────────────────────────────── */}
        {hotDeals.length > 0 && (
          <section style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-red)', letterSpacing: '0.1em', marginBottom: '6px' }}>
                  🔥 BIGGEST DISCOUNTS
                </p>
                <h2 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.03em' }}>Hot Deals</h2>
              </div>
              <Link
                href="/products?isHotDeal=true"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'var(--accent-red)',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                }}
              >
                View All <ChevronRight size={15} />
              </Link>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '16px',
              }}
            >
              {hotDeals.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* ── BRANDS ─────────────────────────────────────────────── */}
        <section
          style={{
            maxWidth: 1280,
            margin: '64px auto 0',
            padding: '0 24px',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--text-muted)',
              letterSpacing: '0.12em',
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            AUTHORIZED DEALER FOR
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
            }}
          >
            <Brands  />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
