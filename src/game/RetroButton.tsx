import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PixelButtonProps extends ButtonProps {
  pixelVariant?: "water" | "fertilizer" | "pesticide" | "skip";
}

const PixelButton = ({
  pixelVariant,
  className,
  children,
  ...props
}: PixelButtonProps) => {
  const variantClasses = {
    water: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800",
    fertilizer: "bg-green-600 hover:bg-green-700 active:bg-green-800",
    pesticide: "bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800",
    skip: "bg-gray-600 hover:bg-gray-700 active:bg-gray-800",
  };

  const variant = pixelVariant || "water";

  // Render icon as pixel art placeholder
  const renderIcon = () => {
    const iconMap: Record<string, JSX.Element> = {
      water: (
        <div className="relative w-4 h-4 inline-block mr-2">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-4 bg-white rounded-b-full opacity-90" />
        </div>
      ),
      fertilizer: (
        <div className="relative w-4 h-4 inline-block mr-2">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-white" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-2 bg-white" />
        </div>
      ),
      pesticide: (
        <div className="relative w-4 h-4 inline-block mr-2">
          <div className="absolute top-0 left-0 w-4 h-3 bg-white rounded-t" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white" />
        </div>
      ),
      skip: (
        <div className="relative w-4 h-4 inline-block mr-2">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-0 h-0 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent" />
          <div className="absolute top-1/2 left-2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent" />
        </div>
      ),
    };

    return iconMap[variant];
  };

  return (
    <Button
      {...props}
      className={cn(
        "retro-border font-bold uppercase tracking-wider text-white transition-all duration-100 pixel-perfect",
        "hover:translate-y-[-2px] active:translate-y-[2px]",
        "retro-shadow active:shadow-[2px_2px_0_rgba(0,0,0,0.5)]",
        variantClasses[variant],
        className
      )}>
      {renderIcon()}
      {children}
    </Button>
  );
};

export default PixelButton;
