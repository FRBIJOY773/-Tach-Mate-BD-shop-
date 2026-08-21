import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing products
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: 'Xiaomi Redmi Pad 2 (Wi-Fi) Graphite Gray Tablet',
        slug: 'xiaomi-redmi-pad-2-wifi-graphite-gray',
        brand: 'Xiaomi',
        category: 'tablet',
        price: 22999,
        originalPrice: 24999,
        discountPercent: 8,
        rating: 4.5,
        reviewsCount: 42,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80'
        ],
        inStock: true,
        stockCount: 25,
        isFeatured: true,
        isHotDeal: false,
        shortDescription: '11" 2560x1600 display, Helio G100 Ultra, 6GB RAM, 9000mAh battery',
        processor: 'Mediatek Helio G100 Ultra',
        ram: '6GB',
        storage: '128GB',
        gpu: 'Mali-G57 MC2',
        display: '11 Inch | 2560x1600',
        weight: '0.510 kg',
        warranty: '1 Year (Xiaomi Service Center)',
        color: 'Graphite Gray',
        battery: '9000mAh',
        camera: 'Front: 5MP | Rear: 8MP',
        os: 'Android 15',
        connectivity: 'Wi-Fi only',
        dimensions: '254.58 x 166.04 x 7.36mm',
        details: `Features of Xiaomi Redmi Pad 2 (Wi-Fi) Tablet In Bangladesh

Xiaomi Redmi Pad 2 11 Inch Graphite Gray Tablet is made for users who want a large display and smooth daily performance. It comes with an 11-inch screen that offers a sharp 2560 x 1600 resolution. This helps make videos, photos, and documents look clear and detailed. The tablet runs on Android 15, giving users access to modern features and applications through Google Play Store support. It is powered by the MediaTek Helio G100 Ultra processor and Mali-G57 MC2 GPU. The combination helps the tablet handle everyday tasks smoothly. With 6GB RAM and 128GB storage, users can keep apps, files, photos, and videos in one place. The tablet also includes a 5MP front camera for video calls and an 8MP rear camera for capturing photos. Its Graphite Gray finish gives it a clean and modern look.

What Makes The Xiaomi Redmi Pad 2 11 Inch Graphite Gray Tablet Special?

The Xiaomi Redmi Pad 2 stands out because of its balance of display quality, performance, and battery life. The large 11-inch screen provides a comfortable viewing experience for entertainment, reading, and daily tasks. Its high-resolution display delivers clear images and detailed visuals. The MediaTek Helio G100 Ultra processor works with 6GB RAM to provide smooth operation for everyday activities. Whether browsing, watching content, or using apps, the tablet offers a responsive experience. The 128GB storage capacity gives users enough room to save important files and media. Another key feature is the 9000mAh battery. It helps support long hours of use without frequent charging.`,
        qna: [
          { question: 'Does this tablet support SIM card?', answer: 'No, this is a Wi-Fi only model. There is no SIM card slot.' },
          { question: 'Does it support stylus pen?', answer: 'No, the Xiaomi Redmi Pad 2 does not include or support a stylus pen.' },
          { question: 'Does it have Google Play Store?', answer: 'Yes, it runs Android 15 with full Google Play Store support.' }
        ],
        reviews: [
          { user: 'Rahim K.', rating: 5, comment: 'Excellent display quality! The 2560x1600 resolution is crisp and clear.', date: '2025-06-15' },
          { user: 'Sadia M.', rating: 4, comment: 'Great battery life, lasts all day easily. Good for reading and streaming.', date: '2025-06-20' },
          { user: 'Tanvir A.', rating: 4, comment: 'Nice build quality for the price. Performance is smooth for daily tasks.', date: '2025-07-01' }
        ]
      },
      {
        name: 'ASUS TUF Gaming A15 FA507XI Ryzen 9 RTX 4070',
        slug: 'asus-tuf-gaming-a15-fa507xi',
        brand: 'ASUS',
        category: 'gaming-laptop',
        price: 159999,
        originalPrice: 181900,
        discountPercent: 12,
        rating: 4.8,
        reviewsCount: 24,
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
        images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80'],
        inStock: true,
        stockCount: 14,
        isFeatured: true,
        isHotDeal: true,
        shortDescription: 'RTX 4070, Ryzen 9 7940HS, 16GB DDR5, 1TB SSD, 144Hz IPS',
        processor: 'AMD Ryzen 9 7940HS (8 cores, up to 5.2 GHz)',
        ram: '16GB DDR5 4800MHz',
        storage: '1TB PCIe 4.0 NVMe M.2 SSD',
        gpu: 'NVIDIA GeForce RTX 4070 8GB GDDR6',
        display: '15.6\" FHD 144Hz 100% sRGB IPS-Level',
        weight: '2.20 kg',
        warranty: '2 Years Official Brand Warranty',
        color: 'Mecha Gray',
        os: 'Windows 11 Home',
        details: 'Geared for serious gaming and real-world durability, the TUF Gaming A15 is a fully-loaded Windows 11 gaming laptop that can carry you to victory. Military-grade toughness meets extreme performance in this battle-ready machine.',
        qna: [
          { question: 'Can I upgrade the RAM?', answer: 'Yes, it has 2 SO-DIMM slots and supports up to 32GB DDR5 RAM.' },
          { question: 'Does it have a backlit keyboard?', answer: 'Yes, it features an RGB backlit keyboard.' }
        ],
        reviews: [
          { user: 'Arif H.', rating: 5, comment: 'Beast gaming machine! RTX 4070 handles every game I throw at it.', date: '2025-05-10' }
        ]
      },
      {
        name: 'Apple MacBook Pro 14-inch M3 Pro 18GB 512GB',
        slug: 'apple-macbook-pro-14-m3-pro',
        brand: 'Apple',
        category: 'ultrabook',
        price: 265000,
        originalPrice: 279000,
        discountPercent: 5,
        rating: 4.9,
        reviewsCount: 128,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
        images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'],
        inStock: true,
        stockCount: 8,
        isFeatured: true,
        isHotDeal: false,
        shortDescription: 'M3 Pro chip, 18GB Unified Memory, 14.2" Liquid Retina XDR 120Hz',
        processor: 'Apple M3 Pro (11-core CPU, 14-core GPU)',
        ram: '18GB Unified Memory',
        storage: '512GB Superfast SSD',
        display: '14.2" Liquid Retina XDR 120Hz ProMotion',
        weight: '1.61 kg',
        warranty: '1 Year Apple International Warranty',
        color: 'Space Black',
        os: 'macOS Sequoia',
        details: 'The most advanced chips ever built for a personal computer. With mind-blowing performance, extraordinary battery life, and a Liquid Retina XDR display.',
        qna: [
          { question: 'Is it compatible with Windows?', answer: 'You can run Windows via Parallels or Boot Camp is not supported on M-series Macs natively.' }
        ],
        reviews: [
          { user: 'Nasrin T.', rating: 5, comment: 'Absolutely stunning machine. Battery life is incredible.', date: '2025-04-20' }
        ]
      },
      {
        name: 'Samsung Galaxy Tab S9 FE 10.9" 6GB 128GB Wi-Fi',
        slug: 'samsung-galaxy-tab-s9-fe-wifi',
        brand: 'Samsung',
        category: 'tablet',
        price: 39999,
        originalPrice: 44999,
        discountPercent: 11,
        rating: 4.3,
        reviewsCount: 67,
        image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80',
        images: ['https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80'],
        inStock: true,
        stockCount: 18,
        isFeatured: false,
        isHotDeal: true,
        shortDescription: '10.9" WUXGA+ display, Exynos 1380, S Pen included, IP68',
        processor: 'Exynos 1380 Octa-core',
        ram: '6GB',
        storage: '128GB',
        display: '10.9" WUXGA+ 2304x1440 90Hz TFT',
        weight: '0.523 kg',
        warranty: '1 Year Samsung Official',
        color: 'Gray',
        battery: '8000mAh',
        os: 'Android 13 (One UI 5.1)',
        details: 'Galaxy Tab S9 FE brings the premium S series experience with IP68 water resistance, S Pen support, and a large 10.9-inch display perfect for creativity and entertainment.',
        qna: [],
        reviews: []
      },
      {
        name: 'HP Envy x360 2-in-1 14" Core i5 13th Gen Touchscreen',
        slug: 'hp-envy-x360-14-i5-13th',
        brand: 'HP',
        category: 'business-laptop',
        price: 82500,
        originalPrice: 89000,
        discountPercent: 7,
        rating: 4.6,
        reviewsCount: 45,
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
        images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80'],
        inStock: true,
        stockCount: 22,
        isFeatured: false,
        isHotDeal: false,
        shortDescription: 'Core i5-1335U, 8GB DDR4, 512GB NVMe, 14" FHD Touchscreen 360°',
        processor: 'Intel Core i5-1335U 10-core up to 4.6 GHz',
        ram: '8GB DDR4 3200MHz',
        storage: '512GB PCIe NVMe SSD',
        gpu: 'Intel Iris Xe Graphics',
        display: '14.0" FHD IPS Touchscreen (1920x1080)',
        weight: '1.52 kg',
        warranty: '2 Years Official HP Warranty',
        color: 'Natural Silver',
        os: 'Windows 11 Home',
        details: 'Work seamlessly wherever you are with a flexible 360-degree hinge, crystal clear 5MP camera, and responsive touchscreen display for ultimate versatility.',
        qna: [],
        reviews: []
      },
      {
        name: 'NVIDIA GeForce RTX 4060 Ti 8GB GDDR6 Graphics Card',
        slug: 'nvidia-rtx-4060-ti-8gb',
        brand: 'NVIDIA',
        category: 'graphics-card',
        price: 48500,
        originalPrice: 52000,
        discountPercent: 7,
        rating: 4.7,
        reviewsCount: 33,
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
        images: ['https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80'],
        inStock: true,
        stockCount: 10,
        isFeatured: false,
        isHotDeal: true,
        shortDescription: '8GB GDDR6, DLSS 3, Ray Tracing, PCIe 4.0, 165W TDP',
        gpu: 'NVIDIA GeForce RTX 4060 Ti',
        storage: '8GB GDDR6 VRAM',
        warranty: '3 Years NVIDIA Warranty',
        details: 'The RTX 4060 Ti is designed for 1080p and 1440p gaming with DLSS 3 frame generation and full hardware ray tracing support.',
        qna: [],
        reviews: []
      }
    ]
  });

  console.log('✅ Database seeded with', 6, 'products');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
