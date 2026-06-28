import { motion } from "framer-motion";

interface PetProps {
  eyeOffset: { x: number; y: number };
  isHappy: boolean;
  isPetting?: boolean;
  isPartyMode?: boolean;
  size?: number;
}

// Thug Life Glasses
const Sunglasses = () => (
  <g transform="translate(0, 0)">
    {/* Frame */}
    <path d="M -22 -2 L -18 7 C -15 10, -5 10, -2 6 L 0 4 L 2 6 C 5 10, 15 10, 18 7 L 22 -2 Z" fill="#111827" />
    {/* Bridge */}
    <rect x="-4" y="0" width="8" height="3" fill="#111827" />
    {/* Lens reflection */}
    <path d="M -18 0 L -8 5 L -5 0 Z" fill="#374151" opacity="0.5" />
    <path d="M 8 0 L 18 5 L 15 0 Z" fill="#374151" opacity="0.5" />
  </g>
);

// -------------------------------------------------------------
// 1. CÁO NHỎ (FOX) - 2.5D Memoji Style
// -------------------------------------------------------------
export function FoxSVG({ eyeOffset, isHappy, isPetting, isPartyMode, size = 150 }: PetProps) {
  const isClosingEyes = isHappy || isPetting;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="-60 -60 120 120"
      style={{ overflow: "visible", filter: "drop-shadow(0 15px 15px rgba(200, 55, 30, 0.2))" }}
    >
      <defs>
        <radialGradient id="foxBase" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="70%" stopColor="#C8371E" />
          <stop offset="100%" stopColor="#991B1B" />
        </radialGradient>
        <radialGradient id="foxWhite" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="80%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </radialGradient>
        <radialGradient id="foxEarInner" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="100%" stopColor="#E11D48" />
        </radialGradient>
      </defs>

      {/* Đuôi - Vẫy mượt mà */}
      <motion.g
        initial={{ rotate: 0 }}
        animate={{ rotate: isPetting ? [0, 20, -20, 0] : [0, 10, -5, 0] }}
        transition={{ duration: isPetting ? 0.3 : 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "-20px", originY: "30px" }}
      >
        <path d="M -20 30 Q -60 10 -40 -10 Q -20 -30 0 10 Z" fill="url(#foxBase)" />
        <path d="M -40 -10 Q -30 -30 -20 -20 Q -30 0 -40 -10 Z" fill="url(#foxWhite)" />
      </motion.g>

      {/* Thân - Phình thở */}
      <motion.g
        animate={{ scaleY: [1, 1.05, 1], scaleX: [1, 0.98, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ originY: "40px" }}
      >
        <path d="M -35 40 C -35 0, 35 0, 35 40 Z" fill="url(#foxBase)" />
        <path d="M -20 40 C -20 15, 20 15, 20 40 Z" fill="url(#foxWhite)" />
      </motion.g>

      {/* Đầu - Di chuyển theo eyeOffset */}
      <motion.g animate={{ x: eyeOffset.x * 2, y: eyeOffset.y * 2 }} transition={{ type: "spring", stiffness: 100 }}>
        
        {/* Tai Trái */}
        <motion.g 
          animate={{ rotate: isPetting ? -25 : 0 }} 
          transition={{ type: "spring" }}
          style={{ originX: "-20px", originY: "-10px" }}
        >
          <path d="M -15 -20 L -35 -45 L -40 -15 Z" fill="url(#foxBase)" />
          <path d="M -20 -22 L -30 -38 L -32 -18 Z" fill="url(#foxEarInner)" />
        </motion.g>

        {/* Tai Phải */}
        <motion.g 
          animate={{ rotate: isPetting ? 25 : 0 }} 
          transition={{ type: "spring" }}
          style={{ originX: "20px", originY: "-10px" }}
        >
          <path d="M 15 -20 L 35 -45 L 40 -15 Z" fill="url(#foxBase)" />
          <path d="M 20 -22 L 30 -38 L 32 -18 Z" fill="url(#foxEarInner)" />
        </motion.g>

        {/* Khối Mặt 3D */}
        <path d="M -40 -5 C -40 -35, 40 -35, 40 -5 C 40 25, 15 35, 0 40 C -15 35, -40 25, -40 -5 Z" fill="url(#foxBase)" />
        <path d="M -40 -5 C -20 -15, -10 10, 0 10 C 10 10, 20 -15, 40 -5 C 40 25, 15 35, 0 40 C -15 35, -40 25, -40 -5 Z" fill="url(#foxWhite)" />

        {/* Mũi & Mõm */}
        <ellipse cx="0" cy="22" rx="6" ry="4" fill="#1E293B" />
        <path d="M -15 25 Q 0 35 15 25" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />

        {/* Mắt Trái */}
        <g transform="translate(-15, 5)">
          {isClosingEyes ? (
            <path d="M -7 0 Q 0 -5 7 0" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          ) : (
            <motion.g animate={{ scaleY: [1, 1, 0.1, 1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 0.98, 1] }}>
              <circle cx="0" cy="0" r="5" fill="#1E293B" />
              <circle cx="1.5" cy="-1.5" r="1.5" fill="white" />
            </motion.g>
          )}
        </g>

        {/* Mắt Phải */}
        <g transform="translate(15, 5)">
          {isClosingEyes ? (
            <path d="M -7 0 Q 0 -5 7 0" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          ) : (
            <motion.g animate={{ scaleY: [1, 1, 0.1, 1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 0.98, 1] }}>
              <circle cx="0" cy="0" r="5" fill="#1E293B" />
              <circle cx="1.5" cy="-1.5" r="1.5" fill="white" />
            </motion.g>
          )}
        </g>
        
        {/* Má hồng */}
        {isClosingEyes && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.6 }}>
            <ellipse cx="-22" cy="15" rx="5" ry="3" fill="#F43F5E" />
            <ellipse cx="22" cy="15" rx="5" ry="3" fill="#F43F5E" />
          </motion.g>
        )}
        
        {isPartyMode && <g transform="translate(0, 2) scale(1.1)"><Sunglasses /></g>}
      </motion.g>
    </motion.svg>
  );
}

// -------------------------------------------------------------
// 2. CORGI (DOG) - 2.5D Memoji Style
// -------------------------------------------------------------
export function DogSVG({ eyeOffset, isHappy, isPetting, isPartyMode, size = 150 }: PetProps) {
  const isClosingEyes = isHappy || isPetting;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="-60 -60 120 120"
      style={{ overflow: "visible", filter: "drop-shadow(0 15px 15px rgba(245, 158, 11, 0.2))" }}
    >
      <defs>
        <radialGradient id="dogBase" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>
        <radialGradient id="dogWhite" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FEF3C7" />
        </radialGradient>
      </defs>

      {/* Đuôi siêu ngắn ngoáy tít */}
      <motion.g
        animate={{ rotate: isPetting ? [0, 30, -30, 0] : [0, 15, -15, 0] }}
        transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
        style={{ originX: "0px", originY: "30px" }}
      >
        <circle cx="35" cy="20" r="12" fill="url(#dogBase)" />
        <circle cx="38" cy="18" r="6" fill="url(#dogWhite)" />
      </motion.g>

      {/* Thân mập */}
      <motion.g
        animate={{ scaleY: [1, 1.04, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ originY: "45px" }}
      >
        <path d="M -40 45 C -45 -10, 45 -10, 40 45 Z" fill="url(#dogBase)" />
        <path d="M -25 45 C -25 5, 25 5, 25 45 Z" fill="url(#dogWhite)" />
      </motion.g>

      {/* Đầu */}
      <motion.g animate={{ x: eyeOffset.x * 2, y: eyeOffset.y * 2 }} transition={{ type: "spring", stiffness: 100 }}>
        
        {/* Tai Trái to & tròn */}
        <motion.g 
          animate={{ rotate: isPetting ? -30 : 0 }} 
          transition={{ type: "spring" }}
          style={{ originX: "-25px", originY: "-15px" }}
        >
          <path d="M -15 -15 C -30 -50, -60 -40, -35 -5 Z" fill="url(#dogBase)" />
          <path d="M -20 -18 C -30 -40, -45 -35, -30 -10 Z" fill="#FCA5A5" />
        </motion.g>

        {/* Tai Phải */}
        <motion.g 
          animate={{ rotate: isPetting ? 30 : 0 }} 
          transition={{ type: "spring" }}
          style={{ originX: "25px", originY: "-15px" }}
        >
          <path d="M 15 -15 C 30 -50, 60 -40, 35 -5 Z" fill="url(#dogBase)" />
          <path d="M 20 -18 C 30 -40, 45 -35, 30 -10 Z" fill="#FCA5A5" />
        </motion.g>

        {/* Khối Mặt */}
        <rect x="-45" y="-20" width="90" height="65" rx="35" fill="url(#dogBase)" />
        <path d="M -45 10 C -25 -5, 0 10, 0 20 C 0 10, 25 -5, 45 10 C 45 45, -45 45, -45 10 Z" fill="url(#dogWhite)" />
        
        <path d="M -15 -20 Q 0 -10 15 -20 L 10 0 Q 0 10 -10 0 Z" fill="url(#dogWhite)" />

        {/* Mũi & Mồm hình W */}
        <circle cx="0" cy="18" r="7" fill="#1E293B" />
        {isClosingEyes ? (
          <path d="M -18 28 Q -9 35 0 28 Q 9 35 18 28" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        ) : (
          <>
            <path d="M -15 28 Q -7.5 35 0 25 Q 7.5 35 15 28" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M -5 28 Q 0 40 5 28 Z" fill="#FDA4AF" />
          </>
        )}

        {/* Mắt */}
        <g transform="translate(-20, 0)">
          {isClosingEyes ? (
            <path d="M -7 2 Q 0 -3 7 2" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
          ) : (
            <motion.g animate={{ scaleY: [1, 1, 0.1, 1, 1] }} transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.92, 0.95, 0.98, 1] }}>
              <circle cx="0" cy="0" r="6" fill="#1E293B" />
              <circle cx="2" cy="-2" r="2" fill="white" />
            </motion.g>
          )}
        </g>
        <g transform="translate(20, 0)">
          {isClosingEyes ? (
            <path d="M -7 2 Q 0 -3 7 2" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
          ) : (
            <motion.g animate={{ scaleY: [1, 1, 0.1, 1, 1] }} transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.92, 0.95, 0.98, 1] }}>
              <circle cx="0" cy="0" r="6" fill="#1E293B" />
              <circle cx="2" cy="-2" r="2" fill="white" />
            </motion.g>
          )}
        </g>
        
        {isPartyMode && <g transform="translate(0, 0) scale(1.2)"><Sunglasses /></g>}
      </motion.g>
    </motion.svg>
  );
}

// -------------------------------------------------------------
// 3. THỎ (BUNNY) - 2.5D Memoji Style
// -------------------------------------------------------------
export function BunnySVG({ eyeOffset, isHappy, isPetting, isPartyMode, size = 150 }: PetProps) {
  const isClosingEyes = isHappy || isPetting;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="-60 -60 120 120"
      style={{ overflow: "visible", filter: "drop-shadow(0 15px 15px rgba(244, 114, 182, 0.2))" }}
    >
      <defs>
        <radialGradient id="bunnyBase" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="80%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </radialGradient>
        <radialGradient id="bunnyEarInner" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FBCFE8" />
          <stop offset="100%" stopColor="#F472B6" />
        </radialGradient>
      </defs>

      {/* Đuôi cục bông */}
      <motion.g
        animate={{ scale: isPetting ? [1, 1.2, 1] : [1, 1.05, 1] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <circle cx="-35" cy="35" r="12" fill="url(#bunnyBase)" />
      </motion.g>

      {/* Thân */}
      <motion.g
        animate={{ scaleY: [1, 1.06, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ originY: "45px" }}
      >
        <circle cx="0" cy="20" r="35" fill="url(#bunnyBase)" />
      </motion.g>

      {/* Đầu */}
      <motion.g animate={{ x: eyeOffset.x * 2, y: eyeOffset.y * 2 }} transition={{ type: "spring", stiffness: 100 }}>
        
        {/* Tai Trái dài */}
        <motion.g 
          animate={{ rotate: isPetting ? -40 : -10 }} 
          transition={{ type: "spring" }}
          style={{ originX: "-10px", originY: "-20px" }}
        >
          <path d="M -10 -20 C -25 -70, -50 -60, -25 -10 Z" fill="url(#bunnyBase)" />
          <path d="M -13 -22 C -23 -55, -40 -50, -22 -15 Z" fill="url(#bunnyEarInner)" />
        </motion.g>

        {/* Tai Phải dài */}
        <motion.g 
          animate={{ rotate: isPetting ? 40 : 10 }} 
          transition={{ type: "spring" }}
          style={{ originX: "10px", originY: "-20px" }}
        >
          <path d="M 10 -20 C 25 -70, 50 -60, 25 -10 Z" fill="url(#bunnyBase)" />
          <path d="M 13 -22 C 23 -55, 40 -50, 22 -15 Z" fill="url(#bunnyEarInner)" />
        </motion.g>

        {/* Khối Mặt Tròn */}
        <circle cx="0" cy="-5" r="32" fill="url(#bunnyBase)" />

        {/* Má hồng mặc định */}
        <ellipse cx="-20" cy="5" rx="6" ry="4" fill="#FBCFE8" opacity={isClosingEyes ? 1 : 0.6} />
        <ellipse cx="20" cy="5" rx="6" ry="4" fill="#FBCFE8" opacity={isClosingEyes ? 1 : 0.6} />

        {/* Mũi & Miệng */}
        <circle cx="0" cy="8" r="4" fill="#F472B6" />
        <path d="M -6 14 Q 0 18 6 14" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />

        {/* Mắt to tròn lấp lánh */}
        <g transform="translate(-14, -5)">
          {isClosingEyes ? (
            <path d="M -6 0 Q 0 -6 6 0" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          ) : (
            <motion.g animate={{ scaleY: [1, 1, 0.1, 1, 1] }} transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.93, 0.96, 0.98, 1] }}>
              <circle cx="0" cy="0" r="7" fill="#1E293B" />
              <circle cx="2" cy="-2" r="2.5" fill="white" />
              <circle cx="-2" cy="2" r="1" fill="white" />
            </motion.g>
          )}
        </g>
        
        <g transform="translate(14, -5)">
          {isClosingEyes ? (
            <path d="M -6 0 Q 0 -6 6 0" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          ) : (
            <motion.g animate={{ scaleY: [1, 1, 0.1, 1, 1] }} transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.93, 0.96, 0.98, 1] }}>
              <circle cx="0" cy="0" r="7" fill="#1E293B" />
              <circle cx="2" cy="-2" r="2.5" fill="white" />
              <circle cx="-2" cy="2" r="1" fill="white" />
            </motion.g>
          )}
        </g>
        
        {isPartyMode && <g transform="translate(0, -6) scale(1.2)"><Sunglasses /></g>}
      </motion.g>
    </motion.svg>
  );
}
