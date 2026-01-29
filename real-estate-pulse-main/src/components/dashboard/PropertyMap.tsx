import { MapPin, Filter, Maximize2, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Property {
  id: number;
  name: string;
  price: string;
  status: "available" | "pending" | "sold";
  state: string;
  city: string;
  // Approximate positions on USA map (percentage based)
  x: number;
  y: number;
}

const properties: Property[] = [
  { id: 1, name: "Sunset Villa", price: "$1.2M", status: "available", state: "CA", city: "Los Angeles", x: 12, y: 55 },
  { id: 2, name: "Ocean View", price: "$890K", status: "pending", state: "FL", city: "Miami", x: 82, y: 85 },
  { id: 3, name: "Downtown Loft", price: "$650K", status: "available", state: "NY", city: "New York", x: 88, y: 32 },
  { id: 4, name: "Garden House", price: "$1.5M", status: "sold", state: "TX", city: "Houston", x: 50, y: 78 },
  { id: 5, name: "Mountain View", price: "$2.1M", status: "available", state: "CO", city: "Denver", x: 35, y: 45 },
  { id: 6, name: "Lake Front", price: "$1.8M", status: "pending", state: "WA", city: "Seattle", x: 12, y: 18 },
  { id: 7, name: "Beach House", price: "$3.2M", status: "available", state: "CA", city: "San Diego", x: 10, y: 62 },
  { id: 8, name: "City Center", price: "$780K", status: "sold", state: "IL", city: "Chicago", x: 62, y: 35 },
  { id: 9, name: "Desert Oasis", price: "$950K", status: "available", state: "AZ", city: "Phoenix", x: 22, y: 62 },
  { id: 10, name: "Historic Manor", price: "$1.1M", status: "pending", state: "MA", city: "Boston", x: 92, y: 26 },
];

const statusColors = {
  available: "bg-primary border-primary shadow-[0_0_12px_hsl(174,72%,56%,0.6)]",
  pending: "bg-accent border-accent shadow-[0_0_12px_hsl(38,92%,60%,0.6)]",
  sold: "bg-success border-success shadow-[0_0_12px_hsl(160,84%,39%,0.6)]",
};

// Simplified USA state boundaries path
const usaPath = `M 85 25 L 92 22 L 95 28 L 90 35 L 88 32 Z
M 12 15 L 18 12 L 22 18 L 18 25 L 12 22 Z
M 8 45 L 15 42 L 18 55 L 15 68 L 8 65 Z
M 18 55 L 25 50 L 32 55 L 28 65 L 20 62 Z
M 32 40 L 42 38 L 45 50 L 40 55 L 32 52 Z
M 45 35 L 55 32 L 58 45 L 52 52 L 45 48 Z
M 55 30 L 68 28 L 72 40 L 65 48 L 55 45 Z
M 68 25 L 78 22 L 82 35 L 75 42 L 68 38 Z
M 45 55 L 58 52 L 62 68 L 55 75 L 45 72 Z
M 58 55 L 72 52 L 78 70 L 68 78 L 58 72 Z
M 75 75 L 85 72 L 88 88 L 82 92 L 75 88 Z`;

export function PropertyMap() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [zoom, setZoom] = useState(1);

  return (
    <div className="rounded-xl sm:rounded-2xl border border-border bg-card overflow-hidden hover-lift">
      <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-border">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-foreground">Property Locations</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">Properties across the United States</p>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <button 
            onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
            className="p-1.5 sm:p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
          </button>
          <button 
            onClick={() => setZoom(Math.max(zoom - 0.2, 0.8))}
            className="p-1.5 sm:p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
          </button>
          <button className="p-1.5 sm:p-2 hover:bg-secondary rounded-lg transition-colors hidden sm:flex">
            <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
          </button>
          <button className="p-1.5 sm:p-2 hover:bg-secondary rounded-lg transition-colors hidden sm:flex">
            <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
      
      {/* USA Map Container */}
      <div className="relative h-52 sm:h-64 lg:h-80 bg-gradient-to-br from-secondary/30 via-muted/20 to-secondary/30 overflow-hidden">
        <div 
          className="absolute inset-0 transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* USA Outline SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* Background grid */}
            <defs>
              <pattern id="usaGrid" width="5" height="5" patternUnits="userSpaceOnUse">
                <path d="M 5 0 L 0 0 0 5" fill="none" stroke="hsl(222, 30%, 20%)" strokeWidth="0.1" />
              </pattern>
              {/* Glow filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <rect width="100" height="100" fill="url(#usaGrid)" />
            
            {/* USA mainland outline - simplified */}
            <path
              d="M 5 20 
                 C 8 15, 15 12, 20 15
                 L 25 14 L 28 18 L 25 22
                 L 22 28 L 18 32 L 15 38
                 L 12 45 L 10 52 L 8 60
                 L 10 68 L 12 72 L 15 70
                 C 18 68, 22 65, 28 62
                 L 35 58 L 42 55 L 48 52
                 L 55 50 L 62 48 L 68 50
                 L 72 55 L 75 62 L 78 68
                 L 82 75 L 85 80 L 88 85
                 C 90 88, 92 85, 90 80
                 L 88 72 L 85 65 L 82 58
                 L 80 50 L 78 42 L 80 35
                 L 85 28 L 90 22 L 95 25
                 L 92 32 L 88 38 L 85 42
                 L 82 35 L 78 30 L 75 25
                 L 70 22 L 65 20 L 60 22
                 L 55 25 L 50 28 L 45 30
                 L 40 32 L 35 30 L 30 28
                 L 25 25 L 20 22 L 15 20
                 L 10 18 L 5 20 Z"
              fill="hsl(222, 30%, 18%)"
              stroke="hsl(174, 72%, 56%)"
              strokeWidth="0.3"
              filter="url(#glow)"
            />

            {/* State divisions - simplified lines */}
            <g stroke="hsl(222, 30%, 28%)" strokeWidth="0.15" fill="none">
              {/* Western states */}
              <line x1="15" y1="15" x2="15" y2="70" />
              <line x1="25" y1="20" x2="25" y2="65" />
              <line x1="35" y1="25" x2="35" y2="60" />
              {/* Central states */}
              <line x1="45" y1="28" x2="45" y2="55" />
              <line x1="55" y1="25" x2="55" y2="52" />
              <line x1="65" y1="22" x2="65" y2="55" />
              {/* Eastern states */}
              <line x1="75" y1="25" x2="75" y2="75" />
              {/* Horizontal divisions */}
              <line x1="5" y1="35" x2="95" y2="35" />
              <line x1="5" y1="50" x2="95" y2="50" />
              <line x1="5" y1="65" x2="95" y2="65" />
            </g>

            {/* Alaska (simplified, smaller) */}
            <path
              d="M 2 75 L 8 72 L 12 78 L 10 85 L 5 82 Z"
              fill="hsl(222, 30%, 18%)"
              stroke="hsl(174, 72%, 56%)"
              strokeWidth="0.2"
            />

            {/* Hawaii (simplified) */}
            <g>
              <circle cx="18" cy="90" r="1.5" fill="hsl(222, 30%, 18%)" stroke="hsl(174, 72%, 56%)" strokeWidth="0.2" />
              <circle cx="22" cy="88" r="1" fill="hsl(222, 30%, 18%)" stroke="hsl(174, 72%, 56%)" strokeWidth="0.2" />
              <circle cx="25" cy="90" r="0.8" fill="hsl(222, 30%, 18%)" stroke="hsl(174, 72%, 56%)" strokeWidth="0.2" />
            </g>

            {/* Region labels */}
            <text x="12" y="45" className="fill-muted-foreground text-[2.5px] font-medium">WEST</text>
            <text x="48" y="42" className="fill-muted-foreground text-[2.5px] font-medium">CENTRAL</text>
            <text x="80" y="45" className="fill-muted-foreground text-[2.5px] font-medium">EAST</text>
          </svg>

          {/* Property Markers */}
          {properties.map((property) => (
            <div
              key={property.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
              style={{ left: `${property.x}%`, top: `${property.y}%` }}
              onClick={() => setSelectedProperty(property)}
            >
              <div className={cn(
                "relative w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-150",
                statusColors[property.status],
                selectedProperty?.id === property.id && "scale-150 ring-2 ring-white/50"
              )}>
                <MapPin className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 text-primary-foreground" />
              </div>
              
              {/* Tooltip - hidden on mobile, shown on hover for desktop */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 hidden sm:block">
                <div className="bg-card border border-border rounded-xl p-2 sm:p-3 shadow-xl whitespace-nowrap backdrop-blur-sm">
                  <p className="font-semibold text-foreground text-xs sm:text-sm">{property.name}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{property.city}, {property.state}</p>
                  <p className="text-primary font-bold mt-1 text-sm">{property.price}</p>
                  <p className="text-xs text-muted-foreground capitalize">{property.status}</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-card border-r border-b border-border transform rotate-45 -mt-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Selected property detail panel */}
        {selectedProperty && (
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 bg-card/95 backdrop-blur-md border border-border rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-xl z-30">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <h4 className="font-semibold text-foreground text-sm sm:text-base truncate">{selectedProperty.name}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">{selectedProperty.city}, {selectedProperty.state}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm sm:text-lg font-bold text-primary">{selectedProperty.price}</p>
                <span className={cn(
                  "inline-flex px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-full capitalize",
                  selectedProperty.status === "available" && "bg-primary/20 text-primary",
                  selectedProperty.status === "pending" && "bg-accent/20 text-accent",
                  selectedProperty.status === "sold" && "bg-success/20 text-success"
                )}>
                  {selectedProperty.status}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 sm:p-3 lg:p-4 border-t border-border">
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 flex-wrap">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary shadow-[0_0_8px_hsl(174,72%,56%,0.5)]" />
            <span className="text-[10px] sm:text-xs text-muted-foreground">Available ({properties.filter(p => p.status === 'available').length})</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-accent shadow-[0_0_8px_hsl(38,92%,60%,0.5)]" />
            <span className="text-[10px] sm:text-xs text-muted-foreground">Pending ({properties.filter(p => p.status === 'pending').length})</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-success shadow-[0_0_8px_hsl(160,84%,39%,0.5)]" />
            <span className="text-[10px] sm:text-xs text-muted-foreground">Sold ({properties.filter(p => p.status === 'sold').length})</span>
          </div>
        </div>
        <span className="text-[10px] sm:text-xs text-muted-foreground">{properties.length} properties</span>
      </div>
    </div>
  );
}
