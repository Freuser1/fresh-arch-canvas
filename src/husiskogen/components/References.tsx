import type { ReactNode } from 'react';
import Reveal from './Reveal.tsx';
import { useScrollProgress } from '../hooks.ts';
import { media } from '../data.ts';

interface RefProps {
  file: string;
  alt: string;
  name: ReactNode;
  lines: string[];
  note: string;
  tone: string;
  delay: number;
}

function Ref({ file, alt, name, lines, note, tone, delay }: RefProps) {
  const [ref, p] = useScrollProgress<HTMLDivElement>();
  return (
    <Reveal delay={delay} className="group flex flex-1 flex-col">
      <div ref={ref} className="relative aspect-[4/5] overflow-hidden bg-concrete">
        <img
          src={media(file)}
          alt={alt}
          loading="lazy"
          className="absolute inset-x-0 h-[115%] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          style={{ top: `${(p - 0.5) * -14 - 7}%` }}
        />
        <div className={`absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t ${tone} to-transparent`} />
      </div>
      <h3 className="mt-8 font-serif text-4xl leading-tight sm:text-5xl">{name}</h3>
      <ul className="mt-6 flex flex-col gap-1 text-xl text-ink-soft">
        {lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <p className="mt-6 max-w-md leading-relaxed text-ink-mute">{note}</p>
    </Reveal>
  );
}

export default function References() {
  return (
    <section id="referenser" className="bg-stone py-24 sm:py-36">
      <div className="wrap">
        <Reveal as="p" className="label">02 — Referenser</Reveal>
        <Reveal as="h2" delay={80} className="heading mt-6 max-w-3xl">Två hus att lära av</Reveal>
        <div className="mt-14 flex flex-col gap-16 md:flex-row md:gap-12 lg:gap-24">
          <Ref
            file="ref-ando.webp"
            alt="Tadao Andos Chichu-museum på Naoshima från luften: kvadratiska och triangulära betonghål i en grön sluttning"
            name={<>Tadao<br />Ando</>}
            lines={['Väggen som håller.', 'Ljuset som material.', 'Ett hus tryckt ner i marken.']}
            note="Platsgjuten betong, smala springor av ljus, byggnaden halvt nergrävd i sluttningen — som Chichu på Naoshima."
            tone="from-ink/30"
            delay={0}
          />
          <Ref
            file="ref-vazquez.webp"
            alt="Pation i Pedro Ramírez Vázquez hus: honungsfärgade band av trä, glasväggar och orange skalstolar under ett glastak"
            name={<>Pedro<br />Ramírez Vázquez</>}
            lines={['Pation i mitten.', 'Ett varmt band av trä.', 'Glaset däremellan.']}
            note="Livet ordnat kring en patio, övervåningen inlindad i honungsfärgade träband, glas från golv till tak däremellan."
            tone="from-oak-deep/40"
            delay={150}
          />
        </div>
      </div>
    </section>
  );
}
