import { useState } from "react";
import { Search, Plus, Mail, Phone, Clock, MoreHorizontal, Filter, MessageSquare, UserCheck, Calendar, ArrowUpRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  property: string;
  propertyImage: string;
  status: "new" | "contacted" | "qualified" | "negotiating" | "closed" | "lost";
  source: "website" | "referral" | "social" | "ads";
  priority: "high" | "medium" | "low";
  budget: string;
  notes: string;
  createdAt: string;
  lastContact: string;
  agent: string;
}

const leads: Lead[] = [
  { id: 1, name: "Robert Brown", email: "robert@email.com", phone: "+1 234 567 8901", property: "Sunset Villa", propertyImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=100&h=80&fit=crop", status: "new", source: "website", priority: "high", budget: "$2M - $3M", notes: "Interested in beachfront properties", createdAt: "2024-01-25", lastContact: "Just now", agent: "Sarah Johnson" },
  { id: 2, name: "Amanda White", email: "amanda@email.com", phone: "+1 234 567 8902", property: "Ocean View Apt", propertyImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&h=80&fit=crop", status: "contacted", source: "referral", priority: "high", budget: "$1.5M - $2M", notes: "Pre-approved for mortgage", createdAt: "2024-01-24", lastContact: "2 hours ago", agent: "Michael Chen" },
  { id: 3, name: "David Miller", email: "david@email.com", phone: "+1 234 567 8903", property: "Downtown Loft", propertyImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=100&h=80&fit=crop", status: "qualified", source: "ads", priority: "medium", budget: "$800K - $1.2M", notes: "Looking for investment property", createdAt: "2024-01-23", lastContact: "1 day ago", agent: "Emily Davis" },
  { id: 4, name: "Jennifer Lee", email: "jennifer@email.com", phone: "+1 234 567 8904", property: "Garden House", propertyImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&h=80&fit=crop", status: "negotiating", source: "social", priority: "high", budget: "$3M+", notes: "Viewing scheduled for next week", createdAt: "2024-01-20", lastContact: "3 days ago", agent: "James Wilson" },
  { id: 5, name: "Christopher Jones", email: "chris@email.com", phone: "+1 234 567 8905", property: "Mountain Retreat", propertyImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&h=80&fit=crop", status: "new", source: "website", priority: "low", budget: "$500K - $800K", notes: "First-time buyer", createdAt: "2024-01-25", lastContact: "5 hours ago", agent: "Lisa Anderson" },
  { id: 6, name: "Michelle Garcia", email: "michelle@email.com", phone: "+1 234 567 8906", property: "Coastal Retreat", propertyImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&h=80&fit=crop", status: "closed", source: "referral", priority: "high", budget: "$2M - $2.5M", notes: "Deal closed successfully!", createdAt: "2024-01-15", lastContact: "1 week ago", agent: "Sarah Johnson" },
];

const statusConfig = {
  new: { label: "New", className: "bg-primary/20 text-primary border-primary/30", icon: Star },
  contacted: { label: "Contacted", className: "bg-accent/20 text-accent border-accent/30", icon: MessageSquare },
  qualified: { label: "Qualified", className: "bg-purple-500/20 text-purple-400 border-purple-500/30", icon: UserCheck },
  negotiating: { label: "Negotiating", className: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: ArrowUpRight },
  closed: { label: "Closed", className: "bg-success/20 text-success border-success/30", icon: Star },
  lost: { label: "Lost", className: "bg-destructive/20 text-destructive border-destructive/30", icon: Star },
};

const priorityConfig = {
  high: { label: "High", className: "text-destructive" },
  medium: { label: "Medium", className: "text-accent" },
  low: { label: "Low", className: "text-muted-foreground" },
};

const sourceConfig = {
  website: "Website",
  referral: "Referral",
  social: "Social Media",
  ads: "Paid Ads",
};

export function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.property.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const leadsByStatus = {
    new: leads.filter(l => l.status === "new").length,
    contacted: leads.filter(l => l.status === "contacted").length,
    qualified: leads.filter(l => l.status === "qualified").length,
    negotiating: leads.filter(l => l.status === "negotiating").length,
    closed: leads.filter(l => l.status === "closed").length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leads</h1>
          <p className="text-sm text-muted-foreground">Manage your customer inquiries</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow gap-2">
          <Plus className="w-4 h-4" />
          Add Lead
        </Button>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(leadsByStatus).map(([status, count]) => {
          const config = statusConfig[status as keyof typeof statusConfig];
          const Icon = config.icon;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                "p-4 rounded-xl border transition-all hover-lift",
                statusFilter === status ? "ring-2 ring-primary" : "",
                config.className.replace("text-", "border-").replace("/20", "/30")
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={cn("w-4 h-4", config.className.split(" ")[1])} />
                <span className="text-sm font-medium text-foreground capitalize">{status}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{count}</p>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <Button variant="outline" className="gap-2" onClick={() => setStatusFilter("all")}>
          <Filter className="w-4 h-4" />
          Clear Filters
        </Button>
      </div>

      {/* Leads Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-4">Lead</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-4">Property</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-4">Status</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-4">Priority</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-4">Last Contact</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className={cn(
                      "hover:bg-secondary/20 transition-colors cursor-pointer",
                      selectedLead?.id === lead.id && "bg-secondary/30"
                    )}
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
                          {lead.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{lead.name}</p>
                          <p className="text-xs text-muted-foreground">{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <img src={lead.propertyImage} alt={lead.property} className="w-10 h-8 rounded object-cover" />
                        <span className="text-sm text-foreground">{lead.property}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={cn("px-2.5 py-1 text-xs font-medium rounded-full border", statusConfig[lead.status].className)}>
                        {statusConfig[lead.status].label}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={cn("text-sm font-medium", priorityConfig[lead.priority].className)}>
                        {priorityConfig[lead.priority].label}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-sm">{lead.lastContact}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Details */}
        <div className="rounded-2xl border border-border bg-card p-6">
          {selectedLead ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center text-lg font-bold text-primary-foreground">
                  {selectedLead.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{selectedLead.name}</h3>
                  <span className={cn("px-2.5 py-1 text-xs font-medium rounded-full border", statusConfig[selectedLead.status].className)}>
                    {statusConfig[selectedLead.status].label}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{selectedLead.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{selectedLead.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">Created {selectedLead.createdAt}</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 space-y-2">
                <p className="text-xs text-muted-foreground">Interested In</p>
                <div className="flex items-center gap-3">
                  <img src={selectedLead.propertyImage} alt={selectedLead.property} className="w-16 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="font-medium text-foreground">{selectedLead.property}</p>
                    <p className="text-xs text-muted-foreground">Budget: {selectedLead.budget}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Notes</p>
                <p className="text-sm text-foreground">{selectedLead.notes}</p>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-primary hover:opacity-90 text-primary-foreground">
                  <Mail className="w-4 h-4 mr-2" /> Send Email
                </Button>
                <Button variant="outline" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" /> Call
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Select a Lead</h3>
              <p className="text-sm text-muted-foreground mt-1">Click on a lead to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
