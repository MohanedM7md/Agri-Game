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

  // Render crop sprite based on growth - these are placeholders you can replace
  const renderCropSprite = () => {
    if (growth === 0) {
      // Empty soil - placeholder
      return (
        <div className="w-full h-full bg-gradient-to-br from-amber-700 to-amber-900 border border-amber-950" />
      );
    }
    if (growth < 25) {
      // Seedling sprite placeholder
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-amber-700 to-amber-900">
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-3 bg-green-600" />
        </div>
      );
    }
    if (growth < 50) {
      // Young plant sprite placeholder
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-amber-700 to-amber-900">
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-4 bg-green-700" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3 h-2 bg-green-600" />
        </div>
      );
    }
    if (growth < 75) {
      // Growing crop sprite placeholder
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-amber-700 to-amber-900">
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-6 bg-green-800" />
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-4 h-3 bg-green-500" />
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-400" />
        </div>
      );
    }
    // Mature crop sprite placeholder
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-amber-700 to-amber-900">
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-7 bg-green-900" />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-5 h-4 bg-green-600" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-500 border border-yellow-700" />
        <div className="absolute bottom-9 left-1/2 translate-x-1 w-2 h-2 bg-yellow-500" />
      </div>
    );
  };

  const getTileStyle = () => {
    const waterOpacity = waterLevel > 60 ? 0.3 : waterLevel > 30 ? 0.15 : 0;
    return cn(
      "relative w-14 h-14 border-2 transition-all duration-300 pixel-perfect",
      "border-amber-950",
      animate && "scale-110"
    );
  };

  return (
    <div
      className={getTileStyle()}
      style={{
        animationDelay: `${index * 50}ms`,
      }}>
      {renderCropSprite()}
      {/* Water overlay effect */}
      {waterLevel > 60 && (
        <div className="absolute inset-0 bg-blue-400/20 pointer-events-none" />
      )}
      {/* Low health indicator */}
      {soilHealth < 30 && (
        <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 animate-pulse" />
      )}
    </div>
  );
};

interface PixelFarmGridProps {
  cropGrowth: number;
  waterLevel: number;
  soilHealth: number;
}

const PixelFarmGrid = ({
  cropGrowth,
  waterLevel,
  soilHealth,
}: PixelFarmGridProps) => {
  const tiles = Array.from({ length: 16 }, (_, i) => ({
    growth: Math.max(0, cropGrowth + (Math.random() * 20 - 10)),
    waterLevel: Math.max(0, waterLevel + (Math.random() * 20 - 10)),
    soilHealth: Math.max(0, soilHealth + (Math.random() * 10 - 5)),
    index: i,
  }));

  return (
    <div className="retro-border p-4 bg-gradient-to-b from-green-800 to-green-900 retro-shadow">
      <div className="grid grid-cols-4 gap-1 p-2 bg-black/20">
        {tiles.map((tile, i) => (
          <FarmTile key={i} {...tile} />
        ))}
      </div>
    </div>
  );
};

export default PixelFarmGrid;
