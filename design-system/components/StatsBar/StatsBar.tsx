import React from 'react';

export interface StatItem {
  label: string;
  value: React.ReactNode;
}

export interface StatsBarProps {
  /** Array of stat pairs to display */
  items: StatItem[];
  className?: string;
}

/**
 * Horizontal stats bar showing key numbers (active sources, articles/day, etc.).
 * Items are separated by · dividers.
 */
export const StatsBar: React.FC<StatsBarProps> = ({ items, className = '' }) => (
  <div
    role="status"
    aria-live="polite"
    className={[
      'flex items-center gap-2',
      'px-[14px] py-[10px]',
      'bg-surface-1 border border-border-subtle rounded-md',
      'font-mono text-caption tracking-[0.03em] text-text-secondary',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {items.map((item, i) => (
      <React.Fragment key={item.label}>
        {i > 0 && (
          <span className="text-text-muted" aria-hidden>
            ·
          </span>
        )}
        <span>
          {item.label}:{' '}
          <strong className="font-medium text-text-primary">{item.value}</strong>
        </span>
      </React.Fragment>
    ))}
  </div>
);
