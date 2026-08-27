import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Copy, 
  Check, 
  Terminal, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { errorRemedies } from '../data/errorSolverData';

export function ErrorSolver() {
  const [selectedErrorId, setSelectedErrorId] = useState(errorRemedies[0].id);
  const [copied, setCopied] = useState(false);
  const [customErrorInput, setCustomErrorInput] = useState("");
  const [customGeneratedPrompt, setCustomGeneratedPrompt] = useState("");

  const currentError = errorRemedies.find(e => e.id === selectedErrorId) || errorRemedies[0];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateCustomFix = () => {
    if (!customErrorInput.trim()) return;
    setCustomGeneratedPrompt(
      `ฉันพบข้อผิดพลาดขณะรันระบบ ดังนี้:
"""
${customErrorInput.trim()}
"""
กรุณาทำหน้าที่เป็น Senior Debugging Agent:
1. อธิบายสาเหตุของ Error นี้เป็นภาษาไทยสั้นๆ 2 บรรทัด
2. ตรวจสอบไฟล์ในโปรเจกต์ที่เกี่ยวข้อง และทำการแก้ไขโค้ดให้ถูกต้องทันที
3. ทดสอบรันคำสั่งเพื่อให้แน่ใจว่าระบบกลับมาทำงานได้ 100% โดยไม่ต้องให้ฉันแก้เอง`
    );
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-500/30 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Live Error Troubleshooter</h1>
            <p className="text-xs sm:text-sm text-rose-800 dark:text-rose-300">รวมอาการบั๊กยอดฮิตสำหรับ Non-coders พร้อม Prompt สั่ง AI Agent ซ่อมตัวเองใน 10 วินาที</p>
          </div>
        </div>
      </div>

      {/* Preset Error Selector */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400">
          🔍 1. เลือกอาการหรือ Error ที่พบเจอ:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {errorRemedies.map((err) => {
            const isSelected = err.id === selectedErrorId;
            return (
              <button
                key={err.id}
                onClick={() => setSelectedErrorId(err.id)}
                className={`p-4 rounded-2xl text-left transition-all border shadow-sm ${
                  isSelected
                    ? 'bg-rose-50 dark:bg-rose-500/20 text-rose-900 dark:text-rose-200 border-rose-400 dark:border-rose-500/50'
                    : 'bg-white dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1">
                  {err.name}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-2">
                  {err.symptom}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Remedy Details Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-rose-500/40 space-y-6 shadow-sm dark:shadow-2xl">
        <div className="space-y-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30">
            Remedy Blueprint
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            วิธีแก้: {currentError.name}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            <strong>สาเหตุแท้จริง:</strong> {currentError.cause}
          </p>
        </div>

        {/* Quick Prompt */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>Prompt ภาษาไทยสั่ง AI Agent แก้ให้ทันที:</span>
            </span>
            <button
              onClick={() => handleCopy(currentError.quickPrompt)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-sm transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'คัดลอกสำเร็จ!' : '1-Click Copy'}</span>
            </button>
          </div>

          <pre className="text-xs text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            {currentError.quickPrompt}
          </pre>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
            💡 {currentError.explanation}
          </div>
        </div>
      </div>

      {/* Custom Error Generator */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <span>2. หรือแปะข้อความ Error ใดๆ จาก Terminal เพื่อให้เราสร้าง Prompt ให้:</span>
        </h3>
        
        <textarea
          rows={3}
          value={customErrorInput}
          onChange={(e) => setCustomErrorInput(e.target.value)}
          placeholder="วางข้อความ Error สีแดงจากหน้าจอ เช่น TypeError: Cannot read properties of undefined..."
          className="w-full bg-slate-50 dark:bg-slate-950 text-xs font-mono text-slate-900 dark:text-slate-100 rounded-xl p-3.5 border border-slate-300 dark:border-slate-700 focus:border-brand-500 focus:outline-none placeholder-slate-400"
        />

        <button
          onClick={handleGenerateCustomFix}
          className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all"
        >
          <span>สร้างคำสั่งสั่งแก้บั๊ก</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {customGeneratedPrompt && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-brand-300 dark:border-brand-500/40 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-brand-800 dark:text-brand-300">Prompt แก้บั๊กเฉพาะของคุณ:</span>
              <button
                onClick={() => handleCopy(customGeneratedPrompt)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-brand-100 dark:bg-brand-500/20 text-brand-800 dark:text-brand-300 border border-brand-200 dark:border-brand-500/30"
              >
                <Copy className="w-3 h-3" />
                <span>คัดลอก</span>
              </button>
            </div>
            <pre className="text-xs font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              {customGeneratedPrompt}
            </pre>
          </div>
        )}
      </div>

    </div>
  );
}
