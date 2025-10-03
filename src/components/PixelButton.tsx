import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PixelButtonProps extends ButtonProps {
  pixelVariant?: "water" | "fertilizer" | "pesticide" | "skip";
}

const PixelButton = ({ pixelVariant, className, children, ...props }: PixelButtonProps) => {
  const variantClasses = {
    water: "bg-blue-500 hover:bg-blue-600 border-blue-700 shadow-blue-900",
    fertilizer: "bg-green-500 hover:bg-green-600 border-green-700 shadow-green-900",
    pesticide: "bg-yellow-500 hover:bg-yellow-600 border-yellow-700 shadow-yellow-900",
    skip: "bg-gray-500 hover:bg-gray-600 border-gray-700 shadow-gray-900",
  };

  const variant = pixelVariant || "water";

  return (
    <Button
      {...props}
      className={cn(
        "border-4 rounded-sm font-bold uppercase tracking-wider text-white transition-all duration-150",
        "hover:translate-y-[-2px] active:translate-y-[2px]",
        "shadow-[0_4px_0_0] active:shadow-[0_2px_0_0]",
        variantClasses[variant],
        className
      )}
      style={{ 
        fontFamily: "monospace",
        imageRendering: "pixelated"
      }}
    >
      {children}
    </Button>
  );
};

export default PixelButton;
