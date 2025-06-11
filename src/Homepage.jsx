import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Star, Heart, ShoppingCart, BookOpen, TrendingUp, Award, Users, ArrowLeft, CreditCard, User, Mail, X } from 'lucide-react';
import Dashboard from './Dashboard';

// Mock data
const mockBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 15.99,
    originalPrice: 19.99,
    rating: 4.5,
    reviews: 1234,
    category: "Fiction",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    isNew: false,
    isBestseller: true,
    description: "The Great Gatsby follows a cast of characters living in the fictional town of West Egg on prosperous Long Island in the summer of 1922. The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession with the beautiful former debutante Daisy Buchanan.",
    publicationDate: "April 10, 1925",
    pages: 180,
    isbn: "978-0743273565"
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 12.99,
    originalPrice: 16.99,
    rating: 4.8,
    reviews: 2156,
    category: "Fiction",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
    isNew: true,
    isBestseller: false,
    description: "To Kill a Mockingbird is a novel set in the American South during the 1930s. It deals with serious issues like racial inequality and injustice through the perspective of young Scout Finch as she observes her father, lawyer Atticus Finch, defend a Black man wrongfully accused of a crime.",
    publicationDate: "July 11, 1960",
    pages: 281,
    isbn: "978-0446310789"
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    price: 18.99,
    originalPrice: 22.99,
    rating: 4.7,
    reviews: 3421,
    category: "Self-Help",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    isNew: false,
    isBestseller: true,
    description: "Atomic Habits offers a proven framework for improving every day. James Clear reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    publicationDate: "October 16, 2018",
    pages: 320,
    isbn: "978-0735211292"
  },
  {
    id: 4,
    title: "Dune",
    author: "Frank Herbert",
    price: 16.99,
    originalPrice: 21.99,
    rating: 4.6,
    reviews: 1876,
    category: "Sci-Fi",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    isNew: false,
    isBestseller: false,
    description: "Dune follows young Paul Atreides, whose noble family accepts the stewardship of the desert planet Arrakis, the only source of the 'spice' melange, a drug that enhances mental abilities. The story explores themes of politics, religion, and human potential.",
    publicationDate: "August 1, 1965",
    pages: 412,
    isbn: "978-0441172719"
  },
  {
    id: 5,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 14.99,
    originalPrice: 18.99,
    rating: 4.4,
    reviews: 987,
    category: "Mystery",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    isNew: true,
    isBestseller: false,
    description: "The Silent Patient is a psychological thriller about a woman who shoots her husband and then refuses to speak. A therapist becomes obsessed with uncovering her motive, leading to shocking revelations about her past and the true nature of her silence.",
    publicationDate: "February 5, 2019",
    pages: 336,
    isbn: "978-1250301697"
  },
  {
    id: 6,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 11.99,
    originalPrice: 14.99,
    rating: 4.9,
    reviews: 4321,
    category: "Romance",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    isNew: false,
    isBestseller: true,
    description: "Pride and Prejudice follows Elizabeth Bennet as she navigates issues of love, family pressures, and societal expectations in 19th-century England. Her evolving relationship with the wealthy but initially aloof Mr. Darcy forms the heart of this classic romance.",
    publicationDate: "January 28, 1813",
    pages: 432,
    isbn: "978-0141439518"
  }
];

// BookDetails Component
const BookDetails = ({ book, onBack, addToCart, toggleWishlist, isInCart, isInWishlist }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors touch-manipulation"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm font-medium">Back to Store</span>
              </button>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">{book.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => addToCart(book.id)}
                  disabled={isInCart}
                  className={`flex-1 py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 touch-manipulation text-sm sm:text-base ${
                    isInCart
                      ? 'bg-green-600 text-white cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {isInCart ? 'Added to Cart' : 'Add to Cart'}
                </button>
                <button
                  onClick={() => toggleWishlist(book.id)}
                  className={`px-3 py-2.5 text-red-600 hover:text-red-800 border border-red-200 hover:border-red-300 rounded-lg transition-colors text-sm flex items-center gap-2 ${
                    isInWishlist ? 'bg-red-50' : ''
                  }`}
                >
                  <Heart className="w-4 h-4" fill={isInWishlist ? 'currentColor' : 'none'} />
                  {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{book.title}</h2>
              <p className="text-gray-600 text-lg mb-2">by {book.author}</p>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(book.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({book.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-blue-600">${book.price.toFixed(2)}</span>
                {book.originalPrice > book.price && (
                  <span className="text-lg text-gray-500 line-through">${book.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <div className="mb-4">
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {book.category}
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{book.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700">Publication Date</h4>
                  <p className="text-gray-600">{book.publicationDate}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700">Pages</h4>
                  <p className="text-gray-600">{book.pages}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700">ISBN</h4>
                  <p className="text-gray-600">{book.isbn}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// CheckoutForm Component
const CheckoutForm = ({ onSubmit, cartItems, onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
    if (!formData.cardNumber || formData.cardNumber.length < 16) newErrors.cardNumber = 'Valid card number is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv || formData.cvv.length < 3) newErrors.cvv = 'Valid CVV is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors touch-manipulation"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm font-medium">Back to Cart</span>
              </button>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <CreditCard className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Checkout</h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
          <CreditCard className="mr-2" /> Checkout
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Billing Information</h3>
            <div className="mb-4">
              <label className="flex items-center text-gray-600 mb-2">
                <User className="mr-2 h-5 w-5" /> Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>
            <div className="mb-4">
              <label className="flex items-center text-gray-600 mb-2">
                <Mail className="mr-2 h-5 w-5" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="john.doe@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="text-gray-600 mb-2 block">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123 Book St"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            <div className="mb-4">
              <label className="text-gray-600 mb-2 block">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Bookville"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
            <div className="mb-4">
              <label className="text-gray-600 mb-2 block">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="12345"
              />
              {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Payment Details</h3>
            <div className="mb-4">
              <label className="text-gray-600 mb-2 block">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1234 5678 9012 3456"
                maxLength="16"
              />
              {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-gray-600 mb-2 block">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="MM/YY"
                />
                {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123"
                  maxLength="3"
                />
                {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Order Summary</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between mb-2">
                    <span>{item.title}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold mt-4">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Favorites Component
const FavoritesComponent = ({ wishlist, onBack, toggleWishlist, addToCart, cart, onShowBookDetails }) => {
  const favoriteBooks = wishlist.map(bookId => mockBooks.find(book => book.id === bookId)).filter(Boolean);

  const FavoriteBookCard = ({ book }) => {
    const isInCart = cart.includes(book.id);

    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
        <div className="relative cursor-pointer" onClick={() => onShowBookDetails(book.id)}>
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
          />
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex gap-1 sm:gap-2">
            {book.isNew && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                NEW
              </span>
            )}
            {book.isBestseller && (
              <span className="bg-orange-500 text-white text-xs px-1.5 sm:px-2 py-1 rounded-full font-medium">
                BESTSELLER
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(book.id);
            }}
            className="absolute top-2 sm:top-3 right-2 sm:right-3 p-2 rounded-full transition-colors touch-manipulation bg-red-500 text-white hover:bg-red-600"
          >
            <Heart className="w-4 h-4" fill="currentColor" />
          </button>
        </div>

        <div className="p-3 sm:p-4">
          <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 line-clamp-2 cursor-pointer" onClick={() => onShowBookDetails(book.id)}>{book.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{book.author}</p>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(book.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                    }`}
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm text-gray-600">({book.reviews})</span>
          </div>

          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-bold text-red-600">${book.price}</span>
              {book.originalPrice > book.price && (
                <span className="text-xs sm:text-sm text-gray-500 line-through">${book.originalPrice}</span>
              )}
            </div>
            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
              {book.category}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => addToCart(book.id)}
              disabled={isInCart}
              className={`flex-1 py-2.5 sm:py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 touch-manipulation text-sm sm:text-base ${
                isInCart
                  ? 'bg-green-600 text-white cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              {isInCart ? 'In Cart' : 'Add to Cart'}
            </button>
            <button
              onClick={() => toggleWishlist(book.id)}
              className="px-3 py-2.5 sm:py-2 text-red-600 hover:text-red-800 border border-red-200 hover:border-red-300 rounded-lg transition-colors text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors touch-manipulation"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm font-medium">Back to Store</span>
              </button>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">My Favorites</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Your Favorite Books</h2>
          <p className="text-gray-600">Books you've saved for later ({favoriteBooks.length} items)</p>
        </div>

        {favoriteBooks.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 text-center">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No favorites yet</h3>
            <p className="text-gray-500 mb-6">Start adding books to your favorites by clicking the heart icon!</p>
            <button
              onClick={onBack}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Browse Books
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteBooks.map(book => (
              <FavoriteBookCard key={book.id} book={book} />
            ))}
          </div>
        )}

        {favoriteBooks.length > 0 && (
          <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => {
                  favoriteBooks.forEach(book => {
                    if (!cart.includes(book.id)) {
                      addToCart(book.id);
                    }
                  });
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add All to Cart
              </button>
              <button 
                onClick={() => {
                  favoriteBooks.forEach(book => toggleWishlist(book.id));
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Clear All Favorites
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// CartComponent
const CartComponent = ({ cart, onBack, removeFromCart, onShowCheckout }) => {
  const cartItems = cart.map(bookId => mockBooks.find(book => book.id === bookId)).filter(Boolean);
  const total = cartItems.reduce((sum, book) => sum + book.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors touch-manipulation"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm font-medium">Back to Store</span>
              </button>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Shopping Cart</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Cart ({cartItems.length} items)</h2>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-4">Add some books to get started!</p>
              <button
                onClick={onBack}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map(book => (
                  <div key={book.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{book.title}</h3>
                      <p className="text-gray-600">{book.author}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(book.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                                }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({book.reviews})</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">${book.price}</div>
                      {book.originalPrice > book.price && (
                        <div className="text-sm text-gray-500 line-through">${book.originalPrice}</div>
                      )}
                      <button
                        onClick={() => removeFromCart(book.id)}
                        className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={onShowCheckout}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors text-lg font-semibold"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const BookStorePage = ({ cart, wishlist, addToCart, removeFromCart, toggleWishlist, onShowCart, onShowFavorites, onGoBack, onShowBookDetails }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [books, setBooks] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const categories = ['All', 'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Biography', 'Self-Help'];

  useEffect(() => {
    setBooks(mockBooks);
    setFeaturedBooks(mockBooks.filter(book => book.isBestseller || book.isNew).slice(0, 3));
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('All');
    setIsFilterActive(false);
  }, []);

  const filteredBooks = books.filter(book => {
    const searchTerms = searchQuery.toLowerCase().trim().split(/\s+/);
    const matchesSearch = searchTerms.every(term =>
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term)
    );
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    setIsFilterActive(searchQuery !== '' || selectedCategory !== 'All');
  }, [searchQuery, selectedCategory]);

  const BookCard = React.memo(({ book }) => {
    const isInCart = cart.includes(book.id);
    const isInWishlist = wishlist.includes(book.id);

    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
        <div className="relative cursor-pointer" onClick={() => onShowBookDetails(book.id)}>
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
          />
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex gap-1 sm:gap-2">
            {book.isNew && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                NEW
              </span>
            )}
            {book.isBestseller && (
              <span className="bg-orange-500 text-white text-xs px-1.5 sm:px-2 py-1 rounded-full font-medium">
                BESTSELLER
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(book.id);
            }}
            className={`absolute top-2 sm:top-3 right-2 sm:right-3 p-2 rounded-full transition-colors touch-manipulation ${
              isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Heart className="w-4 h-4" fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="p-3 sm:p-4">
          <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 line-clamp-2 cursor-pointer" onClick={() => onShowBookDetails(book.id)}>{book.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{book.author}</p>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(book.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                    }`}
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm text-gray-600">({book.reviews})</span>
          </div>

          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-bold text-blue-600">${book.price}</span>
              {book.originalPrice > book.price && (
                <span className="text-xs sm:text-sm text-gray-500 line-through">${book.originalPrice}</span>
              )}
            </div>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {book.category}
            </span>
          </div>

          <button
            onClick={() => addToCart(book.id)}
            disabled={isInCart}
            className={`w-full py-2.5 sm:py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 touch-manipulation text-sm sm:text-base ${
              isInCart
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isInCart ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-lg sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button
          onClick={onGoBack}
          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors touch-manipulation"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline text-sm font-medium">Back to Dashboard</span>
          <span className="sm:hidden text-sm font-medium">Back</span>
        </button>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <h1
            className="text-lg sm:text-2xl font-bold text-gray-900 cursor-pointer"
            onClick={onGoBack}
          >
            BookStore
          </h1>
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <button
          onClick={onShowFavorites}
          className="relative p-2 sm:p-2 text-gray-600 hover:text-red-600 transition-colors touch-manipulation"
        >
          <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </button>
        <button
          onClick={onShowCart}
          className="relative p-2 sm:p-2 text-gray-600 hover:text-blue-600 transition-colors touch-manipulation"
        >
          <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </div>
    </div>
  </div>
</header>

      <section className="py-8 sm:py-12 lg:py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Discover Your Next
            <span className="text-blue-600 block">Great Read</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Explore thousands of books from bestselling authors and discover new favorites
          </p>

          <div className="max-w-2xl mx-auto relative mb-6 sm:mb-8 px-4 sm:px-0">
            <Search className="absolute left-6 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search for books, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg touch-manipulation"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-6 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-4 sm:mb-6 px-4 sm:px-0">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-6 py-2 text-sm sm:text-base rounded-full transition-all touch-manipulation ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-blue-50 shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {isFilterActive && (
            <div className="flex justify-center mb-8 sm:mb-12">
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 text-sm sm:text-base text-gray-600 hover:text-blue-600 bg-white hover:bg-blue-50 rounded-full transition-colors shadow-md touch-manipulation"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900">Featured Books</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>Trending</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4" />
                <span>Award Winners</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900">
              {selectedCategory === 'All' ? 'All Books' : `${selectedCategory} Books`}
            </h3>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span>{filteredBooks.length} books found</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-600 mb-2">No books found</h4>
              <p className="text-gray-500">Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-2xl font-bold">BookStore</h4>
          </div>
          <p className="text-gray-400 mb-6">Your gateway to endless stories and knowledge</p>
          <div className="flex justify-center space-x-8 text-sm">
            <a href="#" className="hover:text-blue-400 transition-colors">About Us</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Homepage component
const Homepage = ({ onBackToDashboard }) => {
  const [currentView, setCurrentView] = useState('store');
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = useCallback((bookId) => {
    setCart(prev => prev.includes(bookId) ? prev : [...prev, bookId]);
  }, []);

  const removeFromCart = useCallback((bookId) => {
    setCart(prev => prev.filter(id => id !== bookId));
  }, []);

  const toggleWishlist = useCallback((bookId) => {
    setWishlist(prev =>
      prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  }, []);

  const showDashboard = useCallback(() => setCurrentView('dashboard'), []);
  const showStore = useCallback(() => {
    setCurrentView('store');
    setSelectedBookId(null);
  }, []);
  const showCart = useCallback(() => setCurrentView('cart'), []);
  const showFavorites = useCallback(() => setCurrentView('favorites'), []);
  const showCheckout = useCallback(() => setCurrentView('checkout'), []);
  const showBookDetails = useCallback((bookId) => {
    setSelectedBookId(bookId);
    setCurrentView('bookDetails');
  }, []);

  const handleBackToDashboard = useCallback(() => {
    if (onBackToDashboard) {
      onBackToDashboard();
    } else {
      showDashboard();
    }
  }, [onBackToDashboard, showDashboard]);

  switch (currentView) {
    case 'dashboard':
      return <DashboardComponent onNavigateToStore={showStore} />;
    
    case 'cart':
      return (
        <CartComponent 
          cart={cart} 
          onBack={showStore} 
          removeFromCart={removeFromCart}
          onShowCheckout={showCheckout}
        />
      );
    
    case 'favorites':
      return (
        <FavoritesComponent
          wishlist={wishlist}
          onBack={showStore}
          toggleWishlist={toggleWishlist}
          addToCart={addToCart}
          cart={cart}
          onShowBookDetails={showBookDetails}
        />
      );
    
    case 'checkout':
      return (
        <CheckoutForm
          cartItems={cart.map(bookId => mockBooks.find(book => book.id === bookId)).filter(Boolean)}
          onSubmit={(formData) => console.log('Order submitted:', formData)}
          onBack={showCart}
        />
      );
    
    case 'bookDetails':
      const selectedBook = mockBooks.find(book => book.id === selectedBookId);
      if (!selectedBook) return <BookStorePage
        cart={cart}
        wishlist={wishlist}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        toggleWishlist={toggleWishlist}
        onShowCart={showCart}
        onShowFavorites={showFavorites}
        onGoBack={handleBackToDashboard}
        onShowBookDetails={showBookDetails}
      />;
      return (
        <BookDetails
          book={selectedBook}
          onBack={showStore}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          isInCart={cart.includes(selectedBookId)}
          isInWishlist={wishlist.includes(selectedBookId)}
        />
      );
    
    case 'store':
    default:
      return (
        <BookStorePage
          cart={cart}
          wishlist={wishlist}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          toggleWishlist={toggleWishlist}
          onShowCart={showCart}
          onShowFavorites={showFavorites}
          onGoBack={handleBackToDashboard}
          onShowBookDetails={showBookDetails}
        />
      );
  }
};

export default Homepage;