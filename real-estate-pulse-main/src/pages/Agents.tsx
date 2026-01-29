import { useState } from "react";
import { Search, Plus, Phone, Mail, MapPin, Star, TrendingUp, MoreHorizontal, Building2, DollarSign, Award } from "lucide-react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";

interface Agent {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  specialty: string;
  sales: number;
  revenue: string;
  rating: number;
  listings: number;
  status: "active" | "busy" | "offline";
  joinedDate: string;
  lat: number;
  lng: number;
}

const agents: Agent[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah@realvista.com", phone: "+1 234 567 8901", avatar: "https://i.pravatar.cc/150?img=1", location: "Beverly Hills, CA", specialty: "Luxury Homes", sales: 24, revenue: "$2.4M", rating: 4.9, listings: 12, status: "active", joinedDate: "2022-01-15", lat: 34.0736, lng: -118.4004 },
  { id: 2, name: "Michael Chen", email: "michael@realvista.com", phone: "+1 234 567 8902", avatar: "https://i.pravatar.cc/150?img=3", location: "Malibu, CA", specialty: "Beachfront", sales: 21, revenue: "$2.1M", rating: 4.8, listings: 8, status: "active", joinedDate: "2021-06-20", lat: 34.0259, lng: -118.7798 },
  { id: 3, name: "Emily Davis", email: "emily@realvista.com", phone: "+1 234 567 8903", avatar: "https://i.pravatar.cc/150?img=5", location: "Downtown LA, CA", specialty: "Apartments", sales: 19, revenue: "$1.9M", rating: 4.7, listings: 15, status: "busy", joinedDate: "2022-03-10", lat: 34.0407, lng: -118.2468 },
  { id: 4, name: "James Wilson", email: "james@realvista.com", phone: "+1 234 567 8904", avatar: "https://i.pravatar.cc/150?img=8", location: "Hollywood Hills, CA", specialty: "Celebrity Homes", sales: 16, revenue: "$1.6M", rating: 4.6, listings: 6, status: "active", joinedDate: "2021-09-05", lat: 34.1341, lng: -118.3215 },
  { id: 5, name: "Lisa Anderson", email: "lisa@realvista.com", phone: "+1 234 567 8905", avatar: "https://i.pravatar.cc/150?img=9", location: "Santa Monica, CA", specialty: "Family Homes", sales: 14, revenue: "$1.4M", rating: 4.5, listings: 10, status: "offline", joinedDate: "2023-01-20", lat: 34.0195, lng: -118.4912 },
  { id: 6, name: "David Martinez", email: "david@realvista.com", phone: "+1 234 567 8906", avatar: "https://i.pravatar.cc/150?img=12", location: "Pasadena, CA", specialty: "Historic Homes", sales: 12, revenue: "$1.2M", rating: 4.4, listings: 7, status: "active", joinedDate: "2022-08-15", lat: 34.1478, lng: -118.1445 },
];

const statusConfig = {
  active: { label: "Active", className: "bg-success/20 text-success" },
  busy: { label: "Busy", className: "bg-accent/20 text-accent" },
  offline: { label: "Offline", className: "bg-muted text-muted-foreground" },
};

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 34.0522,
  lng: -118.2437,
};

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#1a1d2e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a1d2e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#6b7280" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2a2f45" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#1a1d2e" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e1626" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#1a1d2e" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#1a2a1a" }] },
];

export function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const { isLoaded, loadError } = useGoogleMaps();

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Agents</h1>
          <p className="text-sm text-muted-foreground">{agents.length} agents in your team</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow gap-2">
          <Plus className="w-4 h-4" />
          Add Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Google Map */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Agent Locations</h3>
            <p className="text-sm text-muted-foreground">Real-time agent positions on Google Maps</p>
          </div>
          <div className="h-96">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={10}
                options={{
                  styles: darkMapStyle,
                  disableDefaultUI: false,
                  zoomControl: true,
                  mapTypeControl: false,
                  streetViewControl: false,
                  fullscreenControl: true,
                }}
              >
                {agents.map((agent) => (
                  <Marker
                    key={agent.id}
                    position={{ lat: agent.lat, lng: agent.lng }}
                    onClick={() => setSelectedAgent(agent)}
                    icon={{
                      url: agent.status === "active" 
                        ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%2334d399' stroke='%23fff' stroke-width='3'/%3E%3C/svg%3E"
                        : agent.status === "busy"
                        ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%23f59e0b' stroke='%23fff' stroke-width='3'/%3E%3C/svg%3E"
                        : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%236b7280' stroke='%23fff' stroke-width='3'/%3E%3C/svg%3E",
                      scaledSize: new google.maps.Size(32, 32),
                    }}
                  />
                ))}
                {selectedAgent && (
                  <InfoWindow
                    position={{ lat: selectedAgent.lat, lng: selectedAgent.lng }}
                    onCloseClick={() => setSelectedAgent(null)}
                  >
                    <div className="p-2 min-w-[180px]">
                      <div className="flex items-center gap-2 mb-2">
                        <img src={selectedAgent.avatar} alt={selectedAgent.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="font-semibold text-gray-900">{selectedAgent.name}</p>
                          <p className="text-xs text-gray-600">{selectedAgent.specialty}</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>📍 {selectedAgent.location}</p>
                        <p>💰 {selectedAgent.revenue} revenue</p>
                        <p>⭐ {selectedAgent.rating} rating</p>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            ) : loadError ? (
              <div className="h-full flex items-center justify-center bg-secondary/30">
                <p className="text-muted-foreground">{loadError}</p>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center bg-secondary/30">
                <div className="animate-pulse flex flex-col items-center gap-2">
                  <MapPin className="w-8 h-8 text-muted-foreground" />
                  <p className="text-muted-foreground">Loading map...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Agent Details */}
        <div className="rounded-2xl border border-border bg-card p-6">
          {selectedAgent ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img src={selectedAgent.avatar} alt={selectedAgent.name} className="w-16 h-16 rounded-2xl object-cover" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{selectedAgent.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedAgent.specialty}</p>
                  <span className={cn("inline-flex mt-1 px-2 py-0.5 text-xs font-medium rounded-full", statusConfig[selectedAgent.status].className)}>
                    {statusConfig[selectedAgent.status].label}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-secondary/50">
                  <DollarSign className="w-5 h-5 text-primary mb-1" />
                  <p className="text-lg font-bold text-foreground">{selectedAgent.revenue}</p>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                </div>
                <div className="p-3 rounded-xl bg-secondary/50">
                  <Building2 className="w-5 h-5 text-accent mb-1" />
                  <p className="text-lg font-bold text-foreground">{selectedAgent.sales}</p>
                  <p className="text-xs text-muted-foreground">Sales</p>
                </div>
                <div className="p-3 rounded-xl bg-secondary/50">
                  <Star className="w-5 h-5 text-amber-400 mb-1" />
                  <p className="text-lg font-bold text-foreground">{selectedAgent.rating}</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
                <div className="p-3 rounded-xl bg-secondary/50">
                  <TrendingUp className="w-5 h-5 text-success mb-1" />
                  <p className="text-lg font-bold text-foreground">{selectedAgent.listings}</p>
                  <p className="text-xs text-muted-foreground">Listings</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{selectedAgent.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{selectedAgent.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{selectedAgent.phone}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-primary hover:opacity-90 text-primary-foreground">
                  <Mail className="w-4 h-4 mr-2" /> Contact
                </Button>
                <Button variant="outline" className="flex-1">
                  View Profile
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Select an Agent</h3>
              <p className="text-sm text-muted-foreground mt-1">Click on a map marker to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Agents List */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">All Agents</h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-lg bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {filteredAgents.map((agent, index) => (
            <div
              key={agent.id}
              className={cn(
                "p-4 rounded-xl border border-border hover:bg-secondary/30 transition-all cursor-pointer",
                selectedAgent?.id === agent.id && "ring-2 ring-primary bg-secondary/30"
              )}
              onClick={() => setSelectedAgent(agent)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={agent.avatar} alt={agent.name} className="w-12 h-12 rounded-xl object-cover" />
                  {index < 3 && (
                    <Award className={cn(
                      "absolute -top-1 -right-1 w-4 h-4",
                      index === 0 ? "text-amber-400" : index === 1 ? "text-slate-400" : "text-amber-600"
                    )} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground truncate">{agent.name}</p>
                    <span className={cn("w-2 h-2 rounded-full flex-shrink-0",
                      agent.status === "active" ? "bg-success" : agent.status === "busy" ? "bg-accent" : "bg-muted-foreground"
                    )} />
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{agent.specialty} • {agent.location}</p>
                </div>
                <button className="p-1.5 hover:bg-secondary rounded-lg transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-foreground">{agent.revenue}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-medium text-foreground">{agent.rating}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{agent.listings} listings</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
