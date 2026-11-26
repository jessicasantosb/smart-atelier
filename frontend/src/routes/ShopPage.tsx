import { Title } from '@solidjs/meta';
import { useParams } from '@solidjs/router';
import { Show } from 'solid-js';
import { ButtonLink } from '../lib/components/ui/button';
import { demoProduct, findShopBySlug, formatPrice } from '../lib/prototype/mock-data';
import { NotFoundPage } from './NotFoundPage';

export function ShopPage() {
  const params = useParams();
  const shop = () => findShopBySlug(params.slug ?? '');

  return (
    <Show when={shop()} keyed fallback={<NotFoundPage message="Shop not found" />}>
      {(item) => (
        <>
          <Title>{`${item.name} — Smart Atelier`}</Title>
          <div class="mb-8 border-b border-slate-300 pb-8">
            <a href="/" class="text-sm text-slate-600 underline underline-offset-4">
              All makers
            </a>
            <div class="mt-8 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p class="text-sm text-slate-600">Independent maker · {item.location}</p>
                <h1 class="mt-2 text-5xl font-medium tracking-tight">{item.name}</h1>
                <p class="mt-4 max-w-xl text-lg leading-8 text-slate-600">{item.description}</p>
              </div>
              <span class="text-sm text-slate-600">One piece in the studio</span>
            </div>
          </div>
          <section
            aria-labelledby="pieces-heading"
            class="grid gap-7 md:grid-cols-[minmax(0,1fr)_0.7fr] md:items-center"
          >
            <a href={`/produto/${demoProduct.slug}`} class="group block bg-[#dbe2de]">
              <img
                src={demoProduct.image}
                alt="Sculptural blue stoneware vase"
                class="aspect-[4/3] w-full object-cover"
              />
            </a>
            <div class="py-4">
              <h2 id="pieces-heading" class="text-sm text-slate-500">
                The first piece
              </h2>
              <h3 class="mt-3 text-3xl font-medium">{demoProduct.title}</h3>
              <p class="mt-3 leading-7 text-slate-600">{demoProduct.description}</p>
              <p class="mt-5 text-xl font-medium">{formatPrice(demoProduct.priceInCents)}</p>
              <ButtonLink href={`/produto/${demoProduct.slug}`} class="mt-5" size="lg">
                View piece details
              </ButtonLink>
            </div>
          </section>
        </>
      )}
    </Show>
  );
}
