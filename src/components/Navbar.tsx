import React, { useState, useRef, useEffect } from 'react';
import { Send, MoreVertical, Globe, Lock, Menu, X, ArrowUpRight, Check } from 'lucide-react';
import { TELEGRAM_URL, TELEGRAM_HANDLE } from '../utils/portfolio.ts';
import { Language, Translations } from '../utils/i18n.ts';

interface NavbarProps {
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  t: Translations;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
  isAdminLoggedIn,
  currentLang,
  onLanguageChange,
  t
}) => {
  const [threeDotOpen, setThreeDotOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close 3-dot menu on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setThreeDotOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#07090d]/90 backdrop-blur-md border-b border-[#d4af37]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Monogram & Name */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 rounded p-1">
          <div className="w-10 h-10 rounded border border-[#d4af37]/40 bg-gradient-to-br from-[#d4af37]/20 to-transparent flex items-center justify-center font-heading font-black text-[#f3d375] text-lg shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:border-[#d4af37] transition-all">
            F
          </div>
          <div>
            <span className="font-heading font-bold text-sm tracking-[0.18em] text-white group-hover:text-[#f3d375] transition-colors block">
              {t.brandName}
            </span>
            <span className="block text-[10px] tracking-[0.15em] text-[#d4af37] font-semibold uppercase">
              {t.brandSubtitle}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-wider text-slate-300">
          <a href="#sectors" className="hover:text-[#d4af37] transition-colors">
            {t.nav.divisions}
          </a>
          <a href="#portfolio" className="hover:text-[#d4af37] transition-colors">
            {t.nav.portfolio}
          </a>
          <a href="#about" className="hover:text-[#d4af37] transition-colors">
            {t.nav.philosophy}
          </a>
          <a href="#contact" className="hover:text-[#d4af37] transition-colors">
            {t.nav.contact}
          </a>
        </nav>

        {/* Right Actions: ONLY Single Hamburger Menu Button (☰) */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="ማውጫ (Navigation Menu)"
            className="p-2.5 rounded-lg border border-slate-800 bg-[#0f131a] hover:border-[#d4af37]/50 text-slate-300 hover:text-[#f3d375] transition-all flex items-center justify-center shadow-md focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40"
            title="ማውጫ / Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#f3d375]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Hamburger Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="bg-[#07090d]/95 backdrop-blur-xl border-b border-[#d4af37]/25 px-4 pt-4 pb-6 space-y-4 shadow-2xl animate-fade-in">
          <div className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase px-2">
            {t.motto}
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-2 border-y border-slate-800/80 py-3">
            <a
              href="#sectors"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded text-xs font-semibold text-slate-200 hover:bg-[#d4af37]/15 hover:text-[#f3d375] transition-colors"
            >
              {t.nav.divisions}
            </a>
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded text-xs font-semibold text-slate-200 hover:bg-[#d4af37]/15 hover:text-[#f3d375] transition-colors"
            >
              {t.nav.portfolio}
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded text-xs font-semibold text-slate-200 hover:bg-[#d4af37]/15 hover:text-[#f3d375] transition-colors"
            >
              {t.nav.philosophy}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded text-xs font-semibold text-slate-200 hover:bg-[#d4af37]/15 hover:text-[#f3d375] transition-colors"
            >
              {t.nav.contact}
            </a>
          </div>

          {/* Language Switcher */}
          <div className="px-2 space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-slate-400">
              <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{t.nav.language} (Language)</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onLanguageChange('am');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  currentLang === 'am'
                    ? 'bg-[#d4af37] text-slate-950 gold-glow'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-[#d4af37]/40'
                }`}
              >
                <span>አማርኛ</span>
                {currentLang === 'am' && <Check className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  onLanguageChange('en');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  currentLang === 'en'
                    ? 'bg-[#d4af37] text-slate-950 gold-glow'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-[#d4af37]/40'
                }`}
              >
                <span>English</span>
                {currentLang === 'en' && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Direct Telegram & Admin Links */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded border border-[#d4af37]/40 bg-[#d4af37]/10 text-[#f3d375] hover:bg-[#d4af37]/20 text-xs font-bold tracking-wider transition-all"
            >
              <Send className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Telegram: @{TELEGRAM_HANDLE}</span>
              <ArrowUpRight className="w-3 h-3 text-[#d4af37]" />
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="px-3 py-2 rounded bg-slate-900 border border border-slate-800 hover:border-[#d4af37]/40 text-xs font-semibold text-[#f3d375] flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{t.admin.triggerBtn}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
