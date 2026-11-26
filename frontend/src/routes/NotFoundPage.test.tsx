import { render, screen } from '../test-utils';
import { describe, expect, it } from 'vite-plus/test';
import { NotFoundPage } from './NotFoundPage';

describe('error page', () => {
  it('provides a way back when a record is not found', () => {
    render(() => <NotFoundPage message="Not found" />);
    expect(screen.getByRole('heading', { name: 'This page is not here.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Return to the marketplace' })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
