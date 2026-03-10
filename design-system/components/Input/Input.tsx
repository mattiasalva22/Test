import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional label rendered above the input */
  label?: string;
  /** Error message — shown below the input in red */
  error?: string;
  /** Hint text — shown below input when no error */
  hint?: string;
}

/**
 * Text input following Sapra.AI dark design language.
 * Background: surface-2, border-subtle → border-default on focus.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = '', id, ...rest }, ref) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-[6px] w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="font-mono text-label font-medium tracking-[0.08em] uppercase text-text-secondary"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            'w-full bg-surface-2 border rounded-lg px-[14px] py-3',
            'font-sans text-body text-text-primary',
            'placeholder:text-text-muted',
            'outline-none transition-colors duration-150',
            error
              ? 'border-error focus:border-error'
              : 'border-border-subtle focus:border-border-default',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...rest}
        />
        {error && (
          <span className="font-mono text-caption text-error">{error}</span>
        )}
        {!error && hint && (
          <span className="font-mono text-caption text-text-muted">{hint}</span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
