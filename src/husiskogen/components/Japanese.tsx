import type { ReactNode } from 'react';
import Reveal from './Reveal.tsx';

// A red hanko seal with one character, used as the house's mark.
export function Hanko({ char = '森', size = 'h-9 w-9 text-xl', className = '' }: { char?: string; size?: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center border-2 border-shu bg-shu font-serif leading-none text-paper shadow-[inset_0_0_0_2px_rgba(243,240,232,.35)] ${size} ${className}`}
    >
      {char}
    </span>
  );
}

interface HeadProps {
  n: string; // kanji numeral
  jp: string; // Japanese section word
  sv: string; // Swedish label
  title: ReactNode;
  dark?: boolean;
  children?: ReactNode;
}

// Section heading: kanji numeral, Japanese word and Swedish label, then the title.
// On wide screens the Japanese word also stands tall and faint in the margin, written top to bottom.
export function SectionHead({ n, jp, sv, title, dark = false, children }: HeadProps) {
  return (
    <div className="relative flex flex-col gap-6">
      <span
        aria-hidden="true"
        className={`tategaki pointer-events-none absolute -right-2 -top-6 hidden font-serif text-8xl leading-none xl:block ${
          dark ? 'text-paper/[.06]' : 'text-ink/[.06]'
        }`}
      >
        {jp}
      </span>
      <Reveal className="flex items-center gap-4">
        <span className={`font-serif text-2xl ${dark ? 'text-oak-glow' : 'text-shu'}`}>{n}</span>
        <span className={`h-px w-10 ${dark ? 'bg-paper/30' : 'bg-ink/25'}`} />
        <span className={`font-serif text-base tracking-[0.3em] ${dark ? 'text-paper/80' : 'text-ink-soft'}`}>{jp}</span>
        <span className={`label ${dark ? '!text-paper/50' : ''}`}>{sv}</span>
      </Reveal>
      <Reveal as="h2" delay={80} className="heading max-w-3xl">
        {title}
      </Reveal>
      {children}
    </div>
  );
}
