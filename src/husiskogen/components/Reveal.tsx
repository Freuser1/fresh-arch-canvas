import type { ElementType, ReactNode } from 'react';
import { useInView } from '../hooks.ts';

interface Props {
  as?: ElementType;
  delay?: number;
  className?: string;
  children?: ReactNode;
}

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children }: Props) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <Tag ref={ref} className={`reveal ${inView ? 'is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
