import { cn } from "@/lib/utils";

interface PixelStatusBarProps {
  label: string;
  value: number;
  icon: string;
  color: "green" | "blue" | "orange" | "purple";
  optimal?: { min: number; max: number };
}

const PixelStatusBar = ({
  label,
  value,
  icon,
  color,
  optimal,
}: PixelStatusBarProps) => {
  const isOptimal = optimal
    ? value >= optimal.min && value <= optimal.max
    : true;

  const colorClasses = {
    green: "bg-green-600",
    blue: "bg-blue-600",
    orange: "bg-orange-600",
    purple: "bg-purple-600",
  };

  const bgColorClasses = {
    green: "bg-green-900",
    blue: "bg-blue-900",
    orange: "bg-orange-900",
    purple: "bg-purple-900",
  };

  // Render icon as pixel art placeholder
  const renderIcon = () => {
    const iconMap: Record<string, JSX.Element> = {
      "🌱": (
        <div className="relative w-6 h-6">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-4 bg-green-700" />
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-2 bg-green-500" />
        </div>
      ),
      "💧": (
        <div className="relative w-6 h-6">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-5 bg-blue-500 rounded-b-full" />
          <div className="absolute top-2 left-1/2 translate-x-0.5 w-1 h-1 bg-blue-200" />
        </div>
      ),
      "🌡️": (
        <div className="relative w-6 h-6">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full" />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-3 bg-gray-400" />
        </div>
      ),
      "⚖️": (
        <div className="relative w-6 h-6">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-gray-600" />
          <div className="absolute top-0 left-0 w-2 h-2 bg-purple-500" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-purple-500" />
        </div>
      ),
    };

    return iconMap[icon] || <div className="w-6 h-6 bg-gray-500" />;
  };

  return (
    <div className="retro-border space-y-2 p-2 bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="pixel-perfect">{renderIcon()}</div>
          <span className="font-bold text-xs uppercase tracking-wider">
            {label}
          </span>
        </div>
        <span
          className={cn(
            "font-bold text-sm px-2 py-0.5 border-2",
            isOptimal
              ? "bg-green-600 border-green-800 text-white"
              : "bg-red-600 border-red-800 text-white"
          )}>
          {value}
        </span>
      </div>
      <div
        className={cn(
          "relative h-4 border-2 border-black overflow-hidden",
          bgColorClasses[color]
        )}>
        <div
          className={cn(
            "h-full transition-all duration-500",
            colorClasses[color]
          )}
          style={{ width: `${value}%` }}
        />
        {/* Pixel grid overlay for retro effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "4px 4px",
          }}
        />
      </div>
      {optimal && !isOptimal && (
        <p className="text-xs font-bold text-red-600">
          OPTIMAL: {optimal.min}%-{optimal.max}%
        </p>
      )}
    </div>
  );
};

export default PixelStatusBar;
