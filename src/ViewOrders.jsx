import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Eye, 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle,
  Calendar,
  DollarSign,
  User,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const ViewOrders = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Mock orders data - in real app, this would come from API
  const mockOrders = [
    {
      id: 'ORD-001',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      customerPhone: '+1 234 567 8900',
      customerAddress: '123 Main St, New York, NY 10001',
      orderDate: '2024-06-03T10:30:00Z',
      status: 'pending',
      total: 89.97,
      items: [
        { bookTitle: 'The Great Gatsby', quantity: 2, price: 15.99 },
        { bookTitle: 'To Kill a Mockingbird', quantity: 1, price: 18.99 },
        { bookTitle: '1984', quantity: 3, price: 12.99 }
      ],
      shippingMethod: 'Standard Shipping',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ORD-002',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      customerPhone: '+1 234 567 8901',
      customerAddress: '456 Oak Ave, Los Angeles, CA 90210',
      orderDate: '2024-06-02T14:15:00Z',
      status: 'processing',
      total: 45.98,
      items: [
        { bookTitle: 'Pride and Prejudice', quantity: 2, price: 14.99 },
        { bookTitle: 'Jane Eyre', quantity: 1, price: 16.00 }
      ],
      shippingMethod: 'Express Shipping',
      paymentMethod: 'PayPal'
    },
    {
      id: 'ORD-003',
      customerName: 'Mike Johnson',
      customerEmail: 'mike@example.com',
      customerPhone: '+1 234 567 8902',
      customerAddress: '789 Pine Rd, Chicago, IL 60601',
      orderDate: '2024-06-01T09:45:00Z',
      status: 'shipped',
      total: 127.95,
      items: [
        { bookTitle: 'The Catcher in the Rye', quantity: 1, price: 17.99 },
        { bookTitle: 'Lord of the Flies', quantity: 2, price: 13.99 },
        { bookTitle: 'Of Mice and Men', quantity: 1, price: 15.99 },
        { bookTitle: 'The Hobbit', quantity: 3, price: 19.99 }
      ],
      shippingMethod: 'Standard Shipping',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ORD-004',
      customerName: 'Sarah Wilson',
      customerEmail: 'sarah@example.com',
      customerPhone: '+1 234 567 8903',
      customerAddress: '321 Elm St, Miami, FL 33101',
      orderDate: '2024-05-31T16:20:00Z',
      status: 'delivered',
      total: 73.96,
      items: [
        { bookTitle: 'Harry Potter Series', quantity: 4, price: 18.49 }
      ],
      shippingMethod: 'Express Shipping',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ORD-005',
      customerName: 'David Brown',
      customerEmail: 'david@example.com',
      customerPhone: '+1 234 567 8904',
      customerAddress: '654 Maple Dr, Seattle, WA 98101',
      orderDate: '2024-05-30T11:10:00Z',
      status: 'cancelled',
      total: 32.98,
      items: [
        { bookTitle: 'Brave New World', quantity: 2, price: 16.49 }
      ],
      shippingMethod: 'Standard Shipping',
      paymentMethod: 'PayPal'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Package className="w-4 h-4" />;
      case 'processing':
        return <Filter className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'shipped':
        return 'text-purple-600 bg-purple-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = mockOrders.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.orderDate);
          bValue = new Date(b.orderDate);
          break;
        case 'total':
          aValue = a.total;
          bValue = b.total;
          break;
        case 'customer':
          aValue = a.customerName.toLowerCase();
          bValue = b.customerName.toLowerCase();
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [searchTerm, statusFilter, sortBy, sortOrder, mockOrders]);

  const handleStatusChange = (orderId, newStatus) => {
    // In a real app, this would make an API call to update the order status
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
    // For now, we'll just log it since we're using mock data
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={onBack}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">View Orders</h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Manage and track customer orders
                </p>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search orders by ID, customer name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2 sm:gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="total-desc">Highest Amount</option>
                <option value="total-asc">Lowest Amount</option>
                <option value="customer-asc">Customer A-Z</option>
                <option value="customer-desc">Customer Z-A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredAndSortedOrders.length === 0 ? (
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-8 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            filteredAndSortedOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
                {/* Order Header */}
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                        <p className="text-sm text-gray-600">{formatDate(order.orderDate)}</p>
                      </div>
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">{order.items.length} items</p>
                      </div>
                      <button
                        onClick={() => toggleOrderExpansion(order.id)}
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        {expandedOrder === order.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                        <p className="text-xs text-gray-600">{order.customerEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-900">{order.customerPhone}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-900 truncate">{order.customerAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Expanded Order Details */}
                {expandedOrder === order.id && (
                  <div className="p-4 sm:p-6 bg-gray-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Order Items */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h4>
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
                              <div>
                                <p className="font-medium text-gray-900">{item.bookTitle}</p>
                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                              </div>
                              <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Actions & Info */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Management</h4>
                        <div className="space-y-4">
                          <div className="p-4 bg-white rounded-lg">
                            <h5 className="font-medium text-gray-900 mb-2">Update Status</h5>
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>

                          <div className="p-4 bg-white rounded-lg">
                            <h5 className="font-medium text-gray-900 mb-2">Payment & Shipping</h5>
                            <div className="space-y-2">
                              <p className="text-sm"><span className="font-medium">Payment:</span> {order.paymentMethod}</p>
                              <p className="text-sm"><span className="font-medium">Shipping:</span> {order.shippingMethod}</p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                              <Eye className="w-4 h-4 inline mr-2" />
                              View Details
                            </button>
                            <button className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                              Print Invoice
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs text-gray-600">Total Orders</p>
                <p className="text-lg font-bold text-gray-900">{filteredAndSortedOrders.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-xs text-gray-600">Total Value</p>
                <p className="text-lg font-bold text-gray-900">
                  ${filteredAndSortedOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-xs text-gray-600">Delivered</p>
                <p className="text-lg font-bold text-gray-900">
                  {filteredAndSortedOrders.filter(o => o.status === 'delivered').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-xs text-gray-600">In Transit</p>
                <p className="text-lg font-bold text-gray-900">
                  {filteredAndSortedOrders.filter(o => o.status === 'shipped').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrders;