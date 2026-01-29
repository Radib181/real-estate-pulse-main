import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  BarChart3, 
  MapPin, 
  MessageSquare, 
  Settings, 
  Bell,
  TrendingUp,
  Calendar,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Building2, label: "Properties", path: "/properties" },
  { icon: Users, label: "Agents", path: "/agents" },
  { icon: MapPin, label: "Locations", path: "/agents" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: MessageSquare, label: "Leads", path: "/leads", badge: 12 },
  { icon: Calendar, label: "Schedule", path: "/schedule" },
];

const bottomNavItems: NavItem[] = [
  { icon: Bell, label: "Notifications", path: "#", badge: 5 },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-xl bg-card border border-border"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300",
        "lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-sidebar-border">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-foreground">RealVista</h1>
            <p className="text-xs text-muted-foreground">Real Estate Pro</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavButton key={item.label} {...item} onClick={() => setIsMobileOpen(false)} />
          ))}
        </nav>

        {/* Bottom Navigation */}
        <div className="px-3 py-4 border-t border-sidebar-border space-y-1">
          {bottomNavItems.map((item) => (
            <NavButton key={item.label} {...item} onClick={() => setIsMobileOpen(false)} />
          ))}
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent/50 hover:bg-sidebar-accent transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-sm font-semibold text-primary-foreground">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">Admin</p>
            </div>
            <TrendingUp className="w-4 h-4 text-success" />
          </div>
        </div>
      </aside>
    </>
  );
}

function NavButton({ icon: Icon, label, path, badge, onClick }: NavItem & { onClick?: () => void }) {
  const location = useLocation();
  const isActive = location.pathname === path;

  if (path === "#") {
    return (
      <button
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
          "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
        )}
      >
        <Icon className="w-5 h-5" />
        <span className="flex-1 text-left">{label}</span>
        {badge && (
          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary/20 text-primary">
            {badge}
          </span>
        )}
      </button>
    );
  }

  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-gradient-primary text-primary-foreground shadow-glow"
          : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className={cn(
          "px-2 py-0.5 text-xs font-semibold rounded-full",
          isActive 
            ? "bg-primary-foreground/20 text-primary-foreground" 
            : "bg-primary/20 text-primary"
        )}>
          {badge}
        </span>
      )}
    </NavLink>
  );
}
