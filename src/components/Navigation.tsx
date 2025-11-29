// /src/components/Navigation.tsx
import { useState, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Camera, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, authLoading, signOut } = useAuth();

  const isLoggedIn = !!user;

  // Fade nav background once user scrolls
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation Items
  const navItems = useMemo(() => {
    const items = [
      { name: "Home", path: "/" },
      { name: "Portfolio", path: "/portfolio" },
      { name: "Pricing", path: "/pricing" },
      { name: "Contact", path: "/contact" },
    ];

    if (isLoggedIn) items.push({ name: "Profile", path: "/profile" });
    if (isAdmin) items.push({ name: "Admin", path: "/admin" });

    return items;
  }, [isLoggedIn, isAdmin]);

  const handleLogout = async () => {
    try {
      const { error } = await signOut();

      if (error) {
        console.error("❌ Logout Error:", error.message);
        toast.error("Logout failed. Try again.");
        return;
      }

      toast.success("You have logged out.");
      navigate("/", { replace: true });
      window.location.assign("/");
    } catch (err) {
      console.error("❌ Logout Exception:", err);
      toast.error("Logout failed. Try again.");
    }
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${scrolled ? "bg-black/70 backdrop-blur-lg shadow-lg" : "bg-black/10"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP BAR */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-amber-400 font-bold text-xl tracking-wide hover:text-amber-300 transition"
          >
            <Camera className="h-5 w-5" />
            David Hohnholt
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors duration-200 relative 
                  ${
                    location.pathname === item.path
                      ? "text-amber-400 font-semibold"
                      : "text-gray-300 hover:text-amber-400"
                  }
                `}
              >
                {item.name}

                {location.pathname === item.path && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-amber-400 rounded-full shadow-md" />
                )}
              </Link>
            ))}

            {!authLoading && !isLoggedIn && (
              <Link
                to="/login"
                className="text-gray-300 hover:text-amber-400 transition"
              >
                Login
              </Link>
            )}

            {!authLoading && isLoggedIn && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-gray-300 hover:text-amber-400 transition"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            )}

            {/* BOOK NOW BUTTON */}
            <Link
              to="/booking#booking-form"
              className="ml-3 px-4 py-2 rounded-xl bg-amber-500 text-black font-semibold shadow-lg hover:bg-amber-600 transition-all"
            >
              Book Now
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-amber-400"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="md:hidden bg-black/90 border-t border-white/10 rounded-b-xl"
          >
            <div className="px-2 pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base transition 
                    ${
                      location.pathname === item.path
                        ? "bg-amber-500 text-black font-semibold"
                        : "text-gray-200 hover:bg-white/10"
                    }
                  `}
                >
                  {item.name}
                </Link>
              ))}

              {!isLoggedIn && (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg"
                >
                  Login
                </Link>
              )}

              {isLoggedIn && (
                <button
                  onClick={async () => {
                    await handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-gray-300 hover:bg-white/10 flex items-center gap-2 rounded-lg"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              )}

              <Link
                to="/booking#booking-form"
                onClick={() => setIsOpen(false)}
                className="block w-full mt-3 text-center px-4 py-3 bg-amber-500 text-black font-bold rounded-xl shadow-lg hover:bg-amber-600"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
