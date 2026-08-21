"use client"
import Link from 'next/link';
import { Zap, Phone, Mail, MapPin, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border-subtle)',
        marginTop: '80px',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 24px 32px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '48px',
            marginBottom: '48px',
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald))',
                  borderRadius: '8px',
                  padding: '6px 10px',
                }}
              >
                <Zap size={16} style={{ color: '#0a0a0f' }} />
              </div>
              <span style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '-0.02em' }}>
                Tech<span className="gradient-text">Mate</span> BD
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.7, marginBottom: '20px' }}>
              Your trusted tech partner in Bangladesh. Authorized dealer of the world's leading technology brands.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '8px',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-card)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'var(--accent-cyan)',
                marginBottom: '16px',
                textTransform: 'uppercase',
              }}
            >
              Categories
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Laptops', 'Gaming Laptops', 'Tablets', 'Graphics Cards', 'Monitors', 'Peripherals'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/products?search=${item}`}
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '13px',
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'var(--accent-cyan)',
                marginBottom: '16px',
                textTransform: 'uppercase',
              }}
            >
              Support
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Track Your Order', 'Return Policy', 'Warranty Claims', 'EMI Available', 'FAQ'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13px' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'var(--accent-cyan)',
                marginBottom: '16px',
                textTransform: 'uppercase',
              }}
            >
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: Phone, text: '01800-000000', sub: 'Sat–Thu 9AM–9PM' },
                { icon: Mail, text: 'info@techmate.com.bd' },
                { icon: MapPin, text: 'Agrabad, Chittagong', sub: 'Also in Dhaka, Sylhet' },
              ].map(({ icon: Icon, text, sub }, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      background: 'var(--accent-cyan-dim)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={14} style={{ color: 'var(--accent-cyan)' }} />
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600 }}>{text}</div>
                    {sub && <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{sub}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
            © 2025 TechMate BD. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((item) => (
              <a
                key={item}
                href="#"
                style={{ color: 'var(--text-muted)', fontSize: '12px', textDecoration: 'none' }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
