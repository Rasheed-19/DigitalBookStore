import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock, Mail, LogOut, Shield } from 'lucide-react';
import Dashboard from './Dashboard'; // Import the separated Dashboard component

const LoginSystem = () => {
  const [currentView, setCurrentView] = useState('login');
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // Initialize with a demo user
  useEffect(() => {
    setUsers([
      {
        id: 1,
        name: 'abc',
        email: 'abc@xyz.com',
        password: '123456' // In real app, this would be hashed
      }
    ]);
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = (isLogin = true) => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm(true)) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = users.find(u =>
        u.email === formData.email && u.password === formData.password
      );

      if (user) {
        setCurrentUser(user);
        setFormData({ email: '', password: '', confirmPassword: '', name: '' });
        setErrors({});
      } else {
        setErrors({ general: 'Invalid email or password' });
      }
      setLoading(false);
    }, 1000);
  };

  const handleRegister = async () => {
    if (!validateForm(false)) return;

    setLoading(true);

    // Check if user already exists
    const existingUser = users.find(u => u.email === formData.email);
    if (existingUser) {
      setErrors({ email: 'User with this email already exists' });
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const newUser = {
        id: users.length + 1,
        name: formData.name,
        email: formData.email,
        password: formData.password // In real app, hash this
      };

      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      setFormData({ email: '', password: '', confirmPassword: '', name: '' });
      setErrors({});
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowDashboard(false);
    setFormData({ email: '', password: '', confirmPassword: '', name: '' });
    setErrors({});
    setCurrentView('login');
    setResetEmail('');
    setResetSuccess(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const switchView = (view) => {
    setCurrentView(view);
    setFormData({ email: '', password: '', confirmPassword: '', name: '' });
    setErrors({});
    setResetEmail('');
    setResetSuccess(false);
  };

  const handleDashboardClick = () => {
    setShowDashboard(true);
  };

  const handleBackToProfile = () => {
    setShowDashboard(false);
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      setErrors({ resetEmail: 'Email is required' });
      return;
    }

    if (!validateEmail(resetEmail)) {
      setErrors({ resetEmail: 'Please enter a valid email' });
      return;
    }

    // Check if user exists
    const user = users.find(u => u.email === resetEmail);
    if (!user) {
      setErrors({ resetEmail: 'No account found with this email address' });
      return;
    }

    setLoading(true);
    setErrors({});

    // Simulate API call for password reset
    setTimeout(() => {
      // In a real app, you would:
      // 1. Generate a secure reset token
      // 2. Send an email with reset link
      // 3. Store the token with expiration time

      // For demo purposes, we'll just update the user's password to a temporary one
      const updatedUsers = users.map(u =>
        u.email === resetEmail
          ? { ...u, password: 'temppass123' }
          : u
      );
      setUsers(updatedUsers);
      setResetSuccess(true);
      setLoading(false);
    }, 1500);
  };

  const handleResetEmailChange = (e) => {
    setResetEmail(e.target.value);
    if (errors.resetEmail) {
      setErrors(prev => ({ ...prev, resetEmail: '' }));
    }
  };

  // Show Dashboard if user clicked on it
  if (currentUser && showDashboard) {
    return <Dashboard user={currentUser} onBack={handleBackToProfile} />;
  }

  // Show Forgot Password view
  if (currentView === 'forgot-password') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
            <p className="text-gray-600 mt-2">
              Enter your email address and we'll send you instructions to reset your password
            </p>
          </div>

          {resetSuccess ? (
            <div className="text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-medium">Password Reset Successful!</p>
                <p className="text-sm text-green-700 mt-2">
                  Your password has been temporarily reset to: <strong>temppass123</strong>
                </p>
                <p className="text-sm text-green-700 mt-1">
                  Please use this to log in and change your password immediately.
                </p>
              </div>
              <button
                onClick={() => switchView('login')}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <>
              {/* Error message */}
              {errors.resetEmail && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                  <p className="text-sm text-red-600">{errors.resetEmail}</p>
                </div>
              )}

              {/* Reset form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={handleResetEmailChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${errors.resetEmail ? 'border-red-300' : 'border-gray-300'
                        }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <button
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-medium"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending Reset Instructions...
                    </div>
                  ) : (
                    'Send Reset Instructions'
                  )}
                </button>
              </div>

              {/* Back to login */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => switchView('login')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Back to Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // If user is logged in, show profile page
  if (currentUser) {
    return (
      <Dashboard />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {currentView === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-600 mt-2">
            {currentView === 'login'
              ? 'Please sign in to your account'
              : 'Sign up to get started'
            }
          </p>
        </div>

        {/* Demo credentials notice */}
        {currentView === 'login' && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-amber-800">
              <strong>Abdul Rasheed:</strong>
              <br /> Use Email : kohistani@ghaznix.com,<br /> Use Password : kohistani123:
            </p>
          </div>
        )}

        {/* Error message */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          {/* Name field (register only) */}
          {currentView === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          {/* Email field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm password field (register only) */}
          {currentView === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="Confirm your password"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          {/* Submit button */}
          <button
            type="button"
            onClick={currentView === 'login' ? handleLogin : handleRegister}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-medium"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {currentView === 'login' ? 'Signing In...' : 'Creating Account...'}
              </div>
            ) : (
              currentView === 'login' ? 'Sign In' : 'Create Account'
            )}
          </button>
        </div>

        {/* Forgot Password Link */}
        {currentView === 'login' && (
          <div className="mt-4 text-center">
            <button
              onClick={() => switchView('forgot-password')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {/* Switch between login/register */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {currentView === 'login'
              ? "Don't have an account? "
              : "Already have an account? "
            }
            <button
              onClick={() => switchView(currentView === 'login' ? 'register' : 'login')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {currentView === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSystem;