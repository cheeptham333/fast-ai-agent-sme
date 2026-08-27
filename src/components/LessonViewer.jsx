import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Copy, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Lightbulb, 
  Sparkles, 
  Bookmark, 
  Clock,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function LessonViewer({ 
  moduleData, 
  onNextModule, 
  onPrevModule, 
  isFirst, 
  isLast,
  completedLessons,
  toggleLessonCompletion,
  bookmarkedSections,
  toggleBookmark,
  onOpenNotebookLM
}) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCompleteAll = () => {
    moduleData.sections.forEach(sec => {
      if (!completedLessons.includes(sec.id)) {
        toggleLessonCompletion(sec.id);
      }
    });
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const isModuleAllCompleted = moduleData.sections.every(sec => completedLessons.includes(sec.id));

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      
      {/* Module Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-brand-500/15 text-brand-700 dark:text-brand-300 border border-brand-500/30">
                บทที่ {moduleData.moduleNumber}
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {moduleData.badge}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{moduleData.duration}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
            {moduleData.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {moduleData.subtitle}
          </p>

          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              💡 {moduleData.summary}
            </p>
            <button
              onClick={handleCompleteAll}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                isModuleAllCompleted 
                  ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40' 
                  : 'bg-brand-600 hover:bg-brand-500 text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isModuleAllCompleted ? 'ผ่านบทเรียนนี้แล้ว 🎉' : 'ทำเครื่องหมายว่าเรียนจบทั้งหมด'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sections Content */}
      <div className="space-y-8">
        {moduleData.sections.map((section) => {
          const isDone = completedLessons.includes(section.id);
          const isBookmarked = bookmarkedSections.includes(section.id);

          return (
            <article 
              key={section.id} 
              id={section.id}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-lg hover:border-slate-300 dark:hover:border-slate-700/80 transition-all"
            >
              {/* Section Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      toggleLessonCompletion(section.id);
                      if (!isDone) {
                        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
                      }
                    }}
                    className="flex-shrink-0 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    title={isDone ? "ทำเครื่องหมายว่ายังไม่เสร็จ" : "ทำเครื่องหมายว่าเสร็จแล้ว"}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 dark:text-emerald-400 fill-emerald-500/20" />
                    ) : (
                      <Circle className="w-6 h-6 hover:text-slate-600 dark:hover:text-slate-300" />
                    )}
                  </button>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                    {section.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleBookmark(section.id)}
                    className={`p-2 rounded-lg transition-all ${
                      isBookmarked 
                        ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300' 
                        : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    title="บันทึกไว้อ่านภายหลัง"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Section Body Content */}
              <div className="mt-5 prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                {section.content.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.trim().startsWith('###')) {
                    return (
                      <h3 key={pIdx} className="text-base sm:text-lg font-bold text-slate-900 dark:text-white pt-2 text-brand-700 dark:text-brand-300">
                        {paragraph.replace('###', '').trim()}
                      </h3>
                    );
                  }
                  if (paragraph.trim().startsWith('*') || paragraph.trim().startsWith('-')) {
                    const listItems = paragraph.split('\n').filter(line => line.trim().length > 0);
                    return (
                      <ul key={pIdx} className="list-disc pl-5 space-y-1.5 my-2">
                        {listItems.map((item, iIdx) => (
                          <li key={iIdx} className="text-slate-700 dark:text-slate-300">
                            {item.replace(/^[\*\-]\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.trim().startsWith('>')) {
                    return (
                      <blockquote key={pIdx} className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border-l-4 border-brand-500 text-slate-800 dark:text-slate-200 italic my-3 text-sm">
                        {paragraph.replace('>', '').trim()}
                      </blockquote>
                    );
                  }
                  if (paragraph.trim().startsWith('|')) {
                    const rows = paragraph.trim().split('\n');
                    const headers = rows[0].split('|').filter(c => c.trim().length > 0);
                    const bodyRows = rows.slice(2);

                    return (
                      <div key={pIdx} className="overflow-x-auto my-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <table className="w-full text-left text-xs sm:text-sm">
                          <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                            <tr>
                              {headers.map((h, hIdx) => (
                                <th key={hIdx} className="px-4 py-2.5 font-bold">{h.trim()}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80 bg-white dark:bg-slate-900/40">
                            {bodyRows.map((r, rIdx) => {
                              const cells = r.split('|').filter(c => c.trim().length > 0);
                              return (
                                <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                  {cells.map((c, cIdx) => (
                                    <td key={cIdx} className="px-4 py-2.5 text-slate-700 dark:text-slate-300 font-medium">{c.trim()}</td>
                                  ))}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                  return (
                    <p key={pIdx} className="text-slate-700 dark:text-slate-300 font-normal">
                      {paragraph.trim()}
                    </p>
                  );
                })}
              </div>

              {/* Interactive Prompt Blocks */}
              {section.interactivePrompts && section.interactivePrompts.length > 0 && (
                <div className="mt-6 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Prompt สำเร็จรูปสั่งงานทันที (1-Click Copy)</span>
                  </div>
                  {section.interactivePrompts.map((pItem, pIdx) => {
                    const copyKey = `${section.id}-prompt-${pIdx}`;
                    const isCopied = copiedIndex === copyKey;
                    return (
                      <div key={pIdx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-brand-200 dark:border-brand-500/30 relative group shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-300">{pItem.title}</span>
                          <button
                            onClick={() => handleCopy(pItem.prompt, copyKey)}
                            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white transition-all shadow-sm"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{isCopied ? 'คัดลอกแล้ว!' : 'คัดลอก Prompt'}</span>
                          </button>
                        </div>
                        <pre className="text-xs text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap bg-white dark:bg-slate-900/90 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                          {pItem.prompt}
                        </pre>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Pro Tips Box */}
              {section.tips && section.tips.length > 0 && (
                <div className="mt-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-400 mb-2">
                    <Lightbulb className="w-4 h-4" />
                    <span>ข้อควรระวังและคำแนะนำจากโค้ช (Pro Tips):</span>
                  </div>
                  <ul className="space-y-1.5 pl-4 list-disc text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {section.tips.map((tip, tIdx) => (
                      <li key={tIdx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Takeaway */}
              {section.keyTakeaway && (
                <div className="mt-4 p-3.5 rounded-xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-500/20 flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-400 flex-shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="text-xs sm:text-sm text-brand-900 dark:text-brand-200 font-medium">
                    <strong className="text-brand-950 dark:text-white">หัวใจสำคัญ:</strong> {section.keyTakeaway}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={onPrevModule}
          disabled={isFirst}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            isFirst 
              ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-100 dark:bg-slate-900' 
              : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>บทก่อนหน้า</span>
        </button>

        <button
          onClick={onNextModule}
          disabled={isLast}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
            isLast 
              ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-100 dark:bg-slate-900' 
              : 'bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white shadow-md'
          }`}
        >
          <span>จบบทเรียนนี้ → ไปบทถัดไป</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
