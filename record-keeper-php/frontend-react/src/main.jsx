import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// ✅ Render the React app inside StrictMode to highlight potential problems in development
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
