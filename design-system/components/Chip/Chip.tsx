import React from 'react';

export interface ChipProps {
  /** Label text of the chip */
  label: string;
  /** Called when the remove (×) button is clicked */
  onRemove?: () => void;
  className?: string;
}

/**
 * Selected-topic chip with remove button.
 * Used in the "selected topics" area of Step 2.
 */
export const Chip: React.FC<ChipProps> = ({ label, onRemove, className = '' }) => (
  <span
    className={[
      'inline-flex items-center gap-[7px]',
      'bg-surface-2 border border-border-strong rounded-full',
      'px-[11px] py-1',
      'font-sans text-body-sm font-medium text-text-primary',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {label}
    {onRemove && (
      <button
        type="button"
        aria-label={`Rimuovi ${label}`}
        onClick={onRemove}
        className={[
          'bg-transparent border-none p-0 leading-none cursor-pointer',
          'text-text-muted text-[11px]',
          'transition-colors duration-100',
          'hover:text-error',
        ].join(' ')}
      >
        ✕
      </button>
    )}
  </span>
);
