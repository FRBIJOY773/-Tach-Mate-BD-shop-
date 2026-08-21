'use client';

import Link from 'next/link';
import { Star, ShoppingCart, Heart, Zap } from 'lucide-react';
import { Product } from '@/types';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const discount = product.discountPercent ?? 0;
  const hasDiscount = discount > 0 && product.originalPrice;

  return (
    <Link
      href={`/products/${product.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <article
        className="glass-card"
        style={{
          overflow: 'hidden',
          transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {/* Image */}
        <div
          style={{
            position: 'relative',
            background: 'var(--bg-elevated)',
            aspectRatio: '4/3',
            overflow: 'hidden',
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />

          {/* Badges */}
          <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {product.isHotDeal && (
              <span
                style={{
                  background: 'var(--accent-red)',
                  color: '#fff',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <Zap size={9} />
                HOT DEAL
              </span>
            )}
            {product.isFeatured && !product.isHotDeal && (
              <span
                style={{
                  background: 'var(--accent-cyan)',
                  color: '#0a0a0f',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '4px',
                }}
              >
                FEATURED
              </span>
            )}
            {hasDiscount && (
              <span className="discount-badge">-{discount}%</span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: 'rgba(10,10,15,0.8)',
              border: '1px solid var(--border-card)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              backdropFilter: 'blur(4px)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ff3355')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <Heart size={14} />
          </button>

          {/* Out of stock */}
          {!product.inStock && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(10,10,15,0.75)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  color: 'var(--accent-red)',
                  fontWeight: 700,
                  fontSize: '14px',
                  letterSpacing: '0.05em',
                }}
              >
                OUT OF STOCK
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Brand + Category */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                color: 'var(--accent-cyan)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {product.brand}
            </span>
            <span
              style={{
                fontSize: '10px',
                color: 'var(--text-muted)',
                background: 'var(--bg-elevated)',
                padding: '2px 7px',
                borderRadius: '4px',
              }}
            >
              {product.category}
            </span>
          </div>

          {/* Name */}
          <h3
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flex: 1,
            }}
          >
            {product.name}
          </h3>

          {/* Short desc */}
          {product.shortDescription && (
            <p
              style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.shortDescription}
            </p>
          )}

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ display: 'flex', gap: '1px' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  style={{
                    color: i < Math.round(product.rating) ? '#ffd700' : 'var(--border-card)',
                    fill: i < Math.round(product.rating) ? '#ffd700' : 'none',
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {product.rating.toFixed(1)} ({product.reviewsCount})
            </span>
          </div>

          {/* Price row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
            <div>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 900,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.03em',
                }}
              >
                ৳{product.price.toLocaleString()}
              </div>
              {hasDiscount && (
                <div
                  style={{
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    textDecoration: 'line-through',
                  }}
                >
                  ৳{product.originalPrice?.toLocaleString()}
                </div>
              )}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              style={{
                background: 'linear-gradient(135deg, var(--accent-cyan), #0099cc)',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#0a0a0f',
              }}
            >
              <ShoppingCart size={13} />
              Add
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}
