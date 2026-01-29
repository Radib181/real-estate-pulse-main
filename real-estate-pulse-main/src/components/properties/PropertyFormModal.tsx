import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Property } from "@/hooks/useProperties";

interface PropertyFormModalProps {
  property?: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Property, "id" | "order" | "images" | "features">) => void;
}

export function PropertyFormModal({ property, isOpen, onClose, onSave }: PropertyFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: 0,
    beds: 0,
    baths: 0,
    sqft: 0,
    status: "available" as Property["status"],
    type: "house" as Property["type"],
    agent: "",
    listed: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (property) {
      setFormData({
        name: property.name,
        location: property.location,
        price: property.price,
        beds: property.beds,
        baths: property.baths,
        sqft: property.sqft,
        status: property.status,
        type: property.type,
        agent: property.agent,
        listed: property.listed,
      });
    } else {
      setFormData({
        name: "",
        location: "",
        price: 0,
        beds: 0,
        baths: 0,
        sqft: 0,
        status: "available",
        type: "house",
        agent: "",
        listed: new Date().toISOString().split("T")[0],
      });
    }
  }, [property, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">
            {property ? "Edit Property" : "Add New Property"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Property Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-10 px-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Enter property name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full h-10 px-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="City, State"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Price ($)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full h-10 px-4 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Sqft
              </label>
              <input
                type="number"
                value={formData.sqft}
                onChange={(e) => setFormData({ ...formData, sqft: Number(e.target.value) })}
                className="w-full h-10 px-4 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                min="0"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Bedrooms
              </label>
              <input
                type="number"
                value={formData.beds}
                onChange={(e) => setFormData({ ...formData, beds: Number(e.target.value) })}
                className="w-full h-10 px-4 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Bathrooms
              </label>
              <input
                type="number"
                value={formData.baths}
                onChange={(e) => setFormData({ ...formData, baths: Number(e.target.value) })}
                className="w-full h-10 px-4 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                min="0"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Property["status"] })}
                className="w-full h-10 px-4 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="available">For Sale</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Property["type"] })}
                className="w-full h-10 px-4 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="villa">Villa</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Agent
            </label>
            <input
              type="text"
              value={formData.agent}
              onChange={(e) => setFormData({ ...formData, agent: e.target.value })}
              className="w-full h-10 px-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Agent name"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-primary hover:opacity-90">
              {property ? "Save Changes" : "Add Property"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
