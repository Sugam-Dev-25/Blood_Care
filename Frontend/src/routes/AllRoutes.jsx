import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import Login from "../components/pages/auth/Login";
import Register from "../components/pages/auth/Register";
import DashboardLayout from "../components/layout/DashboardLayout";
import DonorDashboard from "../components/pages/donor/DonorDashboard";
import DonorProfile from "../components/pages/donor/DonorProfile";
import DonationHistory from "../components/pages/donor/DonationHistory";
import Eligibility from "../components/pages/donor/Eligibility";
import HospitalProfile from "../components/pages/hospital/HospitalProfile";
import HospitalDashboard from "../components/pages/hospital/HospitalDashboard";
import CreateRequest from "../components/pages/hospital/CreateRequest";
import MyRequests from "../components/pages/hospital/MyRequests";
import AdminDashboard from "../components/pages/admin/AdminDashboard";
import ManageHospitals from "../components/pages/admin/ManageHospitals";
import ManageDonors from "../components/pages/admin/ManageDonors";
import BloodInventory from "../components/pages/admin/BloodInventory";
import BloodRequests from "../components/pages/admin/BloodRequests";
import Donations from "../components/pages/admin/Donations";
import PublicLayout from "../components/layout/PublicLayout";
import HomeComponent from "../components/pages/home/HomeComponent";
import ContactComponent from "../components/pages/contact/ContactComponent";
import AboutComponent from "../components/pages/about/AboutComponent";
import AuditLogs from "../components/pages/admin/AuditLogs";

const AllRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}

      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomeComponent/>} />
        <Route path="/about" element={<AboutComponent />} />
        <Route path="/contact" element={<ContactComponent />} />
      </Route>

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* Donor */}

          <Route element={<RoleRoute allowedRoles={["donor"]} />}>
            <Route path="/donor/dashboard" element={<DonorDashboard />} />
            <Route path="/donor/profile" element={<DonorProfile />} />
            <Route path="/donor/donations" element={<DonationHistory />} />
            <Route path="/donor/eligibility" element={<Eligibility />} />
          </Route>

          {/* Hospital */}

          <Route element={<RoleRoute allowedRoles={["hospital"]} />}>
            <Route path="/hospital/dashboard" element={<HospitalDashboard />} />

            <Route path="/hospital/profile" element={<HospitalProfile />} />

            <Route
              path="/hospital/create-request"
              element={<CreateRequest />}
            />

            <Route path="/hospital/requests" element={<MyRequests />} />
          </Route>

          {/* Admin */}

          <Route element={<RoleRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/hospitals" element={<ManageHospitals />} />
            <Route path="/admin/donors" element={<ManageDonors />} />
            <Route path="/admin/inventory" element={<BloodInventory />} />
            <Route path="/admin/requests" element={<BloodRequests />} />
            <Route path="/admin/donations" element={<Donations />} />
            <Route path="/admin/audit-logs" element={<AuditLogs/>} />

          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AllRoutes;
