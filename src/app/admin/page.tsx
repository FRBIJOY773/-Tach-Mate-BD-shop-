'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Plus, Search, Edit3, Trash2, Eye, LayoutGrid, List, RefreshCw, Zap,
  TrendingUp, Package, Star, AlertCircle, ChevronLeft, ChevronRight, X
} from 'lucide-react';
import { Product, CATEGORIES } from '@/types';
import AdminProductForm from './AdminProductForm';

type ViewMode = 'table' | 'grid';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '10' });
      if (search) params.set('search', search);
      if (category) params.set('category', category);

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.products || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
      showToast('Failed to fetch products', 'error');
    } finally {
      setLoading(false);
    }
  }, [search, category, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (product: Product) => {
    try {
      const res = await fetch(`/api/products/${product.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      showToast(`"${product.name}" deleted`);
      setDeleteConfirm(null);
      fetchProducts();
    } catch {
      showToast('Failed to delete product', 'error');
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditProduct(null);
    fetchProducts();
    showToast(editProduct ? 'Product updated!' : 'Product created!');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)' }}>
      {/* Admin header */}
      <header
        style={{
          background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald))',
                borderRadius: '8px',
                padding: '5px 9px',
              }}
            >
              <Zap size={14} style={{ color: '#0a0a0f' }} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--text-primary)' }}>
                TechMate <span style={{ color: 'var(--accent-cyan)' }}>Admin</span>
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>PRODUCT MANAGEMENT</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link
              href="/"
              style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              ← Back to Store
            </Link>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 24px' }}>

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          {[
            { label: 'Total Products', value: total, icon: Package, color: 'var(--accent-cyan)' },
            { label: 'In Stock', value: products.filter(p => p.inStock).length, icon: TrendingUp, color: 'var(--accent-emerald)' },
            { label: 'Hot Deals', value: products.filter(p => p.isHotDeal).length, icon: AlertCircle, color: 'var(--accent-red)' },
            { label: 'Featured', value: products.filter(p => p.isFeatured).length, icon: Star, color: 'var(--accent-yellow)' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  background: `${color}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <div>
                <div style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-0.04em' }}>{value}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {/* Search */}
          <div style={{ display: 'flex', flex: 1, minWidth: '200px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                style={{
                  width: '100%',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-card)',
                  borderRadius: '8px',
                  padding: '9px 12px 9px 34px',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Category filter */}
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: '8px',
              padding: '9px 12px',
              color: 'var(--text-primary)',
              fontSize: '13px',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          {/* View mode */}
          <div style={{ display: 'flex', border: '1px solid var(--border-card)', borderRadius: '8px', overflow: 'hidden' }}>
            {(['table', 'grid'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                style={{
                  padding: '9px 12px',
                  background: viewMode === mode ? 'var(--accent-cyan-dim)' : 'var(--bg-card)',
                  border: 'none',
                  cursor: 'pointer',
                  color: viewMode === mode ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                }}
              >
                {mode === 'table' ? <List size={15} /> : <LayoutGrid size={15} />}
              </button>
            ))}
          </div>

          <button
            onClick={fetchProducts}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: '8px',
              padding: '9px 12px',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
            }}
          >
            <RefreshCw size={15} />
          </button>

          {/* Add button */}
          <button
            onClick={() => { setEditProduct(null); setShowForm(true); }}
            style={{
              background: 'linear-gradient(135deg, var(--accent-cyan), #0099cc)',
              border: 'none',
              borderRadius: '8px',
              padding: '9px 18px',
              cursor: 'pointer',
              color: '#0a0a0f',
              fontWeight: 800,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Plus size={15} />
            Add Product
          </button>
        </div>

        {/* Product list / grid */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            Loading products…
          </div>
        ) : viewMode === 'table' ? (
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-subtle)' }}>
                    {['Product', 'Category', 'Price', 'Stock', 'Flags', 'Rating', 'Actions'].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: '12px 16px',
                          textAlign: 'left',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: 'var(--text-muted)',
                          letterSpacing: '0.08em',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, i) => (
                    <tr
                      key={product.id}
                      style={{
                        borderBottom: i < products.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                        transition: 'background 0.1s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      {/* Product */}
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: 44, height: 44, borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--border-card)' }}
                          />
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {product.name}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{product.brand}</div>
                          </div>
                        </div>
                      </td>
                      {/* Category */}
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: '11px', background: 'var(--bg-elevated)', padding: '3px 9px', borderRadius: '4px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                          {product.category}
                        </span>
                      </td>
                      {/* Price */}
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>৳{product.price.toLocaleString()}</div>
                        {product.discountPercent && (
                          <div style={{ fontSize: '10px', color: 'var(--accent-red)', fontWeight: 700 }}>-{product.discountPercent}%</div>
                        )}
                      </td>
                      {/* Stock */}
                      <td style={{ padding: '12px 16px' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: product.inStock ? 'var(--accent-emerald)' : 'var(--accent-red)',
                            background: product.inStock ? 'var(--accent-emerald-dim)' : 'rgba(255,51,85,0.12)',
                            padding: '3px 9px',
                            borderRadius: '4px',
                          }}
                        >
                          {product.inStock ? `✓ ${product.stockCount}` : '✗ OOS'}
                        </span>
                      </td>
                      {/* Flags */}
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {product.isFeatured && (
                            <span style={{ fontSize: '9px', background: 'rgba(0,212,255,0.15)', color: 'var(--accent-cyan)', padding: '2px 6px', borderRadius: '3px', fontWeight: 700 }}>
                              FEAT
                            </span>
                          )}
                          {product.isHotDeal && (
                            <span style={{ fontSize: '9px', background: 'rgba(255,51,85,0.15)', color: 'var(--accent-red)', padding: '2px 6px', borderRadius: '3px', fontWeight: 700 }}>
                              HOT
                            </span>
                          )}
                        </div>
                      </td>
                      {/* Rating */}
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffd700' }}>★ {product.rating.toFixed(1)}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{product.reviewsCount} reviews</div>
                      </td>
                      {/* Actions */}
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <Link
                            href={`/products/${product.slug}`}
                            target="_blank"
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: '6px',
                              background: 'var(--bg-elevated)',
                              border: '1px solid var(--border-card)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            <Eye size={13} />
                          </Link>
                          <button
                            onClick={() => { setEditProduct(product); setShowForm(true); }}
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: '6px',
                              background: 'var(--accent-cyan-dim)',
                              border: '1px solid rgba(0,212,255,0.2)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--accent-cyan)',
                            }}
                          >
                            <Edit3 size={13} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(product)}
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: '6px',
                              background: 'rgba(255,51,85,0.12)',
                              border: '1px solid rgba(255,51,85,0.2)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--accent-red)',
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // Grid view
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '14px',
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-card)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: '4px' }}>
                    <Link
                      href={`/products/${product.slug}`}
                      target="_blank"
                      style={{
                        width: 28, height: 28, borderRadius: '6px',
                        background: 'rgba(10,10,15,0.8)', backdropFilter: 'blur(4px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--text-primary)',
                      }}
                    >
                      <Eye size={12} />
                    </Link>
                    <button
                      onClick={() => { setEditProduct(product); setShowForm(true); }}
                      style={{
                        width: 28, height: 28, borderRadius: '6px',
                        background: 'var(--accent-cyan)', border: 'none',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#0a0a0f',
                      }}
                    >
                      <Edit3 size={12} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(product)}
                      style={{
                        width: 28, height: 28, borderRadius: '6px',
                        background: 'var(--accent-red)', border: 'none',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff',
                      }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
                <div style={{ padding: '14px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '4px' }}>{product.brand}</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>৳{product.price.toLocaleString()}</span>
                    <span style={{ fontSize: '11px', color: product.inStock ? 'var(--accent-emerald)' : 'var(--accent-red)', fontWeight: 700 }}>
                      {product.inStock ? 'In Stock' : 'OOS'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                padding: '7px 12px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: '8px',
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                color: page === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
                display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px',
              }}
            >
              <ChevronLeft size={14} /> Prev
            </button>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{
                padding: '7px 12px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: '8px',
                cursor: page === totalPages ? 'not-allowed' : 'pointer',
                color: page === totalPages ? 'var(--text-muted)' : 'var(--text-primary)',
                display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px',
              }}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-card)',
              borderRadius: '16px', padding: '32px', maxWidth: '420px', width: '90%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>Delete Product?</div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              This will permanently delete <strong style={{ color: 'var(--text-primary)' }}>{deleteConfirm.name}</strong>. This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  padding: '10px 20px', background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-card)', borderRadius: '8px',
                  cursor: 'pointer', color: 'var(--text-primary)', fontSize: '13px',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                style={{
                  padding: '10px 20px', background: 'var(--accent-red)',
                  border: 'none', borderRadius: '8px', cursor: 'pointer',
                  color: '#fff', fontWeight: 700, fontSize: '13px',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit form modal */}
      {showForm && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            overflowY: 'auto', padding: '24px 16px',
          }}
          onClick={() => { setShowForm(false); setEditProduct(null); }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 700 }}>
            <AdminProductForm
              product={editProduct}
              onSuccess={handleFormSuccess}
              onCancel={() => { setShowForm(false); setEditProduct(null); }}
            />
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed', bottom: 24, right: 24, zIndex: 300,
            background: toast.type === 'success' ? 'var(--accent-emerald)' : 'var(--accent-red)',
            color: '#0a0a0f', padding: '12px 20px', borderRadius: '10px',
            fontSize: '13px', fontWeight: 700, boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}
        >
          {toast.type === 'success' ? '✓' : '✗'} {toast.msg}
          <button onClick={() => setToast(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', marginLeft: '4px' }}>
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
