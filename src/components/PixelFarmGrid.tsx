import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FarmTileProps {
  growth: number;
  waterLevel: number;
  soilHealth: number;
  index: number;
}

const FarmTile = ({ growth, waterLevel, soilHealth, index }: FarmTileProps) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(timer);
  }, [growth, waterLevel]);

  const getCropEmoji = () => {
    if (growth === 0) return "🟫";
    if (growth < 25) return "🌱";
    if (growth < 50) return "🌿";
    if (growth < 75) return "🌾";
    return "🌽";
  };

  const getSoilColor = () => {
    if (waterLevel > 70) return "bg-amber-900";
    if (waterLevel > 40) return "bg-amber-800";
    return "bg-amber-700";
  };

  const getTileStyle = () => {
    const baseStyle = "relative w-16 h-16 rounded border-2 transition-all duration-300 flex items-center justify-center";
    const borderColor = soilHealth > 70 ? "border-green-600" : "border-amber-600";
    return cn(baseStyle, getSoilColor(), borderColor, animate && "scale-110");
  };

  return (
    <div 
      className={getTileStyle()}
      style={{
        animationDelay: `${index * 50}ms`,
        boxShadow: waterLevel > 60 ? "inset 0 0 8px rgba(59, 130, 246, 0.5)" : "none"
      }}
    >
      <span className="text-3xl drop-shadow-md" style={{ imageRendering: "pixelated" }}>
        {getCropEmoji()}
      </span>
      {waterLevel > 80 && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
      )}
    </div>
  );
};

interface PixelFarmGridProps {
  cropGrowth: number;
  waterLevel: number;
  soilHealth: number;
}

const PixelFarmGrid = ({ cropGrowth, waterLevel, soilHealth }: PixelFarmGridProps) => {
  const tiles = Array.from({ length: 16 }, (_, i) => ({
    growth: Math.max(0, cropGrowth + (Math.random() * 20 - 10)),
    waterLevel: Math.max(0, waterLevel + (Math.random() * 20 - 10)),
    soilHealth: Math.max(0, soilHealth + (Math.random() * 10 - 5)),
    index: i,
  }));

  return (
    <div className="p-6 bg-gradient-to-b from-green-100 to-green-200 rounded-lg border-4 border-amber-900 shadow-2xl">
      <div className="grid grid-cols-4 gap-2 p-4 bg-amber-950/20 rounded-lg">
        {tiles.map((tile, i) => (
          <FarmTile key={i} {...tile} />
        ))}
      </div>
    </div>
  );
};

export default PixelFarmGrid;
