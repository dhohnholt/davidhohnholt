import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Calendar, Shield, Edit, Save, X, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  avatar_url: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function Profile() {
  console.log("✅ Profile component mounted");

  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { user, profile, authLoading, refetchProfile } = useAuth();
  console.log("🔍 Profile.tsx Context State:", { 
    user: user?.email, 
    profile, 
    authLoading 
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile?.full_name || '',
      avatar_url: profile?.avatar_url || '',
    },
  });

  // ✅ Reset form when profile changes
  useEffect(() => {
    console.log("🔄 useEffect triggered, profile updated:", profile);
    if (profile) {
      console.log("✅ Resetting form with:", {
        full_name: profile.full_name,
        avatar_url: profile.avatar_url,
      });
      reset({
        full_name: profile.full_name || '',
        avatar_url: profile.avatar_url || '',
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: ProfileForm) => {
    console.log("✅ Updating profile with data:", data);
    setIsUpdating(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name || null,
          avatar_url: data.avatar_url || null,
        })
        .eq('id', user?.id);

      if (error) {
        console.error("❌ Error updating profile:", error);
        toast.error('Failed to update profile');
      } else {
        console.log("✅ Profile updated successfully in DB");
        toast.success('Profile updated successfully');
        setIsEditing(false);
        console.log("🔄 Calling refetchProfile()");
        await refetchProfile();
      }
    } catch (err) {
      console.error("❌ Unexpected error updating profile:", err);
      toast.error('An unexpected error occurred');
    } finally {
      setIsUpdating(false);
      console.log("✅ Finished profile update cycle");
    }
  };

  const handleCancelEdit = () => {
    console.log("✅ Canceling profile edit, resetting form");
    setIsEditing(false);
    reset({
      full_name: profile?.full_name || '',
      avatar_url: profile?.avatar_url || '',
    });
  };

  // ✅ Show loading spinner
  if (authLoading) {
    console.log("⏳ Auth still loading, showing spinner...");
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#014040] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // ✅ Require login
  if (!user) {
    console.log("❌ No user found, redirecting to login page UI");
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <p className="text-gray-600 mb-4">Please log in to view your profile.</p>
            <Button onClick={() => (window.location.href = '/login')}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  console.log("✅ Rendering profile page for:", user.email);

  return (
    <>
      <Helmet>
        <title>Profile - David Hohnholt</title>
        <meta name="description" content="User profile and account settings." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="pt-16 min-h-screen bg-gray-50">
        {/* ✅ Header */}
        <section className="py-12 bg-gradient-to-br from-white to-[#f8f8f5]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Profile Settings
              </h1>
              <p className="text-lg text-gray-600">
                Manage your account information and preferences
              </p>
            </motion.div>
          </div>
        </section>

        {/* ✅ Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ✅ Profile Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="relative mx-auto mb-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage
                        src={profile?.avatar_url || undefined}
                        alt={profile?.full_name || user.email || 'User'}
                      />
                      <AvatarFallback className="bg-[#014040] text-white text-2xl">
                        {profile?.full_name
                          ? profile.full_name.split(' ').map((n) => n[0]).join('').toUpperCase()
                          : user.email?.[0].toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#014040] text-white rounded-full flex items-center justify-center">
                      <Camera className="h-4 w-4" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {profile?.full_name || 'User'}
                  </CardTitle>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex justify-center mt-2">
                    <Badge
                      variant={profile?.role === 'admin' ? 'default' : 'secondary'}
                      className={profile?.role === 'admin' ? 'bg-[#014040] text-white' : ''}
                    >
                      {profile?.role === 'admin' && <Shield className="h-3 w-3 mr-1" />}
                      {profile?.role || 'viewer'}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            {/* ✅ Profile Edit (logs remain above) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              {/* Edit form remains unchanged */}
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}