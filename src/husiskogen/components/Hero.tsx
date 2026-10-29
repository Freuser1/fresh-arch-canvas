import { useEffect, useState } from 'react';
import { media } from '../data.ts';

// Opens like Ando's Church of Light: a concrete wall split by a slit of light that parts to reveal the house.
export default function Hero() {
  const [open, setOpen] = useState(false);
  const [y, setY] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 300);
    const onScroll = () => setY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const fade = `transition-all duration-1000 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`;

  return (
    <section id="top" className="relative flex h-[100svh] min-h-[560px] flex-col overflow-hidden bg-ink">
      <img
        src={media('natt-sno.webp')}
        alt="Huset en vinternatt bland snöiga granar, varmt ljus i stora vardagsrummets glas"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          transform: `translateY(${y * 0.3}px) scale(${open ? 1.04 : 1.18})`,
          transition: 'transform 2.8s cubic-bezier(.2,.7,.2,1)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/10 to-transparent" />

      <div
        className="board-concrete absolute inset-y-0 left-0 w-1/2 transition-transform duration-[2200ms] ease-[cubic-bezier(.7,0,.2,1)]"
        style={{ transform: open ? 'translateX(-100%)' : 'translateX(-2px)' }}
      />
      <div
        className="board-concrete absolute inset-y-0 right-0 w-1/2 transition-transform duration-[2200ms] ease-[cubic-bezier(.7,0,.2,1)]"
        style={{ transform: open ? 'translateX(100%)' : 'translateX(2px)' }}
      />
      <div
        className={`absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-oak-light shadow-[0_0_40px_10px_rgba(217,168,106,.55)] transition-opacity duration-700 ${
          open ? 'opacity-0 delay-500' : 'opacity-100'
        }`}
      />

      <div className="wrap relative flex flex-1 flex-col justify-end pb-16 text-paper sm:pb-24">
        <p className={`label !text-oak-light delay-[1400ms] ${fade}`}>Koncept · Råskiss</p>
        <h1 className={`mt-4 font-serif text-[clamp(3.25rem,2rem+8vw,8rem)] leading-none delay-[1600ms] ${fade}`}>
          Hus i skogen
        </h1>
        <p className={`mt-6 max-w-xl text-lg text-paper/80 sm:text-2xl delay-[1900ms] ${fade}`}>
          En herrgård under djupa japanska tak — i platsgjuten betong, limträ och ljus.
        </p>
        <a
          href="#ide"
          className={`mt-12 flex w-fit items-center gap-4 text-xs uppercase tracking-label text-paper/70 hover:text-paper delay-[2200ms] ${fade}`}
        >
          <span className="block h-12 w-px animate-pulse bg-paper/60" /> Skrolla
        </a>
      </div>
    </section>
  );
}
