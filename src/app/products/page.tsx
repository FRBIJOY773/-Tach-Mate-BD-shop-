'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'laptop', label: 'Laptops' },
  { value: 'gaming-laptop', label: 'Gaming Laptops' },
  { value: 'ultrabook', label: 'Ultrabooks' },
  { value: 'business-laptop', label: 'Business Laptops' },
  { value: 'tablet', label: 'Tablets' },
  { value: 'graphics-card', label: 'Graphics Cards' },
  { value: 'monitor', label: 'Monitors' },
  { value: 'peripheral', label: 'Peripherals' },
  { value: 'component', label: 'Components' },
];

const SORT_OPTIONS = [
  { value: 'createdAt-desc', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Top Rated' },
  { value: 'reviewsCount-desc', label: 'Most Reviewed' },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  // Filter state
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [inStock, setInStock] = useState(searchParams.get('inStock') === 'true');
  const [isHotDeal, setIsHotDeal] = useState(searchParams.get('isHotDeal') === 'true');
  const [isFeatured, setIsFeatured] = useState(searchParams.get('isFeatured') === 'true');
  const [sort, setSort] = useState(searchParams.get('sort') || 'createdAt-desc');
  const [page, setPage] = useState(Number(searchParams.get('page') || 1));

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const [sortBy, order] = sort.split('-');
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (category) params.set('category', category);
      if (minPrice) params.set('minPrice', minPrice);
      if (maxPrice) params.set('maxPrice', maxPrice);
      if (inStock) params.set('inStock', 'true');
      if (isHotDeal) params.set('isHotDeal', 'true');
      if (isFeatured) params.set('isFeatured', 'true');
      params.set('sortBy', sortBy);
      params.set('order', order || 'desc');
      params.set('page', String(page));
      params.set('limit', '12');

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.products || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, category, minPrice, maxPrice, inStock, isHotDeal, isFeatured, sort, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setInStock(false);
    setIsHotDeal(false);
    setIsFeatured(false);
    setSort('createdAt-desc');
    setPage(1);
    router.push('/products');
  };

  const hasActiveFilters = !!(search || category || minPrice || maxPrice || inStock || isHotDeal || isFeatured);

  return (
    <>
      <Header />
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>

        {/* Page header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '4px' }}>
            {isHotDeal ? '🔥 Hot Deals' : isFeatured ? '⭐ Featured Products' : category ? CATEGORIES.find(c => c.value === category)?.label || 'Products' : 'All Products'}
          </h1>
          {!loading && (
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
              {total.toLocaleString()} product{total !== 1 ? 's' : ''} found
              {search && ` for "${search}"`}
            </p>
          )}
        </div>

        {/* Search + Sort bar */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}
        >
          <form onSubmit={handleSearch} style={{ flex: 1, minWidth: '240px', display: 'flex' }}>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                background: 'var(--bg-card)',
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
                background: 'var(--accent-cyan)',
                border: 'none',
                borderRadius: '0 8px 8px 0',
                padding: '0 16px',
                cursor: 'pointer',
                color: '#0a0a0f',
              }}
            >
              <Search size={15} />
            </button>
          </form>

          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: '8px',
              padding: '10px 14px',
              color: 'var(--text-primary)',
              fontSize: '13px',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <button
            onClick={() => setFilterOpen(!filterOpen)}
            style={{
              background: filterOpen ? 'var(--accent-cyan-dim)' : 'var(--bg-card)',
              border: `1px solid ${filterOpen ? 'var(--accent-cyan)' : 'var(--border-card)'}`,
              borderRadius: '8px',
              padding: '10px 16px',
              cursor: 'pointer',
              color: filterOpen ? 'var(--accent-cyan)' : 'var(--text-primary)',
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <SlidersHorizontal size={15} />
            Filters
            {hasActiveFilters && (
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: 'var(--accent-cyan)',
                  color: '#0a0a0f',
                  fontSize: '10px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                !
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-card)',
                borderRadius: '8px',
                padding: '10px 16px',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <X size={13} />
              Clear
            </button>
          )}
        </div>

        {/* Filter panel */}
        {filterOpen && (
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
            }}
          >
            {/* Category */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-cyan)', letterSpacing: '0.08em', display: 'block', marginBottom: '10px' }}>
                CATEGORY
              </label>
              <select
                value={category}
                onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-card)',
                  borderRadius: '8px',
                  padding: '9px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  outline: 'none',
                }}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Price range */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-cyan)', letterSpacing: '0.08em', display: 'block', marginBottom: '10px' }}>
                PRICE RANGE (৳)
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                  style={{
                    flex: 1,
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-card)',
                    borderRadius: '8px',
                    padding: '9px 12px',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
                <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>–</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                  style={{
                    flex: 1,
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-card)',
                    borderRadius: '8px',
                    padding: '9px 12px',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Toggles */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-cyan)', letterSpacing: '0.08em', display: 'block', marginBottom: '10px' }}>
                FILTERS
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: 'In Stock Only', value: inStock, setter: (v: boolean) => { setInStock(v); setPage(1); } },
                  { label: '🔥 Hot Deals', value: isHotDeal, setter: (v: boolean) => { setIsHotDeal(v); setPage(1); } },
                  { label: '⭐ Featured', value: isFeatured, setter: (v: boolean) => { setIsFeatured(v); setPage(1); } },
                ].map(({ label, value, setter }) => (
                  <label
                    key={label}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)' }}
                  >
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setter(e.target.checked)}
                      style={{ accentColor: 'var(--accent-cyan)', width: 15, height: 15 }}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product grid */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <Loader2 size={32} style={{ color: 'var(--accent-cyan)', animation: 'spin 1s linear infinite' }} />
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Loading products…</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</p>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>No products found</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Try adjusting your search or filters.</p>
            <button
              onClick={clearFilters}
              style={{
                background: 'var(--accent-cyan)',
                color: '#0a0a0f',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 24px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '16px',
                marginBottom: '36px',
              }}
            >
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-card)',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    cursor: page === 1 ? 'not-allowed' : 'pointer',
                    color: page === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '13px',
                  }}
                >
                  <ChevronLeft size={15} /> Prev
                </button>
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '8px',
                      border: `1px solid ${n === page ? 'var(--accent-cyan)' : 'var(--border-card)'}`,
                      background: n === page ? 'var(--accent-cyan-dim)' : 'var(--bg-card)',
                      color: n === page ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                      fontWeight: n === page ? 700 : 400,
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-card)',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    cursor: page === totalPages ? 'not-allowed' : 'pointer',
                    color: page === totalPages ? 'var(--text-muted)' : 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '13px',
                  }}
                >
                  Next <ChevronRight size={15} />
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24, color: 'var(--text-muted)' }}>Loading…</div>}>
      <ProductsContent />
    </Suspense>
  );
}
