import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MapPin, Calendar, Vote, Heart, Sparkles } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const cardHover = {
    scale: 1.02,
    y: -2,
    transition: { type: "spring", stiffness: 400, damping: 20 },
  };

  return (
    <div className="min-h-screen bg-[#f3eee8] flex flex-col max-w-md mx-auto">
      {/* Scrollable content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 overflow-y-auto pb-24 px-6"
      >
        {/* Status bar */}
        <motion.div
          variants={item}
          className="flex items-center justify-between pt-4 mb-4"
        >
          <span className="text-sm font-medium text-ink">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-ink" />
            <div className="w-1 h-1 rounded-full bg-ink" />
            <div className="w-4 h-2 rounded-sm border border-ink bg-ink" />
          </div>
        </motion.div>

        {/* Header */}
        <motion.div variants={item} className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-semibold text-ink">
              Chào Nghĩa <span className="text-lg">👋</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[12px] text-sage bg-sage/10 px-3 py-1 rounded-full"
            >
              1 plan đang chờ vote
            </motion.span>
            <div className="w-9 h-9 rounded-full bg-sage/20" />
          </div>
        </motion.div>

        {/* Hero Card with glow */}
        <motion.div
          variants={item}
          whileHover={cardHover}
          className="w-full rounded-[20px] bg-gradient-to-br from-sage to-sage/80 p-5 mb-5 text-white relative overflow-hidden cursor-pointer"
          onClick={() => setLocation("/plan-detail")}
        >
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <span className="relative text-[11px] font-semibold tracking-wider uppercase text-white/70">
            Gợi ý hợp mood
          </span>
          <h2 className="relative text-[22px] font-bold mt-2 mb-2">Rooftop chill night</h2>
          <p className="relative text-[14px] text-white/80 mb-3">
            18:30 • 3 điểm đến • 520k/người
          </p>
          <div className="relative flex gap-2">
            <span className="px-3 py-1.5 rounded-full bg-white/20 text-[12px] font-medium text-white backdrop-blur-sm">
              Hợp mood nhất
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white/20 text-[12px] font-medium text-white backdrop-blur-sm">
              Ảnh đẹp
            </span>
          </div>
        </motion.div>

        {/* CTA with shimmer */}
        <motion.div variants={item}>
          <motion.button
            onClick={() => setLocation("/create-plan")}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="relative w-full h-[52px] rounded-[14px] bg-coral text-white font-semibold text-[16px] shadow-lg shadow-coral/20 hover:bg-coral/90 transition-colors mb-5 overflow-hidden"
            data-testid="button-create-plan"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-200%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Tạo Gather mới
            </span>
          </motion.button>
        </motion.div>

        {/* Quick Actions Grid with staggered hover */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            {
              icon: MapPin,
              title: "Gợi ý gần tôi",
              desc: "Quán hot gần bạn",
              color: "bg-sage/10",
              iconColor: "text-sage",
              onClick: () => setLocation("/suggested"),
            },
            {
              icon: Calendar,
              title: "Plan đã lưu",
              desc: "2 plan sẵn sàng",
              color: "bg-coral/10",
              iconColor: "text-coral",
              onClick: () => setLocation("/plan"),
            },
            {
              icon: Vote,
              title: "Join bằng mã",
              desc: "Vào plan bạn gửi",
              color: "bg-sage/10",
              iconColor: "text-sage",
              onClick: () => setLocation("/vote"),
            },
            {
              icon: Heart,
              title: "Kỷ niệm gần đây",
              desc: "Đêm rooftop",
              color: "bg-coral/10",
              iconColor: "text-coral",
              onClick: () => setLocation("/memories"),
            },
          ].map((action, i) => (
            <motion.div
              key={action.title}
              variants={item}
              whileHover={cardHover}
              whileTap={{ scale: 0.95 }}
              onClick={action.onClick}
              className="bg-white rounded-[16px] p-4 border border-border/30 cursor-pointer"
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

        {/* Pet status with pulse */}
        <motion.div
          variants={item}
          className="flex items-center gap-2 bg-white/60 rounded-[12px] px-4 py-3 border border-border/30"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-green-400"
          />
          <p className="text-[13px] text-sage">
            GoPet đang vui vì bạn vừa lưu kỷ niệm.
          </p>
        </motion.div>
      </motion.div>

      <BottomNav />
    </div>
  );
}
