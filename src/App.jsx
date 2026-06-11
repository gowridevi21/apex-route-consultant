import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
//import LoadAnalyzerExport from "./pages/LoadAnalyzerExport";
import { useLocation } from "react-router";
//import Loadbalancer from "./pages/Loadbalancer";
import MyVault from "./pages/MyVault";
import Profile from "./pages/Profile";
import Progress from "./pages/Progress";
import Training from "./pages/Training";
import Uploads from "./pages/Uploads";
import Support from "./pages/Support";
import Invoices from "./pages/Invoices";
import Admin from "./pages/Admin";
import AdminClient from "./pages/AdminClient";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";


export default function App() {
  const location = useLocation();
  const dashboardRoutes = [
  "/dashboard",
  "/my-vault",
  "/progress",
  "/training",
  "/uploads",
  "/invoices",
  "/support",
  "/profile",
  "/admin",
];

const hideLayout =
  location.pathname === "/load-analyzer-export" ||
  dashboardRoutes.includes(location.pathname) ||
  location.pathname.startsWith("/admin/client/");
  return (
    <>
      <ScrollToTop />

      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-vault" element={<MyVault />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/training" element={<Training />} />
        <Route path="/uploads" element={<Uploads />} />
        <Route path="/support" element={<Support />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/client/:clientId" element={<AdminClient />} />
      </Routes>

      <Footer />
    </>
  );
}