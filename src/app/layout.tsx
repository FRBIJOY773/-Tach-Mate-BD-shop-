import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Tech Mate BD – Your Ultimate Tech Store in Bangladesh',
    template: '%s | Tech Mate BD',
  },
  description:
    'Shop the latest laptops, tablets, gaming gear, graphics cards and more at the best prices in Bangladesh. Fast delivery in 64 districts.',
  keywords: ['tech store bangladesh', 'laptop price bangladesh', 'tablet price', 'gaming laptop bd'],
  openGraph: {
    title: 'Tech Mate BD',
    description: 'Best tech prices in Bangladesh',
    locale: 'en_BD',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
