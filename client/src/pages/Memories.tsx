import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { triggerHaptic } from "@/components/premium/ParticleEffects";
import {
  Sparkle, Plus, Star, MapPin, Lightning, Camera,
  Users, Heart, House, BookOpen, TrendUp, PawPrint, FolderDashed, PlayCircle, Trophy, Receipt, X
} from "@phosphor-icons/react";
import { EmptyState } from "@/components/premium/EmptyState";

const groups = [
  {
    id: "friends",
    label: "Bạn bè",
    icon: Users,
    color: "#C8371E",
    colorDim: "rgba(200,55,30,0.08)",
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
      { url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=900&h=1600&fit=crop", caption: "Cả nhóm 🎉", rot: -1.5 },
      { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&h=1600&fit=crop", caption: "Rooftop vibes", rot: 1.2 },
      { url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&h=1600&fit=crop", caption: "Food tour!", rot: -0.8 },
      { url: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=900&h=1600&fit=crop", caption: "Dance night", rot: 1.8 },
      { url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&h=1600&fit=crop", caption: "Picnic 🌿", rot: -1.2 },
      { url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=900&h=1600&fit=crop", caption: "Party time", rot: 0.9 },
    ],
    awards: [
      { title: "Đại Sứ Cao Su", winner: "An", reason: "Luôn 'đang tới' trong suốt 3 tiếng", icon: "🐢", color: "bg-amber-100 text-amber-700 border-amber-200" },
      { title: "Đại Gia Bao Nuôi", winner: "Linh", reason: "Trả tiền 80% các chầu", icon: "💸", color: "bg-green-100 text-green-700 border-green-200" },
      { title: "Phó Nháy Quốc Dân", winner: "Minh", reason: "Chụp 100 tấm, xài được 1 tấm", icon: "📸", color: "bg-pink-100 text-pink-700 border-pink-200" },
    ],
    expenses: {
      total: "2,500,000đ", average: "625,000đ",
      transactions: [
        { type: "nhận", person: "Linh", initials: "L", amount: "+375,000đ", color: "green" },
        { type: "nhận", person: "Goo", initials: "G", amount: "+875,000đ", color: "green" },
        { type: "trả", person: "An", initials: "A", amount: "-625,000đ", color: "red" },
        { type: "trả", person: "Minh", initials: "M", amount: "-625,000đ", color: "red" },
      ]
    }
  },
  {
    id: "family",
    label: "Gia đình",
    icon: House,
    color: "#F59E0B",
    colorDim: "rgba(245,158,11,0.08)",
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
      { url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=900&h=1600&fit=crop", caption: "Hội An 💛", rot: 1.5 },
      { url: "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=900&h=1600&fit=crop", caption: "Phố cổ", rot: -1.0 },
      { url: "https://images.unsplash.com/photo-1464349095431-e9a21285b19c?w=900&h=1600&fit=crop", caption: "Sinh nhật ba", rot: 1.8 },
      { url: "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=900&h=1600&fit=crop", caption: "Cả nhà ♥️", rot: -0.7 },
    ],
    awards: [
      { title: "Đầu Bếp Gia Đình", winner: "Mẹ", reason: "Nấu 5 bữa trong 2 ngày", icon: "👩‍🍳", color: "bg-rose-100 text-rose-700 border-rose-200" },
      { title: "Ngân Hàng Trưởng", winner: "Ba", reason: "Tài trợ 100% chuyến đi", icon: "🏦", color: "bg-blue-100 text-blue-700 border-blue-200" },
      { title: "Thánh Ăn Vặt", winner: "Dũng", reason: "Mỗi tiếng ăn một lần", icon: "🍕", color: "bg-orange-100 text-orange-700 border-orange-200" },
    ],
    expenses: {
      total: "8,500,000đ", average: "Miễn phí",
      transactions: [
        { type: "trả", person: "Ba", initials: "B", amount: "-8,500,000đ", color: "red" },
        { type: "nhận", person: "Mẹ", initials: "M", amount: "Được đài thọ", color: "green" },
        { type: "nhận", person: "Dũng", initials: "D", amount: "Được đài thọ", color: "green" },
      ]
    }
  },
  {
    id: "couple",
    label: "Couple",
    icon: Heart,
    color: "#EC4899",
    colorDim: "rgba(236,72,153,0.08)",
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
      { url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=900&h=1600&fit=crop", caption: "Đà Lạt 🌸", rot: -2.0 },
      { url: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&h=1600&fit=crop", caption: "Sunset 🌅", rot: 1.5 },
      { url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&h=1600&fit=crop", caption: "Anniversary", rot: -1.3 },
      { url: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=900&h=1600&fit=crop", caption: "Hai đứa 💑", rot: 1.8 },
      { url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=900&h=1600&fit=crop", caption: "Date night", rot: -0.9 },
    ],
    awards: [
      { title: "Nữ Hoàng Sống Ảo", winner: "T", reason: "Thay 8 bộ đồ trong 1 ngày", icon: "👗", color: "bg-purple-100 text-purple-700 border-purple-200" },
      { title: "Chuyên Gia Bê Đồ", winner: "N", reason: "Xách 3 cái túi to", icon: "🛍️", color: "bg-slate-200 text-slate-700 border-slate-300" },
    ],
    expenses: {
      total: "4,200,000đ", average: "2,100,000đ",
      transactions: [
        { type: "trả", person: "N", initials: "N", amount: "-3,000,000đ", color: "red" },
        { type: "trả", person: "T", initials: "T", amount: "-1,200,000đ", color: "red" },
        { type: "nhận", person: "N", initials: "N", amount: "Trả lại 900k", color: "green" }
      ]
    }
  },
  {
    id: "company",
    label: "Công ty",
    icon: Users,
    color: "#3D6B4F",
    colorDim: "rgba(61,107,79,0.08)",
    coverImg: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=300&fit=crop",
    tagline: "Team Building",
    stats: { trips: 0, photos: 0, places: 0, streak: 0 },
    vibeScore: 0,
    favPlace: "Chưa có",
    lastTrip: "Chưa đi",
    members: ["T", "H", "K"],
    recap: "Nhóm Đồng nghiệp mới được tạo. Hãy lên kế hoạch cho chuyến đi đầu tiên để lưu giữ kỷ niệm nhé!",
    mimiSay: "Mimi đang chờ đón chuyến đi đầu tiên của team! 🚀",
    moments: [],
    photos: [],
    awards: [],
    expenses: { total: "0đ", average: "0đ", transactions: [] }
  },
];

const S = (i: number) => ({ delay: i * 0.06, type: "spring" as const, stiffness: 420, damping: 32 });

function PolaroidPhoto({
  url, caption, delay, color, rot = 0
}: {
  url: string; caption: string; delay: number; color: string; rot?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rot * 3 }}
      whileInView={{ opacity: 1, scale: 1, rotate: rot }} viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: delay % 0.4, type: "spring", stiffness: 300, damping: 22 }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10, filter: `drop-shadow(0 20px 13px rgb(0 0 0 / 0.15))` }}
      whileFocus={{ scale: 1.05, rotate: 0, zIndex: 10, outline: '2px solid #EC4899', outlineOffset: '4px' }}
      whileTap={{ scale: 0.98 }}
      drag
      dragConstraints={{ left: -10, right: 10, top: -10, bottom: 10 }}
      tabIndex={0}
      role="button"
      aria-label={`View photo: ${caption}`}
      className="relative cursor-grab active:cursor-grabbing group touch-none focus:outline-none"
      style={{ zIndex: 1 }}
    >
      <div className="bg-[#FAFAFA] p-2 pb-8 sm:p-3 sm:pb-10 shadow-[0_2px_10px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.05)] h-full flex flex-col border border-black/5 transform-gpu">
        <div className="aspect-square overflow-hidden bg-slate-200">
          <img src={url} alt={caption} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        </div>
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center pointer-events-none">
          <p className="text-[11px] sm:text-xs font-serif text-center text-slate-700 leading-tight tracking-wide mix-blend-multiply opacity-80" style={{ transform: 'rotate(-2deg)' }}>
            {caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Memories() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialGroup = searchParams.get("group") || "friends";
  const [activeGroup, setActiveGroup] = useState(initialGroup);
  const [activeTab, setActiveTab] = useState<"photos" | "moments" | "awards" | "expenses" | "stats">("photos");
  const [localPhotos, setLocalPhotos] = useState<any[]>([]);
  const [playingReel, setPlayingReel] = useState(false);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("gathergo_photos") || "[]");
      setLocalPhotos(stored);
    } catch (e) {}
  }, []);

  const baseGroup = groups.find(g => g.id === activeGroup)!;
  
  const groupLocalPhotos = localPhotos.filter(p => p.group === activeGroup).map(p => ({
    url: p.url,
    caption: "New Memory ✨",
    rot: (Math.random() - 0.5) * 4
  }));

  const group = {
    ...baseGroup,
    photos: [...groupLocalPhotos, ...baseGroup.photos],
    stats: {
      ...baseGroup.stats,
      photos: baseGroup.stats.photos + groupLocalPhotos.length
    }
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollRef });
  
  const coverY = useTransform(scrollY, [0, 300], [0, 150]);
  const coverOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  // Handle Reel Playback
  useEffect(() => {
    let timer: any;
    if (playingReel && group.photos.length > 0) {
      timer = setInterval(() => {
        setCurrentReelIndex((prev) => (prev + 1) % group.photos.length);
      }, 2500); // Change photo every 2.5s
    }
    return () => clearInterval(timer);
  }, [playingReel, group.photos.length]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto pb-24 relative">

      {/* Header */}
      <div className="px-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(0)} className="pt-8 mb-8">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-[36px] text-slate-900 leading-tight">Album<br/>Kỷ Niệm</h1>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setLocation("/photobooth")}
              className="flex items-center gap-2 px-5 py-3 rounded-full text-[12px] font-bold tracking-[0.1em] uppercase text-white bg-slate-900 hover:bg-wi-primary transition-colors">
              <Camera className="w-4 h-4" weight="bold" /> Thêm
            </motion.button>
          </div>
        </motion.div>

        {/* Group Selector */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={S(1)}
          className="flex gap-4 mb-8 overflow-x-auto pb-2 no-scrollbar">
          {groups.map((g) => {
            const isActive = activeGroup === g.id;
            return (
              <motion.button key={g.id} whileTap={{ scale: 0.94 }}
                onClick={() => { 
                  triggerHaptic(15);
                  setActiveGroup(g.id); 
                  setActiveTab("photos"); 
                }}
                className={`flex items-center justify-center gap-2 pb-2 relative whitespace-nowrap transition-colors`}>
                <span className={`text-[14px] font-bold tracking-wide uppercase z-10 ${isActive ? "text-slate-900" : "text-slate-400"}`}>{g.label}</span>
                {isActive && (
                  <motion.div layoutId="activeGroup" className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900" />
                )}
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
          <div className="relative w-full h-[480px] overflow-hidden mb-8 group cursor-pointer">
            {/* Dynamic Aura Blur */}
            <div className="absolute inset-0 opacity-80 blur-3xl scale-125 pointer-events-none" style={{ backgroundColor: group.colorDim }} />
            
            <motion.div
              style={{ y: coverY, opacity: coverOpacity }}
              className="w-full h-full absolute inset-0 origin-top"
            >
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={group.coverImg} alt={group.label} className="w-full h-full object-cover" 
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70 pointer-events-none" />
            
            {/* Vibe score chip — top right */}
            <div className="absolute top-5 right-5 px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/40 text-white rounded-lg shadow-sm flex items-center gap-2">
              <Sparkle weight="fill" className="text-yellow-300 w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em]">Vibe Score: {group.vibeScore}</span>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/80 font-bold text-[11px] uppercase tracking-[0.2em] mb-2">{group.tagline}</p>
                  <h2 className="text-[48px] font-serif text-white leading-none tracking-tight mb-3">{group.label}</h2>
                  <p className="text-white/90 text-[14px] font-serif italic">
                    {group.stats.trips} chuyến · {group.stats.photos} ảnh · lần cuối {group.lastTrip}
                  </p>
                </div>
                <div className="flex -space-x-3">
                  {group.members.map((m, i) => (
                    <div key={i} className="w-12 h-12 rounded-full flex items-center justify-center text-[16px] font-serif text-slate-900 bg-white border-2 border-white shadow-md">
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, type: "spring" }}
            className="mx-6 mb-10 pt-4 pb-6 border-b border-slate-200 flex gap-4 items-start">
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
              <PawPrint className="w-5 h-5 text-slate-300" weight="light" />
            </div>
            <div>
              <p className="text-sm font-serif italic text-slate-800 leading-relaxed">"{group.mimiSay}"</p>
            </div>
          </motion.div>

          {/* Sub-tab */}
          <div className="flex gap-6 px-6 mb-8 border-b border-slate-100 overflow-x-auto no-scrollbar">
            {(["photos", "moments", "awards", "expenses", "stats"] as const).map((tab) => {
              const labels: Record<string, string> = { photos: "Bộ Sưu Tập", moments: "Dòng Thời Gian", awards: "Trao Giải", expenses: "Chi Phí", stats: "Thống Kê" };
              const isActive = activeTab === tab;
              return (
                <motion.button key={tab} onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-[12px] whitespace-nowrap font-bold tracking-[0.1em] uppercase transition-colors relative ${
                    isActive ? "text-slate-900" : "text-slate-400"
                  }`}>
                  {labels[tab]}
                  {isActive && <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-slate-900" />}
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
                {group.photos.length === 0 ? (
                  <EmptyState 
                    icon={<Camera className="w-8 h-8 text-slate-400" strokeWidth={1} />}
                    title="Chưa có ảnh nào"
                    description="Kỷ niệm đẹp đáng được lưu giữ. Hãy tải lên những bức ảnh của nhóm nhé!"
                    actionLabel="Đăng ảnh mới"
                    onAction={() => setLocation("/photobooth")}
                  />
                ) : (
                  <>
                    {/* Featured first photo — larger */}
                    {group.photos[0] && (
                      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative mb-6 cursor-pointer group"
                        onClick={() => {
                          setCurrentReelIndex(0);
                          setPlayingReel(true);
                        }}
                      >
                        <div className="rounded-none border border-slate-200 bg-white shadow-sm">
                          <div className="w-full h-[260px] overflow-hidden relative">
                            <img src={group.photos[0].url} alt="" className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                              <motion.div whileHover={{ scale: 1.1 }} className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white">
                                <PlayCircle className="w-8 h-8" weight="fill" />
                              </motion.div>
                            </div>
                          </div>
                          <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
                            <p className="text-lg font-serif italic text-slate-900">Xem Auto Reel Kỷ Niệm</p>
                            <div className="px-3 py-1 rounded-none text-xs font-bold bg-slate-900 text-white uppercase tracking-widest">PLAY</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {/* Masonry Polaroid grid */}
                    <div className="columns-2 gap-4 mb-4 space-y-4">
                      {group.photos.slice(1).map((photo, i) => (
                        <div key={i} className="break-inside-avoid">
                          <PolaroidPhoto 
                            url={photo.url} 
                            caption={photo.caption}
                            delay={0.05 + i * 0.06} 
                            color={group.color} 
                            rot={(i % 2 === 0 ? 1 : -1) * (1 + Math.random())} 
                          />
                        </div>
                      ))}
                      {/* Add button */}
                      <div className="break-inside-avoid">
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          onClick={() => setLocation("/photobooth")}
                          className="w-full aspect-square rounded-none flex flex-col items-center justify-center gap-1.5 cursor-pointer bg-slate-50 transition-colors hover:bg-slate-100"
                          style={{ border: `1px solid ${group.color}50` }}>
                          <Plus className="w-6 h-6" weight="light" style={{ color: group.color }} />
                          <span className="text-xs font-serif italic" style={{ color: group.color }}>Thêm</span>
                        </motion.button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* MOMENTS — editorial timeline */}
            {activeTab === "moments" && (
              <motion.div key="moments" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }} className="px-5">
                
                {group.moments.length === 0 ? (
                  <EmptyState 
                    icon={<FolderDashed className="w-8 h-8 text-slate-400" strokeWidth={1} />}
                    title="Chưa có chuyến đi"
                    description="Thanh xuân như một tách trà, không đi chơi cùng nhóm thì phí hoài thanh xuân."
                    actionLabel="Tạo lịch trình"
                    onAction={() => setLocation("/create-plan")}
                  />
                ) : (
                  <>
                    {/* Timeline */}
                    <div className="space-y-0 relative pl-6">
                      <div className="absolute top-0 bottom-0 left-[11px] w-[2px] bg-slate-100" />
                      <motion.div 
                        className="absolute top-0 left-[11px] w-[2px] rounded-full" 
                        style={{ backgroundColor: group.color, filter: `drop-shadow(0 0 6px ${group.color})` }}
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                      {group.moments.map((m, i) => (
                        <div key={i} className="flex gap-4 relative z-10">
                          {/* Spine */}
                          <div className="flex flex-col items-center w-8 flex-shrink-0 absolute -left-[30px]">
                            <motion.div
                              initial={{ scale: 0 }} whileInView={{ scale: [0, 1.2, 1] }} viewport={{ once: true }}
                              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                              className="w-4 h-4 rounded-full flex items-center justify-center mt-3 flex-shrink-0 z-10 bg-white border-2"
                              style={{ borderColor: group.color, boxShadow: `0 0 12px ${group.color}40` }}
                            >
                              <motion.div 
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: group.color }}
                                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                              />
                            </motion.div>
                          </div>
                          {/* Memory editorial block */}
                          <motion.div
                            initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }}
                            transition={{ delay: 0.1, type: "spring" }}
                            whileHover={{ scale: 1.02 }}
                            className="flex-1 mb-8 cursor-pointer group">
                            
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{m.date}</p>
                            <h3 className="font-serif text-[24px] text-slate-900 leading-tight mb-3 group-hover:text-wi-primary transition-colors">{m.title}</h3>
                            
                            <div className="relative w-full h-[200px] overflow-hidden mb-3">
                              <img src={m.img} alt={m.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 flex-shrink-0 text-wi-primary" weight="light" />
                                <span className="text-[13px] font-serif italic text-slate-600">{m.place}</span>
                              </div>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border border-slate-200 px-2 py-0.5">{m.mood}</span>
                            </div>
                          </motion.div>
                        </div>
                      ))}
                      {/* Add new */}
                      <div className="flex gap-4 pt-2">
                        <motion.button whileTap={{ scale: 0.97 }}
                          onClick={() => setLocation("/create-plan")}
                          className="flex-1 rounded-none p-4 text-center mb-4 bg-slate-50 border border-dashed border-slate-300 hover:border-slate-900 hover:bg-slate-100 transition-colors">
                          <span className="text-xs font-serif italic text-slate-500 uppercase tracking-widest">+ Thêm kỷ niệm mới</span>
                        </motion.button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* AWARDS — Gamification Post-trip */}
            {activeTab === "awards" && (
              <motion.div key="awards" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }} className="px-5">
                
                <div className="mb-6 text-center">
                  <h3 className="font-serif text-2xl text-slate-900">Lễ Trao Giải {group.label}</h3>
                  <p className="text-sm text-slate-500 italic font-serif">Ai là người ấn tượng nhất chuyến đi?</p>
                </div>

                <div className="space-y-4">
                  {group.awards && group.awards.length > 0 ? (
                    group.awards.map((award: any, i: number) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15, type: "spring" }}
                        whileHover={{ scale: 1.02 }}
                        className={`relative p-5 rounded-2xl border ${award.color} overflow-hidden shadow-sm`}
                      >
                        {/* Confetti Deco */}
                        <div className="absolute -right-4 -top-4 text-5xl opacity-20 rotate-12">{award.icon}</div>
                        
                        <div className="flex items-center gap-4 relative z-10">
                          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm flex-shrink-0">
                            {award.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Trophy className="w-4 h-4" weight="fill" />
                              <h4 className="font-bold uppercase tracking-wider text-xs">{award.title}</h4>
                            </div>
                            <p className="font-serif text-2xl leading-none mb-1 text-slate-900">{award.winner}</p>
                            <p className="text-xs font-serif italic opacity-80">"{award.reason}"</p>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <EmptyState
                      icon={<Trophy className="w-8 h-8 text-slate-400" />}
                      title="Chưa có giải thưởng"
                      description="Hãy tạo giải thưởng đầu tiên cho nhóm nhé."
                      actionLabel="Tạo Ngay"
                    />
                  )}
                </div>

                <motion.button whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-slate-900/20">
                  Tạo Danh Hiệu Mới
                </motion.button>
              </motion.div>
            )}

            {/* EXPENSES — Smart Bill Splitter Receipt */}
            {activeTab === "expenses" && (
              <motion.div key="expenses" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }} className="px-5 pb-8">
                
                <div className="relative bg-[#FFFAF0] border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.05)] mx-auto max-w-[320px]">
                  {/* Receipt Zigzag Top */}
                  <div className="absolute top-0 left-0 right-0 h-2 w-full flex" style={{ background: "linear-gradient(-45deg, transparent 33.33%, #FFFAF0 33.33%, #FFFAF0 66.66%, transparent 66.66%), linear-gradient(45deg, transparent 33.33%, #FFFAF0 33.33%, #FFFAF0 66.66%, transparent 66.66%)", backgroundSize: "8px 16px", transform: "translateY(-100%)" }}></div>

                  <div className="p-6">
                    <div className="text-center mb-6 border-b-2 border-dashed border-slate-300 pb-5">
                      <Receipt className="w-8 h-8 mx-auto text-slate-900 mb-2" weight="light" />
                      <h2 className="font-mono text-xl font-bold uppercase text-slate-900 tracking-widest">GatherGo</h2>
                      <p className="font-mono text-[10px] text-slate-500 uppercase mt-1">Receipt - Smart Split</p>
                      <p className="font-mono text-[10px] text-slate-500 uppercase mt-1">Date: 27/06/2026</p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between font-mono text-xs">
                        <span className="text-slate-500 uppercase">Tổng chi</span>
                        <span className="font-bold text-slate-900">{group.expenses?.total || "0đ"}</span>
                      </div>
                      <div className="flex justify-between font-mono text-xs">
                        <span className="text-slate-500 uppercase">Bình quân/người</span>
                        <span className="font-bold text-slate-900">{group.expenses?.average || "0đ"}</span>
                      </div>
                    </div>

                    <div className="border-t-2 border-dashed border-slate-300 pt-5 space-y-4">
                      <p className="font-mono text-xs font-bold text-slate-900 uppercase text-center mb-4">Thanh Toán</p>
                      
                      {group.expenses?.transactions?.map((tx: any, i: number) => (
                        <div key={i} className={`flex justify-between items-center bg-${tx.color}-50/50 p-2 border border-${tx.color}-100`}>
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full bg-${tx.color}-200 text-${tx.color}-700 flex items-center justify-center font-bold text-[10px]`}>
                              {tx.initials}
                            </div>
                            <span className="font-mono text-xs text-slate-700">{tx.person} {tx.type}</span>
                          </div>
                          <span className={`font-mono font-bold text-${tx.color}-600`}>{tx.amount}</span>
                        </div>
                      ))}
                      
                      {(!group.expenses?.transactions || group.expenses.transactions.length === 0) && (
                        <div className="text-center py-4 text-xs font-mono text-slate-400">Không có giao dịch nào.</div>
                      )}
                    </div>

                    <div className="mt-8 text-center">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="QR" className="w-16 h-16 mx-auto opacity-50 grayscale mix-blend-multiply mb-2" />
                      <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">Quét để trả tiền</p>
                    </div>
                  </div>

                  {/* Receipt Zigzag Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-2 w-full flex" style={{ background: "linear-gradient(135deg, transparent 33.33%, #FFFAF0 33.33%, #FFFAF0 66.66%, transparent 66.66%), linear-gradient(-135deg, transparent 33.33%, #FFFAF0 33.33%, #FFFAF0 66.66%, transparent 66.66%)", backgroundSize: "8px 16px", transform: "translateY(100%)" }}></div>
                </div>

                <div className="mt-10 flex gap-3">
                  <button className="flex-1 py-3 border border-slate-300 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-700 hover:bg-slate-100">Sửa Bill</button>
                  <button className="flex-1 py-3 bg-rose-500 rounded-xl font-bold text-xs uppercase tracking-widest text-white shadow-lg shadow-rose-500/30 hover:bg-rose-600">Thanh Toán</button>
                </div>
              </motion.div>
            )}

            {/* STATS — editorial typography */}
            {activeTab === "stats" && (
              <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }} className="px-5">
                {/* Vibe Typographic Display */}
                <div className="py-6 border-b border-slate-200 flex items-start justify-between mb-8">
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase mb-2">Vibe</h3>
                    <p className="text-sm font-serif italic text-slate-700 max-w-[200px]">
                      {group.vibeScore >= 90 ? "Năng lượng tuyệt vời. Cả nhóm đang trên đà kết nối." : "Nhóm đang có năng lượng tốt. Hãy lên lịch đi chơi nhé!"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-7xl font-serif text-slate-900 leading-none">{group.vibeScore}</span>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-8 mb-10">
                  {[
                    { label: "Chuyến đi", value: group.stats.trips },
                    { label: "Ảnh chụp", value: group.stats.photos },
                    { label: "Địa điểm", value: group.stats.places },
                    { label: "Streak", value: group.stats.streak },
                  ].map((s, i) => (
                    <motion.div key={s.label}
                      initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      transition={{ delay: i * 0.07, type: "spring" }}
                      className="border-t border-slate-200 pt-3">
                      <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{s.label}</span>
                      <span className="text-3xl font-serif text-slate-900">{s.value}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="p-6 bg-slate-50 border border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hay đến nhất</span>
                    <BookOpen className="w-5 h-5 text-slate-400" weight="light" />
                  </div>
                  <p className="text-3xl font-serif text-slate-900 leading-tight mb-2">{group.favPlace}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Auto Memory Reel Fullscreen Modal */}
      <AnimatePresence>
        {playingReel && group.photos.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col justify-center"
          >
            {/* Close Button */}
            <button 
              onClick={() => setPlayingReel(false)}
              className="absolute top-12 right-6 z-50 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30"
            >
              <X className="w-5 h-5" weight="bold" />
            </button>

            {/* Progress Bars */}
            <div className="absolute top-6 left-6 right-6 z-40 flex gap-1.5">
              {group.photos.map((_, i) => (
                <div key={i} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                  {i === currentReelIndex && (
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: "100%" }} 
                      transition={{ duration: 2.5, ease: "linear" }}
                      className="h-full bg-white" 
                    />
                  )}
                  {i < currentReelIndex && <div className="h-full bg-white" />}
                </div>
              ))}
            </div>

            {/* Music Info */}
            <div className="absolute top-12 left-6 z-40 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              <Sparkle className="w-4 h-4 text-white" weight="fill" />
              <span className="text-white font-bold text-[10px] uppercase tracking-widest">GatherGo Reel</span>
            </div>

            {/* Image Slider */}
            <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
              {/* Blurred Background */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={`blur-${currentReelIndex}`}
                  src={group.photos[currentReelIndex].url}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute w-full h-full object-cover blur-[40px] scale-125 saturate-150"
                />
              </AnimatePresence>

              {/* Foreground Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentReelIndex}
                  src={group.photos[currentReelIndex].url}
                  initial={{ opacity: 0, scale: 1.05, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute w-full h-full object-contain drop-shadow-2xl px-2 py-24"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
              
              <div className="absolute bottom-16 left-6 right-6 text-center z-40">
                <motion.p 
                  key={`cap-${currentReelIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-serif text-3xl text-white italic drop-shadow-lg"
                >
                  "{group.photos[currentReelIndex].caption}"
                </motion.p>
                <p className="text-white/70 font-bold text-[10px] uppercase tracking-[0.2em] mt-3">Ngày {group.lastTrip}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-4" />
      <BottomNav />
    </div>
  );
}
