import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase,
  Calendar,
  Camera,
  Save,
  Edit2,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Aarav',
    lastName: 'Sharma',
    email: user?.email || 'admin@chainflow.com',
    phone: '+91 98765 43210',
    role: user?.role || 'Admin',
    department: 'Operations',
    location: 'Mumbai, Maharashtra',
    bio: 'Supply chain management professional with 10+ years of experience in Indian logistics and inventory management.',
    joinDate: '2023-01-15'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long!');
      return;
    }
    toast.success('Password changed successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const activityLog = [
    { id: 1, action: 'Logged in', timestamp: '2024-01-26 09:30 AM', status: 'success' },
    { id: 2, action: 'Updated inventory item', timestamp: '2024-01-26 10:15 AM', status: 'success' },
    { id: 3, action: 'Created new order', timestamp: '2024-01-26 11:45 AM', status: 'success' },
    { id: 4, action: 'Added new supplier', timestamp: '2024-01-26 02:20 PM', status: 'success' },
    { id: 5, action: 'Generated analytics report', timestamp: '2024-01-26 03:45 PM', status: 'success' }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-2">Manage your personal information and account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {profileData.firstName[0]}{profileData.lastName[0]}
                </div>
                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border-2 border-gray-100 hover:bg-gray-50">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-gray-600">{profileData.role}</p>
              
              <div className="mt-6 w-full space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{profileData.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  <span>{profileData.department}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(profileData.joinDate).toLocaleDateString()}</span>
                </div>
              </div>

              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="mt-6 w-full btn-primary flex items-center justify-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-primary-600 hover:text-primary-700 flex items-center gap-1 text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <input
                  type="text"
                  value={profileData.department}
                  onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                disabled={!isEditing}
                className="input-field"
                rows="4"
              />
            </div>

            {isEditing && (
              <div className="flex justify-end gap-4 mt-6">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveProfile}
                  className="btn-primary flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Change Password */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  className="input-field"
                  required
                  minLength={8}
                />
                <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters long</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="btn-primary">
                  Update Password
                </button>
              </div>
            </form>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {activityLog.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.timestamp}</p>
                  </div>
                  <span className="badge badge-success text-xs">Success</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
