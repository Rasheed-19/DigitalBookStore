import React, { useState } from 'react';
import { LogOut, LayoutDashboard, Book, Package, ShoppingCart, Users, Home, Menu, X } from 'lucide-react';
import Homepage from './Homepage';
import AddNewBook from './AddNewBook';
import ManageStock from './ManageStock';
import ViewOrders from './ViewOrders';
import CustomerList from './CustomerList';
import UserProfile from './UserProfile';

const Dashboard = ({ user, onBack }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);

  // Function to get current part of the day
  const getCurrentPartOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
      return 'Good Afternoon';
    } else if (hour >= 17 && hour < 21) {
      return 'Good Evening';
    } else {
      return 'Good Night';
    }
  };

  const addToCart = (bookId) => {
    setCart(prev => prev.includes(bookId) ? prev : [...prev, bookId]);
  };

  const toggleWishlist = (bookId) => {
    setWishlist(prev =>
      prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const handleHomepageClick = () => {
    setCurrentView('homepage');
    setIsMobileMenuOpen(false);
  };

  const handleAddNewBookClick = () => {
    setCurrentView('addNewBook');
    setIsMobileMenuOpen(false);
  };

  const handleManageStockClick = () => {
    setCurrentView('manageStock');
    setIsMobileMenuOpen(false);
  };

  const handleViewOrdersClick = () => {
    setCurrentView('viewOrders');
    setIsMobileMenuOpen(false);
  };

  const handleCustomerListClick = () => {
    setCurrentView('customerList');
    setIsMobileMenuOpen(false);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleBackToProfile = () => {
    setCurrentView('userProfile');
    setIsMobileMenuOpen(false);
  };

  const handleShowBookDetails = (bookId) => {
    setCurrentView('bookDetails');
    setSelectedBookId(bookId);
  };

  // Render views based on currentView
  if (currentView === 'homepage') {
    return <Homepage onBackToDashboard={handleBackToDashboard} />;
  }

  if (currentView === 'addNewBook') {
    return <AddNewBook onBack={handleBackToDashboard} />;
  }

  if (currentView === 'manageStock') {
    return (
      <ManageStock
        onBack={handleBackToDashboard}
        onShowBookDetails={handleShowBookDetails}
        cart={cart}
        wishlist={wishlist}
        addToCart={addToCart}
        toggleWishlist={toggleWishlist}
      />
    );
  }

  if (currentView === 'viewOrders') {
    return <ViewOrders onBack={handleBackToDashboard} />;
  }

  if (currentView === 'customerList') {
    return <CustomerList onBack={handleBackToDashboard} />;
  }

  if (currentView === 'bookDetails') {
    return (
      <Homepage
        onBackToDashboard={handleBackToDashboard}
        initialBookId={selectedBookId}
      />
    );
  }

  if (currentView === 'userProfile') {
    return <UserProfile onBackToDashboard={handleBackToDashboard} />;
  }

  // Render Dashboard (default view)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{getCurrentPartOfDay()}</h1>
                <p className="text-sm sm:text-base text-gray-600 hidden sm:block">
                  Welcome back, {user?.name || 'Abdul Rasheed'}!
                </p>
                <p className="text-xs text-gray-600 sm:hidden">
                  {user?.name || 'Admin'}
                </p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-3">
              <button
                onClick={handleHomepageClick}
                className="flex items-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                <Home className="w-4 h-4" />
                <span>Homepage</span>
              </button>
              <button
                onClick={handleBackToProfile}
                className="flex items-center space-x-2 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Back to Profile</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden mt-4 pt-4 border-t border-gray-200 space-y-2">
              <button
                onClick={handleHomepageClick}
                className="w-full flex items-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                <Home className="w-4 h-4" />
                <span>Homepage</span>
              </button>
              <button
                onClick={handleBackToProfile}
                className="w-full flex items-center space-x-2 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Back to Profile</span>
              </button>
            </div>
          )}
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Book className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">Books</h3>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Manage inventory</p>
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <p className="text-xl sm:text-2xl font-bold text-green-600">1,234</p>
              <p className="text-xs sm:text-sm text-gray-500">Total books</p>
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">Stock</h3>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Inventory levels</p>
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">89%</p>
              <p className="text-xs sm:text-sm text-gray-500">Stock level</p>
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">Orders</h3>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Shopping carts</p>
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <p className="text-xl sm:text-2xl font-bold text-purple-600">45</p>
              <p className="text-xs sm:text-sm text-gray-500">Active orders</p>
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">Customers</h3>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">User management</p>
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <p className="text-xl sm:text-2xl font-bold text-orange-600">567</p>
              <p className="text-xs sm:text-sm text-gray-500">Total customers</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-xl p-4 sm:p-6 mt-4 sm:mt-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <button 
              onClick={handleAddNewBookClick}
              className="p-3 sm:p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-left"
            >
              <Book className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-2" />
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Add New Book</h3>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Add books to inventory</p>
            </button>
            <button 
              onClick={handleManageStockClick}
              className="p-3 sm:p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200 text-left"
            >
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mb-2" />
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Manage Stock</h3>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Update inventory levels</p>
            </button>
            <button 
              onClick={handleViewOrdersClick}
              className="p-3 sm:p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200 text-left"
            >
              <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mb-2" />
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">View Orders</h3>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Process customer orders</p>
            </button>
            <button 
              onClick={handleCustomerListClick}
              className="p-3 sm:p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200 text-left"
            >
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 mb-2" />
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Customer List</h3>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Manage customer data</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-xl p-4 sm:p-6 mt-4 sm:mt-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Recent Activity</h2>
          <div className="space-y-2 sm:space-y-4">
            <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Book className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-medium text-gray-900 truncate">New book added to inventory</p>
                <p className="text-xs sm:text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-medium text-gray-900 truncate">Order #1234 completed</p>
                <p className="text-xs sm:text-sm text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-medium text-gray-900 truncate">New customer registered</p>
                <p className="text-xs sm:text-sm text-gray-500">6 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-medium text-gray-900 truncate">Stock level updated for 5 items</p>
                <p className="text-xs sm:text-sm text-gray-500">8 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;