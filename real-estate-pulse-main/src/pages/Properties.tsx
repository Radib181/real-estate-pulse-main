import { useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { Search, Filter, Grid3X3, List, Plus, MapPin, Bed, Bath, Square, Edit, Trash2, Eye, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProperties, Property } from "@/hooks/useProperties";
import { SortablePropertyCard } from "@/components/properties/SortablePropertyCard";
import { PropertyFormModal } from "@/components/properties/PropertyFormModal";
import { ImageGalleryModal } from "@/components/properties/ImageGalleryModal";
import { FeaturesModal } from "@/components/properties/FeaturesModal";
import { toast } from "sonner";

const statusConfig = {
  available: { label: "For Sale", className: "bg-primary/20 text-primary border-primary/30" },
  pending: { label: "Pending", className: "bg-accent/20 text-accent border-accent/30" },
  sold: { label: "Sold", className: "bg-success/20 text-success border-success/30" },
  rented: { label: "Rented", className: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
};

const typeConfig = {
  house: "House",
  apartment: "Apartment",
  condo: "Condo",
  villa: "Villa",
};

export function PropertiesPage() {
  const {
    properties,
    isLoading,
    addProperty,
    updateProperty,
    deleteProperty,
    reorderProperties,
    addImage,
    removeImage,
    reorderImages,
    addFeature,
    removeFeature,
    reorderFeatures,
  } = useProperties();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageModalProperty, setImageModalProperty] = useState<Property | null>(null);
  const [isFeaturesModalOpen, setIsFeaturesModalOpen] = useState(false);
  const [featuresModalProperty, setFeaturesModalProperty] = useState<Property | null>(null);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || property.status === statusFilter;
    const matchesType = typeFilter === "all" || property.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderProperties(String(active.id), String(over.id));
      toast.success("Properties reordered");
    }
  };

  const handleAddProperty = () => {
    setEditingProperty(null);
    setIsFormModalOpen(true);
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setIsFormModalOpen(true);
  };

  const handleSaveProperty = (data: Omit<Property, "id" | "order" | "images" | "features">) => {
    if (editingProperty) {
      updateProperty(editingProperty.id, data);
      toast.success("Property updated");
    } else {
      addProperty({ ...data, images: [], features: [] });
      toast.success("Property added");
    }
  };

  const handleDeleteProperty = (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      deleteProperty(id);
      toast.success("Property deleted");
    }
  };

  const handleManageImages = (property: Property) => {
    setImageModalProperty(property);
    setIsImageModalOpen(true);
  };

  const handleManageFeatures = (property: Property) => {
    setFeaturesModalProperty(property);
    setIsFeaturesModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Properties</h1>
          <p className="text-sm text-muted-foreground">
            {filteredProperties.length} properties • Drag to reorder
          </p>
        </div>
        <Button
          onClick={handleAddProperty}
          className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Property
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex gap-3 flex-wrap">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-4 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">All Status</option>
            <option value="available">For Sale</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
            <option value="rented">Rented</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-10 px-4 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="villa">Villa</option>
          </select>
          <div className="flex rounded-xl border border-border overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2.5 transition-colors",
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2.5 transition-colors",
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Properties Grid/List */}
      {viewMode === "grid" ? (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={filteredProperties.map((p) => p.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <SortablePropertyCard
                  key={property.id}
                  property={property}
                  onEdit={handleEditProperty}
                  onDelete={handleDeleteProperty}
                  onManageImages={handleManageImages}
                  onManageFeatures={handleManageFeatures}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="rounded-2xl border border-border bg-card overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-4">
                  Property
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-4">
                  Type
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-4">
                  Price
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-4">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-4">
                  Agent
                </th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProperties.map((property) => (
                <tr key={property.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={property.images[0]?.url || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"}
                        alt={property.name}
                        className="w-16 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-foreground">{property.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {property.location}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-foreground">{typeConfig[property.type]}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-foreground">
                    ${property.price.toLocaleString()}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={cn(
                        "px-2.5 py-1 text-xs font-medium rounded-full border",
                        statusConfig[property.status].className
                      )}
                    >
                      {statusConfig[property.status].label}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-foreground">{property.agent}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleManageImages(property)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                        title="Manage Images"
                      >
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => handleEditProperty(property)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                        title="Edit Property"
                      >
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => handleDeleteProperty(property.id)}
                        className="p-2 hover:bg-destructive/20 rounded-lg transition-colors"
                        title="Delete Property"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      <PropertyFormModal
        property={editingProperty}
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveProperty}
      />

      <ImageGalleryModal
        property={imageModalProperty}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onAddImage={addImage}
        onRemoveImage={removeImage}
        onReorderImages={reorderImages}
      />

      <FeaturesModal
        property={featuresModalProperty}
        isOpen={isFeaturesModalOpen}
        onClose={() => setIsFeaturesModalOpen(false)}
        onAddFeature={addFeature}
        onRemoveFeature={removeFeature}
        onReorderFeatures={reorderFeatures}
      />
    </div>
  );
}
