import { Search, Bell, Calendar, ChevronDown, Plus, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="h-14 sm:h-16 border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-30">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between">
        {/* Mobile: Empty space for sidebar toggle, Desktop: Title */}
        <div className="lg:block hidden">
          <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {today}
          </p>
        </div>
        
        {/* Mobile spacer for hamburger menu */}
        <div className="lg:hidden w-10" />

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search - hidden on mobile */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search properties, agents..."
              className="w-48 lg:w-64 h-10 pl-10 pr-4 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded hidden lg:inline">
              ⌘K
            </kbd>
          </div>

          {/* Add Property Button - hidden on mobile */}
          <Button className="hidden sm:flex bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow gap-2 h-9 sm:h-10 text-sm">
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">Add Property</span>
          </Button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-xl bg-secondary/50 border border-border hover:bg-secondary transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground hover:text-foreground transition-colors" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground hover:text-foreground transition-colors" />
            )}
          </button>

          {/* Notifications */}
          <button className="relative p-2 sm:p-2.5 rounded-xl bg-secondary/50 border border-border hover:bg-secondary transition-colors group">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />
          </button>

          {/* Profile Dropdown - simplified on mobile */}
          <button className="flex items-center gap-2 sm:gap-3 p-1 sm:p-1.5 sm:pr-3 rounded-xl bg-secondary/50 border border-border hover:bg-secondary transition-colors">
            <img 
              src="https://i.pravatar.cc/150?img=68" 
              alt="Profile" 
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover"
            />
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}
