import React from 'react';
import { Badge } from '../Badge/Badge';

export interface SourceRowProps {
  /** Source name */
  name: string;
  /** Emoji or icon character */
  icon?: string;
  /** Whether the source is currently selected */
  checked?: boolean;
  /** Called when checkbox changes */
  onChange?: (checked: boolean) => void;
  /** Whether the source has a verified RSS feed */
  hasRss?: boolean;
  /** Custom badge label */
  badge?: string;
  className?: string;
}

/**
 * Single row in the sources list (Step 3).
 * Checkbox + icon + name + optional RSS/status badge.
 */
export const SourceRow: React.FC<SourceRowProps> = ({
  name,
  icon,
  checked = false,
  onChange,
  hasRss = false,
  badge,
  className = '',
}) => {
  const id = `source-${name.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <label
      htmlFor={id}
      className={[
        'flex items-center gap-[10px]',
        'px-[14px] py-[11px]',
        'border-b border-border-faint last:border-b-0',
        'cursor-pointer transition-colors duration-[120ms]',
        'hover:bg-surface-2',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="w-[15px] h-[15px] accent-white cursor-pointer flex-shrink-0"
      />
      {icon && (
        <span className="text-[13px] flex-shrink-0" aria-hidden>
          {icon}
        </span>
      )}
      <span className="flex-1 font-sans text-body font-medium text-text-primary">
        {name}
      </span>
      {(hasRss || badge) && (
        <Badge variant="success">
          {badge ?? 'RSS ✓'}
        </Badge>
      )}
    </label>
  );
};
