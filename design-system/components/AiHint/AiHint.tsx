import React from 'react';

export type AiHintVariant = 'amber' | 'info' | 'success' | 'error';

export interface AiHintProps {
  /** Content to display */
  children: React.ReactNode;
  /** Visual style */
  variant?: AiHintVariant;
  /** Whether to show the icon */
  showIcon?: boolean;
  className?: string;
}

const variantStyles: Record<
  AiHintVariant,
  { wrapper: string; iconStroke: string; iconFill: string }
> = {
  amber: {
    wrapper: 'bg-amber-bg-md border border-amber-border text-amber-text',
    iconStroke: 'rgba(212,137,10,0.5)',
    iconFill: 'rgba(212,137,10,0.1)',
  },
  info: {
    wrapper: 'bg-info-bg border border-info-border text-info',
    iconStroke: 'rgba(147,197,253,0.5)',
    iconFill: 'rgba(147,197,253,0.1)',
  },
  success: {
    wrapper: 'bg-success-bg border border-success-border text-success',
    iconStroke: 'rgba(74,222,128,0.5)',
    iconFill: 'rgba(74,222,128,0.1)',
  },
  error: {
    wrapper: 'bg-error-bg border border-error-border text-error',
    iconStroke: 'rgba(248,113,113,0.5)',
    iconFill: 'rgba(248,113,113,0.1)',
  },
};

const InfoCircleIcon: React.FC<{ stroke: string; fill: string }> = ({
  stroke,
  fill,
}) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="flex-shrink-0 mt-[1px]"
    aria-hidden
  >
    <circle cx="8" cy="8" r="7" fill={fill} stroke={stroke} strokeWidth="1.2" />
    <path
      d="M8 5v3.5M8 10.5v.5"
      stroke={stroke}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Ambient AI hint / info box.
 * Used for contextual AI feedback (article estimates, topic hints).
 * Variants: amber (default — AI context), info, success, error.
 */
export const AiHint: React.FC<AiHintProps> = ({
  children,
  variant = 'amber',
  showIcon = true,
  className = '',
}) => {
  const styles = variantStyles[variant];

  return (
    <div
      role="note"
      className={[
        'flex items-start gap-2 rounded-md px-3 py-[10px]',
        'font-sans text-body-sm leading-[1.55]',
        styles.wrapper,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {showIcon && (
        <InfoCircleIcon stroke={styles.iconStroke} fill={styles.iconFill} />
      )}
      <div>{children}</div>
    </div>
  );
};
