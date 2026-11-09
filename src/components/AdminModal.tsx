import React, { useState, useRef } from 'react';
import { Project, FirebaseConfigState } from '../types.ts';
import {
  DEFAULT_ADMIN_PASSWORD,
  CLOUDINARY_SAMPLE_PRESETS,
  formatCloudinaryUrl,
  isCloudinaryUrl
} from '../utils/portfolio.ts';
import {
  uploadImageToCloudinary,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET
} from '../utils/cloudinary.ts';
import {
  X,
  Lock,
  PlusCircle,
  List,
  Database,
  Trash2,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Sparkles,
  ExternalLink,
  LogOut,
  UploadCloud,
  Loader2,
  Edit3,
  Undo
} from 'lucide-react';
import { Translations, Language } from '../utils/i18n.ts';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (status: boolean) => void;
  projects: Project[];
  onAddProject: (project: Omit<Project, 'id' | 'createdAt'>) => Promise<void>;
  onUpdateProject: (id: string, project: Partial<Omit<Project, 'id'>>) => Promise<void>;
  onDeleteProject: (id: string) => Promise<void>;
  firebaseConfig: FirebaseConfigState;
  onSaveFirebaseConfig: (config: FirebaseConfigState) => void;
  isFirebaseLive: boolean;
  t: Translations;
  currentLang: Language;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  isAdminLoggedIn,
  setIsAdminLoggedIn,
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  firebaseConfig,
  onSaveFirebaseConfig,
  isFirebaseLive,
  t,
  currentLang
}) => {
  if (!isOpen) return null;

  // Password state
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Tabs: 'create' | 'manage'
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');

  // Editing state for existing posts
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Dual-Language Form State (Amharic & English)
  const [titleAm, setTitleAm] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descriptionAm, setDescriptionAm] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [sector, setSector] = useState<'architects' | 'branding' | 'furniture'>('architects');
  const [imageUrl, setImageUrl] = useState('');
  const [clientAm, setClientAm] = useState('');
  const [clientEn, setClientEn] = useState('');
  const [locationAm, setLocationAm] = useState('');
  const [locationEn, setLocationEn] = useState('');
  const [year, setYear] = useState('2026');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState('');

  // Cloudinary Direct Upload State
  const [uploadingToCloudinary, setUploadingToCloudinary] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Firebase config form
  const [cfgApiKey, setCfgApiKey] = useState(firebaseConfig.apiKey);
  const [cfgAuthDomain, setCfgAuthDomain] = useState(firebaseConfig.authDomain);
  const [cfgProjectId, setCfgProjectId] = useState(firebaseConfig.projectId);
  const [cfgStorageBucket, setCfgStorageBucket] = useState(firebaseConfig.storageBucket);
  const [cfgMessagingSenderId, setCfgMessagingSenderId] = useState(firebaseConfig.messagingSenderId);
  const [cfgAppId, setCfgAppId] = useState(firebaseConfig.appId);
  const [configSaved, setConfigSaved] = useState(false);

  // Handle password login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === DEFAULT_ADMIN_PASSWORD) {
      setIsAdminLoggedIn(true);
      setPasswordError('');
      setPasswordInput('');
    } else {
      setPasswordError(
        currentLang === 'am'
          ? 'የተሳሳተ የአድሚን የይለፍ ቃል። (መደበኛ: admin123)'
          : 'Invalid admin password. (Default is admin123)'
      );
    }
  };

  // Direct Cloudinary File Upload handler
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingToCloudinary(true);
    setUploadProgress(0);
    setUploadError('');

    try {
      const secureUrl = await uploadImageToCloudinary(file, (percent) => {
        setUploadProgress(percent);
      });
      setImageUrl(secureUrl);
    } catch (err: any) {
      console.warn('Cloudinary upload attempt warning:', err?.message || err);
      setUploadError(
        currentLang === 'am'
          ? 'የምስል ጭነት አልተሳካም። እባክዎ እንደገና ይሞክሩ ወይም የምስል ሊንክ በቀጥታ ያስገቡ።'
          : 'Image upload failed. Please try again or paste an image URL directly.'
      );
    } finally {
      setUploadingToCloudinary(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Start Editing an Existing Post
  const handleStartEdit = (p: Project) => {
    setEditingProjectId(p.id);
    setTitleAm(p.titleAm || p.title || '');
    setTitleEn(p.title || '');
    setDescriptionAm(p.descriptionAm || p.description || '');
    setDescriptionEn(p.description || '');
    setSector(p.sector);
    setImageUrl(p.imageUrl);
    setClientAm(p.clientAm || p.client || '');
    setClientEn(p.client || '');
    setLocationAm(p.locationAm || p.location || '');
    setLocationEn(p.location || '');
    setYear(p.year || '2026');
    setUploadError('');
    setFormSuccess(false);
    setActiveTab('create');
  };

  // Cancel Editing and reset form
  const handleCancelEdit = () => {
    setEditingProjectId(null);
    setTitleAm('');
    setTitleEn('');
    setDescriptionAm('');
    setDescriptionEn('');
    setImageUrl('');
    setClientAm('');
    setClientEn('');
    setLocationAm('');
    setLocationEn('');
    setYear('2026');
    setUploadError('');
    setFormSuccess(false);
  };

  // Handle Save (Create or Update) post
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitleAm = titleAm.trim() || titleEn.trim();
    const finalTitleEn = titleEn.trim() || titleAm.trim();
    const finalDescAm = descriptionAm.trim() || descriptionEn.trim();
    const finalDescEn = descriptionEn.trim() || descriptionAm.trim();

    if (!finalTitleAm || !finalDescAm || !imageUrl.trim()) {
      return;
    }

    setFormSubmitting(true);
    try {
      if (editingProjectId) {
        // UPDATE EXISTING POST
        await onUpdateProject(editingProjectId, {
          title: finalTitleEn,
          titleAm: finalTitleAm,
          sector,
          description: finalDescEn,
          descriptionAm: finalDescAm,
          imageUrl: imageUrl.trim(),
          client: clientEn.trim() || clientAm.trim() || undefined,
          clientAm: clientAm.trim() || clientEn.trim() || undefined,
          location: locationEn.trim() || locationAm.trim() || undefined,
          locationAm: locationAm.trim() || locationEn.trim() || undefined,
          year: year.trim() || '2026'
        });
        setFormSuccessMessage(
          currentLang === 'am'
            ? 'ሥራው በስኬት ተሻሽሏል! (በFirestore "posts" ተመዝግቧል)'
            : 'Post successfully updated in Firestore "posts"!'
        );
      } else {
        // CREATE NEW POST
        await onAddProject({
          title: finalTitleEn,
          titleAm: finalTitleAm,
          sector,
          description: finalDescEn,
          descriptionAm: finalDescAm,
          imageUrl: imageUrl.trim(),
          client: clientEn.trim() || clientAm.trim() || undefined,
          clientAm: clientAm.trim() || clientEn.trim() || undefined,
          location: locationEn.trim() || locationAm.trim() || undefined,
          locationAm: locationAm.trim() || locationEn.trim() || undefined,
          year: year.trim() || '2026'
        });
        setFormSuccessMessage(
          currentLang === 'am'
            ? 'አዲስ ሥራ በስኬት ተለጥፏል! (በFirestore "posts" ተመዝግቧል)'
            : 'New work published successfully in Firestore "posts"!'
        );
      }

      setFormSuccess(true);
      handleCancelEdit();
      setTimeout(() => setFormSuccess(false), 4500);
    } catch (err: any) {
      console.error(err);
      setUploadError(err?.message || 'Operation failed');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Quick preset loader
  const handleApplyPreset = (preset: (typeof CLOUDINARY_SAMPLE_PRESETS)[0]) => {
    setTitleAm(preset.titleAm || preset.title);
    setTitleEn(preset.title);
    setDescriptionAm(preset.titleAm ? `${preset.titleAm} - በፊዴሊቲ ቢዝነስ ግሩፕ ጥራት የተሰራ።` : '');
    setDescriptionEn(`${preset.title} - Crafted to perfection by Fidelity Business Group.`);
    setSector(preset.sector);
    setImageUrl(preset.url);
    setClientAm('ፊዴሊቲ ክላየንት');
    setClientEn('Fidelity Client');
    setLocationAm('አዲስ አበባ');
    setLocationEn('Addis Ababa');
  };

  // Handle Save Firebase config
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: FirebaseConfigState = {
      apiKey: cfgApiKey.trim(),
      authDomain: cfgAuthDomain.trim(),
      projectId: cfgProjectId.trim(),
      storageBucket: cfgStorageBucket.trim(),
      messagingSenderId: cfgMessagingSenderId.trim(),
      appId: cfgAppId.trim()
    };
    onSaveFirebaseConfig(updated);
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 3000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#0b0e14] border border-[#d4af37]/35 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#07090d] border-b border-[#d4af37]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-white text-sm tracking-wider">
                  {t.admin.portalTitle}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#d4af37]/20 text-[#f3d375] font-mono text-[10px] font-bold">
                  v3.0
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {isAdminLoggedIn ? t.admin.authBadge : t.admin.lockedBadge}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdminLoggedIn && (
              <button
                onClick={() => setIsAdminLoggedIn(false)}
                className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1.5 px-2.5 py-1 rounded border border-slate-800 hover:border-rose-500/30 transition-colors"
                title={t.admin.logOut}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.admin.logOut}</span>
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close Admin Modal"
              className="p-1.5 rounded-lg border border-slate-800 hover:border-[#d4af37] text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Password Prompt if Not Authenticated */}
        {!isAdminLoggedIn ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full text-center">
            <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mx-auto mb-6 shadow-[0_0_25px_rgba(212,175,55,0.2)]">
              <Lock className="w-8 h-8" />
            </div>

            <h3 className="font-heading text-2xl font-bold text-white">
              {t.admin.loginTitle}
            </h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              {t.admin.loginDesc}
            </p>

            <form onSubmit={handleLogin} className="mt-8 text-left space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  {t.admin.passwordLabel}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoFocus
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setPasswordError('');
                    }}
                    placeholder={t.admin.passwordPlaceholder}
                    className="w-full pl-4 pr-10 py-3 rounded bg-[#10141e] border border-slate-700 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-sm text-white placeholder-slate-600 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {passwordError && (
                <div className="flex items-center gap-2 text-rose-400 text-xs py-1">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded bg-gradient-to-r from-[#aa7c11] via-[#d4af37] to-[#aa7c11] hover:brightness-110 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all gold-glow"
              >
                {t.admin.unlockBtn}
              </button>

              <div className="text-center pt-2">
                <span className="text-[11px] font-mono text-slate-500">
                  {t.admin.defaultPassHint}
                </span>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tabs Bar */}
            <div className="px-6 bg-[#090c12] border-b border-slate-800 flex overflow-x-auto gap-2 py-2.5">
              <button
                onClick={() => setActiveTab('create')}
                className={`px-3.5 py-1.5 rounded text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 shrink-0 ${
                  activeTab === 'create'
                    ? 'bg-[#d4af37] text-slate-950 gold-glow font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{t.admin.tabCreate}</span>
              </button>

              <button
                onClick={() => setActiveTab('manage')}
                className={`px-3.5 py-1.5 rounded text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 shrink-0 ${
                  activeTab === 'manage'
                    ? 'bg-[#d4af37] text-slate-950 gold-glow font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>{t.admin.tabManage} ({projects.length})</span>
              </button>
            </div>

            {/* Tab Panes */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              
              {/* TAB 1: CREATE NEW WORK */}
              {activeTab === 'create' && (
                <div className="max-w-3xl mx-auto space-y-6">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white">{t.admin.publishTitle}</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {currentLang === 'am'
                        ? 'ሥራዎች በቀጥታ በክላውዲነሪ (du5fpqadb) ተሰቅለው በፋየርቤዝ "posts" ሰንጠረዥ ይቀመጣሉ።'
                        : 'Posts upload directly to Cloudinary (du5fpqadb) and sync to Firestore "posts" collection.'}
                    </p>
                  </div>

                  {formSuccess && (
                    <div className="p-4 rounded-lg bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
                      <span>{t.admin.publishSuccess}</span>
                    </div>
                  )}

                  {/* 1. CLOUDINARY DIRECT UPLOAD COMPONENT */}
                  <div className="p-5 rounded-xl bg-[#0e121a] border border-[#d4af37]/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UploadCloud className="w-4 h-4 text-[#d4af37]" />
                        <span className="text-xs font-bold text-[#f3d375] uppercase tracking-wider">
                          {currentLang === 'am'
                            ? 'ምስል ከስልክ/ኮምፒውተር ይስቀሉ (Cloudinary Direct Upload)'
                            : 'Direct Device Upload to Cloudinary'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 border border-slate-700 text-slate-400">
                        {CLOUDINARY_CLOUD_NAME} • {CLOUDINARY_UPLOAD_PRESET}
                      </span>
                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="cloudinaryFileInput"
                    />

                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                        uploadingToCloudinary
                          ? 'border-[#d4af37] bg-[#d4af37]/5'
                          : 'border-slate-700 hover:border-[#d4af37]/60 bg-[#080a0f] hover:bg-[#0f131a]'
                      }`}
                    >
                      {uploadingToCloudinary ? (
                        <div className="space-y-3">
                          <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin mx-auto" />
                          <div className="text-xs font-semibold text-white">
                            {currentLang === 'am' ? 'ምስሉ ወደ ክላውዲነሪ እየተጫነ ነው...' : 'Uploading directly to Cloudinary...'} {uploadProgress}%
                          </div>
                          <div className="w-full max-w-xs mx-auto bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-[#aa7c11] to-[#d4af37] h-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <UploadCloud className="w-8 h-8 text-slate-500 mx-auto" />
                          <div className="text-xs font-bold text-slate-200">
                            {currentLang === 'am'
                              ? 'ምስል ለመምረጥ እዚህ ይጫኑ (ከስልክ ወይም ከኮምፒውተር)'
                              : 'Click to select image file from your device'}
                          </div>
                          <p className="text-[11px] text-slate-500">
                            {currentLang === 'am'
                              ? `ፋይሉ በቀጥታ ወደ Cloudinary ("${CLOUDINARY_CLOUD_NAME}" / "${CLOUDINARY_UPLOAD_PRESET}") ይሰቀላል`
                              : `Uploads directly to Cloudinary ("${CLOUDINARY_CLOUD_NAME}" / preset "${CLOUDINARY_UPLOAD_PRESET}")`}
                          </p>
                        </div>
                      )}
                    </div>

                    {uploadError && (
                      <div className="flex items-center gap-2 text-xs text-rose-400 py-1">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{uploadError}</span>
                      </div>
                    )}
                  </div>

                  {/* POST DETAILS FORM (BILINGUAL & EDIT CAPABLE) */}
                  <form onSubmit={handleSavePost} className="space-y-4">
                    {/* Editing Banner */}
                    {editingProjectId && (
                      <div className="p-3.5 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/60 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <Edit3 className="w-4 h-4 text-[#d4af37] shrink-0" />
                          <div className="truncate">
                            <span className="font-bold text-[#f3d375] uppercase tracking-wider">{t.admin.editingBanner}: </span>
                            <span className="text-white font-semibold">{titleAm || titleEn || editingProjectId}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1 shrink-0"
                        >
                          <Undo className="w-3.5 h-3.5" />
                          <span>{t.admin.cancelEdit}</span>
                        </button>
                      </div>
                    )}

                    {/* Dual-Language Titles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                          <span className="text-[#d4af37] font-bold">🇪🇹</span>
                          <span>{t.admin.fieldTitleAm}</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={titleAm}
                          onChange={(e) => setTitleAm(e.target.value)}
                          placeholder="ምሳሌ፡ የአውራ ሃይትስ የንግድ ህንፃ ማማ"
                          className="w-full px-3.5 py-2.5 rounded bg-[#10141e] border border-slate-700 focus:border-[#d4af37] text-xs text-white placeholder-slate-600 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                          <span className="text-[#d4af37] font-bold">🌐</span>
                          <span>{t.admin.fieldTitleEn}</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={titleEn}
                          onChange={(e) => setTitleEn(e.target.value)}
                          placeholder="e.g. Aura Heights Commercial Tower"
                          className="w-full px-3.5 py-2.5 rounded bg-[#10141e] border border-slate-700 focus:border-[#d4af37] text-xs text-white placeholder-slate-600 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                        {t.admin.fieldSector}
                      </label>
                      <select
                        value={sector}
                        onChange={(e) => setSector(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded bg-[#10141e] border border-slate-700 focus:border-[#d4af37] text-xs text-white outline-none"
                      >
                        <option value="architects">{t.sectors.architects.name}</option>
                        <option value="branding">{t.sectors.branding.name}</option>
                        <option value="furniture">{t.sectors.furniture.name}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                        {t.admin.fieldImageUrl}
                      </label>
                      <input
                        type="url"
                        required
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://res.cloudinary.com/... or uploaded image URL"
                        className="w-full px-3.5 py-2.5 rounded bg-[#10141e] border border-slate-700 focus:border-[#d4af37] text-xs text-white placeholder-slate-600 outline-none font-mono"
                      />
                      {imageUrl && (
                        <div className="mt-2 text-[11px] flex items-center gap-2">
                          {isCloudinaryUrl(imageUrl) ? (
                            <span className="text-emerald-400 font-mono flex items-center gap-1">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>{t.admin.cloudinaryDetected}</span>
                            </span>
                          ) : (
                            <span className="text-slate-400 font-mono">
                              {t.admin.standardUrl}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Image Preview Box */}
                    {imageUrl && (
                      <div className="relative aspect-[16/9] max-h-48 rounded-lg overflow-hidden border border-[#d4af37]/40 bg-slate-950">
                        <img
                          src={formatCloudinaryUrl(imageUrl)}
                          alt="Live Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded bg-black/85 text-[10px] text-white font-mono flex items-center gap-1.5">
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                          <span>{t.admin.livePreview}</span>
                        </div>
                      </div>
                    )}

                    {/* Dual-Language Descriptions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                          <span className="text-[#d4af37] font-bold">🇪🇹</span>
                          <span>{t.admin.fieldDescAm}</span>
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={descriptionAm}
                          onChange={(e) => setDescriptionAm(e.target.value)}
                          placeholder="የምህንድስና፣ የብራንዲንግ ወይም የውስጥ ዲዛይን ዝርዝር መግለጫ..."
                          className="w-full px-3.5 py-2.5 rounded bg-[#10141e] border border-slate-700 focus:border-[#d4af37] text-xs text-white placeholder-slate-600 outline-none resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                          <span className="text-[#d4af37] font-bold">🌐</span>
                          <span>{t.admin.fieldDescEn}</span>
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={descriptionEn}
                          onChange={(e) => setDescriptionEn(e.target.value)}
                          placeholder="Detail the architectural engineering, brand impact, or interior crafting..."
                          className="w-full px-3.5 py-2.5 rounded bg-[#10141e] border border-slate-700 focus:border-[#d4af37] text-xs text-white placeholder-slate-600 outline-none resize-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                          {t.admin.fieldClient}
                        </label>
                        <input
                          type="text"
                          value={clientEn || clientAm}
                          onChange={(e) => {
                            setClientEn(e.target.value);
                            setClientAm(e.target.value);
                          }}
                          placeholder="e.g. Apex Holdings"
                          className="w-full px-3.5 py-2 rounded bg-[#10141e] border border-slate-700 text-xs text-white placeholder-slate-600 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                          {t.admin.fieldLocation}
                        </label>
                        <input
                          type="text"
                          value={locationEn || locationAm}
                          onChange={(e) => {
                            setLocationEn(e.target.value);
                            setLocationAm(e.target.value);
                          }}
                          placeholder="e.g. Central District"
                          className="w-full px-3.5 py-2 rounded bg-[#10141e] border border-slate-700 text-xs text-white placeholder-slate-600 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                          {t.admin.fieldYear}
                        </label>
                        <input
                          type="text"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          placeholder="2026"
                          className="w-full px-3.5 py-2 rounded bg-[#10141e] border border-slate-700 text-xs text-white placeholder-slate-600 outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={formSubmitting || uploadingToCloudinary}
                      className="w-full py-3 rounded bg-gradient-to-r from-[#aa7c11] via-[#d4af37] to-[#aa7c11] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all gold-glow disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {formSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                          <span>{editingProjectId ? t.admin.updatingPostBtn : t.admin.publishingBtn}</span>
                        </>
                      ) : (
                        <>
                          {editingProjectId ? <Edit3 className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
                          <span>
                            {editingProjectId ? t.admin.updatePostBtn : t.admin.publishBtn} &rarr; (Firestore 'posts')
                          </span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 2: MANAGE EXISTING POSTS */}
              {activeTab === 'manage' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading text-xl font-bold text-white">
                        {t.admin.existingTitle} ({projects.length})
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {currentLang === 'am'
                          ? 'ከፋየርቤዝ "posts" ሰንጠረዥ ይሰርዙ ወይም ይመልከቱ።'
                          : 'Manage and delete posts from the Firestore "posts" collection.'}
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('create')}
                      className="px-3 py-1.5 rounded bg-[#d4af37] text-slate-950 text-xs font-bold uppercase tracking-wider hover:brightness-110 flex items-center gap-1.5"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>{t.admin.tabCreate}</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {projects.map((p, index) => {
                      const displayTitle = (currentLang === 'am' && p.titleAm) ? p.titleAm : p.title;
                      const displayDesc = (currentLang === 'am' && p.descriptionAm) ? p.descriptionAm : p.description;

                      return (
                        <div
                          key={`${p.id}-${index}`}
                          className="p-4 rounded-lg bg-[#0e121a] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={formatCloudinaryUrl(p.imageUrl)}
                              alt={displayTitle}
                              className="w-16 h-12 rounded object-cover bg-slate-900 border border-slate-800 shrink-0"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80';
                              }}
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-white font-heading">{displayTitle}</h4>
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider text-[#d4af37] bg-[#d4af37]/10 uppercase border border-[#d4af37]/20">
                                  {p.sector}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5 max-w-xl">
                                {displayDesc}
                              </p>
                              <div className="text-[10px] text-slate-500 font-mono mt-1">
                                ID: {p.id} &bull; {p.year || '2025'} &bull; {p.client || 'Fidelity Portfolio'}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            <button
                              type="button"
                              onClick={() => handleStartEdit(p)}
                              className="px-2.5 py-1.5 rounded bg-[#d4af37]/15 border border-[#d4af37]/40 hover:bg-[#d4af37]/30 text-[#f3d375] hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
                              title={currentLang === 'am' ? 'ሥራውን አስተካክል' : 'Edit Post'}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>{t.admin.editPost}</span>
                            </button>
                            <a
                              href={p.imageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                              title="Open Full Image"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                            <button
                              onClick={() => {
                                if (confirm(t.admin.deleteConfirm)) {
                                  onDeleteProject(p.id);
                                }
                              }}
                              className="p-2 rounded bg-rose-950/40 border border-rose-900/50 hover:bg-rose-900/60 text-rose-300 hover:text-white transition-colors"
                              title="Delete Post from Firestore"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
