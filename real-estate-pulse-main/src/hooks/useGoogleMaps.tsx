import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { supabase } from "@/integrations/supabase/client";

interface GoogleMapsContextType {
  isLoaded: boolean;
  loadError: string | null;
}

const GoogleMapsContext = createContext<GoogleMapsContextType | undefined>(undefined);

// Store API key globally to prevent re-initialization issues
let cachedApiKey: string | null = null;

export function GoogleMapsProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKey] = useState<string | null>(cachedApiKey);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [keyFetched, setKeyFetched] = useState(cachedApiKey !== null);

  useEffect(() => {
    if (cachedApiKey) {
      setApiKey(cachedApiKey);
      setKeyFetched(true);
      return;
    }

    const fetchApiKey = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-maps-key');
        if (error) throw error;
        if (data?.apiKey) {
          cachedApiKey = data.apiKey;
          setApiKey(data.apiKey);
        } else {
          setLoadError('Unable to load map');
        }
      } catch (err) {
        console.error('Error fetching Maps API key:', err);
        setLoadError('Unable to load map');
      } finally {
        setKeyFetched(true);
      }
    };
    fetchApiKey();
  }, []);

  // Only render the loader component once we have an API key
  if (!keyFetched) {
    return (
      <GoogleMapsContext.Provider value={{ isLoaded: false, loadError: null }}>
        {children}
      </GoogleMapsContext.Provider>
    );
  }

  if (loadError || !apiKey) {
    return (
      <GoogleMapsContext.Provider value={{ isLoaded: false, loadError: loadError || 'No API key' }}>
        {children}
      </GoogleMapsContext.Provider>
    );
  }

  return (
    <GoogleMapsLoaderProvider apiKey={apiKey}>
      {children}
    </GoogleMapsLoaderProvider>
  );
}

// This component only mounts once we have a valid API key
function GoogleMapsLoaderProvider({ apiKey, children }: { apiKey: string; children: ReactNode }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError: loadError?.message || null }}>
      {children}
    </GoogleMapsContext.Provider>
  );
}

export function useGoogleMaps() {
  const context = useContext(GoogleMapsContext);
  if (context === undefined) {
    throw new Error('useGoogleMaps must be used within a GoogleMapsProvider');
  }
  return context;
}
