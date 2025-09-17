"use client";
import React, { useState, useRef } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Briefcase,
  Edit3,
  Save,
  X,
  Camera,
  Shield,
  Key,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { updateUserProfile } from "@/services/new-user.service";

interface ProfileData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  department: string;
  role: string;
  avatar?: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfilePage() {
  const { user, isAdmin, refreshAuth } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize profile data with user data (with fallbacks)
  const [profileData, setProfileData] = useState<ProfileData>({
    name: user?.name || "",
    email: user?.email || "",
    phone: "", // Add these to your user type later
    address: "",
    dateOfBirth: "",
    department: user?.department || "",
    role: user?.role || "",
    avatar: user?.avatar || "",
  });

  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Update profile data when user changes
  React.useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: "", // These will be added to user type later
        address: "",
        dateOfBirth: "",
        department: user.department || "",
        role: user.role || "",
        avatar: user.avatar || "",
      });
    }
  }, [user]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Use the updateUserProfile service
      const payload = {
        name: profileData.name,
        email: profileData.email,
        avatar: profileData.avatar,
        // Add other fields when they're available in your backend
      };
      
      await updateUserProfile(payload);
      
      // Refresh auth to get updated user data
      await refreshAuth();
      
      setIsEditing(false);
      showNotification('success', 'Profile updated successfully!');
    } catch (error) {
      showNotification('error', 'Failed to update profile. Please try again.');
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showNotification('error', 'New passwords do not match!');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      showNotification('error', 'Password must be at least 8 characters long!');
      return;
    }

    setIsLoading(true);

    try {
      // Use the updateUserProfile service for password change
      await updateUserProfile({
        password: passwordData.newPassword
      });
      
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      showNotification('success', 'Password changed successfully!');
    } catch (error) {
      showNotification('error', 'Failed to change password. Please try again.');
      console.error('Password change error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfileData(prev => ({ ...prev, avatar: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  // Show loading if user is not available
  if (!user) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <div className={`
          fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg
          ${notification.type === 'success' 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }
        `}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
          <p className="text-gray-400 mt-1">Manage your personal information and account settings</p>
        </div>
        {isAdmin && (
          <div className="flex items-center gap-2 px-3 py-2 bg-orange-500/20 text-orange-400 rounded-lg border border-orange-500/30">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Administrator</span>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-orange-500/20 p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center overflow-hidden border-4 border-white/20">
                  {profileData.avatar ? (
                    <img 
                      src={profileData.avatar} 
                      alt={profileData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-cyan-500 hover:bg-cyan-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              
              {/* User Info */}
              <div>
                <h2 className="text-2xl font-bold text-white">{profileData.name}</h2>
                <p className="text-cyan-400 font-medium">{profileData.role}</p>
                <p className="text-gray-400">{profileData.department}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    <span>ID: {user.id.substring(0, 8).toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              disabled={isLoading}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50
                ${isEditing 
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30' 
                  : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30'
                }
              `}
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Phone - Future field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={profileData.phone || ""}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Date of Birth - Future field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date of Birth
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={profileData.dateOfBirth || ""}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Address - Future field */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <textarea
                  value={profileData.address || ""}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                  placeholder="Enter your address"
                />
              </div>
            </div>

            {/* Department (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Department
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={profileData.department}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800/30 border border-gray-600/30 rounded-lg text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Role (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Role
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={profileData.role}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800/30 border border-gray-600/30 rounded-lg text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="flex justify-end mt-8">
              <button
                onClick={handleProfileSubmit}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-white">Security Settings</h3>
              <p className="text-gray-400 mt-1">Manage your account security and password</p>
            </div>
            <button
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              disabled={isLoading}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50
                ${isChangingPassword 
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30' 
                  : 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border border-orange-500/30'
                }
              `}
            >
              {isChangingPassword ? (
                <>
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  <span>Change Password</span>
                </>
              )}
            </button>
          </div>

          {isChangingPassword && (
            <div className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    required
                    className="w-full pl-10 pr-12 py-2.5 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    required
                    minLength={8}
                    className="w-full pl-10 pr-12 py-2.5 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter new password (min. 8 characters)"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                    className="w-full pl-10 pr-12 py-2.5 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={handlePasswordSubmit}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Update Password</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}