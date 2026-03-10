import React from 'react';
import { Button } from './Button';

/**
 * Sapra.AI Button Stories
 * Usage examples for all variants, sizes and states.
 */

// Arrow icon helper
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

export function AllVariants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 32 }}>
      <h3 style={{ fontFamily: 'monospace', fontSize: 11, color: '#8A8A8A', letterSpacing: '.08em', textTransform: 'uppercase' }}>
        Variants
      </h3>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Button variant="primary" iconRight={<ArrowRight />}>Inizia la configurazione</Button>
        <Button variant="secondary" iconLeft={<ArrowLeft />}>Indietro</Button>
        <Button variant="ghost">Salta per ora</Button>
        <Button variant="link">Vai al risultato →</Button>
      </div>

      <h3 style={{ fontFamily: 'monospace', fontSize: 11, color: '#8A8A8A', letterSpacing: '.08em', textTransform: 'uppercase' }}>
        Sizes
      </h3>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg" iconRight={<ArrowRight />}>Large (full width)</Button>
      </div>

      <h3 style={{ fontFamily: 'monospace', fontSize: 11, color: '#8A8A8A', letterSpacing: '.08em', textTransform: 'uppercase' }}>
        States
      </h3>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Button variant="primary" loading>Loading...</Button>
        <Button variant="primary" disabled>Disabled</Button>
        <Button variant="secondary" disabled>Disabled secondary</Button>
      </div>
    </div>
  );
}
