import { useEffect, useRef } from 'react';
import Reveal from './Reveal.tsx';
import Compare from './Compare.tsx';
import { useScrollProgress } from '../hooks.ts';
import { media } from '../data.ts';

// The ageing video is pinned while you scroll past it, and scrolling drives its playhead.
export default function Time() {
  const [ref, p] = useScrollProgress<HTMLDivElement>('pin');
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    if (v && v.duration) v.currentTime = p * (v.duration - 0.05);
  }, [p]);

  const years = Math.round(p * 15);

  return (
    <section id="tid" className="bg-ink text-paper">
      <div ref={ref} className="relative h-[260vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
          <video
            ref={video}
            src={media('aldrande.mp4')}
            poster={media('aldrande-poster.jpg')}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
            aria-label="Film där husets material åldras: träet silvrar och betongen mörknar"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/40" />
          <div className="wrap relative flex flex-1 flex-col justify-between pb-10 pt-24 sm:pb-16">
            <div className="flex flex-col gap-4">
              <p className="label !text-oak-light">05 — Tid</p>
              <h2 className="heading max-w-2xl">Dag ett. År X.</h2>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-lg text-paper/80">
                Träet silvrar. Betongen tar mossa. Skogen sluter sig. Huset är ritat för att åldras.
              </p>
              <div className="flex flex-col items-start gap-3 sm:items-end">
                <p className="font-serif text-6xl leading-none tabular-nums sm:text-8xl">
                  {years === 0 ? 'Dag 1' : `År ${years}`}
                </p>
                <div className="h-px w-48 bg-paper/20">
                  <div className="h-px bg-oak-light" style={{ width: `${p * 100}%` }} />
                </div>
                <p className="text-xs uppercase tracking-label text-paper/50">Skrolla för att åldra</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap flex flex-col gap-10 py-20 sm:py-28 lg:flex-row lg:items-center lg:gap-16">
        <Reveal className="flex flex-col gap-6 lg:flex-1">
          <p className="label !text-oak-glow">Jämför</p>
          <h3 className="font-serif text-4xl leading-tight sm:text-5xl">Samma vy, några år senare</h3>
          <p className="text-lg leading-relaxed text-paper/70">
            Obehandlat eller lätt oljat trä blir silvergrått inom några år, den platsgjutna betongen mörknar och samlar
            mossa, och skogsbotten växer tillbaka mot väggarna. Dra i bilden.
          </p>
        </Reveal>
        <Reveal delay={150} className="lg:flex-[1.6]">
          <Compare
            className="aspect-[4/3] sm:aspect-[16/10]"
            left={{ src: media('fasad-dag.webp'), alt: 'Huset nybyggt i sommarljus', label: 'Dag ett' }}
            right={{ src: media('aldrad-fasad-2.webp'), alt: 'Samma vy år senare, silvrat trä och vittrad betong', label: 'Åldrad' }}
          />
        </Reveal>
      </div>
    </section>
  );
}
