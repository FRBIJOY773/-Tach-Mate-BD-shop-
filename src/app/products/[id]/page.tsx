import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import ProductDetailClient from './ProductDetailClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Product } from '@/types';

interface Props {
  params: Promise<{ id: string }>;
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const product = await prisma.product.findFirst({
      where: { OR: [{ id: slug }, { slug }] },
    });
    return product as unknown as Product | null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.shortDescription || `Buy ${product.name} at the best price in Bangladesh.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  // Fetch related products
  const related = await prisma.product.findMany({
    where: { category: product.category, NOT: { id: product.id } },
    take: 4,
  }) as unknown as Product[];

  return (
    <>
      <Header />
      <ProductDetailClient product={product} related={related} />
      <Footer />
    </>
  );
}
