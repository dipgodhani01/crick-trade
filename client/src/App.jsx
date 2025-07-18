import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./layouts/Layout";
import ProtectedRoute from "./helper/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import AboutUs from "./pages/AboutUs";
import Refund from "./pages/Refund";
import ContactUs from "./pages/ContactUs";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import AddAuction from "./components/dashboard/AddAuction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="refund-cancellation" element={<Refund />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="auction-add" element={<AddAuction />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-left" autoClose={1500} />
    </BrowserRouter>
  );
}

export default App;
