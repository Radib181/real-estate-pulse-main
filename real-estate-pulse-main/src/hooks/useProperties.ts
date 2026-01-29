import { useState, useEffect } from "react";

export interface PropertyImage {
  id: string;
  url: string;
  order: number;
}

export interface PropertyFeature {
  id: string;
  name: string;
  order: number;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  images: PropertyImage[];
  features: PropertyFeature[];
  status: "available" | "pending" | "sold" | "rented";
  type: "house" | "apartment" | "condo" | "villa";
  agent: string;
  listed: string;
  order: number;
}

const defaultProperties: Property[] = [
  { id: "1", name: "Luxury Sunset Villa", location: "Beverly Hills, CA", price: 2450000, beds: 5, baths: 4, sqft: 4500, images: [{ id: "img1", url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop", order: 0 }], features: [{ id: "f1", name: "Swimming Pool", order: 0 }, { id: "f2", name: "Smart Home", order: 1 }], status: "available", type: "villa", agent: "Sarah Johnson", listed: "2024-01-15", order: 0 },
  { id: "2", name: "Modern Ocean View", location: "Malibu, CA", price: 1890000, beds: 4, baths: 3, sqft: 3200, images: [{ id: "img2", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop", order: 0 }], features: [{ id: "f3", name: "Ocean View", order: 0 }, { id: "f4", name: "Garage", order: 1 }], status: "pending", type: "house", agent: "Michael Chen", listed: "2024-01-10", order: 1 },
  { id: "3", name: "Downtown Penthouse", location: "Los Angeles, CA", price: 1250000, beds: 3, baths: 2, sqft: 2100, images: [{ id: "img3", url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop", order: 0 }], features: [{ id: "f5", name: "Rooftop Terrace", order: 0 }], status: "available", type: "apartment", agent: "Emily Davis", listed: "2024-01-20", order: 2 },
  { id: "4", name: "Garden Estate", location: "Pasadena, CA", price: 3200000, beds: 6, baths: 5, sqft: 5800, images: [{ id: "img4", url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop", order: 0 }], features: [{ id: "f6", name: "Garden", order: 0 }, { id: "f7", name: "Guest House", order: 1 }], status: "sold", type: "house", agent: "James Wilson", listed: "2023-12-01", order: 3 },
  { id: "5", name: "Coastal Retreat", location: "Santa Monica, CA", price: 2100000, beds: 4, baths: 3, sqft: 3500, images: [{ id: "img5", url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop", order: 0 }], features: [{ id: "f8", name: "Beach Access", order: 0 }], status: "available", type: "villa", agent: "Sarah Johnson", listed: "2024-01-18", order: 4 },
  { id: "6", name: "Urban Loft", location: "Downtown LA, CA", price: 750000, beds: 2, baths: 2, sqft: 1400, images: [{ id: "img6", url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop", order: 0 }], features: [{ id: "f9", name: "High Ceilings", order: 0 }], status: "rented", type: "apartment", agent: "Lisa Anderson", listed: "2024-01-05", order: 5 },
];

const STORAGE_KEY = "realestate_properties";

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setProperties(JSON.parse(stored));
    } else {
      setProperties(defaultProperties);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProperties));
    }
    setIsLoading(false);
  }, []);

  const saveProperties = (newProperties: Property[]) => {
    setProperties(newProperties);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProperties));
  };

  const addProperty = (property: Omit<Property, "id" | "order">) => {
    const newProperty: Property = {
      ...property,
      id: crypto.randomUUID(),
      order: properties.length,
    };
    saveProperties([...properties, newProperty]);
    return newProperty;
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    const updated = properties.map((p) => (p.id === id ? { ...p, ...updates } : p));
    saveProperties(updated);
  };

  const deleteProperty = (id: string) => {
    const filtered = properties.filter((p) => p.id !== id);
    const reordered = filtered.map((p, i) => ({ ...p, order: i }));
    saveProperties(reordered);
  };

  const reorderProperties = (activeId: string, overId: string) => {
    const oldIndex = properties.findIndex((p) => p.id === activeId);
    const newIndex = properties.findIndex((p) => p.id === overId);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = [...properties];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);
    const updated = reordered.map((p, i) => ({ ...p, order: i }));
    saveProperties(updated);
  };

  const addImage = (propertyId: string, url: string) => {
    const property = properties.find((p) => p.id === propertyId);
    if (!property) return;

    const newImage: PropertyImage = {
      id: crypto.randomUUID(),
      url,
      order: property.images.length,
    };
    updateProperty(propertyId, { images: [...property.images, newImage] });
  };

  const removeImage = (propertyId: string, imageId: string) => {
    const property = properties.find((p) => p.id === propertyId);
    if (!property) return;

    const filtered = property.images.filter((img) => img.id !== imageId);
    const reordered = filtered.map((img, i) => ({ ...img, order: i }));
    updateProperty(propertyId, { images: reordered });
  };

  const reorderImages = (propertyId: string, activeId: string, overId: string) => {
    const property = properties.find((p) => p.id === propertyId);
    if (!property) return;

    const oldIndex = property.images.findIndex((img) => img.id === activeId);
    const newIndex = property.images.findIndex((img) => img.id === overId);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = [...property.images];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);
    const updated = reordered.map((img, i) => ({ ...img, order: i }));
    updateProperty(propertyId, { images: updated });
  };

  const addFeature = (propertyId: string, name: string) => {
    const property = properties.find((p) => p.id === propertyId);
    if (!property) return;

    const newFeature: PropertyFeature = {
      id: crypto.randomUUID(),
      name,
      order: property.features.length,
    };
    updateProperty(propertyId, { features: [...property.features, newFeature] });
  };

  const removeFeature = (propertyId: string, featureId: string) => {
    const property = properties.find((p) => p.id === propertyId);
    if (!property) return;

    const filtered = property.features.filter((f) => f.id !== featureId);
    const reordered = filtered.map((f, i) => ({ ...f, order: i }));
    updateProperty(propertyId, { features: reordered });
  };

  const reorderFeatures = (propertyId: string, activeId: string, overId: string) => {
    const property = properties.find((p) => p.id === propertyId);
    if (!property) return;

    const oldIndex = property.features.findIndex((f) => f.id === activeId);
    const newIndex = property.features.findIndex((f) => f.id === overId);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = [...property.features];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);
    const updated = reordered.map((f, i) => ({ ...f, order: i }));
    updateProperty(propertyId, { features: updated });
  };

  return {
    properties: properties.sort((a, b) => a.order - b.order),
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
  };
}
