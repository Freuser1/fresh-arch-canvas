import Reveal from './Reveal.tsx';
import { SectionHead } from './Japanese.tsx';
import { glyphs } from '../data.ts';

// Explains the house's Japanese name, 森の家, character by character.
export default function Name() {
  return (
    <section id="namn" className="relative overflow-hidden bg-ink py-24 text-paper sm:py-40">
      <div className="shoji pointer-events-none absolute inset-0 text-paper/[.04]" />
      <div className="wrap relative flex flex-col gap-16 sm:gap-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead n="一" jp="名前" sv="Namnet" title={<>森の家 <span className="text-paper/50">— mori no ie</span></>} dark />
          <Reveal delay={200} className="flex max-w-md flex-col gap-4 text-lg leading-relaxed text-paper/75">
            <p>
              Tecknen uppe till vänster är husets namn på japanska. Ordagrant betyder de <em className="text-paper">skogens
              hus</em> — Hus i skogen.
            </p>
            <p>Tre tecken, och vart och ett säger något om hur huset är tänkt.</p>
          </Reveal>
        </div>

        <ol className="flex flex-col border-t border-paper/15 md:flex-row">
          {glyphs.map((g, i) => (
            <Reveal
              as="li"
              key={g.char}
              delay={i * 140}
              className="flex flex-1 flex-col gap-6 border-b border-paper/15 py-10 md:border-b-0 md:px-10 md:first:pl-0 md:last:pr-0 md:[&:not(:last-child)]:border-r"
            >
              <div className="flex items-end justify-between gap-6">
                <span className="font-serif text-[clamp(6rem,4rem+8vw,10rem)] leading-none">{g.char}</span>
                <span className="flex flex-col items-end gap-1 pb-3 text-right">
                  <span className="font-serif text-2xl text-oak-glow">{g.reading}</span>
                  <span className="label !text-paper/50">{g.meaning}</span>
                </span>
              </div>
              <p className="max-w-sm leading-relaxed text-paper/75">{g.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-2xl font-serif text-[clamp(2rem,1.4rem+2.6vw,3.5rem)] leading-[1.25]">
            Tre delar, tre tak.<br />
            <span className="text-oak-glow">En hall av ljus</span> i mitten.
          </p>
          <p className="max-w-md leading-relaxed text-paper/65">
            Varje del får ett lågt valmtak med djupa takfötter. Mitten blir en patio i Ramírez Vázquez anda — dubbel
            höjd, ljus uppifrån, band av trä och ribbor framför glaset.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
