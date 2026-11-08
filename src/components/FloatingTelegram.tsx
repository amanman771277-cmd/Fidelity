import React from 'react';
import { Send } from 'lucide-react';
import { TELEGRAM_URL, TELEGRAM_HANDLE } from '../utils/portfolio.ts';

export const FloatingTelegram: React.FC = () => {
  return (
    <aside aria-label="Direct Telegram Assistance" className="fixed bottom-6 right-6 z-40">
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#aa7c11] via-[#d4af37] to-[#aa7c11] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-2xl hover:brightness-110 transition-all transform hover:-translate-y-1 gold-glow group"
        title={`Message directly on Telegram: @${TELEGRAM_HANDLE}`}
      >
        <div className="relative">
          <Send className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <span className="hidden sm:inline">Telegram: @{TELEGRAM_HANDLE}</span>
        <span className="sm:hidden">Telegram</span>
      </a>
    </aside>
  );
};
