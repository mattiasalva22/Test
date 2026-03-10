import React, { useState } from 'react';

export interface TooltipProps {
  /** Tooltip content */
  content: React.ReactNode;
  /** Element that triggers the tooltip */
  children: React.ReactElement;
  /** Position relative to trigger */
  position?: 'top' | 'bottom';
  className?: string;
}

/**
 * Contextual tooltip.
 * Used in the dashboard for "selected because of topic X" explanations.
 * Appears above the trigger by default.
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className = '',
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-block">
      {React.cloneElement(children, {
        onMouseEnter: () => setVisible(true),
        onMouseLeave: () => setVisible(false),
        onFocus:      () => setVisible(true),
        onBlur:       () => setVisible(false),
      })}

      {visible && (
        <div
          role="tooltip"
          className={[
            'absolute z-tooltip',
            'bg-surface-3 border border-border-default rounded-lg',
            'shadow-tooltip',
            'min-w-[220px]',
            'animate-fade-in',
            position === 'top'
              ? 'bottom-[calc(100%+10px)] left-[14px]'
              : 'top-[calc(100%+10px)] left-[14px]',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {/* Arrow */}
          <span
            aria-hidden
            className={[
              'absolute w-[9px] h-[9px]',
              'bg-surface-3',
              'border-r border-b border-border-default',
              'rotate-45 rounded-[1px]',
              position === 'top'
                ? 'bottom-[-5px] left-[18px]'
                : 'top-[-5px] left-[18px] rotate-[-135deg]',
            ].join(' ')}
          />
          {/* Body */}
          <div className="relative z-10 flex items-center gap-[7px] px-3 py-[9px] font-sans text-body-sm font-medium text-text-secondary">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Contextual tooltip that is always visible (dismissable).
 * Used as a one-time onboarding tooltip on the first article.
 */
export interface ContextualTooltipProps {
  content: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

export const ContextualTooltip: React.FC<ContextualTooltipProps> = ({
  content,
  onDismiss,
  className = '',
}) => (
  <div
    role="tooltip"
    className={[
      'absolute bottom-[calc(100%+10px)] left-[14px]',
      'bg-surface-3 border border-border-default rounded-lg',
      'z-tooltip shadow-tooltip min-w-[220px]',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {/* Arrow */}
    <span
      aria-hidden
      className="absolute bottom-[-5px] left-[18px] w-[9px] h-[9px] bg-surface-3 border-r border-b border-border-default rotate-45 rounded-[1px]"
    />
    {/* Body */}
    <div className="relative z-10 flex items-center gap-[7px] px-3 py-[9px] font-sans text-body-sm font-medium text-text-secondary">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden
        className="flex-shrink-0"
      >
        <circle
          cx="6"
          cy="6"
          r="5"
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />
        <path
          d="M6 4v2.5M6 8v.5"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex-1">{content}</span>
      {onDismiss && (
        <button
          type="button"
          aria-label="Chiudi tooltip"
          onClick={onDismiss}
          className="bg-transparent border-none text-text-muted text-[10px] cursor-pointer ml-auto p-0 leading-none hover:text-text-secondary transition-colors duration-100"
        >
          ✕
        </button>
      )}
    </div>
  </div>
);
