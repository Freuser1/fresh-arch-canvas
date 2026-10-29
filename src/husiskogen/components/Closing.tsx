import Reveal from './Reveal.tsx';
import { useScrollProgress } from '../hooks.ts';
import { media } from '../data.ts';
import { Hanko } from './Japanese.tsx';

export default function Closing() {
  const [ref, p] = useScrollProgress<HTMLElement>();
  return (
    <footer ref={ref} className="relative overflow-hidden bg-ink text-paper">
      <img
        src={media('norrsken.webp')}
        alt="Huset i snön under norrskenet"
        loading="lazy"
        className="absolute inset-0 h-[120%] w-full object-cover opacity-70"
        style={{ transform: `translateY(${(p - 1) * 15}%)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />
      <div className="wrap relative flex min-h-[90svh] flex-col justify-between gap-16 py-24">
        <div className="flex items-start justify-between gap-6">
          <Hanko size="h-12 w-12 text-2xl" />
          <p aria-hidden="true" className="tategaki font-serif text-3xl tracking-[0.4em] text-paper/70 sm:text-4xl">森の家</p>
        </div>
        <div className="flex flex-col gap-10">
          <Reveal as="hr" className="w-28 border-t-2 border-shu" />
          <Reveal as="h2" delay={100} className="font-serif text-[clamp(2.75rem,1.5rem+6vw,6rem)] leading-[1.1]">
            Låt skogen<br />göra huset färdigt.
          </Reveal>
          {/* three short lines, in the spirit of a haiku */}
          <Reveal as="p" delay={220} className="flex flex-col gap-1 font-serif text-xl text-paper/70 sm:text-2xl">
            <span>Tre träd, tre tak.</span>
            <span>Ljus faller genom hallen.</span>
            <span>Träet blir silver.</span>
          </Reveal>
        </div>
        <div className="flex flex-col gap-4 border-t border-paper/15 pt-6 text-xs uppercase tracking-label text-paper/50 md:flex-row md:justify-between">
          <span>Hus i skogen · Faraz Faramarzi</span>
          <span>Efter Tadao Ando &amp; Pedro Ramírez Vázquez</span>
          <span className="flex gap-6">
            <a href="index.html" className="hover:text-paper">← Startsidan</a>
            <a href="#top" className="hover:text-paper">Till toppen ↑</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
