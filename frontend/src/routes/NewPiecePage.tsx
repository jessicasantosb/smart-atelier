import { Title } from '@solidjs/meta';
import { createSignal, Show } from 'solid-js';
import { Button, ButtonLink } from '../lib/components/ui/button';
import { demoProduct, formatPrice } from '../lib/prototype/mock-data';

export function NewPiecePage() {
  const [draftReviewed, setDraftReviewed] = createSignal(false);

  return (
    <>
      <Title>Prepare a piece — Smart Atelier</Title>
      <div class="mx-auto max-w-5xl">
        <a href="/atelier" class="text-sm text-slate-600 underline underline-offset-4">
          Back to your studio
        </a>
        <div class="mt-5 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p class="mb-2 text-sm text-slate-600">Piece details</p>
            <h1 class="text-4xl font-medium tracking-tight">Tell its story.</h1>
            <div class="mt-6 overflow-hidden bg-[#dbe2de]">
              <img
                src={demoProduct.image}
                alt="Blue stoneware vase product preview"
                class="aspect-[4/4.5] w-full object-cover"
              />
            </div>
            <p class="mt-3 text-sm text-slate-500">Illustrative photo for this prototype</p>
          </div>
          <form class="space-y-5 bg-white p-5 sm:p-8" onSubmit={(event) => event.preventDefault()}>
            <div class="border-l-2 border-[#2856D8] bg-blue-50 p-4">
              <p class="font-medium">Simulated AI draft</p>
              <p class="mt-1 text-sm text-slate-600">
                Review and edit this example. It was not generated or saved.
              </p>
            </div>
            <label class="block text-sm font-medium">
              Title
              <input
                class="mt-2 w-full border border-slate-300 bg-white px-3 py-2.5 font-normal"
                value={demoProduct.title}
              />
            </label>
            <label class="block text-sm font-medium">
              Description
              <textarea
                class="mt-2 min-h-28 w-full border border-slate-300 bg-white px-3 py-2.5 font-normal"
                value={demoProduct.description}
              />
            </label>
            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block text-sm font-medium">
                Materials
                <input
                  class="mt-2 w-full border border-slate-300 bg-white px-3 py-2.5 font-normal"
                  value={demoProduct.materials.join(', ')}
                />
              </label>
              <label class="block text-sm font-medium">
                Technique
                <input
                  class="mt-2 w-full border border-slate-300 bg-white px-3 py-2.5 font-normal"
                  value={demoProduct.technique}
                />
              </label>
              <label class="block text-sm font-medium">
                Dimensions
                <input
                  class="mt-2 w-full border border-slate-300 bg-white px-3 py-2.5 font-normal"
                  value={demoProduct.dimensions}
                />
              </label>
              <label class="block text-sm font-medium">
                Price
                <input
                  class="mt-2 w-full border border-slate-300 bg-white px-3 py-2.5 font-normal"
                  value={formatPrice(demoProduct.priceInCents)}
                />
              </label>
              <label class="block text-sm font-medium">
                Available quantity
                <input
                  class="mt-2 w-full border border-slate-300 bg-white px-3 py-2.5 font-normal"
                  type="number"
                  value={demoProduct.quantityAvailable}
                />
              </label>
            </div>
            <div class="flex flex-wrap gap-3 border-t border-slate-200 pt-5">
              <Button type="button" variant="outline" onClick={() => setDraftReviewed(true)}>
                Review simulated draft
              </Button>
              <ButtonLink href="/produto/blue-ceramic-vase">Open public preview</ButtonLink>
            </div>
            <Show when={draftReviewed()}>
              <p role="status" class="text-sm text-emerald-800">
                Example draft reviewed. No changes were saved.
              </p>
            </Show>
          </form>
        </div>
      </div>
    </>
  );
}
