/**
 * Sapra.AI Design System
 * Single entry point — import everything from here.
 *
 * @example
 * import { Button, Tag, ArticleCard, colors } from '@sapra/design-system';
 */

// ─── Tokens ────────────────────────────────────────────────────
export { colors }                 from './tokens/colors';
export { fontFamily, typeScale }  from './tokens/typography';
export { spacing, semanticSpacing } from './tokens/spacing';
export { borderRadius, shadows, zIndex, transitions, animations } from './tokens/effects';
export type { ColorToken }        from './tokens/colors';
export type { TypeScaleKey }      from './tokens/typography';
export type { SpacingToken }      from './tokens/spacing';
export type { BorderRadiusToken, ShadowToken, ZIndexToken } from './tokens/effects';

// ─── Components ────────────────────────────────────────────────
export { AiHint }           from './components/AiHint';
export type { AiHintProps, AiHintVariant } from './components/AiHint';

export { ArticleCard }      from './components/ArticleCard';
export type { ArticleCardProps, ArticleCardVariant } from './components/ArticleCard';

export { Avatar }           from './components/Avatar';
export type { AvatarProps } from './components/Avatar';

export { Badge, ScoreBadge } from './components/Badge';
export type { BadgeProps, BadgeVariant, ScoreBadgeProps } from './components/Badge';

export { Banner }           from './components/Banner';
export type { BannerProps } from './components/Banner';

export { Button }           from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button';

export { Chip }             from './components/Chip';
export type { ChipProps }   from './components/Chip';

export { Input }            from './components/Input';
export type { InputProps }  from './components/Input';

export { Logo }             from './components/Logo';
export type { LogoProps, LogoSize } from './components/Logo';

export { ProgressBar }      from './components/ProgressBar';
export type { ProgressBarProps } from './components/ProgressBar';

export { RoleCard }         from './components/RoleCard';
export type { RoleCardProps } from './components/RoleCard';

export { SearchInput }      from './components/SearchInput';
export type { SearchInputProps } from './components/SearchInput';

export { Sidebar }          from './components/Sidebar';
export type { SidebarProps, SidebarItem } from './components/Sidebar';

export { SourceRow }        from './components/SourceRow';
export type { SourceRowProps } from './components/SourceRow';

export { StatsBar }         from './components/StatsBar';
export type { StatsBarProps, StatItem } from './components/StatsBar';

export { StepProgress }     from './components/StepProgress';
export type { StepProgressProps } from './components/StepProgress';

export { Tag }              from './components/Tag';
export type { TagProps, TagVariant } from './components/Tag';

export { TopBar }           from './components/TopBar';
export type { TopBarProps } from './components/TopBar';

export { Tooltip, ContextualTooltip } from './components/Tooltip';
export type { TooltipProps, ContextualTooltipProps } from './components/Tooltip';
