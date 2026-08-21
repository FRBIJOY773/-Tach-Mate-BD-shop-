"use client";
import { useState } from "react";
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
  Smartphone,
  Plus,
  Check,
  X
} from "lucide-react";
import Link from "next/link";

// Move the initial categories outside the component so it doesn't recreate on every render
const INITIAL_CATEGORIES = [
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
  // Setup state to manage the dynamic list and the input toggle
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddNewCategory = () => {
    if (!newCategoryName.trim()) {
      setIsAdding(false);
      return;
    }

    // Create the new category object
    const newCategory = {
      label: newCategoryName,
      icon: Zap, // Default icon for new categories
      href: `/products?category=${newCategoryName.toLowerCase().replace(/\s+/g, '-')}`,
      color: '#888888', // Default color
      desc: 'Custom Category'
    };

    // Update the state array
    setCategories([...categories, newCategory]);
    
    // Reset the input state
    setNewCategoryName("");
    setIsAdding(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddNewCategory();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewCategoryName("");
    }
  };

  return (
    <>
      {/* Mapped Dynamic Categories */}
      {categories.map(({ label, icon: Icon, href, color, desc }, index) => (
        <Link
          key={`${label}-${index}`}
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

      {/* Interactive Add Category Card */}
      {isAdding ? (
        <div
          className="glass-card"
          style={{
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            textAlign: 'center',
            borderStyle: 'dashed',
            borderColor: 'var(--text-primary)'
          }}
        >
          <input 
            autoFocus
            type="text" 
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Category Name"
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '8px',
              border: '1px solid var(--text-muted)',
              background: 'transparent',
              color: 'var(--text-primary)',
              textAlign: 'center',
              outline: 'none'
            }}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={handleAddNewCategory}
              style={{ padding: '6px', cursor: 'pointer', borderRadius: '8px', border: 'none', background: '#00e67a22', color: '#00e67a' }}
            >
              <Check size={18} />
            </button>
            <button 
              onClick={() => { setIsAdding(false); setNewCategoryName(""); }}
              style={{ padding: '6px', cursor: 'pointer', borderRadius: '8px', border: 'none', background: '#ff335522', color: '#ff3355' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div
          className="glass-card"
          onClick={() => setIsAdding(true)}
          style={{
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            borderStyle: 'dashed',
            borderColor: 'var(--text-muted)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '14px',
              background: `rgba(150, 150, 150, 0.1)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px dashed rgba(150, 150, 150, 0.3)`,
            }}
          >
            <Plus size={22} style={{ color: 'var(--text-primary)' }} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>Add Category</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Create a new one</div>
          </div>
        </div>
      )}
    </>
  );
}
