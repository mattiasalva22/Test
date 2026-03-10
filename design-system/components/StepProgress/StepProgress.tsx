import React from 'react';

export interface StepProgressProps {
  /** Total number of steps */
  total: number;
  /** Current step (1-indexed) */
  current: number;
  /** Whether the last step is partially complete */
  halfLast?: boolean;
  className?: string;
}

/**
 * Wizard step progress indicator.
 * Renders dots connected by lines, with active/inactive/half states.
 */
export const StepProgress: React.FC<StepProgressProps> = ({
  total,
  current,
  halfLast = false,
  className = '',
}) => {
  return (
    <div className={['flex flex-col items-center gap-[5px]', className].join(' ')}>
      <div className="flex items-center">
        {Array.from({ length: total }).map((_, i) => {
          const stepNumber = i + 1;
          const isActive   = stepNumber <= current;
          const isHalf     = halfLast && stepNumber === total && stepNumber === current;
          const isLast     = i === total - 1;

          return (
            <React.Fragment key={i}>
              {/* Dot */}
              <span
                aria-label={`Step ${stepNumber}${isActive ? ' completato' : ''}`}
                className={[
                  'w-2 h-2 rounded-full border-[1.5px] transition-all duration-200',
                  isHalf
                    ? 'border-border-default'
                    : isActive
                    ? 'bg-text-primary border-text-primary'
                    : 'bg-transparent border-border-default',
                ].join(' ')}
                style={
                  isHalf
                    ? {
                        background:
                          'linear-gradient(90deg, #FFFFFF 50%, transparent 50%)',
                      }
                    : undefined
                }
              />
              {/* Connector line (not after last dot) */}
              {!isLast && (
                <span
                  className={[
                    'w-[18px] h-px transition-all duration-200',
                    stepNumber < current
                      ? 'bg-[rgba(255,255,255,0.30)]'
                      : 'bg-border-subtle',
                  ].join(' ')}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <span className="font-mono text-caption-sm tracking-[0.06em] uppercase text-text-muted">
        Step {current} di {total}
      </span>
    </div>
  );
};
