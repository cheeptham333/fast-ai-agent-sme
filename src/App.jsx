import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LessonViewer } from './components/LessonViewer';
import { PromptGenerator } from './components/PromptGenerator';
import { RoiCalculator } from './components/RoiCalculator';
import { ProjectRecipes } from './components/ProjectRecipes';
import { NotebookLmHub } from './components/NotebookLmHub';
import { ErrorSolver } from './components/ErrorSolver';
import { PluginsSkillsViewer } from './components/PluginsSkillsViewer';
import { SlideDeckViewer } from './components/SlideDeckViewer';
import { CheatsheetModal } from './components/CheatsheetModal';
import { EbookDownloadModal } from './components/EbookDownloadModal';
import { curriculumModules } from './data/curriculumData';
import { Menu, X, Search, Download } from 'lucide-react';

export default function App() {
  // Default to Light Mode (bright theme)
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('fastai_theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const [activeTab, setActiveTab] = useState('curriculum');
  const [activeModuleId, setActiveModuleId] = useState(curriculumModules[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCheatsheetOpen, setIsCheatsheetOpen] = useState(false);
  const [isEbookModalOpen, setIsEbookModalOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('fastai_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem('fastai_completed_lessons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarkedSections, setBookmarkedSections] = useState(() => {
    try {
      const saved = localStorage.getItem('fastai_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('fastai_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('fastai_bookmarks', JSON.stringify(bookmarkedSections));
  }, [bookmarkedSections]);

  const toggleLessonCompletion = (sectionId) => {
    setCompletedLessons(prev => 
      prev.includes(sectionId) ? prev.filter(id => id !== sectionId) : [...prev, sectionId]
    );
  };

  const toggleBookmark = (sectionId) => {
    setBookmarkedSections(prev => 
      prev.includes(sectionId) ? prev.filter(id => id !== sectionId) : [...prev, sectionId]
    );
  };

  const totalLessons = curriculumModules.reduce((acc, m) => acc + m.sections.length, 0);

  const currentModuleIndex = curriculumModules.findIndex(m => m.id === activeModuleId);
  const currentModuleData = curriculumModules[currentModuleIndex] || curriculumModules[0];

  const handleNextModule = () => {
    if (currentModuleIndex < curriculumModules.length - 1) {
      setActiveModuleId(curriculumModules[currentModuleIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevModule = () => {
    if (currentModuleIndex > 0) {
      setActiveModuleId(curriculumModules[currentModuleIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Search Results filtering
  const filteredSections = searchQuery.trim() ? curriculumModules.flatMap(m => 
    m.sections.filter(s => 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.content.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(s => ({ ...s, moduleTitle: m.title, moduleId: m.id }))
  ) : [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Top Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        completedLessons={completedLessons}
        totalLessons={totalLessons}
        onOpenCheatsheet={() => setIsCheatsheetOpen(true)}
        onOpenNotebookLM={() => setActiveTab('notebooklm')}
        onOpenEbookDownload={() => setIsEbookModalOpen(true)}
      />

      {/* Mobile Drawer Button */}
      <div className="lg:hidden sticky top-16 z-30 px-4 py-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
        >
          {isMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>สารบัญ & สไลด์สอน</span>
        </button>

        <button
          onClick={() => setIsEbookModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>โหลด E-Book</span>
        </button>
      </div>

      {/* Main Container Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
        
        {/* Left Sidebar */}
        <Sidebar
          modules={curriculumModules}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeModuleId={activeModuleId}
          setActiveModuleId={setActiveModuleId}
          completedLessons={completedLessons}
          bookmarkedSections={bookmarkedSections}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
          onOpenEbookDownload={() => setIsEbookModalOpen(true)}
        />

        {/* Center Main Content Area */}
        <main className="flex-1 min-w-0 py-8 lg:px-8">
          
          {/* If there's an active Search Query */}
          {searchQuery.trim() ? (
            <div className="space-y-6 max-w-4xl mx-auto pb-16">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    ผลการค้นหาสำหรับ "{searchQuery}" ({filteredSections.length} รายการ)
                  </h2>
                </div>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-brand-600 dark:text-brand-400 font-bold hover:underline"
                >
                  ล้างการค้นหา
                </button>
              </div>

              {filteredSections.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm shadow-sm">
                  ไม่พบบทเรียนที่ตรงกับคำค้นหา ลองค้นหาด้วยคำอื่น เช่น 'Antigravity', 'สต็อก', 'LINE', 'Prompt'
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredSections.map((sec) => (
                    <div
                      key={sec.id}
                      onClick={() => {
                        setActiveTab('curriculum');
                        setActiveModuleId(sec.moduleId);
                        setSearchQuery('');
                        setTimeout(() => {
                          const elem = document.getElementById(sec.id);
                          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 hover:border-brand-500 border border-slate-200 dark:border-slate-800 cursor-pointer transition-all space-y-2 group shadow-sm hover:shadow-md"
                    >
                      <div className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                        {sec.moduleTitle}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                        {sec.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                        {sec.content.replace(/[#*`_]/g, '')}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Tab: Teaching Slide Deck */}
              {activeTab === 'slides' && <SlideDeckViewer />}

              {/* Tab: Curriculum Lessons */}
              {activeTab === 'curriculum' && (
                <LessonViewer
                  moduleData={currentModuleData}
                  onNextModule={handleNextModule}
                  onPrevModule={handlePrevModule}
                  isFirst={currentModuleIndex === 0}
                  isLast={currentModuleIndex === curriculumModules.length - 1}
                  completedLessons={completedLessons}
                  toggleLessonCompletion={toggleLessonCompletion}
                  bookmarkedSections={bookmarkedSections}
                  toggleBookmark={toggleBookmark}
                  onOpenNotebookLM={() => setActiveTab('notebooklm')}
                />
              )}

              {/* Tab: 5 SME Projects */}
              {activeTab === 'projects' && <ProjectRecipes />}

              {/* Tab: Google Gemini NotebookLM Hub */}
              {activeTab === 'notebooklm' && <NotebookLmHub />}

              {/* Tab: AI Prompt Generator */}
              {activeTab === 'prompts' && <PromptGenerator />}

              {/* Tab: ROI Calculator */}
              {activeTab === 'roi' && <RoiCalculator />}

              {/* Tab: Error Troubleshooter */}
              {activeTab === 'errors' && <ErrorSolver />}

              {/* Tab: Plugins & Skills */}
              {activeTab === 'plugins' && <PluginsSkillsViewer />}
            </>
          )}

        </main>
      </div>

      {/* Cheatsheet Modal */}
      <CheatsheetModal
        isOpen={isCheatsheetOpen}
        onClose={() => setIsCheatsheetOpen(false)}
      />

      {/* E-Book Download Modal */}
      <EbookDownloadModal
        isOpen={isEbookModalOpen}
        onClose={() => setIsEbookModalOpen(false)}
      />

    </div>
  );
}
