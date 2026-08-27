import React, { useState, useEffect } from 'react';
import { 
  Presentation, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  Layers, 
  MessageSquare, 
  Play,
  Share2,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

const slidesData = [
  {
    id: 1,
    category: "FAST AI MASTERCLASS 2026",
    title: "AI Agent & Vibe Coding for SME",
    subtitle: "ขับเคลื่อนด้วย Google Gemini 3.7, Antigravity, ChatGPT 5.6 & Claude Opus 5",
    theme: "light",
    content: (
      <div className="flex flex-col items-center justify-center text-center space-y-6 py-6">
        <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-md">
          <img src="./fast-ai-logo.png" alt="Fast AI" className="h-16 w-auto object-contain" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            AI Agent & Vibe Coding Masterclass
          </h2>
          <p className="text-base sm:text-lg text-brand-600 font-bold max-w-2xl mx-auto">
            สร้างระบบดิจิทัลใช้งานจริงในองค์กร โดยไม่ต้องเขียนโค้ดแม้แต่บรรทัดเดียว
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs sm:text-sm text-slate-700 max-w-xl">
          🎯 <strong>KPI หลักสูตร:</strong> ผู้เรียนสามารถสั่งงาน AI Agent สร้างระบบและ Deploy ขึ้น Production ได้จริง 0 บาท
        </div>
      </div>
    ),
    speakerNotes: "เปิดคลาสด้วยการต้อนรับผู้บริหารและเจ้าของธุรกิจ ย้ำว่าคลาสนี้ไม่ต้องเขียนโค้ด แต่จะเน้นการเป็น CEO สั่งงาน AI"
  },
  {
    id: 2,
    category: "THAILAND SME CONTEXT 2026",
    title: "บริบท AI ประเทศไทย 2026: โอกาสทองของ SME ยุคใหม่",
    subtitle: "ข้อมูลวิจัยล่าสุดที่พิสูจน์แล้วว่า AI ช่วยสร้างรายได้และลดต้นทุนได้จริง",
    theme: "light",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
        <div className="p-5 rounded-2xl bg-white border border-brand-200 shadow-sm space-y-3">
          <div className="text-xs font-bold text-brand-600">📊 AWS Report 2026</div>
          <h4 className="text-xl font-extrabold text-slate-900">+84% Productivity</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            SME ไทย 84% ที่นำ AI มาใช้มีผลผลิตเพิ่มขึ้น และ 71% มีรายได้เติบโตเฉลี่ย 19% ในปีแรก
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-red-200 shadow-sm space-y-3">
          <div className="text-xs font-bold text-red-600">🇹🇭 UOB Study 2026</div>
          <h4 className="text-xl font-extrabold text-slate-900">&gt;70% Adoption</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            เจ้าของธุรกิจไทยกว่า 70% เริ่มนำ AI เข้ามาช่วยงานแล้ว หากเราไม่เริ่มวันนี้จะเสียเปรียบคู่แข่ง
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
          <div className="text-xs font-bold text-emerald-400">💡 สิ่งที่ต้องตระหนัก</div>
          <h4 className="text-lg font-bold">Start Small, Win Fast</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            ไม่ต้องรอสร้างระบบใหญ่ เริ่มจากจุดเจ็บปวดเล็กๆ ที่ประหยัดเวลาแอดมิน 15-20 ชม./สัปดาห์
          </p>
        </div>
      </div>
    ),
    speakerNotes: "ชี้ให้เห็นตัวเลขสถิติจาก AWS และ UOB เพื่อสร้างความมั่นใจและความเร่งด่วนในการปรับตัว"
  },
  {
    id: 3,
    category: "MINDSET & PRINCIPLES",
    title: "Mindset Vibe Coding: กฎทอง 80/20 ฉบับเจ้าของกิจการ",
    subtitle: "เปลี่ยนบทบาทจากคนนั่งพิมพ์โค้ด เป็น CEO ตรวจรับงานทีมงานวิศวกร AI",
    theme: "light",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <h4 className="text-base font-bold text-red-600">🎯 กฎทอง 80/20</h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc pl-4">
            <li><strong>80% ของความสำเร็จ:</strong> อยู่ที่การตั้งโจทย์ธุรกิจและบรีฟงานที่คมชัด</li>
            <li><strong>20% ที่เหลือ:</strong> คือการตรวจสอบและปรับแต่ง (Iterative Review)</li>
            <li><strong>Prompt แรกได้ 50%:</strong> ไม่ต้องตกใจ เพราะ Vibe Coding คือการคุยวนรอบ</li>
          </ul>
        </div>
        <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 space-y-3">
          <h4 className="text-base font-bold text-slate-900">🔄 ความต่างของวิธีคิด</h4>
          <div className="text-xs sm:text-sm text-slate-700 space-y-2">
            <p className="text-red-700">❌ <strong>แบบเดิม:</strong> จำ Syntax งมแก้บั๊กทีละบรรทัด</p>
            <p className="text-emerald-700 font-semibold">✅ <strong>Vibe Coding:</strong> คุยภาษาคน กำกับผลลัพธ์ ตรวจงานเหมือนผู้จัดการ</p>
          </div>
        </div>
      </div>
    ),
    speakerNotes: "เน้นย้ำว่า Prompt แรกได้ 50% เป็นเรื่องปกติ หัวใจคือการคุยวนปรับแก้ (Feedback Loop)"
  },
  {
    id: 4,
    category: "THE FRONTIER AI STACK",
    title: "The Frontier AI Stack: 4 ขุนพลเรือธงประจำองค์กร",
    subtitle: "เครื่องมือระดับโลกที่ช่วยให้ SME มีศักยภาพเทียบเท่าทีมวิศวกรซอฟต์แวร์ 5 คน",
    theme: "light",
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 py-4">
        <div className="p-4 rounded-2xl bg-white border border-brand-200 shadow-sm space-y-2">
          <div className="text-sm font-black text-brand-600">01. Google Gemini 3.7</div>
          <div className="text-xs font-bold text-slate-900">Primary Engine (พระเอก)</div>
          <p className="text-[11px] text-slate-600">ขับเคลื่อน Antigravity &amp; NotebookLM ประมวลผลภาพ/เอกสาร 2M Tokens</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-2">
          <div className="text-sm font-black text-amber-600">02. NotebookLM</div>
          <div className="text-xs font-bold text-slate-900">Second Brain (ไม่มั่ว 100%)</div>
          <p className="text-[11px] text-slate-600">คลังความรู้บริษัท แปลงเอกสารเป็น Audio Podcast Studio</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-red-200 shadow-sm space-y-2">
          <div className="text-sm font-black text-red-600">03. ChatGPT 5.6 Sol</div>
          <div className="text-xs font-bold text-slate-900">Strategic Canvas Copilot</div>
          <p className="text-[11px] text-slate-600">ปรับแต่ง UI แบบเรียลไทม์ และวิเคราะห์กลยุทธ์ธุรกิจเชิงลึก</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-sm space-y-2">
          <div className="text-sm font-black text-emerald-600">04. Claude Opus 5</div>
          <div className="text-xs font-bold text-slate-900">Master Coder &amp; Computer Use</div>
          <p className="text-[11px] text-slate-600">สั่งให้ AI มองหน้าจอ เลื่อนเมาส์ กรอกฟอร์มภาษีแทนคน</p>
        </div>
      </div>
    ),
    speakerNotes: "แนะนำชุดเครื่องมือทั้ง 4 ตัว และชี้ให้เห็นว่าทำไม Gemini 3.7 + Antigravity จึงเป็นขุมพลังหลักของคอร์ส Fast AI"
  },
  {
    id: 5,
    category: "CORE TOOL MASTERY",
    title: "Google Antigravity & Gemini 3.7: คำสั่งลับ Slash Commands",
    subtitle: "เปลี่ยนคำสั่งข้อความธรรมดา ให้กลายเป็นระบบอัตโนมัติระดับองค์กร",
    theme: "light",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2.5">
          <div className="text-xs font-bold text-brand-400">⚡ คำสั่งหลักที่ต้องใช้ประจำ:</div>
          <div className="space-y-1.5 text-xs text-slate-300">
            <p><code className="text-emerald-400 font-bold">/goal</code> — สั่ง Agent ทำงานลึกข้ามคืนจนเสร็จ 100%</p>
            <p><code className="text-emerald-400 font-bold">/schedule</code> — ตั้งเวลาให้บอทตื่นมารันงาน (Cron Job)</p>
            <p><code className="text-emerald-400 font-bold">/browser</code> — สั่งเปิดเบราว์เซอร์ไปส่องเว็บคู่แข่ง</p>
            <p><code className="text-emerald-400 font-bold">/grill-me</code> — ให้ AI สัมภาษณ์ตกผลึก Requirement</p>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2.5">
          <div className="text-xs font-bold text-slate-900">👥 ระบบทีมงานย่อย (Subagents):</div>
          <div className="space-y-2 text-xs text-slate-700">
            <p><strong>1. Research Agent:</strong> ส่องโค้ด อ่านคู่มือ วางแผนอย่างรัดกุม</p>
            <p><strong>2. Execution Agent:</strong> ลงมือสร้างไฟล์ เขียนระบบ รันและทดสอบ</p>
            <p><strong>3. Self-Healing:</strong> เมื่อเจอบั๊ก AI จะซ่อมตัวเองอัตโนมัติ</p>
          </div>
        </div>
      </div>
    ),
    speakerNotes: "สาธิตการพิมพ์คำสั่ง /goal และ /grill-me ให้นักเรียนดูสดในห้อง"
  },
  {
    id: 6,
    category: "SECOND BRAIN",
    title: "Google Gemini Notebook (NotebookLM): ศูนย์รวมสมองที่ 2",
    subtitle: "ระบบปัญญาประดิษฐ์ฐานข้อมูลความรู้ที่ไม่มีวันมั่ว 100% (Powered by Gemini 3.7)",
    theme: "light",
    content: (
      <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-amber-900">🧠 3 พลังวิเศษของ NotebookLM:</h4>
          <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded">Source-Grounded</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-amber-950">
          <div className="p-3 bg-white rounded-xl border border-amber-200">
            <strong>1. เอกสารไม่ออกนอกลู่นอกทาง:</strong> ตอบเฉพาะข้อมูลใน PDF/Docs ที่เราอัปโหลดเท่านั้น ชี้หน้าและบรรทัดที่มา
          </div>
          <div className="p-3 bg-white rounded-xl border border-amber-200">
            <strong>2. Audio Overview Studio:</strong> แปลงเอกสาร 50 หน้าเป็น Podcast เสียงคุยกัน 2 คน ฟังทบทวนขณะขับรถ
          </div>
          <div className="p-3 bg-white rounded-xl border border-amber-200">
            <strong>3. ป้อนต่อให้ Agent:</strong> สกัดบรีฟจาก NotebookLM ส่งต่อให้ Antigravity เขียนโค้ดได้เป๊ะ 100%
          </div>
        </div>
      </div>
    ),
    speakerNotes: "เปิดหน้า NotebookLM จริงและเปิดตัวอย่างเสียง Audio Overview ให้นักเรียนฟัง"
  },
  {
    id: 7,
    category: "SME WORKSHOP BLUEPRINTS",
    title: "5 พิมพ์เขียวโปรเจกต์จริง SME พลิกธุรกิจ",
    subtitle: "เลือกหยิบโปรเจกต์ที่ตรงกับจุดเจ็บปวดสูงสุดไปสร้างได้ใน 1 วัน (Default: Gemini 3.7 Flash)",
    theme: "light",
    content: (
      <div className="space-y-2 py-2">
        <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between text-xs">
          <span className="font-bold text-slate-900">1. 🛍️ บอทส่องราคาคู่แข่ง (Gemini 3.7 Flash) + LINE Notify</span>
          <span className="text-brand-600 font-bold">ประหยัด 20 ชม./สัปดาห์</span>
        </div>
        <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between text-xs">
          <span className="font-bold text-slate-900">2. 🤖 24/7 AI Sales Rep (Gemini 3.7 Flash API) + Sheets CRM</span>
          <span className="text-emerald-600 font-bold">กู้คืนยอดขายดึก +35%</span>
        </div>
        <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between text-xs">
          <span className="font-bold text-slate-900">3. 📦 Smart Inventory &amp; Reorder Point (React + Gemini 3.7)</span>
          <span className="text-amber-600 font-bold">ลดสินค้าจมสต็อก -25%</span>
        </div>
        <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between text-xs">
          <span className="font-bold text-slate-900">4. 📱 Multi-Platform Content Generator</span>
          <span className="text-purple-600 font-bold">30 โพสต์ใน 10 นาที</span>
        </div>
        <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between text-xs">
          <span className="font-bold text-slate-900">5. 📊 Executive Financial Dashboard</span>
          <span className="text-blue-600 font-bold">รู้กำไรขาดทุน Real-time</span>
        </div>
      </div>
    ),
    speakerNotes: "ให้ผู้เรียนเลือกโจทย์ของธุรกิจตัวเอง 1 ข้อ เพื่อทำเป็น Workshop ปฏิบัติการ"
  },
  {
    id: 8,
    category: "WOW FACTOR & PRODUCTION",
    title: "Computer Use, DeepSeek Local AI & Deploy 0 บาท",
    subtitle: "ปลดล็อกขีดจำกัดด้วยการสั่งงานข้ามอุปกรณ์และนำระบบขึ้นคลาวด์ฟรี",
    theme: "light",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        <div className="p-5 rounded-2xl bg-white border border-brand-200 shadow-sm space-y-2">
          <h4 className="text-sm font-bold text-brand-600">📱 Mobile Ops &amp; DeepSeek Local AI</h4>
          <p className="text-xs text-slate-600">
            • สั่งงานผ่าน GitHub Codespaces บน iPhone / Android<br/>
            • รัน DeepSeek-V4 แบบ Offline ในออฟฟิศ ข้อมูลลับไม่ออกนอกองค์กร (PDPA 100%)<br/>
            • ใช้เสียงพูดภาษาไทยบรีฟงานระหว่างเดินทาง
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-sm space-y-2">
          <h4 className="text-sm font-bold text-emerald-600">🚀 Deploy ขึ้น Vercel ใน 2 นาที</h4>
          <p className="text-xs text-slate-600">
            • Push โค้ดขึ้น GitHub -&gt; เชื่อม Vercel ฟรี 100%<br/>
            • ได้ลิงก์ https:// พร้อมแชร์ให้ลูกค้าใช้ได้ทั่วโลก<br/>
            • ปฏิบัติตาม PDPA 2562 ไม่ใส่ข้อมูลจริงลงใน Prompt
          </p>
        </div>
      </div>
    ),
    speakerNotes: "สรุปขั้นตอนการปล่อยเว็บสู่โลกจริง และย้ำเรื่องความปลอดภัยของข้อมูลลูกค้า (PDPA)"
  }
];

export function SlideDeckViewer() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(true);

  const currentSlide = slidesData[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < slidesData.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  const handleDownloadPptx = () => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
    const link = document.createElement('a');
    link.href = '/fast_ai_masterclass_presentation.pptx';
    link.download = 'Fast_AI_Masterclass_Presentation_2026.pptx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`space-y-6 max-w-5xl mx-auto pb-16 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-6 overflow-y-auto' : ''}`}>
      
      {/* Top Header & Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-400 border border-brand-200 dark:border-brand-500/30">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              สไลด์ PPT ประกอบการสอน (Fast AI Slide Deck)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              สไลด์พร้อมสอน 16:9 ตาม CI Fast AI (ขับเคลื่อนด้วย Gemini 3.7, ChatGPT 5.6 &amp; Claude Opus 5)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Download PPTX Button */}
          <button
            onClick={handleDownloadPptx}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-sm transition-all hover:scale-105"
          >
            <Download className="w-4 h-4" />
            <span>ดาวน์โหลดสไลด์ (.PPTX)</span>
          </button>

          {/* Toggle Speaker Notes */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              showNotes 
                ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/40' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
            title="เปิด/ปิด โน้ตผู้สอน"
          >
            <MessageSquare className="w-4 h-4 inline mr-1" />
            <span className="hidden sm:inline">โน้ตผู้สอน</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all"
            title={isFullscreen ? "ออกจากเต็มจอ" : "โหมดนำเสนอเต็มจอ"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Slide Canvas (16:9 Presentation Frame) */}
      <div className="relative aspect-[16/9] w-full rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-10 flex flex-col justify-between overflow-hidden">
        
        {/* Top Fast AI Red Strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-brand-600" />
        
        {/* Slide Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-red-600 dark:text-red-400">
              {currentSlide.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
              {currentSlide.title}
            </h3>
            <p className="text-xs sm:text-sm text-brand-700 dark:text-brand-300 font-medium">
              {currentSlide.subtitle}
            </p>
          </div>

          <div className="h-8 px-2 py-0.5 bg-white rounded-lg border border-slate-200 shadow-xs flex items-center justify-center flex-shrink-0">
            <img src="./fast-ai-logo.png" alt="Fast AI" className="h-5 w-auto object-contain" />
          </div>
        </div>

        {/* Slide Main Content */}
        <div className="my-auto">
          {currentSlide.content}
        </div>

        {/* Slide Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
          <span>Fast AI Mastery 2026 • AI Agent &amp; Vibe Coding</span>
          <span className="font-bold text-slate-700 dark:text-slate-300">
            สไลด์ {currentSlideIndex + 1} / {slidesData.length}
          </span>
        </div>
      </div>

      {/* Navigation Controls Bar */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <button
          onClick={handlePrev}
          disabled={currentSlideIndex === 0}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            currentSlideIndex === 0 
              ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-100 dark:bg-slate-800' 
              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>สไลด์ก่อนหน้า (←)</span>
        </button>

        {/* Slide Thumbnail Dots */}
        <div className="flex items-center gap-1.5">
          {slidesData.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentSlideIndex 
                  ? 'w-7 bg-red-600' 
                  : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
              }`}
              title={`ไปสไลด์ที่ ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentSlideIndex === slidesData.length - 1}
          className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            currentSlideIndex === slidesData.length - 1 
              ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-100 dark:bg-slate-800' 
              : 'bg-brand-600 hover:bg-brand-500 text-white shadow-sm'
          }`}
        >
          <span>สไลด์ถัดไป (→)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Speaker Coach Notes Box */}
      {showNotes && currentSlide.speakerNotes && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 space-y-1 text-xs text-amber-900 dark:text-amber-200">
          <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>โน้ตคำแนะนำสำหรับผู้สอน (Coach Speaker Notes):</span>
          </div>
          <p className="leading-relaxed">
            {currentSlide.speakerNotes}
          </p>
        </div>
      )}

    </div>
  );
}
