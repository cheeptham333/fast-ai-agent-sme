import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Sliders, 
  Zap
} from 'lucide-react';
import { promptLibrary } from '../data/promptLibrary';

const industries = [
  "ร้านอาหาร & คาเฟ่",
  "คลินิกความงาม & สุขภาพ",
  "ค้าส่ง & ตัวแทนจำหน่าย (B2B)",
  "ร้านค้าออนไลน์ E-Commerce",
  "โรงงานผลิต & อุตสาหกรรม",
  "ธุรกิจบริการ & งานช่าง",
  "อสังหาริมทรัพย์ & นายหน้า"
];

const goals = [
  { id: "sales_bot", label: "สร้างแชทบอทปิดการขาย 24 ชม." },
  { id: "landing_page", label: "สร้างหน้าเว็บ Landing Page ปิดการขาย" },
  { id: "stock_system", label: "สร้างระบบจัดการสต็อกและแจ้งเตือน LINE" },
  { id: "content_gen", label: "สร้างระบบคิดคอนเทนต์และสคริปต์ TikTok" },
  { id: "finance_dash", label: "สร้าง Dashboard วิเคราะห์กำไร-ขาดทุน" },
  { id: "custom_scraping", label: "สร้างบอทส่องราคาคู่แข่งอัตโนมัติ" }
];

export function PromptGenerator() {
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);
  const [selectedGoal, setSelectedGoal] = useState(goals[0].id);
  const [companyName, setCompanyName] = useState("");
  const [painPoint, setPainPoint] = useState("");
  const [extraFeatures, setExtraFeatures] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePrompt = () => {
    const biz = companyName.trim() || `ธุรกิจ ${selectedIndustry}`;
    const pain = painPoint.trim() || "ตอบลูกค้าไม่ทัน เสียโอกาสปิดการขาย";
    const extra = extraFeatures.trim() || "รองรับมือถือ 100% สไตล์โมเดิร์น";

    if (selectedGoal === "sales_bot") {
      return `/goal ช่วยสร้างระบบ AI Sales Rep & Customer Support สำหรับ ${biz}:
1. บริบทธุรกิจ: ${biz} (กลุ่ม ${selectedIndustry})
2. ปัญหาปัจจุบันที่ต้องแก้: ${pain}
3. ฟังก์ชันที่ต้องการ:
   - ตอบคำถามสินค้าและแนะนำโปรโมชั่นด้วยน้ำเสียงสุภาพเป็นมิตร
   - สรุปยอดเงินและแสดงเลขบัญชีเมื่อลูกค้าตกลงซื้อ
   - สกัดชื่อ ที่อยู่ เบอร์โทร ยิงบันทึกลง Google Sheets CRM ทันที
4. เงื่อนไขพิเศษ: ${extra}
5. สถาปัตยกรรม: Node.js + Google Gemini API + LINE Webhook หรือ Web Chat Interface สวยงาม`;
    }

    if (selectedGoal === "landing_page") {
      return `ช่วยสร้าง Single Page Landing Page สำหรับ ${biz}:
1. วัตถุประสงค์: ดึงดูดลูกค้าและเก็บ Lead นัดหมาย
2. จุดเด่นที่ต้องการชู: แก้ปัญหา ${pain}
3. โครงสร้างหน้าเว็บ:
   - Hero Section: พาดหัว Hook ดึงดูด, ปุ่ม CTA 'ทักแชทรับส่วนลด'
   - ปัญหาและทางแก้ไข: อธิบาย 3 ข้อดีที่ลูกค้าจะได้รับ
   - ตารางราคา/แพ็กเกจ และรีวิวลูกค้าตัวจริง 5 ดาว
   - ฟอร์มกรอกชื่อ-เบอร์โทรที่บันทึกข้อมูลได้จริง
4. การออกแบบ: สไตล์ Executive Modern โทนสีพรีเมียม รองรับ Responsive บนสมาร์ทโฟน 100%
5. เงื่อนไขเพิ่มเติม: ${extra}`;
    }

    if (selectedGoal === "stock_system") {
      return `/goal ช่วยสร้างระบบบริหารสต็อกสินค้า Smart Inventory สำหรับ ${biz}:
1. ปัญหาที่ต้องการแก้: ${pain}
2. ฟังก์ชันหลัก:
   - บันทึก รับเข้า (Stock In) / เบิกจ่าย (Stock Out) ใช้งานง่ายบนมือถือ
   - คำนวณจุด Reorder Point อัตโนมัติ และแสดงแถบสีแดงเมื่อสต็อกเหลือน้อย
   - Dashboard แสดงมูลค่าสต็อกรวม และรายการสินค้าขายดี
   - มีปุ่ม Export Excel และแจ้งเตือนผ่าน LINE Notify
3. เงื่อนไขพิเศษ: ${extra}`;
    }

    if (selectedGoal === "content_gen") {
      return `คุณคือ Senior Creative & Copywriter ช่วยสร้างชุดคอนเทนต์ 1 สัปดาห์สำหรับ ${biz}:
1. กลุ่มเป้าหมาย: ลูกค้าของธุรกิจ ${selectedIndustry}
2. ปัญหาของลูกค้า: ${pain}
3. สิ่งที่ต้องการผลิต (3 รูปแบบ):
   - สคริปต์วิดีโอสั้น TikTok/Reels 30 วินาที พร้อม Hook 3 วิแรก
   - แคปชั่น Facebook โพสต์ขายแบบไม่ยัดเยียด พร้อมแฮชแท็ก
   - หัวข้อบทความสร้างความน่าเชื่อถือ (Authority Content)
4. โทนเสียง: จริงใจ สนุก เข้าถึงง่าย และตบท้ายด้วยโปรโมชั่นพิเศษ: ${extra}`;
    }

    if (selectedGoal === "finance_dash") {
      return `/goal ช่วยพัฒนา Executive Financial & Profit Dashboard สำหรับเจ้าของธุรกิจ ${biz}:
1. วัตถุประสงค์: รวมศูนย์ดูยอดขาย กำไรสุทธิ และกระแสเงินสด Real-time
2. ปัญหาที่พบ: ${pain}
3. ฟังก์ชันที่ต้องการ:
   - กราฟแท่งเปรียบเทียบรายได้ vs ค่าใช้จ่ายรายเดือน
   - กราฟวงกลม สัดส่วนยอดขายตามช่องทาง
   - กล่องสรุป AI Executive Summary แนะนำจุดควรปรับปรุงต้นทุน
4. เงื่อนไขพิเศษ: ${extra}`;
    }

    return `/goal ช่วยสร้างระบบส่องและเปรียบเทียบราคาสินค้าคู่แข่งอัตโนมัติ สำหรับ ${biz}:
1. เป้าหมาย: ดึงราคาจากเว็บเป้าหมายมาเปรียบเทียบกับราคาเราทุกเช้า
2. ปัญหา: ${pain}
3. ผลลัพธ์: ส่งรายงานสรุปส่วนต่างราคาเข้ากลุ่ม LINE Notify พร้อมคำแนะนำการตั้งราคา
4. เงื่อนไขพิเศษ: ${extra}`;
  };

  const currentPrompt = generatePrompt();

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(currentPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      
      {/* Tool Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-500/30 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">AI Business Prompt Builder</h1>
            <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300">ตัวช่วยร่างคำสั่ง Prompt ระดับโปรสำหรับ Google Antigravity & ChatGPT Codex</p>
          </div>
        </div>
      </div>

      {/* Generator Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Form Settings */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>ตั้งค่าโจทย์ธุรกิจของคุณ</span>
          </h3>

          {/* Industry Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              1. เลือกประเภทธุรกิจ (Industry)
            </label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 focus:border-brand-500 focus:outline-none"
            >
              {industries.map((ind, i) => (
                <option key={i} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          {/* Goal Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              2. สิ่งที่ต้องการให้ AI สร้าง (Goal)
            </label>
            <select
              value={selectedGoal}
              onChange={(e) => setSelectedGoal(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 focus:border-brand-500 focus:outline-none"
            >
              {goals.map((g) => (
                <option key={g.id} value={g.id}>{g.label}</option>
              ))}
            </select>
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              3. ชื่อแบรนด์ / บริษัทของคุณ (Optional)
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="เช่น ร้านกาแฟ Coffee Craft หรือ สยามค้าส่ง"
              className="w-full bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 focus:border-brand-500 focus:outline-none placeholder-slate-400"
            />
          </div>

          {/* Pain Point */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              4. ปัญหาหรือจุดที่ต้องการแก้ไข
            </label>
            <input
              type="text"
              value={painPoint}
              onChange={(e) => setPainPoint(e.target.value)}
              placeholder="เช่น ตอบแชทดึกไม่ทัน, สินค้าในสต็อกหายบ่อย"
              className="w-full bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 focus:border-brand-500 focus:outline-none placeholder-slate-400"
            />
          </div>

          {/* Extra Details */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              5. เงื่อนไขพิเศษ / ฟังก์ชันที่อยากได้เพิ่ม
            </label>
            <input
              type="text"
              value={extraFeatures}
              onChange={(e) => setExtraFeatures(e.target.value)}
              placeholder="เช่น ขอสไตล์หรูหราสีทอง, มีปุ่มส่งแจ้งเตือน LINE"
              className="w-full bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 focus:border-brand-500 focus:outline-none placeholder-slate-400"
            />
          </div>
        </div>

        {/* Right Column: Generated Prompt Preview */}
        <div className="p-6 rounded-3xl bg-slate-900 dark:bg-slate-950 border border-slate-800 dark:border-purple-500/30 flex flex-col justify-between shadow-lg text-slate-100">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-slate-200">ผลลัพธ์ Prompt พร้อมสั่งงาน</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Ready to Deploy
              </span>
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
              {currentPrompt}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              💡 นำไปวางใน Antigravity หรือ ChatGPT ได้ทันที
            </span>
            <button
              onClick={handleCopyPrompt}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-brand-500 hover:from-purple-500 hover:to-brand-400 text-white shadow-md transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'คัดลอกสำเร็จ!' : '1-Click Copy'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Preset Library Quick Picks */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400">
          🔥 คลัง Prompt สำเร็จรูปแยกตามแผนกงาน
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {promptLibrary.map((cat, cIdx) => (
            <div key={cIdx} className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm pb-2 border-b border-slate-200 dark:border-slate-800">
                {cat.category}
              </h4>
              <div className="space-y-2">
                {cat.items.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => {
                      navigator.clipboard.writeText(item.prompt);
                      alert(`คัดลอก Prompt "${item.title}" เรียบร้อยแล้ว!`);
                    }}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 hover:bg-brand-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800/80 cursor-pointer transition-all group"
                  >
                    <div className="text-xs font-bold text-slate-900 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-300">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 truncate">
                      {item.purpose}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
