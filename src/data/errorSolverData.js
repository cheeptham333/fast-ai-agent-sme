export const errorRemedies = [
  {
    id: "err-port-in-use",
    name: "Port 3000 / 5173 is already in use (พอร์ตชนกัน)",
    symptom: "เปิดเว็บไม่ติด หรือหน้า Terminal แจ้งว่า 'EADDRINUSE: address already in use'",
    cause: "มีโปรแกรมตัวเก่ารันค้างอยู่ หรือเปิด Terminal ซ้อนกันหลายหน้าต่าง",
    quickPrompt: "พบปัญหา Port ชนกัน ช่วยตรวจสอบและปิด Process ที่ค้างอยู่บน Port นั้น หรือเปลี่ยนไปใช้ Port ว่างถัดไปให้โดยอัตโนมัติ",
    explanation: "AI Agent จะทำการสั่ง `lsof -i :3000` แล้วปิด process เดิม หรือเปลี่ยน config พอร์ตใหม่ให้ทันที"
  },
  {
    id: "err-blank-screen",
    name: "หน้าจอขาว หรือ React Component Error (White Screen)",
    symptom: "เปิดหน้าเว็บแล้วเป็นสีขาวว่างเปล่า ไม่มีอะไรแสดงขึ้นมา",
    cause: "เกิด Syntax Error ในโค้ด หรือลืม Import Component หรือลืมส่งตัวแปร Props",
    quickPrompt: "หน้าจอแสดงผลเป็นสีขาวว่างเปล่า ช่วยตรวจสอบ Console logs, ตรวจสอบไฟล์ JSX/React ทั้งหมด หาจุดที่เกิด Runtime Error แล้วแก้ไขให้กลับมาแสดงผลได้ตามปกติ",
    explanation: "AI จะไล่เช็ค dependency และ return statement ใน component เพื่อซ่อมแซมให้ทันที"
  },
  {
    id: "err-env-missing",
    name: "API Key Not Found / Unauthorized 401 (หา API ไม่เจอ)",
    symptom: "กดยิง AI หรือดึงข้อมูลแล้วขึ้น Error 401 หรือ 'process.env.API_KEY is undefined'",
    cause: "ยังไม่ได้สร้างไฟล์ .env หรือลืมใส่ Prefix VITE_ ใน Vite Project",
    quickPrompt: "ระบบหา API Key ไม่เจอ ช่วยตรวจสอบไฟล์ .env และวิธีเรียกใช้ Environment Variable ในโปรเจกต์ (ถ้าเป็น Vite ต้องขึ้นต้นด้วย VITE_) พร้อมสร้างไฟล์ .env.example ให้ด้วย",
    explanation: "AI จะจัดระเบียบไฟล์ .env และแนะนำการตั้งค่าที่ถูกต้อง"
  },
  {
    id: "err-cors",
    name: "CORS Policy Blocked (ติดบล็อกความปลอดภัยเว็บ)",
    symptom: "ในเบราว์เซอร์แจ้งว่า 'Access to fetch has been blocked by CORS policy'",
    cause: "หน้าเว็บพยายามดึงข้อมูลจากเว็บอื่นโดยตรงโดยไม่มี Proxy หรือ Backend คั่น",
    quickPrompt: "พบปัญหา CORS ติดบล็อกการเรียก API จากหน้าเว็บ ช่วยสร้าง API Route หรือ Serverless Function ฝั่งหลังบ้าน เพื่อทำหน้าที่เป็น Proxy ดึงข้อมูลแทนหน้าบ้าน",
    explanation: "AI จะสร้าง endpoint ฝั่งหลังบ้านมาเป็นตัวกลางดึงข้อมูลอย่างปลอดภัย"
  }
];
