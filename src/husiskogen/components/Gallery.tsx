import { useCallback, useEffect, useMemo, useState } from 'react';
import Reveal from './Reveal.tsx';
import { filters, media, renders, type Render } from '../data.ts';

interface LightboxProps {
  items: Render[];
  index: number;
  onClose: () => void;
  onStep: (d: number) => void;
}

function Lightbox({ items, index, onClose, onStep }: LightboxProps) {
  const [touchX, setTouchX] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, onStep]);

  const item = items[index];
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-ink/95 text-paper" role="dialog" aria-modal="true" aria-label={item.title}>
      <div className="wrap flex h-16 shrink-0 items-center justify-between">
        <p className="label !text-oak-light">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </p>
        <button onClick={onClose} className="p-2 text-xs uppercase tracking-label text-paper/70 hover:text-paper">
          Stäng ✕
        </button>
      </div>
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16"
        onClick={onClose}
        onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX === null) return;
          const dx = e.changedTouches[0].clientX - touchX;
          if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1);
          setTouchX(null);
        }}
      >
        <img
          key={item.file}
          src={media(item.file)}
          alt={item.note}
          className="max-h-full max-w-full animate-fade-in object-contain"
          onClick={(e) => e.stopPropagation()}
        />
        <button
          onClick={(e) => { e.stopPropagation(); onStep(-1); }}
          className="absolute left-1 top-1/2 hidden -translate-y-1/2 p-3 text-3xl text-paper/60 hover:text-paper sm:left-4 sm:block"
          aria-label="Föregående"
        >
          ←
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onStep(1); }}
          className="absolute right-1 top-1/2 hidden -translate-y-1/2 p-3 text-3xl text-paper/60 hover:text-paper sm:right-4 sm:block"
          aria-label="Nästa"
        >
          →
        </button>
      </div>
      <div className="wrap flex shrink-0 flex-col gap-2 pb-8 pt-5">
        <h3 className="font-serif text-2xl sm:text-3xl">{item.title}</h3>
        <p className="max-w-2xl text-paper/70">{item.note}</p>
        <p className="text-xs uppercase tracking-label text-paper/40 sm:hidden">Svep för nästa</p>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('alla');
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(
    () => (filter === 'alla' ? renders : renders.filter((r) => r.tags.includes(filter))),
    [filter],
  );
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  return (
    <section id="huset" className="bg-paper py-24 sm:py-36">
      <div className="wrap">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal as="p" className="label">03 — Huset</Reveal>
            <Reveal as="h2" delay={80} className="heading mt-6">En lykta i skogen</Reveal>
            <Reveal as="p" delay={160} className="mt-6 max-w-xl text-lg text-ink-mute">
              Platsgjuten betong nedtill, träband ovanför, falsade zinktak med djupa takfötter. Genom årstiderna.
            </Reveal>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrera bilder">
            {filters.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`border px-4 py-2.5 text-xs uppercase tracking-label transition-colors ${
                  filter === f.id
                    ? 'border-ink bg-ink text-paper'
                    : 'border-ink/20 text-ink-mute hover:border-ink/60 hover:text-ink'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* a quiet rhythm: one wide frame, then two halves, repeating */}
        <div className="mt-12 flex flex-wrap gap-3">
          {items.map((r, i) => {
            const wide = i % 3 === 0;
            return (
              <button
                key={r.file}
                onClick={() => setOpen(i)}
                className={`group relative overflow-hidden bg-stone text-left ${
                  wide ? 'aspect-[4/3] basis-full sm:aspect-[21/9]' : 'aspect-[4/3] basis-full sm:basis-[calc(50%-0.375rem)]'
                }`}
              >
                <img
                  src={media(r.file)}
                  alt={r.note}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 flex flex-col gap-1 p-5 text-paper">
                  <span className="text-[11px] uppercase tracking-label text-oak-light">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-serif text-xl sm:text-2xl">{r.title}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {open !== null && <Lightbox items={items} index={open} onClose={close} onStep={step} />}
    </section>
  );
}
