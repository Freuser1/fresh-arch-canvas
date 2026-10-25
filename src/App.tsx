/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useTypewriter } from './hooks/useTypewriter';
import {
  PortfolioModals,
  type PortfolioModalType,
} from './components/PortfolioModals';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPills, setShowPills] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeModal, setActiveModal] = useState<PortfolioModalType>(null);

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

  // Video mouse scrubbing event listener
  useEffect(() => {
    const SENSITIVITY = 0.8;

    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video || !video.duration || Number.isNaN(video.duration)) {
        prevXRef.current = e.clientX;
        return;
      }

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      const timeOffset =
        (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTimeRef.current = Math.min(
        Math.max(0, targetTimeRef.current + timeOffset),
        video.duration
      );

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        prevXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const video = videoRef.current;
      if (
        !video ||
        !video.duration ||
        Number.isNaN(video.duration) ||
        e.touches.length === 0
      ) {
        return;
      }
      const touchX = e.touches[0].clientX;
      if (prevXRef.current === null) {
        prevXRef.current = touchX;
        return;
      }
      const delta = touchX - prevXRef.current;
      prevXRef.current = touchX;

      const timeOffset =
        (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTimeRef.current = Math.min(
        Math.max(0, targetTimeRef.current + timeOffset),
        video.duration
      );

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleEnd = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleEnd);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleEnd);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, []);

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) {
      isSeekingRef.current = false;
      return;
    }

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.02) {
      video.currentTime = targetTimeRef.current;
    } else {
      isSeekingRef.current = false;
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@myportfolio.dev');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden select-text">
      {/* BACKGROUND VIDEO (mouse-scrub controlled) */}
      <video
        ref={videoRef}
        src="/assets/aistudio/Character_observing_modern_offic__20261025112859_82e2ceb6.mp4"
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
      >
        <source
          src="/assets/aistudio/Character_observing_modern_offic__20261025112859_82e2ceb6.mp4"
          type="video/mp4"
        />
      </video>

      {/* Cinematic gradient overlay for legibility across video frames */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 bg-black/30 pointer-events-none"
      />

      {/* NAVBAR (fixed, z-index: 10) */}
      <header className="fixed top-0 left-0 right-0 z-10 w-full px-5 sm:px-8 py-4 sm:py-5 flex row justify-between items-center">
        {/* Logo (left) */}
        <div className="flex items-center gap-3">
          <span
            style={{ fontFamily: 'var(--font-heading)' }}
            className="text-[21px] sm:text-[26px] tracking-tight text-white select-none cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            My Portfolio
          </span>
          <span
            className="text-[25px] sm:text-[30px] text-white select-none inline-block"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </div>

        {/* Desktop nav links (center, hidden below md) */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center text-[23px] text-white font-normal"
        >
          <button
            type="button"
            onClick={() => setActiveModal('projects')}
            className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0 text-white"
          >
            Projects
          </button>
          <span className="select-none">,&nbsp;</span>
          <button
            type="button"
            onClick={() => setActiveModal('about')}
            className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0 text-white"
          >
            About
          </button>
          <span className="select-none">,&nbsp;</span>
          <button
            type="button"
            onClick={() => setActiveModal('skills')}
            className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0 text-white"
          >
            Skills
          </button>
          <span className="select-none">,&nbsp;</span>
          <button
            type="button"
            onClick={() => setActiveModal('experiments')}
            className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0 text-white"
          >
            Experiments
          </button>
        </nav>

        {/* Desktop CTA (right, hidden below md) */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            setActiveModal('contact');
          }}
          className="hidden md:inline-block text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity cursor-pointer"
        >
          Get in touch
        </a>

        {/* Mobile hamburger (visible below md) */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] p-2 focus:outline-none z-20 cursor-pointer"
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
        className={`fixed inset-0 z-[9] bg-black/90 backdrop-blur-md flex flex-col justify-center items-start px-8 gap-8 md:hidden transition-all duration-300 ${
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
          Projects
        </button>
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            setActiveModal('about');
          }}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity text-left bg-transparent border-none p-0"
        >
          About
        </button>
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            setActiveModal('skills');
          }}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity text-left bg-transparent border-none p-0"
        >
          Skills
        </button>
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            setActiveModal('experiments');
          }}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity text-left bg-transparent border-none p-0"
        >
          Experiments
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
          Get in touch
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
            Hi there, I&apos;m a creative technologist & designer,
            <br />
            Crafting interactive web flagships and tactile digital experiences
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
            className={`flex flex-wrap gap-y-1 transition-all duration-400 ease-out ${
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
              See My Projects
            </button>

            {/* White pill button 2: About Me */}
            <button
              type="button"
              onClick={() => setActiveModal('about')}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              About Me
            </button>

            {/* White pill button 3: My Skills & Stack */}
            <button
              type="button"
              onClick={() => setActiveModal('skills')}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              My Skills & Stack
            </button>

            {/* White pill button 4: My Creative Process */}
            <button
              type="button"
              onClick={() => setActiveModal('process')}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              My Creative Process
            </button>

            {/* Outline pill button with copy icon */}
            <button
              type="button"
              onClick={handleCopyEmail}
              title="Click to copy email address"
              className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
            >
              <span>
                Reach me:{' '}
                <span className="underline underline-offset-1">
                  {copied ? 'Copied to clipboard!' : 'hello@myportfolio.dev'}
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
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
