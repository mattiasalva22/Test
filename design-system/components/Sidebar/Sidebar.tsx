import React from 'react';

export interface SidebarItem {
  /** Unique key */
  id: string;
  /** Display label */
  label: string;
  /** Icon SVG element */
  icon?: React.ReactNode;
  /** Badge/count to show next to label */
  badge?: React.ReactNode;
}

export interface SidebarProps {
  /** Navigation items */
  items: SidebarItem[];
  /** Currently active item id */
  activeId?: string;
  /** Called when an item is clicked */
  onSelect?: (id: string) => void;
  /** Optional section header label */
  sectionLabel?: string;
  className?: string;
}

/**
 * Vertical sidebar navigation.
 * Items show active state with surface-2 background.
 */
export const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeId,
  onSelect,
  sectionLabel,
  className = '',
}) => (
  <nav
    className={[
      'flex flex-col gap-[2px]',
      'border-r border-border-faint',
      'px-3 py-4',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    aria-label="Navigazione principale"
  >
    {sectionLabel && (
      <span className="font-mono text-label-sm tracking-[0.08em] uppercase text-text-muted px-[10px] py-1 mb-[6px]">
        {sectionLabel}
      </span>
    )}
    {items.map((item) => {
      const isActive = item.id === activeId;
      return (
        <button
          key={item.id}
          type="button"
          role="menuitem"
          aria-current={isActive ? 'page' : undefined}
          onClick={() => onSelect?.(item.id)}
          className={[
            'flex items-center gap-2 px-[10px] py-2 rounded-md',
            'font-sans text-body font-medium',
            'cursor-pointer w-full text-left transition-all duration-[120ms]',
            'border-none outline-none',
            isActive
              ? 'bg-surface-2 text-text-primary'
              : 'bg-transparent text-text-secondary hover:bg-surface-2 hover:text-text-primary',
          ].join(' ')}
        >
          {item.icon && (
            <span className="w-[14px] h-[14px] flex-shrink-0 flex items-center justify-center">
              {item.icon}
            </span>
          )}
          <span className="flex-1">{item.label}</span>
          {item.badge && <span>{item.badge}</span>}
        </button>
      );
    })}
  </nav>
);
