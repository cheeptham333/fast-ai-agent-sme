export const pluginsAndSkills = [
  {
    id: "skill-modern-web",
    name: "modern-web-guidance",
    category: "Frontend & UI Design",
    official: true,
    tag: "Must-Have",
    description: "สกิลแนะนำมาตรฐานการพัฒนาเว็บยุคใหม่ ช่วยให้ Agent สร้าง UI ที่สวยงาม ลื่นไหล มี Dark Mode, Responsive Design และใช้ Tailwind CSS ได้อย่างถูกต้อง",
    command: "/view_file ~/.gemini/config/plugins/modern-web-guidance-plugin/skills/modern-web-guidance/SKILL.md",
    benefit: "หน้าเว็บไม่ล้าสมัย รองรับทุกขนาดหน้าจอโดยไม่ต้องคอยบอกทีละส่วน"
  },
  {
    id: "skill-chrome-devtools",
    name: "chrome-devtools",
    category: "Testing & Debugging",
    official: true,
    tag: "Essential",
    description: "สกิลเชื่อมต่อ Google Chrome DevTools ให้ Agent สามารถเปิดหน้าเว็บจริง ตรวจสอบ Console Error วิเคราะห์ความเร็ว (LCP/CWV) และคลิกทดสอบปุ่มต่างๆ ได้อัตโนมัติ",
    command: "/view_file ~/.gemini/config/plugins/chrome-devtools-plugin/skills/chrome-devtools/SKILL.md",
    benefit: "Agent สามารถตรวจจับบั๊กและแก้ปัญหาหน้าจอขาวได้ด้วยตัวเอง"
  },
  {
    id: "skill-firebase-firestore",
    name: "firebase-firestore",
    category: "Cloud Database",
    official: true,
    tag: "High Utility",
    description: "สกิลเชื่อมต่อ Cloud Firestore ของ Google ทำให้ระบบของคุณมีฐานข้อมูล Real-time ที่เก็บข้อมูลลูกค้า ออเดอร์ และสต็อกได้ฟรี",
    command: "/view_file ~/.gemini/config/plugins/firebase/skills/firebase_firestore/SKILL.md",
    benefit: "สร้างระบบฐานข้อมูลบนคลาวด์ได้ในคลิกเดียวโดยไม่ต้องเปิดเซิร์ฟเวอร์เอง"
  },
  {
    id: "skill-agy-customizations",
    name: "agy-customizations",
    category: "Agent Configuration",
    official: true,
    tag: "Advanced",
    description: "คู่มือการปรับแต่ง Google Antigravity อย่างละเอียด ตั้งค่า Rules กฎของบริษัท และสร้าง Custom Subagents ประจำองค์กร",
    command: "/view_file ~/.gemini/antigravity/builtin/skills/agy-customizations/SKILL.md",
    benefit: "ปรับแต่ง Agent ให้ตรงตามวัฒนธรรมองค์กรและสไตล์การทำงานของ SME"
  }
];

export const customSkillTemplate = {
  fileName: "SKILL.md",
  examplePath: ".gemini/skills/sme_business_rules/SKILL.md",
  content: `---
name: sme_business_rules
description: กฎระเบียบทางธุรกิจและการจัดรูปแบบเอกสารของบริษัทสำหรับ AI Agent
---

# กฎเกณฑ์การพัฒนาและสร้างระบบของบริษัทเรา
1. **ภาษาและสำนวน:** ข้อความทั้งหมดที่แสดงหน้าบ้าน (Frontend UI) ต้องใช้ภาษาไทยที่สุภาพ เข้าใจง่าย เหมาะกับผู้บริหารและพนักงานทั่วไป
2. **รูปแบบเงินและตัวเลข:** แสดงทศนิยม 2 ตำแหน่ง พร้อมเครื่องหมายจุลภาค (เช่น 1,250.00 บาท)
3. **ความปลอดภัย:** ห้ามเก็บรหัสผ่านเป็น Plaintext และต้องมีระบบยืนยันตัวตนก่อนลบข้อมูลทุกครั้ง
4. **สีประจำแบรนด์:** ใช้โทนสีน้ำเงิน (#0e8ce9) และเทาเข้ม (#0f172a)`
};
