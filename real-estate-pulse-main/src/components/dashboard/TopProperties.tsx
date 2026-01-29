import { Bed, Bath, Square, Heart, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Property {
  id: number;
  name: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  trending: boolean;
  status: "available" | "pending" | "sold";
}

const properties: Property[] = [
  {
    id: 1,
    name: "Luxury Sunset Villa",
    location: "Beverly Hills, CA",
    price: "$2,450,000",
    beds: 5,
    baths: 4,
    sqft: 4500,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
    trending: true,
    status: "available",
  },
  {
    id: 2,
    name: "Modern Ocean View",
    location: "Malibu, CA",
    price: "$1,890,000",
    beds: 4,
    baths: 3,
    sqft: 3200,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    trending: true,
    status: "pending",
  },
  {
    id: 3,
    name: "Downtown Penthouse",
    location: "Los Angeles, CA",
    price: "$1,250,000",
    beds: 3,
    baths: 2,
    sqft: 2100,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
    trending: false,
    status: "available",
  },
];

const statusConfig = {
  available: { label: "For Sale", className: "bg-primary/20 text-primary" },
  pending: { label: "Pending", className: "bg-accent/20 text-accent" },
  sold: { label: "Sold", className: "bg-success/20 text-success" },
};

export function TopProperties() {
  return (
    <div className="rounded-xl sm:rounded-2xl border border-border bg-card p-3 sm:p-4 lg:p-6 hover-lift">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-foreground">Featured Properties</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">Top performing listings</p>
        </div>
        <button className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors font-medium flex items-center gap-1">
          View All
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {properties.map((property) => (
          <div
            key={property.id}
            className="group flex gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-secondary/30 transition-all duration-300 cursor-pointer"
          >
            <div className="relative w-20 h-16 sm:w-24 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {property.trending && (
                <div className="absolute top-1 left-1 bg-gradient-accent rounded-full p-0.5 sm:p-1">
                  <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary-foreground" />
                </div>
              )}
              <button className="absolute top-1 right-1 p-1 sm:p-1.5 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/80">
                <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-foreground" />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h4 className="font-semibold text-foreground text-sm truncate">{property.name}</h4>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{property.location}</p>
                </div>
                <span className={cn(
                  "text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full flex-shrink-0",
                  statusConfig[property.status].className
                )}>
                  {statusConfig[property.status].label}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 mt-1.5 sm:mt-2">
                <div className="flex items-center gap-0.5 sm:gap-1 text-muted-foreground">
                  <Bed className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="text-[10px] sm:text-xs">{property.beds}</span>
                </div>
                <div className="flex items-center gap-0.5 sm:gap-1 text-muted-foreground">
                  <Bath className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="text-[10px] sm:text-xs">{property.baths}</span>
                </div>
                <div className="flex items-center gap-0.5 sm:gap-1 text-muted-foreground">
                  <Square className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="text-[10px] sm:text-xs">{property.sqft.toLocaleString()} sqft</span>
                </div>
              </div>
              <p className="mt-1.5 sm:mt-2 text-sm sm:text-lg font-bold gradient-text">{property.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
