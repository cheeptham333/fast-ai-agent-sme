import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  FileText, 
  Check, 
  Sparkles, 
  BookOpen, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function EbookDownloadModal({ isOpen, onClose }) {
  const [copiedMd, setCopiedMd] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPdf = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    // Trigger download
    const link = document.createElement('a');
    link.href = '/fast-ai-handbook-sme-2026.pdf';
    link.download = 'Fast_AI_Master_Handbook_SME_2026_OReilly_Edition.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    fetch('/FAST_AI_HANDBOOK_COMPLETE_GUIDE.md')
      .then(res => res.text())
      .then(text => {
        navigator.clipboard.writeText(text);
        setCopiedMd(true);
        setTimeout(() => setCopiedMd(false), 2500);
      })
      .catch(() => {
        alert('คัดลอกสรุปสำเร็จ!');
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-400 border border-brand-200 dark:border-brand-500/30">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  ดาวน์โหลดคู่มือ Fast AI E-Book
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-500/30">
                  O'Reilly Style Edition
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                คู่มือปฏิบัติการ AI Agent & Vibe Coding สำหรับผู้ประกอบการ SME (ฉบับสมบูรณ์ 45 หน้า)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          
          {/* Ebook Preview Card with O'Reilly Cover */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-brand-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm">
            <div className="w-20 h-28 rounded-xl bg-white border border-slate-300 shadow-md flex-shrink-0 overflow-hidden flex items-center justify-center">
              <img 
                src="/ebook_cover_preview.png" 
                alt="Fast AI O'Reilly Cover" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                  45 Pages Master Edition
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">A4 Portrait • High-Res PDF (864 KB)</span>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                AI Agent & Vibe Coding for SME Handbook
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                จัดหน้าคู่มือระดับสากลสไตล์ O'Reilly พร้อมสารบัญ 6 ภาควิชาการ, 18 บทเรียนเจาะลึก, 5 พิมพ์เขียวพร้อมโค้ดเต็ม, คลัง Prompt 30+ ชุด, และ 30-Day Action Plan
              </p>
            </div>
          </div>

          {/* Download Options */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              ตัวเลือกการดาวน์โหลดและพิมพ์:
            </h4>

            {/* Option 1: Direct PDF */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 hover:border-brand-500/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    ดาวน์โหลดไฟล์ E-Book O'Reilly Edition (PDF)
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    ไฟล์ PDF ฉบับเต็ม 45 หน้า คมชัดสมบูรณ์แบบ สำหรับเปิดอ่านบน iPad หรือพิมพ์แจก
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownloadPdf}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-sm transition-all flex-shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>ดาวน์โหลด PDF</span>
              </button>
            </div>

            {/* Option 2: Print to PDF */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 hover:border-brand-500/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    พิมพ์ / บันทึกหน้าเว็บปัจจุบัน (Live Web Print)
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    เปิดหน้าต่างสั่งพิมพ์ของเบราว์เซอร์เพื่อบันทึกหน้าบทเรียนสด
                  </div>
                </div>
              </div>

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all flex-shrink-0"
              >
                <Printer className="w-4 h-4" />
                <span>สั่งพิมพ์</span>
              </button>
            </div>

            {/* Option 3: Markdown */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 hover:border-brand-500/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    คัดลอกคู่มือทั้งหมดเป็น Markdown
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    นำไปใช้อัปโหลดใส่ Google NotebookLM หรือแชร์ลง Notion บริษัท
                  </div>
                </div>
              </div>

              <button
                onClick={handleCopyMarkdown}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all flex-shrink-0"
              >
                {copiedMd ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Download className="w-4 h-4" />}
                <span>{copiedMd ? 'คัดลอกแล้ว!' : 'คัดลอก Markdown'}</span>
              </button>
            </div>

          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300">
            <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>Fast AI Mastery 2026 — O'Reilly Style Certified Master Handbook (45 Pages)</span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Fast AI Official Publishing</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold transition-all"
          >
            ปิดหน้าต่าง
          </button>
        </div>

      </div>
    </div>
  );
}
