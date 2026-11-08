import React from 'react';
import { Project } from '../types.ts';
import { TELEGRAM_URL, TELEGRAM_HANDLE, formatCloudinaryUrl, SECTOR_LOGOS } from '../utils/portfolio.ts';
import { X, Send, MapPin, Calendar, Building, Sparkles } from 'lucide-react';
import { Translations, Language } from '../utils/i18n.ts';

interface ProjectLightboxProps {
  project: Project | null;
  onClose: () => void;
  t: Translations;
  currentLang: Language;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({ project, onClose, t, currentLang }) => {
  if (!project) return null;

  const sectorMeta = t.sectors[project.sector];
  const fullImg = formatCloudinaryUrl(project.imageUrl);
  const title = (currentLang === 'am' && project.titleAm) ? project.titleAm : project.title;
  const desc = (currentLang === 'am' && project.descriptionAm) ? project.descriptionAm : project.description;
  const client = (currentLang === 'am' && project.clientAm) ? project.clientAm : project.client;
  const location = (currentLang === 'am' && project.locationAm) ? project.locationAm : project.location;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#0b0e14] border border-[#d4af37]/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] text-left"
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
        <div className="md:w-3/5 bg-slate-950 relative flex items-center justify-center overflow-hidden min-h-[260px] md:min-h-[460px]">
          <img
            src={fullImg}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80';
            }}
          />
          <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-black/85 backdrop-blur-md border border-[#d4af37]/40 text-xs font-mono font-bold text-[#f3d375] uppercase flex items-center gap-2 shadow-lg">
            <img 
              src={SECTOR_LOGOS[project.sector]} 
              alt={sectorMeta?.name || project.sector} 
              className="w-5 h-5 rounded-full object-cover border border-[#d4af37]/60 shrink-0" 
            />
            <span>{sectorMeta?.name || project.sector}</span>
          </div>
        </div>

        {/* Content Side */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
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
