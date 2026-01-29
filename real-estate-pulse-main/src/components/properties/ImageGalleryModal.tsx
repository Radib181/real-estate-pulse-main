import { useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X, Plus, GripVertical, Trash2, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Property, PropertyImage } from "@/hooks/useProperties";
import { cn } from "@/lib/utils";

interface ImageGalleryModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onAddImage: (propertyId: string, url: string) => void;
  onRemoveImage: (propertyId: string, imageId: string) => void;
  onReorderImages: (propertyId: string, activeId: string, overId: string) => void;
}

function SortableImage({
  image,
  onRemove,
}: {
  image: PropertyImage;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: image.id,
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
        "relative aspect-video rounded-xl overflow-hidden border border-border group",
        isDragging && "opacity-50 shadow-xl z-50"
      )}
    >
      <img src={image.url} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <button
          {...attributes}
          {...listeners}
          className="p-2 rounded-lg bg-background/80 cursor-grab active:cursor-grabbing hover:bg-background transition-colors"
        >
          <GripVertical className="w-4 h-4 text-foreground" />
        </button>
        <button
          onClick={onRemove}
          className="p-2 rounded-lg bg-destructive/80 hover:bg-destructive transition-colors"
        >
          <Trash2 className="w-4 h-4 text-destructive-foreground" />
        </button>
      </div>
      {image.order === 0 && (
        <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
          Main
        </span>
      )}
    </div>
  );
}

export function ImageGalleryModal({
  property,
  isOpen,
  onClose,
  onAddImage,
  onRemoveImage,
  onReorderImages,
}: ImageGalleryModalProps) {
  const [newImageUrl, setNewImageUrl] = useState("");

  if (!isOpen || !property) return null;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      onReorderImages(property.id, String(active.id), String(over.id));
    }
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      onAddImage(property.id, newImageUrl.trim());
      setNewImageUrl("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">Manage Images</h2>
            <p className="text-sm text-muted-foreground">{property.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Add new image */}
        <div className="flex gap-3 mb-6">
          <input
            type="url"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="Enter image URL..."
            className="flex-1 h-10 px-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <Button onClick={handleAddImage} className="gap-2 bg-gradient-primary hover:opacity-90">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        {/* Image gallery */}
        {property.images.length > 0 ? (
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={property.images.map((img) => img.id)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {property.images.map((image) => (
                  <SortableImage
                    key={image.id}
                    image={image}
                    onRemove={() => onRemoveImage(property.id, image.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Image className="w-12 h-12 mb-3 opacity-50" />
            <p>No images yet</p>
            <p className="text-sm">Add images using the URL input above</p>
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-4">
          Drag images to reorder. The first image will be used as the main image.
        </p>
      </div>
    </div>
  );
}
