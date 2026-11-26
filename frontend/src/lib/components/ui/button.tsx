import type { JSX } from '@solidjs/web';
import { twMerge } from 'tailwind-merge';

type ButtonAppearance = {
  children?: JSX.Element;
  class?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
};

const variants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/80',
  outline: 'border-border bg-background shadow-xs hover:bg-muted hover:text-foreground',
  ghost: 'hover:bg-muted hover:text-foreground',
};

const sizes = {
  default: 'h-9 gap-1.5 px-2.5',
  sm: 'h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5',
  lg: 'h-10 gap-1.5 px-2.5',
};

function buttonClass(props: ButtonAppearance) {
  return twMerge(
    'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-clip-padding text-sm font-medium transition-colors active:translate-y-px disabled:pointer-events-none disabled:opacity-50',
    variants[props.variant ?? 'default'],
    sizes[props.size ?? 'default'],
    props.class,
  );
}

export function ButtonLink(props: ButtonAppearance & { href: string }) {
  return (
    <a href={props.href} class={buttonClass(props)}>
      {props.children}
    </a>
  );
}

export function Button(
  props: ButtonAppearance & {
    type?: 'button' | 'submit' | 'reset';
    onClick?: JSX.EventHandler<HTMLButtonElement, MouseEvent>;
  },
) {
  return (
    <button type={props.type ?? 'button'} onClick={props.onClick} class={buttonClass(props)}>
      {props.children}
    </button>
  );
}
