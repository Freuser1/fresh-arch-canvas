import { useState } from 'react';
import Reveal from './Reveal.tsx';
import { drawings, media } from '../data.ts';

export default function Drawings() {
  const [active, setActive] = useState(drawings[0].id);
  const [zoom, setZoom] = useState(false);
  const d = drawings.find((x) => x.id === active) ?? drawings[0];

  return (
    <section id="ritningar" className="bg-stone py-24 sm:py-36">
      <div className="wrap">
        <Reveal as="p" className="label">04 — Ritningar</Reveal>
        <Reveal as="h2" delay={80} className="heading mt-6">Ritningarna</Reveal>

        {/* scrolls sideways on phones, wraps on wider screens */}
        <div className="-mx-4 mt-10 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
          <div className="flex w-max gap-x-6 gap-y-2 border-b border-ink/15 sm:w-auto sm:flex-wrap" role="tablist">
            {drawings.map((x) => (
              <button
                key={x.id}
                role="tab"
                aria-selected={active === x.id}
                onClick={() => {
                  setActive(x.id);
                  setZoom(false);
                }}
                className={`-mb-px whitespace-nowrap border-b-2 pb-3 pt-2 text-xs uppercase tracking-label transition-colors ${
                  active === x.id ? 'border-oak text-ink' : 'border-transparent text-ink-mute hover:text-ink'
                }`}
              >
                {x.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-center">
          <button
            onClick={() => setZoom((z) => !z)}
            className={`relative block w-full overflow-hidden border border-ink/10 bg-white lg:flex-[1.6] ${zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            aria-label={zoom ? 'Zooma ut' : 'Zooma in'}
          >
            <img
              key={d.file}
              src={media(d.file)}
              alt={`${d.label}: ${d.title}`}
              className="aspect-[16/10] w-full animate-fade-in object-contain p-3 transition-transform duration-700 sm:p-6"
              style={{ transform: zoom ? 'scale(1.9)' : 'scale(1)' }}
            />
            <span className="absolute bottom-3 right-3 bg-ink/80 px-3 py-1 text-[10px] uppercase tracking-label text-paper">
              {zoom ? '− zooma ut' : '+ zooma in'}
            </span>
          </button>

          <div key={d.id} className="flex animate-fade-in flex-col lg:flex-1">
            <p className="label">{d.label}</p>
            <h3 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">{d.title}</h3>
            <ul className="mt-8 flex flex-col gap-2 text-xl text-ink-soft">
              {d.points.map((pt) => (
                <li key={pt} className="flex gap-3">
                  <span className="mt-3.5 block h-px w-5 shrink-0 bg-oak" />
                  {pt}
                </li>
              ))}
            </ul>
            <p className="mt-8 leading-relaxed text-ink-mute">{d.text}</p>
            <p className="mt-8 text-sm tracking-[0.1em] text-ink-mute">{d.meta}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
