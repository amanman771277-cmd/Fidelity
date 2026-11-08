import React, { useState } from 'react';
import { Send, MapPin, Mail, Clock, CheckCircle } from 'lucide-react';
import { TELEGRAM_URL, TELEGRAM_HANDLE } from '../utils/portfolio.ts';
import { Translations, Language } from '../utils/i18n.ts';

interface ContactSectionProps {
  t: Translations;
  currentLang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ t }) => {
  const [name, setName] = useState('');
  const [sector, setSector] = useState<'architects' | 'branding' | 'furniture' | 'group'>('group');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const text = encodeURIComponent(
      `Hello Fidelity Business Group,\nName/Entity: ${name}\nDivision: ${sector}\nScope/Requirements: ${message}`
    );
    window.open(`https://t.me/${TELEGRAM_HANDLE}?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#07090d] border-b border-[#d4af37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#f3d375] text-xs font-mono tracking-[0.2em] uppercase mb-4">
            {t.contact.badge}
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {t.contact.heading}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 font-light">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Telegram VIP Fast-Track Card */}
          <div className="lg:col-span-5 dark-card p-8 rounded-2xl flex flex-col justify-between border-2 border-[#d4af37]/40 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#d4af37]/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

            <div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#d4af37]/30 to-[#aa7c11]/10 border border-[#d4af37]/50 flex items-center justify-center text-[#f3d375] shadow-[0_0_20px_rgba(212,175,55,0.2)] mb-6">
                <Send className="w-7 h-7 text-[#d4af37]" />
              </div>

              <div className="text-xs font-mono text-[#d4af37] uppercase tracking-widest mb-1">
                {t.contact.vipTitle}
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-3">
                Telegram: @{TELEGRAM_HANDLE}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-6">
                {t.contact.vipDesc}
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#d4af37]" />
                  <span>{t.contact.vipFeature1}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#d4af37]" />
                  <span>{t.contact.vipFeature2}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded bg-gradient-to-r from-[#aa7c11] via-[#d4af37] to-[#aa7c11] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all gold-glow flex items-center justify-center gap-2.5 shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>{t.contact.vipBtn}</span>
              </a>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7 dark-card p-8 rounded-2xl">
            <h3 className="font-heading text-xl font-bold text-white mb-2">
              {t.contact.formTitle}
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-light">
              {t.contact.formSubtitle}
            </p>

            {submitted ? (
              <div className="p-6 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-center py-12">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <h4 className="font-heading text-lg font-bold text-white">{t.contact.successTitle}</h4>
                <p className="text-xs text-slate-300 mt-2 max-w-sm mx-auto">
                  {t.contact.successDesc}
                </p>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[#d4af37] text-slate-950 text-xs font-bold uppercase tracking-wider hover:brightness-110"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.contact.openTelegramBtn}</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    {t.contact.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.contact.namePlaceholder}
                    className="w-full px-4 py-2.5 rounded bg-[#10141e] border border-slate-800 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-xs text-white placeholder-slate-600 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    {t.contact.divisionLabel}
                  </label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded bg-[#10141e] border border-slate-800 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-xs text-white outline-none transition-all"
                  >
                    <option value="group">{t.contact.divisionAll}</option>
                    <option value="architects">{t.contact.divisionArch}</option>
                    <option value="branding">{t.contact.divisionBrand}</option>
                    <option value="furniture">{t.contact.divisionFurn}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    {t.contact.scopeLabel}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.scopePlaceholder}
                    className="w-full px-4 py-2.5 rounded bg-[#10141e] border border-slate-800 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-xs text-white placeholder-slate-600 outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded bg-gradient-to-r from-[#aa7c11] via-[#d4af37] to-[#aa7c11] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all gold-glow flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>{t.contact.submitBtn}</span>
                </button>
              </form>
            )}

            {/* Corporate Details */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{t.contact.hqLabel}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{t.contact.emailLabel}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
