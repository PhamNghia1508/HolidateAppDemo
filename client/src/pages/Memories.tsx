import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import {
  Sparkles, Plus, Star, MapPin, Zap, Camera,
  Users, Heart, Home, BookOpen, TrendingUp, Image
} from "lucide-react";

const BLUE = "#C8371E";
const BLUE_BRIGHT = "#A62D17";
const T1 = "#1A0E07";
const T2 = "#5C4033";
const T3 = "#9C8470";
const SURF = "#F9F4EA";
const BORDER = "rgba(26,14,7,0.10)";
const SHADOW = "0 1px 3px rgba(26,14,7,0.06), 0 4px 16px rgba(26,14,7,0.06)";

const groups = [
  {
    id: "friends",
    label: "Bạn bè",
    icon: Users,
    color: "#C8371E",
    colorDim: "rgba(200,55,30,0.08)",
    emoji: "👥",
    coverImg: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=300&fit=crop",
    tagline: "Nhóm bạn thân",
    stats: { trips: 12, photos: 48, places: 23, streak: 5 },
    vibeScore: 92,
    favPlace: "Skyline Coffee",
    lastTrip: "2 ngày trước",
    members: ["N", "L", "M", "A"],
    recap: "Cả nhóm đã có 12 buổi đi chơi tuyệt vời. Quán hay nhất năm là Skyline Coffee — check-in ở đó tận 4 lần rồi!",
    mimiSay: "Mimi vui vì nhóm Bạn bè đã lưu 12 kỷ niệm 🌟",
    moments: [
      { date: "22/6", title: "Rooftop chill night", place: "Skyline Coffee", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=280&fit=crop", mood: "Chill" },
      { date: "15/6", title: "Food tour Quận 1", place: "Nhà Hàng Ngon", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=280&fit=crop", mood: "Ăn ngon" },
      { date: "8/6", title: "Picnic sáng chủ nhật", place: "Công viên Gia Định", img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=280&fit=crop", mood: "Nhẹ nhàng" },
    ],
    photos: [
      { url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=300&h=300&fit=crop", caption: "Cả nhóm 🎉", rot: -1.5 },
      { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=300&fit=crop", caption: "Rooftop vibes", rot: 1.2 },
      { url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=300&fit=crop", caption: "Food tour!", rot: -0.8 },
      { url: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=300&h=300&fit=crop", caption: "Dance night", rot: 1.8 },
      { url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=300&fit=crop", caption: "Picnic 🌿", rot: -1.2 },
      { url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=300&h=300&fit=crop", caption: "Party time", rot: 0.9 },
    ],
  },
  {
    id: "family",
    label: "Gia đình",
    icon: Home,
    color: "#F59E0B",
    colorDim: "rgba(245,158,11,0.08)",
    emoji: "🏠",
    coverImg: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&h=300&fit=crop",
    tagline: "Nhà mình",
    stats: { trips: 6, photos: 31, places: 10, streak: 2 },
    vibeScore: 88,
    favPlace: "Hội An",
    lastTrip: "2 tuần trước",
    members: ["B", "M", "D"],
    recap: "6 chuyến gia đình đáng nhớ trong năm. Chuyến Hội An tháng trước là kỷ niệm đẹp nhất — cả nhà cùng mặc áo dài chụp hình.",
    mimiSay: "Mimi thấy gia đình mình ấm áp lắm 🏡",
    moments: [
      { date: "10/6", title: "Hội An 2 ngày", place: "Phố cổ Hội An", img: "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=400&h=280&fit=crop", mood: "Ấm áp" },
      { date: "4/5", title: "Sinh nhật ba", place: "Nhà hàng Hoàng Ty", img: "https://images.unsplash.com/photo-1464349095431-e9a21285b19c?w=400&h=280&fit=crop", mood: "Vui vẻ" },
    ],
    photos: [
      { url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300&h=300&fit=crop", caption: "Hội An 💛", rot: 1.5 },
      { url: "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=300&h=300&fit=crop", caption: "Phố cổ", rot: -1.0 },
      { url: "https://images.unsplash.com/photo-1464349095431-e9a21285b19c?w=300&h=300&fit=crop", caption: "Sinh nhật ba", rot: 1.8 },
      { url: "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=300&h=300&fit=crop", caption: "Cả nhà ♥️", rot: -0.7 },
    ],
  },
  {
    id: "couple",
    label: "Couple",
    icon: Heart,
    color: "#EC4899",
    colorDim: "rgba(236,72,153,0.08)",
    emoji: "💑",
    coverImg: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=300&fit=crop",
    tagline: "Hai đứa mình",
    stats: { trips: 9, photos: 67, places: 16, streak: 7 },
    vibeScore: 97,
    favPlace: "Đà Lạt",
    lastTrip: "5 ngày trước",
    members: ["N", "T"],
    recap: "9 chuyến đi đôi — mỗi chuyến là một trang nhật ký mới. Đà Lạt luôn là nơi hai đứa quay lại nhiều nhất.",
    mimiSay: "Mimi thấy bạn đang hạnh phúc lắm 💖",
    moments: [
      { date: "19/6", title: "Đà Lạt cuối tuần", place: "Đà Lạt", img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=280&fit=crop", mood: "Lãng mạn" },
      { date: "5/6", title: "Sunset cruise", place: "Sông Sài Gòn", img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=280&fit=crop", mood: "Bình yên" },
      { date: "20/5", title: "Anniversary dinner", place: "The Deck", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=280&fit=crop", mood: "Special ✨" },
    ],
    photos: [
      { url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=300&fit=crop", caption: "Đà Lạt 🌸", rot: -2.0 },
      { url: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=300&h=300&fit=crop", caption: "Sunset 🌅", rot: 1.5 },
      { url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=300&fit=crop", caption: "Anniversary", rot: -1.3 },
      { url: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=300&h=300&fit=crop", caption: "Hai đứa 💑", rot: 1.8 },
      { url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300&h=300&fit=crop", caption: "Date night", rot: -0.9 },
    ],
  },
];

const S = (i: number) => ({ delay: i * 0.06, type: "spring" as const, stiffness: 420, damping: 32 });

// Polaroid-style photo component
function PolaroidPhoto({
  url, caption, rotation, delay, color,
}: {
  url: string; caption: string; rotation: number; delay: number; color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, rotate: rotation * 0.5 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 22 }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
      whileTap={{ scale: 0.96 }}
      className="relative cursor-pointer"
      style={{ zIndex: 1 }}>
      <div className="bg-white p-1.5 pb-5 rounded-sm"
        style={{
          boxShadow: "0 4px 16px rgba(0,0,0,0.13), 0 1px 3px rgba(0,0,0,0.08)",
        }}>
        <div className="aspect-square overflow-hidden rounded-sm">
          <img src={url} alt={caption} className="w-full h-full object-cover" />
        </div>
        <p className="text-[9px] font-semibold text-center mt-1 px-1 truncate"
          style={{ color: T2, fontFamily: "'Patrick Hand', cursive, sans-serif" }}>
          {caption}
        </p>
      </div>
    </motion.div>
  );
}

export default function Memories() {
  const [, setLocation] = useLocation();
  const [activeGroup, setActiveGroup] = useState("friends");
  const [activeTab, setActiveTab] = useState<"photos" | "moments" | "stats">("photos");

  const group = groups.find(g => g.id === activeGroup)!;

  return (
    <div className="flex-1 overflow-y-auto pb-20 relative" style={{ background: "#EEE6D4" }}>

      {/* Header */}
      <div className="px-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(0)} className="pt-6 mb-4">
          <div className="page-label mb-1">Kỷ niệm</div>
          <div className="flex items-center justify-between">
            <h1 className="text-[28px] font-black tracking-tight" style={{ color: T1 }}>Memory Vault</h1>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setLocation("/photobooth")}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold text-[13px] premium-cta-mint">
              <Camera className="w-3.5 h-3.5" /> Thêm ảnh
            </motion.button>
          </div>
        </motion.div>

        {/* Group Selector — pills, not full-fill buttons */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={S(1)}
          className="flex gap-2 mb-5">
          {groups.map((g) => {
            const isActive = activeGroup === g.id;
            return (
              <motion.button key={g.id} whileTap={{ scale: 0.94 }}
                onClick={() => { setActiveGroup(g.id); setActiveTab("photos"); }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl relative overflow-hidden"
                style={{
                  background: isActive ? `${g.color}12` : SURF,
                  border: `1.5px solid ${isActive ? g.color : BORDER}`,
                  boxShadow: isActive ? `0 0 0 3px ${g.color}12` : SHADOW,
                  transition: "all 0.22s ease",
                }}>
                <span className="text-[16px]">{g.emoji}</span>
                <span className="text-[12px] font-bold" style={{ color: isActive ? g.color : T2 }}>{g.label}</span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Group Content */}
      <AnimatePresence mode="wait">
        <motion.div key={activeGroup}
          initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}>

          {/* Cover — editorial hero */}
          <div className="relative h-[190px] mx-5 rounded-3xl overflow-hidden mb-4"
            style={{ boxShadow: "0 6px 32px rgba(0,0,0,0.14)" }}>
            <img src={group.coverImg} alt={group.label} className="w-full h-full object-cover" />
            <div className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${group.color}E0 0%, ${group.color}55 55%, transparent 100%)` }} />
            {/* Vibe score chip — top right */}
            <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.30)" }}>
              <span className="text-[12px] font-black text-white">Vibe {group.vibeScore}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-0.5">{group.tagline}</p>
                  <h2 className="text-[22px] font-black text-white leading-tight">{group.label}</h2>
                  <p className="text-white/60 text-[11px] mt-0.5">
                    {group.stats.trips} chuyến · {group.stats.photos} ảnh · lần cuối {group.lastTrip}
                  </p>
                </div>
                <div className="flex -space-x-2">
                  {group.members.map((m, i) => (
                    <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white"
                      style={{ background: `${group.color}CC`, border: "2px solid rgba(255,255,255,0.60)" }}>{m}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mimi bubble — cross-app mascot */}
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, type: "spring" }}
            className="flex items-center gap-2.5 rounded-2xl mx-5 px-3.5 py-2.5 mb-4"
            style={{ background: `${group.color}08`, border: `1px solid ${group.color}18` }}>
            <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
              className="text-[18px] flex-shrink-0">🐾</motion.span>
            <p className="text-[12px] font-medium" style={{ color: group.color }}>{group.mimiSay}</p>
          </motion.div>

          {/* Sub-tab — compact pill style */}
          <div className="flex gap-1.5 px-5 mb-4">
            {(["photos", "moments", "stats"] as const).map((tab) => {
              const labels: Record<string, string> = { photos: "📸 Ảnh", moments: "✨ Timeline", stats: "📊 Vibe" };
              const isActive = activeTab === tab;
              return (
                <motion.button key={tab} onClick={() => setActiveTab(tab)}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-2 rounded-xl text-[12px] font-semibold"
                  style={{
                    background: isActive ? group.color : "#F1F5F9",
                    color: isActive ? "#fff" : T2,
                    border: `1px solid ${isActive ? group.color : BORDER}`,
                    boxShadow: isActive ? `0 2px 12px ${group.color}30` : "none",
                    transition: "all 0.18s ease",
                  }}>
                  {labels[tab]}
                </motion.button>
              );
            })}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">

            {/* PHOTOS — Polaroid grid */}
            {activeTab === "photos" && (
              <motion.div key="photos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }} className="px-5">
                {/* Featured first photo — larger */}
                {group.photos[0] && (
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative mb-3 cursor-pointer"
                    style={{ rotate: `${group.photos[0].rot}deg` }}>
                    <div className="bg-white p-2 pb-6 rounded-sm"
                      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15), 0 2px 6px rgba(0,0,0,0.10)" }}>
                      <div className="w-full h-[170px] rounded-sm overflow-hidden">
                        <img src={group.photos[0].url} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex items-center justify-between px-1 mt-1.5">
                        <p className="text-[11px] font-semibold" style={{ color: T2 }}>{group.photos[0].caption}</p>
                        <div className="px-2 py-0.5 rounded-full text-[9px] font-bold"
                          style={{ background: `${group.color}15`, color: group.color }}>Best shot</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Polaroid grid — remaining photos */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {group.photos.slice(1).map((photo, i) => (
                    <PolaroidPhoto key={i} url={photo.url} caption={photo.caption}
                      rotation={photo.rot} delay={0.05 + i * 0.06} color={group.color} />
                  ))}
                  {/* Add button */}
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    onClick={() => setLocation("/photobooth")}
                    className="aspect-square rounded-sm flex flex-col items-center justify-center gap-1 cursor-pointer bg-white"
                    style={{
                      border: `2px dashed ${group.color}50`,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    }}>
                    <Plus className="w-5 h-5" style={{ color: group.color }} />
                    <span className="text-[9px] font-semibold" style={{ color: group.color }}>Thêm</span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* MOMENTS — editorial timeline */}
            {activeTab === "moments" && (
              <motion.div key="moments" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }} className="px-5">
                {/* AI Recap */}
                <div className="rounded-2xl p-4 mb-4"
                  style={{ background: `${group.color}08`, border: `1px solid ${group.color}20` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                      <Sparkles className="w-4 h-4" style={{ color: group.color }} />
                    </motion.div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white" style={{ color: group.color }}>AI recap</span>
                  </div>
                  <p className="text-[13px] leading-relaxed" style={{ color: T1 }}>{group.recap}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-3.5 h-3.5" style={{ color: group.color }} />
                    <span className="text-[11px] font-bold" style={{ color: group.color }}>Nơi yêu thích: {group.favPlace}</span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-0">
                  {group.moments.map((m, i) => (
                    <div key={i} className="flex gap-3">
                      {/* Spine */}
                      <div className="flex flex-col items-center w-8 flex-shrink-0">
                        <motion.div
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          transition={{ delay: 0.15 + i * 0.1, type: "spring" }}
                          className="w-4 h-4 rounded-full flex items-center justify-center mt-2 flex-shrink-0 z-10"
                          style={{
                            background: i === 0 ? group.color : "#E2E8F0",
                            border: `2px solid ${i === 0 ? "white" : "#CBD5E1"}`,
                            boxShadow: i === 0 ? `0 0 0 3px ${group.color}25` : "none",
                          }}>
                          {i === 0 && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </motion.div>
                        {i < group.moments.length - 1 && (
                          <div className="w-px flex-1 mt-1 mb-1" style={{ background: "#E2E8F0", minHeight: 24 }} />
                        )}
                      </div>
                      {/* Memory card */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.1, type: "spring" }}
                        whileHover={{ scale: 1.01 }}
                        className="flex-1 rounded-2xl overflow-hidden mb-3"
                        style={{
                          background: SURF,
                          border: `1px solid ${i === 0 ? `${group.color}25` : BORDER}`,
                          boxShadow: i === 0 ? `0 2px 12px ${group.color}15` : SHADOW,
                        }}>
                        <div className="relative h-[105px]">
                          <img src={m.img} alt={m.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0"
                            style={{ background: "linear-gradient(to right, rgba(26,14,7,0.55), transparent)" }} />
                          <div className="absolute bottom-2.5 left-3">
                            <p className="text-[10px] font-semibold text-white/55">{m.date}</p>
                            <p className="text-[15px] font-black text-white leading-tight">{m.title}</p>
                          </div>
                          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                            style={{ background: `${group.color}CC`, backdropFilter: "blur(8px)" }}>{m.mood}</span>
                        </div>
                        <div className="px-3 py-2 flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: T3 }} />
                          <span className="text-[12px]" style={{ color: T2 }}>{m.place}</span>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                  {/* Add new */}
                  <div className="flex gap-3">
                    <div className="w-8 flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full mt-2 border-2 border-dashed flex-shrink-0"
                        style={{ borderColor: T3 }} />
                    </div>
                    <motion.button whileTap={{ scale: 0.97 }}
                      className="flex-1 rounded-2xl p-3 text-left mb-3"
                      style={{ background: "#EDE3D0", border: `1.5px dashed ${BORDER}` }}>
                      <span className="text-[13px]" style={{ color: T3 }}>+ Thêm kỷ niệm mới</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STATS — vibe dashboard */}
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
                        strokeLinecap="round" strokeDasharray={213} initial={{ strokeDashoffset: 213 }}
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
                      {group.vibeScore >= 90 ? "Vibe cực đỉnh! Nhóm luôn hào hứng đi chơi." : "Nhóm đang có năng lượng tốt. Tiếp tục nhé!"}
                    </p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <TrendingUp className="w-3.5 h-3.5" style={{ color: group.color }} />
                      <span className="text-[11px] font-semibold" style={{ color: group.color }}>+8 điểm so với tháng trước</span>
                    </div>
                  </div>
                </div>

                {/* Stats grid */}
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
                          style={{ background: `${group.color}10` }}>
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

                <div className="rounded-2xl p-4 mb-2"
                  style={{ background: `${group.color}08`, border: `1px solid ${group.color}20` }}>
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
