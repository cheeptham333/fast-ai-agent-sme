import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Image
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

pdf_path = "/Users/tri333/Documents/Ebook AI Agent FastAI/public/fast-ai-handbook-sme-2026.pdf"

# Register Ayuthaya font for Thai support if available
font_registered = False
try:
    if os.path.exists("/System/Library/Fonts/Supplemental/Ayuthaya.ttf"):
        pdfmetrics.registerFont(TTFont("Ayuthaya", "/System/Library/Fonts/Supplemental/Ayuthaya.ttf"))
        thai_font = "Ayuthaya"
        font_registered = True
    else:
        thai_font = "Helvetica"
except Exception as e:
    print(f"Font error: {e}")
    thai_font = "Helvetica"

doc = SimpleDocTemplate(
    pdf_path,
    pagesize=A4,
    rightMargin=40,
    leftMargin=40,
    topMargin=40,
    bottomMargin=40
)

styles = getSampleStyleSheet()

title_style = ParagraphStyle(
    'CoverTitle',
    parent=styles['Heading1'],
    fontName=thai_font if font_registered else 'Helvetica-Bold',
    fontSize=24,
    leading=30,
    textColor=colors.HexColor('#0F172A'),
    alignment=1
)

subtitle_style = ParagraphStyle(
    'CoverSubtitle',
    parent=styles['Normal'],
    fontName=thai_font if font_registered else 'Helvetica',
    fontSize=13,
    leading=18,
    textColor=colors.HexColor('#0369A1'),
    alignment=1
)

heading_style = ParagraphStyle(
    'SectionHeading',
    parent=styles['Heading2'],
    fontName=thai_font if font_registered else 'Helvetica-Bold',
    fontSize=15,
    leading=20,
    textColor=colors.HexColor('#0284C7'),
    spaceBefore=14,
    spaceAfter=6
)

body_style = ParagraphStyle(
    'BodyDark',
    parent=styles['Normal'],
    fontName=thai_font if font_registered else 'Helvetica',
    fontSize=10,
    leading=15,
    textColor=colors.HexColor('#334155')
)

box_style = ParagraphStyle(
    'CalloutBox',
    parent=styles['Normal'],
    fontName=thai_font if font_registered else 'Helvetica',
    fontSize=9,
    leading=13,
    textColor=colors.HexColor('#0F172A')
)

story = []

# Logo
logo_path = "/Users/tri333/Documents/Ebook AI Agent FastAI/public/fast-ai-logo.png"
if os.path.exists(logo_path):
    story.append(Image(logo_path, width=180, height=60))
    story.append(Spacer(1, 15))

# Cover Title
story.append(Paragraph("Fast AI: AI Agent &amp; Vibe Coding Handbook", title_style))
story.append(Spacer(1, 8))
story.append(Paragraph("คู่มือปฏิบัติการสำหรับผู้ประกอบการ SME และผู้บริหาร 2026", subtitle_style))
story.append(Paragraph("สร้างเว็บ ระบบอัตโนมัติ และ AI Agent ใช้งานจริงด้วย Google Antigravity &amp; ChatGPT Codex", subtitle_style))
story.append(Spacer(1, 20))

# Info Box
info_data = [
    [Paragraph("<b>หลักสูตร:</b> Fast AI Mastery", box_style), Paragraph("<b>กลุ่มเป้าหมาย:</b> SME 30+ ไม่มีพื้นฐานโค้ด", box_style)],
    [Paragraph("<b>เครื่องมือหลัก:</b> Google Antigravity, NotebookLM, Codex", box_style), Paragraph("<b>เป้าหมาย (KPI):</b> เพิ่มรายได้ ลดต้นทุน ขยายโอกาส", box_style)]
]
t = Table(info_data, colWidths=[250, 250])
t.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F0F9FF')),
    ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#BAE6FD')),
    ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E0F2FE')),
    ('PADDING', (0,0), (-1,-1), 8),
]))
story.append(t)
story.append(Spacer(1, 20))

# Content Summary
modules = [
    ("Module 1: ปูพื้นฐาน & Mindset Vibe Coding ฉบับเจ้าของกิจการ", "เปลี่ยนบทบาทเป็น CEO คุม AI Agent สร้างระบบด้วยกฎ 80/20 The Modern AI Stack 2026"),
    ("Module 2: เจาะลึก Google Antigravity, ChatGPT Codex & NotebookLM", "คำสั่งลับ /goal, /schedule, Subagents, Visual Canvas, และ Second Brain ที่ไม่มั่ว 100%"),
    ("Module 3: 5 พิมพ์เขียวโปรเจกต์จริง SME พร้อมรันทันที", "1. บอทส่องราคาคู่แข่ง 2. AI Sales Rep 24 ชม. 3. สต็อกอัจฉริยะ 4. Content Generator 5. Financial Dashboard"),
    ("Module 4: เทคนิคระดับว้าว (Wow-Factor Hacks)", "Computer Use คุมหน้าจอคอม, Mobile Coding ผ่านมือถือ 100%, Voice-to-Code, Autonomous loops"),
    ("Module 5: ทำเนียบ Plugins, Custom Skills & Quota Zero-Cost Guide", "คลังสกิล SKILL.md, เทคนิคประหยัดงบ Free Tier 0 บาท ป้องกัน API รั่วไหล"),
    ("Module 6: ขั้นตอน Deploy ขึ้น Production จริง 0 บาท & PDPA", "เชื่อมต่อ GitHub + Vercel ใน 2 นาที และแนวทางความปลอดภัยคุ้มครองข้อมูลลูกค้า")
]

story.append(Paragraph("สรุปโครงสร้าง 6 โมดูลหลักสูตร Fast AI", heading_style))
story.append(Spacer(1, 6))

for title, desc in modules:
    story.append(Paragraph(f"<b>{title}</b>", heading_style))
    story.append(Paragraph(desc, body_style))
    story.append(Spacer(1, 6))

story.append(Spacer(1, 15))
story.append(Paragraph("<b>คลังความรู้ Fast AI Official NotebookLM:</b> https://notebook.google.com/notebook/be661c24-57d5-4208-ba66-73e9aff3cca8", box_style))

doc.build(story)
print(f"PDF generated successfully at: {pdf_path}")
