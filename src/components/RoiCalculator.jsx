import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Clock, 
  Users, 
  Sparkles, 
  ShieldAlert
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function RoiCalculator() {
  const [employeeCount, setEmployeeCount] = useState(3);
  const [avgSalary, setAvgSalary] = useState(25000);
  const [hoursSpentOnRoutine, setHoursSpentOnRoutine] = useState(3);
  const [missedNightSales, setMissedNightSales] = useState(15000);

  const hourlyRate = avgSalary / (22 * 8);
  const monthlyAdminCost = employeeCount * (hoursSpentOnRoutine * 22) * hourlyRate;
  
  const monthlyLaborSavings = monthlyAdminCost * 0.70;
  const monthlyRevenueRecovered = missedNightSales * 0.80;
  
  const totalMonthlyBenefit = monthlyLaborSavings + monthlyRevenueRecovered;
  const totalYearlyBenefit = totalMonthlyBenefit * 12;
  const yearlyHoursSaved = (employeeCount * hoursSpentOnRoutine * 22 * 12) * 0.70;

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-500/30 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">SME ROI & Cost Saving Calculator</h1>
            <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300">คำนวณผลตอบแทนและต้นทุนที่ประหยัดได้เมื่อนำ AI Agent & Vibe Coding มาใช้ในองค์กร</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Card: Input Sliders */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>พารามิเตอร์ของธุรกิจคุณ</span>
          </h3>

          {/* Slider 1: Number of Staff */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">จำนวนพนักงานแอดมิน/ฝ่ายขาย/ธุรการ:</span>
              <span className="text-emerald-700 dark:text-emerald-400 text-sm">{employeeCount} คน</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={employeeCount}
              onChange={(e) => setEmployeeCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Slider 2: Average Monthly Salary */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">เงินเดือนเฉลี่ยต่อคน:</span>
              <span className="text-emerald-700 dark:text-emerald-400 text-sm">{avgSalary.toLocaleString()} บาท/เดือน</span>
            </div>
            <input
              type="range"
              min="15000"
              max="60000"
              step="1000"
              value={avgSalary}
              onChange={(e) => setAvgSalary(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Slider 3: Hours spent on routine tasks */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">เวลาทำงานรูทีนซ้ำซาก (ตอบแชท, สรุปยอด, คีย์สต็อก):</span>
              <span className="text-emerald-700 dark:text-emerald-400 text-sm">{hoursSpentOnRoutine} ชม./คน/วัน</span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              step="0.5"
              value={hoursSpentOnRoutine}
              onChange={(e) => setHoursSpentOnRoutine(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Slider 4: Missed sales from slow reply */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">ประมาณการยอดขายที่หลุดมือช่วงดึก/ตอบช้า:</span>
              <span className="text-emerald-700 dark:text-emerald-400 text-sm">{missedNightSales.toLocaleString()} บาท/เดือน</span>
            </div>
            <input
              type="range"
              min="0"
              max="100000"
              step="5000"
              value={missedNightSales}
              onChange={(e) => setMissedNightSales(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

        </div>

        {/* Right Card: Real-time ROI Breakdown */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 dark:bg-slate-950 border border-slate-800 dark:border-emerald-500/40 shadow-xl flex flex-col justify-between relative overflow-hidden text-slate-100">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                💰 มูลค่าผลประโยชน์สุทธิที่ธุรกิจจะได้รับ
              </span>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                High Impact
              </span>
            </div>

            {/* Main Big Number: Yearly Value */}
            <div>
              <div className="text-xs text-slate-400">มูลค่าเพิ่มและเงินที่ประหยัดได้ต่อปี:</div>
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-white mt-1">
                ฿{Math.round(totalYearlyBenefit).toLocaleString()} <span className="text-base font-normal text-slate-400">/ ปี</span>
              </div>
              <div className="text-xs text-emerald-400 font-semibold mt-1">
                (คิดเป็นเงินประหยัด + รายได้เพิ่มเฉลี่ย ฿{Math.round(totalMonthlyBenefit).toLocaleString()} ต่อเดือน)
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                  <Clock className="w-3.5 h-3.5 text-brand-400" />
                  <span>เวลาที่ดึงกลับมาได้</span>
                </div>
                <div className="text-lg font-bold text-white">
                  {Math.round(yearlyHoursSaved).toLocaleString()} <span className="text-xs font-normal text-slate-400">ชม./ปี</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>กู้คืนยอดขายช่วงดึก</span>
                </div>
                <div className="text-lg font-bold text-emerald-300">
                  +฿{Math.round(monthlyRevenueRecovered * 12).toLocaleString()} <span className="text-xs font-normal text-slate-400">/ปี</span>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3 relative z-10">
            <span className="text-xs text-slate-400">
              ⚡ ต้นทุนระบบ AI Agent: <strong>0 บาท (Free Tier)</strong>
            </span>
            <button
              onClick={triggerConfetti}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>ประเมินความคุ้มค่า 🎉</span>
            </button>
          </div>
        </div>

      </div>

      {/* Facts Banner */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-3 shadow-sm">
        <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-900 dark:text-white">ข้อมูลอ้างอิงจากงานวิจัย SME ไทย 2026:</strong> องค์กรที่นำ AI Agent เข้ามาช่วยตอบแชทและตัดงานรูทีน สามารถลดเวลาตอบสนองลูกค้าลง 90% และผู้ประกอบการกว่า 71% รายงานว่ามีรายได้เพิ่มขึ้นเฉลี่ย 19% ภายใน 3 เดือนแรก
        </div>
      </div>

    </div>
  );
}
