import { createRouter, memoryHistory } from '@solidjs/router';
import { type JSX, render as mount } from '@solidjs/web';
import type { Component } from 'solid-js';
import { afterEach } from 'vite-plus/test';

export { screen, waitFor } from '@testing-library/dom';

const cleanups: (() => void)[] = [];

afterEach(() => {
  for (const cleanup of cleanups.splice(0)) cleanup();
});

export function render(component: () => JSX.Element) {
  const container = document.createElement('div');
  document.body.append(container);
  const dispose = mount(component, container);
  cleanups.push(() => {
    dispose();
    container.remove();
  });
}

export function renderRoute(path: string, component: Component, initialUrl: string) {
  const Router = createRouter({
    routes: [{ path, component }],
    history: memoryHistory(initialUrl),
  });
  render(() => <Router />);
}
