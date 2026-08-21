"use client";
import { 
  Laptop, 
  Gamepad2, 
  Zap, 
  Briefcase, 
  Tablet, 
  Cpu, 
  Monitor, 
  Mouse, 
  HardDrive, 
  Smartphone 
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  { label: 'Laptop', icon: Laptop, href: '/products?category=laptop', color: '#00d4ff', desc: 'Everyday computing' },
  { label: 'Gaming Laptop', icon: Gamepad2, href: '/products?category=gaming-laptop', color: '#ff3355', desc: 'High-performance rigs' },
  { label: 'Ultrabook', icon: Zap, href: '/products?category=ultrabook', color: '#00e67a', desc: 'Thin & lightweight' },
  { label: 'Business Laptop', icon: Briefcase, href: '/products?category=business-laptop', color: '#ff8c00', desc: 'Professional machines' },
  { label: 'Tablet', icon: Tablet, href: '/products?category=tablet', color: '#20b2aa', desc: 'Portable powerhouses' },
  { label: 'Graphics Card', icon: Cpu, href: '/products?category=graphics-card', color: '#ffd700', desc: 'RTX & RX series' },
  { label: 'Monitor', icon: Monitor, href: '/products?category=monitor', color: '#ff00ff', desc: 'High-res displays' },
  { label: 'Peripheral', icon: Mouse, href: '/products?category=peripheral', color: '#ff1493', desc: 'Mice & keyboards' },
  { label: 'Component', icon: HardDrive, href: '/products?category=component', color: '#a855f7', desc: 'Internal PC parts' },
  { label: 'Mobile Phone', icon: Smartphone, href: '/products?category=mobile-phone', color: '#ff4500', desc: 'Smartphones & devices' },
];

export default function Categories() {
  return (
    <>
      {CATEGORIES.map(({ label, icon: Icon, href, color, desc }) => (
        <Link
          key={label}
          href={href}
          style={{ textDecoration: 'none' }}
        >
          <div
            className="glass-card"
            style={{
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '14px',
                background: `${color}18`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${color}30`,
              }}
            >
              <Icon size={22} style={{ color }} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>{label}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{desc}</div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
