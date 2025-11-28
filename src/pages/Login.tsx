import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LogIn, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext"; // ✅ Global context
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  console.log("✅ Login component mounted");

  const [showPassword, setShowPassword] = useState(false);
  const { user, isAdmin, authLoading, signIn, refetchProfile, profile } = useAuth();
  const navigate = useNavigate();

  console.log("🔍 Login Render Check:", {
    user: user?.email,
    profileRole: profile?.role,
    isAdmin,
    authLoading,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // ✅ Show spinner while auth state is being checked
  if (authLoading) {
    console.log("⏳ Auth still loading...");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#014040]" />
      </div>
    );
  }

  // ✅ Already logged in → Redirect
  if (!authLoading && user) {
    console.log("✅ Already logged in → Redirecting immediately");
    return <Navigate to={isAdmin ? "/admin" : "/"} replace />;
  }

  const onSubmit = async (data: LoginForm) => {
    console.log("✅ Login form submitted for:", data.email);
    const { error } = await signIn(data.email, data.password);

    if (error) {
      console.error("❌ Login failed:", error.message);
      toast.error("Invalid email or password");
    } else {
      console.log("✅ Login successful → Refetching profile...");
      await refetchProfile();

      // ✅ Give AuthContext a short moment to update before redirect
      setTimeout(() => {
        const finalAdminState = profile?.role === "admin";
        const redirectTo = finalAdminState ? "/admin" : "/";
        console.log("🔄 Final Redirect after profile update:", redirectTo);
        toast.success("Welcome back!");
        navigate(redirectTo, { replace: true });
      }, 300);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - David Hohnholt</title>
        <meta
          name="description"
          content="Admin login for David Hohnholt's portfolio management."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-[#f8f8f5] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Admin Login
              </CardTitle>
              <p className="text-gray-600">Sign in to manage your portfolio</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="mt-1"
                    placeholder="admin@davidhohnholt.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className="pr-10"
                      placeholder="Enter your password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#014040] hover:bg-[#012020] text-white"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" /> Sign In
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}