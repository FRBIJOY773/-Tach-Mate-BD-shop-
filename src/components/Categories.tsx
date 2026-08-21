"use client";

import { Cpu, Gamepad2, HardDrive, Monitor, Tablet, Zap } from "lucide-react";

import Link from "next/link";





const CATEGORIES = [

  { label: 'Laptops', icon: Monitor, href: '/products?category=laptop', color: '#00d4ff', desc: 'Ultrabooks & Pro machines' },

  { label: 'Gaming', icon: Gamepad2, href: '/products?category=gaming-laptop', color: '#ff3355', desc: 'High-performance rigs' },

  { label: 'Tablets', icon: Tablet, href: '/products?category=tablet', color: '#00e67a', desc: 'Portable powerhouses' },

  { label: 'Graphics Cards', icon: Cpu, href: '/products?category=graphics-card', color: '#ffd700', desc: 'RTX & RX series' },

  { label: 'Storage', icon: HardDrive, href: '/products?category=component', color: '#a855f7', desc: 'SSD, NVMe & HDD' },

  { label: 'All Products', icon: Zap, href: '/products', color: '#00d4ff', desc: 'Browse everything' },

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

};
