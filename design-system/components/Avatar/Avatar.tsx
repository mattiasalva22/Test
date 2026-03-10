import React from 'react';

export interface AvatarProps {
  /** Initials to display (1–2 characters) */
  initials: string;
  /** Accessible label (e.g. user's full name) */
  'aria-label'?: string;
  className?: string;
}

/**
 * User avatar showing initials.
 * Used in the dashboard topbar.
 */
export const Avatar: React.FC<AvatarProps> = ({
  initials,
  'aria-label': ariaLabel,
  className = '',
}) => (
  <div
    role="img"
    aria-label={ariaLabel ?? initials}
    className={[
      'w-7 h-7 rounded-full',
      'bg-surface-3 border border-border-default',
      'flex items-center justify-center',
      'font-mono text-caption font-medium text-text-primary',
      'flex-shrink-0',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {initials.slice(0, 2).toUpperCase()}
  </div>
);
