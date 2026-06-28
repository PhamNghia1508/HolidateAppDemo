import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Lightning, Users, Camera, ArrowRight, MapPin, PawPrint, Clock } from "@phosphor-icons/react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=700&auto=format&fit=crop",
    floatingChips: [
      { text: "3 plan sẵn sàng", icon: Lightning, top: "1rem", left: "1rem", delay: 0.2 },
      { text: "4 bạn đang vote", icon: Users, top: "3.4rem", right: "1rem", delay: 0.4 },
      { text: "Đã lưu kỷ niệm", icon: Camera, bottom: "4rem", left: "2rem", delay: 0.6 },
    ],
    headlineWords: [
      { text: "Plan", highlight: false, br: false },
      { text: "đi chơi", highlight: false, br: true },
      { text: "cùng nhau,", highlight: false, br: false },
      { text: "dễ hơn", highlight: true, br: true },
      { text: "bao giờ hết", highlight: true, br: false },
    ],
    description: "Chọn mood, thời gian và ngân sách. GatherGo tự tạo plan địa phương để cả nhóm dễ đồng ý.",
    features: [
      { text: "Gợi ý nhanh theo mood & vibe nhóm", icon: Lightning, color: "text-rose-500", bg: "bg-rose-100" },
      { text: "Vote cùng nhóm, không cần chat", icon: Users, color: "text-indigo-500", bg: "bg-indigo-100" },
      { text: "Lưu kỷ niệm mỗi chuyến đi", icon: Camera, color: "text-amber-500", bg: "bg-amber-100" },
    ]
  },
  {
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=700&auto=format&fit=crop",
    floatingChips: [
      { text: "Đã chốt 8/10", icon: Users, top: "1.5rem", right: "1rem", delay: 0.2 },
      { text: "Quán ngon 5*", icon: MapPin, bottom: "3rem", left: "1.5rem", delay: 0.4 },
    ],
    headlineWords: [
      { text: "Vote", highlight: true, br: false },
      { text: "địa điểm,", highlight: false, br: true },
      { text: "không còn", highlight: false, br: false },
      { text: "chín người mười ý", highlight: true, br: false },
    ],
    description: "Tinder cho việc ăn chơi: Vuốt trái vuốt phải để chọn. Hệ thống tự động đếm phiếu và chốt đơn vị trí tuyệt nhất.",
    features: [
      { text: "Bảo mật vote, tránh thiên vị", icon: Users, color: "text-teal-600", bg: "bg-teal-100" },
      { text: "Tự động chốt đơn khi đủ vote", icon: Clock, color: "text-rose-500", bg: "bg-rose-100" },
      { text: "Bản đồ real-time cho cả hội", icon: MapPin, color: "text-blue-500", bg: "bg-blue-100" },
    ]
  },
  {
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=700&auto=format&fit=crop",
    floatingChips: [
      { text: "Polaroid mới", icon: Camera, top: "2rem", left: "1.5rem", delay: 0.2 },
      { text: "Mimi đang vui", icon: PawPrint, bottom: "3rem", right: "1rem", delay: 0.4 },
    ],
    headlineWords: [
      { text: "Lưu giữ", highlight: false, br: false },
      { text: "thanh xuân,", highlight: false, br: true },
      { text: "nuôi", highlight: false, br: false },
      { text: "thú cưng", highlight: true, br: false },
      { text: "chung", highlight: true, br: false },
    ],
    description: "Cuộn phim ký ức của riêng hội bạn thân. Đặc biệt, cả nhóm sẽ cùng chăm sóc thú cưng điện tử chung lớn lên sau mỗi chuyến đi.",
    features: [
      { text: "Cuộn phim Polaroid nhóm", icon: Camera, color: "text-amber-500", bg: "bg-amber-100" },
      { text: "Thú cưng tiến hóa sau mỗi chuyến đi", icon: PawPrint, color: "text-emerald-600", bg: "bg-emerald-100" },
    ]
  }
];

// Spark burst on CTA
function SparkBurst({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <>
      {Array.from({ length: 10 }, (_, i) => {
        const angle = (i * 36) * Math.PI / 180;
        return (
          <motion.div key={i}
            className="absolute pointer-events-none rounded-none z-50"
            style={{
              width: i % 2 === 0 ? 6 : 4,
              height: i % 2 === 0 ? 6 : 4,
              background: ["var(--primary-color)", "#8B5CF6", "#C8860A", "#3D6B4F"][i % 4],
              top: "50%", left: "50%",
            }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{
              x: Math.cos(angle) * (50 + i * 5),
              y: Math.sin(angle) * (50 + i * 5),
              scale: [0, 1.6, 0],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
        );
      })}
    </>
  );
}

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [sparkVisible, setSparkVisible] = useState(false);
  const [sparkKey, setSparkKey] = useState(0);
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(prev => prev + 1);
    } else {
      setSparkVisible(true);
      setSparkKey(k => k + 1);
      setTimeout(() => {
        setSparkVisible(false);
        setLocation("/home");
      }, 500);
    }
  };

  const slide = slides[step];

  return (
    <main className="flex-1 flex flex-col px-6 py-4 overflow-y-auto overflow-x-hidden relative">

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Status bar */}
        <div className="flex items-center justify-between mb-4 pointer-events-none">
          <span className="text-sm font-semibold text-slate-800">9:41</span>
          <div className="flex items-center gap-1">
            {[0, 1, 2].map(i => (
              <div key={i} className={`bg-slate-800 rounded-none ${i < 2 ? 'opacity-30' : ''}`} style={{ width: i < 2 ? 4 : 16, height: i < 2 ? 4 : 8 }} />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col flex-1"
          >
            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-[272px] rounded-none overflow-hidden mb-6"
              style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.10)" }}>
              <img
                src={slide.image}
                alt="Onboarding visual" className="w-full h-full object-cover" />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(175deg, rgba(26,14,7,0.04) 0%, rgba(26,14,7,0.35) 50%, rgba(26,14,7,0.72) 100%)" }} />

              {/* Floating chips */}
              {slide.floatingChips.map(({ text, icon: Icon, top, left, right, bottom, delay }, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -(3 + i * 1.5), 0] }}
                  transition={{ opacity: { delay, duration: 0.4 }, scale: { delay, duration: 0.4 }, y: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: delay + 0.4 } }}
                  className="absolute flex items-center gap-2 px-3 py-2 rounded-none liquid-glass-card border border-white/20"
                  style={{ top, left, right, bottom, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)" }}>
                  <Icon className="w-4 h-4 text-[#D84C35]" weight="bold" />
                  <span className="text-[11px] font-bold tracking-wide text-slate-800 uppercase">{text}</span>
                </motion.div>
              ))}
              
              {/* Overlay stats (just for visual flair) */}
              <div className="absolute bottom-3 right-4 text-white/90 text-[10px] font-bold tracking-widest uppercase">
                {step === 0 && "2,400 nhóm chốt plan tuần này"}
                {step === 1 && "1.2s trung bình để vote xong"}
                {step === 2 && "8,000 mimi đã được ấp nở"}
              </div>
            </motion.div>

            {/* Typography Section */}
            <div className="mb-4">
              <h1 className="font-serif text-[42px] leading-[1.05] tracking-tight text-[#1C1C1C] mb-4">
                {slide.headlineWords.map((w, i) => (
                  <span key={i}>
                    {w.highlight ? (
                      <span className="text-[#D84C35]">{w.text} </span>
                    ) : (
                      <span>{w.text} </span>
                    )}
                    {w.br && <br />}
                  </span>
                ))}
              </h1>
              <p className="text-slate-600 text-[15px] leading-relaxed font-serif pr-4">
                {slide.description}
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3 flex-1 mb-8">
              {slide.features.map((f, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-4 group">
                  <div className={`w-10 h-10 rounded-none flex items-center justify-center ${f.bg} ${f.color}`}>
                    <f.icon className="w-5 h-5" weight="duotone" />
                  </div>
                  <span className="text-[14px] font-semibold text-slate-700">{f.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer Area */}
        <div className="pb-8 pt-4 relative z-20">
          
          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {slides.map((_, i) => (
              <motion.button 
                key={i}
                onClick={() => setStep(i)}
                initial={false}
                animate={{ 
                  width: step === i ? 24 : 8, 
                  backgroundColor: step === i ? "#D84C35" : "#CBD5E1" 
                }}
                className="h-2 rounded-none transition-colors"
              />
            ))}
          </div>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="w-full h-14 bg-[#D84C35] rounded-none flex flex-col items-center justify-center text-white relative overflow-hidden shadow-xl shadow-rose-500/20"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-[0.2em] uppercase">
                  {step === slides.length - 1 ? "Bắt đầu tạo Gather" : "Tiếp tục"}
                </span>
                <ArrowRight className="w-4 h-4" weight="bold" />
              </div>
              <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <SparkBurst visible={sparkVisible} key={sparkKey} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
