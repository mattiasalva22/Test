/**
 * Sapra.AI Design System — Usage Example
 *
 * This file demonstrates how to use the design system components.
 * In a real app, this would be a page or screen component.
 *
 * Prerequisites:
 *   1. Add globals.css to your app entry (e.g. _app.tsx or main.tsx)
 *   2. Extend tailwind.config.ts with the design-system config
 */

import React, { useState } from 'react';

// Single import from the barrel
import {
  Button,
  Input,
  SearchInput,
  Tag,
  Chip,
  Badge,
  ScoreBadge,
  AiHint,
  ArticleCard,
  Avatar,
  Banner,
  Logo,
  ProgressBar,
  RoleCard,
  Sidebar,
  SourceRow,
  StatsBar,
  StepProgress,
  TopBar,
  Tooltip,
  ContextualTooltip,
} from './design-system';

// ─── Arrow icons ─────────────────────────────────────────────────
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M11 7H3M7 3l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Sample app screen using design system ────────────────────────
export function SampleOnboardingStep() {
  const [selectedRole, setSelectedRole] = useState<string | null>('editorial');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['Politica locale']);
  const [progress, setProgress] = useState(65);

  const roles = [
    { id: 'editorial',   label: 'Giornalista\neditoriale', icon: '📰' },
    { id: 'institutional', label: 'Ufficio Stampa /\nIstituz.',    icon: '🏛️' },
    { id: 'freelance',   label: 'Freelance',               icon: '📡' },
    { id: 'content',     label: 'Content\nCreator',        icon: '✍️' },
  ];

  const topics = ['Politica locale', 'Bilancio comunale', 'Urbanistica', 'PNRR', 'Normativa'];

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );
  };

  const sidebarItems = [
    { id: 'feed',    label: 'Feed' },
    { id: 'archive', label: 'Archivio' },
    { id: 'saved',   label: 'Salvati' },
    { id: 'profile', label: 'Profilo' },
  ];

  return (
    <div className="bg-bg min-h-screen text-text-primary font-sans">

      {/* Top navigation bar */}
      <TopBar username="Marco R." userInitials="MR" />

      {/* Amber setup banner */}
      <Banner
        title="Il tuo feed non è ancora personalizzato"
        subtitle="Ci vogliono 4 minuti per configurarlo."
        ctaLabel="Configura ora →"
        onCta={() => alert('Avvio configurazione')}
        onDismiss={() => alert('Banner chiuso')}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          items={sidebarItems}
          activeId="feed"
          sectionLabel="Menu"
          onSelect={(id) => console.log('navigate to', id)}
          className="w-[170px] min-h-screen"
        />

        {/* Main content */}
        <main className="flex-1 p-5 flex flex-col gap-5 max-w-[600px]">

          {/* Step progress */}
          <StepProgress total={4} current={1} />

          {/* Step heading */}
          <div>
            <h2 className="font-serif text-h2 text-text-primary mb-[5px]">Chi sei?</h2>
            <p className="text-body text-text-secondary">Aiuta SAPRA a capire il tuo contesto</p>
          </div>

          {/* Role cards grid */}
          <div className="grid grid-cols-2 gap-[10px]">
            {roles.map((role) => (
              <RoleCard
                key={role.id}
                label={role.label}
                icon={role.icon}
                selected={selectedRole === role.id}
                onSelect={() => setSelectedRole(role.id)}
              />
            ))}
          </div>

          {/* AI hint */}
          <AiHint variant="amber">
            Sulla base del tuo profilo, ti suggeriremo le fonti più rilevanti
          </AiHint>

          {/* Text input */}
          <Input
            label="Per quale tipo di testata/organizzazione?"
            placeholder='Es. "Il Corriere della Sera", freelance...'
          />

          {/* Topic search */}
          <SearchInput placeholder="Cerca un tema o keyword..." />

          {/* Topic tags */}
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Tag
                key={topic}
                selected={selectedTopics.includes(topic)}
                onToggle={() => toggleTopic(topic)}
              >
                {topic}
              </Tag>
            ))}
            <Tag variant="ghost">Altro...</Tag>
          </div>

          {/* Selected chips */}
          <div className="flex flex-wrap gap-2">
            {selectedTopics.map((topic) => (
              <Chip
                key={topic}
                label={topic}
                onRemove={() => toggleTopic(topic)}
              />
            ))}
          </div>

          {/* Progress bar */}
          <ProgressBar value={progress} showLabel />
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setProgress((p) => Math.min(100, p + 10))}
          >
            +10%
          </Button>

          {/* Stats bar */}
          <StatsBar
            items={[
              { label: 'Fonti attive', value: 4 },
              { label: '~220 articoli', value: '/giorno' },
            ]}
          />

          {/* Badges showcase */}
          <div className="flex gap-2 flex-wrap">
            <Badge variant="success">RSS ✓</Badge>
            <Badge variant="warning">2/3 min.</Badge>
            <Badge variant="info">★ 91%</Badge>
            <Badge variant="muted">Feed generico</Badge>
            <Badge variant="error">Errore</Badge>
            <ScoreBadge score={96} />
            <ScoreBadge score={91} />
            <ScoreBadge score={84} />
          </div>

          {/* Article cards */}
          <div className="flex flex-col gap-2">
            <ArticleCard
              variant="featured"
              title="DDL Sicurezza: approvato emendamento sui reporter"
              source="Corriere della Sera"
              category="Politica locale"
              time="1h fa"
              score={96}
              topics={['Politica locale']}
            />
            <ArticleCard
              title="ANAC: nuove linee guida per appalti pubblici 2025"
              source="ANAC"
              category="ANAC"
              time="3h fa"
              score={91}
            />
            <ArticleCard
              variant="generic"
              title="Notizia generica non filtrata per il tuo profilo"
              source="ANSA"
              category="Politica"
              time="2h fa"
            />
          </div>

          {/* Source rows */}
          <div className="border border-border-subtle rounded-lg overflow-hidden bg-surface-1">
            <SourceRow name="Gazzetta Ufficiale" icon="🏛️" hasRss />
            <SourceRow name="Corriere della Sera" icon="📰" checked onChange={(v) => console.log('Corriere', v)} />
            <SourceRow name="ANAC" icon="🔒" checked hasRss onChange={(v) => console.log('ANAC', v)} />
          </div>

          {/* Footer buttons */}
          <div className="flex justify-between pt-4 border-t border-border-faint">
            <Button variant="secondary" iconLeft={<ArrowLeft />}>Indietro</Button>
            <Button variant="primary" iconRight={<ArrowRight />}>Continua</Button>
          </div>

        </main>
      </div>
    </div>
  );
}

export default SampleOnboardingStep;
