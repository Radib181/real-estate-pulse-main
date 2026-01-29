import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", revenue: 4200, sales: 24 },
  { month: "Feb", revenue: 3800, sales: 21 },
  { month: "Mar", revenue: 5100, sales: 29 },
  { month: "Apr", revenue: 4600, sales: 26 },
  { month: "May", revenue: 5800, sales: 33 },
  { month: "Jun", revenue: 6200, sales: 38 },
  { month: "Jul", revenue: 5900, sales: 35 },
  { month: "Aug", revenue: 7100, sales: 42 },
  { month: "Sep", revenue: 6800, sales: 40 },
  { month: "Oct", revenue: 7500, sales: 45 },
  { month: "Nov", revenue: 8200, sales: 48 },
  { month: "Dec", revenue: 9100, sales: 52 },
];

export function RevenueChart() {
  return (
    <div className="rounded-xl sm:rounded-2xl border border-border bg-card p-4 sm:p-6 hover-lift">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-foreground">Revenue Overview</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">Monthly revenue and sales performance</p>
        </div>
        <div className="flex gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary" />
            <span className="text-[10px] sm:text-xs text-muted-foreground">Revenue ($K)</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-accent" />
            <span className="text-[10px] sm:text-xs text-muted-foreground">Sales</span>
          </div>
        </div>
      </div>
      <div className="h-48 sm:h-64 lg:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(174, 72%, 56%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(174, 72%, 56%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(38, 92%, 60%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(38, 92%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 22%)" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 10 }} 
              interval="preserveStartEnd"
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 10 }}
              tickFormatter={(value) => `$${value / 1000}K`}
              width={40}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 14%)",
                border: "1px solid hsl(222, 30%, 22%)",
                borderRadius: "12px",
                boxShadow: "0 10px 25px -5px hsl(222, 47%, 5%, 0.5)",
                fontSize: "12px",
              }}
              labelStyle={{ color: "hsl(210, 40%, 98%)" }}
              itemStyle={{ color: "hsl(215, 20%, 65%)" }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(174, 72%, 56%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="hsl(38, 92%, 60%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSales)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
