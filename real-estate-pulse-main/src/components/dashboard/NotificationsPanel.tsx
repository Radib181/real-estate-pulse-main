import { Bell, X, Check, AlertCircle, DollarSign, Users, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: number;
  type: "sale" | "lead" | "alert" | "property";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  { id: 1, type: "sale", title: "New Sale!", message: "Sunset Villa sold for $1.2M", time: "2 min ago", read: false },
  { id: 2, type: "lead", title: "New Lead", message: "Robert Brown interested in Ocean View", time: "15 min ago", read: false },
  { id: 3, type: "alert", title: "Price Alert", message: "Mountain Retreat price drop detected", time: "1 hour ago", read: true },
  { id: 4, type: "property", title: "Property Update", message: "Downtown Loft photos added", time: "3 hours ago", read: true },
];

const iconConfig = {
  sale: { icon: DollarSign, className: "bg-success/20 text-success" },
  lead: { icon: Users, className: "bg-primary/20 text-primary" },
  alert: { icon: AlertCircle, className: "bg-accent/20 text-accent" },
  property: { icon: Home, className: "bg-purple-500/20 text-purple-400" },
};

export function NotificationsPanel() {
  return (
    <div className="rounded-xl sm:rounded-2xl border border-border bg-card p-3 sm:p-4 lg:p-6 hover-lift">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-destructive rounded-full" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground">Notifications</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">4 new updates</p>
          </div>
        </div>
        <button className="text-[10px] sm:text-xs text-primary hover:text-primary/80 transition-colors font-medium">
          Mark all read
        </button>
      </div>
      <div className="space-y-2 sm:space-y-3">
        {notifications.map((notification) => {
          const Icon = iconConfig[notification.type].icon;
          return (
            <div
              key={notification.id}
              className={cn(
                "flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 cursor-pointer group",
                notification.read ? "opacity-60" : "bg-secondary/30",
                "hover:bg-secondary/50"
              )}
            >
              <div className={cn(
                "w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0",
                iconConfig[notification.type].className
              )}>
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-foreground text-xs sm:text-sm">{notification.title}</p>
                  {!notification.read && (
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                  )}
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">{notification.message}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{notification.time}</p>
              </div>
              <button className="p-1 sm:p-1.5 rounded-lg hover:bg-secondary opacity-0 group-hover:opacity-100 transition-all">
                <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground" />
              </button>
            </div>
          );
        })}
      </div>
      <button className="w-full mt-3 sm:mt-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-primary hover:text-primary/80 transition-colors border border-border rounded-lg sm:rounded-xl hover:bg-secondary/50">
        View All Notifications
      </button>
    </div>
  );
}
