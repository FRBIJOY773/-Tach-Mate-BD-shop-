import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/products/[id] - Get single product by id OR slug
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Try by id first, fallback to slug
    const product = await prisma.product.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('[GET /api/products/[id]]', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

// PUT /api/products/[id] - Update a product
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Verify product exists
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // If slug is being changed, check uniqueness
    if (body.slug && body.slug !== existing.slug) {
      const slugConflict = await prisma.product.findFirst({
        where: { slug: body.slug, NOT: { id } },
      });
      if (slugConflict) {
        return NextResponse.json({ error: 'Slug already in use' }, { status: 409 });
      }
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...body,
        price: body.price !== undefined ? Number(body.price) : undefined,
        originalPrice: body.originalPrice !== undefined ? Number(body.originalPrice) : undefined,
        discountPercent: body.discountPercent !== undefined ? Number(body.discountPercent) : undefined,
        stockCount: body.stockCount !== undefined ? Number(body.stockCount) : undefined,
        rating: body.rating !== undefined ? Number(body.rating) : undefined,
        reviewsCount: body.reviewsCount !== undefined ? Number(body.reviewsCount) : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('[PUT /api/products/[id]]', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE /api/products/[id] - Delete a product
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ message: 'Product deleted successfully', id });
  } catch (error) {
    console.error('[DELETE /api/products/[id]]', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
