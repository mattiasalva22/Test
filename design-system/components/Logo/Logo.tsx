import React from 'react';

export type LogoSize = 'sm' | 'md' | 'lg';

export interface LogoProps {
  size?: LogoSize;
  className?: string;
}

const sizes: Record<LogoSize, { text: string; ai: string; icon: number }> = {
  sm: { text: 'text-[17px]', ai: 'text-[14px]', icon: 20 },
  md: { text: 'text-[20px]', ai: 'text-[17px]', icon: 26 },
  lg: { text: 'text-[24px]', ai: 'text-[20px]', icon: 32 },
};

/**
 * Sapra.AI logotype: SVG mark + "Sapra" in Playfair Display + ".ai" in secondary.
 */
export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const s = sizes[size];

  return (
    <div
      className={[
        'flex items-center gap-[9px]',
        'font-serif font-normal text-text-primary tracking-[-0.01em]',
        s.text,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span
        className="flex items-center justify-center flex-shrink-0"
        style={{ width: s.icon + 2, height: s.icon + 2 }}
        aria-hidden
      >
        <svg
          width={s.icon}
          height={s.icon}
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="13"
            cy="13"
            r="11.5"
            stroke="white"
            strokeWidth="0.8"
            opacity="0.3"
          />
          <path
            d="M13 3.5C13 3.5 19.5 5 20.5 11C21.5 17 16 20.5 13 20.5"
            stroke="white"
            strokeWidth="1.1"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M13 3.5C13 3.5 6.5 5 5.5 11C4.5 17 10 20.5 13 20.5"
            stroke="white"
            strokeWidth="1.1"
            strokeLinecap="round"
            fill="none"
            opacity="0.45"
          />
          <path
            d="M9 8.5C9 8.5 10.5 6.5 13 6.5C15.5 6.5 17 8.5 17 10.5C17 13.5 14.5 15 13 15"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />
          <circle cx="13" cy="18" r="1.4" fill="white" opacity="0.5" />
        </svg>
      </span>
      <span>
        Sapra
        <span className={['text-text-secondary', s.ai].join(' ')}>.ai</span>
      </span>
    </div>
  );
};
