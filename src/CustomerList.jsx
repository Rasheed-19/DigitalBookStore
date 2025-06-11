import React, { useState } from 'react';
import { ArrowLeft, Search, User, Mail, Phone, MapPin, Calendar, Edit, Trash2, Filter, Download, Plus } from 'lucide-react';

const CustomerList = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  // Sample customer data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY',
      joinDate: '2024-01-15',
      totalOrders: 12,
      totalSpent: 1250.50,
      status: 'active',
      lastOrder: '2024-05-20'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 234-5678',
      address: '456 Oak Ave, Los Angeles, CA',
      joinDate: '2024-02-10',
      totalOrders: 8,
      totalSpent: 890.25,
      status: 'active',
      lastOrder: '2024-05-18'
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.brown@email.com',
      phone: '+1 (555) 345-6789',
      address: '789 Pine Rd, Chicago, IL',
      joinDate: '2023-11-20',
      totalOrders: 25,
      totalSpent: 2150.75,
      status: 'inactive',
      lastOrder: '2024-03-15'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 456-7890',
      address: '321 Elm St, Houston, TX',
      joinDate: '2024-03-05',
      totalOrders: 6,
      totalSpent: 650.00,
      status: 'active',
      lastOrder: '2024-05-22'
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '+1 (555) 567-8901',
      address: '654 Maple Dr, Phoenix, AZ',
      joinDate: '2024-01-30',
      totalOrders: 15,
      totalSpent: 1450.30,
      status: 'active',
      lastOrder: '2024-05-19'
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@email.com',
      phone: '+1 (555) 678-9012',
      address: '987 Cedar Ln, Miami, FL',
      joinDate: '2024-04-12',
      totalOrders: 3,
      totalSpent: 275.80,
      status: 'active',
      lastOrder: '2024-05-21'
    },
    {
      id: 7,
      name: 'Robert Taylor',
      email: 'robert.taylor@email.com',
      phone: '+1 (555) 789-0123',
      address: '246 Birch Ave, Seattle, WA',
      joinDate: '2023-09-18',
      totalOrders: 18,
      totalSpent: 1875.90,
      status: 'inactive',
      lastOrder: '2024-02-28'
    },
    {
      id: 8,
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 890-1234',
      address: '135 Willow St, Denver, CO',
      joinDate: '2024-02-28',
      totalOrders: 11,
      totalSpent: 1120.45,
      status: 'active',
      lastOrder: '2024-05-23'
    }
  ]);

  // Filter and sort customers
  const filteredCustomers = customers
    .filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.phone.includes(searchTerm);
      const matchesFilter = filterStatus === 'all' || customer.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'joinDate':
          return new Date(b.joinDate) - new Date(a.joinDate);
        case 'totalOrders':
          return b.totalOrders - a.totalOrders;
        case 'totalSpent':
          return b.totalSpent - a.totalSpent;
        default:
          return 0;
      }
    });

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(filteredCustomers.map(customer => customer.id));
    }
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedCustomers.length} customer(s)?`)) {
      setCustomers(prev => prev.filter(customer => !selectedCustomers.includes(customer.id)));
      setSelectedCustomers([]);
    }
  };

  const handleDeleteCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(prev => prev.filter(customer => customer.id !== customerId));
      setSelectedCustomers(prev => prev.filter(id => id !== customerId));
    }
  };

  const handleExportCustomers = () => {
    // Create CSV content
    const csvHeaders = ['Name', 'Email', 'Phone', 'Address', 'Join Date', 'Total Orders', 'Total Spent', 'Status', 'Last Order'];
    const csvRows = filteredCustomers.map(customer => [
      customer.name,
      customer.email,
      customer.phone,
      `"${customer.address}"`, // Wrap address in quotes to handle commas
      customer.joinDate,
      customer.totalOrders,
      customer.totalSpent,
      customer.status,
      customer.lastOrder
    ]);
    
    const csvContent = [csvHeaders, ...csvRows]
      .map(row => row.join(','))
      .join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `customers-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const inactiveCustomers = customers.filter(c => c.status === 'inactive').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={onBack}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Customer Management</h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Manage your customer database ({customers.length} total customers)
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={handleExportCustomers}
                className="flex items-center space-x-2 bg-green-600 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-green-700 transition duration-200"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export CSV</span>
                <span className="sm:hidden">Export</span>
              </button>
              <button className="flex items-center space-x-2 bg-blue-600 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-blue-700 transition duration-200">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Customer</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600">Total Customers</h3>
                <p className="text-2xl font-bold text-blue-600">{customers.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600">Active</h3>
                <p className="text-2xl font-bold text-green-600">{activeCustomers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600">Inactive</h3>
                <p className="text-2xl font-bold text-red-600">{inactiveCustomers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600">Total Revenue</h3>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search customers by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            
            {/* Filter by Status */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="name">Sort by Name</option>
              <option value="joinDate">Sort by Join Date</option>
              <option value="totalOrders">Sort by Orders</option>
              <option value="totalSpent">Sort by Spent</option>
            </select>
          </div>
          
          {/* Bulk Actions */}
          {selectedCustomers.length > 0 && (
            <div className="mt-4 flex items-center justify-between bg-blue-50 p-3 rounded-lg">
              <span className="text-sm text-blue-800 font-medium">
                {selectedCustomers.length} customer(s) selected
              </span>
              <button
                onClick={handleDeleteSelected}
                className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm font-medium">Delete Selected</span>
              </button>
            </div>
          )}
        </div>

        {/* Customer List */}
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-xl overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-semibold text-gray-700">
                  Select All ({filteredCustomers.length} customers)
                </span>
              </div>
              <span className="text-sm text-gray-500">
                Showing {filteredCustomers.length} of {customers.length} customers
              </span>
            </div>
          </div>

          {/* Customer Cards */}
          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(customer.id)}
                    onChange={() => handleSelectCustomer(customer.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-1"
                  />
                  
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Mail className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{customer.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4 flex-shrink-0" />
                            <span>{customer.phone}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{customer.address}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col lg:items-end space-y-3 lg:text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold self-start lg:self-end ${getStatusColor(customer.status)}`}>
                          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                        </span>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 text-sm text-gray-600">
                          <div>
                            <span className="text-gray-500">Orders:</span>
                            <span className="font-semibold ml-1">{customer.totalOrders}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Spent:</span>
                            <span className="font-semibold ml-1">${customer.totalSpent.toFixed(2)}</span>
                          </div>
                          <div className="col-span-2 lg:col-span-1">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span className="text-xs">Joined {formatDate(customer.joinDate)}</span>
                            </div>
                          </div>
                          <div className="col-span-2 lg:col-span-1 text-xs text-gray-500">
                            Last order: {formatDate(customer.lastOrder)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-4 pt-3 border-t border-gray-100">
                      <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors">
                        <Edit className="w-4 h-4" />
                        <span className="text-sm font-medium">Edit</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteCustomer(customer.id)}
                        className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Delete</span>
                      </button>
                      <div className="text-xs text-gray-400 ml-auto">
                        Customer ID: #{customer.id}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCustomers.length === 0 && (
            <div className="p-8 text-center">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No customers found</h3>
              <p className="text-gray-600">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'Start by adding your first customer.'}
              </p>
              {(searchTerm || filterStatus !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('all');
                  }}
                  className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Quick Stats Footer */}
        {filteredCustomers.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-4 mt-4 sm:mt-6">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
              <div>
                <span className="font-semibold">{filteredCustomers.length}</span> customers shown
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
              <div>
                Total revenue: <span className="font-semibold text-green-600">
                  ${filteredCustomers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
                </span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
              <div>
                Average order value: <span className="font-semibold text-blue-600">
                  ${(filteredCustomers.reduce((sum, c) => sum + c.totalSpent, 0) / 
                     filteredCustomers.reduce((sum, c) => sum + c.totalOrders, 0) || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList;