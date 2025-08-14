import React from "react"; // ✅ React import (needed for JSX in older setups, optional in latest React)
import { createRoot } from "react-dom/client"; // ✅ New React 18+ root API
import App from "./App"; // ✅ Your main App component

// ✅ Create React root and render the App component
createRoot(document.getElementById("root")).render(<App />);
