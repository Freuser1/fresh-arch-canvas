/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTypewriter } from './hooks/useTypewriter';
import {
  PortfolioModals,
  type PortfolioModalType,
} from './components/PortfolioModals';
import { CONTACT_EMAIL } from './contact';
// Imported (not a hard-coded "/assets/..." path) so Vite fingerprints the file and
// the URL is correct wherever the site is hosted. The video is encoded with a
// keyframe on every frame, which keeps mouse scrubbing smooth in both directions.
import heroVideo from './assets/hero.mp4';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPills, setShowPills] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeModal, setActiveModal] = useState<PortfolioModalType>(null);
  const closeModal = useCallback(() => setActiveModal(null), []);

  // Video scrubbing refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  // Typewriter hook for portfolio greeting
  const introHeadline =
    'Hej, kul att du hittade till mitt senaste projekt!';
  const { displayed, done } = useTypewriter({
    text: introHeadline,
    speed: 38,
    startDelay: 600,
  });

  // Action pill buttons reveal 400ms after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPills(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Video scrubbing: pointer movement moves the video forward/backward in time.
  // Only one seek is in flight at a time; when it lands, we jump straight to the
  // latest target. This avoids flooding the decoder with seeks.
  const requestedTimeRef = useRef<number>(0);

  const seekTo = useCallback((video: HTMLVideoElement, time: number) => {
    isSeekingRef.current = true;
    requestedTimeRef.current = time;
    video.currentTime = time;
  }, []);

  useEffect(() => {
    const SENSITIVITY = 0.8;

    const scrubTo = (clientX: number) => {
      const video = videoRef.current;
      if (prevXRef.current === null || !video || !Number.isFinite(video.duration) || video.duration <= 0) {
        prevXRef.current = clientX;
        return;
      }
      const delta = clientX - prevXRef.current;
      prevXRef.current = clientX;

      const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTimeRef.current = Math.min(Math.max(0, targetTimeRef.current + offset), video.duration);

      if (!isSeekingRef.current) seekTo(video, targetTimeRef.current);
    };

    const handleMouseMove = (e: MouseEvent) => scrubTo(e.clientX);
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) prevXRef.current = e.touches[0].clientX;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) scrubTo(e.touches[0].clientX);
    };
    const handleEnd = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleEnd);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleEnd);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [seekTo]);

  const handleSeeked = () => {
    const video = videoRef.current;
    isSeekingRef.current = false;
    if (!video) return;
    // The pointer kept moving while we were seeking: catch up to the newest
    // target. Comparing against the *requested* time (not currentTime) means a
    // seek the browser can't honour never turns into an endless loop.
    if (Math.abs(targetTimeRef.current - requestedTimeRef.current) > 0.02) {
      seekTo(video, targetTimeRef.current);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (e.g. insecure context) – open the mail app instead.
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden select-text">
      {/* BACKGROUND VIDEO (mouse-scrub controlled) */}
      <video
        ref={videoRef}
        // "#t=0.001" makes iOS Safari paint the first frame without autoplay.
        src={`${heroVideo}#t=0.001`}
        muted
        playsInline
        preload="auto"
        onSeeked={handleSeeked}
        className="fixed inset-0 z-0 w-full h-full object-cover pointer-events-none"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      {/* Cinematic gradient overlay for legibility across video frames */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 bg-black/30 pointer-events-none"
      />

      {/* NAVBAR (fixed, z-index: 10) */}
      <header className="fixed top-0 left-0 right-0 z-10 w-full px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center">
        {/* Logo (left) */}
        <div className="flex items-center gap-3">
          <a
            href="index.html"
            title="Tillbaka till startsidan"
            style={{ fontFamily: 'var(--font-heading)' }}
            className="text-[21px] sm:text-[26px] tracking-tight text-white whitespace-nowrap select-none no-underline hover:opacity-60 transition-opacity"
          >
            Faraz Faramarzi
          </a>
          <span
            className="text-[25px] sm:text-[30px] text-white select-none inline-block"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </div>

        {/* Desktop nav links (center, hidden below lg – the Swedish labels need the room) */}
        <nav
          aria-label="Huvudmeny"
          className="hidden lg:flex items-center whitespace-nowrap text-[23px] text-white font-normal"
        >
          <button
            type="button"
            onClick={() => setActiveModal('projects')}
            className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0 text-white"
          >
            Projekt
          </button>
          <span className="select-none">,&nbsp;</span>
          <button
            type="button"
            onClick={() => setActiveModal('about')}
            className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0 text-white"
          >
            Om mig
          </button>
          <span className="select-none">,&nbsp;</span>
          <button
            type="button"
            onClick={() => setActiveModal('skills')}
            className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0 text-white"
          >
            Kompetenser
          </button>
          <span className="select-none">,&nbsp;</span>
          <button
            type="button"
            onClick={() => setActiveModal('experiments')}
            className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0 text-white"
          >
            Experiment
          </button>
        </nav>

        {/* Desktop CTA (right, hidden below lg) */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            setActiveModal('contact');
          }}
          className="hidden lg:inline-block whitespace-nowrap text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity cursor-pointer"
        >
          Kontakta mig
        </a>

        {/* Mobile hamburger (visible below lg) */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Stäng menyn' : 'Öppna menyn'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="lg:hidden flex flex-col justify-center items-center gap-[5px] p-2 focus:outline-none z-20 cursor-pointer"
        >
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile overlay (z-index: 9) */}
      <div
        className={`fixed inset-0 z-[9] bg-black/90 backdrop-blur-md flex flex-col justify-center items-start px-8 gap-8 lg:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto visible'
            : 'opacity-0 pointer-events-none invisible'
        }`}
      >
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            setActiveModal('projects');
          }}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity text-left bg-transparent border-none p-0"
        >
          Projekt
        </button>
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            setActiveModal('about');
          }}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity text-left bg-transparent border-none p-0"
        >
          Om mig
        </button>
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            setActiveModal('skills');
          }}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity text-left bg-transparent border-none p-0"
        >
          Kompetenser
        </button>
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            setActiveModal('experiments');
          }}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity text-left bg-transparent border-none p-0"
        >
          Experiment
        </button>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            setActiveModal('contact');
          }}
          className="text-[32px] font-medium text-white underline underline-offset-2 hover:opacity-60 transition-opacity text-left"
        >
          Kontakta mig
        </a>
      </div>

      {/* HERO SECTION (z-index: 1) */}
      <main className="relative z-[1] w-full h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden">
        {/* Content container */}
        <div className="max-w-xl relative z-10">
          {/* 1. Blurred intro label */}
          <div
            className="pointer-events-none select-none mb-5 sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.3,
              fontWeight: 400,
              color: '#fff',
              filter: 'blur(4px)',
            }}
          >
            Hej, jag studerar Byggteknik och design på KTH,
            <br />
            med fokus på BIM, parametrisk design och fastighetsutveckling
          </div>

          {/* 2. Typewriter text */}
          <p
            className="text-white mb-5 sm:mb-6 min-h-[54px]"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.35,
              fontWeight: 400,
            }}
          >
            {displayed}
            {!done && (
              <span
                className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink"
                aria-hidden="true"
              />
            )}
          </p>

          {/* 3. Action pill buttons */}
          <div
            className={`flex flex-wrap gap-y-1 transition-all duration-[400ms] ease-out ${
              showPills
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-[8px]'
            }`}
          >
            {/* White pill button 1: See My Projects */}
            <button
              type="button"
              onClick={() => setActiveModal('projects')}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Se mina projekt
            </button>

            {/* White pill button 2: About Me */}
            <button
              type="button"
              onClick={() => setActiveModal('about')}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Om mig
            </button>

            {/* White pill button 3: My Skills & Stack */}
            <button
              type="button"
              onClick={() => setActiveModal('skills')}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Kompetenser & verktyg
            </button>

            {/* White pill button 4: My Creative Process */}
            <button
              type="button"
              onClick={() => setActiveModal('process')}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Min arbetsprocess
            </button>

            {/* Outline pill button with copy icon */}
            <button
              type="button"
              onClick={handleCopyEmail}
              title="Klicka för att kopiera e-postadressen"
              className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
            >
              <span>
                Nå mig:{' '}
                <span className="underline underline-offset-1">
                  {copied ? 'Kopierad!' : CONTACT_EMAIL}
                </span>
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
                aria-hidden="true"
              >
                <rect
                  x="3.5"
                  y="1.5"
                  width="7"
                  height="7.5"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <rect
                  x="1.5"
                  y="3.5"
                  width="7"
                  height="7.5"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="currentColor"
                  fillOpacity="0.15"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>

      {/* Interactive portfolio modals */}
      <PortfolioModals
        activeModal={activeModal}
        onClose={closeModal}
      />
    </div>
  );
}
