import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import GoogleOAuthWrapper from "./auth/GoogleOAuthWrapper";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./layouts/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<GoogleOAuthWrapper />} /> */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
