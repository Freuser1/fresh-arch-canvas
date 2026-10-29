import { useEffect, useState } from 'react';
import { nav } from '../data.ts';

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    nav.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const light = !solid && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        light ? 'bg-transparent' : 'border-b border-ink/10 bg-paper/90 backdrop-blur'
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <a href="#top" className={`flex min-w-0 items-baseline gap-2 font-serif text-lg ${light ? 'text-paper' : 'text-ink'}`}>
          <span className="truncate">Hus i skogen</span>
          <span className="hidden text-sm tracking-[0.3em] opacity-70 sm:inline">森の家</span>
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`text-xs uppercase tracking-label transition-colors ${
                active === id
                  ? light ? 'text-oak-light' : 'text-oak-deep'
                  : light ? 'text-paper/80 hover:text-paper' : 'text-ink-mute hover:text-ink'
              }`}
            >
              {label}
            </a>
          ))}
          <a
            href="index.html"
            className={`border px-3 py-1.5 text-xs uppercase tracking-label transition-colors ${
              light ? 'border-paper/40 text-paper hover:bg-paper hover:text-ink' : 'border-ink/20 text-ink hover:bg-ink hover:text-paper'
            }`}
          >
            ← Start
          </a>
        </nav>
        <button
          className={`flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden ${light ? 'text-paper' : 'text-ink'}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Meny"
          aria-expanded={open}
        >
          <span className={`h-px w-6 bg-current transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
          <span className={`h-px w-6 bg-current transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
        </button>
      </div>
      <div className={`overflow-hidden transition-[max-height] duration-500 lg:hidden ${open ? 'max-h-[32rem]' : 'max-h-0'}`}>
        <nav className="wrap flex flex-col pb-6">
          {nav.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className="border-t border-ink/10 py-3 text-sm uppercase tracking-label text-ink-soft"
            >
              {label}
            </a>
          ))}
          <a href="index.html" className="border-t border-ink/10 py-3 text-sm uppercase tracking-label text-oak-deep">
            ← Till startsidan
          </a>
        </nav>
      </div>
    </header>
  );
}
