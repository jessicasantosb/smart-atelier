import { Title } from '@solidjs/meta';
import { ButtonLink } from '../lib/components/ui/button';

export function NotFoundPage(props: { message?: string }) {
  return (
    <>
      <Title>Page not found — Smart Atelier</Title>
      <section class="mx-auto max-w-2xl py-16">
        <p class="text-sm text-slate-600">Not found</p>
        <h1 class="mt-3 text-4xl font-medium tracking-tight">This page is not here.</h1>
        <p class="mt-4 leading-7 text-slate-600">
          {props.message ?? 'The shop, piece, or order may have moved.'}
        </p>
        <ButtonLink href="/" class="mt-7">
          Return to the marketplace
        </ButtonLink>
      </section>
    </>
  );
}
