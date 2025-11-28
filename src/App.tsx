import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Portfolio from "@/pages/Portfolio";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/AdminDashboard";
import Profile from "@/pages/Profile";
import ProjectDetail from "@/pages/ProjectDetail";
import PricingPage from "@/pages/PricingPage";
import BookingPage from "@/pages/BookingPage"; // ✅ NEW

import "./App.css";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ErrorBoundary>
          <div className="min-h-screen bg-white">
            <Layout>
              <Routes>
                {/* PUBLIC ROUTES */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:id" element={<ProjectDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/login" element={<Login />} />

                {/* NEW — BOOKING PAGE */}
                <Route path="/booking" element={<BookingPage />} />

                {/* PROTECTED ROUTES */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Layout>

            <Toaster />
          </div>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}

export default App;
