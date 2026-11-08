import React from 'react';
import { Send, Lock, ArrowUp, Building2, Megaphone, Armchair } from 'lucide-react';
import { TELEGRAM_URL, TELEGRAM_HANDLE } from '../utils/portfolio.ts';
import { Translations, Language } from '../utils/i18n.ts';

interface FooterProps {
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  onFilterSector: (sector: 'architects' | 'branding' | 'furniture') => void;
  t: Translations;
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  isAdminLoggedIn,
  onFilterSector,
  t
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608] border-t border-[#d4af37]/20 text-slate-400 text-xs">
      {/* Top Footer Tier */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand & Motto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded border border-[#d4af37]/40 bg-gradient-to-br from-[#d4af37]/20 to-transparent flex items-center justify-center font-heading font-black text-[#f3d375] text-lg shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                F
              </div>
              <div>
                <span className="font-heading font-bold text-base tracking-[0.18em] text-white block">
                  {t.brandName}
                </span>
                <span className="text-[10px] tracking-[0.15em] text-[#d4af37] font-semibold uppercase block">
                  {t.brandSubtitle}
                </span>
              </div>
            </div>

            <div className="inline-block px-3 py-1 rounded bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#f3d375] text-[11px] font-bold uppercase tracking-widest">
              {t.footer.motto}
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-light">
              {t.footer.desc}
            </p>

            <div className="pt-2">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-gradient-to-r from-[#aa7c11] via-[#d4af37] to-[#aa7c11] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all gold-glow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram: @{TELEGRAM_HANDLE}</span>
              </a>
            </div>
          </div>

          {/* Allied Sectors */}
          <div className="space-y-3">
            <div className="font-heading font-bold text-white text-xs uppercase tracking-widest text-[#f3d375]">
              {t.footer.alliedTitle}
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    onFilterSector('architects');
                    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#d4af37] text-left transition-colors flex items-center gap-2"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span>{t.sectors.architects.shortName}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onFilterSector('branding');
                    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#d4af37] text-left transition-colors flex items-center gap-2"
                >
                  <Megaphone className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span>{t.sectors.branding.shortName}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onFilterSector('furniture');
                    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#d4af37] text-left transition-colors flex items-center gap-2"
                >
                  <Armchair className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span>{t.sectors.furniture.shortName}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Access */}
          <div className="space-y-3">
            <div className="font-heading font-bold text-white text-xs uppercase tracking-widest text-[#f3d375]">
              {t.footer.navTitle}
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#sectors" className="hover:text-[#d4af37] transition-colors">
                  {t.nav.divisions}
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-[#d4af37] transition-colors">
                  {t.nav.portfolio}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#d4af37] transition-colors">
                  {t.nav.philosophy}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#d4af37] transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-[#040406] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-500">
            {t.footer.copyright} &bull; <span className="text-[#f3d375]">{t.footer.motto}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              aria-label="Admin Access 3.0"
              className="px-2.5 py-1 rounded bg-[#090c12] border border-slate-800 hover:border-[#d4af37]/40 text-[11px] font-mono text-slate-400 hover:text-[#f3d375] transition-all flex items-center gap-1.5"
              title="Admin Access v3.0"
            >
              <Lock className="w-3 h-3 text-[#d4af37]" />
              <span>{t.footer.adminAccess}</span>
              {isAdminLoggedIn && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
            </button>

            <button
              onClick={scrollToTop}
              className="p-1.5 rounded border border-slate-800 hover:border-[#d4af37] text-slate-400 hover:text-white transition-all"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
