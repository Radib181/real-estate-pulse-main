import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
  gradient: "primary" | "accent" | "success" | "secondary";
  delay?: number;
}

const gradientClasses = {
  primary: "from-primary/20 to-primary/5 border-primary/30",
  accent: "from-accent/20 to-accent/5 border-accent/30",
  success: "from-success/20 to-success/5 border-success/30",
  secondary: "from-secondary to-secondary/50 border-border",
};

const iconBgClasses = {
  primary: "bg-gradient-primary shadow-[0_0_20px_hsl(174,72%,56%,0.3)]",
  accent: "bg-gradient-accent shadow-[0_0_20px_hsl(38,92%,60%,0.3)]",
  success: "bg-gradient-success shadow-[0_0_20px_hsl(160,84%,39%,0.3)]",
  secondary: "bg-secondary",
};

export function KPICard({ title, value, change, changeLabel, icon: Icon, gradient, delay = 0 }: KPICardProps) {
  const isPositive = change >= 0;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl sm:rounded-2xl border bg-gradient-to-br p-3 sm:p-4 lg:p-6 hover-lift group",
        gradientClasses[gradient]
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex items-start justify-between gap-2">
        <div className="space-y-1 sm:space-y-2 lg:space-y-3 min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground animate-count-up">{value}</p>
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            <span className={cn(
              "flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm font-medium",
              isPositive ? "text-success" : "text-destructive"
            )}>
              {isPositive ? <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />}
              {isPositive ? "+" : ""}{change}%
            </span>
            <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:inline">{changeLabel}</span>
          </div>
        </div>
        <div className={cn(
          "w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 flex-shrink-0",
          iconBgClasses[gradient]
        )}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
}
