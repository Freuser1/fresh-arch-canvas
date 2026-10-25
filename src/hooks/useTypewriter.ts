import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  startDelay?: number;
}

export function useTypewriter({
  text,
  speed = 38,
  startDelay = 600,
}: UseTypewriterOptions) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let delayTimer: ReturnType<typeof setTimeout> | null = null;

    setDisplayed('');
    setDone(false);

    delayTimer = setTimeout(() => {
      timer = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          if (timer) clearInterval(timer);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      if (timer) clearInterval(timer);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
