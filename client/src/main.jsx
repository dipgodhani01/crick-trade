import { GoogleOAuthProvider } from "@react-oauth/google";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <GoogleOAuthProvider clientId="472158839299-gvfqa9mj4933otnldk5t3934pvsq7qpd.apps.googleusercontent.com">
  <App />
  // </GoogleOAuthProvider>
);
