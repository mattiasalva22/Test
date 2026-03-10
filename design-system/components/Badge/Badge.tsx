import React from 'react';

export type BadgeVariant =
  | 'success'    // green — RSS verified, feed personalized
  | 'warning'    // amber — counter warn, topic count
  | 'info'       // blue — score-mid
  | 'muted'      // grey — score-ok, feed generic
  | 'error'      // red — negative
  | 'outline';   // transparent with border — config-tag, topic-pill

export interface BadgeProps {
  /** Visual style */
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-success-bg text-success border border-success-border',
  warning: 'bg-amber-bg-md text-amber border border-amber-border',
  info:    'bg-info-bg text-info border border-info-border',
  muted:   'bg-surface-3 text-text-muted border border-border-subtle',
  error:   'bg-error-bg text-error border border-error-border',
  outline: 'bg-[rgba(255,255,255,0.06)] text-text-secondary border border-border-subtle',
};

/**
 * Small inline badge for statuses, counts, and category labels.
 * Used as: RSS badge, feed status badge, score indicator, counter.
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'muted',
  children,
  className = '',
}) => (
  <span
    className={[
      'inline-flex items-center justify-center',
      'font-mono text-caption-sm font-medium tracking-[0.04em] uppercase',
      'rounded-full px-[7px] py-[2px]',
      'whitespace-nowrap',
      variantClasses[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {children}
  </span>
);

/**
 * Score badge with numeric relevance % indicator.
 * Applies variant based on score threshold automatically.
 */
export interface ScoreBadgeProps {
  /** Score between 0–100 */
  score: number;
  className?: string;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score, className = '' }) => {
  const variant: BadgeVariant =
    score >= 90 ? 'success' : score >= 85 ? 'info' : 'muted';

  return (
    <Badge variant={variant} className={className}>
      ★ {score}%
    </Badge>
  );
};
