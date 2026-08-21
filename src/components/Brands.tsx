"use client";
import Link from "next/link";
const BRANDS = ['ASUS', 'Apple', 'HP', 'Dell', 'Lenovo', 'Samsung', 'Xiaomi', 'NVIDIA', 'AMD', 'Acer'];

export default function Brands() {
  return (
    <>
     {BRANDS.map((brand) => (
              <Link
                key={brand}
                href={`/products?brand=${brand}`}
                style={{
                  padding: '10px 22px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-card)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent-cyan)';
                  e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-card)';
                }}
              >
                {brand}
              </Link>
            ))}
    </>
  );
};