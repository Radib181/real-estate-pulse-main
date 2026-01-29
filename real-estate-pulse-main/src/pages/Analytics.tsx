import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Building2, Users, Eye, Calendar, ArrowUpRight, ArrowDownRight, Target, Clock, Award, BarChart3, PieChart as PieChartIcon, Activity, Percent, Home, MapPin } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Legend } from "recharts";
import { cn } from "@/lib/utils";

const revenueData = [
  { month: "Jan", revenue: 420000, expenses: 180000, profit: 240000, target: 400000 },
  { month: "Feb", revenue: 380000, expenses: 160000, profit: 220000, target: 420000 },
  { month: "Mar", revenue: 510000, expenses: 200000, profit: 310000, target: 450000 },
  { month: "Apr", revenue: 460000, expenses: 190000, profit: 270000, target: 480000 },
  { month: "May", revenue: 580000, expenses: 220000, profit: 360000, target: 500000 },
  { month: "Jun", revenue: 620000, expenses: 240000, profit: 380000, target: 550000 },
  { month: "Jul", revenue: 590000, expenses: 230000, profit: 360000, target: 580000 },
  { month: "Aug", revenue: 710000, expenses: 280000, profit: 430000, target: 620000 },
  { month: "Sep", revenue: 680000, expenses: 260000, profit: 420000, target: 650000 },
  { month: "Oct", revenue: 750000, expenses: 290000, profit: 460000, target: 700000 },
  { month: "Nov", revenue: 820000, expenses: 310000, profit: 510000, target: 750000 },
  { month: "Dec", revenue: 910000, expenses: 340000, profit: 570000, target: 800000 },
];

const salesByType = [
  { name: "Houses", value: 45, color: "hsl(174, 72%, 56%)" },
  { name: "Apartments", value: 28, color: "hsl(38, 92%, 60%)" },
  { name: "Condos", value: 18, color: "hsl(160, 84%, 39%)" },
  { name: "Villas", value: 9, color: "hsl(280, 65%, 60%)" },
];

const salesByLocation = [
  { location: "Beverly Hills", sales: 42, growth: 15 },
  { location: "Malibu", sales: 35, growth: 12 },
  { location: "Hollywood", sales: 28, growth: -5 },
  { location: "Santa Monica", sales: 24, growth: 8 },
  { location: "Pasadena", sales: 18, growth: 22 },
  { location: "Downtown LA", sales: 15, growth: -2 },
];

const weeklyViews = [
  { day: "Mon", views: 1200, uniqueVisitors: 890 },
  { day: "Tue", views: 1400, uniqueVisitors: 1020 },
  { day: "Wed", views: 1100, uniqueVisitors: 780 },
  { day: "Thu", views: 1600, uniqueVisitors: 1180 },
  { day: "Fri", views: 1800, uniqueVisitors: 1350 },
  { day: "Sat", views: 2200, uniqueVisitors: 1680 },
  { day: "Sun", views: 1900, uniqueVisitors: 1420 },
];

const agentPerformance = [
  { name: "Sales", fullMark: 100, value: 85 },
  { name: "Leads", fullMark: 100, value: 78 },
  { name: "Closings", fullMark: 100, value: 92 },
  { name: "Response", fullMark: 100, value: 88 },
  { name: "Reviews", fullMark: 100, value: 95 },
  { name: "Listings", fullMark: 100, value: 72 },
];

const conversionFunnel = [
  { stage: "Views", count: 12400, rate: 100 },
  { stage: "Inquiries", count: 3720, rate: 30 },
  { stage: "Showings", count: 1116, rate: 30 },
  { stage: "Offers", count: 335, rate: 30 },
  { stage: "Closed", count: 162, rate: 48 },
];

const marketTrends = [
  { month: "Jan", avgPrice: 850000, inventory: 245, daysOnMarket: 42 },
  { month: "Feb", avgPrice: 865000, inventory: 232, daysOnMarket: 38 },
  { month: "Mar", avgPrice: 890000, inventory: 218, daysOnMarket: 35 },
  { month: "Apr", avgPrice: 920000, inventory: 205, daysOnMarket: 32 },
  { month: "May", avgPrice: 945000, inventory: 195, daysOnMarket: 28 },
  { month: "Jun", avgPrice: 980000, inventory: 188, daysOnMarket: 25 },
];

const topAgents = [
  { name: "Sarah Johnson", sales: 24, revenue: "$2.4M", avatar: "https://i.pravatar.cc/150?img=1" },
  { name: "Michael Chen", sales: 21, revenue: "$2.1M", avatar: "https://i.pravatar.cc/150?img=3" },
  { name: "Emily Davis", sales: 19, revenue: "$1.9M", avatar: "https://i.pravatar.cc/150?img=5" },
  { name: "James Wilson", sales: 16, revenue: "$1.6M", avatar: "https://i.pravatar.cc/150?img=8" },
];

const kpis = [
  { title: "Total Revenue", value: "$7.43M", change: 12.5, icon: DollarSign, gradient: "primary" },
  { title: "Properties Sold", value: "162", change: 8.2, icon: Building2, gradient: "accent" },
  { title: "Active Leads", value: "847", change: 15.3, icon: Users, gradient: "success" },
  { title: "Property Views", value: "12.4K", change: -2.1, icon: Eye, gradient: "secondary" },
  { title: "Avg Days on Market", value: "28", change: -18.5, icon: Clock, gradient: "primary" },
  { title: "Conversion Rate", value: "4.8%", change: 6.2, icon: Target, gradient: "accent" },
];

export function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("year");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-sm text-muted-foreground">Comprehensive business intelligence & performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl border border-border overflow-hidden">
            {["week", "month", "quarter", "year"].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors capitalize",
                  dateRange === range
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          const isPositive = kpi.change >= 0;
          return (
            <div
              key={kpi.title}
              className={cn(
                "relative overflow-hidden rounded-2xl border p-4 hover-lift",
                kpi.gradient === "primary" && "border-primary/30 bg-gradient-to-br from-primary/20 to-primary/5",
                kpi.gradient === "accent" && "border-accent/30 bg-gradient-to-br from-accent/20 to-accent/5",
                kpi.gradient === "success" && "border-success/30 bg-gradient-to-br from-success/20 to-success/5",
                kpi.gradient === "secondary" && "border-border bg-card"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                  <div className="flex items-center gap-1">
                    {isPositive ? (
                      <ArrowUpRight className="w-3 h-3 text-success" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-destructive" />
                    )}
                    <span className={cn("text-xs font-medium", isPositive ? "text-success" : "text-destructive")}>
                      {isPositive ? "+" : ""}{kpi.change}%
                    </span>
                  </div>
                </div>
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  kpi.gradient === "primary" && "bg-gradient-primary shadow-glow",
                  kpi.gradient === "accent" && "bg-gradient-accent",
                  kpi.gradient === "success" && "bg-gradient-success",
                  kpi.gradient === "secondary" && "bg-secondary"
                )}>
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart - Spans 2 columns */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Revenue vs Target Analysis</h3>
              <p className="text-sm text-muted-foreground">Monthly performance compared to goals</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-xs text-muted-foreground">Profit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-2 border-accent" />
                <span className="text-xs text-muted-foreground">Target</span>
              </div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(174, 72%, 56%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(174, 72%, 56%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 22%)" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}K`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(222, 47%, 14%)", border: "1px solid hsl(222, 30%, 22%)", borderRadius: "12px" }}
                  formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, ""]}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(174, 72%, 56%)" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="profit" stroke="hsl(160, 84%, 39%)" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
                <Line type="monotone" dataKey="target" stroke="hsl(38, 92%, 60%)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Conversion Funnel</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Lead to closed deal journey</p>
          <div className="space-y-3">
            {conversionFunnel.map((stage, index) => {
              const width = (stage.count / conversionFunnel[0].count) * 100;
              return (
                <div key={stage.stage} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{stage.stage}</span>
                    <span className="font-medium text-foreground">{stage.count.toLocaleString()}</span>
                  </div>
                  <div className="h-6 bg-secondary/50 rounded-lg overflow-hidden relative">
                    <div 
                      className="h-full rounded-lg transition-all duration-500"
                      style={{ 
                        width: `${width}%`,
                        background: `linear-gradient(90deg, hsl(174, 72%, 56%) 0%, hsl(${174 - index * 20}, 72%, ${56 - index * 5}%) 100%)`
                      }}
                    />
                    {index < conversionFunnel.length - 1 && (
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                        {stage.rate}% →
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sales by Type */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-2">
            <PieChartIcon className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Sales by Type</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Property distribution</p>
          <div className="flex items-center gap-4">
            <div className="relative w-28 h-28">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={salesByType} cx="50%" cy="50%" innerRadius={35} outerRadius={50} paddingAngle={4} dataKey="value" strokeWidth={0}>
                    {salesByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-foreground">162</span>
                <span className="text-[10px] text-muted-foreground">Total</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              {salesByType.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-xs font-medium text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Performance Radar */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-success" />
            <h3 className="text-lg font-semibold text-foreground">Team Performance</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Overall metrics score</p>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={agentPerformance}>
                <PolarGrid stroke="hsl(222, 30%, 22%)" />
                <PolarAngleAxis dataKey="name" tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 10 }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar name="Performance" dataKey="value" stroke="hsl(174, 72%, 56%)" fill="hsl(174, 72%, 56%)" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Location */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Top Locations</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Sales by area</p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByLocation} layout="vertical" margin={{ left: -10, right: 10 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="location" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 10 }} width={75} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(222, 47%, 14%)", border: "1px solid hsl(222, 30%, 22%)", borderRadius: "8px" }} />
                <Bar dataKey="sales" fill="hsl(174, 72%, 56%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Agents */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Top Performers</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Leading agents this period</p>
          <div className="space-y-3">
            {topAgents.map((agent, index) => (
              <div key={agent.name} className="flex items-center gap-3">
                <div className="relative">
                  <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div className={cn(
                    "absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white",
                    index === 0 ? "bg-amber-500" : index === 1 ? "bg-slate-400" : index === 2 ? "bg-amber-700" : "bg-muted"
                  )}>
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{agent.name}</p>
                  <p className="text-xs text-muted-foreground">{agent.sales} sales</p>
                </div>
                <span className="text-sm font-semibold text-primary">{agent.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Trends */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Market Trends</h3>
              <p className="text-sm text-muted-foreground">Price, inventory & time on market</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">Avg Price</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-xs text-muted-foreground">Inventory</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={marketTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 22%)" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 12 }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}K`} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(222, 47%, 14%)", border: "1px solid hsl(222, 30%, 22%)", borderRadius: "12px" }} />
                <Line yAxisId="left" type="monotone" dataKey="avgPrice" stroke="hsl(174, 72%, 56%)" strokeWidth={3} dot={{ fill: "hsl(174, 72%, 56%)", strokeWidth: 0, r: 4 }} />
                <Bar yAxisId="right" dataKey="inventory" fill="hsl(38, 92%, 60%)" radius={[4, 4, 0, 0]} opacity={0.7} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Traffic */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Weekly Traffic Analysis</h3>
              <p className="text-sm text-muted-foreground">Views vs unique visitors</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">Page Views</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-xs text-muted-foreground">Unique Visitors</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyViews}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(174, 72%, 56%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(174, 72%, 56%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(38, 92%, 60%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(38, 92%, 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 22%)" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(222, 47%, 14%)", border: "1px solid hsl(222, 30%, 22%)", borderRadius: "12px" }} />
                <Area type="monotone" dataKey="views" stroke="hsl(174, 72%, 56%)" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="uniqueVisitors" stroke="hsl(38, 92%, 60%)" strokeWidth={2} fillOpacity={1} fill="url(#colorVisitors)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          { label: "Avg Deal Size", value: "$458K", icon: DollarSign },
          { label: "Response Time", value: "2.4 hrs", icon: Clock },
          { label: "Customer Rating", value: "4.8/5", icon: Award },
          { label: "Repeat Clients", value: "34%", icon: Users },
          { label: "Active Listings", value: "89", icon: Home },
          { label: "Win Rate", value: "48%", icon: Target },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-xl border border-border bg-card/50 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
