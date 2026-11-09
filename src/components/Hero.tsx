import React from 'react';
import { Send, ArrowDown, ChevronRight } from 'lucide-react';
import { TELEGRAM_URL, SECTOR_LOGOS, HERO_BANNER_URL } from '../utils/portfolio.ts';
import { Translations, Language } from '../utils/i18n.ts';

interface HeroProps {
  onSelectSector: (sector: 'all' | 'architects' | 'branding' | 'furniture') => void;
  t: Translations;
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({ onSelectSector, t }) => {
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Prestige Motto Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 mb-6 sm:mb-8 backdrop-blur-sm shadow-[0_0_20px_rgba(212,175,55,0.15)] animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
          <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#fce8a6] uppercase font-mono">
            {t.motto}
          </span>
        </div>

        {/* Big Hero Corporate Logo Banner Image */}
        <div className="w-full max-w-4xl lg:max-w-5xl my-4 sm:my-6 rounded-2xl overflow-hidden border-2 border-[#d4af37]/40 shadow-[0_0_50px_rgba(212,175,55,0.3)] bg-[#0a0d14] group hover:border-[#d4af37] transition-all duration-500">
          <img
            src={HERO_BANNER_URL}
            alt="Fidelity Business Group Big Hero Corporate Banner"
            className="w-full h-auto max-h-[320px] sm:max-h-[460px] md:max-h-[520px] object-cover sm:object-contain mx-auto group-hover:scale-[1.01] transition-transform duration-700"
            loading="eager"
          />
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
