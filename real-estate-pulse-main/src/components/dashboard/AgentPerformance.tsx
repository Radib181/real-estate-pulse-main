import { TrendingUp, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface Agent {
  id: number;
  name: string;
  avatar: string;
  sales: number;
  revenue: string;
  growth: number;
  rank: number;
}

const agents: Agent[] = [
  { id: 1, name: "Sarah Johnson", avatar: "SJ", sales: 24, revenue: "$2.4M", growth: 18, rank: 1 },
  { id: 2, name: "Michael Chen", avatar: "MC", sales: 21, revenue: "$2.1M", growth: 12, rank: 2 },
  { id: 3, name: "Emily Davis", avatar: "ED", sales: 19, revenue: "$1.9M", growth: 8, rank: 3 },
  { id: 4, name: "James Wilson", avatar: "JW", sales: 16, revenue: "$1.6M", growth: 15, rank: 4 },
  { id: 5, name: "Lisa Anderson", avatar: "LA", sales: 14, revenue: "$1.4M", growth: 5, rank: 5 },
];

const rankColors = {
  1: "from-amber-400 to-amber-600",
  2: "from-slate-300 to-slate-500",
  3: "from-amber-600 to-amber-800",
};

export function AgentPerformance() {
  return (
    <div className="rounded-xl sm:rounded-2xl border border-border bg-card p-3 sm:p-4 lg:p-6 hover-lift">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-foreground">Top Agents</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">Performance this quarter</p>
        </div>
        <button className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors font-medium">
          View All
        </button>
      </div>
      <div className="space-y-2 sm:space-y-3 lg:space-y-4">
        {agents.map((agent, index) => (
          <div
            key={agent.id}
            className={cn(
              "flex items-center gap-2 sm:gap-3 lg:gap-4 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 group cursor-pointer",
              "hover:bg-secondary/50 hover:shadow-lg"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative">
              <div className={cn(
                "w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl flex items-center justify-center font-semibold text-xs sm:text-sm transition-transform group-hover:scale-110",
                agent.rank <= 3 
                  ? `bg-gradient-to-br ${rankColors[agent.rank as keyof typeof rankColors]} text-primary-foreground`
                  : "bg-secondary text-foreground"
              )}>
                {agent.avatar}
              </div>
              {agent.rank <= 3 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-background flex items-center justify-center">
                  <Award className={cn(
                    "w-2.5 h-2.5 sm:w-3.5 sm:h-3.5",
                    agent.rank === 1 ? "text-amber-400" : agent.rank === 2 ? "text-slate-400" : "text-amber-600"
                  )} />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm truncate">{agent.name}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">{agent.sales} sales • {agent.revenue}</p>
            </div>
            <div className="flex items-center gap-0.5 sm:gap-1 text-success flex-shrink-0">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">+{agent.growth}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
