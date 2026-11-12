import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vite-plus/test';
import NewPiecePage from './+page.svelte';

describe('new piece editor', () => {
  it('labels the example as simulated and offers an explicit preview action', () => {
    render(NewPiecePage);
    expect(screen.getByText('Simulated AI draft')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Review simulated draft' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Open public preview' })).toHaveAttribute(
      'href',
      '/produto/blue-ceramic-vase',
    );
  });
});
