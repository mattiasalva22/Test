import React from 'react';

export interface BannerProps {
  /** Main title of the banner */
  title: string;
  /** Subtitle / supporting text */
  subtitle?: string;
  /** CTA button label */
  ctaLabel?: string;
  /** CTA button click handler */
  onCta?: () => void;
  /** Called when the banner is dismissed */
  onDismiss?: () => void;
  className?: string;
}

const InfoIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="flex-shrink-0 mt-px"
    aria-hidden
  >
    <circle
      cx="8"
      cy="8"
      r="7"
      fill="rgba(212,137,10,0.1)"
      stroke="rgba(212,137,10,0.4)"
      strokeWidth="1.2"
    />
    <path
      d="M8 5v3.5M8 10.5v.5"
      stroke="rgba(212,137,10,0.7)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Persistent amber info banner.
 * Used on the dashboard skip state to prompt feed configuration.
 */
export const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  ctaLabel,
  onCta,
  onDismiss,
  className = '',
}) => (
  <div
    role="alert"
    className={[
      'flex items-center gap-3 px-5 py-3',
      'bg-amber-bg border-b border-amber-border-md',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {/* Left: icon + text */}
    <div className="flex items-start gap-[10px] flex-1">
      <InfoIcon />
      <div className="flex flex-col gap-0.5">
        <span className="font-sans text-body font-medium text-text-primary">
          {title}
        </span>
        {subtitle && (
          <span className="font-mono text-caption tracking-[0.03em] text-amber opacity-80">
            {subtitle}
          </span>
        )}
      </div>
    </div>

    {/* CTA */}
    {ctaLabel && onCta && (
      <button
        type="button"
        onClick={onCta}
        className={[
          'flex-shrink-0',
          'bg-amber-bg-strong border border-amber-border-md text-amber',
          'rounded-full px-[14px] py-[6px]',
          'font-mono text-caption tracking-[0.04em]',
          'cursor-pointer whitespace-nowrap transition-all duration-150',
          'hover:bg-[rgba(212,137,10,0.22)]',
        ].join(' ')}
      >
        {ctaLabel}
      </button>
    )}

    {/* Dismiss */}
    {onDismiss && (
      <button
        type="button"
        aria-label="Chiudi banner"
        onClick={onDismiss}
        className={[
          'flex-shrink-0 bg-transparent border-none',
          'text-text-muted text-body-sm cursor-pointer',
          'p-1 rounded-[4px] transition-colors duration-150',
          'hover:text-text-secondary',
        ].join(' ')}
      >
        ✕
      </button>
    )}
  </div>
);
