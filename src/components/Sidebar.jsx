import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Cpu, 
  Briefcase, 
  Zap, 
  Puzzle, 
  Rocket, 
  Calculator, 
  Wrench, 
  AlertTriangle,
  FolderGit2,
  CheckCircle2,
  Bookmark,
  Layers,
  ChevronRight,
  Download,
  Presentation,
  GraduationCap,
  ExternalLink
} from 'lucide-react';

const iconMap = {
  Sparkles,
  Cpu,
  Briefcase,
  Zap,
  Puzzle,
  Rocket
};

export function Sidebar({ 
  modules, 
  activeTab, 
  setActiveTab, 
  activeModuleId, 
  setActiveModuleId, 
  completedLessons,
  bookmarkedSections,
  isMobileOpen,
  setIsMobileOpen,
  onOpenEbookDownload
}) {
  return (
    <aside className={`
      fixed inset-y-0 left-0 z-30 w-72 pt-16 pb-6 bg-white/95 dark:bg-slate-950/95 lg:bg-transparent border-r border-slate-200 dark:border-slate-800 
      transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-[calc(100vh-4rem)] lg:overflow-y-auto shadow-sm lg:shadow-none
      ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="px-4 py-3 space-y-4">

        {/* Ebook Download CTA Card in Sidebar */}
        <button
          onClick={onOpenEbookDownload}
          className="w-full p-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white flex items-center justify-between gap-2 shadow-md transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-white/20">
              <Download className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <div className="text-xs font-black">โหลดคู่มือ E-Book (PDF)</div>
              <div className="text-[10px] text-red-100">ฉบับสมบูรณ์ 45 หน้าสไตล์ O'Reilly</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Card: Link to Previous Class: AI MBA Handbook */}
        <a
          href="https://cheeptham333.github.io/ai-mba-handbook/"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-slate-900 border border-amber-200 dark:border-amber-500/30 hover:border-amber-400 dark:hover:border-amber-400 transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300">
              <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>หลักสูตรครั้งที่แล้ว</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-amber-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div className="text-xs font-black text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
            AI MBA Handbook &amp; Prompt Lab
          </div>
          <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
            โดย ชีพธรรม คำวิเศษณ์ (22 บทเรียน MBA บริหารธุรกิจระดับโลก)
          </p>
        </a>

        {/* Section: Teaching Slides */}
        <div>
          <div className="px-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            📊 สไลด์ประกอบการสอน
          </div>
          <button
            onClick={() => { setActiveTab('slides'); setIsMobileOpen(false); }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all ${
              activeTab === 'slides'
                ? 'bg-red-50 dark:bg-red-500/20 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-500/40 shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white border border-transparent'
            }`}
          >
            <div className="p-1.5 rounded-lg bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400">
              <Presentation className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold flex items-center gap-1.5">
                <span>สไลด์ PPT สอนสด</span>
                <span className="text-[9px] bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 px-1 py-0.2 rounded font-bold">16:9</span>
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">โหมดนำเสนอ &amp; โหลด .PPTX</div>
            </div>
          </button>
        </div>

        {/* Section: Learning Curriculum */}
        <div>
          <div className="flex items-center justify-between px-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span>📚 หลักสูตร 6 โมดูล Fast-Track</span>
            <span className="text-[10px] text-brand-600 dark:text-brand-400 bg-brand-500/10 px-1.5 py-0.5 rounded font-bold">Fast AI</span>
          </div>
          
          <nav className="space-y-1">
            {modules.map((m) => {
              const IconComp = iconMap[m.icon] || BookOpen;
              const isSelected = activeTab === 'curriculum' && activeModuleId === m.id;
              const moduleLessons = m.sections.map(s => s.id);
              const completedCount = moduleLessons.filter(id => completedLessons.includes(id)).length;
              const isAllDone = completedCount === moduleLessons.length && moduleLessons.length > 0;

              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveTab('curriculum');
                    setActiveModuleId(m.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all group ${
                    isSelected
                      ? 'bg-brand-50 dark:bg-brand-600/30 text-brand-700 dark:text-white border border-brand-200 dark:border-brand-500/40 shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400'}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="truncate font-bold text-slate-900 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-300">
                        บทที่ {m.moduleNumber}: {m.title.split(' ')[0]}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{m.badge}</div>
                    </div>
                  </div>

                  {isAllDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                  ) : completedCount > 0 ? (
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 flex-shrink-0 bg-amber-100 dark:bg-amber-500/10 px-1.5 py-0.5 rounded">
                      {completedCount}/{moduleLessons.length}
                    </span>
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 group-hover:text-slate-600 dark:group-hover:text-slate-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Section: Interactive Tools & Vaults */}
        <div>
          <div className="px-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            🛠️ เครื่องมือช่วยทำงาน (Interactive)
          </div>
          <nav className="space-y-1">
            
            {/* SME Projects */}
            <button
              onClick={() => { setActiveTab('projects'); setIsMobileOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all ${
                activeTab === 'projects'
                  ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white border border-transparent'
              }`}
            >
              <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                <FolderGit2 className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold">5 พิมพ์เขียวโปรเจกต์ SME</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">พิมพ์เขียวโค้ดพร้อมใช้</div>
              </div>
            </button>

            {/* Google Gemini NotebookLM Hub */}
            <button
              onClick={() => { setActiveTab('notebooklm'); setIsMobileOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all ${
                activeTab === 'notebooklm'
                  ? 'bg-amber-50 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40 shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white border border-transparent'
              }`}
            >
              <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold">
                  <span>Gemini NotebookLM Hub</span>
                  <span className="text-[9px] bg-amber-200 dark:bg-amber-400/20 text-amber-800 dark:text-amber-300 px-1 py-0.2 rounded font-bold">2nd Brain</span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">คลังทบทวน &amp; Audio Podcast</div>
              </div>
            </button>

            {/* AI Business Prompt Generator */}
            <button
              onClick={() => { setActiveTab('prompts'); setIsMobileOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all ${
                activeTab === 'prompts'
                  ? 'bg-purple-50 dark:bg-fastai-purple/20 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-fastai-purple/40 shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white border border-transparent'
              }`}
            >
              <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold">AI Business Prompt Builder</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">สร้าง Prompt สั่งงาน 1-คลิก</div>
              </div>
            </button>

            {/* ROI Calculator */}
            <button
              onClick={() => { setActiveTab('roi'); setIsMobileOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all ${
                activeTab === 'roi'
                  ? 'bg-brand-50 dark:bg-brand-500/20 text-brand-800 dark:text-brand-300 border border-brand-300 dark:border-brand-500/40 shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white border border-transparent'
              }`}
            >
              <div className="p-1.5 rounded-lg bg-brand-100 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold">SME ROI &amp; Cost Calculator</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">คำนวณเงิน/เวลาที่ประหยัดได้</div>
              </div>
            </button>

            {/* Error Troubleshooter */}
            <button
              onClick={() => { setActiveTab('errors'); setIsMobileOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all ${
                activeTab === 'errors'
                  ? 'bg-rose-50 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-500/40 shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white border border-transparent'
              }`}
            >
              <div className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold">Live Error Troubleshooter</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">แก้บั๊กยอดฮิตใน 10 วินาที</div>
              </div>
            </button>

            {/* Plugins & Custom Skills */}
            <button
              onClick={() => { setActiveTab('plugins'); setIsMobileOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all ${
                activeTab === 'plugins'
                  ? 'bg-blue-50 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-500/40 shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white border border-transparent'
              }`}
            >
              <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400">
                <Puzzle className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold">Plugins &amp; Custom Skills</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">คลังสกิล &amp; Template SKILL.md</div>
              </div>
            </button>

          </nav>
        </div>

        {/* Course Info Banner */}
        <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold mb-1">
            <Layers className="w-4 h-4" />
            <span>Fast AI Mastery 2026</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
            คู่มือปฏิบัติการสำหรับ SME สร้างแอปและระบบอัตโนมัติด้วย AI Agent สั่งการด้วยภาษาธุรกิจ
          </p>
        </div>

      </div>
    </aside>
  );
}
