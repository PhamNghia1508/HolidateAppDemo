import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MapPin, Calendar, Vote, Heart, Sparkles } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-x-hidden"
      style={{
        background: "radial-gradient(ellipse at 80% 10%, rgba(16,35,30,0.08) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(231,111,81,0.06) 0%, transparent 50%), linear-gradient(180deg, #FFF8EF 0%, #F7EFE5 100%)",
      }}
    >
      <div className="flex-1 overflow-y-auto pb-28 px-5">
        {/* Header */}
        <div className="flex items-center justify-between pt-5 mb-5">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7B6658] opacity-60">
              GatherGo
            </div>
            <h1 className="text-[22px] font-black text-[#231F1B] tracking-tight mt-0.5">
              Chào Nghĩa <span className="text-[20px]">👋</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#4a7c59] bg-[#4a7c59]/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-[#4a7c59]/15">
              1 plan đang chờ vote
            </span>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4a7c59] to-[#2a9d8f]" />
          </div>
        </div>

        {/* Hero Card */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          onClick={() => setLocation("/plan-detail")}
          className="w-full rounded-[24px] overflow-hidden mb-5 relative cursor-pointer shadow-xl"
        >
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop"
            alt="Rooftop bar"
            className="w-full h-[180px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10231E]/80 via-[#10231E]/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
              Gợi ý hợp mood
            </span>
            <h2 className="text-[22px] font-black text-white mt-1 tracking-tight">Rooftop chill night</h2>
            <p className="text-[13px] text-white/80 mt-1">18:30 • 3 điểm đến • 520k/người</p>
            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-medium text-white border border-white/20">
                Hợp mood nhất
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-medium text-white border border-white/20">
                Ảnh đẹp
              </span>
            </div>
          </div>
        </motion.div>

        {/* Premium CTA */}
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setLocation("/create-plan")}
          className="w-full h-[52px] rounded-[16px] font-bold text-[16px] text-white flex items-center justify-center gap-2 mb-6 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #FF6B4A 0%, #FF8A4C 50%, #F3D37A 100%)",
            boxShadow: "0 8px 32px rgba(255,107,74,0.35), 0 0 60px rgba(255,107,74,0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          <Sparkles className="w-4 h-4" />
          Tạo Gather mới
        </motion.button>

        {/* Bento Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { icon: MapPin, title: "Gợi ý gần tôi", desc: "Quán hot gần bạn", accent: "#4a7c59", onClick: () => setLocation("/suggested") },
            { icon: Calendar, title: "Plan đã lưu", desc: "2 plan sẵn sàng", accent: "#FF6B4A", onClick: () => setLocation("/plan") },
            { icon: Vote, title: "Join bằng mã", desc: "Vào plan bạn gửi", accent: "#4a7c59", onClick: () => setLocation("/vote") },
            { icon: Heart, title: "Kỷ niệm gần đây", desc: "Đêm rooftop", accent: "#FF6B4A", onClick: () => setLocation("/memories") },
          ].map((action, i) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 300, damping: 25 }}
              whileHover={{ scale: 1.03, y: -3, transition: { type: "spring", stiffness: 400, damping: 20 } }}
              whileTap={{ scale: 0.97 }}
              onClick={action.onClick}
              className="premium-glass-card p-4 cursor-pointer"
              style={{
                boxShadow: `0 4px 24px rgba(0,0,0,0.06), 0 0 40px ${action.accent}10, inset 0 1px 0 rgba(255,255,255,0.4)`,
              }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: `${action.accent}15` }}>
                <action.icon className="w-5 h-5" style={{ color: action.accent }} />
              </div>
              <p className="text-[14px] font-bold text-[#231F1B]">{action.title}</p>
              <p className="text-[12px] text-[#7B6658]">{action.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Pet status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3 rounded-[16px] px-4 py-3 border border-white/50 backdrop-blur-md bg-white/40"
        >
          <div className="w-2 h-2 rounded-full bg-[#65C6A2] animate-pulse" />
          <p className="text-[13px] text-[#4a7c59]">
            GoPet đang vui vì bạn vừa lưu kỷ niệm.
          </p>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
