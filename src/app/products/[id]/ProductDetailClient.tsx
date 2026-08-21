'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, Share2, ChevronLeft, Check, Package, Truck, Shield, ThumbsUp } from 'lucide-react';
import { Product, QnAItem, ReviewItem } from '@/types';
import ProductCard from '@/components/ProductCard';

interface Props {
  product: Product;
  related: Product[];
}

type Tab = 'specifications' | 'details' | 'qna' | 'reviews';

const SPEC_LABELS: Record<string, string> = {
  brand: 'Brand',
  category: 'Category',
  processor: 'Processor Model',
  ram: 'RAM',
  storage: 'Storage',
  gpu: 'GPU',
  display: 'Display Size / Resolution',
  weight: 'Weight',
  warranty: 'Warranty',
  color: 'Color',
  battery: 'Battery',
  camera: 'Camera',
  os: 'Base OS',
  connectivity: 'Connectivity',
  dimensions: 'Dimensions',
};

export default function ProductDetailClient({ product, related }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('specifications');
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [copied, setCopied] = useState(false);

  const allImages = product.images?.length ? product.images : [product.image];
  const qna = (product.qna as QnAItem[] | null) || [];
  const reviews = (product.reviews as ReviewItem[] | null) || [];
  const hasDiscount = product.discountPercent && product.discountPercent > 0 && product.originalPrice;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const specs = Object.entries(SPEC_LABELS)
    .map(([key, label]) => {
      const val = key === 'brand'
        ? product.brand
        : key === 'category'
        ? product.category
        : (product as Record<string, unknown>)[key] as string | null | undefined;
      return val ? { label, value: val } : null;
    })
    .filter(Boolean) as { label: string; value: string }[];

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'specifications', label: 'Specifications' },
    { id: 'details', label: 'Details' },
    { id: 'qna', label: 'Q&A', count: qna.length },
    { id: 'reviews', label: 'Reviews', count: reviews.length },
  ];

  return (
    <main style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 24px 64px' }}>
      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '28px', fontSize: '12px' }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <Link href="/products" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Products</Link>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <Link
          href={`/products?category=${product.category}`}
          style={{ color: 'var(--text-muted)', textDecoration: 'none', textTransform: 'capitalize' }}
        >
          {product.category}
        </Link>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{product.name.substring(0, 40)}…</span>
      </nav>

      <Link
        href="/products"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          fontSize: '13px',
          marginBottom: '24px',
          fontWeight: 600,
        }}
      >
        <ChevronLeft size={15} />
        Back to Products
      </Link>

      {/* Main product layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '48px', alignItems: 'start' }}>

        {/* Left: Images */}
        <div style={{ position: 'sticky', top: '100px' }}>
          {/* Main image */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: '16px',
              overflow: 'hidden',
              aspectRatio: '4/3',
              marginBottom: '12px',
            }}
          >
            <img
              src={allImages[selectedImage]}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div style={{ display: 'flex', gap: '8px' }}>
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: `2px solid ${i === selectedImage ? 'var(--accent-cyan)' : 'var(--border-card)'}`,
                    cursor: 'pointer',
                    padding: 0,
                    background: 'var(--bg-card)',
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product info */}
        <div>
          {/* Badges */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            {product.isFeatured && (
              <span style={{ background: 'var(--accent-cyan)', color: '#0a0a0f', fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '4px' }}>
                FEATURED
              </span>
            )}
            {product.isHotDeal && (
              <span style={{ background: 'var(--accent-red)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '4px' }}>
                🔥 HOT DEAL
              </span>
            )}
            {hasDiscount && (
              <span className="discount-badge">{product.discountPercent}% OFF</span>
            )}
          </div>

          {/* Brand */}
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-cyan)', letterSpacing: '0.08em', marginBottom: '8px', textTransform: 'uppercase' }}>
            {product.brand}
          </div>

          {/* Name */}
          <h1 style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.3, marginBottom: '16px' }}>
            {product.name}
          </h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  style={{
                    color: i < Math.round(product.rating) ? '#ffd700' : 'var(--border-card)',
                    fill: i < Math.round(product.rating) ? '#ffd700' : 'none',
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {product.rating.toFixed(1)}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              ({product.reviewsCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div
            style={{
              padding: '20px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: '12px',
              marginBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', marginBottom: '8px' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
                ৳{product.price.toLocaleString()}
              </div>
              {hasDiscount && (
                <div>
                  <span style={{ fontSize: '15px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    ৳{product.originalPrice?.toLocaleString()}
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--accent-red)', fontWeight: 700, marginLeft: '8px' }}>
                    Save ৳{((product.originalPrice ?? 0) - product.price).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: product.inStock ? 'var(--accent-emerald)' : 'var(--accent-red)',
                }}
              />
              <span style={{ fontSize: '13px', fontWeight: 600, color: product.inStock ? 'var(--accent-emerald)' : 'var(--accent-red)' }}>
                {product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Qty + Actions */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid var(--border-card)',
                borderRadius: '10px',
                overflow: 'hidden',
                background: 'var(--bg-card)',
              }}
            >
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                style={{ padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontSize: '16px', fontWeight: 700 }}
              >
                −
              </button>
              <span style={{ padding: '0 16px', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                style={{ padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontSize: '16px', fontWeight: 700 }}
              >
                +
              </button>
            </div>

            <button
              disabled={!product.inStock}
              style={{
                flex: 1,
                background: product.inStock
                  ? 'linear-gradient(135deg, var(--accent-cyan), #0099cc)'
                  : 'var(--bg-elevated)',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 24px',
                cursor: product.inStock ? 'pointer' : 'not-allowed',
                color: product.inStock ? '#0a0a0f' : 'var(--text-muted)',
                fontWeight: 800,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <ShoppingCart size={16} />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            <button
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: '10px',
                padding: '12px',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
              }}
            >
              <Heart size={18} />
            </button>

            <button
              onClick={handleShare}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: '10px',
                padding: '12px',
                cursor: 'pointer',
                color: copied ? 'var(--accent-emerald)' : 'var(--text-secondary)',
              }}
              title="Copy link"
            >
              {copied ? <Check size={18} /> : <Share2 size={18} />}
            </button>
          </div>

          {/* Trust row */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {[
              { icon: Package, text: 'Genuine product', color: 'var(--accent-cyan)' },
              { icon: Truck, text: 'Fast delivery', color: 'var(--accent-emerald)' },
              { icon: Shield, text: '1-year warranty', color: 'var(--accent-yellow)' },
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <Icon size={14} style={{ color }} />
                {text}
              </div>
            ))}
          </div>

          {/* Short specs quick view */}
          {product.shortDescription && (
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, padding: '16px', background: 'var(--bg-elevated)', borderRadius: '10px', borderLeft: '3px solid var(--accent-cyan)' }}>
              {product.shortDescription}
            </p>
          )}
        </div>
      </div>

      {/* ── TABS ─────────────────────────────────────────────── */}
      <div style={{ marginTop: '60px' }}>
        {/* Tab bar */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: '32px',
            overflowX: 'auto',
          }}
        >
          {tabs.map(({ id, label, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                padding: '12px 24px',
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${activeTab === id ? 'var(--accent-cyan)' : 'transparent'}`,
                color: activeTab === id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontWeight: activeTab === id ? 700 : 500,
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {label}
              {count !== undefined && count > 0 && (
                <span
                  style={{
                    background: activeTab === id ? 'var(--accent-cyan)' : 'var(--bg-elevated)',
                    color: activeTab === id ? '#0a0a0f' : 'var(--text-muted)',
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '1px 7px',
                    borderRadius: '100px',
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* SPECIFICATIONS TAB */}
        {activeTab === 'specifications' && (
          <div>
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              {specs.map(({ label, value }, i) => (
                <div
                  key={label}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '220px 1fr',
                    borderBottom: i < specs.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  }}
                >
                  <div
                    style={{
                      padding: '14px 20px',
                      background: 'var(--bg-elevated)',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DETAILS TAB */}
        {activeTab === 'details' && (
          <div>
            {product.details ? (
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-card)',
                  borderRadius: '12px',
                  padding: '32px',
                }}
              >
                {product.details.split('\n\n').map((paragraph, i) => {
                  const isHeading = paragraph.length < 100 && !paragraph.includes('\n');
                  return isHeading ? (
                    <h3
                      key={i}
                      style={{
                        fontSize: '17px',
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        marginTop: i > 0 ? '28px' : 0,
                        marginBottom: '12px',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {paragraph}
                    </h3>
                  ) : (
                    <p
                      key={i}
                      style={{
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.8,
                        marginBottom: '12px',
                      }}
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
                <Package size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
                <p>No additional details available.</p>
              </div>
            )}
          </div>
        )}

        {/* Q&A TAB */}
        {activeTab === 'qna' && (
          <div>
            {qna.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {qna.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-card)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        padding: '16px 20px',
                        background: 'var(--bg-elevated)',
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'flex-start',
                      }}
                    >
                      <span
                        style={{
                          background: 'var(--accent-cyan)',
                          color: '#0a0a0f',
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          flexShrink: 0,
                        }}
                      >
                        Q
                      </span>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                        {item.question}
                      </p>
                    </div>
                    <div style={{ padding: '16px 20px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span
                        style={{
                          background: 'var(--accent-emerald)',
                          color: '#0a0a0f',
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          flexShrink: 0,
                        }}
                      >
                        A
                      </span>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
                <p>No Q&A available yet.</p>
              </div>
            )}
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div>
            {/* Rating summary */}
            {reviews.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  gap: '32px',
                  alignItems: 'center',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-card)',
                  borderRadius: '12px',
                  padding: '24px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontSize: '52px', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1 }}>
                    {product.rating.toFixed(1)}
                  </div>
                  <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', margin: '8px 0' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        style={{
                          color: i < Math.round(product.rating) ? '#ffd700' : 'var(--border-card)',
                          fill: i < Math.round(product.rating) ? '#ffd700' : 'none',
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {product.reviewsCount} reviews
                  </div>
                </div>
              </div>
            )}

            {reviews.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {reviews.map((review, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-card)',
                      borderRadius: '12px',
                      padding: '20px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>{review.user}</div>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              style={{
                                color: i < review.rating ? '#ffd700' : 'var(--border-card)',
                                fill: i < review.rating ? '#ffd700' : 'none',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{review.date}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{review.comment}</p>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-muted)',
                        fontSize: '11px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginTop: '10px',
                        padding: 0,
                      }}
                    >
                      <ThumbsUp size={12} /> Helpful
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
                <p>No reviews yet. Be the first!</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div style={{ marginTop: '64px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '24px' }}>
            You May Also Like
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '16px',
            }}
          >
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
