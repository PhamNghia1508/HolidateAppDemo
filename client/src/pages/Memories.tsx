import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import {
  Sparkles, Plus, Star, Clock, MapPin, Zap, Camera,
  Users, Heart, Home, ChevronRight, Image, BookOpen, TrendingUp
} from "lucide-react";

/* ============================================================
   MEMORIES — Group Vault
   Tabs: Bạn bè / Gia đình / Couple
   Each group = album + timeline + vibe stats + AI recap
   ============================================================ */

const BLUE = "#3B82F6";
const BLUE_BRIGHT = "#2563EB";
const T1 = "#0F172A";
const T2 = "#475569";
const T3 = "#94A3B8";
const SURF = "#FFFFFF";
const SURF2 = "#F0F5FF";
const BORDER = "rgba(0,0,0,0.07)";
const SHADOW = "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)";

/* ---- Group definitions ---- */
const groups = [
  {
    id: "friends",
    label: "Bạn bè",
    icon: Users,
    color: "#3B82F6",
    colorDim: "rgba(59,130,246,0.10)",
    emoji: "👥",
    coverImg: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=300&fit=crop",
    tagline: "Nhóm bạn thân",
    stats: { trips: 12, photos: 48, places: 23, streak: 5 },
    vibeScore: 92,
    favPlace: "Skyline Coffee",
    lastTrip: "2 ngày trước",
    members: ["N", "L", "M", "A"],
    recap: "Cả nhóm đã có 12 buổi đi chơi tuyệt vời. Quán hay nhất năm là Skyline Coffee — check-in ở đó tận 4 lần rồi!",
    moments: [
      { date: "22/6", title: "Rooftop chill night", place: "Skyline Coffee", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop", mood: "Chill" },
      { date: "15/6", title: "Food tour Quận 1", place: "Nhà Hàng Ngon", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop", mood: "Ăn ngon" },
      { date: "8/6", title: "Picnic sáng chủ nhật", place: "Công viên Gia Định", img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=200&fit=crop", mood: "Nhẹ nhàng" },
    ],
    photos: [
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=200&h=200&fit=crop",
    ],
  },
  {
    id: "family",
    label: "Gia đình",
    icon: Home,
    color: "#F59E0B",
    colorDim: "rgba(245,158,11,0.10)",
    emoji: "🏠",
    coverImg: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&h=300&fit=crop",
    tagline: "Nhà mình",
    stats: { trips: 6, photos: 31, places: 10, streak: 2 },
    vibeScore: 88,
    favPlace: "Hội An",
    lastTrip: "2 tuần trước",
    members: ["B", "M", "D"],
    recap: "6 chuyến gia đình đáng nhớ trong năm. Chuyến Hội An tháng trước là kỷ niệm đẹp nhất — cả nhà cùng mặc áo dài chụp hình.",
    moments: [
      { date: "10/6", title: "Hội An 2 ngày", place: "Phố cổ Hội An", img: "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=300&h=200&fit=crop", mood: "Ấm áp" },
      { date: "4/5", title: "Sinh nhật ba", place: "Nhà hàng Hoàng Ty", img: "https://images.unsplash.com/photo-1464349095431-e9a21285b19c?w=300&h=200&fit=crop", mood: "Vui vẻ" },
    ],
    photos: [
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1464349095431-e9a21285b19c?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=200&h=200&fit=crop",
    ],
  },
  {
    id: "couple",
    label: "Couple",
    icon: Heart,
    color: "#EC4899",
    colorDim: "rgba(236,72,153,0.10)",
    emoji: "💑",
    coverImg: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=300&fit=crop",
    tagline: "Hai đứa mình",
    stats: { trips: 9, photos: 67, places: 16, streak: 7 },
    vibeScore: 97,
    favPlace: "Đà Lạt",
    lastTrip: "5 ngày trước",
    members: ["N", "T"],
    recap: "9 chuyến đi đôi — mỗi chuyến là một trang nhật ký mới. Đà Lạt luôn là nơi hai đứa quay lại nhiều nhất.",
    moments: [
      { date: "19/6", title: "Đà Lạt cuối tuần", place: "Đà Lạt", img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=200&fit=crop", mood: "Lãng mạn" },
      { date: "5/6", title: "Sunset cruise", place: "Sông Sài Gòn", img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=300&h=200&fit=crop", mood: "Bình yên" },
      { date: "20/5", title: "Anniversary dinner", place: "The Deck", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop", mood: "Special" },
    ],
    photos: [
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=200&h=200&fit=crop",
    ],
  },
];

const S = (i: number) => ({ delay: i * 0.06, type: "spring" as const, stiffness: 420, damping: 32 });

export default function Memories() {
  const [, setLocation] = useLocation();
  const [activeGroup, setActiveGroup] = useState("friends");
  const [activeTab, setActiveTab] = useState<"photos" | "moments" | "stats">("photos");

  const group = groups.find(g => g.id === activeGroup)!;

  return (
    <div className="flex-1 overflow-y-auto pb-20 relative" style={{ background: "#F1F5FB" }}>
      {/* Header */}
      <div className="px-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(0)} className="pt-6 mb-4">
          <div className="page-label mb-1">Kỷ niệm</div>
          <div className="flex items-center justify-between">
            <h1 className="text-[24px] font-black tracking-tight" style={{ color: T1 }}>Memory Vault</h1>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setLocation("/photobooth")}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold text-[13px]"
              style={{ background: BLUE, color: "#fff", boxShadow: "0 2px 10px rgba(59,130,246,0.30)" }}>
              <Camera className="w-4 h-4" /> Photobooth
            </motion.button>
          </div>
        </motion.div>

        {/* Group Tabs */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={S(1)}
          className="flex gap-2 mb-5">
          {groups.map((g) => {
            const Icon = g.icon;
            const isActive = activeGroup === g.id;
            return (
              <motion.button key={g.id} whileTap={{ scale: 0.94 }}
                onClick={() => { setActiveGroup(g.id); setActiveTab("photos"); }}
                className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-2xl relative overflow-hidden"
                style={{
                  background: isActive ? g.color : SURF,
                  border: `1px solid ${isActive ? g.color : BORDER}`,
                  boxShadow: isActive ? `0 4px 16px ${g.color}30` : SHADOW,
                  transition: "all 0.22s ease",
                }}>
                <span className="text-[18px]">{g.emoji}</span>
                <span className="text-[11px] font-bold" style={{ color: isActive ? "#fff" : T2 }}>{g.label}</span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Group Content */}
      <AnimatePresence mode="wait">
        <motion.div key={activeGroup}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}>

          {/* Cover Card */}
          <div className="relative h-[180px] mx-5 rounded-3xl overflow-hidden mb-4"
            style={{ boxShadow: "0 6px 32px rgba(0,0,0,0.13)" }}>
            <img src={group.coverImg} alt={group.label} className="w-full h-full object-cover" />
            <div className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${group.color}CC 0%, ${group.color}44 50%, transparent 100%)` }} />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/70 text-[11px] font-semibold uppercase tracking-widest">{group.tagline}</p>
                  <h2 className="text-[22px] font-black text-white">{group.label}</h2>
                  <p className="text-white/70 text-[12px]">Lần cuối: {group.lastTrip}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex -space-x-2">
                    {group.members.map((m, i) => (
                      <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white"
                        style={{ background: `${group.color}CC`, border: "2px solid white" }}>{m}</div>
                    ))}
                  </div>
                  <div className="px-2.5 py-1 rounded-full text-[11px] font-bold"
                    style={{ background: "rgba(255,255,255,0.20)", color: "white", backdropFilter: "blur(8px)" }}>
                    Vibe {group.vibeScore}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-4 gap-2.5 mx-5 mb-4">
            {[
              { icon: MapPin, value: group.stats.trips, label: "Chuyến" },
              { icon: Image, value: group.stats.photos, label: "Ảnh" },
              { icon: Star, value: group.stats.places, label: "Nơi" },
              { icon: Zap, value: `${group.stats.streak}d`, label: "Streak" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, type: "spring" }}
                className="rounded-2xl p-2.5 flex flex-col items-center"
                style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
                <s.icon className="w-3.5 h-3.5 mb-1" style={{ color: group.color }} />
                <p className="text-[17px] font-black" style={{ color: T1 }}>{s.value}</p>
                <p className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: T3 }}>{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Sub-tab Navigation */}
          <div className="flex gap-2 px-5 mb-4">
            {(["photos", "moments", "stats"] as const).map((tab) => {
              const labels = { photos: "📸 Ảnh", moments: "✨ Kỷ niệm", stats: "📊 Vibe" };
              return (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="flex-1 py-1.5 rounded-xl text-[12px] font-semibold transition-all border"
                  style={{
                    background: activeTab === tab ? group.color : SURF,
                    color: activeTab === tab ? "#fff" : T2,
                    border: `1px solid ${activeTab === tab ? group.color : BORDER}`,
                  }}>
                  {labels[tab]}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "photos" && (
              <motion.div key="photos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }} className="px-5">
                {/* Photo Grid */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {group.photos.map((url, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05, type: "spring" }}
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      className="aspect-square rounded-2xl overflow-hidden cursor-pointer relative"
                      style={{ boxShadow: SHADOW }}>
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      {i === 0 && (
                        <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white"
                          style={{ background: group.color }}>Best</div>
                      )}
                    </motion.div>
                  ))}
                  {/* Add photo button */}
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    onClick={() => setLocation("/photobooth")}
                    className="aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer"
                    style={{ background: group.colorDim, border: `2px dashed ${group.color}50` }}>
                    <Plus className="w-6 h-6" style={{ color: group.color }} />
                    <span className="text-[10px] font-semibold" style={{ color: group.color }}>Thêm ảnh</span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {activeTab === "moments" && (
              <motion.div key="moments" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }} className="px-5">
                {/* AI Recap */}
                <div className="rounded-2xl p-4 mb-4"
                  style={{ background: group.colorDim, border: `1px solid ${group.color}25` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                      <Sparkles className="w-4 h-4" style={{ color: group.color }} />
                    </motion.div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.70)", color: group.color }}>AI recap</span>
                  </div>
                  <p className="text-[13px] leading-relaxed" style={{ color: T1 }}>{group.recap}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-3.5 h-3.5" style={{ color: group.color }} />
                    <span className="text-[11px] font-bold" style={{ color: group.color }}>
                      Nơi yêu thích: {group.favPlace}
                    </span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-3">
                  {group.moments.map((m, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, type: "spring" }}
                      className="flex gap-3">
                      {/* Timeline spine */}
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                          style={{ background: i === 0 ? group.color : "#E2E8F0", border: `2px solid ${i === 0 ? group.color : "#CBD5E1"}` }} />
                        {i < group.moments.length - 1 && (
                          <div className="w-px flex-1 mt-1" style={{ background: "#E2E8F0", minHeight: 32 }} />
                        )}
                      </div>
                      {/* Card */}
                      <motion.div whileHover={{ scale: 1.01 }}
                        className="flex-1 rounded-2xl overflow-hidden mb-1"
                        style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
                        <div className="relative h-[100px]">
                          <img src={m.img} alt={m.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,23,42,0.6), transparent)" }} />
                          <div className="absolute bottom-2 left-3">
                            <p className="text-[10px] font-semibold text-white/60">{m.date}</p>
                            <p className="text-[14px] font-black text-white">{m.title}</p>
                          </div>
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                            style={{ background: `${group.color}CC` }}>{m.mood}</span>
                        </div>
                        <div className="px-3 py-2 flex items-center gap-1">
                          <MapPin className="w-3 h-3" style={{ color: T3 }} />
                          <span className="text-[12px]" style={{ color: T2 }}>{m.place}</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                  {/* Add new */}
                  <div className="flex gap-3">
                    <div className="w-3 flex-shrink-0 flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full mt-2 border-2 border-dashed" style={{ borderColor: T3 }} />
                    </div>
                    <motion.button whileTap={{ scale: 0.97 }}
                      className="flex-1 rounded-2xl p-3 text-left"
                      style={{ background: "#F8FAFC", border: `1.5px dashed ${BORDER}` }}>
                      <span className="text-[13px]" style={{ color: T3 }}>+ Thêm kỷ niệm mới</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "stats" && (
              <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }} className="px-5">
                {/* Vibe Meter */}
                <div className="rounded-2xl p-5 mb-4 flex items-center gap-5"
                  style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
                  <div className="relative w-[80px] h-[80px] flex-shrink-0">
                    <svg width="80" height="80" className="transform -rotate-90">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="#E2E8F0" strokeWidth="6" />
                      <motion.circle cx="40" cy="40" r="34" fill="none" stroke={group.color} strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={213}
                        initial={{ strokeDashoffset: 213 }}
                        animate={{ strokeDashoffset: 213 - (group.vibeScore / 100) * 213 }}
                        transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 60 }} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[20px] font-black" style={{ color: T1 }}>{group.vibeScore}</span>
                      <span className="text-[8px] font-semibold uppercase" style={{ color: T3 }}>Vibe</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[16px] font-black mb-1" style={{ color: T1 }}>Nhóm {group.label}</h3>
                    <p className="text-[12px] leading-relaxed" style={{ color: T2 }}>
                      {group.vibeScore >= 90 ? "Vibe cực đỉnh! Nhóm luôn hào hứng đi chơi cùng nhau." : "Nhóm đang có năng lượng tốt. Tiếp tục duy trì nhé!"}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-3.5 h-3.5" style={{ color: group.color }} />
                      <span className="text-[11px] font-semibold" style={{ color: group.color }}>+8 điểm so với tháng trước</span>
                    </div>
                  </div>
                </div>

                {/* Detail stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: "Chuyến đi", value: group.stats.trips, icon: MapPin, suffix: "chuyến" },
                    { label: "Ảnh đã chụp", value: group.stats.photos, icon: Camera, suffix: "tấm" },
                    { label: "Địa điểm", value: group.stats.places, icon: Star, suffix: "nơi" },
                    { label: "Streak hiện tại", value: group.stats.streak, icon: Zap, suffix: "ngày" },
                  ].map((s, i) => (
                    <motion.div key={s.label}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07, type: "spring" }}
                      className="rounded-2xl p-4"
                      style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ background: group.colorDim }}>
                          <s.icon className="w-3.5 h-3.5" style={{ color: group.color }} />
                        </div>
                        <span className="text-[11px]" style={{ color: T3 }}>{s.label}</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[28px] font-black" style={{ color: T1 }}>{s.value}</span>
                        <span className="text-[12px]" style={{ color: T3 }}>{s.suffix}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Fav place */}
                <div className="rounded-2xl p-4"
                  style={{ background: group.colorDim, border: `1px solid ${group.color}25` }}>
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4" style={{ color: group.color }} />
                    <span className="text-[12px] font-bold" style={{ color: group.color }}>Địa điểm yêu thích</span>
                  </div>
                  <p className="text-[18px] font-black" style={{ color: T1 }}>{group.favPlace}</p>
                  <p className="text-[12px]" style={{ color: T2 }}>Đã ghé thăm nhiều nhất trong nhóm</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <div className="h-4" />
      <BottomNav />
    </div>
  );
}
