import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Send, ArrowDown, ChevronRight, ChevronLeft } from 'lucide-react';
import { TELEGRAM_URL, SECTOR_LOGOS, HERO_BANNER_URL, formatCloudinaryUrl } from '../utils/portfolio.ts';
import { Translations, Language } from '../utils/i18n.ts';

interface HeroProps {
  onSelectSector: (sector: 'all' | 'architects' | 'branding' | 'furniture') => void;
  heroBanners?: string[];
  t: Translations;
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({ onSelectSector, heroBanners, t }) => {
  const slides = useMemo(() => {
    const valid = (heroBanners || [])
      .map((u) => (typeof u === 'string' ? u.trim() : ''))
      .filter((u) => u.length > 0)
      .slice(0, 4);
    return valid.length > 0 ? valid : [HERO_BANNER_URL];
  }, [heroBanners]);

  const hasMultiple = slides.length > 1;

  // Cloned-edge slides array for seamless infinite forward & backward looping:
  // [lastClone, ...slides, firstClone]
  const extendedSlides = useMemo(() => {
    if (!hasMultiple) return slides;
    return [slides[slides.length - 1], ...slides, slides[0]];
  }, [slides, hasMultiple]);

  const [trackIndex, setTrackIndex] = useState<number>(hasMultiple ? 1 : 0);
  const [transitionEnabled, setTransitionEnabled] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const snapFallbackTimerRef = useRef<number | null>(null);
  const reenableRafRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (snapFallbackTimerRef.current !== null) {
      window.clearTimeout(snapFallbackTimerRef.current);
      snapFallbackTimerRef.current = null;
    }
    if (reenableRafRef.current !== null) {
      window.cancelAnimationFrame(reenableRafRef.current);
      reenableRafRef.current = null;
    }
  }, []);

  // Reset slider cleanly when the list of slides changes
  useEffect(() => {
    clearTimers();
    setTransitionEnabled(false);
    setTrackIndex(slides.length > 1 ? 1 : 0);
    const raf = window.requestAnimationFrame(() => {
      reenableRafRef.current = window.requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
    });
    return () => {
      window.cancelAnimationFrame(raf);
      clearTimers();
    };
  }, [slides, clearTimers]);

  // Snap silently from cloned edge back to the corresponding real slide
  const snapIfOnClone = useCallback(
    (idx: number) => {
      if (!hasMultiple) return;
      if (idx === slides.length + 1) {
        setTransitionEnabled(false);
        setTrackIndex(1);
        window.requestAnimationFrame(() => {
          reenableRafRef.current = window.requestAnimationFrame(() => {
            setTransitionEnabled(true);
          });
        });
      } else if (idx === 0) {
        setTransitionEnabled(false);
        setTrackIndex(slides.length);
        window.requestAnimationFrame(() => {
          reenableRafRef.current = window.requestAnimationFrame(() => {
            setTransitionEnabled(true);
          });
        });
      }
    },
    [hasMultiple, slides.length]
  );

  // Guard fallback in case browser skips transitionend (e.g. background tab)
  useEffect(() => {
    if (!hasMultiple) return;
    if (trackIndex === 0 || trackIndex === slides.length + 1) {
      snapFallbackTimerRef.current = window.setTimeout(() => {
        snapIfOnClone(trackIndex);
      }, 750);
      return () => {
        if (snapFallbackTimerRef.current !== null) {
          window.clearTimeout(snapFallbackTimerRef.current);
          snapFallbackTimerRef.current = null;
        }
      };
    }
  }, [trackIndex, hasMultiple, slides.length, snapIfOnClone]);

  const handleNext = useCallback(() => {
    if (!hasMultiple) return;
    setTransitionEnabled(true);
    setTrackIndex((prev) => {
      if (prev >= slides.length + 1) return 1;
      return prev + 1;
    });
  }, [hasMultiple, slides.length]);

  const handlePrev = useCallback(() => {
    if (!hasMultiple) return;
    setTransitionEnabled(true);
    setTrackIndex((prev) => {
      if (prev <= 0) return slides.length;
      return prev - 1;
    });
  }, [hasMultiple, slides.length]);

  const handleGoToDot = useCallback(
    (dotIdx: number) => {
      if (!hasMultiple) return;
      setTransitionEnabled(true);
      setTrackIndex(dotIdx + 1);
    },
    [hasMultiple]
  );

  // Auto-playing continuous forward carousel when multiple banners exist
  useEffect(() => {
    if (!hasMultiple || isPaused) return;
    const timer = window.setInterval(() => {
      handleNext();
    }, 4500);
    return () => window.clearInterval(timer);
  }, [hasMultiple, isPaused, handleNext]);

  // Active real dot index (0 .. slides.length - 1)
  const activeDotIndex = !hasMultiple
    ? 0
    : trackIndex === 0
      ? slides.length - 1
      : trackIndex >= slides.length + 1
        ? 0
        : trackIndex - 1;

  const heroViewportRef = useRef<HTMLDivElement | null>(null);
  const heroTouchStartX = useRef<number | null>(null);
  const heroTouchStartY = useRef<number | null>(null);
  const heroGestureLock = useRef<'x' | 'y' | null>(null);
  const [heroDragOffsetPx, setHeroDragOffsetPx] = useState(0);
  const [isHeroSwiping, setIsHeroSwiping] = useState(false);

  const resetHeroTouch = () => {
    heroTouchStartX.current = null;
    heroTouchStartY.current = null;
    heroGestureLock.current = null;
    setHeroDragOffsetPx(0);
    setIsHeroSwiping(false);
    setIsPaused(false);
  };

  const handleHeroTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    setIsPaused(true);
    heroTouchStartX.current = e.touches[0].clientX;
    heroTouchStartY.current = e.touches[0].clientY;
    heroGestureLock.current = null;
    setHeroDragOffsetPx(0);
    setIsHeroSwiping(false);
  };

  const handleHeroTouchMove = (e: React.TouchEvent) => {
    if (!hasMultiple || heroTouchStartX.current === null || heroTouchStartY.current === null) return;
    const touch = e.touches[0];
    if (!touch) return;
    const dx = touch.clientX - heroTouchStartX.current;
    const dy = touch.clientY - heroTouchStartY.current;
    if (heroGestureLock.current === null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      heroGestureLock.current = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
    }
    if (heroGestureLock.current === 'y') return;
    if (e.cancelable) e.preventDefault();
    setIsHeroSwiping(true);
    setHeroDragOffsetPx(dx);
  };

  const handleHeroTouchEnd = (e: React.TouchEvent) => {
    if (!hasMultiple || heroTouchStartX.current === null) {
      resetHeroTouch();
      return;
    }
    const endX = e.changedTouches[0]?.clientX ?? heroTouchStartX.current;
    const diff = endX - heroTouchStartX.current;
    const width = heroViewportRef.current?.clientWidth || 320;
    const threshold = Math.min(48, Math.max(30, width * 0.14));
    if (heroGestureLock.current === 'x' && Math.abs(diff) > threshold) {
      if (diff < 0) handleNext();
      else handlePrev();
    }
    resetHeroTouch();
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden border-b border-[#d4af37]/20 bg-[#07090d] py-16 sm:py-24 lg:py-28">
      {/* Subtle luxury ambient gold gradients & geometric grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.22),rgba(7,9,13,0))]" />
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(to right, #d4af37 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Prestige Motto Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 mb-6 sm:mb-8 backdrop-blur-sm shadow-[0_0_20px_rgba(212,175,55,0.15)] animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
          <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#fce8a6] uppercase font-mono">
            {t.motto}
          </span>
        </div>

        {/* Uniform 16:9 Multi-Image Hero Slider with Seamless Infinite Loop */}
        <div
          ref={heroViewportRef}
          className="relative w-full max-w-4xl mx-auto my-4 sm:my-6 aspect-video rounded-2xl overflow-hidden border-2 border-[#d4af37]/40 shadow-[0_0_50px_rgba(212,175,55,0.3)] group hover:border-[#d4af37] transition-colors duration-500 bg-[#07090d] select-none touch-pan-y overscroll-x-contain"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleHeroTouchStart}
          onTouchMove={handleHeroTouchMove}
          onTouchEnd={handleHeroTouchEnd}
          onTouchCancel={resetHeroTouch}
        >
          <div
            onTransitionEnd={(e) => {
              if (e.target === e.currentTarget && e.propertyName === 'transform') {
                snapIfOnClone(trackIndex);
              }
            }}
            className={`flex w-full h-full ${transitionEnabled && !isHeroSwiping ? 'transition-transform duration-700 ease-out' : ''}`}
            style={{
              transform: `translate3d(calc(-${trackIndex * 100}% + ${heroDragOffsetPx}px), 0, 0)`,
              transition: transitionEnabled && !isHeroSwiping ? undefined : 'none'
            }}
          >
            {extendedSlides.map((bannerUrl, idx) => (
              <div key={`${bannerUrl}-${idx}`} className="w-full h-full shrink-0 aspect-video overflow-hidden bg-[#07090d]">
                <img
                  src={formatCloudinaryUrl(bannerUrl)}
                  alt={`Fidelity Business Group Big Hero Corporate Banner ${idx + 1}`}
                  draggable={false}
                  className="w-full h-full object-cover object-center block select-none"
                  loading={idx <= 1 ? 'eager' : 'lazy'}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== HERO_BANNER_URL) {
                      target.src = HERO_BANNER_URL;
                    }
                  }}
                />
              </div>
            ))}
          </div>

          {/* Previous / Next Arrows */}
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Hero Banner"
                className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-[#d4af37]/85 text-[#fce8a6] hover:text-slate-950 border border-white/15 hover:border-[#d4af37] backdrop-blur-md flex items-center justify-center transition-all shadow-md z-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Hero Banner"
                className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-[#d4af37]/85 text-[#fce8a6] hover:text-slate-950 border border-white/15 hover:border-[#d4af37] backdrop-blur-md flex items-center justify-center transition-all shadow-md z-10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/15">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleGoToDot(idx)}
                    aria-label={`Go to banner ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeDotIndex
                        ? 'w-4 bg-[#d4af37]/90'
                        : 'w-1.5 bg-white/45 hover:bg-[#fce8a6]/80'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Corporate Title */}
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-5xl mx-auto leading-[1.15] mt-4">
          {t.hero.titleStart} <span className="gold-gradient-text">{t.hero.titleGradient}</span>
        </h1>

        {/* Subtitle / Amharic Overview */}
        <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
          {t.hero.subtitle}
        </p>

        {/* Hero Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#portfolio"
            className="px-8 py-3.5 rounded bg-gradient-to-r from-[#aa7c11] via-[#d4af37] to-[#aa7c11] text-slate-950 font-bold tracking-wider text-xs uppercase hover:brightness-110 transition-all gold-glow inline-flex items-center gap-2"
          >
            <span>{t.hero.explorePortfolio}</span>
            <ChevronRight className="w-4 h-4" />
          </a>

          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded border border-[#d4af37]/40 bg-slate-900/80 hover:bg-[#d4af37]/15 text-[#f3d375] font-bold tracking-wider text-xs uppercase transition-all inline-flex items-center gap-2.5 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            <Send className="w-4 h-4 text-[#d4af37]" />
            <span>{t.hero.connectTelegram}</span>
          </a>
        </div>

        {/* 3 Core Business Sectors Mini-Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 text-left max-w-6xl mx-auto w-full">
          
          {/* Sector 1: Architects */}
          <div 
            onClick={() => {
              onSelectSector('architects');
              const el = document.getElementById('portfolio');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="cursor-pointer group p-6 rounded-lg bg-gradient-to-b from-[#141824]/90 to-[#0b0e14]/90 border border-[#d4af37]/20 hover:border-[#d4af37] transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]"
          >
            <div className="flex items-center justify-between mb-4">
              <img
                src={SECTOR_LOGOS.architects}
                alt={t.sectors.architects.name}
                loading="lazy"
                className="w-11 h-11 rounded-lg object-cover border border-[#d4af37]/40 shadow-[0_0_12px_rgba(212,175,55,0.2)] group-hover:scale-105 transition-transform"
              />
              <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">{t.sectors.architects.badge}</span>
            </div>
            <h3 className="font-heading font-bold text-white text-base group-hover:text-[#f3d375] transition-colors leading-snug">
              {t.sectors.architects.name}
            </h3>
            <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {t.sectors.architects.description}
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-[#d4af37] tracking-wider uppercase">
              <span>{t.hero.viewDivisionWorks}</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Sector 2: Branding */}
          <div 
            onClick={() => {
              onSelectSector('branding');
              const el = document.getElementById('portfolio');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="cursor-pointer group p-6 rounded-lg bg-gradient-to-b from-[#141824]/90 to-[#0b0e14]/90 border border-[#d4af37]/20 hover:border-[#d4af37] transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]"
          >
            <div className="flex items-center justify-between mb-4">
              <img
                src={SECTOR_LOGOS.branding}
                alt={t.sectors.branding.name}
                loading="lazy"
                className="w-11 h-11 rounded-lg object-cover border border-[#d4af37]/40 shadow-[0_0_12px_rgba(212,175,55,0.2)] group-hover:scale-105 transition-transform"
              />
              <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">{t.sectors.branding.badge}</span>
            </div>
            <h3 className="font-heading font-bold text-white text-base group-hover:text-[#f3d375] transition-colors leading-snug">
              {t.sectors.branding.name}
            </h3>
            <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {t.sectors.branding.description}
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-[#d4af37] tracking-wider uppercase">
              <span>{t.hero.viewDivisionWorks}</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Sector 3: Furniture */}
          <div 
            onClick={() => {
              onSelectSector('furniture');
              const el = document.getElementById('portfolio');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="cursor-pointer group p-6 rounded-lg bg-gradient-to-b from-[#141824]/90 to-[#0b0e14]/90 border border-[#d4af37]/20 hover:border-[#d4af37] transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]"
          >
            <div className="flex items-center justify-between mb-4">
              <img
                src={SECTOR_LOGOS.furniture}
                alt={t.sectors.furniture.name}
                loading="lazy"
                className="w-11 h-11 rounded-lg object-cover border border-[#d4af37]/40 shadow-[0_0_12px_rgba(212,175,55,0.2)] group-hover:scale-105 transition-transform"
              />
              <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">{t.sectors.furniture.badge}</span>
            </div>
            <h3 className="font-heading font-bold text-white text-base group-hover:text-[#f3d375] transition-colors leading-snug">
              {t.sectors.furniture.name}
            </h3>
            <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {t.sectors.furniture.description}
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-[#d4af37] tracking-wider uppercase">
              <span>{t.hero.viewDivisionWorks}</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

        {/* Scroll prompt */}
        <div className="mt-14 flex items-center justify-center">
          <a
            href="#sectors"
            className="text-slate-500 hover:text-[#d4af37] transition-colors flex flex-col items-center gap-1 text-[11px] font-mono tracking-widest uppercase"
          >
            <span>{t.hero.exploreDivisions}</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#d4af37]" />
          </a>
        </div>

      </div>
    </section>
  );
};
