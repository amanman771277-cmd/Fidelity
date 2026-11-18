import React, { useState, useMemo, useRef } from 'react';
import { Project, SectorId } from '../types.ts';
import { TELEGRAM_URL, TELEGRAM_HANDLE, formatCloudinaryUrl, SECTOR_LOGOS, getProjectImages } from '../utils/portfolio.ts';
import { Search, Send, ExternalLink, Sparkles, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Translations, Language } from '../utils/i18n.ts';

interface ProjectCardMediaProps {
  project: Project;
  title: string;
  sectorShortName: string;
  viewDetailsLabel: string;
  onSelect: () => void;
}

const ProjectCardMedia: React.FC<ProjectCardMediaProps> = ({
  project,
  title,
  sectorShortName,
  viewDetailsLabel,
  onSelect
}) => {
  const images = useMemo(() => getProjectImages(project), [project]);
  const hasMultiple = images.length > 1;
  const [slideIndex, setSlideIndex] = useState(0);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const lastTouchX = useRef<number>(0);
  const gestureLock = useRef<'x' | 'y' | null>(null);
  const didSwipe = useRef(false);

  const safeIndex = slideIndex < images.length ? slideIndex : 0;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndex((prev) => (prev + 1) % images.length);
  };

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setSlideIndex(idx);
  };

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
    didSwipe.current = false;
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
    didSwipe.current = true;
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
      didSwipe.current = true;
      setSlideIndex((prev) => (diff < 0 ? (prev + 1) % images.length : (prev - 1 + images.length) % images.length));
    }
    resetTouchState();
  };

  return (
    <div
      ref={viewportRef}
      onClick={() => {
        if (didSwipe.current) {
          didSwipe.current = false;
          return;
        }
        onSelect();
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={resetTouchState}
      className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer select-none touch-pan-y overscroll-x-contain"
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
            <div key={`${imgUrl}-${idx}`} className="w-full h-full shrink-0 overflow-hidden bg-slate-900">
              <img
                src={formatCloudinaryUrl(imgUrl)}
                alt={`${title} (${idx + 1}/${images.length})`}
                loading={idx === 0 ? 'lazy' : 'eager'}
                draggable={false}
                className="w-full h-full object-cover block select-none"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <img
          src={formatCloudinaryUrl(images[0])}
          alt={title}
          loading="lazy"
          draggable={false}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';
          }}
        />
      )}

      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07090d] via-transparent to-transparent opacity-80" />

      {/* Sector badge with circular Cloudinary logo */}
      <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-[#d4af37]/40 text-[10px] font-mono tracking-wider font-bold text-[#f3d375] uppercase flex items-center gap-2 shadow-lg">
        <img
          src={SECTOR_LOGOS[project.sector]}
          alt={sectorShortName}
          loading="lazy"
          className="w-4 h-4 rounded-full object-cover border border-[#d4af37]/60 shrink-0"
        />
        <span>{sectorShortName}</span>
      </div>

      {/* Multi-image navigation arrows and dot indicators */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous post image"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-[#d4af37]/85 text-[#fce8a6] hover:text-slate-950 border border-white/15 hover:border-[#d4af37] backdrop-blur-md flex items-center justify-center transition-all shadow-md z-20"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next post image"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-[#d4af37]/85 text-[#fce8a6] hover:text-slate-950 border border-white/15 hover:border-[#d4af37] backdrop-blur-md flex items-center justify-center transition-all shadow-md z-20"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/15"
          >
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => handleDotClick(e, idx)}
                aria-label={`Go to image ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === safeIndex ? 'w-4 bg-[#d4af37]/90' : 'w-1.5 bg-white/45 hover:bg-[#fce8a6]/80'
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Quick view prompt */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[1px]">
        <span className="px-3.5 py-1.5 rounded-full bg-[#d4af37] text-slate-950 text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transform scale-90 group-hover:scale-100 transition-transform">
          <span>{viewDetailsLabel}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};

interface PortfolioSectionProps {
  projects: Project[];
  activeSector: SectorId;
  onSectorChange: (sector: SectorId) => void;
  onSelectProject: (project: Project) => void;
  onOpenAdmin: () => void;
  isFirebaseLive: boolean;
  isLoading?: boolean;
  t: Translations;
  currentLang: Language;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  projects,
  activeSector,
  onSectorChange,
  onSelectProject,
  onOpenAdmin,
  isFirebaseLive,
  isLoading = false,
  t,
  currentLang
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSector = activeSector === 'all' || p.sector === activeSector;
      if (!matchesSector) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        p.title.toLowerCase().includes(q) ||
        (p.titleAm && p.titleAm.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q) ||
        (p.descriptionAm && p.descriptionAm.toLowerCase().includes(q)) ||
        (p.client && p.client.toLowerCase().includes(q)) ||
        (p.location && p.location.toLowerCase().includes(q))
      );
    });
  }, [projects, activeSector, searchQuery]);

  const sectorCounts = useMemo(() => {
    return {
      all: projects.length,
      architects: projects.filter((p) => p.sector === 'architects').length,
      branding: projects.filter((p) => p.sector === 'branding').length,
      furniture: projects.filter((p) => p.sector === 'furniture').length
    };
  }, [projects]);

  return (
    <section id="portfolio" className="py-24 bg-[#090c12] border-b border-[#d4af37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#f3d375] text-xs font-mono tracking-[0.2em] uppercase">
                <Sparkles className="w-3 h-3 text-[#d4af37]" />
                {t.portfolio.badge}
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight mt-3">
              {t.portfolio.heading}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 font-light">
              {t.portfolio.subtitle}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.portfolio.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded bg-[#10141e] border border-slate-800 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-xs text-white placeholder-slate-500 transition-all outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-800/80">
          <button
            onClick={() => onSectorChange('all')}
            className={`px-4 py-2 rounded text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeSector === 'all'
                ? 'bg-gradient-to-r from-[#aa7c11] via-[#d4af37] to-[#aa7c11] text-slate-950 gold-glow'
                : 'border border-slate-800 bg-[#10141e] text-slate-400 hover:text-white hover:border-[#d4af37]/40'
            }`}
          >
            <span>{t.portfolio.allSectors}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              activeSector === 'all' ? 'bg-black/30 text-black font-extrabold' : 'bg-slate-800 text-slate-300'
            }`}>
              {sectorCounts.all}
            </span>
          </button>

          <button
            onClick={() => onSectorChange('architects')}
            className={`px-4 py-2 rounded text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeSector === 'architects'
                ? 'bg-[#d4af37] text-slate-950 gold-glow'
                : 'border border-slate-800 bg-[#10141e] text-slate-400 hover:text-white hover:border-[#d4af37]/40'
            }`}
          >
            <span>{t.sectors.architects.shortName}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              activeSector === 'architects' ? 'bg-black/30 text-black font-extrabold' : 'bg-slate-800 text-slate-300'
            }`}>
              {sectorCounts.architects}
            </span>
          </button>

          <button
            onClick={() => onSectorChange('branding')}
            className={`px-4 py-2 rounded text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeSector === 'branding'
                ? 'bg-[#d4af37] text-slate-950 gold-glow'
                : 'border border-slate-800 bg-[#10141e] text-slate-400 hover:text-white hover:border-[#d4af37]/40'
            }`}
          >
            <span>{t.sectors.branding.shortName}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              activeSector === 'branding' ? 'bg-black/30 text-black font-extrabold' : 'bg-slate-800 text-slate-300'
            }`}>
              {sectorCounts.branding}
            </span>
          </button>

          <button
            onClick={() => onSectorChange('furniture')}
            className={`px-4 py-2 rounded text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeSector === 'furniture'
                ? 'bg-[#d4af37] text-slate-950 gold-glow'
                : 'border border-slate-800 bg-[#10141e] text-slate-400 hover:text-white hover:border-[#d4af37]/40'
            }`}
          >
            <span>{t.sectors.furniture.shortName}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              activeSector === 'furniture' ? 'bg-black/30 text-black font-extrabold' : 'bg-slate-800 text-slate-300'
            }`}>
              {sectorCounts.furniture}
            </span>
          </button>
        </div>

        {/* Project Grid / Skeletons */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-label="Loading portfolio projects">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`portfolio-skeleton-${index}`}
                className="dark-card rounded-xl overflow-hidden flex flex-col justify-between border border-slate-800/80 animate-pulse shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
              >
                <div>
                  {/* Media Skeleton */}
                  <div className="relative aspect-[16/10] bg-slate-800/70 overflow-hidden">
                    {/* Sector badge placeholder */}
                    <div className="absolute top-3 left-3 w-28 h-6 rounded-md bg-slate-800/90 border border-slate-700/50 flex items-center gap-2 px-2">
                      <div className="w-4 h-4 rounded-full bg-slate-700 shrink-0" />
                      <div className="w-14 h-2.5 bg-slate-700/80 rounded" />
                    </div>
                  </div>

                  {/* Body Skeleton */}
                  <div className="p-6 space-y-4">
                    {/* Location & Year meta */}
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-28 bg-slate-800/80 rounded" />
                      <div className="h-3 w-10 bg-slate-800/80 rounded" />
                    </div>

                    {/* Title */}
                    <div className="h-5 w-4/5 bg-slate-700/80 rounded" />

                    {/* Description lines */}
                    <div className="space-y-2 pt-1">
                      <div className="h-3 w-full bg-slate-800/70 rounded" />
                      <div className="h-3 w-5/6 bg-slate-800/70 rounded" />
                      <div className="h-3 w-3/4 bg-slate-800/50 rounded" />
                    </div>

                    {/* Client field */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                      <div className="h-3 w-16 bg-slate-800/60 rounded" />
                      <div className="h-3 w-24 bg-slate-800/80 rounded" />
                    </div>
                  </div>
                </div>

                {/* Footer Telegram Button Placeholder */}
                <div className="px-6 pb-6 pt-2">
                  <div className="w-full h-10 rounded border border-[#d4af37]/20 bg-[#d4af37]/5 flex items-center justify-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#d4af37]/30" />
                    <div className="w-24 h-3 bg-[#d4af37]/30 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-xl border border-dashed border-slate-800 bg-[#0f131a]">
            <Filter className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="font-heading text-lg font-bold text-white">{t.portfolio.noResults}</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              {t.portfolio.noResultsSub}
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => {
                  onSectorChange('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded border border-slate-700 text-xs text-slate-300 hover:text-white"
              >
                {t.portfolio.resetFilters}
              </button>
              <button
                onClick={onOpenAdmin}
                className="px-4 py-2 rounded bg-[#d4af37] text-slate-950 text-xs font-bold hover:brightness-110 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.portfolio.postNewWork}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const sectorMeta = t.sectors[project.sector];
              const title = (currentLang === 'am' && project.titleAm) ? project.titleAm : project.title;
              const desc = (currentLang === 'am' && project.descriptionAm) ? project.descriptionAm : project.description;
              const client = (currentLang === 'am' && project.clientAm) ? project.clientAm : project.client;
              const location = (currentLang === 'am' && project.locationAm) ? project.locationAm : project.location;

              return (
                <article
                  key={`${project.id}-${index}`}
                  className="dark-card rounded-xl overflow-hidden group flex flex-col justify-between hover:border-[#d4af37] transition-all hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
                >
                  <div>
                    <ProjectCardMedia
                      project={project}
                      title={title}
                      sectorShortName={sectorMeta?.shortName || project.sector}
                      viewDetailsLabel={t.portfolio.viewDetails}
                      onSelect={() => onSelectProject(project)}
                    />

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-2">
                        <span>{location || (currentLang === 'am' ? 'ፊዴሊቲ ፖርትፎሊዮ' : 'Fidelity Portfolio')}</span>
                        <span>{project.year || '2025'}</span>
                      </div>

                      <h3 
                        onClick={() => onSelectProject(project)}
                        className="font-heading text-lg font-bold text-white group-hover:text-[#f3d375] transition-colors leading-snug cursor-pointer"
                      >
                        {title}
                      </h3>

                      <p className="mt-2.5 text-xs text-slate-400 leading-relaxed line-clamp-3">
                        {desc}
                      </p>

                      {client && (
                        <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                          <span className="text-slate-400">{t.portfolio.clientLabel} </span>
                          <span className="text-slate-300 font-medium">{client}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Direct Telegram Button linking to @amanman777 */}
                  <div className="px-6 pb-6 pt-2">
                    <a
                      href={TELEGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3.5 rounded border border-[#d4af37]/40 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 text-[#f3d375] hover:text-white text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 group/btn shadow-[0_0_12px_rgba(212,175,55,0.08)]"
                      title={`Telegram: @${TELEGRAM_HANDLE}`}
                    >
                      <Send className="w-3.5 h-3.5 text-[#d4af37] group-hover/btn:scale-110 transition-transform" />
                      <span>{t.portfolio.inquireTelegram}</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
