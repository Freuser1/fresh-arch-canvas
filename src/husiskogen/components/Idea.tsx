import Reveal from './Reveal.tsx';
import { kept } from '../data.ts';

export default function Idea() {
  return (
    <section id="ide" className="relative overflow-hidden bg-ink py-24 text-paper sm:py-40">
      {/* a thin slot of light, like the clerestory in the hall */}
      <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-oak-glow/60 to-transparent" />
      <div className="wrap flex flex-col gap-12 lg:flex-row lg:items-end lg:gap-16">
        <div className="lg:flex-[1.3]">
          <Reveal as="p" className="label !text-oak-glow">01 — Idé</Reveal>
          <Reveal as="h2" delay={100} className="mt-8 font-serif text-[clamp(2.75rem,1.5rem+6vw,6rem)] leading-[1.1]">
            Din plan.<br />
            <span className="text-oak-glow">Djupa tak.</span><br />
            En hall av ljus.
          </Reveal>
        </div>
        <Reveal delay={250} className="flex flex-col gap-6 text-lg leading-relaxed text-paper/75 lg:flex-1">
          <p>
            Behåll herrgården du ritade: tre lika delar och en stor hall i mitten. Ge varje del ett lågt japanskt valmtak
            med djupa takfötter.
          </p>
          <p>
            Gör hallen till en patio i Ramírez Vázquez anda — dubbel höjd, ljus uppifrån, band av trä och ribbor framför
            glaset.
          </p>
        </Reveal>
      </div>

      <div className="wrap mt-20 sm:mt-24">
        <Reveal as="p" className="label !text-paper/50">Det som blir kvar från din skiss</Reveal>
        <ul className="mt-8 flex flex-col border-t border-paper/15 sm:flex-row sm:flex-wrap">
          {kept.map((k, i) => (
            <Reveal
              as="li"
              key={k}
              delay={i * 90}
              className="flex items-baseline gap-4 border-b border-paper/15 py-5 sm:basis-1/2 sm:pr-6 lg:flex-1 lg:basis-0 lg:border-b-0 lg:px-6 lg:first:pl-0 lg:[&:not(:last-child)]:border-r"
            >
              <span className="font-serif text-oak-glow">0{i + 1}</span>
              <span className="text-paper/85">{k}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
