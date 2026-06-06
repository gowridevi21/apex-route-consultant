import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import LoadAnalyzerExport from "./pages/LoadAnalyzerExport";
import { useLocation } from "react-router";
import Loadbalancer from "./pages/Loadbalancer";
import Myvault from "./pages/Myvault";

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
];

const hideLayout =
  location.pathname === "/load-analyzer-export" ||
  dashboardRoutes.includes(location.pathname);
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
        <Route path="/load-analyzer-export" element={<LoadAnalyzerExport />} />
        <Route path="/load-analyzer" element={<Loadbalancer />} />
        <Route path="/my-vault" element={<Myvault />} />
      </Routes>

      <Footer />
    </>
  );
}