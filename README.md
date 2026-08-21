# 🚀 Tech Mate BD — Full-Stack Next.js E-Commerce

A complete tech store e-commerce platform built with **Next.js 15**, **Prisma**, **PostgreSQL**, and **Tailwind CSS v4**.

---

## 📁 Project Structure

```
tech-mate-bd/
├── prisma/
│   ├── schema.prisma          # PostgreSQL schema (Products table)
│   └── seed.ts                # Sample product data seeder
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout + metadata
│   │   ├── page.tsx           # 🏠 Landing page (Hero, Featured, Hot Deals, Categories)
│   │   ├── globals.css        # CSS variables + dark theme
│   │   ├── not-found.tsx      # 404 page
│   │   ├── products/
│   │   │   ├── page.tsx       # 📦 Products listing (search, filter, sort, pagination)
│   │   │   └── [id]/
│   │   │       ├── page.tsx              # Server component (fetch product by slug/id)
│   │   │       └── ProductDetailClient.tsx  # Client with tabs: Specs, Details, Q&A, Reviews
│   │   ├── admin/
│   │   │   ├── page.tsx           # 🛠 Admin panel (table/grid view, CRUD)
│   │   │   └── AdminProductForm.tsx  # Add/Edit product modal form
│   │   └── api/
│   │       └── products/
│   │           ├── route.ts       # GET (list+filter) · POST (create)
│   │           └── [id]/
│   │               └── route.ts   # GET · PUT · DELETE
│   ├── components/
│   │   ├── Header.tsx         # Sticky nav with search
│   │   ├── Footer.tsx         # Footer with links & contact
│   │   └── ProductCard.tsx    # Reusable product card
│   ├── lib/
│   │   └── prisma.ts          # Prisma singleton client
│   └── types/
│       └── index.ts           # TypeScript interfaces & constants
├── .env.example               # Environment variables template
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

---

## 🛠 Setup & Installation

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env.local
```
Edit `.env.local` and set your PostgreSQL connection string:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/techmate_bd"
```

**Free PostgreSQL options:**
- [Neon](https://neon.tech) — serverless PostgreSQL, free tier
- [Supabase](https://supabase.com) — PostgreSQL + extras, free tier
- [Railway](https://railway.app) — simple deployment with Postgres

### 3. Push schema to database
```bash
npm run db:push
```
This creates the `Product` table in your PostgreSQL database.

### 4. Seed sample products (optional)
```bash
npm run db:seed
```
Seeds 6 sample products including the Xiaomi Redmi Pad 2 and other tech items.

### 5. Generate Prisma client
```bash
npm run db:generate
```

### 6. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 🗄 Database Schema (Prisma)

The `Product` model covers everything a tech store needs:

| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Auto-generated primary key |
| name | String | Product name |
| slug | String (unique) | URL-friendly identifier |
| brand | String | Brand name |
| category | String | Category slug |
| price | Float | Current price in BDT |
| originalPrice | Float? | Pre-discount price |
| discountPercent | Int? | Discount percentage |
| rating | Float | Average rating (0–5) |
| reviewsCount | Int | Number of reviews |
| image | String | Primary image URL |
| images | String[] | Additional image URLs |
| inStock | Boolean | Availability |
| stockCount | Int | Units available |
| isFeatured | Boolean | Show on homepage |
| isHotDeal | Boolean | Hot deal badge |
| processor…dimensions | String? | Specification fields |
| details | Text? | Long-form HTML/text for Details tab |
| qna | Json? | Array of {question, answer} |
| reviews | Json? | Array of {user, rating, comment, date} |
| createdAt / updatedAt | DateTime | Timestamps |

---

## 🔌 API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products with filters |
| POST | `/api/products` | Create new product |
| GET | `/api/products/:id` | Get product by ID or slug |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### GET /api/products — Query Parameters

| Param | Type | Example |
|-------|------|---------|
| search | string | `?search=xiaomi` |
| category | string | `?category=tablet` |
| brand | string | `?brand=Samsung` |
| minPrice | number | `?minPrice=10000` |
| maxPrice | number | `?maxPrice=50000` |
| inStock | boolean | `?inStock=true` |
| isFeatured | boolean | `?isFeatured=true` |
| isHotDeal | boolean | `?isHotDeal=true` |
| sortBy | string | `?sortBy=price` |
| order | asc\|desc | `?order=asc` |
| page | number | `?page=2` |
| limit | number | `?limit=12` |

---

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — Hero, categories, featured, hot deals, brands |
| `/products` | Products listing with full filter/search/sort |
| `/products/[slug]` | Product detail with 4 tabs: Specifications, Details, Q&A, Reviews |
| `/admin` | Admin panel — CRUD for all products (table + grid view) |

---

## 🎨 Design Tokens

All colors use CSS variables defined in `globals.css`:

```css
--bg-main: #0a0a0f        /* Page background */
--bg-card: #111118        /* Card background */
--accent-cyan: #00d4ff    /* Primary accent */
--accent-emerald: #00e67a /* Success / in-stock */
--accent-red: #ff3355     /* Danger / hot deal */
--accent-yellow: #ffd700  /* Stars / featured */
```

---

## 📦 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** PostgreSQL via Prisma ORM
- **Styling:** Tailwind CSS v4 + CSS variables
- **Language:** TypeScript
- **Icons:** Lucide React
- **Hosting:** Vercel (recommended) + Neon/Supabase for DB

---

## 🚀 Deploy to Vercel

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add `DATABASE_URL` environment variable
4. Deploy — Vercel auto-detects Next.js

After deploy, run migrations:
```bash
npx prisma db push
```
