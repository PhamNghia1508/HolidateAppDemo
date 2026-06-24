import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";

const members = [
  { name: "Nghĩa", status: "Đồng ý", color: "bg-sage" },
  { name: "Linh", status: "Đồng ý", color: "bg-sage" },
  { name: "Minh", status: "Có thể", color: "bg-yellow" },
  { name: "An", status: "Đợi", color: "bg-muted" },
];

const choices = ["Đồng ý", "Có thể", "Đổi giờ"];

export default function Vote() {
  const [, setLocation] = useLocation();
  const [myChoice, setMyChoice] = useState("Đồng ý");
  const [voteCount, setVoteCount] = useState(3);

  const handleVote = (choice: string) => {
    setMyChoice(choice);
    if (choice === "Đồng ý" && voteCount < 4) {
      setVoteCount(4);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3eee8] flex flex-col max-w-md mx-auto">
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

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" }}
          className="text-[26px] font-bold text-ink mb-2"
        >
          Cả nhóm vote plan
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[14px] text-muted-foreground mb-5"
        >
          Khỏi chat lòng vòng — chốt nhanh trong một shared space.
        </motion.p>

        {/* Vote Progress with animated counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-sage-light/30 rounded-[16px] p-4 mb-5"
        >
          <motion.p
            key={voteCount}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-[16px] font-bold text-sage mb-1"
          >
            {voteCount}/4 người đã vote
          </motion.p>
          <p className="text-[13px] text-muted-foreground mb-3">
            {voteCount === 4 ? "Cả nhóm đã đồng ý! 🎉" : "Còn An chưa phản hồi"}
          </p>
          <div className="w-full h-2 bg-white rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-sage rounded-full"
              initial={{ width: "75%" }}
              animate={{ width: `${(voteCount / 4) * 100}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
        </motion.div>

        {/* Members with staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[20px] p-5 border border-border/30 mb-5"
        >
          <div className="grid grid-cols-4 gap-3">
            {members.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                className="flex flex-col items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-12 h-12 rounded-full ${m.color} flex items-center justify-center mb-1`}
                >
                  <span className="text-[14px] font-bold text-white">{m.name[0]}</span>
                </motion.div>
                <p className="text-[12px] font-semibold text-ink">{m.name}</p>
                <motion.span
                  animate={m.status === "Đợi" ? { opacity: [0.5, 1, 0.5] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full mt-0.5 ${
                    m.status === "Đồng ý" ? "bg-sage/10 text-sage" :
                    m.status === "Có thể" ? "bg-yellow/20 text-yellow" :
                    "bg-muted/30 text-muted-foreground"
                  }`}
                >
                  {m.status}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Your choice with interactive buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-[20px] p-5 border border-border/30 mb-5"
        >
          <h3 className="text-[16px] font-bold text-ink mb-3">Bạn chọn gì?</h3>
          <div className="flex gap-2 mb-3">
            {choices.map((choice) => (
              <motion.button
                key={choice}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVote(choice)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
                  myChoice === choice
                    ? "bg-sage text-white"
                    : "bg-white text-sage border border-sage/30"
                }`}
              >
                {choice}
              </motion.button>
            ))}
          </div>
          <p className="text-[12px] text-muted-foreground">Mỗi lựa chọn đều cập nhật cho cả nhóm.</p>
        </motion.div>

        {/* CTA with celebration animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            onClick={() => setLocation("/confirmed")}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="relative w-full h-[52px] rounded-[14px] bg-coral text-white font-semibold text-[16px] shadow-lg shadow-coral/20 hover:bg-coral/90 transition-colors overflow-hidden"
            data-testid="button-confirm"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-200%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <span className="relative z-10">Chốt plan & gửi nhắc hẹn</span>
          </motion.button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
