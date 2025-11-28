import { useState, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Shield, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function Navigation() {
  try {
    console.log("✅ Navigation component rendered");
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAdmin, authLoading, signOut } = useAuth();

    const safeIsAdmin = Boolean(isAdmin);
    const safeUser = user || null;

    useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = useMemo(() => {
      const items: { name: string; path: string }[] = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Contact", path: "/contact" },
      ];
      if (!authLoading) {
        if (safeUser) items.push({ name: "Profile", path: "/profile" });
        if (safeIsAdmin) items.push({ name: "Admin", path: "/admin" });
      }
      return items;
    }, [authLoading, safeUser, safeIsAdmin]);

    console.log("🔄 Navigation items:", navItems);

    const handleLogout = async () => {
      console.log("🔄 Logging out...");
      const { error } = await signOut();
      if (error) {
        console.error("❌ Logout failed:", error.message);
        toast.error("Logout failed, try again.");
      } else {
        toast.success("You have logged out.");
        navigate("/", { replace: true });
      }
    };

    return (
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="font-bold text-xl text-[#014040]">
              David Hohnholt
            </Link>

            {/* ✅ Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`transition-colors duration-200 flex items-center gap-1 ${
                    location.pathname === item.path
                      ? "text-[#014040] font-medium border-b-2 border-[#014040] pb-1"
                      : "text-gray-600 hover:text-[#014040]"
                  }`}
                >
                  {item.name === "Profile" && <User className="h-4 w-4" />}
                  {item.name === "Admin" && <Shield className="h-4 w-4" />}
                  {item.name}
                </Link>
              ))}
              {!authLoading && !safeUser && (
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-[#014040] transition-colors duration-200"
                >
                  Login
                </Link>
              )}
              {!authLoading && safeUser && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-gray-600 hover:text-[#014040]"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              )}
            </div>

            {/* ✅ Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* ✅ Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? "text-[#014040] bg-[#f8f8f5]"
                        : "text-gray-600 hover:text-[#014040] hover:bg-gray-50"
                    } flex items-center gap-2`}
                  >
                    {item.name === "Admin" && <Shield className="h-4 w-4" />}
                    {item.name === "Profile" && <User className="h-4 w-4" />}
                    {item.name}
                  </Link>
                ))}
                {!authLoading && !safeUser && (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#014040] hover:bg-gray-50 transition-colors duration-200"
                  >
                    Login
                  </Link>
                )}
                {!authLoading && safeUser && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-2 text-gray-600 hover:text-[#014040]"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>
    );
  } catch (error) {
    console.error("❌ Navigation crashed:", error);
    return (
      <nav className="p-4 bg-red-100 text-red-700">
        Error loading navigation. Check console.
      </nav>
    );
  }
}