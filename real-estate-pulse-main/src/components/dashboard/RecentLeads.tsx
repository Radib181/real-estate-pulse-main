import { Mail, Phone, Clock, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  property: string;
  status: "new" | "contacted" | "qualified" | "negotiating";
  time: string;
}

const leads: Lead[] = [
  { id: 1, name: "Robert Brown", email: "robert@email.com", phone: "+1 234 567 8901", property: "Sunset Villa", status: "new", time: "5 min ago" },
  { id: 2, name: "Amanda White", email: "amanda@email.com", phone: "+1 234 567 8902", property: "Ocean View Apt", status: "contacted", time: "15 min ago" },
  { id: 3, name: "David Miller", email: "david@email.com", phone: "+1 234 567 8903", property: "Downtown Loft", status: "qualified", time: "1 hour ago" },
  { id: 4, name: "Jennifer Lee", email: "jennifer@email.com", phone: "+1 234 567 8904", property: "Garden House", status: "negotiating", time: "2 hours ago" },
  { id: 5, name: "Christopher Jones", email: "chris@email.com", phone: "+1 234 567 8905", property: "Mountain Retreat", status: "new", time: "3 hours ago" },
];

const statusConfig = {
  new: { label: "New", className: "bg-primary/20 text-primary border-primary/30" },
  contacted: { label: "Contacted", className: "bg-accent/20 text-accent border-accent/30" },
  qualified: { label: "Qualified", className: "bg-success/20 text-success border-success/30" },
  negotiating: { label: "Negotiating", className: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
};

export function RecentLeads() {
  return (
    <div className="rounded-xl sm:rounded-2xl border border-border bg-card p-3 sm:p-4 lg:p-6 hover-lift">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-foreground">Recent Leads</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">Latest customer inquiries</p>
        </div>
        <button className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors font-medium">
          View All
        </button>
      </div>
      
      {/* Mobile Card Layout */}
      <div className="sm:hidden space-y-3">
        {leads.map((lead) => (
          <div key={lead.id} className="p-3 rounded-xl bg-secondary/30 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-xs font-semibold text-primary-foreground flex-shrink-0">
                  {lead.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">{lead.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{lead.property}</p>
                </div>
              </div>
              <span className={cn(
                "inline-flex px-2 py-0.5 text-[10px] font-medium rounded-full border flex-shrink-0",
                statusConfig[lead.status].className
              )}>
                {statusConfig[lead.status].label}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span className="text-xs">{lead.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-secondary rounded-lg transition-colors">
                  <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <button className="p-1.5 hover:bg-secondary rounded-lg transition-colors">
                  <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden sm:block overflow-x-auto -mx-3 sm:-mx-4 lg:-mx-6 px-3 sm:px-4 lg:px-6">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-2">Lead</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-2">Property</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-2">Status</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-2">Time</th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.map((lead) => (
              <tr key={lead.id} className="group hover:bg-secondary/30 transition-colors">
                <td className="py-3 sm:py-4 px-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
                      {lead.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{lead.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{lead.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 sm:py-4 px-2">
                  <span className="text-sm text-foreground">{lead.property}</span>
                </td>
                <td className="py-3 sm:py-4 px-2">
                  <span className={cn(
                    "inline-flex px-2 py-0.5 text-xs font-medium rounded-full border",
                    statusConfig[lead.status].className
                  )}>
                    {statusConfig[lead.status].label}
                  </span>
                </td>
                <td className="py-3 sm:py-4 px-2">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-sm">{lead.time}</span>
                  </div>
                </td>
                <td className="py-3 sm:py-4 px-2">
                  <div className="flex items-center justify-end gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 sm:p-2 hover:bg-secondary rounded-lg transition-colors">
                      <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 sm:p-2 hover:bg-secondary rounded-lg transition-colors">
                      <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 sm:p-2 hover:bg-secondary rounded-lg transition-colors">
                      <MoreHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
