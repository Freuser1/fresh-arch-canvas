import { useState } from 'react';
import Reveal from './Reveal.tsx';
import Compare from './Compare.tsx';
import { media } from '../data.ts';

const options = [
  { id: 'A', name: 'Silver', text: 'Obehandlat trä, ljus zink. Mjukt, åldras av sig självt.', detail: 'Furu eller lärk som silvrar, ljusgrå zink. Lite underhåll och stilla.' },
  { id: 'B', name: 'Mörk', text: 'Bränt eller tjärat trä, mörkt tak. Tyngre, mer japanskt.', detail: 'Yakisugi eller tjära med mörk zink eller skiffer. Närmare referenserna, betongen syns mer.' },
] as const;

export default function Choice() {
  const [pos, setPos] = useState(50);
  const [pick, setPick] = useState<'A' | 'B' | null>(null);

  return (
    <section id="val" className="bg-stone py-24 sm:py-36">
      <div className="wrap">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal as="p" className="label">07 — Val</Reveal>
            <Reveal as="h2" delay={80} className="heading mt-6">Ett hus, en palett</Reveal>
          </div>
          <Reveal as="p" delay={160} className="max-w-md text-lg text-ink-mute">
            Bilderna visar två olika hus. Dra för att jämföra, och välj ett innan nästa renderingar.
          </Reveal>
        </div>

        <Compare
          className="mt-12 aspect-[4/3] sm:aspect-[16/8]"
          value={pos}
          onChange={setPos}
          left={{ src: media('sodervy.webp'), alt: 'Alternativ A: silvergrått trä över platsgjuten betong', label: 'A — Silver' }}
          right={{ src: media('alternativ-mork.webp'), alt: 'Alternativ B: mörk träpanel över platsgjuten betong', label: 'B — Mörk' }}
        />

        <div className="mt-8 flex flex-col gap-4 md:flex-row">
          {options.map((o) => (
            <button
              key={o.id}
              onClick={() => {
                setPick(o.id);
                setPos(o.id === 'A' ? 100 : 0);
              }}
              aria-pressed={pick === o.id}
              className={`flex flex-1 flex-col gap-3 border p-6 text-left transition-colors sm:p-8 ${
                pick === o.id ? 'border-oak bg-paper' : 'border-ink/15 hover:border-ink/40'
              }`}
            >
              <span className="flex items-center justify-between">
                <span className="label">{o.id} — {o.name}</span>
                <span className={`h-4 w-4 rounded-full border ${pick === o.id ? 'border-oak bg-oak' : 'border-ink/30'}`} />
              </span>
              <span className="font-serif text-2xl leading-snug">{o.text}</span>
              <span className="text-ink-mute">{o.detail}</span>
            </button>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-mute" aria-live="polite">
          {pick ? `Alternativ ${pick} valt. ` : ''}Att blanda dem får huset att läsas som två projekt.
        </p>
      </div>
    </section>
  );
}
