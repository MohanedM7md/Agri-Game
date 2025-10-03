import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PixelStatusBarProps {
  label: string;
  value: number;
  icon: string;
  color: "green" | "blue" | "orange" | "purple";
  optimal?: { min: number; max: number };
}

const PixelStatusBar = ({ label, value, icon, color, optimal }: PixelStatusBarProps) => {
  const isOptimal = optimal
    ? value >= optimal.min && value <= optimal.max
    : true;

  const colorClasses = {
    green: "from-green-600 to-green-400",
    blue: "from-blue-600 to-blue-400",
    orange: "from-orange-600 to-orange-400",
    purple: "from-purple-600 to-purple-400",
  };

  const textColorClasses = {
    green: "text-green-600",
    blue: "text-blue-600",
    orange: "text-orange-600",
    purple: "text-purple-600",
  };

  return (
    <div className="space-y-2 p-3 bg-amber-50 rounded-lg border-2 border-amber-900 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl drop-shadow" style={{ imageRendering: "pixelated" }}>
            {icon}
          </span>
          <span className="font-bold text-sm uppercase tracking-wide" style={{ fontFamily: "monospace" }}>
            {label}
          </span>
        </div>
        <span className={cn(
          "font-bold text-lg px-2 py-1 rounded border-2",
          isOptimal ? "bg-green-200 border-green-600 text-green-800" : "bg-orange-200 border-orange-600 text-orange-800"
        )} style={{ fontFamily: "monospace" }}>
          {value}%
        </span>
      </div>
      <div className="relative h-4 bg-amber-900 rounded-sm border-2 border-amber-950 overflow-hidden">
        <div 
          className={cn("h-full bg-gradient-to-r transition-all duration-500", colorClasses[color])}
          style={{ 
            width: `${value}%`,
            boxShadow: "inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      </div>
      {optimal && !isOptimal && (
        <p className="text-xs font-bold text-orange-700" style={{ fontFamily: "monospace" }}>
          ⚠ OPTIMAL: {optimal.min}%-{optimal.max}%
        </p>
      )}
    </div>
  );
};

export default PixelStatusBar;
