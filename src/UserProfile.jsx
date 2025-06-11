import React, { useState, useRef } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, Camera, Shield, Settings } from 'lucide-react';

const UserProfile = ({ user, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || 'Abdul Rasheed',
    email: user?.email || 'abdul.rasheed@example.com',
    phone: user?.phone || '+92 300 1234567',
    address: user?.address || 'Chakwal, Punjab, Pakistan',
    joinDate: user?.joinDate || '2023-01-15',
    role: user?.role || 'Administrator',
    avatar: user?.avatar || null
  });
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // In a real app, you would save to backend here
    setIsEditing(false);
    // You could call an onUpdate prop here to update the parent component
  };

  const handleCancel = () => {
    setEditedUser({
      name: user?.name || 'Abdul Rasheed',
      email: user?.email || 'abdul.rasheed@example.com',
      phone: user?.phone || '+92 300 1234567',
      address: user?.address || 'Chakwal, Punjab, Pakistan',
      joinDate: user?.joinDate || '2023-01-15',
      role: user?.role || 'Administrator',
      avatar: user?.avatar || null
    });
    setIsEditing(false);
  };

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditedUser(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    console.log('Close button clicked, triggering onBack to navigate to Dashboard');
    if (onBack) {
      onBack();
    } else {
      console.error('onBack prop is not defined');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">User Profile</h1>
                <p className="text-sm sm:text-base text-gray-600 hidden sm:block">
                  Manage your account information
                </p>
                <p className="text-xs text-gray-600 sm:hidden">
                  Account Settings
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-1 sm:space-x-2 bg-green-600 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-green-700 transition duration-200"
                  >
                    <Save className="w-4 h-4" />
                    <span className="hidden sm:inline">Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-1 sm:space-x-2 bg-gray-600 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-gray-700 transition duration-200"
                  >
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">Cancel</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-1 sm:space-x-2 bg-blue-600 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={handleClose} // Navigates back to Dashboard component
                    className="flex items-center space-x-1 sm:space-x-2 bg-gray-600 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-gray-700 transition duration-200"
                  >
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">Close</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg sm:rounded-2xl shadow-xl p-4 sm:p-6">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold overflow-hidden">
                    {editedUser.avatar ? (
                      <img 
                        src={editedUser.avatar} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      editedUser.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  {isEditing && (
                    <>
                      <button 
                        onClick={handleAvatarClick}
                        className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors cursor-pointer"
                        title="Change profile picture"
                      >
                        <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </>
                  )}
                </div>
                
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-lg sm:text-xl font-bold text-gray-900 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 w-full text-center mb-2"
                  />
                ) : (
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{editedUser.name}</h2>
                )}
                
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Shield className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-purple-600 font-medium">{editedUser.role}</span>
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(editedUser.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg sm:rounded-2xl shadow-xl p-4 sm:p-6 mt-4 sm:mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Books Added</span>
                  <span className="text-lg font-bold text-blue-600">145</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Orders Processed</span>
                  <span className="text-lg font-bold text-green-600">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Customers Managed</span>
                  <span className="text-lg font-bold text-purple-600">234</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg sm:rounded-2xl shadow-xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Profile Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 rounded-lg px-3 py-2">{editedUser.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedUser.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 rounded-lg px-3 py-2">{editedUser.phone}</p>
                  )}
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editedUser.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={2}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 rounded-lg px-3 py-2">{editedUser.address}</p>
                  )}
                </div>

                {/* Join Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Join Date
                  </label>
                  <p className="text-gray-900 bg-gray-50 rounded-lg px-3 py-2">
                    {new Date(editedUser.joinDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Shield className="w-4 h-4 inline mr-2" />
                    Role
                  </label>
                  <p className="text-gray-900 bg-gray-50 rounded-lg px-3 py-2">{editedUser.role}</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg sm:rounded-2xl shadow-xl p-4 sm:p-6 mt-4 sm:mt-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-medium text-gray-900">Profile updated</p>
                    <p className="text-xs sm:text-sm text-gray-500">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-medium text-gray-900">Logged in from new device</p>
                    <p className="text-xs sm:text-sm text-gray-500">3 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-medium text-gray-900">Password changed</p>
                    <p className="text-xs sm:text-sm text-gray-500">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;