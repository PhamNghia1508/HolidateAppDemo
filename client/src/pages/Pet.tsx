import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PawPrint, Heart, Zap, Star, Trophy, MapPin, Camera } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import MeshGradientBackground from "@/components/premium/MeshGradientBackground";
import BentoCard from "@/components/premium/BentoCard";
import PetHeroCard from "@/components/premium/PetHeroCard";
import StatCard from "@/components/premium/StatCard";
import ProgressRing from "@/components/premium/ProgressRing";
import RewardUnlockCard from "@/components/premium/RewardUnlockCard";
import PremiumButton from "@/components/premium/PremiumButton";

export default function Pet() {
  const [energy, setEnergy] = useState(70);
  const [isHappy, setIsHappy] = useState(false);
  const [sparks, setSparks] = useState<{ id: number; x: number }[]>([]);
  const [sparkId, setSparkId] = useState(0);
  const [earWiggle, setEarWiggle] = useState(false);
  const [gatherCount] = useState(12);
  const [photoCount] = useState(48);
  const [level] = useState(3);

  const feedPet = () => {
    const oldEnergy = energy;
    const newEnergy = Math.min(100, oldEnergy + 15);
    setEnergy(newEnergy);
    setIsHappy(true);

    const newSparks = Array.from({ length: 5 }, (_, i) => ({
      id: sparkId + i,
      x: oldEnergy + (newEnergy - oldEnergy) * (i / 5),
    }));
    setSparks((prev) => [...prev, ...newSparks]);
    setSparkId((prev) => prev + 5);
    setTimeout(() => setSparks((prev) => prev.filter((s) => !newSparks.find((n) => n.id === s.id))), 800);
    setTimeout(() => setIsHappy(false), 1500);
  };

  // Auto ear wiggle
  useEffect(() => {
    const interval = setInterval(() => {
      setEarWiggle(true);
      setTimeout(() => setEarWiggle(false), 1500);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, type: "spring", stiffness: 300, damping: 25 },
    }),
  };

  return (
    <MeshGradientBackground className="max-w-md mx-auto">
      <div className="min-h-screen flex flex-col relative">
        <div className="flex-1 overflow-y-auto pb-28 px-5">
          {/* Header */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-between pt-5 mb-6"
          >
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground opacity-60">
                GoPet Ecosystem
              </div>
              <h1 className="premium-heading mt-0.5">GoPet</h1>
            </div>
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/40">
              <Zap className="w-4 h-4 text-yellow" />
              <span className="text-[13px] font-bold text-ink">Lv {level}</span>
            </div>
          </motion.div>

          {/* Hero Pet Card - Full width */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="mb-4"
          >
            <BentoCard colSpan={2} glow="gold" interactive={false}>
              <PetHeroCard isHappy={isHappy} energy={energy} earWiggle={earWiggle} />
            </BentoCard>
          </motion.div>

          {/* Stats Row - 3 columns */}
          <div className="bento-grid-3 mb-4">
            <StatCard
              label="Gather"
              value={gatherCount}
              icon={<MapPin className="w-4 h-4 text-sage" />}
              color="sage"
              delay={0.2}
            />
            <StatCard
              label="Photos"
              value={photoCount}
              icon={<Camera className="w-4 h-4 text-coral" />}
              color="coral"
              delay={0.3}
            />
            <StatCard
              label="Streak"
              value={5}
              unit="d"
              icon={<Star className="w-4 h-4 text-yellow" />}
              color="gold"
              delay={0.4}
            />
          </div>

          {/* Energy & Progress Row */}
          <div className="bento-grid mb-4">
            {/* Energy Bar Card */}
            <motion.div
              custom={5}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="col-span-1"
            >
              <BentoCard glow="coral" interactive={false}>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground opacity-60">
                        Năng lượng
                      </div>
                      <div className="text-[16px] font-bold text-ink mt-0.5">Đói bụng</div>
                    </div>
                    <div className="text-[20px] font-black text-coral">{energy}%</div>
                  </div>
                  <div className="relative w-full h-3 bg-black/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #e76f51, #f4a261, #e9c46a)",
                        boxShadow: "0 0 12px rgba(231,111,81,0.4)",
                      }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${energy}%` }}
                      transition={{ duration: 1.2, type: "spring", stiffness: 60 }}
                    />
                    <AnimatePresence>
                      {sparks.map((s) => (
                        <div
                          key={s.id}
                          className="energy-spark"
                          style={{ left: `${s.x}%`, top: 0 }}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2">
                    {energy < 100 ? "Cần thêm kỷ niệm để Mimi lớn" : "Mimi no nê rồi! 😻"}
                  </p>
                </div>
              </BentoCard>
            </motion.div>

            {/* Progress Ring */}
            <motion.div
              custom={6}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="col-span-1"
            >
              <ProgressRing
                value={energy}
                label="Energy"
                color="#e76f51"
                size={70}
                strokeWidth={5}
                delay={0.5}
              />
            </motion.div>
          </div>

          {/* Rewards Grid */}
          <motion.div
            custom={7}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="mb-4"
          >
            <RewardUnlockCard currentLevel={level} delay={0.6} />
          </motion.div>

          {/* Achievement Badge Row */}
          <motion.div
            custom={8}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="mb-5"
          >
            <BentoCard glow="lavender" interactive={false}>
              <div className="p-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground opacity-60 mb-3">
                  Thành tích gần đây
                </div>
                <div className="flex gap-3">
                  {[
                    { icon: Trophy, label: "First Gather", desc: "Tạo plan đầu", active: true },
                    { icon: Heart, label: "Social Star", desc: "Vote 5 lần", active: true },
                    { icon: Camera, label: "Photographer", desc: "12 ảnh", active: false },
                  ].map((badge, i) => (
                    <motion.div
                      key={badge.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + i * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`flex-1 flex flex-col items-center rounded-[14px] p-2.5 border ${
                        badge.active
                          ? "bg-gradient-to-br from-yellow/10 to-coral/10 border-yellow/20"
                          : "bg-white/30 border-white/30 opacity-50"
                      }`}
                    >
                      <badge.icon
                        className={`w-5 h-5 mb-1 ${badge.active ? "text-yellow" : "text-muted-foreground"}`}
                      />
                      <span className="text-[11px] font-semibold text-ink text-center">{badge.label}</span>
                      <span className="text-[9px] text-muted-foreground">{badge.desc}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            custom={9}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <PremiumButton onClick={feedPet} variant="gradient" size="lg" data-testid="button-feed-pet">
              <PawPrint className="w-5 h-5" />
              Cho Mimi ăn kỷ niệm
            </PremiumButton>
          </motion.div>
        </div>

        <BottomNav />
      </div>
    </MeshGradientBackground>
  );
}
