import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { KontrahenciProvider } from "./context/KontrahenciContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <KontrahenciProvider>
      <App />
    </KontrahenciProvider>
  </React.StrictMode>
);
