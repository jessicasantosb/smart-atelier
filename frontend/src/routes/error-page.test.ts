import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vite-plus/test';
import ErrorPage from './+error.svelte';

describe('error page', () => {
  it('provides a way back when a record is not found', () => {
    render(ErrorPage, { props: { error: Object.assign(new Error('Not found'), { status: 404 }) } });
    expect(screen.getByRole('heading', { name: 'This page is not here.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Return to the marketplace' })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
