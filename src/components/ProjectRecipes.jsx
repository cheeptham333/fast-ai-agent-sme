import React, { useState } from 'react';
import { 
  FolderGit2, 
  Copy, 
  Check, 
  Layers, 
  Wrench, 
  Code2, 
  Sparkles
} from 'lucide-react';
import { smeProjects } from '../data/useCasesData';

export function ProjectRecipes() {
  const [selectedProjectId, setSelectedProjectId] = useState(smeProjects[0].id);
  const [copiedKey, setCopiedKey] = useState(null);

  const currentProject = smeProjects.find(p => p.id === selectedProjectId) || smeProjects[0];

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-500/30 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">5 พิมพ์เขียวโปรเจกต์ SME พร้อมรันจริง</h1>
            <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300">สถาปัตยกรรมระบบ โค้ดต้นแบบ และ Prompt สั่งงานสร้างระบบเสร็จใน 1 วัน</p>
          </div>
        </div>
      </div>

      {/* Project Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {smeProjects.map((proj, idx) => {
          const isSelected = proj.id === selectedProjectId;
          return (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
              }`}
            >
              โปรเจกต์ {idx + 1}: {proj.title.split('(')[0].trim()}
            </button>
          );
        })}
      </div>

      {/* Main Project Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-8 shadow-sm dark:shadow-xl">
        
        {/* Title & Metadata */}
        <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                {currentProject.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {currentProject.badge}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {currentProject.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              {currentProject.description}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-right space-y-1">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">ผลลัพธ์ทางธุรกิจ (ROI Impact)</div>
            <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{currentProject.roiImpact}</div>
            <div className="text-[10px] text-slate-400">ต้นทุน: {currentProject.estimatedCost}</div>
          </div>
        </div>

        {/* Tools Used */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>เครื่องมือและเทคโนโลยีที่ใช้ (Tech Stack)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentProject.toolsUsed.map((tool, tIdx) => (
              <span key={tIdx} className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">
                ⚡ {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Step-by-Step Architecture Pipeline */}
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>แผนภาพสถาปัตยกรรม (Workflow Architecture)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {currentProject.architecture.map((stepItem) => (
              <div key={stepItem.step} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800/80 relative shadow-sm">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center justify-center mb-2">
                  {stepItem.step}
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-slate-100">{stepItem.title}</div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">{stepItem.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ready Prompt for Agent */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>คำสั่ง Prompt สั่งงาน Antigravity / Codex ทันที</span>
          </div>
          {currentProject.prompts.map((p, pIdx) => {
            const copyKey = `prompt-${currentProject.id}-${pIdx}`;
            const isCopied = copiedKey === copyKey;
            return (
              <div key={pIdx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-purple-200 dark:border-purple-500/30 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-purple-800 dark:text-purple-300">{p.stepName}</span>
                  <button
                    onClick={() => handleCopy(p.promptText, copyKey)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-sm"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'คัดลอกแล้ว!' : 'คัดลอก Prompt'}</span>
                  </button>
                </div>
                <pre className="text-xs text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap bg-white dark:bg-slate-900/90 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80">
                  {p.promptText}
                </pre>
              </div>
            );
          })}
        </div>

        {/* Source Code Snippet */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>ตัวอย่างซอร์สโค้ดต้นแบบ (Starter Code)</span>
            </div>
            <button
              onClick={() => handleCopy(currentProject.codeSnippet, `code-${currentProject.id}`)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all shadow-sm"
            >
              {copiedKey === `code-${currentProject.id}` ? (
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copiedKey === `code-${currentProject.id}` ? 'คัดลอกโค้ดแล้ว!' : 'คัดลอกโค้ด'}</span>
            </button>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 dark:bg-slate-950 border border-slate-800 overflow-x-auto">
            <pre className="text-xs font-mono text-emerald-400 whitespace-pre">
              {currentProject.codeSnippet}
            </pre>
          </div>
        </div>

      </div>

    </div>
  );
}
