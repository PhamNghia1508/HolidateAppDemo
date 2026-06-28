import { useState, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import Webcam from "react-webcam";
import html2canvas from "html2canvas";
import { triggerHaptic } from "@/components/premium/ParticleEffects";
import { ArrowLeft, Camera, DownloadSimple, ArrowCounterClockwise, Check, Sparkle, Users, Heart, House, Funnel, X, Faders, FloppyDisk } from "@phosphor-icons/react";

const frames = [
  { id: "vogue", name: "Vogue Magazine", group: "friends", emoji: "📖", color: "#FFFFFF", desc: "Bìa Tạp Chí" },
  { id: "spotify", name: "Now Playing", group: "couple", emoji: "🎵", color: "#1DB954", desc: "Music Player" },
  { id: "scrapbook", name: "Scrapbook", group: "friends", emoji: "🎀", color: "#FFB6C1", desc: "Cute Stickers" },
  { id: "newspaper", name: "Vintage News", group: "family", emoji: "📰", color: "#F5F1E7", desc: "Báo Cổ Điển" },
  { id: "instax", name: "Instax xoxo", group: "friends", emoji: "📸", color: "#FF69B4", desc: "Polaroid" },
  { id: "kodak", name: "Kodak Film", group: "couple", emoji: "🎞️", color: "#FBBF24", desc: "Phim Cuộn" },
];

const groupFilters = [
  { id: "all", label: "Tất cả", icon: Sparkle, color: "#C8371E" },
  { id: "friends", label: "Bạn bè", icon: Users, color: "#C8371E" },
  { id: "couple", label: "Couple", icon: Heart, color: "#EC4899" },
  { id: "family", label: "Gia đình", icon: House, color: "#F59E0B" },
  { id: "company", label: "Công ty", icon: Users, color: "#10B981" },
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
        <span style={{ fontSize: 8, color: "#9C8470", fontStyle: "italic" }}>a moment</span>
      </div>
    </div>
  );
  if (frameId === "confetti") return (
    <div style={{ width: s, height: s, position: "relative", overflow: "hidden", borderRadius: 8 }}>
      <img src={photoUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      {[...Array(8)].map((_, i) => {
        const isTop = i < 4;
        return (
          <div key={i} style={{ position: "absolute", width: 6, height: 6, borderRadius: i % 2 === 0 ? "50%" : 2, background: ["#C8860A","#EC4899","#C8371E","#3D6B4F"][i % 4], left: `${10 + (i % 4) * 25}%`, top: isTop ? 3 : "auto", bottom: isTop ? "auto" : 3, opacity: 0.9 }} />
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
  return <div style={{ width: s, height: s, background: "#EDE3D0", borderRadius: 8 }} />;
}

/* ---- Full compositor ---- */
function BoothCanvas({ 
  currentFrame, webcamRef, capturedImg, zoom = 1, lutFilter = 1, iso = 400
}: { 
  currentFrame: any; webcamRef?: any; capturedImg?: string | null;
  zoom?: number; lutFilter?: number; iso?: number;
}) {

  // Map lutFilter (1-5) to CSS filter string
  const getFilterStyle = () => {
    let style = "";
    // Exposure (ISO)
    if (iso === 100) style += "brightness(0.7) ";
    if (iso === 400) style += "brightness(1) ";
    if (iso === 800) style += "brightness(1.3) ";
    
    // LUTs
    if (lutFilter === 2) style += "sepia(0.5) contrast(1.1) saturate(1.2)"; // Vintage
    else if (lutFilter === 3) style += "grayscale(1) contrast(1.2)"; // B&W
    else if (lutFilter === 4) style += "contrast(1.2) saturate(0.8) hue-rotate(-10deg)"; // Cinematic
    else if (lutFilter === 5) style += "saturate(1.4) brightness(1.1) blur(0.5px)"; // Dreamy
    
    return style;
  };

  return (
    <section className="flex-1 p-6 flex flex-col items-center justify-center relative">
        <div id="booth-canvas-node" className="relative w-full aspect-square rounded-none overflow-hidden bg-black shadow-2xl border border-slate-200">
          
          {/* CAMERA FEED OR CAPTURED IMAGE */}
          <motion.div 
            animate={{ scale: zoom }} 
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 w-full h-full origin-center"
            style={{ filter: getFilterStyle() }}
          >
            {capturedImg ? (
              <motion.img 
                src={capturedImg} 
                alt="Captured" 
                initial={{ filter: "brightness(1.8) sepia(0.5) contrast(0.5)", y: "-20%" }}
                animate={{ filter: "brightness(1) sepia(0) contrast(1)", y: 0 }}
                transition={{ duration: 3, ease: "easeOut" }}
                className="w-full h-full object-cover" 
              />
            ) : (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "user", aspectRatio: 1 }}
                className="w-full h-full object-cover scale-x-[-1]"
              />
            )}
          </motion.div>

          {/* Cinematic UI Overlays */}
          {!capturedImg && (
            <>
              {/* Rule of Thirds Grid */}
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-evenly">
                <div className="w-full h-[1px] bg-white/20" />
                <div className="w-full h-[1px] bg-white/20" />
              </div>
              <div className="absolute inset-0 pointer-events-none flex justify-evenly">
                <div className="h-full w-[1px] bg-white/20" />
                <div className="h-full w-[1px] bg-white/20" />
              </div>
              
              {/* Center Crosshair */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 pointer-events-none">
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/40" />
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/40" />
              </div>
            </>
          )}

          {/* 1. Vogue Magazine */}
          {currentFrame.id === "vogue" && (
            <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between">
              <div className="absolute top-6 left-0 right-0 text-center mix-blend-overlay">
                <span className="font-serif text-[100px] text-white/90 leading-none tracking-tighter" style={{ transform: "scaleY(1.3)", display: "inline-block" }}>VOGUE</span>
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="flex flex-col gap-1">
                  <p className="text-white font-serif italic text-sm w-32 drop-shadow-md">The Art of the Selfie</p>
                  <p className="text-white/90 font-sans text-[8px] uppercase tracking-[0.2em] drop-shadow-md">Paris • New York</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="bg-white p-1 flex shadow-md">
                    <div className="flex items-end gap-[2px] h-6">
                       {[2,1,3,1,2,4,1,2,3,1,2].map((w,i) => <div key={i} style={{ width: w }} className="h-full bg-black"></div>)}
                    </div>
                  </div>
                  <span className="text-white font-serif text-[10px] drop-shadow-md">ISSUE 01</span>
                </div>
              </div>
            </div>
          )}

          {/* 2. Spotify Player */}
          {currentFrame.id === "spotify" && (
            <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end">
              {/* Tight gradient only at the bottom 40% */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent" />
              
              <div className="w-full px-6 pb-6 relative z-30">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-white font-bold text-xl drop-shadow-md">Perfect Moment</h2>
                    <p className="text-white/70 text-sm drop-shadow-md">GatherGo Studio</p>
                  </div>
                  <Heart className="w-6 h-6 text-[#1DB954]" weight="fill" />
                </div>
                
                <div className="w-full h-1 bg-white/30 rounded-full mb-2">
                  <div className="w-1/3 h-full bg-white rounded-full relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md"></div>
                  </div>
                </div>
                <div className="flex justify-between text-white/70 text-[10px] font-mono mb-4">
                  <span>1:15</span>
                  <span>-2:30</span>
                </div>

                <div className="flex justify-between items-center px-2">
                  <div className="text-white/70 text-base">⤨</div>
                  <div className="text-white text-2xl">⏮</div>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black text-2xl shadow-lg pl-1">▶</div>
                  <div className="text-white text-2xl">⏭</div>
                  <div className="text-white/70 text-base">🔁</div>
                </div>
              </div>
            </div>
          )}

          {/* 3. Scrapbook */}
          {currentFrame.id === "scrapbook" && (
            <div className="absolute inset-0 z-20 pointer-events-none p-4">
              {/* Only a thin white border to frame the photo, NO solid background */}
              <div className="absolute inset-4 border-[8px] border-white shadow-[0_4px_10px_rgba(0,0,0,0.15)]" />
              
              {/* Tape */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-24 h-8 bg-yellow-200/80 -rotate-2 mix-blend-normal shadow-sm" />
              <div className="absolute bottom-2 left-6 w-16 h-6 bg-pink-200/80 rotate-12 mix-blend-normal shadow-sm" />
              
              {/* Stickers (positioned near edges) */}
              <span className="absolute top-2 left-2 text-3xl -rotate-12 drop-shadow-md">🎀</span>
              <span className="absolute bottom-6 right-2 text-3xl rotate-12 drop-shadow-md">🧸</span>
              <span className="absolute bottom-12 left-2 text-3xl drop-shadow-md">🌸</span>
              <span className="absolute top-8 right-4 text-2xl rotate-45 drop-shadow-md">✨</span>
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                 <span className="font-serif italic text-pink-500 text-2xl drop-shadow-sm font-bold -rotate-3">so cute!</span>
              </div>
            </div>
          )}

          {/* 4. Newspaper */}
          {currentFrame.id === "newspaper" && (
            <div className="absolute inset-0 z-20 pointer-events-none">
              {/* Border creates the paper background, leaving the middle completely clear */}
              <div className="absolute inset-0 border-x-[12px] border-t-[50px] border-b-[60px] border-[#F5F1E7] shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]" />
              
              {/* Top Header inside the border area */}
              <div className="absolute top-0 left-0 right-0 h-[50px] flex flex-col items-center justify-center border-b border-black mx-[12px]">
                 <h1 className="font-serif text-[28px] font-bold text-black uppercase tracking-widest leading-none mt-1">The Times</h1>
                 <div className="flex justify-between w-full px-2 border-t border-black mt-1">
                   <span className="text-[6px] font-serif uppercase text-black font-bold">Vol. 1</span>
                   <span className="text-[6px] font-serif uppercase text-black font-bold">Sunday, June 26</span>
                   <span className="text-[6px] font-serif uppercase text-black font-bold">10 Cents</span>
                 </div>
              </div>
              
              {/* Bottom Footer inside the border area */}
              <div className="absolute bottom-0 left-0 right-0 h-[60px] px-4 py-2 border-t border-black bg-[#F5F1E7] mx-[12px]">
                 <p className="text-black text-justify font-serif text-[8px] leading-tight">
                   <span className="font-bold text-[12px] leading-none float-left mr-1">A</span> historic moment captured today in stunning clarity. The subjects appeared radiant and full of life, marking a new era of memories. This photograph will go down in history. Experts agree that this is one of the most beautiful portraits ever taken. Read more on Page 2.
                 </p>
              </div>
              
              {/* B&W filter overlay for the photo area only */}
              <div className="absolute top-[50px] bottom-[60px] left-[12px] right-[12px] backdrop-grayscale mix-blend-color backdrop-contrast-125 bg-black/5" />
            </div>
          )}

          {/* 5. Instax Doodles */}
          {currentFrame.id === "instax" && (
            <>
              <div className="absolute inset-0 z-20 pointer-events-none border-[16px] border-b-[80px] border-white shadow-[inset_0_0_15px_rgba(0,0,0,0.15)]">
                 <span className="absolute bottom-[-55px] left-4 font-serif italic text-2xl text-blue-600 font-bold -rotate-3 drop-shadow-sm">xoxo 💕</span>
                 <span className="absolute bottom-[-65px] right-4 font-serif italic text-xl text-pink-500 font-bold rotate-6 drop-shadow-sm">besties</span>
                 <span className="absolute top-2 right-2 text-3xl drop-shadow-md">✨</span>
              </div>
              <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-400 mix-blend-overlay opacity-20" />
            </>
          )}

          {/* 6. Kodak Film */}
          {currentFrame.id === "kodak" && (
            <div className="absolute inset-0 z-20 pointer-events-none border-l-[44px] border-r-[44px] border-[#FBBF24] shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]">
               <div className="absolute top-0 bottom-0 -left-10 w-6 flex flex-col justify-around py-4">
                 {[...Array(12)].map((_,i) => <div key={i} className="w-5 h-8 bg-black rounded-[2px]" />)}
               </div>
               <div className="absolute top-0 bottom-0 -right-10 w-6 flex flex-col justify-around py-4">
                 {[...Array(12)].map((_,i) => <div key={i} className="w-5 h-8 bg-black rounded-[2px]" />)}
               </div>
               
               <div className="absolute top-12 -left-[42px] text-black font-mono text-[11px] -rotate-90 origin-center whitespace-nowrap font-bold">KODAK PORTRA 400</div>
               <div className="absolute bottom-20 -left-8 text-black font-mono text-[14px] font-bold">12</div>
               
               <div className="absolute bottom-12 -right-[42px] text-black font-mono text-[11px] -rotate-90 origin-center whitespace-nowrap font-bold">KODAK PORTRA 400</div>
               <div className="absolute top-20 -right-8 text-black font-mono text-[14px] font-bold">12A</div>
            </div>
          )}
        </div>
      </section>
  );
}

export default function Photobooth() {
  const [, setLocation] = useLocation();
  
  const searchParams = new URLSearchParams(window.location.search);
  const type = searchParams.get("type") || "friends";
  const defaultFrame = frames.find(f => f.group === type) || frames[0];

  const [currentFrame, setFrame] = useState(defaultFrame);
  const [saveGroup, setSaveGroup] = useState(type);
  const [saved, setSaved] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  
  // Interactive Controls State
  const [zoom, setZoom] = useState(1);
  const [lutFilter, setLutFilter] = useState(1);
  const [iso, setIso] = useState(400);

  const webcamRef = useRef<any>(null);
  const [capturedImg, setCapturedImg] = useState<string | null>(null);

  const capturePhoto = useCallback(() => {
    triggerHaptic(50); // Heavy haptic for shutter
    setIsFlashing(true);
    
    // Play shutter sound if possible or just use haptic
    setTimeout(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImg(imageSrc);
      }
      setIsFlashing(false);
    }, 150); // flash duration
  }, [webcamRef]);

  const handleRetake = () => {
    triggerHaptic(10);
    setCapturedImg(null);
  };

  const handleSave = async () => {
    triggerHaptic(15);
    const node = document.getElementById("booth-canvas-node");
    if (node) {
      // Create final composite image
      const canvas = await html2canvas(node, { useCORS: true, backgroundColor: "#000", scale: 2 });
      const finalImgData = canvas.toDataURL("image/png");
      
      // Save to localStorage DB
      const existing = JSON.parse(localStorage.getItem("gathergo_photos") || "[]");
      existing.unshift({ id: Date.now(), url: finalImgData, group: saveGroup }); // save as top item
      localStorage.setItem("gathergo_photos", JSON.stringify(existing));
      
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setLocation("/memories");
      }, 1500);
    }
  };

  const handleDownload = async () => {
    triggerHaptic(15);
    const node = document.getElementById("booth-canvas-node");
    if (node) {
      const canvas = await html2canvas(node, { useCORS: true, backgroundColor: "#000", scale: 2 });
      const finalImgData = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = finalImgData;
      a.download = `GatherGo_Moment_${Date.now()}.png`;
      a.click();
    }
  };

  return (
    <main className="flex-1 flex flex-col bg-[#0a0a0a] relative pb-24 text-slate-200">
      <section className="bg-[#0a0a0a] border-t border-slate-800">
        <div className="px-6 py-6 border-b border-slate-800 flex justify-between items-center">
          <div>
            <motion.button aria-label="Quay lại" whileTap={{ scale: 0.9 }} onClick={() => window.history.length > 1 ? window.history.back() : setLocation("/home")}
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-300" />
            </motion.button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                <span className="font-mono text-xs uppercase tracking-widest text-slate-300">Aesthetic Cam</span>
              </div>
              <p className="font-serif italic text-sm text-slate-500">Capture the vibe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Screen Flash Overlay (Mechanical Shutter) */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.05 }}
            className="fixed inset-0 bg-black z-[100] pointer-events-none" 
          />
        )}
      </AnimatePresence>

      <BoothCanvas 
        capturedImg={capturedImg} 
        currentFrame={currentFrame} 
        webcamRef={webcamRef} 
        zoom={zoom}
        lutFilter={lutFilter}
        iso={iso}
      />

      <div className="px-6">
        <div className="px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar mask-edges-right pb-2">
            <div className="flex flex-col justify-center border-r border-slate-800 pr-4 cursor-pointer"
                 onClick={() => {
                   triggerHaptic(10);
                   setIso(prev => prev === 100 ? 400 : prev === 400 ? 800 : 100);
                 }}>
              <span className="font-serif text-lg text-slate-200">{currentFrame.name}</span>
              <div className="flex items-center gap-2 mt-1">
                <Funnel className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-mono text-xs tracking-widest text-slate-500 transition-colors hover:text-slate-300">ISO {iso}</span>
                <span className="font-mono text-xs tracking-widest text-slate-500">f/1.4</span>
              </div>
            </div>

            <div className="flex gap-2 pl-2">
              {[1,2,3,4,5].map(f => (
                <button key={f} 
                  onClick={() => { triggerHaptic(10); setLutFilter(f); }}
                  className={`h-12 w-10 border transition-colors flex items-end justify-center pb-1 font-mono text-xs rounded-lg ${lutFilter === f ? 'border-slate-500 bg-slate-800 text-white shadow-md' : 'border-slate-800 text-slate-600 hover:border-slate-600'}`}>0{f}</button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end pl-4 flex-shrink-0">
            <p className="font-mono text-xs uppercase tracking-widest text-slate-600">Roll_01</p>
            <p className="font-mono text-xs uppercase tracking-widest text-slate-600">4 EXP</p>
          </div>
        </div>

        <div className="mb-6 border-y border-slate-800 py-4">
          <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
            {frames.map((f) => {
              const isSelected = currentFrame.id === f.id;
              return (
                <button key={f.id} onClick={() => { triggerHaptic(10); setFrame(f); }}
                className={`flex flex-shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                  isSelected ? 'text-white font-bold border-b-2 border-white pb-1' : 'text-slate-600 pb-1 hover:text-slate-400'
                }`}>
                {f.name}
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
              </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center mb-8 px-4">
          <div className="flex gap-3">
            {[0.5, 1, 2].map(z => (
              <button aria-label="Đổi tiêu cự" key={z} 
                onClick={() => { triggerHaptic(15); setZoom(z === 0.5 ? 0.8 : z); }}
                className={`w-11 h-11 rounded-full flex items-center justify-center font-mono text-[10px] uppercase font-bold tracking-widest transition-colors relative ${zoom === (z === 0.5 ? 0.8 : z) ? 'bg-slate-800 text-white shadow-lg border border-slate-600' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'}`}>
                {z}x
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {saved ? (
              <motion.div key="saved" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center shadow-lg">
                <Check className="w-7 h-7 text-white" weight="bold" />
              </motion.div>
            ) : capturedImg ? (
              <motion.div key="review" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                className="flex gap-4 items-center">
                <button aria-label="Chụp lại" onClick={handleRetake}
                  className="w-14 h-14 rounded-full flex items-center justify-center bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors">
                  <ArrowCounterClockwise className="w-6 h-6" weight="bold" />
                </button>
                <button aria-label="Lưu ảnh" onClick={() => setShowSaveDialog(true)}
                className="flex-1 h-[70px] bg-white text-slate-900 font-bold text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors rounded-2xl shadow-xl">
                <FloppyDisk className="w-5 h-5" weight="bold" />
                Lưu Album
              </button>
              <button aria-label="Tải về máy" onClick={handleDownload}
                className="w-[70px] h-[70px] flex flex-col items-center justify-center bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors rounded-2xl">
                <DownloadSimple className="w-6 h-6 mb-1" weight="bold" />
                <span className="text-[8px] font-mono tracking-widest uppercase">Tải</span>
              </button>
              </motion.div>
            ) : (
              <motion.div key="capture" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex justify-center">
                <button aria-label="Chụp" onClick={capturePhoto}
                  className="w-20 h-20 rounded-full border-4 border-slate-700 bg-transparent flex items-center justify-center p-1.5 active:scale-95 transition-transform hover:border-slate-500">
                  <div className="w-full h-full bg-slate-200 hover:bg-white transition-colors rounded-full flex items-center justify-center shadow-inner">
                    <Camera className="w-7 h-7 text-slate-900" weight="fill" />
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showSaveDialog && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setShowSaveDialog(false)} />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-2xl">
              <div className="bg-[#111] p-6 relative rounded-t-3xl border-t border-slate-800">
                <button aria-label="Đóng" onClick={() => setShowSaveDialog(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
                <div className="mb-6">
                  <h2 className="font-serif text-3xl text-white mb-1">Thư mục</h2>
                  <p className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-8">Lưu cuộn phim này vào đâu?</p>
                  
                  <div className="space-y-3">
                    {[
                      { id: "friends", label: "Bạn bè", desc: "12 rolls" },
                      { id: "family", label: "Gia đình", desc: "31 rolls" },
                      { id: "couple", label: "Couple", desc: "67 rolls" },
                    ].map((g: any) => (
                      <button key={g.id} onClick={() => setSaveGroup(g.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-colors group relative ${saveGroup === g.id ? 'border-slate-500 bg-slate-800' : 'border-slate-800 hover:border-slate-700'}`}>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className={`font-serif text-xl transition-colors ${saveGroup === g.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>{g.label}</p>
                            <p className="font-mono text-xs uppercase tracking-widest text-slate-500 mt-1">{g.desc}</p>
                          </div>
                          {saveGroup === g.id && (
                            <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <motion.button whileTap={{ scale: 0.97 }} onClick={handleSave}
                    className="w-full h-[60px] mt-8 bg-white text-slate-900 font-bold text-[14px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    <Check className="w-5 h-5" weight="bold" /> Xác nhận lưu
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
