import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { PropertiesPage } from "./pages/Properties";
import { AgentsPage } from "./pages/Agents";
import { AnalyticsPage } from "./pages/Analytics";
import { LeadsPage } from "./pages/Leads";
import { SchedulePage } from "./pages/Schedule";
import { SettingsPage } from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          {/* Background gradient */}
          <div className="fixed inset-0 bg-gradient-glow pointer-events-none" />
          
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="lg:ml-64">
            <Header />
            <Routes>
              <Route path="/" element={<DashboardContent />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/agents" element={<AgentsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/leads" element={<LeadsPage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Dashboard content without layout wrapper
function DashboardContent() {
  return (
    <main className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
      <DashboardWidgets />
    </main>
  );
}

// Import dashboard widgets
import { DollarSign, Building2, Users, TrendingUp } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { PropertyStatusChart } from "@/components/dashboard/PropertyStatusChart";
import { AgentPerformance } from "@/components/dashboard/AgentPerformance";
import { RecentLeads } from "@/components/dashboard/RecentLeads";
import { PropertyMap } from "@/components/dashboard/PropertyMap";
import { TopProperties } from "@/components/dashboard/TopProperties";
import { NotificationsPanel } from "@/components/dashboard/NotificationsPanel";

const kpiData = [
  { title: "Total Revenue", value: "$12.4M", change: 12.5, changeLabel: "vs last month", icon: DollarSign, gradient: "primary" as const },
  { title: "Properties Listed", value: "248", change: 8.2, changeLabel: "vs last month", icon: Building2, gradient: "accent" as const },
  { title: "Active Agents", value: "42", change: 5.1, changeLabel: "vs last month", icon: Users, gradient: "success" as const },
  { title: "Sales This Month", value: "36", change: -2.3, changeLabel: "vs last month", icon: TrendingUp, gradient: "secondary" as const },
];

function DashboardWidgets() {
  return (
    <>
      {/* KPI Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {kpiData.map((kpi, index) => (
          <div key={kpi.title} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <KPICard {...kpi} />
          </div>
        ))}
      </section>

      {/* Charts Row */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "400ms" }}>
          <RevenueChart />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "500ms" }}>
          <PropertyStatusChart />
        </div>
      </section>

      {/* Map and Properties Row */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "600ms" }}>
          <PropertyMap />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "700ms" }}>
          <TopProperties />
        </div>
      </section>

      {/* Bottom Row */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "800ms" }}>
          <RecentLeads />
        </div>
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          <div className="animate-slide-up" style={{ animationDelay: "900ms" }}>
            <AgentPerformance />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "1000ms" }}>
            <NotificationsPanel />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
