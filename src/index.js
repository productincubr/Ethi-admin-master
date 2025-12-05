import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import NotificationProvider from "./Components/Notifications/Notifications";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <NotificationProvider>
        <App />
    </NotificationProvider>

);
