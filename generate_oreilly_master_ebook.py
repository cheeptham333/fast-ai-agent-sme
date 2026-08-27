import os
import subprocess

html_path = "/Users/tri333/Documents/Ebook AI Agent FastAI/oreilly_master_handbook.html"
pdf_output = "/Users/tri333/Documents/Ebook AI Agent FastAI/public/fast-ai-handbook-sme-2026.pdf"

html_content = """<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<title>Fast AI: AI Agent & Vibe Coding Master Handbook สำหรับ SME (45 Pages Master Edition)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Prompt:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
<style>
  @page {
    size: A4 portrait;
    margin: 20mm 15mm 20mm 15mm;
    @bottom-right {
      content: counter(page);
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 8.5pt;
      font-weight: 600;
      color: #64748b;
    }
    @top-right {
      content: "Fast AI: AI Agent & Vibe Coding for SME";
      font-family: 'Prompt', sans-serif;
      font-size: 7.5pt;
      color: #94a3b8;
    }
  }

  @page:first {
    margin: 0;
    @bottom-right { content: none; }
    @top-right { content: none; }
  }

  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body {
    font-family: 'Prompt', 'Plus Jakarta Sans', sans-serif;
    color: #1e293b;
    background-color: #ffffff;
    line-height: 1.68;
    font-size: 9.5pt;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5 {
    font-family: 'Prompt', 'Plus Jakarta Sans', sans-serif;
    color: #0f172a;
    font-weight: 700;
    margin-top: 1.3em;
    margin-bottom: 0.4em;
    page-break-after: avoid;
  }

  h1 { 
    font-size: 18pt; 
    border-bottom: 2px solid #dc2626; 
    padding-bottom: 6px; 
    color: #0b1b3d; 
    margin-top: 0.2em;
  }

  h2 { 
    font-size: 13pt; 
    color: #0284c7; 
    border-left: 4px solid #0284c7; 
    padding-left: 8px; 
    margin-top: 1.2em; 
  }

  h3 { 
    font-size: 10.5pt; 
    color: #0f172a; 
    font-weight: 600; 
  }

  p, li {
    font-size: 9.2pt;
    color: #334155;
    text-align: justify;
    margin-bottom: 0.6em;
  }

  ul, ol {
    margin: 0.4em 0 0.8em 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 4px;
  }

  .page-break {
    page-break-before: always;
  }

  .avoid-break {
    page-break-inside: avoid;
  }

  /* O'REILLY STYLE COVER */
  .oreilly-cover {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 4px solid #0b1b3d;
    padding: 35px;
    background: #ffffff;
    position: relative;
    box-sizing: border-box;
  }

  .oreilly-top-bar {
    border-bottom: 6px solid #dc2626;
    padding-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .oreilly-logo {
    height: 50px;
  }

  .oreilly-series {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 12pt;
    font-weight: 800;
    letter-spacing: 2.5px;
    color: #0b1b3d;
    text-transform: uppercase;
  }

  .oreilly-illustration-box {
    margin: 25px auto;
    width: 270px;
    height: 270px;
    border: 2px solid #cbd5e1;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
    padding: 20px;
    text-align: center;
  }

  .oreilly-woodcut-icon {
    font-size: 70pt;
    margin-bottom: 12px;
  }

  .oreilly-title-block {
    margin-top: 10px;
    border-top: 2px solid #0b1b3d;
    padding-top: 20px;
  }

  .oreilly-main-title {
    font-size: 28pt;
    font-weight: 800;
    color: #0b1b3d;
    line-height: 1.15;
    margin: 0;
  }

  .oreilly-subtitle {
    font-size: 13.5pt;
    color: #dc2626;
    font-weight: 600;
    margin-top: 10px;
    line-height: 1.4;
  }

  .oreilly-author {
    margin-top: 25px;
    font-size: 11pt;
    font-weight: 600;
    color: #475569;
  }

  /* CALLOUT BOXES */
  .callout {
    margin: 12px 0;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 8.8pt;
    page-break-inside: avoid;
  }

  .callout-tip {
    background-color: #f0fdf4;
    border-left: 4px solid #16a34a;
    color: #166534;
  }

  .callout-warning {
    background-color: #fef2f2;
    border-left: 4px solid #dc2626;
    color: #991b1b;
  }

  .callout-info {
    background-color: #f0f9ff;
    border-left: 4px solid #0284c7;
    color: #075985;
  }

  .callout-title {
    font-weight: 700;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  /* CODE BLOCKS */
  pre {
    background: #0b1329;
    color: #f8fafc;
    font-family: 'JetBrains Mono', monospace;
    font-size: 8pt;
    padding: 12px 14px;
    border-radius: 8px;
    overflow-x: auto;
    white-space: pre-wrap;
    line-height: 1.5;
    margin: 10px 0;
    border: 1px solid #1e293b;
    page-break-inside: avoid;
  }

  code {
    font-family: 'JetBrains Mono', monospace;
    background: #f1f5f9;
    color: #0f172a;
    padding: 2px 5px;
    border-radius: 4px;
    font-size: 8.5pt;
    border: 1px solid #e2e8f0;
  }

  /* TABLES */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0;
    font-size: 8.5pt;
    page-break-inside: avoid;
  }

  th {
    background-color: #0b1b3d;
    color: #ffffff;
    font-weight: 600;
    text-align: left;
    padding: 8px 10px;
    border: 1px solid #0b1b3d;
  }

  td {
    padding: 7px 10px;
    border: 1px solid #e2e8f0;
    color: #334155;
  }

  tr:nth-child(even) td {
    background-color: #f8fafc;
  }

  /* TOC */
  .toc-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    border-bottom: 1px dotted #cbd5e1;
    padding-bottom: 3px;
    font-size: 9pt;
  }
  .toc-title { font-weight: 600; color: #0b1b3d; }
  .toc-page { font-weight: 700; color: #dc2626; }

  .header-tag {
    font-size: 8pt;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #dc2626;
    font-weight: 800;
    margin-bottom: 2px;
  }

  .part-cover {
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: #f8fafc;
    border: 2px dashed #cbd5e1;
    border-radius: 16px;
    padding: 40px;
  }
  .part-number {
    font-size: 16pt;
    font-weight: 800;
    color: #dc2626;
    letter-spacing: 3px;
    text-transform: uppercase;
  }
  .part-title {
    font-size: 26pt;
    font-weight: 800;
    color: #0b1b3d;
    margin-top: 10px;
    line-height: 1.2;
  }
  .part-desc {
    font-size: 11pt;
    color: #64748b;
    max-width: 500px;
    margin-top: 15px;
  }
</style>
</head>
<body>

<!-- ==================== COVER PAGE (Page 1) ==================== -->
<div class="oreilly-cover">
  <div class="oreilly-top-bar">
    <div class="oreilly-series">O'REILLY & FAST AI CO-SERIES</div>
    <img src="file:///Users/tri333/Documents/Ebook AI Agent FastAI/public/fast-ai-logo.png" alt="Fast AI" class="oreilly-logo">
  </div>

  <div class="oreilly-illustration-box">
    <div class="oreilly-woodcut-icon">🦅⚡</div>
    <div style="font-size: 12pt; font-weight: 800; color: #0b1b3d; margin-top: 5px;">The Agile Autonomous Falcon</div>
    <div style="font-size: 8.5pt; color: #64748b; margin-top: 4px;">สัญลักษณ์แห่งความเร็ว ความฉลาด และความแม่นยำในการสร้างระบบธุรกิจ</div>
  </div>

  <div class="oreilly-title-block">
    <h1 class="oreilly-main-title">AI Agent & Vibe Coding<br>for SME Master Handbook</h1>
    <div class="oreilly-subtitle">ขับเคลื่อนด้วย Google Gemini 3.7, Antigravity, ChatGPT 5.6 Sol & Claude Opus 5</div>
    <div class="oreilly-author">
      โดย <strong>ทีมวิชาการและโค้ชชิ่ง Fast AI Thailand</strong><br>
      <span style="font-size: 8.5pt; color: #64748b;">คู่มือฉบับสมบูรณ์สำหรับผู้ประกอบการ SME และผู้บริหาร (Non-Programmers) • Master Reference Edition 2026 (45 Pages)</span>
    </div>
  </div>
</div>

<!-- ==================== COLOPHON / COPYRIGHT (Page 2) ==================== -->
<div class="page-break"></div>
<div class="header-tag">PUBLISHING INFORMATION & COLOPHON</div>
<h1>ข้อมูลลิขสิทธิ์และแนวทางความปลอดภัย</h1>

<div style="margin-top: 20px; font-size: 9pt; color: #475569; space-y-3">
  <p><strong>Fast AI: AI Agent & Vibe Coding for SME Master Handbook (ฉบับพิมพ์ครั้งที่ 1)</strong><br>
  จัดทำและเรียบเรียงโดย: ทีมวิชาการ Fast AI Thailand<br>
  เผยแพร่: สิงหาคม 2569 (2026) ณ กรุงเทพมหานคร ประเทศไทย</p>

  <p><strong>ข้อสงวนสิทธิ์และความรับผิดชอบ (Disclaimer):</strong><br>
  คู่มือเล่มนี้จัดทำขึ้นเพื่อการศึกษาและการพัฒนาศักยภาพผู้ประกอบการ SME ไทย ข้อมูล ราคาแพ็กเกจ และคำสั่งซอฟต์แวร์ AI ได้รับการตรวจสอบ ณ ไตรมาส 3 ปี 2569 ผู้ใช้ควรตรวจสอบเงื่อนไขและราคาล่าสุดจากผู้ให้บริการแต่ละรายก่อนนำไปใช้งานในเชิงพาณิชย์</p>

  <p><strong>มาตรฐานความปลอดภัยข้อมูลและกฎหมาย PDPA (พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562):</strong><br>
  ผู้เขียนและ Fast AI ขอเน้นย้ำกฎเหล็กสำคัญ: <em>"ห้ามนำข้อมูลส่วนบุคคลของลูกค้าจริง ความลับทางการค้า รหัสผ่าน หรือ API Key ใส่ลงในคำสั่ง Prompt โดยเด็ดขาด"</em> ในการทดสอบระบบให้ใช้ข้อมูลจำลอง (Mock Data) เสมอ</p>

  <div class="callout callout-info" style="margin-top: 25px;">
    <div class="callout-title">🌐 ช่องทางการเข้าถึงคลังความรู้และการอัปเดต (Course Hubs)</div>
    • <strong>หลักสูตรปูพื้นฐานครั้งที่แล้ว (AI MBA Handbook & Prompt Lab):</strong> <a href="https://cheeptham333.github.io/ai-mba-handbook/" style="color: #0284c7; text-decoration: underline;">https://cheeptham333.github.io/ai-mba-handbook/</a> (22 บทเรียน MBA บริหารธุรกิจระดับโลก ผสาน Harvard, Wharton, Stanford, MIT โดย ชีพธรรม คำวิเศษณ์)<br>
    • <strong>เว็บไซต์ระบบเรียนรู้ Fast AI Interactive Portal:</strong> <strong>http://localhost:3000</strong><br>
    • <strong>คลังความรู้ Google NotebookLM ประจำคอร์ส:</strong> <a href="https://notebook.google.com/notebook/be661c24-57d5-4208-ba66-73e9aff3cca8" style="color: #0284c7; text-decoration: underline;">https://notebook.google.com/notebook/be661c24-57d5-4208-ba66-73e9aff3cca8</a><br>
    • <strong>แหล่งดาวน์โหลดสไลด์และเทมเพลตซอร์สโค้ด:</strong> Fast AI Student Vault
  </div>
</div>

<!-- ==================== TABLE OF CONTENTS (Pages 3-4) ==================== -->
<div class="page-break"></div>
<div class="header-tag">TABLE OF CONTENTS</div>
<h1>สารบัญเล่มคู่มือฉบับสมบูรณ์ (Master Table of Contents)</h1>

<div style="margin-top: 15px;">
  <div style="font-weight: 800; color: #dc2626; margin-top: 10px; margin-bottom: 5px; font-size: 9.5pt;">PART I: THE STRATEGIC AI LANDSCAPE & MINDSET</div>
  <div class="toc-item"><span class="toc-title">บทที่ 1: การปฏิวัติ AI ในภาคธุรกิจ SME ไทย 2026 และต้นทุนของการไม่ปรับตัว</span><span class="toc-page">หน้า 5</span></div>
  <div class="toc-item"><span class="toc-title">บทที่ 2: ปรัชญา Vibe Coding & กฎทอง 80/20 ฉบับเจ้าของกิจการ</span><span class="toc-page">หน้า 7</span></div>
  <div class="toc-item"><span class="toc-title">บทที่ 3: The Frontier AI Stack: Gemini 3.7, ChatGPT 5.6 Sol, Claude Opus 5</span><span class="toc-page">หน้า 9</span></div>

  <div style="font-weight: 800; color: #dc2626; margin-top: 15px; margin-bottom: 5px; font-size: 9.5pt;">PART II: CORE AGENTIC ENGINES (ANTIGRAVITY & NOTEBOOKLM)</div>
  <div class="toc-item"><span class="toc-title">บทที่ 4: เจาะลึก Google Antigravity 2.0 & ขุมพลัง Gemini 3.7 Flash</span><span class="toc-page">หน้า 11</span></div>
  <div class="toc-item"><span class="toc-title">บทที่ 5: คัมภีร์ Slash Commands: /goal, /schedule, /browser, /grill-me, /learn</span><span class="toc-page">หน้า 14</span></div>
  <div class="toc-item"><span class="toc-title">บทที่ 6: Google Gemini Notebook (NotebookLM) ศูนย์รวมสมองที่ 2 ปลอดข้อมูลมั่ว 100%</span><span class="toc-page">หน้า 17</span></div>
  <div class="toc-item"><span class="toc-title">บทที่ 7: ChatGPT 5.6 Canvas & Claude Opus 5 Computer Use ปรับแก้ UI แบบเรียลไทม์</span><span class="toc-page">หน้า 20</span></div>

  <div style="font-weight: 800; color: #dc2626; margin-top: 15px; margin-bottom: 5px; font-size: 9.5pt;">PART III: 5 SME TURNKEY PROJECT BLUEPRINTS (WITH SOURCE CODE)</div>
  <div class="toc-item"><span class="toc-title">บทที่ 8: พิมพ์เขียว 1 — บอทส่องราคาคู่แข่ง (Gemini 3.7 Flash) & LINE Notify Alert</span><span class="toc-page">หน้า 22</span></div>
  <div class="toc-item"><span class="toc-title">บทที่ 9: พิมพ์เขียว 2 — 24/7 AI Sales Rep (Gemini 3.7 API) บันทึก Google Sheets CRM</span><span class="toc-page">หน้า 26</span></div>
  <div class="toc-item"><span class="toc-title">บทที่ 10: พิมพ์เขียว 3 — Smart Inventory Dashboard & ตัดสต็อกแจ้งเตือน Reorder Point</span><span class="toc-page">หน้า 29</span></div>
  <div class="toc-item"><span class="toc-title">บทที่ 11: พิมพ์เขียว 4 — Multi-Platform Content Generator (TikTok, FB, IG Banner)</span><span class="toc-page">หน้า 32</span></div>
  <div class="toc-item"><span class="toc-title">บทที่ 12: พิมพ์เขียว 5 — Executive Financial & Cashflow Forecast Dashboard</span><span class="toc-page">หน้า 35</span></div>

  <div style="font-weight: 800; color: #dc2626; margin-top: 15px; margin-bottom: 5px; font-size: 9.5pt;">PART IV: EDGE TECHNIQUES & ADVANCED AUTONOMOUS HACKS</div>
  <div class="toc-item"><span class="toc-title">บทที่ 13: Computer Use in Action (Claude Opus 5): สั่ง AI ขยับเมาส์ กรอกภาษี โหลดสลิป</span><span class="toc-page">หน้า 38</span></div>
  <div class="toc-item"><span class="toc-title">บทที่ 14: Mobile Coding & Remote Agent Ops: ควบคุมการเขียนระบบผ่านมือถือ 100%</span><span class="toc-page">หน้า 40</span></div>
  <div class="toc-item"><span class="toc-title">บทที่ 15: Self-Healing Code & DeepSeek-V4 Local AI รันงานข้ามคืนจนเสร็จ</span><span class="toc-page">หน้า 42</span></div>

  <div style="font-weight: 800; color: #dc2626; margin-top: 15px; margin-bottom: 5px; font-size: 9.5pt;">PART V: DEPLOYMENT, PLUGINS & SECURITY</div>
  <div class="toc-item"><span class="toc-title">บทที่ 16: ทำเนียบ Plugins, Custom Skills & การสร้าง SKILL.md ประจำบริษัท</span><span class="toc-page">หน้า 44</span></div>
  <div class="toc-item"><span class="toc-title">บทที่ 17: ขั้นตอน Deploy ขึ้น Vercel ใน 2 นาที & กฎหมายคุ้มครองข้อมูล PDPA 2562</span><span class="toc-page">หน้า 46</span></div>
  <div class="toc-item"><span class="toc-title">บทที่ 18: การบริหารโควตาฟรี 0 บาท (Free Tier Quota Optimization) ตลอดชีพ</span><span class="toc-page">หน้า 48</span></div>

  <div style="font-weight: 800; color: #dc2626; margin-top: 15px; margin-bottom: 5px; font-size: 9.5pt;">PART VI: FIELD APPENDICES & ROADMAP</div>
  <div class="toc-item"><span class="toc-title">ภาคผนวก A: CLEAR Prompt Framework & คลังคำสั่ง 30+ ชุดแยกตามแผนก</span><span class="toc-page">หน้า 50</span></div>
  <div class="toc-item"><span class="toc-title">ภาคผนวก B: คำศัพท์เทคนิค AI สำหรับผู้บริหาร (Executive AI Glossary)</span><span class="toc-page">หน้า 53</span></div>
  <div class="toc-item"><span class="toc-title">ภาคผนวก C: คัมภีร์แก้ Error ยอดฮิต 20 อาการสำหรับผู้ประกอบการ (Troubleshooting)</span><span class="toc-page">หน้า 55</span></div>
  <div class="toc-item"><span class="toc-title">ภาคผนวก D: แผนปฏิบัติการ 30 วัน (30-Day SME Action Plan) สำหรับนำไปใช้จริง</span><span class="toc-page">หน้า 57</span></div>
</div>

<!-- ==================== PART I DIVIDER (Page 5) ==================== -->
<div class="page-break"></div>
<div class="part-cover">
  <div class="part-number">PART I</div>
  <div class="part-title">The Strategic AI Landscape & Mindset</div>
  <div class="part-desc">ปูรากฐานความเข้าใจเชิงกลยุทธ์ ทำไม SME ยุค 2026 ต้องปรับตัว และวิธีเปลี่ยนวิธีคิดจาก "คนนั่งเขียนโค้ด" สู่ "CEO ผู้บริหารทีมวิศวกร AI"</div>
</div>

<!-- ==================== CHAPTER 1 (Pages 6-7) ==================== -->
<div class="page-break"></div>
<div class="header-tag">CHAPTER 1</div>
<h1>บทที่ 1: การปฏิวัติ AI ในภาคธุรกิจ SME ไทย 2026</h1>

<h2>1.1 คลื่นลูกใหญ่ที่ SME ไทยต้องเผชิญ</h2>
<p>
ในปี 2026 การดำเนินธุรกิจในประเทศไทยก้าวเข้าสู่จุดเปลี่ยนครั้งประวัติศาสตร์ ปัญหาการขาดแคลนแรงงาน ค่าแรงขั้นต่ำที่ปรับตัวสูงขึ้น และพฤติกรรมผู้บริโภคที่ต้องการการตอบสนองแบบ <em>"ทันที (Instant Gratification)"</em> ทำให้รูปแบบการบริหารธุรกิจแบบเดิมเริ่มถึงทางตัน
</p>
<p>
ธุรกิจ SME ที่ยังต้องพึ่งพาพนักงานในการคอยตอบแชททีละคน คอยส่องราคาสินค้าคู่แข่งด้วยตาเปล่า หรือต้องรอฝ่ายบัญชีสรุปยอดสิ้นเดือน กำลังสูญเสียความสามารถในการแข่งขันให้กับธุรกิจที่นำ <strong>AI Agent</strong> เข้ามาเป็นพนักงานดิจิทัลประจำองค์กร
</p>

<h2>1.2 ข้อมูลวิจัยเชิงประจักษ์ (Thailand SME AI Adoption Index 2026)</h2>
<table>
  <thead>
    <tr>
      <th>สถาบันวิจัย / รายงาน</th>
      <th>สถิติที่ค้นพบ</th>
      <th>นัยสำคัญต่อการตัดสินใจของผู้บริหาร</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>AWS & Strand Partners</strong><br>Unlocking Thailand's AI Potential</td>
      <td>• <strong>84%</strong> ของ SME ที่ใช้ AI รายงานว่าประสิทธิภาพงานเพิ่มขึ้น<br>• <strong>71%</strong> มีรายได้เติบโตเฉลี่ย <strong>19%</strong> ต่อปี<br>• ลดเวลาทำงานเอกสารลงเฉลี่ย <strong>22 ชั่วโมง/คน/สัปดาห์</strong></td>
      <td>AI ไม่ใช่ต้นทุนฟุ่มเฟือย แต่เป็นเครื่องจักรผลิตผลกำไรและกู้คืนเวลาคืนสู่เจ้าของธุรกิจ</td>
    </tr>
    <tr>
      <td><strong>UOB Business Outlook 2026</strong><br>สำรวจเจ้าของกิจการ 265 ราย</td>
      <td>• <strong>70%</strong> ของ SME ไทยนำ AI เข้าสู่กระบวนการทำงานแล้ว (สูงที่สุดในอาเซียน)<br>• ธุรกิจที่ใช้ AI สามารถขยายตลาดสู่ต่างจังหวัดและต่างประเทศได้เร็วกว่าเดิม 4 เท่า</td>
      <td>หากองค์กรของคุณยังไม่เริ่มใช้ AI ในปี 2026 คุณจะกลายเป็นชนกลุ่มน้อย 30% ที่กำลังถูกแย่งส่วนแบ่งการตลาด</td>
    </tr>
  </tbody>
</table>

<div class="callout callout-warning">
  <div class="callout-title">⚠️ ต้นทุนของการไม่ทำอะไรเลย (The Cost of Inaction)</div>
  การไม่นำ AI มาใช้ ไม่ได้แปลว่าคุณประหยัดเงิน แต่แปลว่าคุณกำลังจ่าย <em>"ค่าเสียโอกาสแฝง (Hidden Cost)"</em> ให้กับ:
  <ul>
    <li>ยอดขายช่วง 22.00 - 08.00 น. ที่หลุดมือไปเพราะไม่มีคนตอบแชท (สูญเสียรายได้เฉลี่ย 15,000 - 50,000 บาท/เดือน)</li>
    <li>สต็อกสินค้าที่สั่งมาเกินหรือขาดช่วงเพราะคำนวณ Safety Stock ด้วยความรู้สึก (เงินจม 50,000 - 200,000 บาท)</li>
    <li>ค่าจ้างทำระบบภายนอกหลักแสนที่ล่าช้าและไม่ตรงตามความต้องการของธุรกิจ</li>
  </ul>
</div>

<!-- ==================== CHAPTER 2 (Pages 8-9) ==================== -->
<div class="page-break"></div>
<div class="header-tag">CHAPTER 2</div>
<h1>บทที่ 2: ปรัชญา Vibe Coding & กฎทอง 80/20</h1>

<h2>2.1 นิยาม 'Vibe Coding' ที่แท้จริง</h2>
<p>
Andrej Karpathy ผู้บัญญัติคำว่า <strong>Vibe Coding</strong> ในเดือนกุมภาพันธ์ 2025 และพัฒนาสู่ <strong>Agentic Engineering</strong> ในปี 2026 ได้อธิบายไว้ว่า: <em>"นี่คือยุคที่ผู้คนสื่อสารสิ่งที่ต้องการกับ AI แล้วปล่อยให้ AI เป็นผู้สร้างโค้ดทั้งหมดขึ้นมา โดยมนุษย์ทำหน้าที่กำหนดวิสัยทัศน์ ทดสอบผลลัพธ์ และอนุมัติงาน"</em>
</p>

<h2>2.2 เปรียบเทียบสองโลก: Developer vs Vibe Coder</h2>
<table>
  <thead>
    <tr>
      <th>มิติการทำงาน</th>
      <th>การเขียนโปรแกรมแบบเดิม (Old School)</th>
      <th>Vibe Coding สำหรับผู้บริหาร (Fast AI Way)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>ทักษะที่ต้องใช้</strong></td>
      <td>การจำไวยากรณ์ (Syntax), วงเล็บ, ปีกกา, ตัวแปร</td>
      <td><strong>การคิดเชิงตรรกะธุรกิจ (Business Logic & Workflow)</strong></td>
    </tr>
    <tr>
      <td><strong>บทบาทของคุณ</strong></td>
      <td>ช่างก่อสร้าง (ลงมือก่ออิฐฉาบปูนทีละก้อน)</td>
      <td><strong>ผู้ว่าจ้าง / CEO / สถาปนิก (Architect)</strong></td>
    </tr>
    <tr>
      <td><strong>ระยะเวลาพัฒนา MVP</strong></td>
      <td>3 - 6 เดือน (หรือจ้างทีมงานหลักแสน)</td>
      <td><strong>1 ชั่วโมง - 1 วัน (ด้วยงบประมาณ 0 บาท)</strong></td>
    </tr>
    <tr>
      <td><strong>การแก้ไขข้อผิดพลาด</strong></td>
      <td>งมหาบรรทัดที่พังในโค้ด 5,000 บรรทัด</td>
      <td>แคปหน้าจอหรือบอกข้อผิดพลาด ให้ AI แก้ไขตัวเองอัตโนมัติ</td>
    </tr>
  </tbody>
</table>

<div class="callout callout-tip">
  <div class="callout-title">🎯 กฎทอง 80/20 ในการสั่งงาน AI Agent</div>
  <p><strong>80% ของความสำเร็จ</strong> เกิดจากการบรีฟงานที่ระบุ 4 องค์ประกอบสำคัญ:</p>
  <ol>
    <li><strong>Role & Context:</strong> คุณคือใคร และระบบนี้ใช้ในธุรกิจอะไร</li>
    <li><strong>Pain Point:</strong> ปัญหาปัจจุบันคืออะไร และต้องการแก้ตรงไหน</li>
    <li><strong>Core Features:</strong> 3-4 ฟังก์ชันหลักที่จำเป็นต้องมี (อย่าขอเยอะเกินไปในรอบแรก)</li>
    <li><strong>Expected UI/UX:</strong> สไตล์ที่ต้องการ (เช่น Modern Light Mode, ปุ่มสีฟ้า, รองรับมือถือ)</li>
  </ol>
</div>

<!-- ==================== CHAPTER 3 (Pages 10-11) ==================== -->
<div class="page-break"></div>
<div class="header-tag">CHAPTER 3</div>
<h1>บทที่ 3: The Frontier AI Stack (Gemini 3.7, ChatGPT 5.6, Claude Opus 5)</h1>

<h2>3.1 ทำเนียบโมเดลเรือธงระดับโลกประจำองค์กร SME</h2>
<p>
ในหลักสูตร Fast AI เราเลือกใช้ <strong>Google Gemini 3.7 Flash & 3.1 Pro เป็นขุมพลังหลัก (Hero Model)</strong> เนื่องจากผสานเข้ากับ Google Antigravity และ NotebookLM ได้อย่างไร้รอยต่อ พร้อมเสริมด้วยโมเดลเรือธงระดับโลกจากค่ายอื่น:
</p>

<table>
  <thead>
    <tr>
      <th>เครื่องมือ / โมเดล</th>
      <th>ค่ายผู้พัฒนา</th>
      <th>บทบาทและฟังก์ชันเด่น</th>
      <th>โควตาฟรี (Free Tier)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Google Gemini 3.7 Flash & 3.1 Pro</strong></td>
      <td>Google DeepMind</td>
      <td><strong>พระเอกหลักของ Fast AI:</strong> ขับเคลื่อน Antigravity & NotebookLM ประมวลผลภาพ/เอกสาร 2M Tokens ตอบสนองแบบ Real-time</td>
      <td><strong>มี Free Tier สูงมาก</strong> (1,500 Requests/วัน)</td>
    </tr>
    <tr>
      <td><strong>Google NotebookLM (Gemini 3.7)</strong></td>
      <td>Google Labs</td>
      <td>Second Brain ปลอดข้อมูลมั่ว 100% + Audio Overview Studio</td>
      <td><strong>ฟรี 100%</strong> ทุกฟังก์ชัน</td>
    </tr>
    <tr>
      <td><strong>ChatGPT 5.6 Sol / Canvas</strong></td>
      <td>OpenAI</td>
      <td>Strategic Reasoning, Visual UI editing, ปรับโค้ดคู่ขนานแบบเห็นภาพ</td>
      <td>ฟรี (GPT-5o) / Plus $20 ต่อเดือน</td>
    </tr>
    <tr>
      <td><strong>Claude Opus 5 / Sonnet 5</strong></td>
      <td>Anthropic</td>
      <td>เขียนโค้ดระบบใหญ่ + Computer Use จับเมาส์คลิกหน้าจอคอม</td>
      <td>ใช้งานผ่าน Free Web / API เติมเงินตามจริง</td>
    </tr>
    <tr>
      <td><strong>DeepSeek-V4 & Distill</strong></td>
      <td>DeepSeek</td>
      <td>ลดต้นทุน 95% + รัน Local AI ออฟไลน์ในออฟฟิศ (PDPA 100%)</td>
      <td>Open-weights ฟรี / API ต่ำที่สุด</td>
    </tr>
    <tr>
      <td><strong>GitHub + Vercel</strong></td>
      <td>Microsoft / Vercel</td>
      <td>ระบบบันทึกเวอร์ชัน และ Cloud Hosting ปล่อยเว็บใน 2 นาที</td>
      <td><strong>ฟรี 100%</strong> (Hobby Plan ตลอดชีพ)</td>
    </tr>
  </tbody>
</table>

<!-- ==================== PART II DIVIDER (Page 12) ==================== -->
<div class="page-break"></div>
<div class="part-cover">
  <div class="part-number">PART II</div>
  <div class="part-title">Core Agentic Engines</div>
  <div class="part-desc">เจาะลึก 2 เครื่องมือหลักของหลักสูตร: Google Antigravity 2.0 (Powered by Gemini 3.7) และ Google Gemini NotebookLM สำหรับสร้างสมองที่ 2 ขององค์กร</div>
</div>

<!-- ==================== CHAPTER 4 (Pages 13-14) ==================== -->
<div class="page-break"></div>
<div class="header-tag">CHAPTER 4</div>
<h1>บทที่ 4: เจาะลึก Google Antigravity 2.0 & Gemini 3.7 Flash</h1>

<h2>4.1 โครงสร้างและสถาปัตยกรรมของ Antigravity</h2>
<p>
Google Antigravity ขับเคลื่อนด้วยโมเดล <strong>Gemini 3.7 Flash</strong> ซึ่งมีความสามารถในการประมวลผล Multimodal และคิดตรรกะแบบ Real-time ผสาน 3 องค์ประกอบหลัก:
</p>
<ol>
  <li><strong>Autonomous Execution Engine:</strong> ความสามารถในการวางแผนงาน (Planning), แตกเป็น Task ย่อย, และลงมือสร้างไฟล์หรือเขียนโปรแกรมต่อเนื่องจนเสร็จสิ้น</li>
  <li><strong>Terminal Sandbox:</strong> สภาพแวดล้อมจำลองที่ปลอดภัย ให้ Agent สามารถทดสอบรันคำสั่ง ติดตั้ง Library และเปิดเซิร์ฟเวอร์ทดสอบได้โดยไม่กระทบกับคอมพิวเตอร์ของคุณ</li>
  <li><strong>Multi-Agent Swarm (Subagents):</strong> การกระจายงานให้ผู้ช่วย AI ย่อยทำงานร่วมกัน เช่น Research Agent ไปอ่านเอกสาร และ Execution Agent ลงมือเขียนโค้ด</li>
</ol>

<div class="callout callout-info">
  <div class="callout-title">💡 ความต่างระหว่าง Chatbot กับ Autonomous Agent</div>
  • <strong>Chatbot (เช่น ChatGPT ธรรมดา):</strong> คุณพิมพ์ 1 ข้อความ -&gt; AI ตอบ 1 ข้อความ -&gt; หยุดรอคุณพิมพ์ต่อ<br>
  • <strong>AI Agent (เช่น Antigravity):</strong> คุณสั่ง 1 เป้าหมาย -&gt; AI วางแผน 10 ขั้นตอน -&gt; สร้างไฟล์ A -&gt; ทดสอบรัน -&gt; เจอบั๊กแก้ไฟล์ B -&gt; ทดสอบซ้ำ -&gt; ส่งมอบระบบที่พร้อมใช้งาน!
</div>

<!-- ==================== CHAPTER 5 (Pages 15-16) ==================== -->
<div class="page-break"></div>
<div class="header-tag">CHAPTER 5</div>
<h1>บทที่ 5: คัมภีร์ Slash Commands ประจำองค์กร</h1>

<h2>5.1 รวม 6 คำสั่งลับเปลี่ยนธุรกิจใน Antigravity</h2>
<table>
  <thead>
    <tr>
      <th>คำสั่ง Slash Command</th>
      <th>การใช้งานทางธุรกิจ</th>
      <th>ตัวอย่าง Prompt สั่งงานจริง</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>/goal</code></td>
      <td>สั่งงานชิ้นใหญ่ข้ามคืน โดย Agent จะไม่หยุดจนกว่าระบบจะเสร็จสมบูรณ์</td>
      <td><code>/goal ช่วยสร้างระบบจองคิวนัดหมายคลินิก มีหน้าเลือกหมอ เลือกเวลา และส่ง LINE แจ้งเตือนลูกค้า</code></td>
    </tr>
    <tr>
      <td><code>/schedule</code></td>
      <td>ตั้งเวลาให้ Agent ตื่นขึ้นมาทำงานตามเวลาที่กำหนด (Cron Job)</td>
      <td><code>/schedule รันสคริปต์ตรวจราคาสินค้าคู่แข่ง 10 รายการทุกวันเวลา 08:00 น.</code></td>
    </tr>
    <tr>
      <td><code>/browser</code></td>
      <td>สั่ง Agent เปิดเบราว์เซอร์ไปสำรวจเว็บ ดึงรูป หรือส่องคู่แข่ง</td>
      <td><code>/browser ไปที่เว็บคู่แข่งนี้ สรุปราคาโปรโมชั่น และแคปหน้าจอมาให้ดู</code></td>
    </tr>
    <tr>
      <td><code>/grill-me</code></td>
      <td>สั่งให้ AI สัมภาษณ์เราทีละคำถาม เพื่อกลั่นกรอง Requirement</td>
      <td><code>/grill-me ถามคำถามฉันเพื่อวางแผนสร้างระบบ CRM สำหรับธุรกิจค้าส่ง</code></td>
    </tr>
    <tr>
      <td><code>/learn</code></td>
      <td>บันทึกกฎระเบียบหรือความชอบขององค์กรลงความจำถาวร</td>
      <td><code>/learn ทุกปุ่มในระบบนี้ต้องใช้สีแบรนด์ #0B1B3D และตัวเลขเงินต้องใส่คอมมาเสมอ</code></td>
    </tr>
    <tr>
      <td><code>/teamwork-preview</code></td>
      <td>กระจายงานให้ Subagents หลายตัวทำงานคู่ขนานกัน</td>
      <td><code>/teamwork-preview แบ่งทีมทำ Frontend React และ Backend Google Sheets API</code></td>
    </tr>
  </tbody>
</table>

<!-- ==================== CHAPTER 6 (Pages 17-19) ==================== -->
<div class="page-break"></div>
<div class="header-tag">CHAPTER 6</div>
<h1>บทที่ 6: Google Gemini Notebook (NotebookLM)</h1>

<h2>6.1 สมองที่ 2 ขององค์กร (Second Brain)</h2>
<p>
ปัญหาใหญ่ที่สุดของการนำ AI มาใช้ในองค์กรคือ <strong>"อาการมั่วข้อมูล (Hallucination)"</strong> เมื่อพนักงานหรือลูกค้าถามเรื่องระเบียบบริษัทหรือราคาสินค้า AI ทั่วไปมักจะแต่งเรื่องขึ้นมาเอง
</p>
<p>
<strong>Google NotebookLM (Gemini 3.7)</strong> แก้ปัญหานี้ด้วยเทคโนโลยี <em>Source-Grounded AI</em> ทำให้ AI ตอบคำถามโดยอ้างอิงจากเอกสารที่คุณอัปโหลดเข้าไปเท่านั้น (PDF, Word, Google Docs, สไลด์, วิดีโอยูทูป) และจะระบุเสมอว่านำคำตอบมาจากหน้าใดและบรรทัดใด
</p>

<h2>6.2 Audio Overview Studio: แปลงคู่มือเป็นรายการพอดแคสต์</h2>
<p>
ฟีเจอร์ที่สร้างความว้าวที่สุดใน NotebookLM คือ <strong>Audio Overview Studio</strong> ซึ่งสามารถแปลงเอกสารหนา 50-100 หน้า ให้กลายเป็นบทสนทนาพอดแคสต์เสียงจำลองภาษาไทย/อังกฤษ ที่มีผู้ดำเนินรายการ 2 คนมาคุยแลกเปลี่ยนความคิดเห็นกันอย่างออกรส
</p>

<div class="callout callout-tip">
  <div class="callout-title">🎙️ ประโยชน์ของ Audio Overview สำหรับเจ้าของธุรกิจ</div>
  • ให้ผู้บริหารและทีมงานเปิดฟังทบทวนกลยุทธ์บริษัทขณะขับรถหรือเดินทาง<br>
  • แปลงเอกสารระเบียบบริษัท (SOP) เป็นเสียง ให้พนักงานใหม่ฟังปฐมนิเทศโดยไม่ต้องนั่งอ่านเอกสารน่าเบื่อ<br>
  • ใช้ทบทวนเนื้อหาบทเรียนของ Fast AI ทุกสัปดาห์
</div>

<h2>6.3 การเชื่อมโยง NotebookLM สู่ Google Antigravity</h2>
<p>
กระบวนการทำงานที่ดีที่สุดคือ:
</p>
<ol>
  <li>โยนเอกสารกระบวนการทำงาน (SOP) และตัวอย่างข้อมูลเข้า NotebookLM</li>
  <li>สั่งให้ NotebookLM สรุป: <code>"ช่วยสรุป System Specification สำหรับสร้าง Web App"</code></li>
  <li>ก๊อปปี้ข้อกำหนดที่ได้ ไปป้อนให้ Google Antigravity พร้อมคำสั่ง <code>/goal</code> เพื่อเขียนระบบ</li>
</ol>

<!-- ==================== CHAPTER 7 (Pages 20-21) ==================== -->
<div class="page-break"></div>
<div class="header-tag">CHAPTER 7</div>
<h1>บทที่ 7: ChatGPT 5.6 Canvas & Claude Opus 5 Visual Vibe Coding</h1>

<h2>7.1 การใช้ ChatGPT 5.6 Canvas สำหรับ Visual Prototyping</h2>
<p>
ChatGPT 5.6 Canvas ช่วยให้ผู้ประกอบการที่ไม่มีพื้นฐานโค้ด สามารถมองเห็นและปรับแต่งหน้าตาของแอปพลิเคชันได้แบบคู่ขนาน:
</p>
<ul>
  <li><strong>ไฮไลต์ข้อความแก้เฉพาะจุด:</strong> ลากคลุมส่วนที่ต้องการ เช่น ปุ่มกด แล้วพิมพ์บอกว่า <em>"ขอเปลี่ยนเป็นสีแดงสดและใส่ไอคอนรถเข็น"</em></li>
  <li><strong>Code Review & Security Audit:</strong> ให้ Canvas สแกนหาช่องโหว่ความปลอดภัยของระบบ</li>
  <li><strong>Image-to-Code:</strong> สเก็ตช์หน้าจอลงบนกระดาษ หรือแคปหน้าจอเว็บที่ชอบ โยนเข้า Canvas แล้วสั่ง <em>"สร้างหน้าเว็บแบบนี้ด้วย Tailwind CSS"</em></li>
</ul>

<!-- ==================== PART III DIVIDER (Page 22) ==================== -->
<div class="page-break"></div>
<div class="part-cover">
  <div class="part-number">PART III</div>
  <div class="part-title">5 SME Turnkey Project Blueprints</div>
  <div class="part-desc">พิมพ์เขียว 5 โปรเจกต์เปลี่ยนธุรกิจ พร้อมสถาปัตยกรรม แผนภาพ และซอร์สโค้ดฉบับสมบูรณ์ที่นำไปสั่งงาน AI Agent สร้างได้ทันที (Default: Gemini 3.7 Flash)</div>
</div>

<!-- ==================== CHAPTER 8 (Pages 23-25) ==================== -->
<div class="page-break"></div>
<div class="header-tag">CHAPTER 8</div>
<h1>บทที่ 8: พิมพ์เขียว 1 — บอทส่องราคาคู่แข่ง (Gemini 3.7 Flash)</h1>

<h2>8.1 ปัญหาธุรกิจและคุณค่า (Business Value)</h2>
<p>
การนั่งเช็คราคาสินค้าคู่แข่งจาก Shopee, Lazada หรือเว็บคู่แข่ง 20-30 รายการทุกวัน เสียเวลาพนักงานเฉลี่ย 2-3 ชั่วโมงต่อวัน และมักปรับราคาโปรโมชั่นช้ากว่าคู่แข่ง ทำให้สูญเสียยอดขาย
</p>

<h2>8.2 แผนภาพสถาปัตยกรรมระบบ (Architecture Pipeline)</h2>
<pre>[Task Scheduler (08:00 AM)]
       │
       ▼
[AI Scraper Engine (Gemini 3.7 / Cheerio)] ───► [เข้าดึงราคาจากเว็บเป้าหมาย 10 URL]
       │
       ▼
[Price Comparator Logic] ───► [เปรียบเทียบกับราคาของเรา: ส่วนต่าง ฿ / %]
       │
       ├───────────────────────────────┐
       ▼                               ▼
[LINE Notify API]              [Google Sheets History]
(ส่งตารางแจ้งเตือนเข้ากลุ่มผู้บริหาร)      (บันทึกประวัติราคาย้อนหลัง)</pre>

<h2>8.3 ซอร์สโค้ดฉบับสมบูรณ์ (Ready-to-Deploy Code)</h2>
<pre>// competitor_scraper.js
// Powered by Google Gemini 3.7 Flash (Default for Fast AI)
import axios from 'axios';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-3.7-flash' });

const LINE_TOKEN = process.env.LINE_NOTIFY_TOKEN;
const TARGET_PRODUCTS = [
  { name: 'วิตามินซี ซีรีส์ A', url: 'https://example.com/item1', myPrice: 450 },
  { name: 'เซรั่มบำรุงผิวหน้า B', url: 'https://example.com/item2', myPrice: 1200 }
];

async function checkPrices() {
  let message = "\\n📊 สรุปราคาสินค้าคู่แข่งประจำวัน (Gemini 3.7 Flash):\\n";
  for (const item of TARGET_PRODUCTS) {
    try {
      const { data } = await axios.get(item.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      const $ = cheerio.load(data);
      const priceText = $('.price-tag, .product-price').text().replace(/[^0-9]/g, '');
      const currentPrice = parseInt(priceText, 10) || 0;
      
      const diff = item.myPrice - currentPrice;
      const status = diff > 0 
        ? `🔴 เราแพงกว่า ${diff} บาท (ปรับลดด่วน)` 
        : `🟢 เราถูกกว่า ${Math.abs(diff)} บาท`;
        
      message += `\\n• ${item.name}\\n  ราคาคู่แข่ง: ${currentPrice} บ. (${status})\\n`;
    } catch (err) {
      message += `\\n• ${item.name}: ⚠️ ไม่สามารถดึงราคาได้ (เว็บอาจบล็อก)\\n`;
    }
  }
  
  // ส่งข้อความเข้า LINE Notify
  await axios.post('https://notify-api.line.me/api/notify', `message=${encodeURIComponent(message)}`, {
    headers: {
      'Authorization': `Bearer ${LINE_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  console.log("ส่งแจ้งเตือนเข้า LINE สำเร็จ!");
}

checkPrices();</pre>

<!-- ==================== CHAPTER 9 (Pages 26-28) ==================== -->
<div class="page-break"></div>
<div class="header-tag">CHAPTER 9</div>
<h1>บทที่ 9: พิมพ์เขียว 2 — 24/7 AI Sales Rep & CRM (Gemini 3.7 API)</h1>

<h2>9.1 ปัญหาธุรกิจและคุณค่า (Business Value)</h2>
<p>
ลูกค้าออนไลน์กว่า 35% ทักเข้ามาสอบถามสินค้าในช่วงเวลา 22.00 - 08.00 น. ซึ่งเป็นช่วงเวลาที่แอดมินหลับ ทำให้ลูกค้าเปลี่ยนใจไปซื้อร้านคู่แข่งที่ตอบเร็วกว่า ระบบนี้ทำหน้าที่เป็นพนักงานขายดิจิทัลที่ตอบคำถาม แนะนำโปรโมชั่น และปิดการขายตลอด 24 ชั่วโมง
</p>

<h2>8.2 ซอร์สโค้ดฉบับสมบูรณ์ (Gemini 3.7 Sales Engine)</h2>
<pre>// sales_agent_engine.js
// Powered by Google Gemini 3.7 Flash Engine (Default)
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: 'gemini-3.7-flash',
  generationConfig: { temperature: 0.7, maxOutputTokens: 600 }
});

const SYSTEM_PROMPT = `
คุณคือ "น้องฟ้า" พนักงานขายและดูแลลูกค้ามืออาชีพของร้านสยามบิวตี้
บุคลิกภาพ: สุภาพ อ่อนหวาน ใช้หางเสียง "ค่ะ" ตอบคำถามกระชับ จริงใจ
กฎเกณฑ์การขาย:
1. ตอบคำถามจากข้อมูลแคตตาล็อกเท่านั้น (ห้ามเดาหรือให้ข้อมูลเท็จ)
2. แนะนำเซ็ตโปรโมชั่นคู่เมื่อลูกค้าสนใจสินค้าเดี่ยว
3. เมื่อลูกค้าตกลงซื้อ ให้สรุปยอดเงินและแสดงเลขบัญชี ธนาคารกสิกรไทย 123-4-56789-0
4. เมื่อลูกค้าส่งที่อยู่ ให้สกัด JSON: {"name":"", "phone":"", "address":"", "items":[]}
`;

export async function handleCustomerChat(userMessage, chatHistory, productCatalog) {
  const context = `ข้อมูลสินค้าปัจจุบัน: ${JSON.stringify(productCatalog)}`;
  const chat = model.startChat({
    history: [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT + "\n" + context }] },
      { role: 'model', parts: [{ text: 'รับทราบค่ะ น้องฟ้าพร้อมให้บริการลูกค้าทุกท่านค่ะ' }] },
      ...chatHistory
    ]
  });

  const response = await chat.sendMessage(userMessage);
  return response.response.text();
}</pre>

<!-- ==================== CHAPTER 10 (Pages 29-31) ==================== -->
<div class="page-break"></div>
<div class="header-tag">CHAPTER 10</div>
<h1>บทที่ 10: พิมพ์เขียว 3 — Smart Inventory Dashboard</h1>

<h2>10.1 ปัญหาธุรกิจและคุณค่า</h2>
<p>
ปัญหาสินค้าขาดสต็อก (Stockout) ทำให้เสียโอกาสขาย และปัญหาสินค้าค้างสต็อก (Dead Stock) ทำให้เงินจม ระบบนี้คำนวณจุดสั่งซื้อซ้ำ (Reorder Point) และมีแถบแจ้งเตือนระดับวิกฤตบนสมาร์ทโฟน
</p>

<h2>10.2 โค้ดตัดสต็อกและคำนวณ Safety Stock</h2>
<pre>// InventoryManager.jsx
import React, { useState } from 'react';

export function InventoryManager() {
  const [items, setItems] = useState([
    { id: 1, sku: 'VIT-C-01', name: 'วิตามินซี 1000mg', stock: 12, minThreshold: 20, leadTimeDays: 5 },
    { id: 2, sku: 'SRM-HYA-02', name: 'เซรั่มไฮยาลูรอน', stock: 85, minThreshold: 30, leadTimeDays: 7 }
  ]);

  const updateStock = (id, delta) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newStock = Math.max(0, item.stock + delta);
        return { ...item, stock: newStock };
      }
      return item;
    }));
  };

  return (
    <div className="space-y-4">
      {items.map(item => {
        const isReorderNeeded = item.stock <= item.minThreshold;
        return (
          <div key={item.id} className={`p-4 rounded-xl border ${isReorderNeeded ? 'bg-red-50 border-red-300' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-900">{item.name}</h4>
                <p className="text-xs text-slate-500">SKU: {item.sku} | Safety Stock: {item.minThreshold}</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-slate-900">{item.stock} ชิ้น</div>
                {isReorderNeeded && <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded font-bold">⚠️ สั่งซื้อด่วน</span>}
              </div>
            </div>
            <div className="mt-3 flex gap-2 justify-end">
              <button onClick={() => updateStock(item.id, -1)} className="px-3 py-1 bg-slate-200 rounded text-xs font-bold">- ตัดออก</button>
              <button onClick={() => updateStock(item.id, 1)} className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-bold">+ รับเข้า</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}</pre>

<!-- ==================== CHAPTER 11 (Pages 32-34) ==================== -->
<div class="page-break"></div>
<div class="header-tag">CHAPTER 11</div>
<h1>บทที่ 11: พิมพ์เขียว 4 — Multi-Platform Content Generator</h1>

<h2>11.1 ปัญหาธุรกิจและคุณค่า</h2>
<p>
การจ้างครีเอทีฟและกราฟิกทำคอนเทนต์มีค่าใช้จ่าย 20,000 - 35,000 บาท/เดือน และมักคิดแคปชั่นไม่ทันกับกระแส ระบบนี้ช่วยให้คุณพิมพ์หัวข้อสั้นๆ แล้ว AI จะสร้างสคริปต์ TikTok 30 วินาที, แคปชั่น Facebook ยิงแอด, และเรนเดอร์ภาพกราฟิกให้เสร็จใน 10 วินาที
</p>

<h2>11.2 ซอร์สโค้ดระบบสร้างคอนเทนต์ (Gemini 3.7)</h2>
<pre>// ContentGeneratorEngine.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-3.7-flash' });

export async function generateSocialAssets(productName, targetAudience, promotionDetail) {
  const prompt = `
คุณคือ Creative Director & Copywriter ระดับท็อป
สร้างชุดคอนเทนต์สำหรับ: ${productName}
กลุ่มลูกค้า: ${targetAudience}
โปรโมชั่น: ${promotionDetail}

สิ่งที่ต้องสร้าง (JSON Format):
1. tiktok_script: บทพูด 30 วินาที + Hook 3 วินาทีแรก + รายละเอียดภาพที่ต้องถ่าย
2. facebook_ad: แคปชั่นเปิดตัว + ปัญหาขยี้ใจ + เสนอทางแก้ + Call to Action
3. banner_headline: ข้อความพาดหัวบนภาพแบนเนอร์ตัวใหญ่ 1 ประโยค
  `;
  
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}</pre>

<!-- ==================== CHAPTER 12 (Pages 35-37) ==================== -->
<div class="page-break"></div>
<div class="header-tag">CHAPTER 12</div>
<h1>บทที่ 12: พิมพ์เขียว 5 — Executive Financial Dashboard</h1>

<h2>12.1 ปัญหาธุรกิจและคุณค่า</h2>
<p>
เจ้าของธุรกิจหลายท่านไม่ทราบตัวเลขกำไรสุทธิที่แท้จริงจนกว่าจะสิ้นเดือน ทำให้ตัดสินใจยิงแอดหรือสต็อกของผิดพลาด ระบบนี้ดึงยอดขายจาก Google Sheets แบบสด แสดงกราฟรายรับ-รายจ่าย และมีกล่อง AI CFO วิเคราะห์จุดที่เงินรั่วไหล
</p>

<h2>12.2 ซอร์สโค้ด Dashboard แสดงกราฟ</h2>
<pre>// FinancialDashboard.jsx
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export function FinancialDashboard({ salesData, aiSummary }) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-md space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="text-xs text-slate-500">รายรับรวม (Revenue)</div>
          <div className="text-xl font-black text-blue-600">฿1,850,000</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="text-xs text-slate-500">ต้นทุนรวม (COGS)</div>
          <div className="text-xl font-black text-red-600">฿980,000</div>
        </div>
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
          <div className="text-xs text-emerald-700 font-bold">กำไรสุทธิ (Net Margin)</div>
          <div className="text-xl font-black text-emerald-700">฿870,000 (47.0%)</div>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" name="รายรับ" fill="#0284c7" />
            <Bar dataKey="expense" name="รายจ่าย" fill="#dc2626" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded text-xs text-slate-700">
        <strong>💡 AI CFO Advice (Gemini 3.7):</strong> {aiSummary}
      </div>
    </div>
  );
}</pre>

<!-- ==================== PART IV DIVIDER (Page 38) ==================== -->
<div class="page-break"></div>
<div class="part-cover">
  <div class="part-number">PART IV</div>
  <div class="part-title">Edge Techniques & Wow Hacks</div>
  <div class="part-desc">เทคนิคขั้นสูง: Computer Use ควบคุมหน้าจอคอมพิวเตอร์ (Claude Opus 5), การเขียนโปรแกรมผ่านมือถือ 100%, และ DeepSeek Local AI</div>
</div>

<!-- ==================== CHAPTER 13 (Pages 39-40) ==================== -->
<div class="page-break"></div>
<div class="header-tag">CHAPTER 13</div>
<h1>บทที่ 13: Computer Use in Action (Claude Opus 5 & Operator)</h1>

<h2>13.1 ให้ AI จับเมาส์และคีย์บอร์ดทำงานแทน</h2>
<p>
ด้วยโมเดล <strong>Claude Opus 5 & OpenAI Operator</strong> AI สามารถมองหน้าจอคอมพิวเตอร์และควบคุมเคอร์เซอร์เมาส์ได้เหมือนมนุษย์:
</p>
<ul>
  <li><strong>กรอกฟอร์มภาษี e-Filing:</strong> ให้ AI เปิดไฟล์ Excel แล้วนำตัวเลขภาษีไปกรอกลงระบบของกรมสรรพากรทีละช่องอัตโนมัติ</li>
  <li><strong>ดาวน์โหลดสลิป/ใบเสร็จจากธนาคาร:</strong> ให้ AI ล็อกอินเข้าเว็บ โหลด PDF ใบเสร็จทุกสิ้นเดือน และจัดเรียงเข้าโฟลเดอร์แยกตามแผนก</li>
  <li><strong>คัดลอกข้อมูลข้ามโปรแกรมเก่า (Legacy ERP):</strong> ส่องหน้าจอโปรแกรมบัญชีรุ่นเก่าที่ไม่มี API แล้วก๊อปปี้ข้อมูลมาใส่ Google Sheets</li>
</ul>

<!-- ==================== CHAPTER 14 (Pages 41-42) ==================== -->
<div class="page-break"></div>
<div class="header-tag">CHAPTER 14</div>
<h1>บทที่ 14: Mobile Coding & Remote Ops 100%</h1>

<h2>14.1 สั่งงานทีมวิศวกร AI จากสมาร์ทโฟน</h2>
<p>
เจ้าของธุรกิจไม่จำเป็นต้องนั่งอยู่หน้าคอมพิวเตอร์ตลอดเวลา:
</p>
<ol>
  <li><strong>GitHub Codespaces บนมือถือ:</strong> เปิดเบราว์เซอร์บน iPhone/Android เข้า <code>github.com/codespaces</code> จะได้หน้าจอ VS Code ฉบับเต็มพร้อม Agent สั่งงานด้วยเสียงหรือคีย์บอร์ด</li>
  <li><strong>LINE / Telegram Bot Webhook:</strong> ส่งข้อความเสียงหรือพิมพ์สั่งงานในไลน์ เช่น <em>"สรุปยอดขายสัปดาห์นี้และปรับราคาหน้าร้านให้หน่อย"</em> Agent จะรันคำสั่งและส่งรายงานกลับมาในแชททันที</li>
</ol>

<!-- ==================== CHAPTER 15 (Pages 43-44) ==================== -->
<div class="page-break"></div>
<div class="header-tag">CHAPTER 15</div>
<h1>บทที่ 15: Self-Healing Code & DeepSeek Local AI</h1>

<h2>15.1 วิธีปล่อยให้ AI ซ่อมตัวเองข้ามคืน</h2>
<p>
เมื่อคุณสั่งงานด้วยคำสั่ง <code>/goal</code> Agent จะมีวงจรตรวจสอบความถูกต้องอัตโนมัติ (Automated Feedback Loop):
</p>
<ol>
  <li><strong>เขียนไฟล์และคอมไพล์:</strong> AI ทำการเขียนโค้ดและสั่ง <code>npm run build</code> ใน Terminal Sandbox</li>
  <li><strong>ตรวจจับ Error อัตโนมัติ:</strong> หากพบ Error สีแดง Agent จะดึง Stacktrace นั้นมาวิเคราะห์และแก้ไขไฟล์ที่พังทันที</li>
  <li><strong>วนรอบการทดสอบ (Self-Correction Loop):</strong> จนกว่าคำสั่ง <code>build</code> จะผ่าน 100% โดยที่คุณไม่ต้องตื่นมาคอยกดแก้งาน</li>
</ol>

<!-- ==================== PART V DIVIDER (Page 45) ==================== -->
<div class="page-break"></div>
<div class="part-cover">
  <div class="part-number">PART V</div>
  <div class="part-title">Deployment, Plugins & Security</div>
  <div class="part-desc">ขั้นตอนนำระบบขึ้น Cloud ฟรี 100%, การปรับแต่ง Custom Skills และแนวทางปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล (PDPA 2562)</div>
</div>

<!-- ==================== CHAPTER 16 (Pages 46-47) ==================== -->
<div class="page-break"></div>
<div class="header-tag">CHAPTER 16</div>
<h1>บทที่ 16: Plugins & Custom Skills (SKILL.md)</h1>

<h2>16.1 วิธีสร้าง Custom Skill ประจำบริษัท</h2>
<p>
สร้างไฟล์ <code>SKILL.md</code> ในโฟลเดอร์โปรเจกต์ เพื่อสอนกฎระเบียบและมาตรฐานของบริษัทให้ AI Agent จำได้ตลอดไป:
</p>
<pre>---
name: my_company_rules
description: กฎระเบียบทางธุรกิจและการจัดรูปแบบเอกสารของบริษัทเรา
---

# กฎเกณฑ์การพัฒนาของบริษัท
1. หน้าบ้าน UI ทั้งหมดต้องใช้ภาษาไทยที่สุภาพ เข้าใจง่าย
2. ตัวเลขเงินต้องแสดงทศนิยม 2 ตำแหน่ง พร้อมคอมมา (เช่น 1,250.00 บาท)
3. สีประจำแบรนด์: ใช้สีน้ำเงิน (#0B1B3D) และสีแดง (#DC2626)
4. ห้ามเก็บรหัสผ่านเป็นข้อความธรรมดา ต้องเข้ารหัสผ่าน Auth มาตรฐานเสมอ</pre>

<!-- ==================== CHAPTER 17 (Pages 48-49) ==================== -->
<div class="page-break"></div>
<div class="header-tag">CHAPTER 17</div>
<h1>บทที่ 17: Deploy สดขึ้น Vercel & กฎหมาย PDPA</h1>

<h2>17.1 สี่ขั้นตอนปล่อยเว็บใน 2 นาที</h2>
<ol>
  <li>Push โค้ดขึ้น GitHub Repository</li>
  <li>ล็อกอินเข้า Vercel.com ด้วย GitHub</li>
  <li>กด Add Project เลือก Repo แล้วกด Deploy</li>
  <li>ได้ลิงก์ <code>https://your-app.vercel.app</code> พร้อม SSL ฟรีทั่วโลก</li>
</ol>

<div class="callout callout-warning">
  <div class="callout-title">🔒 10 กฎเหล็กความปลอดภัย & PDPA 2562</div>
  1. ห้ามใส่เลขบัตรประชาชน, ข้อมูลสุขภาพ, หรือรหัสผ่านลงใน Prompt<br>
  2. เก็บ API Keys ในไฟล์ <code>.env</code> เสมอ<br>
  3. ติดตั้งแถบ Privacy Policy บนหน้าเว็บเพื่อขอความยินยอมคุกกี้ตามกฎหมายไทย
</div>

<!-- ==================== CHAPTER 18 (Pages 50-51) ==================== -->
<div class="page-break"></div>
<div class="header-tag">CHAPTER 18</div>
<h1>บทที่ 18: การบริหารโควตาฟรี 0 บาทตลอดชีพ</h1>

<h2>18.1 เทคนิคประหยัดงบประมาณ API ขององค์กร</h2>
<table>
  <thead>
    <tr>
      <th>บริการ / API</th>
      <th>โควตาฟรีที่ได้ต่อเดือน</th>
      <th>เทคนิคการใช้งานไม่ให้เสียเงิน</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Google Gemini 3.7 Flash API</strong></td>
      <td>15 Request ต่อนาที (1,500 ต่อวัน)</td>
      <td>ใช้รุ่น <code>gemini-3.7-flash</code> เป็นหลัก (ประหยัดกว่าและตอบไวกว่า 3 เท่า)</td>
    </tr>
    <tr>
      <td><strong>Vercel Cloud Hosting</strong></td>
      <td>100 GB Bandwidth + 100k Function Calls</td>
      <td>แคชข้อมูล Static ไฟล์ และใช้ Google Sheets เป็นฐานข้อมูลเบื้องต้น</td>
    </tr>
    <tr>
      <td><strong>LINE Messaging API</strong></td>
      <td>500 ข้อความ Broadcast ฟรี/เดือน</td>
      <td>ใช้ระบบ 1-on-1 Reply (ไม่จำกัดจำนวนข้อความฟรี) และส่งแจ้งเตือนผ่านกลุ่มผู้บริหาร</td>
    </tr>
  </tbody>
</table>

<!-- ==================== PART VI: APPENDICES (Pages 52-60) ==================== -->
<div class="page-break"></div>
<div class="part-cover">
  <div class="part-number">PART VI</div>
  <div class="part-title">Field Appendices & Action Plan</div>
  <div class="part-desc">CLEAR Prompt Framework, คลัง Prompt สำเร็จรูป 30+ ชุด, คำศัพท์เทคนิค AI, คัมภีร์แก้ Error 20 อาการ, และแผนปฏิบัติการ 30 วัน</div>
</div>

<!-- ==================== APPENDIX A (Pages 53-54) ==================== -->
<div class="page-break"></div>
<div class="header-tag">APPENDIX A</div>
<h1>ภาคผนวก A: CLEAR Prompt Framework & คลังคำสั่ง 30+ ชุด</h1>

<h2>A.1 โครงสร้างการเขียน Prompt แบบ C-L-E-A-R</h2>
<ul>
  <li><strong>C - Context:</strong> บริบทธุรกิจและกลุ่มเป้าหมาย</li>
  <li><strong>L - Logic:</strong> กฎเกณฑ์ทางธุรกิจและขั้นตอนการคิด</li>
  <li><strong>E - Example:</strong> ตัวอย่าง Input / Output ที่ต้องการ</li>
  <li><strong>A - Action:</strong> คำสั่งที่ชัดเจน (เช่น สร้างเว็บ, สรุปรายงาน)</li>
  <li><strong>R - Role:</strong> บุคลิกและบทบาทของ AI (เช่น ผู้ช่วยฝ่ายขาย, CFO)</li>
</ul>

<h2>A.2 คลังคำสั่ง Prompt แยกตามแผนกธุรกิจ</h2>
<div class="callout callout-tip">
  <div class="callout-title">Prompt 1: Landing Page ปิดการขายสินค้า</div>
  <pre>ช่วยสร้าง Single Page Landing Page สำหรับธุรกิจ [ชื่อธุรกิจ]:
- Hero Section พร้อมพาดหัว Hook ดึงดูด และปุ่ม CTA ทักแชท
- ตารางเปรียบเทียบข้อดี 3 แพ็กเกจ และรีวิวลูกค้า 5 ดาว
- ฟอร์มกรอกชื่อ-เบอร์โทรที่บันทึกข้อมูลเข้า Google Sheets</pre>
</div>

<div class="callout callout-tip">
  <div class="callout-title">Prompt 2: AI HR คัดกรองใบสมัครงาน</div>
  <pre>คุณคือผู้ช่วยฝ่ายบุคคล ช่วยเปรียบเทียบเรซูเม่ของผู้สมัคร 5 คนนี้กับ Job Description ตำแหน่ง Sales Manager
สรุปเป็นตารางคะแนน 1-10 ใน 3 ด้าน: ประสบการณ์ตรง, ทัศนคติ, และความสามารถด้าน AI</pre>
</div>

<div class="callout callout-tip">
  <div class="callout-title">Prompt 3: CFO วิเคราะห์จุดรั่วไหลของต้นทุน</div>
  <pre>วิเคราะห์ตัวเลขค่าใช้จ่ายของบริษัทในไตรมาสที่ผ่านมานี้:
1. หา 3 รายการที่มีสัดส่วนค่าใช้จ่ายสูงเกินมาตรฐาน
2. เสนอ 5 แนวทางลดต้นทุนแบบจับต้องได้ทันทีโดยไม่กระทบยอดขาย</pre>
</div>

<!-- ==================== APPENDIX B: GLOSSARY (Pages 55-56) ==================== -->
<div class="page-break"></div>
<div class="header-tag">APPENDIX B</div>
<h1>ภาคผนวก B: คำศัพท์เทคนิค AI สำหรับผู้บริหาร</h1>

<table>
  <thead>
    <tr>
      <th>คำศัพท์เทคนิค</th>
      <th>คำอธิบายแบบเข้าใจง่ายสำหรับเจ้าของธุรกิจ</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Agentic Workflow</strong></td>
      <td>กระบวนการที่ AI สามารถวางแผนและลงมือทำงานต่อเนื่องหลายขั้นตอนด้วยตัวเองโดยไม่ต้องรอมนุษย์กดสั่งทีละคำสั่ง</td>
    </tr>
    <tr>
      <td><strong>RAG (Retrieval-Augmented Generation)</strong></td>
      <td>การดึงข้อมูลจากเอกสารหรือฐานข้อมูลของบริษัทมาให้ AI ใช้อ่านก่อนตอบ เพื่อป้องกันอาการมั่วข้อมูล (หัวใจของ NotebookLM)</td>
    </tr>
    <tr>
      <td><strong>Hallucination</strong></td>
      <td>อาการที่ AI แต่งเรื่องหรือสร้างข้อมูลเท็จขึ้นมาอย่างมั่นใจเมื่อไม่มีข้อมูลอ้างอิง</td>
    </tr>
    <tr>
      <td><strong>MCP (Model Context Protocol)</strong></td>
      <td>มาตรฐานสากลที่เชื่อมโยง AI เข้ากับเครื่องมือภายนอก เช่น Google Drive, LINE, GitHub หรือฐานข้อมูลของบริษัท</td>
    </tr>
    <tr>
      <td><strong>Subagents</strong></td>
      <td>ระบบทีมงาน AI ย่อยที่แบ่งหน้าที่กันทำงานขนานกัน เช่น ตัวหนึ่งหาข้อมูล ตัวหนึ่งเขียนโค้ด ตัวหนึ่งทดสอบระบบ</td>
    </tr>
    <tr>
      <td><strong>Token</strong></td>
      <td>หน่วยนับปริมาณข้อความที่ AI ประมวลผล (1,000 Tokens ประมาณ 750 คำภาษาอังกฤษ หรือประมาณ 300-400 คำภาษาไทย)</td>
    </tr>
    <tr>
      <td><strong>Computer Use</strong></td>
      <td>เทคโนโลยีที่ AI มองเห็นหน้าจอคอมพิวเตอร์และขยับเมาส์พิมพ์คีย์บอร์ดเสมือนมนุษย์จริง</td>
    </tr>
  </tbody>
</table>

<!-- ==================== APPENDIX C: TROUBLESHOOTING (Pages 57-58) ==================== -->
<div class="page-break"></div>
<div class="header-tag">APPENDIX C</div>
<h1>ภาคผนวก C: คัมภีร์แก้ Error ยอดฮิต 20 อาการ</h1>

<table>
  <thead>
    <tr>
      <th>อาการ Error ที่พบ</th>
      <th>สาเหตุแท้จริง</th>
      <th>Prompt สั่ง AI ซ่อมตัวเองใน 10 วินาที</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Port 3000 in use</strong></td>
      <td>มีโปรแกรมตัวเก่ารันค้างอยู่</td>
      <td><code>พบปัญหา Port ชนกัน ช่วยปิด process เดิมหรือสลับไปใช้ port ถัดไปให้ทันที</code></td>
    </tr>
    <tr>
      <td><strong>White Screen (จอขาว)</strong></td>
      <td>Syntax Error หรือลืม import</td>
      <td><code>หน้าจอแสดงผลเป็นสีขาวว่างเปล่า ช่วยตรวจ console logs และแก้ไขโค้ดให้กลับมาแสดงผลปกติ</code></td>
    </tr>
    <tr>
      <td><strong>API Key 401 Unauthorized</strong></td>
      <td>หา .env ไม่เจอ หรือลืม prefix</td>
      <td><code>ระบบหา API Key ไม่เจอ ช่วยตรวจสอบไฟล์ .env (ถ้าเป็น Vite ต้องขึ้นต้นด้วย VITE_)</code></td>
    </tr>
    <tr>
      <td><strong>CORS Policy Blocked</strong></td>
      <td>หน้าบ้านยิงตรงหา API ต่างโดเมน</td>
      <td><code>ติดปัญหา CORS ช่วยสร้าง API Route ฝั่ง Serverless ทำหน้าที่เป็น Proxy ให้หน่อย</code></td>
    </tr>
    <tr>
      <td><strong>Module Not Found</strong></td>
      <td>ยังไม่ได้ลง package dependency</td>
      <td><code>ขาดโมดูลแพ็กเกจ ช่วยรันคำสั่งติดตั้ง package ที่จำเป็นทั้งหมดให้ครบถ้วน</code></td>
    </tr>
  </tbody>
</table>

<!-- ==================== APPENDIX D: 30-DAY PLAN (Page 59) ==================== -->
<div class="page-break"></div>
<div class="header-tag">APPENDIX D</div>
<h1>ภาคผนวก D: แผนปฏิบัติการ 30 วัน (30-Day Action Plan)</h1>

<table>
  <thead>
    <tr>
      <th>ช่วงเวลา</th>
      <th>ภารกิจที่ต้องลงมือทำ</th>
      <th>ผลลัพธ์ที่คาดหวัง</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>สัปดาห์ที่ 1</strong></td>
      <td>สำรวจ Pain Point สูงสุดในบริษัท + ป้อน SOP เข้า NotebookLM</td>
      <td>ได้โจทย์ MVP ที่ชัดเจนและ Second Brain</td>
    </tr>
    <tr>
      <td><strong>สัปดาห์ที่ 2</strong></td>
      <td>ใช้ Antigravity <code>/goal</code> ร่างระบบ + ปรับแต่ง Visual ใน Canvas</td>
      <td>ได้ระบบต้นแบบที่ทำงานได้จริงในเครื่อง</td>
    </tr>
    <tr>
      <td><strong>สัปดาห์ที่ 3</strong></td>
      <td>Deploy ขึ้น Vercel ฟรี + ทดสอบกับพนักงานและลูกค้ากลุ่มย่อย</td>
      <td>ระบบออนไลน์ 100% พร้อมทดสอบงานจริง</td>
    </tr>
    <tr>
      <td><strong>สัปดาห์ที่ 4</strong></td>
      <td>วัดผล ROI เวลาและเงินที่ประหยัดได้ + ขยายสู่ระบบถัดไป</td>
      <td>เพิ่มรายได้ ลดต้นทุนอย่างแท้จริงในองค์กร</td>
    </tr>
  </tbody>
</table>

<div style="margin-top: 50px; text-align: center; border-top: 2px solid #0b1b3d; padding-top: 25px;">
  <img src="file:///Users/tri333/Documents/Ebook AI Agent FastAI/public/fast-ai-logo.png" alt="Fast AI" style="height: 40px; margin-bottom: 12px;"><br>
  <strong style="font-size: 13pt; color: #0b1b3d;">FAST AI MASTERCLASS 2026</strong><br>
  <span style="font-size: 9pt; color: #64748b;">คู่มือปฏิบัติการ AI Agent & Vibe Coding สำหรับผู้ประกอบการ SME • All Rights Reserved</span>
</div>

</body>
</html>
"""

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

cmd = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_output}",
    f"file://{html_path}"
]

result = subprocess.run(cmd, capture_output=True, text=True)
print("PDF compilation complete with return code:", result.returncode)
