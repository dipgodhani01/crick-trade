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
import AddAuction from "./components/dashboard/auction/AddAuction";
import EditAuction from "./components/dashboard/auction/EditAuction";
import UserProfile from "./components/dashboard/profile/UserProfile";
import TeamList from "./components/dashboard/teams/TeamList";
import AddTeam from "./components/dashboard/teams/AddTeam";

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
          <Route path="profile" element={<UserProfile />} />
          <Route path="auction-add" element={<AddAuction />} />
          <Route path="auction-edit/:auctionId" element={<EditAuction />} />
          <Route path="teams/:auctionId" element={<TeamList />} />
          <Route path="team-add/:auctionId" element={<AddTeam />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={1500} />
    </BrowserRouter>
  );
}

export default App;
