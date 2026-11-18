import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Project } from '../types.ts';
import { TELEGRAM_URL, formatCloudinaryUrl, SECTOR_LOGOS, getProjectImages } from '../utils/portfolio.ts';
import { X, Send, MapPin, Calendar, Building, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Translations, Language } from '../utils/i18n.ts';

interface ProjectLightboxProps {
  project: Project | null;
  onClose: () => void;
  t: Translations;
  currentLang: Language;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({ project, onClose, t, currentLang }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const lastTouchX = useRef<number>(0);
  const gestureLock = useRef<'x' | 'y' | null>(null);

  const images = useMemo(() => (project ? getProjectImages(project) : []), [project]);
  const hasMultiple = images.length > 1;

  useEffect(() => {
    setSlideIndex(0);
    setDragOffsetPx(0);
    setIsSwiping(false);
    gestureLock.current = null;
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (hasMultiple && e.key === 'ArrowRight') {
        setSlideIndex((prev) => (prev + 1) % images.length);
      } else if (hasMultiple && e.key === 'ArrowLeft') {
        setSlideIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, hasMultiple, images.length, onClose]);

  if (!project) return null;

  const sectorMeta = t.sectors[project.sector];
  const safeIndex = slideIndex < images.length ? slideIndex : 0;
  const title = (currentLang === 'am' && project.titleAm) ? project.titleAm : project.title;
  const desc = (currentLang === 'am' && project.descriptionAm) ? project.descriptionAm : project.description;
  const client = (currentLang === 'am' && project.clientAm) ? project.clientAm : project.client;
  const location = (currentLang === 'am' && project.locationAm) ? project.locationAm : project.location;

  const resetTouchState = () => {
    touchStartX.current = null;
    touchStartY.current = null;
    lastTouchX.current = 0;
    gestureLock.current = null;
    setDragOffsetPx(0);
    setIsSwiping(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    lastTouchX.current = touch.clientX;
    gestureLock.current = null;
    setDragOffsetPx(0);
    setIsSwiping(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!hasMultiple || touchStartX.current === null || touchStartY.current === null) return;
    const touch = e.touches[0];
    if (!touch) return;

    const dx = touch.clientX - touchStartX.current;
    const dy = touch.clientY - touchStartY.current;
    lastTouchX.current = touch.clientX;

    if (gestureLock.current === null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      gestureLock.current = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
    }

    if (gestureLock.current === 'y') {
      return;
    }

    if (e.cancelable) {
      e.preventDefault();
    }
    setIsSwiping(true);
    setDragOffsetPx(dx);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!hasMultiple || touchStartX.current === null) {
      resetTouchState();
      return;
    }
    const endX = e.changedTouches[0]?.clientX ?? lastTouchX.current;
    const diff = endX - touchStartX.current;
    const width = viewportRef.current?.clientWidth || 320;
    const threshold = Math.min(48, Math.max(30, width * 0.15));

    if (gestureLock.current === 'x' && Math.abs(diff) > threshold) {
      setSlideIndex((prev) => (diff < 0 ? (prev + 1) % images.length : (prev - 1 + images.length) % images.length));
    }
    resetTouchState();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto overscroll-contain"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#0b0e14] border border-[#d4af37]/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] text-left my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="መዝጊያ / Close"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 border border-slate-700 text-slate-300 hover:text-white hover:border-[#d4af37] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Side */}
        <div
          ref={viewportRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={resetTouchState}
          className="md:w-3/5 bg-slate-950 relative flex items-center justify-center overflow-hidden min-h-[260px] md:min-h-[460px] shrink-0 select-none touch-pan-y overscroll-x-contain"
        >
          {hasMultiple ? (
            <div
              className={`flex w-full h-full ${isSwiping ? '' : 'transition-transform duration-300 ease-out'}`}
              style={{
                transform: `translate3d(calc(-${safeIndex * 100}% + ${dragOffsetPx}px), 0, 0)`,
                willChange: 'transform'
              }}
            >
              {images.map((imgUrl, idx) => (
                <div key={`${imgUrl}-${idx}`} className="w-full h-full shrink-0 overflow-hidden bg-slate-950">
                  <img
                    src={formatCloudinaryUrl(imgUrl)}
                    alt={`${title} (${idx + 1}/${images.length})`}
                    draggable={false}
                    className="w-full h-full object-cover block select-none"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <img
              src={formatCloudinaryUrl(images[0])}
              alt={title}
              draggable={false}
              className="w-full h-full object-cover select-none"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80';
              }}
            />
          )}

          <div className="pointer-events-none absolute top-4 left-4 z-10 px-3 py-1 rounded-md bg-black/85 backdrop-blur-md border border-[#d4af37]/40 text-xs font-mono font-bold text-[#f3d375] uppercase flex items-center gap-2 shadow-lg">
            <img 
              src={SECTOR_LOGOS[project.sector]} 
              alt={sectorMeta?.name || project.sector} 
              className="w-5 h-5 rounded-full object-cover border border-[#d4af37]/60 shrink-0" 
            />
            <span>{sectorMeta?.name || project.sector}</span>
          </div>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={() => setSlideIndex((prev) => (prev - 1 + images.length) % images.length)}
                aria-label="Previous project image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-[#d4af37]/85 text-[#fce8a6] hover:text-slate-950 border border-white/15 hover:border-[#d4af37] backdrop-blur-md flex items-center justify-center transition-all shadow-md z-20"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setSlideIndex((prev) => (prev + 1) % images.length)}
                aria-label="Next project image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-[#d4af37]/85 text-[#fce8a6] hover:text-slate-950 border border-white/15 hover:border-[#d4af37] backdrop-blur-md flex items-center justify-center transition-all shadow-md z-20"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/15">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSlideIndex(idx)}
                    aria-label={`Go to project image ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === safeIndex ? 'w-4 bg-[#d4af37]/90' : 'w-1.5 bg-white/45 hover:bg-[#fce8a6]/80'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content Side */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto overscroll-contain touch-pan-y">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37] mb-2 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.lightbox.badge}</span>
            </div>

            <h3 className="font-heading text-2xl font-bold text-white leading-tight">
              {title}
            </h3>

            <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {desc}
            </p>

            {/* Metadata specs */}
            <div className="mt-6 space-y-2.5 pt-6 border-t border-slate-800/80 text-xs text-slate-400">
              {client && (
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>{t.lightbox.client} <strong className="text-white font-medium">{client}</strong></span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>{t.lightbox.location} <strong className="text-white font-medium">{location}</strong></span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{t.lightbox.year} <strong className="text-white font-medium">{project.year || '2025'}</strong></span>
              </div>
            </div>
          </div>

          {/* Direct Telegram Connection */}
          <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              {t.lightbox.discussTitle}
            </div>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded bg-gradient-to-r from-[#aa7c11] via-[#d4af37] to-[#aa7c11] hover:brightness-110 text-slate-950 text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2.5 gold-glow"
            >
              <Send className="w-4 h-4 text-slate-950" />
              <span>{t.lightbox.connectBtn}</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
