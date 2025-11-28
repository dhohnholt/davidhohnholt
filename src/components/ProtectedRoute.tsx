import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { user, isAdmin, authLoading } = useAuth();

  console.log("🔍 ProtectedRoute State:", {
    user: user?.email,
    isAdmin,
    authLoading,
    requireAdmin,
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    console.warn("❌ Not logged in, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    console.warn("❌ Not an admin, redirecting to /");
    return <Navigate to="/" replace />;
  }

  console.log("✅ Access granted");
  return <>{children}</>;
}