import React, { useState, useEffect } from 'react';
import { Project, SectorId, FirebaseConfigState } from './types.ts';
import {
  subscribeToProjects,
  addProjectToStore,
  deleteProjectFromStore,
  updateProjectInStore,
  getStoredFirebaseConfig,
  saveStoredFirebaseConfig
} from './utils/firebase.ts';
import { INITIAL_PROJECTS } from './utils/portfolio.ts';
import { I18N, Language } from './utils/i18n.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { SectorsSection } from './components/SectorsSection.tsx';
import { PortfolioSection } from './components/PortfolioSection.tsx';
import { ProjectLightbox } from './components/ProjectLightbox.tsx';
import { AboutVisionSection } from './components/AboutVisionSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { AdminModal } from './components/AdminModal.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingTelegram } from './components/FloatingTelegram.tsx';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('fidelity_lang') as Language;
      if (saved === 'en' || saved === 'am') return saved;
    } catch (e) {
      // ignore
    }
    return 'am'; // Amharic by default as requested
  });

  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [activeSector, setActiveSector] = useState<SectorId>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isFirebaseLive, setIsFirebaseLive] = useState(false);
  const [firebaseConfig, setFirebaseConfig] = useState<FirebaseConfigState>(getStoredFirebaseConfig);

  const t = I18N[currentLang];

  // Update HTML lang attribute
  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem('fidelity_lang', lang);
    } catch (e) {
      // ignore
    }
  };

  // Subscribe to real-time project updates (Firebase Firestore or instant local cache)
  useEffect(() => {
    const unsubscribe = subscribeToProjects(firebaseConfig, (updatedProjects, isLive) => {
      setProjects(updatedProjects);
      setIsFirebaseLive(isLive);
    });

    return () => {
      unsubscribe();
    };
  }, [firebaseConfig]);

  const handleAddProject = async (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject = await addProjectToStore(projectData, firebaseConfig);
    setProjects((prev) => {
      if (prev.some((p) => p.id === newProject.id)) return prev;
      return [newProject, ...prev];
    });
  };

  const handleUpdateProject = async (id: string, updatedData: Partial<Omit<Project, 'id'>>) => {
    const updated = await updateProjectInStore(id, updatedData, firebaseConfig);
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    if (selectedProject?.id === id) {
      setSelectedProject((prev) => (prev ? { ...prev, ...updated } : null));
    }
  };

  const handleDeleteProject = async (id: string) => {
    await deleteProjectFromStore(id, firebaseConfig);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }
  };

  const handleSaveFirebaseConfig = (newConfig: FirebaseConfigState) => {
    saveStoredFirebaseConfig(newConfig);
    setFirebaseConfig(newConfig);
  };

  return (
    <div className="min-h-screen bg-[#07090d] text-slate-100 flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#f3d375]">
      {/* Top Header with 3-Dot (Ellipsis) Menu */}
      <Navbar
        onOpenAdmin={() => setAdminModalOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        t={t}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSelectSector={(sector) => {
            setActiveSector(sector);
          }}
          t={t}
          currentLang={currentLang}
        />

        {/* Sectors / Divisions Section */}
        <SectorsSection
          onFilterBySector={(sector) => {
            setActiveSector(sector);
            const el = document.getElementById('portfolio');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          t={t}
          currentLang={currentLang}
        />

        {/* Dynamic Portfolio / Gallery Section */}
        <PortfolioSection
          projects={projects}
          activeSector={activeSector}
          onSectorChange={setActiveSector}
          onSelectProject={setSelectedProject}
          onOpenAdmin={() => setAdminModalOpen(true)}
          isFirebaseLive={isFirebaseLive}
          t={t}
          currentLang={currentLang}
        />

        {/* Corporate Philosophy & Vision */}
        <AboutVisionSection
          t={t}
          currentLang={currentLang}
        />

        {/* Executive Contact & Telegram Desk */}
        <ContactSection
          t={t}
          currentLang={currentLang}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setAdminModalOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onFilterSector={(sector) => {
          setActiveSector(sector);
        }}
        t={t}
        currentLang={currentLang}
      />

      {/* Sticky Floating Direct Telegram Button */}
      <FloatingTelegram />

      {/* Project Lightbox Modal */}
      <ProjectLightbox
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        t={t}
        currentLang={currentLang}
      />

      {/* Admin Panel v3.0 Modal */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        isAdminLoggedIn={isAdminLoggedIn}
        setIsAdminLoggedIn={setIsAdminLoggedIn}
        projects={projects}
        onAddProject={handleAddProject}
        onUpdateProject={handleUpdateProject}
        onDeleteProject={handleDeleteProject}
        firebaseConfig={firebaseConfig}
        onSaveFirebaseConfig={handleSaveFirebaseConfig}
        isFirebaseLive={isFirebaseLive}
        t={t}
        currentLang={currentLang}
      />
    </div>
  );
}
