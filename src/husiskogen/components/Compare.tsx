import { useRef, useState } from 'react';

interface Side {
  src: string;
  alt: string;
  label: string;
}

interface Props {
  left: Side;
  right: Side;
  value?: number;
  onChange?: (v: number) => void;
  className?: string;
}

// Drag (or use arrow keys) to wipe between two images taken from the same camera.
export default function Compare({ left, right, value, onChange, className = '' }: Props) {
  const [own, setOwn] = useState(50);
  const pos = value ?? own;
  const set = (v: number) => (onChange ? onChange(v) : setOwn(v));
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    set(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={box}
      className={`relative w-full cursor-ew-resize select-none overflow-hidden bg-ink ${className}`}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && move(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      style={{ touchAction: 'pan-y' }}
    >
      <img src={right.src} alt={right.alt} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={left.src} alt={left.alt} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-px bg-paper shadow-[0_0_20px_rgba(0,0,0,.5)]" style={{ left: `${pos}%` }}>
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper bg-ink/60 text-paper backdrop-blur">
          ⇆
        </div>
      </div>
      <span className="pointer-events-none absolute left-3 top-3 bg-paper/90 px-3 py-1 text-[11px] uppercase tracking-label text-ink">{left.label}</span>
      <span className="pointer-events-none absolute right-3 top-3 bg-ink/80 px-3 py-1 text-[11px] uppercase tracking-label text-paper">{right.label}</span>
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => set(Number(e.target.value))}
        aria-label={`Jämför ${left.label} och ${right.label}`}
        className="peer absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
}
