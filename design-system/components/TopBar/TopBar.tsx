import React from 'react';
import { Logo } from '../Logo/Logo';
import { Avatar } from '../Avatar/Avatar';

export interface TopBarProps {
  /** Username to display */
  username?: string;
  /** User initials for avatar */
  userInitials?: string;
  /** Right-side extra content */
  actions?: React.ReactNode;
  className?: string;
}

/**
 * Application top bar with Sapra.AI logo and user info.
 * Used on the dashboard screens.
 */
export const TopBar: React.FC<TopBarProps> = ({
  username,
  userInitials,
  actions,
  className = '',
}) => (
  <header
    className={[
      'flex items-center justify-between',
      'px-5 py-[14px]',
      'border-b border-border-faint',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    <Logo size="sm" />

    <div className="flex items-center gap-3">
      {username && (
        <span className="font-mono text-caption tracking-[0.04em] text-text-muted">
          {username}
        </span>
      )}
      {userInitials && <Avatar initials={userInitials} aria-label={username} />}
      {actions}
    </div>
  </header>
);
