'use client';

import { useState, useEffect } from 'react';
import { X, Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { Product, CATEGORIES } from '@/types';

interface Props {
  product: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const FIELD_GROUPS = [
  {
    title: 'Basic Info',
    fields: [
      { key: 'name', label: 'Product Name *', type: 'text', required: true, span: 2 },
      { key: 'slug', label: 'Slug (auto-generated if empty)', type: 'text', span: 2 },
      { key: 'brand', label: 'Brand *', type: 'text', required: true },
      { key: 'category', label: 'Category *', type: 'select', required: true },
      { key: 'image', label: 'Main Image URL *', type: 'text', required: true, span: 2 },
      { key: 'shortDescription', label: 'Short Description', type: 'text', span: 2 },
    ],
  },
  {
    title: 'Pricing & Stock',
    fields: [
      { key: 'price', label: 'Price (৳) *', type: 'number', required: true },
      { key: 'originalPrice', label: 'Original Price (৳)', type: 'number' },
      { key: 'discountPercent', label: 'Discount %', type: 'number' },
      { key: 'stockCount', label: 'Stock Count', type: 'number' },
    ],
  },
  {
    title: 'Specifications',
    fields: [
      { key: 'processor', label: 'Processor', type: 'text' },
      { key: 'ram', label: 'RAM', type: 'text' },
      { key: 'storage', label: 'Storage', type: 'text' },
      { key: 'gpu', label: 'GPU', type: 'text' },
      { key: 'display', label: 'Display', type: 'text' },
      { key: 'weight', label: 'Weight', type: 'text' },
      { key: 'battery', label: 'Battery', type: 'text' },
      { key: 'camera', label: 'Camera', type: 'text' },
      { key: 'os', label: 'OS', type: 'text' },
      { key: 'color', label: 'Color', type: 'text' },
      { key: 'connectivity', label: 'Connectivity', type: 'text' },
      { key: 'dimensions', label: 'Dimensions', type: 'text' },
      { key: 'warranty', label: 'Warranty', type: 'text', span: 2 },
    ],
  },
];

const DEFAULT_FORM: Record<string, unknown> = {
  name: '', slug: '', brand: '', category: '', price: '',
  originalPrice: '', discountPercent: '', stockCount: '0',
  image: '', shortDescription: '',
  processor: '', ram: '', storage: '', gpu: '', display: '',
  weight: '', battery: '', camera: '', os: '', color: '',
  connectivity: '', dimensions: '', warranty: '',
  inStock: true, isFeatured: false, isHotDeal: false,
  rating: '0', reviewsCount: '0',
  details: '',
};

export default function AdminProductForm({ product, onSuccess, onCancel }: Props) {
  const [form, setForm] = useState<Record<string, unknown>>({ ...DEFAULT_FORM });
  const [qna, setQna] = useState<{ question: string; answer: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState<'basic' | 'details' | 'qna'>('basic');

  useEffect(() => {
    if (product) {
      const mapped: Record<string, unknown> = { ...DEFAULT_FORM };
      Object.keys(DEFAULT_FORM).forEach((key) => {
        const val = (product as Record<string, unknown>)[key];
        mapped[key] = val !== null && val !== undefined ? String(val) : '';
      });
      mapped.inStock = product.inStock;
      mapped.isFeatured = product.isFeatured;
      mapped.isHotDeal = product.isHotDeal;
      setForm(mapped);
      setQna(Array.isArray(product.qna) ? (product.qna as { question: string; answer: string }[]) : []);
    } else {
      setForm({ ...DEFAULT_FORM });
      setQna([]);
    }
  }, [product]);

  const set = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload: Record<string, unknown> = { ...form };
      // Coerce numerics
      ['price', 'originalPrice', 'discountPercent', 'stockCount', 'rating', 'reviewsCount'].forEach((k) => {
        payload[k] = payload[k] !== '' ? Number(payload[k]) : null;
      });
      // Clean empty strings to null
      Object.keys(payload).forEach((k) => {
        if (payload[k] === '') payload[k] = null;
      });
      payload.qna = qna.length > 0 ? qna : null;

      const url = product ? `/api/products/${product.id}` : '/api/products';
      const method = product ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'var(--bg-input)',
    border: '1px solid var(--border-card)',
    borderRadius: '8px',
    padding: '9px 12px',
    color: 'var(--text-primary)',
    fontSize: '13px',
    outline: 'none',
    boxSizing: 'border-box' as const,
  };

  const labelStyle = {
    fontSize: '11px',
    fontWeight: 700,
    color: 'var(--text-muted)',
    letterSpacing: '0.06em',
    display: 'block',
    marginBottom: '6px',
  };

  const sectionBtnStyle = (active: boolean) => ({
    padding: '8px 18px',
    background: active ? 'var(--accent-cyan-dim)' : 'transparent',
    border: 'none',
    borderBottom: `2px solid ${active ? 'var(--accent-cyan)' : 'transparent'}`,
    color: active ? 'var(--accent-cyan)' : 'var(--text-secondary)',
    fontWeight: active ? 700 : 500,
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.15s',
  });

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}
    >
      {/* Form header */}
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg-elevated)',
        }}
      >
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '2px' }}>
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          {product && (
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ID: {product.id}</p>
          )}
        </div>
        <button
          onClick={onCancel}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: '8px',
            padding: '7px',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Section tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)' }}>
        <button style={sectionBtnStyle(activeSection === 'basic')} onClick={() => setActiveSection('basic')}>
          Basic & Specs
        </button>
        <button style={sectionBtnStyle(activeSection === 'details')} onClick={() => setActiveSection('details')}>
          Details Tab
        </button>
        <button style={sectionBtnStyle(activeSection === 'qna')} onClick={() => setActiveSection('qna')}>
          Q&A ({qna.length})
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ padding: '24px', maxHeight: '68vh', overflowY: 'auto' }}>

          {/* ── BASIC & SPECS ── */}
          {activeSection === 'basic' && (
            <div>
              {FIELD_GROUPS.map((group) => (
                <div key={group.title} style={{ marginBottom: '28px' }}>
                  <h3
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: 'var(--accent-cyan)',
                      letterSpacing: '0.1em',
                      marginBottom: '16px',
                      paddingBottom: '8px',
                      borderBottom: '1px solid var(--border-subtle)',
                    }}
                  >
                    {group.title.toUpperCase()}
                  </h3>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '14px',
                    }}
                  >
                    {group.fields.map((field) => (
                      <div
                        key={field.key}
                        style={{ gridColumn: field.span === 2 ? '1 / -1' : 'span 1' }}
                      >
                        <label style={labelStyle}>{field.label}</label>
                        {field.type === 'select' ? (
                          <select
                            value={form[field.key] as string || ''}
                            onChange={(e) => set(field.key, e.target.value)}
                            required={field.required}
                            style={{ ...inputStyle, cursor: 'pointer' }}
                          >
                            <option value="">Select category…</option>
                            {CATEGORIES.map((c) => (
                              <option key={c.value} value={c.value}>{c.label}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            value={form[field.key] as string || ''}
                            onChange={(e) => set(field.key, e.target.value)}
                            required={field.required}
                            style={inputStyle}
                            placeholder={field.key === 'price' ? '0' : ''}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Toggles */}
              <div>
                <h3 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-cyan)', letterSpacing: '0.1em', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                  FLAGS & STATUS
                </h3>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  {[
                    { key: 'inStock', label: '✓ In Stock' },
                    { key: 'isFeatured', label: '⭐ Featured' },
                    { key: 'isHotDeal', label: '🔥 Hot Deal' },
                  ].map(({ key, label }) => (
                    <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      <input
                        type="checkbox"
                        checked={!!form[key]}
                        onChange={(e) => set(key, e.target.checked)}
                        style={{ accentColor: 'var(--accent-cyan)', width: 16, height: 16 }}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── DETAILS TAB ── */}
          {activeSection === 'details' && (
            <div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.6 }}>
                This content appears in the "Details" tab on the product page. Use double line breaks to create paragraphs. Short single-line text becomes a heading.
              </p>
              <textarea
                value={form.details as string || ''}
                onChange={(e) => set('details', e.target.value)}
                style={{
                  ...inputStyle,
                  minHeight: '360px',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  lineHeight: 1.7,
                }}
                placeholder={`Features of [Product Name]\n\nIntroductory paragraph about the product...\n\nWhat Makes It Special?\n\nAnother section paragraph...`}
              />
            </div>
          )}

          {/* ── Q&A TAB ── */}
          {activeSection === 'qna' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Questions & answers shown on product page.
                </p>
                <button
                  type="button"
                  onClick={() => setQna([...qna, { question: '', answer: '' }])}
                  style={{
                    background: 'var(--accent-cyan-dim)',
                    border: '1px solid rgba(0,212,255,0.2)',
                    borderRadius: '7px',
                    padding: '6px 14px',
                    cursor: 'pointer',
                    color: 'var(--accent-cyan)',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <Plus size={13} /> Add Q&A
                </button>
              </div>

              {qna.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
                  <p style={{ marginBottom: '12px' }}>No Q&A entries yet.</p>
                  <button
                    type="button"
                    onClick={() => setQna([{ question: '', answer: '' }])}
                    style={{
                      background: 'var(--accent-cyan)',
                      border: 'none',
                      borderRadius: '7px',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      color: '#0a0a0f',
                      fontSize: '12px',
                      fontWeight: 700,
                    }}
                  >
                    Add First Q&A
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {qna.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border-card)',
                        borderRadius: '10px',
                        padding: '16px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-cyan)', letterSpacing: '0.06em' }}>
                          Q&A #{i + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQna(qna.filter((_, idx) => idx !== i))}
                          style={{
                            background: 'rgba(255,51,85,0.12)',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '5px',
                            cursor: 'pointer',
                            color: 'var(--accent-red)',
                          }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        <label style={labelStyle}>QUESTION</label>
                        <input
                          type="text"
                          value={item.question}
                          onChange={(e) => {
                            const updated = [...qna];
                            updated[i] = { ...updated[i], question: e.target.value };
                            setQna(updated);
                          }}
                          style={inputStyle}
                          placeholder="E.g. Does it support SIM cards?"
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>ANSWER</label>
                        <textarea
                          value={item.answer}
                          onChange={(e) => {
                            const updated = [...qna];
                            updated[i] = { ...updated[i], answer: e.target.value };
                            setQna(updated);
                          }}
                          style={{ ...inputStyle, minHeight: '80px', resize: 'vertical', fontFamily: 'inherit' }}
                          placeholder="Provide a clear, helpful answer..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              margin: '0 24px 16px',
              padding: '12px 16px',
              background: 'rgba(255,51,85,0.1)',
              border: '1px solid rgba(255,51,85,0.25)',
              borderRadius: '8px',
              fontSize: '13px',
              color: 'var(--accent-red)',
            }}
          >
            ✗ {error}
          </div>
        )}

        {/* Footer actions */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            background: 'var(--bg-elevated)',
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              background: 'transparent',
              border: '1px solid var(--border-card)',
              borderRadius: '8px',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '10px 24px',
              background: loading ? 'var(--bg-elevated)' : 'linear-gradient(135deg, var(--accent-cyan), #0099cc)',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              color: loading ? 'var(--text-muted)' : '#0a0a0f',
              fontWeight: 800,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
            }}
          >
            {loading ? (
              <>
                <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
                Saving…
              </>
            ) : (
              <>
                <Save size={14} />
                {product ? 'Save Changes' : 'Create Product'}
              </>
            )}
          </button>
        </div>
      </form>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
