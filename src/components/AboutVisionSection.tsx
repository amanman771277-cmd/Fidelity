import React from 'react';
import { Target, Compass, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { TELEGRAM_URL, TELEGRAM_HANDLE } from '../utils/portfolio.ts';
import { Translations, Language } from '../utils/i18n.ts';

interface AboutVisionSectionProps {
  t: Translations;
  currentLang: Language;
}

export const AboutVisionSection: React.FC<AboutVisionSectionProps> = ({ t }) => {
  return (
    <section id="about" className="py-24 bg-[#07090d] border-b border-[#d4af37]/20 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Narrative */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#f3d375] text-xs font-mono tracking-[0.2em] uppercase mb-4">
              {t.philosophy.badge}
            </div>
            
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              <span className="gold-gradient-text">{t.philosophy.quote}</span>
            </h2>

            <p className="mt-6 text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              {t.philosophy.p1}
            </p>

            <p className="mt-4 text-sm text-slate-400 leading-relaxed font-light">
              {t.philosophy.p2}
            </p>

            {/* 4 Pillars Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#0e121a] border border-slate-800">
                <div className="flex items-center gap-2.5 mb-2">
                  <Compass className="w-4 h-4 text-[#d4af37]" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.philosophy.pillar1Title}</h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {t.philosophy.pillar1Desc}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#0e121a] border border-slate-800">
                <div className="flex items-center gap-2.5 mb-2">
                  <Target className="w-4 h-4 text-[#d4af37]" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.philosophy.pillar2Title}</h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {t.philosophy.pillar2Desc}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#0e121a] border border-slate-800">
                <div className="flex items-center gap-2.5 mb-2">
                  <Award className="w-4 h-4 text-[#d4af37]" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.philosophy.pillar3Title}</h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {t.philosophy.pillar3Desc}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#0e121a] border border-slate-800">
                <div className="flex items-center gap-2.5 mb-2">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.philosophy.pillar4Title}</h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {t.philosophy.pillar4Desc}
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded bg-gradient-to-r from-[#aa7c11] via-[#d4af37] to-[#aa7c11] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all gold-glow inline-flex items-center gap-2"
              >
                <span>{t.philosophy.partnerBtn} (@{TELEGRAM_HANDLE})</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Visual Stats Column */}
          <div className="lg:col-span-5">
            <div className="dark-card p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="text-xs font-mono text-[#d4af37] uppercase tracking-widest mb-6">
                {t.philosophy.milestonesTitle}
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-heading text-4xl sm:text-5xl font-extrabold text-white">180+</span>
                    <span className="text-xs font-mono text-[#d4af37]">{t.philosophy.stat1Label}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {t.hero.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-baseline justify-between">
                    <span className="font-heading text-4xl sm:text-5xl font-extrabold text-[#f3d375]">$250M+</span>
                    <span className="text-xs font-mono text-[#d4af37]">{t.philosophy.stat2Label}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {t.philosophy.pillar2Desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-baseline justify-between">
                    <span className="font-heading text-4xl sm:text-5xl font-extrabold text-white">3</span>
                    <span className="text-xs font-mono text-[#d4af37]">{t.philosophy.stat3Label}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {t.sectors.subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 rounded bg-[#0b0e14] border border-[#d4af37]/20 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{t.philosophy.directDeskTitle}</div>
                  <div className="text-slate-400">{t.philosophy.responseSpeed}</div>
                </div>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[#f3d375] hover:underline"
                >
                  @{TELEGRAM_HANDLE} &rarr;
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
