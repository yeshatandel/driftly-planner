import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App.jsx"
import ErrorOverlay from "./ErrorOverlay.jsx"
import ErrorBoundary from "./ErrorBoundary.jsx"
import "./style.css"

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <ErrorBoundary>
      {/* debug switch: add ?debug=true to the URL to render a simple test view */}
      {new URL(window.location.href).searchParams.get("debug") === "true" ? (
        <div className="min-h-screen flex items-center justify-center">React mount OK — debug mode</div>
      ) : (
        <>
          <App />
          <ErrorOverlay />
        </>
      )}
    </ErrorBoundary>
  </React.StrictMode>,
)