import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Critical Error: Root element not found!");
} else {
  try {
    createRoot(rootElement).render(<App />);
  } catch (error) {
    console.error("Fatal Application Crash:", error);
    rootElement.innerHTML = `
      <div style="font-family: sans-serif; padding: 40px; text-align: center; background: #0f172a; color: white; min-height: 100vh;">
        <h1 style="color: #ef4444;">🚀 CrazeCheck: Startup Error</h1>
        <p style="color: #94a3b8; max-width: 600px; margin: 20px auto;">
          We encountered a critical error during startup. This is usually due to missing environment variables or a configuration issue.
        </p>
        <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; font-family: monospace; text-align: left; display: inline-block;">
          ${error instanceof Error ? error.message : "Internal Loading Error"}
        </div>
        <p style="margin-top: 40px;">
          <button onclick="window.location.reload()" style="background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer;">
            Try Refreshing
          </button>
        </p>
      </div>
    `;
  }
}

// Catch unhandled module errors (like missing Supabase URL)
window.addEventListener('error', (event) => {
  if (rootElement && !rootElement.innerHTML.includes("Startup Error")) {
    rootElement.innerHTML = `
      <div style="font-family: sans-serif; padding: 40px; text-align: center; background: #0f172a; color: white; min-height: 100vh;">
        <h1 style="color: #ef4444;">🚀 CrazeCheck: Missing Config</h1>
        <p style="color: #94a3b8; max-width: 600px; margin: 20px auto;">
          The application could not connect to the backend database. 
        </p>
        <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; font-family: monospace; text-align: left; display: inline-block;">
          Check your Environment Variables (Supabase URL & Key)
        </div>
      </div>
    `;
  }
});
