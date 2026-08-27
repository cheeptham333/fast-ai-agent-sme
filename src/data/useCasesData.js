export const smeProjects = [
  {
    id: 'project-1',
    title: 'บอทส่องราคาคู่แข่งอัตโนมัติ (Competitor Price Scraper) + LINE Notify',
    category: 'Sales & Marketing',
    roiText: 'ประหยัดเวลา 20 ชม./สัปดาห์ • ปรับราคาสู้ได้ทันที',
    impact: 'High Impact',
    badge: 'Quick Win 30 Min',
    difficulty: 'ง่าย (Beginner)',
    description: 'ระบบตั้งเวลาอัตโนมัติดึงราคาสินค้าจากร้านคู่แข่ง เปรียบเทียบส่วนต่างราคาของเรา แล้วส่งสรุปเป็นตารางแจ้งเตือนเข้ากลุ่ม LINE ผู้บริหารทุกเช้า',
    technologies: ['Node.js', 'Cheerio', 'Gemini 3.7 Flash', 'LINE Notify API', 'Cron Schedule'],
    promptToBuild: `/goal ช่วยสร้างระบบ Competitor Price Scraper สำหรับธุรกิจค้าปลีก/ค้าส่ง:
1. ดึงราคาสินค้าจาก URL คู่แข่ง 3 เว็บไซต์
2. เปรียบเทียบกับราคาสินค้าของร้านเรา คำนวณส่วนต่างเป็น บาท และ %
3. ส่งสรุปรายงานพร้อมแจ้งเตือนสถานะ (🔴 เราแพงกว่า / 🟢 เราถูกกว่า) เข้า LINE Notify
4. มีหน้าเว็บ Dashboard สำหรับผู้บริหารดูประวัติราคาย้อนหลัง สไตล์ Modern Light Mode`,
    codeSnippet: `// competitor_price_monitor.js
// Powered by Google Gemini 3.7 Flash Engine (Default for Fast AI)
// Option: You can also switch to 'claude-5-sonnet' or 'gpt-5.6'

import axios from 'axios';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-3.7-flash' });

const LINE_TOKEN = process.env.LINE_NOTIFY_TOKEN;
const TARGET_PRODUCTS = [
  { name: 'เซรั่มบำรุงผิวหน้า A', url: 'https://example.com/p1', myPrice: 890 },
  { name: 'วิตามินซี 1000mg B', url: 'https://example.com/p2', myPrice: 450 }
];

export async function runDailyPriceCheck() {
  let reportText = "\\n📊 รายงานราคาสินค้าคู่แข่งประจำวัน (Gemini 3.7 Flash):\\n";
  
  for (const item of TARGET_PRODUCTS) {
    try {
      const { data } = await axios.get(item.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      const $ = cheerio.load(data);
      const rawPrice = $('.price-tag, .current-price').text().replace(/[^0-9]/g, '');
      const competitorPrice = parseInt(rawPrice, 10) || 0;
      
      const diff = item.myPrice - competitorPrice;
      const status = diff > 0 
        ? \`🔴 เราแพงกว่า \${diff} บ. (แนะนำปรับลดด่วน)\` 
        : \`🟢 เราถูกกว่า \${Math.abs(diff)} บ.\`;
        
      reportText += \`\\n• \${item.name}\\n  ราคาคู่แข่ง: \${competitorPrice} บาท (\${status})\\n\`;
    } catch (err) {
      reportText += \`\\n• \${item.name}: ⚠️ ไม่สามารถดึงราคาได้\\n\`;
    }
  }

  // ส่งเข้า LINE Notify
  await axios.post('https://notify-api.line.me/api/notify', \`message=\${encodeURIComponent(reportText)}\`, {
    headers: {
      'Authorization': \`Bearer \${LINE_TOKEN}\`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  console.log("ส่งรายงานเข้า LINE เรียบร้อย!");
}

runDailyPriceCheck();`
  },
  {
    id: 'project-2',
    title: '24/7 AI Sales Rep & ปิดการขาย บันทึก Google Sheets CRM',
    category: 'Sales & Customer Care',
    roiText: 'กู้คืนยอดขายช่วงดึก +35% • ปิดการขายใน 2 วินาที',
    impact: 'Revenue Booster',
    badge: 'High ROI',
    difficulty: 'ปานกลาง (Intermediate)',
    description: 'พนักงานขายดิจิทัล AI ตอบแชทลูกค้าตลอด 24 ชั่วโมง ให้ข้อมูลสินค้า แนะนำโปรโมชั่น สรุปยอดเงินพร้อมเลขบัญชี และบันทึกข้อมูลชื่อ-ที่อยู่จัดส่งลง Google Sheets ทันที',
    technologies: ['Google Gemini 3.7 Flash', 'Google Sheets API', 'LINE Messaging API', 'Node.js'],
    promptToBuild: `/goal ช่วยสร้างระบบ AI Sales Rep 24 ชั่วโมง สำหรับร้านค้าออนไลน์:
1. เชื่อมต่อ Google Gemini 3.7 Flash ตอบคำถามสินค้า แนะนำเซ็ตโปรโมชั่นอย่างสุภาพ
2. เมื่อลูกค้าสั่งซื้อ ให้สรุปยอดและส่งเลขบัญชีธนาคาร
3. เมื่อลูกค้าส่งสลิปหรือที่อยู่ ให้สกัด JSON บันทึกเข้า Google Sheets CRM อัตโนมัติ
4. มีหน้าจอ Admin Dashboard ดูประวัติแชทและยอดขายรายวัน`,
    codeSnippet: `// sales_agent_engine.js
// Powered by Google Gemini 3.7 Flash Engine (Default)
// Alternative models: 'claude-5-sonnet' or 'gpt-5.6-sol'

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: 'gemini-3.7-flash',
  generationConfig: { temperature: 0.7, maxOutputTokens: 600 }
});

const SYSTEM_PROMPT = \`
คุณคือ "น้องฟ้า" ผู้ช่วยฝ่ายขายมืออาชีพของร้านสยามบิวตี้
บุคลิก: สุภาพ อ่อนหวาน ใช้หางเสียง "ค่ะ" จริงใจ ตอบคำถามกระชับ
กฎการขาย:
1. ตอบคำถามจากข้อมูลแคตตาล็อกสินค้าเท่านั้น (ห้ามเดาข้อมูล)
2. แนะนำเซ็ตโปรโมชั่นคู่เมื่อลูกค้าสนใจสินค้าเดี่ยว
3. เมื่อลูกค้าตกลงซื้อ ให้สรุปยอดเงินและแสดงเลขบัญชี ธนาคารกสิกรไทย 123-4-56789-0
4. เมื่อลูกค้าส่งที่อยู่ ให้ตอบรับและสกัดข้อมูล JSON สำหรับลงระบบ CRM
\`;

export async function handleCustomerMessage(userMsg, chatHistory, catalog) {
  const context = \`ข้อมูลสินค้าปัจจุบัน: \${JSON.stringify(catalog)}\`;
  const chat = model.startChat({
    history: [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT + "\\n" + context }] },
      { role: 'model', parts: [{ text: 'น้องฟ้ารับทราบและพร้อมให้บริการลูกค้าทุกท่านค่ะ' }] },
      ...chatHistory
    ]
  });

  const res = await chat.sendMessage(userMsg);
  return res.response.text();
}`
  },
  {
    id: 'project-3',
    title: 'ระบบบริหารสต็อกอัจฉริยะ (Smart Inventory) & แจ้งเตือน Reorder Point',
    category: 'Operations & Logistics',
    roiText: 'ลดสินค้าจมสต็อก -25% • ป้องกันสินค้าขาดช่วง 100%',
    impact: 'Cost Reduction',
    badge: 'Essential Tool',
    difficulty: 'ปานกลาง (Intermediate)',
    description: 'เว็บแอปบริหารสินค้าคงคลัง คำนวณ Safety Stock และ Reorder Point อัตโนมัติตามระยะเวลาสั่งซื้อ มีแถบเตือนสีแดงเมื่อสินค้าถึงจุดวิกฤต',
    technologies: ['React', 'Tailwind CSS', 'Gemini 3.7 Flash', 'LocalStorage / Supabase'],
    promptToBuild: `/goal ช่วยสร้าง Web Application บริหารสต็อกสินค้าสำหรับ SME:
1. บันทึก รับเข้า (IN) / ตัดออก (OUT) พร้อมประวัติการทำรายการ
2. คำนวณ Reorder Point และ Safety Stock อัตโนมัติ
3. แสดงการ์ดแจ้งเตือนสีแดงเมื่อสินค้าถึงจุดสั่งซื้อซ้ำ
4. ออกแบบ UI สไตล์ Modern Light Mode สะอาดตา รองรับเปิดบนมือถือ 100%`,
    codeSnippet: `// InventoryDashboard.jsx
import React, { useState } from 'react';

export function InventoryDashboard() {
  const [products, setProducts] = useState([
    { id: 1, sku: 'VIT-C-100', name: 'วิตามินซี 1000mg', stock: 12, minLevel: 20, leadDays: 5 },
    { id: 2, sku: 'HYA-SRM-50', name: 'เซรั่มไฮยาลูรอน', stock: 65, minLevel: 25, leadDays: 7 }
  ]);

  const handleStockAdjust = (id, amount) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, stock: Math.max(0, p.stock + amount) };
      }
      return p;
    }));
  };

  return (
    <div className="p-4 space-y-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="font-extrabold text-slate-900 text-base">📦 รายการสินค้าคงคลัง</h3>
      <div className="space-y-3">
        {products.map(item => {
          const isCritical = item.stock <= item.minLevel;
          return (
            <div key={item.id} className={\`p-4 rounded-xl border flex items-center justify-between \${isCritical ? 'bg-red-50 border-red-300' : 'bg-slate-50 border-slate-200'}\`}>
              <div>
                <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                <div className="text-xs text-slate-500">SKU: {item.sku} | ขั้นต่ำ: {item.minLevel} ชิ้น</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-lg font-black text-slate-900">{item.stock} ชิ้น</div>
                  {isCritical && <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded font-bold">⚠️ ต้องสั่งเพิ่ม</span>}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleStockAdjust(item.id, -1)} className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 rounded font-bold text-xs">-</button>
                  <button onClick={() => handleStockAdjust(item.id, 1)} className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold text-xs">+</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}`
  },
  {
    id: 'project-4',
    title: 'ระบบสร้างคอนเทนต์ Multi-Platform (TikTok, FB, IG Banner)',
    category: 'Marketing & Creative',
    roiText: 'ผลิต 30 คอนเทนต์ใน 10 นาที • ประหยัดค่าจ้าง 2.5 หมื่น/เดือน',
    impact: '10x Productivity',
    badge: 'Marketing Win',
    difficulty: 'ง่าย (Beginner)',
    description: 'พิมพ์หัวข้อสินค้าหรือโปรโมชั่นเพียง 1 ประโยค AI จะสร้างสคริปต์ TikTok 30 วินาทีพร้อม Hook, แคปชั่น Facebook ยิงแอด, และเรนเดอร์ภาพแบนเนอร์กราฟิกพร้อมโพสต์ทันที',
    technologies: ['Gemini 3.7 Flash', 'ChatGPT 5.6 Canvas', 'HTML Canvas Graphics', 'Tailwind CSS'],
    promptToBuild: `/goal ช่วยสร้าง Multi-Platform Content Generator สำหรับธุรกิจ SME:
1. มีฟอร์มกรอกชื่อสินค้า, จุดเด่น, กลุ่มเป้าหมาย, และโปรโมชั่น
2. ใช้ AI สร้าง: สคริปต์ TikTok 30 วิ (มี Hook 3 วิแรก), แคปชั่น Facebook โพสต์ขาย, และข้อความแบนเนอร์
3. มีปุ่มกด Generate ภาพแบนเนอร์กราฟิกสวยงามด้วย HTML Canvas ดาวน์โหลดเป็นไฟล์ .PNG ได้ทันที`,
    codeSnippet: `// content_engine.js
// Powered by Gemini 3.7 Flash Multimodal AI
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-3.7-flash' });

export async function generateMarketingPack(productName, audience, promotion) {
  const prompt = \`
คุณคือ Creative Director มือรางวัล
สร้างชุดคอนเทนต์การตลาดสำหรับ: \${productName}
กลุ่มเป้าหมาย: \${audience}
โปรโมชั่น: \${promotion}

กรุณาตอบเป็น JSON:
{
  "tiktok_script": { "hook_3s": "", "body": "", "cta": "" },
  "facebook_ad": { "headline": "", "caption": "", "hashtags": [] },
  "banner_text": { "title": "", "subtitle": "", "badge": "" }
}
\`;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}`
  },
  {
    id: 'project-5',
    title: 'Executive Financial & Cashflow Dashboard (ระบบวิเคราะห์การเงินผู้บริหาร)',
    category: 'Finance & Executive',
    roiText: 'รู้กำไร-ขาดทุนแบบ Real-time • ลดการรั่วไหลทางการเงิน',
    impact: 'Executive Control',
    badge: 'CEO Level',
    difficulty: 'ขั้นสูง (Advanced)',
    description: 'Dashboard สรุปรายรับ ต้นทุนขาย (COGS) กำไรสุทธิ และกระแสเงินสด พร้อมมี AI CFO วิเคราะห์จุดที่เงินรั่วไหลและแนะนำวิธีเพิ่มกำไรแบบ Real-time',
    technologies: ['React', 'Recharts', 'Google Gemini 3.7 / Claude Opus 5', 'Google Sheets Sync'],
    promptToBuild: `/goal ช่วยสร้าง Executive Financial Dashboard สำหรับเจ้าของธุรกิจ:
1. เชื่อมต่อข้อมูลรายรับ-รายจ่าย แสดงกราฟแท่งเปรียบเทียบรายเดือนด้วย Recharts
2. มีกล่องสรุป KPI การเงิน: รายรับรวม, ต้นทุนขาย, กำไรสุทธิ (Net Margin %)
3. มีกล่อง 'AI CFO Insights' วิเคราะห์ตัวเลขและแนะนำวิธีลดค่าใช้จ่าย 3 ข้อ
4. ดีไซน์สไตล์ Executive White/Slate เรียบหรู ใช้งานง่ายบน iPad`,
    codeSnippet: `// FinancialExecutiveDashboard.jsx
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export function FinancialExecutiveDashboard({ data, aiAdvice }) {
  return (
    <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-md space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="text-xs text-slate-500 font-semibold">รายรับรวม (Revenue)</div>
          <div className="text-2xl font-black text-blue-600">฿1,850,000</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="text-xs text-slate-500 font-semibold">ต้นทุนรวม (COGS + Opex)</div>
          <div className="text-2xl font-black text-red-600">฿980,000</div>
        </div>
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
          <div className="text-xs text-emerald-700 font-bold">กำไรสุทธิ (Net Profit)</div>
          <div className="text-2xl font-black text-emerald-700">฿870,000 (47.0%)</div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" name="รายรับ" fill="#0284c7" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expense" name="รายจ่าย" fill="#dc2626" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 bg-blue-50/80 border-l-4 border-blue-600 rounded-xl text-xs text-slate-800 space-y-1">
        <div className="font-bold text-blue-900">💡 คำแนะนำจาก AI CFO (Powered by Gemini 3.7):</div>
        <p className="leading-relaxed">{aiAdvice || "ต้นทุนค่าโฆษณาลดลง 12% ขณะที่ยอดขายเติบโต แนะนำเพิ่มงบในสินค้าเซ็ตขายดีเพื่อขยายกำไรสุทธิในเดือนหน้า"}</p>
      </div>
    </div>
  );
}`
  }
];

export const smeUseCases = smeProjects;
