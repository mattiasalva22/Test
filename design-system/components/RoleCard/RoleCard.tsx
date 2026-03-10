import React from 'react';

export interface RoleCardProps {
  /** Role name */
  label: string;
  /** Emoji or icon */
  icon?: string;
  /** Whether this card is currently selected */
  selected?: boolean;
  /** Called when card is clicked */
  onSelect?: () => void;
  className?: string;
}

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path
      d="M2 6l3 3 5-5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Selectable role card for Step 1 (profile selection).
 * Single-select: only one card can be selected at a time.
 */
export const RoleCard: React.FC<RoleCardProps> = ({
  label,
  icon,
  selected = false,
  onSelect,
  className = '',
}) => (
  <div
    role="radio"
    aria-checked={selected}
    tabIndex={0}
    onClick={onSelect}
    onKeyDown={(e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        onSelect?.();
      }
    }}
    className={[
      'relative flex flex-col gap-[6px]',
      'rounded-lg px-[14px] py-4',
      'cursor-pointer transition-all duration-150',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-default',
      selected
        ? 'bg-surface-2 border border-border-selected'
        : 'bg-surface-2 border border-border-subtle hover:border-border-default hover:bg-surface-3',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {/* Selected checkmark */}
    {selected && (
      <span
        className={[
          'absolute top-[10px] right-[10px]',
          'w-4 h-4 rounded-full',
          'bg-text-primary text-bg',
          'flex items-center justify-center',
        ].join(' ')}
      >
        <CheckIcon />
      </span>
    )}

    {icon && <span className="text-[18px] leading-none">{icon}</span>}
    <span
      className="font-sans text-body-sm font-medium text-text-primary leading-[1.35]"
      dangerouslySetInnerHTML={{ __html: label.replace('\n', '<br/>') }}
    />
  </div>
);
