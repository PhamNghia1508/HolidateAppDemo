import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationArrow, Camera, X, CheckCircle, Heart, PlayCircle, SkipForward, CloudSun, WifiHigh, Radio, Coins, MapPin, Eye, Siren, WarningCircle } from "@phosphor-icons/react";
import BottomNav from "@/components/BottomNav";
import { getPlanById } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { SonarRadar } from "@/components/premium/SonarRadar";
import { ARWayfinder } from "../components/premium/ARWayfinder";
import { WalkieTalkie } from "../components/premium/WalkieTalkie";
import { MoneyPoolSheet } from "../components/premium/MoneyPoolSheet";
import { GeoMemoryDrop } from "../components/premium/GeoMemoryDrop";
import { SOSAlert } from "../components/premium/SOSAlert";
import { GroupDJSheet } from "../components/premium/GroupDJSheet";
import { TripWrapped } from "../components/premium/TripWrapped";
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

const createAvatarIcon = (
  imgUrl: string, 
  isLost: boolean = false, 
  borderColor: string = "#22c55e", 
  badgeText?: string,
  battery?: number,
  isOffline?: boolean
) => {
  const actualBorder = isOffline ? "#94a3b8" : borderColor; // Slate-400 if offline
  const filter = isOffline ? "grayscale(100%) opacity(0.8)" : "none";
  
  let batteryHtml = '';
  if (battery !== undefined) {
    const isLow = battery <= 20;
    const batColor = isLow ? "#ef4444" : "#22c55e"; // Red if low, Green if OK
    const batWidth = Math.max(battery, 5); // min width
    batteryHtml = `
      <div style="width: 30px; height: 6px; background: #e2e8f0; border-radius: 4px; margin-top: 4px; border: 1px solid #cbd5e1; overflow: hidden; display: flex;">
        <div style="width: ${batWidth}%; background: ${batColor}; height: 100%; ${isLow ? 'animation: blink 1s infinite alternate;' : ''}"></div>
      </div>
      <style>
        @keyframes blink { 0% { opacity: 1; } 100% { opacity: 0.3; } }
      </style>
    `;
  }

  return L.divIcon({
    className: 'custom-avatar-icon',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; items-center; justify-content: center; align-items: center;">
        ${badgeText ? `
          <div style="position: absolute; top: -12px; background: ${actualBorder}; color: white; font-size: 8px; font-weight: bold; padding: 2px 6px; border-radius: 10px; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.2); z-index: 10;">
            ${badgeText}
          </div>
        ` : ''}
        ${isOffline ? `
          <div style="position: absolute; top: -12px; background: #64748b; color: white; font-size: 8px; font-weight: bold; padding: 2px 6px; border-radius: 10px; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.2); z-index: 10;">
            OFFLINE
          </div>
        ` : ''}
        <div style="width: 44px; height: 44px; border-radius: 50%; border: 3px solid ${actualBorder}; overflow: hidden; background: white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); ${isLost ? 'animation: pulse-ring 2s infinite;' : ''}">
          <img src="${imgUrl}" style="width: 100%; height: 100%; object-fit: cover; filter: ${filter};" />
        </div>
        ${batteryHtml}
        ${isLost ? `
          <div style="position: absolute; bottom: ${battery !== undefined ? '10px' : '-2px'}; right: -2px; width: 14px; height: 14px; background: #ef4444; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 8px rgba(239,68,68,0.8);"></div>
        ` : ''}
      </div>
      <style>
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(245, 158, 11, 0); }
          100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
        }
      </style>
    `,
    iconAnchor: [20, 20],
  });
};

const destinationIcon = L.divIcon({
  className: 'destination-icon',
  html: `
    <div style="display: flex; flex-direction: column; align-items: center; transform: translateY(-100%);">
      <div style="background: #0f172a; padding: 4px 8px; border-radius: 8px; border: 1px solid #334155; color: white; font-weight: bold; font-size: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); white-space: nowrap;">
        ĐIỂM ĐẾN
      </div>
      <div style="width: 2px; height: 12px; background: #0f172a;"></div>
      <div style="width: 12px; height: 12px; border-radius: 50%; background: #22c55e; border: 2px solid white; box-shadow: 0 0 10px rgba(34,197,94,0.8);"></div>
    </div>
  `,
  iconSize: [60, 40],
  iconAnchor: [30, 40],
});

const geoPinIcon = L.divIcon({
  className: 'geo-pin-icon',
  html: `
    <div style="position: relative; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; transform: translateY(-50%);">
      <div style="position: absolute; inset: 0; background: linear-gradient(135deg, #f43f5e, #f97316); border-radius: 12px; transform: rotate(15deg); box-shadow: 0 4px 15px rgba(244,63,94,0.4);"></div>
      <div style="position: absolute; inset: 2px; background: white; border-radius: 10px; transform: rotate(15deg);"></div>
      <div style="position: absolute; z-index: 10; font-size: 20px; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">📸</div>
      <div style="position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #f97316;"></div>
    </div>
    <style>
      .geo-pin-icon { animation: float-geo 3s ease-in-out infinite; }
      @keyframes float-geo { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    </style>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function MapUpdater() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 400);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

const S = (i: number) => ({ delay: i * 0.1, type: "spring" as const, stiffness: 400, damping: 28 });

export default function LiveJourney() {
  const [, setLocation] = useLocation();
  const [time, setTime] = useState("");
  const [viewMode, setViewMode] = useState<"map" | "radar">("map");
  const [showAR, setShowAR] = useState(false);
  const [showMoneyPool, setShowMoneyPool] = useState(false);
  const [showGeoDrop, setShowGeoDrop] = useState(false);
  const [showSOS, setShowSOS] = useState(false);
  const [showDJ, setShowDJ] = useState(false);
  const [showWrapped, setShowWrapped] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const groupParam = searchParams.get("group") || "friends";
  const planIdParam = searchParams.get("planId");
  const planId = planIdParam ? parseInt(planIdParam, 10) : 1;

  const { toast } = useToast();

  useEffect(() => {
    // Current time formatting
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Simulate Live Activity in Dynamic Island based on group type
    const dynamicIslandTimer = setTimeout(() => {
      let title = "🐢 An đã xuất phát!";
      let description = "Cách bạn 5km (15 phút nữa tới)";
      
      if (groupParam === "couple") {
        title = "💝 Người yêu đã tới!";
        description = "Đang đứng ở sảnh đợi bạn xuống";
      } else if (groupParam === "family") {
        title = "👨‍👩‍👧 Ba đã lấy xe xong!";
        description = "Mọi người chuẩn bị đồ đạc ra cửa nhé";
      }

      toast({
        title,
        description,
        duration: 5000,
      });
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(dynamicIslandTimer);
    };
  }, [toast, groupParam]);

  // UI mappings based on type
  const config = {
    friends: {
      header: "Tình trạng tập hợp",
      ctaText: "Check-in Nhóm",
      ctaColor: "bg-rose-500 hover:bg-rose-600",
      dest: { title: "Bistro Nhà Gỗ", time: "18:30", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop" }
    },
    couple: {
      header: "Our Vibe",
      ctaText: "Lưu giữ khoảnh khắc",
      ctaColor: "bg-pink-600 hover:bg-pink-700",
      dest: { title: "La Badiane", time: "18:30", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop" }
    },
    family: {
      header: "Checklist Hành Trang",
      ctaText: "Chụp ảnh Gia đình",
      ctaColor: "bg-amber-600 hover:bg-amber-700",
      dest: { title: "Pizza 4P's", time: "18:30", img: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&auto=format&fit=crop" }
    },
    company: {
      header: "Lịch trình Team Building",
      ctaText: "Điểm danh",
      ctaColor: "bg-emerald-600 hover:bg-emerald-700",
      dest: { title: "Resort", time: "09:00", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop" }
    }
  }[groupParam] || {
    header: "Tình trạng tập hợp",
    ctaText: "Check-in Nhóm",
    ctaColor: "bg-rose-500 hover:bg-rose-600"
  };

  const plan = getPlanById(groupParam, planId);
  const timeline = plan?.timeline || [];
  
  // destConfig uses the first stop in the timeline
  const destConfig = {
    title: timeline[0]?.title || "Điểm đến", 
    time: timeline[0]?.time || "18:30", 
    img: plan?.img || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop" 
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto pb-24 relative bg-[#F8F9FA]">
        
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-30 px-6 pt-6 pb-4 bg-[#F8F9FA]/90 backdrop-blur-md flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 shadow-sm rounded-full">
            <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-rose-500 rounded-full" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-white">LIVE</span>
          </div>
          <span className="font-serif text-2xl text-slate-900 leading-none">{time}</span>
        </div>
        
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowWrapped(true)}
          className="px-4 h-9 flex items-center justify-center gap-1.5 bg-red-50 rounded-full border border-red-100 text-red-600 hover:bg-red-500 hover:text-white transition-all shadow-sm">
          <span className="text-[10px] font-bold tracking-widest uppercase">Kết thúc</span>
        </motion.button>
      </div>

      <div className="pt-28 px-6">
        {/* Dynamic Widget */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={S(1)} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{config.header}</h2>
            {groupParam === "friends" && <span className="font-serif italic text-sm text-slate-600">3/4 đã đến</span>}
            {groupParam === "couple" && <span className="font-serif italic text-sm text-slate-600"><Heart className="inline w-4 h-4 text-pink-500" weight="fill" /></span>}
            {groupParam === "family" && <span className="font-serif italic text-sm text-slate-600">Sẵn sàng</span>}
          </div>
          
          <div className="bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden">
            {/* Friends Widget */}
            {groupParam === "friends" && (
              <div className="p-0 relative overflow-hidden bg-slate-900 h-[340px] flex items-center justify-center z-10">
                {/* View Mode Toggle */}
                <div className="absolute top-4 right-4 z-[1000] bg-slate-900/80 backdrop-blur border border-white/10 rounded-full flex p-1 shadow-lg">
                  <button 
                    onClick={() => setViewMode("map")}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${viewMode === "map" ? "bg-white text-slate-900" : "text-white hover:bg-white/10"}`}
                  >
                    Bản Đồ
                  </button>
                  <button 
                    onClick={() => setViewMode("radar")}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1 ${viewMode === "radar" ? "bg-green-500 text-slate-900" : "text-green-500 hover:bg-white/10"}`}
                  >
                    <WifiHigh className="w-4 h-4" weight="bold" /> Radar
                  </button>
                </div>

                <MapContainer center={[21.0285, 105.8542]} zoom={15} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }} zoomControl={false} attributionControl={false}>
                  <MapUpdater />
                  <TileLayer
                    url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                    attribution="&copy; Google Maps"
                  />
                  
                  {/* Destination Marker */}
                  <Marker position={[21.0285, 105.8542]} icon={destinationIcon} />
                  
                  {/* Friend Markers */}
                  <Marker position={[21.0286, 105.8545]} icon={createAvatarIcon("https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop", false, "#22c55e", undefined, 85)} />
                  <Marker position={[21.0283, 105.8540]} icon={createAvatarIcon("https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop", false, "#22c55e", undefined, 40, true)} />
                  <Marker position={[21.0288, 105.8541]} icon={createAvatarIcon("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop", false, "#22c55e", undefined, 12)} />
                  <Marker position={[21.0250, 105.8580]} icon={createAvatarIcon("https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop", true, "#f59e0b", "5 PHÚT", 100)} />

                  <Marker 
                    position={[21.0275, 105.8530]} 
                    icon={geoPinIcon} 
                    eventHandlers={{ click: () => setShowGeoDrop(true) }}
                  />
                </MapContainer>

                <AnimatePresence>
                  {viewMode === "radar" && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-[500]"
                    >
                      <SonarRadar groupParam={groupParam} />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Stats Overlay */}
                <div className="absolute top-4 left-4 z-[400] flex flex-col gap-2 pointer-events-none">
                  <div className="flex items-center gap-2 bg-slate-900/80 px-2.5 py-1.5 rounded-full backdrop-blur-sm border border-slate-700 shadow-md">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]"></div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-green-400">LIVE TRACKING</p>
                  </div>
                </div>
              </div>
            )}

            {/* Couple Widget */}
            {groupParam === "couple" && (
              <div className="flex flex-col">
                <div className="p-5 flex items-center gap-4 border-b border-slate-100 bg-[#FDFBF7]">
                  <div className="w-14 h-14 bg-slate-900 flex items-center justify-center shadow-md rounded-[1rem]">
                    <PlayCircle className="w-8 h-8 text-white" weight="light" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-lg text-slate-900 truncate">Perfect</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Ed Sheeran</p>
                  </div>
                  <SkipForward className="w-6 h-6 text-slate-400" weight="fill" />
                </div>
                <div className="p-6 bg-white text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-500 mb-3">Deep Talk Cùng Nhau</p>
                  <p className="font-serif italic text-lg text-slate-700 leading-relaxed">
                    "Điều gì ở anh khiến em cảm thấy bình yên nhất?"
                  </p>
                </div>
              </div>
            )}

            {/* Family Widget */}
            {groupParam === "family" && (
              <div className="flex flex-col">
                <div className="p-4 flex items-center gap-4 border-b border-slate-100 bg-amber-50">
                  <CloudSun className="w-8 h-8 text-amber-500" weight="fill" />
                  <div>
                    <p className="font-serif text-lg text-slate-900">28°C - Trời mát mẻ</p>
                    <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mt-1">Tuyệt vời cho bé hoạt động</p>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-3">
                  {[
                    "Bỉm sữa & Khăn ướt",
                    "Nước lọc cho bé",
                    "Áo khoác dự phòng",
                    "Đồ ăn vặt"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" weight="fill" />
                      <p className="font-serif text-base text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Company Widget */}
            {groupParam === "company" && (
              <div className="p-5 flex flex-col gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-bold text-xs uppercase tracking-widest text-slate-700">Team Building Điểm Danh</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <h3 className="font-serif text-3xl text-slate-900 leading-none">38/40</h3>
                    <span className="text-sm font-medium text-slate-500">Đã lên xe</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="w-full h-12 bg-emerald-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-emerald-700 transition-colors">
                    Mở QR Điểm Danh
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Dock (Túi Đồ Nghề) */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={S(2)} className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Công cụ tương tác</h2>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar -mx-6 px-6 snap-x">
            {/* Check-in / Memory Drop (replaces giant FAB) */}
            <button 
              onClick={() => setLocation(`/photobooth?type=${groupParam}`)}
              className="flex flex-col items-center gap-2 group snap-start min-w-[72px]"
            >
              <div className={`w-16 h-16 ${config.ctaColor} text-white rounded-[1.5rem] flex items-center justify-center shadow-md transition-transform active:scale-95`}>
                <Camera className="w-7 h-7" weight="fill" />
              </div>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Kỷ Niệm</span>
            </button>

            {/* Group DJ */}
            <button 
              onClick={() => setShowDJ(true)}
              className="flex flex-col items-center gap-2 group snap-start min-w-[72px]"
            >
              <div className="w-16 h-16 bg-slate-900 text-white rounded-[1.5rem] border border-slate-800 flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.15)] group-hover:bg-slate-800 transition-transform active:scale-95">
                <PlayCircle className="w-7 h-7" weight="light" />
              </div>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Nhạc</span>
            </button>

            {/* Quỹ Nhóm (replaces big widget) */}
            <button 
              onClick={() => setShowMoneyPool(true)}
              className="flex flex-col items-center gap-2 group snap-start min-w-[72px]"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-[1.5rem] border border-emerald-100 flex items-center justify-center shadow-[0_4px_15px_rgba(16,185,129,0.15)] group-hover:bg-emerald-500 group-hover:text-white transition-transform active:scale-95">
                <Coins className="w-7 h-7" weight="fill" />
              </div>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Quỹ Nhóm</span>
            </button>

            {/* AR Wayfinder */}
            <button 
              onClick={() => setShowAR(true)}
              className="flex flex-col items-center gap-2 group snap-start min-w-[72px]"
            >
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-[1.5rem] border border-indigo-100 flex items-center justify-center shadow-[0_4px_15px_rgba(99,102,241,0.15)] group-hover:bg-indigo-500 group-hover:text-white transition-transform active:scale-95">
                <Eye className="w-7 h-7" weight="fill" />
              </div>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">AR Mode</span>
            </button>

            {/* SOS / Khẩn Cấp */}
            <button 
              onClick={() => setShowSOS(true)}
              className="flex flex-col items-center gap-2 group snap-start min-w-[72px]"
            >
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-[1.5rem] border border-red-100 flex items-center justify-center shadow-[0_4px_15px_rgba(239,68,68,0.15)] group-hover:bg-red-600 group-hover:text-white transition-transform active:scale-95">
                <Siren className="w-7 h-7" weight="fill" />
              </div>
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Khẩn Cấp</span>
            </button>
          </div>
        </motion.div>

        {/* Current Destination */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={S(3)}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Điểm đến tiếp theo</h2>
            <span className="font-serif italic text-sm text-slate-600">{destConfig.time}</span>
          </div>

          <div className="bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden">
            <div className="relative h-40 overflow-hidden border-b border-slate-200">
              <img src={destConfig.img}
                alt="Destination" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-4 left-5">
                <h3 className="font-serif text-3xl text-white leading-none shadow-sm drop-shadow-md">{destConfig.title}</h3>
              </div>
            </div>
            
            <div className="p-4 flex gap-3">
              <button className="flex-1 h-14 rounded-xl flex items-center justify-center gap-2 bg-slate-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-sm">
                <NavigationArrow className="w-5 h-5" weight="fill" /> Chỉ đường
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      </main>

      {/* Global Overlays and Modals */}
      <WalkieTalkie />
      {showAR && <ARWayfinder onClose={() => setShowAR(false)} targetName="An" distance="150m" />}
      {showMoneyPool && <MoneyPoolSheet onClose={() => setShowMoneyPool(false)} groupParam={groupParam} />}
      {showGeoDrop && <GeoMemoryDrop onClose={() => setShowGeoDrop(false)} />}
      {showSOS && <SOSAlert onClose={() => setShowSOS(false)} targetName="Bạn" />}
      {showDJ && <GroupDJSheet onClose={() => setShowDJ(false)} />}
      {showWrapped && (
        <TripWrapped 
          groupParam={groupParam} 
          onClose={() => {
            setShowWrapped(false);
            setLocation(`/plan-detail?state=completed&group=${groupParam}&planId=${planId}`);
          }} 
        />
      )}
    </>
  );
}
