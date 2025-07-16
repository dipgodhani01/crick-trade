import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GoogleOAuthWrapper from "./auth/GoogleOAuthWrapper";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./layouts/Layout";
import { useState } from "react";
import RefreshHandler from "./helper/RefreshHandler";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/login" element={<GoogleOAuthWrapper />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<PrivateRoute element={<Home />} />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
