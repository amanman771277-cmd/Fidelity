import React from 'react';
import { CheckCircle2, Send, ArrowRight } from 'lucide-react';
import { TELEGRAM_URL, TELEGRAM_HANDLE, SECTOR_LOGOS } from '../utils/portfolio.ts';
import { Translations, Language } from '../utils/i18n.ts';

interface SectorsSectionProps {
  onFilterBySector: (sector: 'architects' | 'branding' | 'furniture') => void;
  t: Translations;
  currentLang: Language;
}

export const SectorsSection: React.FC<SectorsSectionProps> = ({ onFilterBySector, t }) => {
  return (
    <section id="sectors" className="py-24 bg-[#07090d] border-b border-[#d4af37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#f3d375] text-xs font-mono tracking-[0.2em] uppercase mb-4">
            {t.sectors.badge}
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {t.sectors.heading}
          </h2>
          <p className="mt-4 text-base text-slate-400 font-light leading-relaxed">
            {t.sectors.subtitle}
          </p>
        </div>

        {/* Sectors 3-Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sector 1: Architects & Engineers */}
          <div className="dark-card rounded-xl p-8 flex flex-col justify-between relative group hover:border-[#d4af37] transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-bl-full pointer-events-none group-hover:bg-[#d4af37]/10 transition-colors" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <img
                  src={SECTOR_LOGOS.architects}
                  alt={t.sectors.architects.name}
                  className="w-14 h-14 rounded-xl object-cover border border-[#d4af37]/40 shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:scale-105 transition-transform"
                />
                <span className="text-xs font-mono font-bold tracking-widest text-[#d4af37] px-2.5 py-1 rounded bg-black/50 border border-[#d4af37]/20 uppercase">
                  {t.sectors.architects.badge}
                </span>
              </div>

              <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#f3d375] transition-colors leading-tight">
                {t.sectors.architects.name}
              </h3>
              <p className="text-xs font-medium text-[#d4af37] mt-1 mb-4">
                {t.sectors.architects.tagline}
              </p>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                {t.sectors.architects.description}
              </p>

              {/* Capabilities checklist */}
              <div className="space-y-2.5 pt-4 border-t border-slate-800/80 mb-6">
                {t.sectors.architects.capabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-800/60 mb-6 text-center">
                {t.sectors.architects.metrics.map((m, idx) => (
                  <div key={idx}>
                    <div className="font-heading font-bold text-[#f3d375] text-base">{m.value}</div>
                    <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => onFilterBySector('architects')}
                className="w-full py-2.5 px-4 rounded border border-[#d4af37]/40 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 text-[#f3d375] text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
              >
                <span>{t.sectors.architects.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded border border-slate-800 hover:border-[#d4af37]/50 bg-slate-900/60 text-slate-300 hover:text-white text-xs font-medium tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{t.sectors.consultTelegram} (@{TELEGRAM_HANDLE})</span>
              </a>
            </div>
          </div>

          {/* Sector 2: Branding & Advertising */}
          <div className="dark-card rounded-xl p-8 flex flex-col justify-between relative group hover:border-[#d4af37] transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-bl-full pointer-events-none group-hover:bg-[#d4af37]/10 transition-colors" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <img
                  src={SECTOR_LOGOS.branding}
                  alt={t.sectors.branding.name}
                  className="w-14 h-14 rounded-xl object-cover border border-[#d4af37]/40 shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:scale-105 transition-transform"
                />
                <span className="text-xs font-mono font-bold tracking-widest text-[#d4af37] px-2.5 py-1 rounded bg-black/50 border border-[#d4af37]/20 uppercase">
                  {t.sectors.branding.badge}
                </span>
              </div>

              <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#f3d375] transition-colors leading-tight">
                {t.sectors.branding.name}
              </h3>
              <p className="text-xs font-medium text-[#d4af37] mt-1 mb-4">
                {t.sectors.branding.tagline}
              </p>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                {t.sectors.branding.description}
              </p>

              {/* Capabilities checklist */}
              <div className="space-y-2.5 pt-4 border-t border-slate-800/80 mb-6">
                {t.sectors.branding.capabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-800/60 mb-6 text-center">
                {t.sectors.branding.metrics.map((m, idx) => (
                  <div key={idx}>
                    <div className="font-heading font-bold text-[#f3d375] text-base">{m.value}</div>
                    <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => onFilterBySector('branding')}
                className="w-full py-2.5 px-4 rounded border border-[#d4af37]/40 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 text-[#f3d375] text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
              >
                <span>{t.sectors.branding.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded border border-slate-800 hover:border-[#d4af37]/50 bg-slate-900/60 text-slate-300 hover:text-white text-xs font-medium tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{t.sectors.consultTelegram} (@{TELEGRAM_HANDLE})</span>
              </a>
            </div>
          </div>

          {/* Sector 3: Furniture & Interior Design */}
          <div className="dark-card rounded-xl p-8 flex flex-col justify-between relative group hover:border-[#d4af37] transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-bl-full pointer-events-none group-hover:bg-[#d4af37]/10 transition-colors" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <img
                  src={SECTOR_LOGOS.furniture}
                  alt={t.sectors.furniture.name}
                  className="w-14 h-14 rounded-xl object-cover border border-[#d4af37]/40 shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:scale-105 transition-transform"
                />
                <span className="text-xs font-mono font-bold tracking-widest text-[#d4af37] px-2.5 py-1 rounded bg-black/50 border border-[#d4af37]/20 uppercase">
                  {t.sectors.furniture.badge}
                </span>
              </div>

              <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#f3d375] transition-colors leading-tight">
                {t.sectors.furniture.name}
              </h3>
              <p className="text-xs font-medium text-[#d4af37] mt-1 mb-4">
                {t.sectors.furniture.tagline}
              </p>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                {t.sectors.furniture.description}
              </p>

              {/* Capabilities checklist */}
              <div className="space-y-2.5 pt-4 border-t border-slate-800/80 mb-6">
                {t.sectors.furniture.capabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-800/60 mb-6 text-center">
                {t.sectors.furniture.metrics.map((m, idx) => (
                  <div key={idx}>
                    <div className="font-heading font-bold text-[#f3d375] text-base">{m.value}</div>
                    <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => onFilterBySector('furniture')}
                className="w-full py-2.5 px-4 rounded border border-[#d4af37]/40 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 text-[#f3d375] text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
              >
                <span>{t.sectors.furniture.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded border border-slate-800 hover:border-[#d4af37]/50 bg-slate-900/60 text-slate-300 hover:text-white text-xs font-medium tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{t.sectors.consultTelegram} (@{TELEGRAM_HANDLE})</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
