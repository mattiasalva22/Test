import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
export type ButtonSize    = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Shows a spinning loader and disables interaction */
  loading?: boolean;
  /** Icon to render after the label */
  iconRight?: React.ReactNode;
  /** Icon to render before the label */
  iconLeft?: React.ReactNode;
  /** Stretches the button to full width of its container */
  fullWidth?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-[7px] font-sans font-semibold ' +
  'cursor-pointer select-none transition-all duration-150 ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-default focus-visible:outline-offset-2 ' +
  'disabled:cursor-not-allowed active:scale-[0.98]';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-text border-none rounded-xl ' +
    'hover:bg-primary-hover ' +
    'disabled:bg-surface-3 disabled:text-text-muted disabled:hover:bg-surface-3',
  secondary:
    'bg-transparent text-text-secondary border border-border-subtle rounded-xl ' +
    'hover:border-border-default hover:text-text-primary ' +
    'disabled:opacity-40 disabled:hover:border-border-subtle disabled:hover:text-text-secondary',
  ghost:
    'bg-transparent border-none text-text-muted rounded-full ' +
    'hover:text-text-secondary ' +
    'disabled:opacity-40',
  link:
    'bg-transparent border-none text-text-muted font-mono text-caption tracking-[0.04em] ' +
    'underline p-0 h-auto ' +
    'hover:text-text-secondary ' +
    'disabled:opacity-40',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'text-body-sm px-[14px] py-[6px]',
  md: 'text-body px-[18px] py-[11px]',
  lg: 'text-body-lg px-6 py-[14px] w-full',
};

/**
 * Primary interactive element for Sapra.AI.
 * Supports four visual variants: primary (CTA), secondary (outlined), ghost, link.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      iconRight,
      iconLeft,
      fullWidth = false,
      children,
      disabled,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          base,
          variants[variant],
          sizes[size],
          fullWidth ? 'w-full' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {loading ? (
          <svg
            className="animate-spin"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden
          >
            <circle cx="7" cy="7" r="6" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
            <path
              d="M7 1a6 6 0 0 1 6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          iconLeft
        )}
        {children}
        {!loading && iconRight}
      </button>
    );
  },
);

Button.displayName = 'Button';
