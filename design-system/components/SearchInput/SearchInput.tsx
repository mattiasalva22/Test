import React from 'react';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Custom search icon — defaults to magnifying glass */
  icon?: React.ReactNode;
}

const DefaultSearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <circle cx="7" cy="7" r="5" stroke="#9CA3AF" strokeWidth="1.5" />
    <path d="M11 11l3 3" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Search input with leading icon.
 * Used in Step 2 (topic search) and any search context.
 */
export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ icon, className = '', ...rest }, ref) => (
    <div
      className={[
        'flex items-center gap-[10px]',
        'bg-surface-2 border border-border-subtle rounded-lg px-[14px] py-[11px]',
        'transition-colors duration-150',
        'focus-within:border-border-default',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {icon ?? <DefaultSearchIcon />}
      <input
        ref={ref}
        type="search"
        className={[
          'flex-1 bg-transparent border-none outline-none',
          'font-sans text-body text-text-primary',
          'placeholder:text-text-muted',
        ].join(' ')}
        {...rest}
      />
    </div>
  ),
);

SearchInput.displayName = 'SearchInput';
