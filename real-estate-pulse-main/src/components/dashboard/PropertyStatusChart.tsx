import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "For Sale", value: 45, color: "hsl(174, 72%, 56%)" },
  { name: "Sold", value: 28, color: "hsl(160, 84%, 39%)" },
  { name: "Pending", value: 18, color: "hsl(38, 92%, 60%)" },
  { name: "Off Market", value: 9, color: "hsl(222, 30%, 45%)" },
];

export function PropertyStatusChart() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-xl sm:rounded-2xl border border-border bg-card p-4 sm:p-6 hover-lift">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-foreground">Property Status</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">Current portfolio distribution</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={4}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 47%, 14%)",
                  border: "1px solid hsl(222, 30%, 22%)",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "hsl(210, 40%, 98%)" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl sm:text-2xl font-bold text-foreground">{total}</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground">Properties</span>
          </div>
        </div>
        <div className="flex-1 w-full space-y-2 sm:space-y-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between group">
              <div className="flex items-center gap-2 sm:gap-3">
                <div 
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-transform group-hover:scale-125" 
                  style={{ backgroundColor: item.color }} 
                />
                <span className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-xs sm:text-sm font-semibold text-foreground">{item.value}</span>
                <span className="text-[10px] sm:text-xs text-muted-foreground">
                  ({Math.round((item.value / total) * 100)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
