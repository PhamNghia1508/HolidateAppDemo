import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MapPin, Calendar, Vote, Heart, Sparkles } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col max-w-md mx-auto relative"
      style={{
        background: "linear-gradient(180deg, #f3eee8 0%, #ede6dc 100%)",
      }}
    >
      {/* Background decoration */}
      <div className="absolute top-20 -right-10 w-32 h-32 rounded-full bg-coral/10 blur-[50px]" />
      <div className="absolute top-[40%] -left-10 w-24 h-24 rounded-full bg-sage/10 blur-[40px]" />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-24 px-6">
        {/* Status bar */}
        <div className="flex items-center justify-between pt-4 mb-4">
          <span className="text-sm font-medium text-ink">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-ink" />
            <div className="w-1 h-1 rounded-full bg-ink" />
            <div className="w-4 h-2 rounded-sm border border-ink bg-ink" />
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-lg font-semibold text-ink">
              Chào Nghĩa <span className="text-lg">👋</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-sage bg-sage/10 px-3 py-1 rounded-full backdrop-blur-sm">
              1 plan đang chờ vote
            </span>
            <div className="w-9 h-9 rounded-full bg-sage/20" />
          </div>
        </div>

        {/* Hero Card - with image */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          onClick={() => setLocation("/plan-detail")}
          className="w-full rounded-[20px] overflow-hidden mb-5 relative cursor-pointer shadow-lg shadow-sage/20"
        >
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop"
            alt="Rooftop bar"
            className="w-full h-[160px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sage/90 via-sage/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-white/80">
              Gợi ý hợp mood
            </span>
            <h2 className="text-[20px] font-bold mt-1">Rooftop chill night</h2>
            <p className="text-[13px] text-white/80 mt-1">18:30 • 3 điểm đến • 520k/người</p>
            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-medium">
                Hợp mood nhất
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-medium">
                Ảnh đẹp
              </span>
            </div>
          </div>
        </motion.div>

        {/* Gradient CTA */}
        <motion.button
          onClick={() => setLocation("/create-plan")}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="w-full h-[52px] rounded-[14px] font-semibold text-[16px] text-white shadow-lg mb-5 overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #e76f51 0%, #f4a261 50%, #e76f51 100%)",
            backgroundSize: "200% 200%",
          }}
          data-testid="button-create-plan"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Tạo Gather mới
          </span>
        </motion.button>

        {/* Quick Actions - Glassmorphism cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            {
              icon: MapPin,
              title: "Gợi ý gần tôi",
              desc: "Quán hot gần bạn",
              color: "bg-sage/15",
              iconColor: "text-sage",
              onClick: () => setLocation("/suggested"),
            },
            {
              icon: Calendar,
              title: "Plan đã lưu",
              desc: "2 plan sẵn sàng",
              color: "bg-coral/15",
              iconColor: "text-coral",
              onClick: () => setLocation("/plan"),
            },
            {
              icon: Vote,
              title: "Join bằng mã",
              desc: "Vào plan bạn gửi",
              color: "bg-sage/15",
              iconColor: "text-sage",
              onClick: () => setLocation("/vote"),
            },
            {
              icon: Heart,
              title: "Kỷ niệm gần đây",
              desc: "Đêm rooftop",
              color: "bg-coral/15",
              iconColor: "text-coral",
              onClick: () => setLocation("/memories"),
            },
          ].map((action, i) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={action.onClick}
              className="rounded-[16px] p-4 border border-white/50 backdrop-blur-md bg-white/70 shadow-sm cursor-pointer"
              data-testid={`action-${i}`}
            >
              <div
                className={`w-9 h-9 rounded-xl ${action.color} flex items-center justify-center mb-2`}
              >
                <action.icon className={`w-5 h-5 ${action.iconColor}`} />
              </div>
              <p className="text-[14px] font-semibold text-ink">{action.title}</p>
              <p className="text-[12px] text-muted-foreground">{action.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Pet status */}
        <div className="flex items-center gap-2 rounded-[12px] px-4 py-3 border border-white/50 backdrop-blur-md bg-white/50">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <p className="text-[13px] text-sage">
            GoPet đang vui vì bạn vừa lưu kỷ niệm.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
