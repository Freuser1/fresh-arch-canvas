import { useEffect, useState } from 'react';
import Reveal from './Reveal.tsx';
import { useInView } from '../hooks.ts';
import { materials, media, numbers } from '../data.ts';

function Count({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / 1600);
      setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{n}</>;
}

export default function Materials() {
  const [hover, setHover] = useState<number | null>(null);
  const [numRef, numIn] = useInView<HTMLDivElement>(0.4);

  return (
    <section id="material" className="bg-paper py-24 sm:py-36">
      <div className="wrap">
        <Reveal as="p" className="label">06 — Material</Reveal>
        <Reveal as="h2" delay={80} className="heading mt-6 max-w-3xl">Fyra material och inget annat</Reveal>

        <div className="mt-14 flex flex-col gap-3 md:h-[520px] md:flex-row" onMouseLeave={() => setHover(null)}>
          {materials.map((m, i) => (
            <div
              key={m.name}
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              tabIndex={0}
              className="relative flex min-h-[240px] flex-col justify-end overflow-hidden outline-none transition-[flex-grow] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] focus-visible:ring-2 focus-visible:ring-oak md:min-h-0 md:basis-0"
              style={{ flexGrow: hover === null ? 1 : hover === i ? 2.4 : 0.8 }}
            >
              <div
                className="absolute inset-0 transition-transform duration-700"
                style={{
                  backgroundImage: `url(${media(m.file)})`,
                  backgroundSize: m.size,
                  transform: hover === i ? 'scale(1.06)' : 'scale(1)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
              <div className="relative flex flex-col gap-1 p-6 text-paper">
                <span className="text-[11px] uppercase tracking-label text-paper/70">{m.sub}</span>
                <h3 className="font-serif text-3xl sm:text-4xl">{m.name}</h3>
                <p
                  className={`mt-2 max-w-sm leading-relaxed text-paper/85 transition-all duration-500 ${
                    hover === i ? 'translate-y-0 opacity-100' : 'md:translate-y-3 md:opacity-0'
                  }`}
                >
                  {m.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 flex flex-col gap-6 sm:mt-28">
          <Reveal as="p" className="label">Detalj</Reveal>
          <Reveal as="h3" delay={80} className="heading">Där trä möter sten</Reveal>
          <div className="mt-4 flex flex-col gap-8 md:flex-row md:gap-6">
            {[
              { file: 'detalj-losning.webp', tag: 'Gör så', tone: 'text-oak-deep', alt: 'Bra detalj: zinkbleck med droppnäsa mellan träpanel och betong, med luftspalt', text: 'Zinkbleck med droppnäsa. En luftspalt låter träet torka.' },
              { file: 'detalj-risk.webp', tag: 'Undvik', tone: 'text-ink-mute', alt: 'Dålig detalj: rostränder rinner ner för betongen under blöta brädändar', text: 'Rått stål och ingen droppnäsa: rosten rinner ner för betongen.' },
            ].map((x, i) => (
              <Reveal key={x.file} delay={i * 120} className="flex flex-1 flex-col gap-3">
                <img src={media(x.file)} alt={x.alt} loading="lazy" className="aspect-[16/9] w-full object-cover" />
                <p className={`text-sm uppercase tracking-label ${x.tone}`}>{x.tag}</p>
                <p className="text-lg text-ink-soft">{x.text}</p>
              </Reveal>
            ))}
          </div>
          <p className="max-w-3xl leading-relaxed text-ink-mute">
            Detaljen som avgör hur huset åldras. Håll träet minst 20 mm fritt från blecket, använd zink eller annan icke
            missfärgande metall med droppnäsa, och låt aldrig brädändar stå i vatten.
          </p>
        </div>

        <div ref={numRef} className="mt-24 flex flex-wrap border-t border-ink/15 sm:mt-28">
          {numbers.map((n, i) => (
            <div
              key={n.label}
              className={`flex basis-1/2 flex-col gap-4 py-10 lg:flex-1 lg:basis-0 lg:px-8 lg:first:pl-0 ${
                i % 2 ? 'border-l border-ink/15 pl-5' : 'pr-5'
              } ${i > 0 ? 'lg:border-l lg:border-ink/15' : ''}`}
            >
              <p className="font-serif text-[clamp(3rem,2rem+4vw,6rem)] leading-none tabular-nums">
                <Count to={n.value} run={numIn} />
              </p>
              <p className="text-xs uppercase tracking-label text-ink-mute">{n.label}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-ink-mute">Rumsytor ur ritningarna · cirka 361 m² på entréplan, 235 m² på plan 2</p>
      </div>
    </section>
  );
}
