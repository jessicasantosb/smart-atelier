export type Shop = {
  slug: string;
  name: string;
  description: string;
  location: string;
  productSlug: string;
};

export type Product = {
  slug: string;
  shopSlug: string;
  title: string;
  description: string;
  materials: string[];
  technique: string;
  dimensions: string;
  priceInCents: number;
  currency: 'BRL';
  quantityAvailable: number;
  image: string;
};

export type DemoOrder = {
  id: string;
  productSlug: string;
  status: 'transferred';
  steps: string[];
};

const shop: Shop = {
  slug: 'cera-atelier',
  name: 'Cera Atelier',
  description: 'Small-batch ceramics shaped slowly in a sunlit studio.',
  location: 'São Paulo, Brazil',
  productSlug: 'blue-ceramic-vase',
};

const product: Product = {
  slug: 'blue-ceramic-vase',
  shopSlug: shop.slug,
  title: 'Tidal blue vase',
  description:
    'A one-of-a-kind stoneware vase with a quiet blue glaze. Each curve is shaped by hand, then fired twice for a soft, tactile finish.',
  materials: ['Stoneware clay', 'Mineral glaze'],
  technique: 'Wheel-thrown and hand-glazed',
  dimensions: '22 × 14 cm',
  priceInCents: 24000,
  currency: 'BRL',
  quantityAvailable: 1,
  image: '/prototype/blue-ceramic-vase.svg',
};

const order: DemoOrder = {
  id: 'pedido-demo',
  productSlug: product.slug,
  status: 'transferred',
  steps: ['Payment confirmed', 'Package shipped', 'Delivered', 'Test transfer initiated'],
};

export function findShopBySlug(slug: string): Shop | undefined {
  return slug === shop.slug ? shop : undefined;
}

export function findProductBySlug(slug: string): Product | undefined {
  return slug === product.slug ? product : undefined;
}

export function findOrderById(id: string): DemoOrder | undefined {
  return id === order.id ? order : undefined;
}

export const demoShop = shop;
export const demoProduct = product;
export const demoOrder = order;

export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    priceInCents / 100,
  );
}
