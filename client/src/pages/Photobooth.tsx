import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Camera, Download, RotateCcw, Check, Sparkles, Users, Heart, Home } from "lucide-react";

const T1 = "#0F172A";
const T2 = "#475569";
const T3 = "#94A3B8";
const SURF = "#FFFFFF";
const BLUE = "#3B82F6";
const BORDER = "rgba(0,0,0,0.07)";
const SHADOW = "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)";

const frames = [
  { id: "film", name: "Film Strip", group: "friends", emoji: "🎞️", color: "#1E293B", desc: "Retro 90s" },
  { id: "polaroid", name: "Polaroid", group: "friends", emoji: "📷", color: "#64748B", desc: "Vintage" },
  { id: "confetti", name: "Party Pop", group: "friends", emoji: "🎉", color: "#8B5CF6", desc: "Bạn bè vui" },
  { id: "hearts", name: "Pink Love", group: "couple", emoji: "💕", color: "#EC4899", desc: "Couple only" },
  { id: "roses", name: "Rose Garden", group: "couple", emoji: "🌹", color: "#F43F5E", desc: "Lãng mạn" },
  { id: "stars", name: "Starlight", group: "couple", emoji: "✨", color: "#A855F7", desc: "Dreamy" },
  { id: "pastel", name: "Soft Pastel", group: "family", emoji: "🌸", color: "#F59E0B", desc: "Ấm áp" },
  { id: "nature", name: "Nature", group: "family", emoji: "🌿", color: "#10B981", desc: "Tươi xanh" },
];

const groupFilters = [
  { id: "all", label: "Tất cả", icon: Sparkles, color: BLUE },
  { id: "friends", label: "Bạn bè", icon: Users, color: BLUE },
  { id: "couple", label: "Couple", icon: Heart, color: "#EC4899" },
  { id: "family", label: "Gia đình", icon: Home, color: "#F59E0B" },
];

const samplePhotos = [
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=400&fit=crop",
];

/* ---- Frame thumbnail preview ---- */
function FrameThumb({ frameId, photoUrl, size = 72 }: { frameId: string; photoUrl: string; size?: number }) {
  const s = size;
  if (frameId === "film") return (
    <div style={{ width: s, height: s, position: "relative", overflow: "hidden", borderRadius: 8, background: "#0F172A" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: s * 0.14, background: "#0F172A", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", padding: "3px 0" }}>
        {[0,1,2,3].map(i => <div key={i} style={{ width: s * 0.07, height: s * 0.07, borderRadius: 2, background: "rgba(255,255,255,0.8)" }} />)}
      </div>
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: s * 0.14, background: "#0F172A", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", padding: "3px 0" }}>
        {[0,1,2,3].map(i => <div key={i} style={{ width: s * 0.07, height: s * 0.07, borderRadius: 2, background: "rgba(255,255,255,0.8)" }} />)}
      </div>
      <img src={photoUrl} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", clipPath: `inset(0 ${s * 0.14}px)` }} />
    </div>
  );
  if (frameId === "polaroid") return (
    <div style={{ width: s, height: s * 1.1, background: "#FAFAFA", borderRadius: 4, padding: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.18)", display: "flex", flexDirection: "column" }}>
      <img src={photoUrl} style={{ width: "100%", flex: 1, objectFit: "cover", borderRadius: 2 }} />
      <div style={{ height: s * 0.18, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 8, color: "#94A3B8", fontStyle: "italic" }}>a moment</span>
      </div>
    </div>
  );
  if (frameId === "confetti") return (
    <div style={{ width: s, height: s, position: "relative", overflow: "hidden", borderRadius: 8 }}>
      <img src={photoUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      {[...Array(8)].map((_, i) => {
        const isTop = i < 4;
        return (
          <div key={i} style={{ position: "absolute", width: 6, height: 6, borderRadius: i % 2 === 0 ? "50%" : 2, background: ["#F59E0B","#EC4899","#3B82F6","#10B981"][i % 4], left: `${10 + (i % 4) * 25}%`, top: isTop ? 3 : "auto", bottom: isTop ? "auto" : 3, opacity: 0.9 }} />
        );
      })}
      <div style={{ position: "absolute", inset: 0, border: "2.5px solid #8B5CF6", borderRadius: 8 }} />
    </div>
  );
  if (frameId === "hearts") return (
    <div style={{ width: s, height: s, position: "relative", overflow: "hidden", borderRadius: 8 }}>
      <img src={photoUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, border: "3px solid #EC4899", borderRadius: 8 }} />
      <span style={{ position: "absolute", top: 1, left: 1, fontSize: s * 0.17 }}>💕</span>
      <span style={{ position: "absolute", bottom: 1, right: 1, fontSize: s * 0.17 }}>💕</span>
    </div>
  );
  if (frameId === "roses") return (
    <div style={{ width: s, height: s, position: "relative", overflow: "hidden", borderRadius: 8 }}>
      <img src={photoUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, border: "3px solid #F43F5E", borderRadius: 8 }} />
      <span style={{ position: "absolute", bottom: 2, right: 2, fontSize: s * 0.20 }}>🌹</span>
    </div>
  );
  if (frameId === "stars") return (
    <div style={{ width: s, height: s, position: "relative", overflow: "hidden", borderRadius: 8 }}>
      <img src={photoUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, border: "2.5px solid rgba(168,85,247,0.85)", borderRadius: 8 }} />
      {[0,1,2].map(i => <span key={i} style={{ position: "absolute", fontSize: s * 0.16, top: 1, left: `${15 + i * 28}%` }}>⭐</span>)}
    </div>
  );
  if (frameId === "pastel") return (
    <div style={{ width: s, height: s, position: "relative", overflow: "hidden", borderRadius: 8 }}>
      <img src={photoUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, border: "4px solid #FDE68A", borderRadius: 8 }} />
      <span style={{ position: "absolute", top: 0, left: 2, fontSize: s * 0.2 }}>🌸</span>
      <span style={{ position: "absolute", bottom: 0, right: 2, fontSize: s * 0.2 }}>🌼</span>
    </div>
  );
  if (frameId === "nature") return (
    <div style={{ width: s, height: s, position: "relative", overflow: "hidden", borderRadius: 8 }}>
      <img src={photoUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, border: "3px solid #10B981", borderRadius: 8 }} />
      <span style={{ position: "absolute", top: 0, left: 0, fontSize: s * 0.2 }}>🌿</span>
      <span style={{ position: "absolute", bottom: 0, right: 0, fontSize: s * 0.2 }}>🍃</span>
    </div>
  );
  return <div style={{ width: s, height: s, background: "#E2E8F0", borderRadius: 8 }} />;
}

/* ---- Full compositor ---- */
function BoothCanvas({ photoUrl, frameId }: { photoUrl: string; frameId: string }) {
  return (
    <div className="relative w-full aspect-square rounded-2xl overflow-hidden"
      style={{ background: "#F8FAFC", boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}>
      <img src={photoUrl} alt="Photo" className="absolute inset-0 w-full h-full object-cover" />
      {frameId === "film" && <>
        <div className="absolute left-0 top-0 bottom-0 w-[13%] z-10"
          style={{ background: "#0F172A", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", padding: "12px 0" }}>
          {[0,1,2,3,4,5].map(i => <div key={i} className="w-3 h-3 rounded-sm" style={{ background: "#F8FAFC", opacity: 0.85 }} />)}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-[13%] z-10"
          style={{ background: "#0F172A", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", padding: "12px 0" }}>
          {[0,1,2,3,4,5].map(i => <div key={i} className="w-3 h-3 rounded-sm" style={{ background: "#F8FAFC", opacity: 0.85 }} />)}
        </div>
        <div className="absolute bottom-0 left-[13%] right-[13%] z-10 h-7 flex items-center justify-center"
          style={{ background: "#0F172A" }}>
          <span className="text-white/60 text-[10px] font-mono tracking-widest">GATHERGO ★ 2026</span>
        </div>
      </>}
      {frameId === "polaroid" && <>
        <div className="absolute inset-0 z-10" style={{ border: "18px solid #FAFAFA", borderBottomWidth: 56 }} />
        <div className="absolute bottom-0 left-0 right-0 z-20 h-14 flex items-center justify-center">
          <span style={{ color: "#94A3B8", fontStyle: "italic", fontSize: 13 }}>a moment to keep</span>
        </div>
      </>}
      {frameId === "confetti" && <>
        <div className="absolute inset-0 z-10 pointer-events-none">
          {[...Array(24)].map((_, i) => (
            <div key={i} style={{ position: "absolute", width: 10, height: 10, borderRadius: i % 3 === 0 ? "50%" : 2, background: ["#F59E0B","#EC4899","#3B82F6","#10B981","#8B5CF6","#F43F5E"][i % 6], left: `${(i % 8) * 13}%`, top: i < 12 ? `${1 + (i % 4) * 2}%` : `${88 + (i % 4) * 2}%`, opacity: 0.95, transform: `rotate(${i * 45}deg)` }} />
          ))}
        </div>
        <div className="absolute inset-0 z-10" style={{ border: "4px solid #8B5CF6", borderRadius: 8 }} />
      </>}
      {frameId === "hearts" && <>
        <div className="absolute inset-0 z-10" style={{ border: "4px solid #EC4899" }} />
        <div className="absolute top-2 left-0 right-0 z-20 flex justify-around px-4">
          {["💕","💕","💕","💕","💕"].map((e, i) => <span key={i} className="text-[16px]">{e}</span>)}
        </div>
        <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-around px-4">
          {["💕","💕","💕","💕","💕"].map((e, i) => <span key={i} className="text-[16px]">{e}</span>)}
        </div>
      </>}
      {frameId === "roses" && <>
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(135deg, rgba(244,63,94,0.20) 0%, transparent 40%, rgba(244,63,94,0.20) 100%)" }} />
        <div className="absolute inset-0 z-10" style={{ border: "4px solid #F43F5E" }} />
        <div className="absolute top-2 right-2 z-20 text-[28px]">🌹</div>
        <div className="absolute bottom-2 left-2 z-20 text-[28px]">🌹</div>
        <div className="absolute bottom-2 right-2 z-20 text-[20px]">🌹</div>
      </>}
      {frameId === "stars" && <>
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.16) 0%, transparent 50%, rgba(168,85,247,0.10) 100%)" }} />
        <div className="absolute inset-0 z-10" style={{ border: "3px solid rgba(168,85,247,0.85)" }} />
        {[...Array(10)].map((_, i) => (
          <span key={i} className="absolute z-20 text-[14px]"
            style={{ left: `${5 + (i % 5) * 22}%`, top: `${2 + Math.floor(i / 5) * 90}%` }}>⭐</span>
        ))}
      </>}
      {frameId === "pastel" && <>
        <div className="absolute inset-0 z-10" style={{ border: "6px solid #FDE68A" }} />
        <div className="absolute inset-1.5 z-10" style={{ border: "3px solid #FCD34D" }} />
        {["🌸","🌸","🌼","🌸"].map((e, i) => (
          <span key={i} className="absolute z-20 text-[24px]"
            style={{ top: i < 2 ? -4 : "auto", bottom: i >= 2 ? -4 : "auto", left: i % 2 === 0 ? 8 : "auto", right: i % 2 !== 0 ? 8 : "auto" }}>{e}</span>
        ))}
      </>}
      {frameId === "nature" && <>
        <div className="absolute inset-0 z-10" style={{ border: "4px solid #10B981" }} />
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between px-3">
          {["🌿","🍃","🌿","🍃","🌿"].map((e, i) => <span key={i} className="text-[20px]">{e}</span>)}
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-between px-3">
          {["🌿","🍃","🌿","🍃","🌿"].map((e, i) => <span key={i} className="text-[20px]">{e}</span>)}
        </div>
      </>}
      <div className="absolute bottom-2 right-3 z-30">
        <span className="text-[10px] font-bold text-white/50 tracking-widest">GatherGo</span>
      </div>
    </div>
  );
}

export default function Photobooth() {
  const [, setLocation] = useLocation();
  const [groupFilter, setGroupFilter] = useState("all");
  const [selectedFrame, setSelectedFrame] = useState("film");
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [saveGroup, setSaveGroup] = useState("friends");
  const [saved, setSaved] = useState(false);
  const [showSaveSheet, setShowSaveSheet] = useState(false);

  const filteredFrames = frames.filter(f => groupFilter === "all" || f.group === groupFilter);
  const currentFrame = frames.find(f => f.id === selectedFrame) ?? frames[0];

  const handleSave = () => {
    setSaved(true);
    setShowSaveSheet(false);
    setTimeout(() => {
      setSaved(false);
      setLocation("/memories");
    }, 1800);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-8 relative" style={{ background: "#F1F5FB" }}>
      {/* Sticky header */}
      <div className="sticky top-0 z-30 px-4 pt-5 pb-3"
        style={{ background: "rgba(241,245,251,0.90)", backdropFilter: "blur(20px)" }}>
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setLocation("/memories")}
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
            <ArrowLeft className="w-4 h-4" style={{ color: T1 }} />
          </motion.button>
          <div>
            <h1 className="text-[20px] font-black" style={{ color: T1 }}>Photobooth 📸</h1>
            <p className="text-[11px]" style={{ color: T3 }}>Chọn frame, chọn ảnh → lưu vào album</p>
          </div>
        </div>
      </div>

      <div className="px-4">
        {/* Compositor */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }} className="mb-4">
          <BoothCanvas photoUrl={samplePhotos[selectedPhoto]} frameId={selectedFrame} />
          <motion.div key={selectedFrame} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mt-3">
            <span className="text-[18px]">{currentFrame.emoji}</span>
            <span className="text-[14px] font-bold" style={{ color: T1 }}>{currentFrame.name}</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full"
              style={{ background: `${currentFrame.color}18`, color: currentFrame.color, border: `1px solid ${currentFrame.color}30` }}>
              {currentFrame.desc}
            </span>
          </motion.div>
        </motion.div>

        {/* Photo selector */}
        <div className="mb-5">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-2.5" style={{ color: T3 }}>Chọn ảnh</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {samplePhotos.map((url, i) => (
              <motion.button key={i} whileTap={{ scale: 0.93 }} onClick={() => setSelectedPhoto(i)}
                className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden relative"
                style={{ border: `2.5px solid ${selectedPhoto === i ? BLUE : BORDER}`, boxShadow: selectedPhoto === i ? "0 0 0 3px rgba(59,130,246,0.20)" : SHADOW }}>
                <img src={url} className="w-full h-full object-cover" />
                {selectedPhoto === i && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(59,130,246,0.25)" }}>
                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                  </div>
                )}
              </motion.button>
            ))}
            <motion.button whileTap={{ scale: 0.93 }}
              className="flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center gap-1"
              style={{ border: `2px dashed ${BORDER}`, background: "#F8FAFC" }}>
              <Camera className="w-5 h-5" style={{ color: T3 }} />
              <span className="text-[9px] font-semibold" style={{ color: T3 }}>Upload</span>
            </motion.button>
          </div>
        </div>

        {/* Group filter */}
        <div className="mb-3">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-2.5" style={{ color: T3 }}>Chọn frame theo nhóm</p>
          <div className="flex gap-2 flex-wrap">
            {groupFilters.map(g => {
              const Icon = g.icon;
              return (
                <motion.button key={g.id} whileTap={{ scale: 0.93 }}
                  onClick={() => setGroupFilter(g.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold border"
                  style={{ background: groupFilter === g.id ? g.color : SURF, color: groupFilter === g.id ? "#fff" : T2, border: `1px solid ${groupFilter === g.id ? g.color : BORDER}`, boxShadow: SHADOW }}>
                  <Icon className="w-3.5 h-3.5" />
                  {g.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Frames Grid — 4 columns, 72px thumbnails (up from 56px) */}
        <motion.div layout className="grid grid-cols-4 gap-2.5 mb-6">
          <AnimatePresence>
            {filteredFrames.map((frame) => (
              <motion.button key={frame.id}
                layout
                initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.93 }}
                onClick={() => setSelectedFrame(frame.id)}
                className="flex flex-col items-center gap-1.5 p-2 rounded-2xl relative"
                style={{
                  background: selectedFrame === frame.id ? `${frame.color}12` : SURF,
                  border: `2px solid ${selectedFrame === frame.id ? frame.color : BORDER}`,
                  boxShadow: selectedFrame === frame.id ? `0 4px 16px ${frame.color}28` : SHADOW,
                }}>
                <FrameThumb frameId={frame.id} size={72} photoUrl={samplePhotos[selectedPhoto]} />
                <span className="text-[10px] font-semibold text-center leading-tight"
                  style={{ color: selectedFrame === frame.id ? frame.color : T2 }}>
                  {frame.name}
                </span>
                {selectedFrame === frame.id && (
                  <motion.div layoutId="frame-check"
                    className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: frame.color }}>
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Save + Shuffle buttons */}
        <AnimatePresence>
          {saved ? (
            <motion.div key="saved"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="w-full h-[52px] rounded-2xl flex items-center justify-center gap-2 font-bold text-[15px]"
              style={{ background: "#22C55E", color: "white" }}>
              <Check className="w-5 h-5" strokeWidth={2.5} /> Đã lưu vào album!
            </motion.div>
          ) : (
            <motion.div key="actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowSaveSheet(true)}
                className="flex-1 h-[52px] rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 premium-cta-mint">
                <Download className="w-4 h-4" /> Lưu vào album
              </motion.button>
              <motion.button whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedFrame(frames[Math.floor(Math.random() * frames.length)].id)}
                className="h-[52px] w-[52px] rounded-2xl flex items-center justify-center"
                style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
                <RotateCcw className="w-5 h-5" style={{ color: T2 }} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Save Group Bottom Sheet */}
      <AnimatePresence>
        {showSaveSheet && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40" style={{ background: "rgba(0,0,0,0.30)", backdropFilter: "blur(4px)" }}
              onClick={() => setShowSaveSheet(false)} />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto rounded-t-3xl px-5 pt-5 pb-10"
              style={{ background: SURF, boxShadow: "0 -8px 40px rgba(0,0,0,0.14)" }}>
              <div className="w-12 h-1.5 rounded-full bg-gray-200 mx-auto mb-5" />
              <h2 className="text-[18px] font-black mb-1" style={{ color: T1 }}>Lưu vào album nào?</h2>
              <p className="text-[13px] mb-4" style={{ color: T2 }}>Chọn nhóm để lưu bức ảnh này.</p>
              <div className="space-y-2.5 mb-5">
                {[
                  { id: "friends", label: "Bạn bè", emoji: "👥", color: BLUE, desc: "12 ảnh đã lưu" },
                  { id: "family", label: "Gia đình", emoji: "🏠", color: "#F59E0B", desc: "31 ảnh đã lưu" },
                  { id: "couple", label: "Couple", emoji: "💑", color: "#EC4899", desc: "67 ảnh đã lưu" },
                ].map(g => (
                  <motion.button key={g.id} whileTap={{ scale: 0.97 }} onClick={() => setSaveGroup(g.id)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl"
                    style={{ background: saveGroup === g.id ? `${g.color}10` : "#F8FAFC", border: `1.5px solid ${saveGroup === g.id ? g.color : BORDER}`, boxShadow: saveGroup === g.id ? `0 2px 12px ${g.color}20` : "none" }}>
                    <span className="text-[28px]">{g.emoji}</span>
                    <div className="text-left flex-1">
                      <p className="text-[15px] font-bold" style={{ color: T1 }}>{g.label}</p>
                      <p className="text-[12px]" style={{ color: T3 }}>{g.desc}</p>
                    </div>
                    {saveGroup === g.id && (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: g.color }}>
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleSave}
                className="w-full h-[52px] rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 premium-cta-mint">
                <Check className="w-4 h-4" /> Lưu vào {["Bạn bè","Gia đình","Couple"].find((_, i) => ["friends","family","couple"][i] === saveGroup)}
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
