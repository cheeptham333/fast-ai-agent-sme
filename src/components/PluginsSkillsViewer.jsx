import React, { useState } from 'react';
import { 
  Puzzle, 
  Copy, 
  Check, 
  FileCode2
} from 'lucide-react';
import { pluginsAndSkills, customSkillTemplate } from '../data/pluginsAndSkills';

export function PluginsSkillsViewer() {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-500/30 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">
            <Puzzle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">ทำเนียบ Plugins & Custom Skills</h1>
            <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-300">เสริมเขี้ยวเล็บให้ AI Agent เก่งขึ้นเฉพาะทาง พร้อมเทมเพลตสร้าง Skill ของบริษัทคุณเอง</p>
          </div>
        </div>
      </div>

      {/* Recommended Skills Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400">
          🌟 ท็อป Plugins & Skills สำคัญสำหรับองค์กร SME
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pluginsAndSkills.map((item) => (
            <div key={item.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between hover:border-blue-400 dark:hover:border-blue-500/40 transition-all shadow-sm">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-800 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-500/20">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                    {item.tag}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{item.name}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>
                <div className="text-[11px] text-brand-900 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/40 p-2.5 rounded-xl border border-brand-200 dark:border-brand-500/20">
                  ✨ <strong>ประโยชน์:</strong> {item.benefit}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <code className="text-[11px] font-mono text-slate-600 dark:text-slate-400 truncate max-w-[200px]">
                  {item.command}
                </code>
                <button
                  onClick={() => handleCopy(item.command, item.id)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all"
                >
                  {copiedKey === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === item.id ? 'ก๊อปแล้ว' : 'คัดลอก'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom SKILL.md Creator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm dark:shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">เทมเพลตสร้าง Custom Skill สำหรับองค์กร (SKILL.md)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">สร้างไฟล์นี้ในโฟลเดอร์โปรเจกต์เพื่อให้ Agent จดจำกฎของบริษัทคุณได้ตลอดไป</p>
            </div>
          </div>

          <button
            onClick={() => handleCopy(customSkillTemplate.content, 'custom-skill-template')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-sm transition-all"
          >
            {copiedKey === 'custom-skill-template' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'custom-skill-template' ? 'คัดลอกแล้ว!' : 'คัดลอก Template SKILL.md'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
          {customSkillTemplate.content}
        </pre>
      </div>

    </div>
  );
}
