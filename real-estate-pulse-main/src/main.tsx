import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./hooks/useTheme";
import { GoogleMapsProvider } from "./hooks/useGoogleMaps";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <GoogleMapsProvider>
      <App />
    </GoogleMapsProvider>
  </ThemeProvider>
);
