// src/components/PixelPlant.tsx
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PixelPlantProps {
  cropGrowth: number; // 0–100
  waterLevel: number;
  soilHealth: number;
  spriteSheet: string; // path like "/sprites/plant.png"
}

const PixelPlant = ({
  cropGrowth,
  waterLevel,
  soilHealth,
  spriteSheet,
}: PixelPlantProps) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(timer);
  }, [cropGrowth, waterLevel]);

  // Each sprite frame = 16×32 (total 5 frames → 80×32)
  // Scale up ×4 → 64×128
  const frameWidth = 64;
  const frameHeight = 128;

  // 🌾 Five growth stages (0–4)
  const getFrameIndex = () => {
    if (cropGrowth < 20) return 0; // seed
    if (cropGrowth < 40) return 1; // sprout
    if (cropGrowth < 60) return 2; // young
    if (cropGrowth < 80) return 3; // mature
    return 4; // dying / final
  };

  const frame = getFrameIndex();

  // For stage 0, shift down & lower opacity
  const isSeedStage = frame === 0;
  const bottomOffset = isSeedStage ? "bottom-[40px]" : "bottom-[48px]";
  const opacity = isSeedStage ? 0.65 : 1;

  return (
    <div
      className={cn(
        "relative w-48 h-48 border-2 border-amber-900",
        "transition-all duration-300 pixel-perfect overflow-hidden",
        animate && "scale-110"
      )}>
      {/* ☁️ Upper half - sky / air */}
      <div
        className="absolute top-0 w-full h-1/2"
        style={{
          background: "linear-gradient(to bottom, #8bd3ff 0%, #b6f2c7 100%)",
        }}
      />

      {/* 🪴 Bottom half - soil */}
      <div
        className="absolute bottom-0 w-full h-1/2"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #4b3a2e 0 8px, #5c4a3a 8px 16px, #3c2e23 16px 24px)",
        }}
      />

      {/* 🌱 Plant sprite anchored to soil line */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 ${bottomOffset}`}
        style={{
          width: `${frameWidth}px`,
          height: `${frameHeight}px`,
          backgroundImage: `url(${spriteSheet})`,
          backgroundPosition: `-${frame * frameWidth}px 0px`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${frameWidth * 5}px ${frameHeight}px`,
          imageRendering: "pixelated",
          opacity,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* 💧 Water overlay */}
      {waterLevel > 60 && (
        <div className="absolute inset-0 bg-blue-400/20 pointer-events-none" />
      )}

      {/* ❤️ Low soil indicator */}
      {soilHealth < 30 && (
        <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 animate-pulse" />
      )}
    </div>
  );
};

export default PixelPlant;
