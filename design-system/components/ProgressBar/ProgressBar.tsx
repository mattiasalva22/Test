import React from 'react';

export interface ProgressBarProps {
  /** Progress value between 0 and 100 */
  value: number;
  /** Whether to show percentage text below */
  showLabel?: boolean;
  className?: string;
}

/**
 * Linear progress bar used in the loading/processing step.
 * Thin 3px track with smooth transition on value change.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  showLabel = false,
  className = '',
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={['w-full flex flex-col gap-[6px]', className].join(' ')}>
      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        className="w-full h-[3px] bg-surface-3 rounded-full overflow-hidden"
      >
        <div
          className="h-full bg-text-primary rounded-full transition-[width] duration-300 ease-in-out"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <span className="font-mono text-caption text-text-secondary text-center tracking-[0.06em]">
          {Math.round(clampedValue)}%
        </span>
      )}
    </div>
  );
};
