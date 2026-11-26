import { Title } from '@solidjs/meta';
import { useParams } from '@solidjs/router';
import { createMemo, Show } from 'solid-js';
import { ButtonLink } from '../lib/components/ui/button';
import { findProductBySlug, findShopBySlug, formatPrice } from '../lib/prototype/mock-data';
import { NotFoundPage } from './NotFoundPage';

export function ProductPage() {
  const params = useParams();
  const listing = createMemo(() => {
    const product = findProductBySlug(params.slug ?? '');
    const shop = product && findShopBySlug(product.shopSlug);
    return product && shop ? { product, shop } : undefined;
  });

  return (
    <Show when={listing()} keyed fallback={<NotFoundPage message="Product not found" />}>
      {(item) => (
        <>
          <Title>{`${item.product.title} — ${item.shop.name}`}</Title>
          <div class="mb-6">
            <a
              href={`/loja/${item.shop.slug}`}
              class="text-sm text-slate-600 underline underline-offset-4"
            >
              Back to {item.shop.name}
            </a>
          </div>
          <article class="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div class="relative bg-[#dbe2de]">
              <img
                src={item.product.image}
                alt="Sculptural blue stoneware vase made by hand"
                class="aspect-[4/4.2] w-full object-cover"
              />
              <span class="absolute bottom-4 left-4 bg-white/90 px-3 py-2 text-sm">
                A one-of-a-kind piece
              </span>
            </div>
            <div class="flex flex-col py-2 lg:py-10">
              <p class="text-sm text-slate-600">Handmade in {item.shop.location}</p>
              <h1 class="mt-3 text-4xl leading-tight font-medium tracking-tight sm:text-5xl">
                {item.product.title}
              </h1>
              <a
                href={`/loja/${item.shop.slug}`}
                class="mt-3 w-fit text-[#2856D8] underline underline-offset-4"
              >
                by {item.shop.name}
              </a>
              <p class="mt-7 text-2xl font-medium">{formatPrice(item.product.priceInCents)}</p>
              <p class="mt-2 text-sm text-slate-600">One piece available</p>
              <ButtonLink href="/checkout/entrar" size="lg" class="mt-6 w-full sm:w-fit">
                Buy this piece
              </ButtonLink>
              <div class="mt-10 border-t border-slate-300 pt-6">
                <h2 class="text-lg font-medium">About this piece</h2>
                <p class="mt-3 leading-7 text-slate-600">{item.product.description}</p>
                <dl class="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 text-sm">
                  <div>
                    <dt class="text-slate-500">Materials</dt>
                    <dd class="mt-1">{item.product.materials.join(', ')}</dd>
                  </div>
                  <div>
                    <dt class="text-slate-500">Technique</dt>
                    <dd class="mt-1">{item.product.technique}</dd>
                  </div>
                  <div>
                    <dt class="text-slate-500">Dimensions</dt>
                    <dd class="mt-1">{item.product.dimensions}</dd>
                  </div>
                  <div>
                    <dt class="text-slate-500">Availability</dt>
                    <dd class="mt-1">Ready to ship</dd>
                  </div>
                </dl>
              </div>
            </div>
          </article>
        </>
      )}
    </Show>
  );
}
