import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Command
} from 'lucide-react';
import { cheatsheetCommands } from '../data/cheatsheetData';

export function CheatsheetModal({ isOpen, onClose }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-400 border border-brand-200 dark:border-brand-500/30">
              <Command className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Fast AI Quick Cheatsheet</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">คลังคีย์ลัด Slash Commands & สูตรลัด Prompt สั่งงานด่วน</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {cheatsheetCommands.map((cat, cIdx) => (
            <div key={cIdx} className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400">
                {cat.category}
              </h3>
              <div className="space-y-2.5">
                {cat.commands.map((cmd, idx) => {
                  const copyKey = `${cIdx}-${idx}`;
                  const isCopied = copiedIndex === copyKey;
                  return (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <code className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-950 px-2.5 py-0.5 rounded-lg border border-slate-200 dark:border-slate-800 font-mono">
                            {cmd.cmd}
                          </code>
                          <span className="text-xs text-slate-800 dark:text-slate-300 font-bold">{cmd.desc}</span>
                        </div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono pl-1">
                          ตัวอย่าง: {cmd.example}
                        </div>
                      </div>

                      <button
                        onClick={() => handleCopy(cmd.example, copyKey)}
                        className="self-start sm:self-center flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all shadow-sm"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'ก๊อปแล้ว' : 'คัดลอก'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>💡 กด Escape หรือคลิกนอกหน้าต่างเพื่อปิด</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all shadow-sm"
          >
            เข้าใจแล้ว
          </button>
        </div>

      </div>
    </div>
  );
}
