import { useEffect, useRef, useState } from 'react';

// True once the element has scrolled into view (stays true).
export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

// Progress (0 → 1) of an element moving through the viewport.
// `mode: 'pin'` measures across a tall sticky section instead: 0 when its top
// reaches the top of the screen, 1 when its bottom reaches the bottom.
export function useScrollProgress<T extends HTMLElement>(mode: 'pass' | 'pin' = 'pass') {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p =
        mode === 'pin'
          ? -rect.top / Math.max(1, rect.height - vh)
          : (vh - rect.top) / (rect.height + vh);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [mode]);
  return [ref, progress] as const;
}
