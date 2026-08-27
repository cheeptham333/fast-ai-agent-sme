import React, { useState } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  Headphones, 
  FileCheck, 
  Copy, 
  Check, 
  Play, 
  Pause, 
  Volume2
} from 'lucide-react';
import { notebookLmData } from '../data/notebookLmData';

export function NotebookLmHub() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* Hero Banner with Official NotebookLM Link */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-100 via-amber-50 to-orange-50 dark:from-amber-950/60 dark:via-slate-900 dark:to-slate-950 border border-amber-300 dark:border-amber-500/40 shadow-md dark:shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-200 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-400 dark:border-amber-500/30 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Google Gemini Notebook
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                Official Fast AI Workspace
              </span>
            </div>
            
            <a
              href={notebookLmData.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-md transition-all hover:scale-105"
            >
              <span>เปิด Fast AI NotebookLM ทันที</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              ศูนย์บัญชาการสมองที่ 2 (Second Brain Hub)
            </h1>
            <p className="mt-2 text-sm sm:text-base text-amber-950 dark:text-amber-200/90 leading-relaxed max-w-3xl">
              {notebookLmData.description}
            </p>
          </div>

          <div className="pt-4 border-t border-amber-200 dark:border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold">
              ✓ Grounded AI ข้อมูลเป๊ะ 100%
            </span>
            <span className="flex items-center gap-1 text-amber-700 dark:text-amber-400 font-bold">
              ✓ แปลงเอกสารเป็น Audio Podcast
            </span>
            <span className="flex items-center gap-1 text-brand-700 dark:text-brand-400 font-bold">
              ✓ บรีฟต่อให้ Antigravity เขียนโค้ดได้ทันที
            </span>
          </div>
        </div>
      </div>

      {/* 4 Core Superpowers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {notebookLmData.features.map((feat, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2 hover:border-amber-400 dark:hover:border-amber-500/40 transition-all shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
              {idx + 1}
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">{feat.title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>

      {/* Audio Overview Feature Simulator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm dark:shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Audio Overview (Deep Dive Podcast)</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">ฟีเจอร์แปลงเอกสารคู่มือเป็นพอดแคสต์เสียงจำลองสำหรับฟังทบทวนขณะเดินทาง</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isPlayingAudio
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
            }`}
          >
            {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isPlayingAudio ? 'กำลังเล่นสรุปเสียงจำลอง...' : 'ทดลองฟัง Audio Summary (จำลอง)'}</span>
          </button>
        </div>

        {isPlayingAudio && (
          <div className="p-4 rounded-2xl bg-amber-100 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-500/30 flex items-center gap-4 animate-pulse">
            <Volume2 className="w-6 h-6 text-amber-700 dark:text-amber-400 flex-shrink-0" />
            <div className="text-xs text-amber-900 dark:text-amber-200">
              <strong>🎙️ ผู้ดำเนินรายการ AI (Host 1 & 2):</strong> "ยินดีต้อนรับสู่ Fast AI Summary ครับ วันนี้เรามาเจาะลึก 3 แกนหลักของ Vibe Coding... การเลือกใช้ Google Antigravity และการบริหารต้นทุน 0 บาทสำหรับ SME..."
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {notebookLmData.useCases.map((uc, uIdx) => (
            <div key={uIdx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="font-bold text-slate-900 dark:text-slate-200">{uc.title}</div>
              <ul className="space-y-1 text-slate-600 dark:text-slate-400 pl-4 list-disc">
                {uc.steps.map((st, sIdx) => (
                  <li key={sIdx}>{st}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* SOP Generator for NotebookLM */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Template ร่าง SOP องค์กรสำหรับอัปโหลดเข้า NotebookLM</h2>
          </div>
          <button
            onClick={() => handleCopy(notebookLmData.sopTemplates[0].content, 'sop-template')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all"
          >
            {copiedKey === 'sop-template' ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'sop-template' ? 'คัดลอกแล้ว!' : 'คัดลอก Template'}</span>
          </button>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          นำ Template นี้ไปกรอกกระบวนการทำงานในบริษัทของคุณ แล้วบันทึกเป็น PDF/Word อัปโหลดขึ้น NotebookLM เพื่อให้ AI ตอบคำถามพนักงานและลูกค้าได้ 100%
        </p>
        <pre className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-300 whitespace-pre-wrap">
          {notebookLmData.sopTemplates[0].content}
        </pre>
      </div>

    </div>
  );
}
