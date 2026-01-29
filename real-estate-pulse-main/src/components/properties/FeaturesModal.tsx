import { useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X, Plus, GripVertical, Trash2, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Property, PropertyFeature } from "@/hooks/useProperties";
import { cn } from "@/lib/utils";

interface FeaturesModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onAddFeature: (propertyId: string, name: string) => void;
  onRemoveFeature: (propertyId: string, featureId: string) => void;
  onReorderFeatures: (propertyId: string, activeId: string, overId: string) => void;
}

function SortableFeature({
  feature,
  onRemove,
}: {
  feature: PropertyFeature;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: feature.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl border border-border bg-secondary/50 group",
        isDragging && "opacity-50 shadow-xl z-50"
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="p-1.5 rounded-lg hover:bg-secondary cursor-grab active:cursor-grabbing transition-colors"
      >
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </button>
      <span className="flex-1 text-foreground">{feature.name}</span>
      <button
        onClick={onRemove}
        className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-destructive/20 transition-all"
      >
        <Trash2 className="w-4 h-4 text-destructive" />
      </button>
    </div>
  );
}

export function FeaturesModal({
  property,
  isOpen,
  onClose,
  onAddFeature,
  onRemoveFeature,
  onReorderFeatures,
}: FeaturesModalProps) {
  const [newFeature, setNewFeature] = useState("");

  if (!isOpen || !property) return null;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      onReorderFeatures(property.id, String(active.id), String(over.id));
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      onAddFeature(property.id, newFeature.trim());
      setNewFeature("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFeature();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">Manage Features</h2>
            <p className="text-sm text-muted-foreground">{property.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Add new feature */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., Swimming Pool, Garden..."
            className="flex-1 h-10 px-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <Button onClick={handleAddFeature} className="gap-2 bg-gradient-primary hover:opacity-90">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        {/* Features list */}
        {property.features.length > 0 ? (
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={property.features.map((f) => f.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {property.features.map((feature) => (
                  <SortableFeature
                    key={feature.id}
                    feature={feature}
                    onRemove={() => onRemoveFeature(property.id, feature.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <ListChecks className="w-12 h-12 mb-3 opacity-50" />
            <p>No features yet</p>
            <p className="text-sm">Add features using the input above</p>
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-4">
          Drag features to reorder them.
        </p>
      </div>
    </div>
  );
}
