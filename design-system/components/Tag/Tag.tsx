import React from 'react';

export type TagVariant = 'default' | 'ghost';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Whether the tag is in selected state */
  selected?: boolean;
  /** Visual variant: default (filled surface) or ghost (dashed border) */
  variant?: TagVariant;
  /** Callback when tag is clicked to toggle selection */
  onToggle?: () => void;
}

/**
 * Selectable pill tag used for topic/category selection.
 * Variants: default (surface-2 bg) | ghost (dashed, transparent).
 */
export const Tag: React.FC<TagProps> = ({
  selected = false,
  variant = 'default',
  onToggle,
  children,
  className = '',
  onClick,
  ...rest
}) => {
  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    onToggle?.();
    onClick?.(e);
  };

  return (
    <span
      role="checkbox"
      aria-checked={selected}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onToggle?.();
        }
      }}
      className={[
        'inline-flex items-center rounded-full px-[13px] py-[5px]',
        'font-sans text-body-sm font-medium',
        'cursor-pointer select-none transition-all duration-150',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-default',
        variant === 'ghost'
          ? 'bg-transparent border border-dashed border-border-subtle text-text-secondary hover:border-border-default hover:text-text-primary'
          : selected
          ? 'bg-surface-3 border border-border-selected text-text-primary'
          : 'bg-surface-2 border border-border-subtle text-text-secondary hover:border-border-default hover:text-text-primary',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </span>
  );
};
