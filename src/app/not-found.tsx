import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '60px 24px',
        }}
      >
        <div style={{ fontSize: '80px', marginBottom: '16px' }}>🔌</div>
        <h1 style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '12px' }}>
          404
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Page not found
        </p>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '360px' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link
            href="/"
            style={{
              background: 'linear-gradient(135deg, var(--accent-cyan), #0099cc)',
              color: '#0a0a0f',
              fontWeight: 800,
              fontSize: '14px',
              padding: '12px 24px',
              borderRadius: '10px',
              textDecoration: 'none',
            }}
          >
            Go Home
          </Link>
          <Link
            href="/products"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '14px',
              padding: '12px 24px',
              borderRadius: '10px',
              textDecoration: 'none',
            }}
          >
            Browse Products
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
