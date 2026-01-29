import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, MapPin, Bed, Bath, Square, Edit, Trash2, Image, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";
import { Property } from "@/hooks/useProperties";
import { Button } from "@/components/ui/button";

const statusConfig = {
  available: { label: "For Sale", className: "bg-primary/20 text-primary border-primary/30" },
  pending: { label: "Pending", className: "bg-accent/20 text-accent border-accent/30" },
  sold: { label: "Sold", className: "bg-success/20 text-success border-success/30" },
  rented: { label: "Rented", className: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
};

interface SortablePropertyCardProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
  onManageImages: (property: Property) => void;
  onManageFeatures: (property: Property) => void;
}

export function SortablePropertyCard({
  property,
  onEdit,
  onDelete,
  onManageImages,
  onManageFeatures,
}: SortablePropertyCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: property.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const mainImage = property.images[0]?.url || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "rounded-2xl border border-border bg-card overflow-hidden group",
        isDragging && "opacity-50 shadow-2xl z-50"
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={mainImage}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <span
          className={cn(
            "absolute top-3 left-3 px-2.5 py-1 text-xs font-medium rounded-full border",
            statusConfig[property.status].className
          )}
        >
          {statusConfig[property.status].label}
        </span>
        
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="absolute top-3 right-3 p-2 rounded-lg bg-background/80 backdrop-blur-sm cursor-grab active:cursor-grabbing hover:bg-background transition-colors"
        >
          <GripVertical className="w-4 h-4 text-foreground" />
        </button>
        
        <p className="absolute bottom-3 left-3 text-xl font-bold text-foreground">
          ${property.price.toLocaleString()}
        </p>
        
        {/* Image count badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-background/80 backdrop-blur-sm text-xs text-foreground">
          <Image className="w-3 h-3" />
          {property.images.length}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-foreground truncate">{property.name}</h3>
        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
          <MapPin className="w-3.5 h-3.5" /> {property.location}
        </p>
        
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Bed className="w-4 h-4" />
            <span className="text-sm">{property.beds}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Bath className="w-4 h-4" />
            <span className="text-sm">{property.baths}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Square className="w-4 h-4" />
            <span className="text-sm">{property.sqft.toLocaleString()}</span>
          </div>
        </div>
        
        {/* Features preview */}
        {property.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {property.features.slice(0, 3).map((feature) => (
              <span
                key={feature.id}
                className="px-2 py-0.5 text-xs bg-secondary rounded-full text-muted-foreground"
              >
                {feature.name}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className="px-2 py-0.5 text-xs bg-secondary rounded-full text-muted-foreground">
                +{property.features.length - 3}
              </span>
            )}
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1.5"
            onClick={() => onManageImages(property)}
          >
            <Image className="w-3.5 h-3.5" />
            Images
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1.5"
            onClick={() => onManageFeatures(property)}
          >
            <ListChecks className="w-3.5 h-3.5" />
            Features
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit(property)}
          >
            <Edit className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive hover:border-destructive/30"
            onClick={() => onDelete(property.id)}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
