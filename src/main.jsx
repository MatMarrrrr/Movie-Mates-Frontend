import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./contexts/UserContext";
import { InfoModalProvider } from "./contexts/InfoModalContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <InfoModalProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </InfoModalProvider>
  </React.StrictMode>
);
