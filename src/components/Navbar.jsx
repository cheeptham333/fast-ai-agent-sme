import React from 'react';
import { 
  BookOpen, 
  Search, 
  Moon, 
  Sun, 
  Sparkles, 
  Terminal, 
  FileText, 
  Cpu, 
  ExternalLink,
  Download,
  GraduationCap
} from 'lucide-react';

export function Navbar({ 
  darkMode, 
  setDarkMode, 
  searchQuery, 
  setSearchQuery, 
  completedLessons, 
  totalLessons,
  onOpenCheatsheet,
  onOpenNotebookLM,
  onOpenEbookDownload
}) {
  const progressPercentage = Math.round((completedLessons.length / (totalLessons || 1)) * 100);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-[#0B0F19]/90 border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="h-10 px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs">
                <img 
                  src="/fast-ai-logo.png" 
                  alt="Fast AI Logo" 
                  className="h-7 w-auto object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 font-mono">
                    2026 EDITION
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  AI Agent &amp; Vibe Coding for SME
                </div>
              </div>
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="ค้นหาบทเรียน, Prompt, โค้ดตัวอย่าง, หรือเครื่องมือ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-transparent focus:border-brand-500 dark:focus:border-brand-400 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Link to Previous Course: AI MBA Handbook */}
            <a
              href="https://cheeptham333.github.io/ai-mba-handbook/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/30 text-slate-700 dark:text-slate-300 hover:text-amber-800 dark:hover:text-amber-300 border border-slate-200 dark:border-slate-700 hover:border-amber-300 transition-all text-xs font-semibold"
              title="เปิดเว็บหลักสูตรปูพื้นฐาน AI MBA Handbook (ครั้งที่แล้ว)"
            >
              <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>AI MBA Handbook (ครั้งที่แล้ว)</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            {/* E-Book PDF Download Button */}
            <button
              onClick={onOpenEbookDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-sm transition-all text-xs font-bold group"
              title="ดาวน์โหลดคู่มือ E-Book ฉบับเต็ม (PDF 45 หน้า)"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">โหลด E-Book (PDF)</span>
              <span className="sm:hidden">E-Book</span>
            </button>

            {/* Google NotebookLM Hub Button */}
            <button
              onClick={onOpenNotebookLM}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 hover:bg-amber-100 dark:hover:bg-amber-500/20 text-xs font-bold transition-all shadow-xs"
              title="เปิดระบบ Google Gemini NotebookLM Hub"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>NotebookLM Hub</span>
            </button>

            {/* Slash Commands Cheatsheet Trigger */}
            <button
              onClick={onOpenCheatsheet}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-all"
              title="เปิดหน้าต่างคำสั่งลัดและคีย์ลัด"
            >
              <Terminal className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span className="hidden md:inline">คำสั่งลัด / Commands</span>
            </button>

            {/* Progress Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="text-slate-500 dark:text-slate-400">ความก้าวหน้า:</span>
              <span className="font-bold text-brand-600 dark:text-brand-400">{progressPercentage}%</span>
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all"
              aria-label="สลับโหมดการแสดงผล (Light / Dark)"
              title={darkMode ? "เปลี่ยนเป็นโหมดสว่าง (Light Mode)" : "เปลี่ยนเป็นโหมดมืด (Dark Mode)"}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
