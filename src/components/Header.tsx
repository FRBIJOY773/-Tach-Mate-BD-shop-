'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, Phone, Zap, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Laptops', href: '/products?category=laptop' },
  { label: 'Gaming', href: '/products?category=gaming-laptop' },
  { label: 'Tablets', href: '/products?category=tablet' },
  { label: 'Graphics Cards', href: '/products?category=graphics-card' },
  { label: 'Monitors', href: '/products?category=monitor' },
  { label: 'Accessories', href: '/products?category=peripheral' },
  { label: '🔥 Hot Deals', href: '/products?isHotDeal=true' },
];

export default function Header() {
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      setMobileOpen(false);
    }
  };

  return (
    <header
      style={{
        background: 'rgba(10,10,15,0.95)',
        borderBottom: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Top utility bar */}
      <div
        style={{
          background: 'linear-gradient(90deg, #0a0a0f 0%, #0d0d1a 50%, #0a0a0f 100%)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '6px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          color: 'var(--text-secondary)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Phone size={11} />
            <a href="tel:01800000000" style={{ color: 'var(--accent-emerald)', fontWeight: 700, textDecoration: 'none' }}>
              01800-000000
            </a>
          </span>
          <span className="hidden sm:inline">info@techmate.com.bd</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>
            <span style={{ color: 'var(--accent-cyan)' }}>Free delivery</span> on orders ৳2000+
          </span>
          <Link
            href="/admin"
            style={{
              color: 'var(--accent-yellow)',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '10px',
              letterSpacing: '0.05em',
            }}
          >
            ADMIN PANEL →
          </Link>
        </div>
      </div>

      {/* Main nav */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald))',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Zap size={16} style={{ color: '#0a0a0f' }} />
              </div>
              <div>
                <div style={{ fontSize: '17px', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                  Tech<span className="gradient-text">Mate</span>
                </div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.1em', fontWeight: 600 }}>
                  BANGLADESH
                </div>
              </div>
            </div>
          </Link>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            style={{
              flex: 1,
              display: 'flex',
              maxWidth: 560,
              gap: 0,
            }}
            className="hidden sm:flex"
          >
            <input
              type="text"
              placeholder="Search laptops, tablets, GPUs, accessories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'var(--bg-input)',
                border: '1px solid var(--border-card)',
                borderRight: 'none',
                borderRadius: '8px 0 0 8px',
                padding: '10px 16px',
                color: 'var(--text-primary)',
                fontSize: '13px',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, var(--accent-cyan), #0099cc)',
                border: 'none',
                borderRadius: '0 8px 8px 0',
                padding: '0 18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: '#0a0a0f',
              }}
            >
              <Search size={16} style={{ strokeWidth: 2.5 }} />
            </button>
          </form>

          {/* Right actions */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link
              href="/products"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-card)',
                borderRadius: '8px',
                padding: '8px 14px',
                color: 'var(--text-primary)',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
              className="hidden sm:flex"
            >
              <ShoppingBag size={15} />
              All Products
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-card)',
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
              }}
              className="sm:hidden"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Category nav */}
        <nav
          style={{
            display: 'flex',
            gap: '2px',
            marginTop: '10px',
            overflowX: 'auto',
            paddingBottom: '2px',
          }}
          className="hidden sm:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent-cyan)';
                e.currentTarget.style.background = 'var(--accent-cyan-dim)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          style={{
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--border-subtle)',
            padding: '16px',
          }}
        >
          <form onSubmit={handleSearch} style={{ display: 'flex', marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'var(--bg-input)',
                border: '1px solid var(--border-card)',
                borderRight: 'none',
                borderRadius: '8px 0 0 8px',
                padding: '10px 14px',
                color: 'var(--text-primary)',
                fontSize: '13px',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                background: 'var(--accent-cyan)',
                border: 'none',
                borderRadius: '0 8px 8px 0',
                padding: '0 14px',
                cursor: 'pointer',
                color: '#0a0a0f',
              }}
            >
              <Search size={15} />
            </button>
          </form>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  background: 'var(--bg-elevated)',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
