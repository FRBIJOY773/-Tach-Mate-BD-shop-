import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/products - Fetch all products with optional search/filter/pagination
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const brand = searchParams.get('brand') || '';
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const inStock = searchParams.get('inStock');
    const isFeatured = searchParams.get('isFeatured');
    const isHotDeal = searchParams.get('isHotDeal');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
    const page = Math.max(1, Number(searchParams.get('page') || 1));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit') || 12)));
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) where.category = { equals: category, mode: 'insensitive' };
    if (brand) where.brand = { equals: brand, mode: 'insensitive' };
    if (inStock === 'true') where.inStock = true;
    if (isFeatured === 'true') where.isFeatured = true;
    if (isHotDeal === 'true') where.isHotDeal = true;

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) (where.price as Record<string, number>).gte = minPrice;
      if (maxPrice !== undefined) (where.price as Record<string, number>).lte = maxPrice;
    }

    // Sorting
    const allowedSortFields: Record<string, string> = {
      price: 'price',
      name: 'name',
      rating: 'rating',
      createdAt: 'createdAt',
      reviewsCount: 'reviewsCount',
    };
    const sortField = allowedSortFields[sortBy] || 'createdAt';
    const sortOrder = order === 'asc' ? 'asc' : 'desc';

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { [sortField]: sortOrder },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('[GET /api/products]', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST /api/products - Create a new product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name, brand, category, price, image,
      slug: rawSlug,
      ...rest
    } = body;

    // Validate required
    if (!name || !brand || !category || !price || !image) {
      return NextResponse.json(
        { error: 'Missing required fields: name, brand, category, price, image' },
        { status: 400 }
      );
    }

    // Auto-generate slug if not provided
    const slug = rawSlug
      ? rawSlug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      : name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    // Check slug uniqueness
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: `Slug "${slug}" already exists. Choose a unique name or provide a custom slug.` },
        { status: 409 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        brand,
        category,
        price: Number(price),
        image,
        ...rest,
        originalPrice: rest.originalPrice ? Number(rest.originalPrice) : undefined,
        discountPercent: rest.discountPercent ? Number(rest.discountPercent) : undefined,
        stockCount: rest.stockCount ? Number(rest.stockCount) : 0,
        rating: rest.rating ? Number(rest.rating) : 0,
        reviewsCount: rest.reviewsCount ? Number(rest.reviewsCount) : 0,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('[POST /api/products]', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
