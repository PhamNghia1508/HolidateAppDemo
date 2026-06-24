import { motion } from "framer-motion";

interface MeshGradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function MeshGradientBackground({ children, className = "" }: MeshGradientBackgroundProps) {
  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Mesh gradient layers */}
      <div className="absolute inset-0 mesh-gradient-bg" />
      
      {/* Floating blobs */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(180,140,220,0.25) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(95,179,192,0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ x: [0, -20, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(231,111,81,0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ x: [0, 20, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] left-[10%] w-[40%] h-[40%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(233,196,106,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, 15, 0], y: [0, 10, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grain overlay */}
      <div className="grain-overlay pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
