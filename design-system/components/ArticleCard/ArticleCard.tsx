import React from 'react';
import { ScoreBadge } from '../Badge/Badge';

export type ArticleCardVariant = 'default' | 'featured' | 'generic';

export interface ArticleCardProps {
  /** Article headline */
  title: string;
  /** Source name (e.g. "Corriere della Sera") */
  source: string;
  /** Category or topic label */
  category?: string;
  /** Relative time string (e.g. "1h fa") */
  time?: string;
  /** AI relevance score (0–100) */
  score?: number;
  /** Topic pill labels */
  topics?: string[];
  /** Visual variant */
  variant?: ArticleCardVariant;
  /** Click handler */
  onClick?: () => void;
  className?: string;
}

const variantClasses: Record<ArticleCardVariant, string> = {
  default:  'bg-surface-1 border border-border-faint hover:border-border-subtle',
  featured: 'bg-surface-2 border border-[rgba(255,255,255,0.20)] hover:border-border-default',
  generic:  'bg-surface-1 border border-border-faint opacity-50 hover:border-border-subtle',
};

/**
 * Article card for the feed view.
 * Variants: default | featured (highlighted first article) | generic (unsegmented feed).
 */
export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  source,
  category,
  time,
  score,
  topics = [],
  variant = 'default',
  onClick,
  className = '',
}) => (
  <article
    onClick={onClick}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
    onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick(); } : undefined}
    className={[
      'rounded-xl px-4 py-[14px]',
      'flex flex-col gap-1',
      'cursor-pointer transition-[border-color] duration-150',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-default',
      variantClasses[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {/* Score badge */}
    {score !== undefined && (
      <div className="mb-1">
        <ScoreBadge score={score} />
      </div>
    )}

    {/* Meta: category · time */}
    {(category || time) && (
      <div className="font-mono text-caption tracking-[0.03em] text-text-muted flex items-center gap-[5px] flex-wrap">
        {category && <span>{category}</span>}
        {category && time && <span>·</span>}
        {time && <span>{time}</span>}
      </div>
    )}

    {/* Title */}
    <h4 className="font-sans text-body font-medium text-text-primary leading-[1.45]">
      {title}
    </h4>

    {/* Source + topics */}
    <div className="flex items-center gap-[5px] flex-wrap mt-0.5">
      <span className="font-mono text-caption text-text-muted">{source}</span>
      {topics.map((topic) => (
        <span
          key={topic}
          className={[
            'bg-[rgba(255,255,255,0.06)] border border-border-subtle',
            'rounded-full px-[7px] py-[1px]',
            'font-mono text-caption-sm tracking-[0.04em] text-text-secondary',
          ].join(' ')}
        >
          {topic}
        </span>
      ))}
    </div>
  </article>
);
