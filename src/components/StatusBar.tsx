import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StatusBarProps {
  label: string;
  value: number;
  icon: string;
  optimal?: { min: number; max: number };
}

const StatusBar = ({ label, value, icon, optimal }: StatusBarProps) => {
  const isOptimal = optimal
    ? value >= optimal.min && value <= optimal.max
    : true;

  const getBarColor = () => {
    if (!optimal) return "bg-primary";
    if (value < optimal.min) return "bg-warning";
    if (value > optimal.max) return "bg-destructive";
    return "bg-success";
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <span className="font-semibold">{label}</span>
        </div>
        <span className={cn(
          "font-bold text-lg",
          isOptimal ? "text-success" : "text-warning"
        )}>
          {value}%
        </span>
      </div>
      <div className="relative">
        <Progress value={value} className="h-3" />
        <div 
          className={cn("absolute inset-0 h-3 rounded-full transition-all", getBarColor())}
          style={{ width: `${value}%` }}
        />
      </div>
      {optimal && !isOptimal && (
        <p className="text-xs text-warning">
          Optimal: {optimal.min}% - {optimal.max}%
        </p>
      )}
    </div>
  );
};

export default StatusBar;
