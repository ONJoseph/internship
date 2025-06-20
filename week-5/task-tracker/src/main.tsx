import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root");

if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("❌ Could not find #root element in index.html");
}
