import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Star, Heart, ShoppingCart, BookOpen, TrendingUp, Award, Users, ArrowLeft, CreditCard, User, Mail } from 'lucide-react';

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
    description: "Immerse yourself in this captivating work of fiction that has captured readers' hearts worldwide. A masterfully crafted narrative that explores the depths of human emotion and experience."
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
    description: "A powerful story set in the American South, dealing with serious issues of rape and racial inequality."
  },
  // Add more books as needed
];

// BookDetailComponent
const BookDetailComponent = ({ bookId, onBack, addToCart, toggleWishlist, cart, wishlist }) => {
  const book = mockBooks.find(b => b.id === bookId);

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Book not found</h2>
          <button
            onClick={onBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  const isInCart = cart.includes(book.id);
  const isInWishlist = wishlist.includes(book.id);
  const discountPercentage = book.originalPrice > book.price
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  // Related books (random selection for demo)
  const relatedBooks = mockBooks
    .filter(b => b.id !== book.id && (b.category === book.category || b.author === book.author))
    .slice(0, 4);

  const RelatedBookCard = ({ relatedBook }) => {
    const isRelatedInCart = cart.includes(relatedBook.id);
    const isRelatedInWishlist = wishlist.includes(relatedBook.id);

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <img
          src={relatedBook.image}
          alt={relatedBook.title}
          className="w-full h-32 object-cover"
        />
        <div className="p-3">
          <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">{relatedBook.title}</h4>
          <p className="text-xs text-gray-600 mb-2">{relatedBook.author}</p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-blue-600">${relatedBook.price}</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(relatedBook.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                    }`}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => addToCart(relatedBook.id)}
              disabled={isRelatedInCart}
              className={`flex-1 py-1 px-2 rounded text-xs transition-colors ${
                isRelatedInCart
                  ? 'bg-green-600 text-white cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isRelatedInCart ? 'In Cart' : 'Add'}
            </button>
            <button
              onClick={() => toggleWishlist(relatedBook.id)}
              className={`p-1 rounded transition-colors ${
                isRelatedInWishlist
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              <Heart className="w-3 h-3" fill={isRelatedInWishlist ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
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
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Book Details</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Main Book Details */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Book Image */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full max-w-md mx-auto lg:max-w-full h-96 lg:h-[500px] object-cover rounded-xl shadow-lg"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {book.isNew && (
                    <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                      NEW
                    </span>
                  )}
                  {book.isBestseller && (
                    <span className="bg-orange-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                      BESTSELLER
                    </span>
                  )}
                </div>
                {discountPercentage > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full font-bold">
                    -{discountPercentage}%
                  </div>
                )}
              </div>
            </div>

            {/* Book Information */}
            <div className="space-y-6">
              <div>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {book.category}
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">{book.title}</h1>
                <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${i < Math.floor(book.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-700">{book.rating}</span>
                  <span className="text-gray-500">({book.reviews.toLocaleString()} reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-blue-600">${book.price}</span>
                  {book.originalPrice > book.price && (
                    <span className="text-xl text-gray-500 line-through">${book.originalPrice}</span>
                  )}
                  {discountPercentage > 0 && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                      Save ${(book.originalPrice - book.price).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => addToCart(book.id)}
                    disabled={isInCart}
                    className={`flex-1 py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 font-semibold ${
                      isInCart
                        ? 'bg-green-600 text-white cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {isInCart ? 'Added to Cart' : 'Add to Cart'}
                  </button>

                  <button
                    onClick={() => toggleWishlist(book.id)}
                    className={`px-4 py-3 rounded-xl transition-colors ${
                      isInWishlist
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200'
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={isInWishlist ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>

              {/* Book Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <Award className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-blue-800">Quality Guaranteed</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-green-800">Fast Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Book Description */}
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Book</h2>
          <div className="prose max-w-none text-gray-700">
            <p className="text-lg leading-relaxed mb-4">
              {book.description}
            </p>
            <p className="text-base leading-relaxed">
              This edition features high-quality printing and binding, ensuring a premium reading experience. Whether you're a longtime fan of the author or discovering their work for the first time, this book promises to deliver an unforgettable literary journey.
            </p>
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedBooks.map(relatedBook => (
                <RelatedBookCard key={relatedBook.id} relatedBook={relatedBook} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// BookStorePage Component with onClick event for BookDetailComponent
const BookStorePage = ({ cart, wishlist, addToCart, removeFromCart, toggleWishlist, onShowCart, onShowFavorites, onGoBack, onShowBookDetail }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [books, setBooks] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);

  // Categories
  const categories = ['All', 'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Biography', 'Self-Help'];

  useEffect(() => {
    // Simulate API call
    setBooks(mockBooks);
    setFeaturedBooks(mockBooks.slice(0, 3));
  }, []);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Memoized BookCard component to prevent unnecessary re-renders
  const BookCard = React.memo(({ book }) => {
    const isInCart = cart.includes(book.id);
    const isInWishlist = wishlist.includes(book.id);

    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden" onClick={() => onShowBookDetail(book.id)}>
        <div className="relative">
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
              e.stopPropagation(); // Prevent triggering the card click event
              toggleWishlist(book.id);
            }}
            className={`absolute top-2 sm:top-3 right-2 sm:right-3 p-2 rounded-full transition-colors touch-manipulation ${isInWishlist
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
          >
            <Heart className="w-4 h-4" fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="p-3 sm:p-4">
          <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 line-clamp-2">{book.title}</h3>
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
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the card click event
              addToCart(book.id);
            }}
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
      {/* Header */}
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
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">BookStore</h1>
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

      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Discover Your Next
            <span className="text-blue-600 block">Great Read</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Explore thousands of books from bestselling authors and discover new favorites
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-6 sm:mb-8 px-4 sm:px-0">
            <Search className="absolute left-6 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search for books, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg touch-manipulation"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12 px-4 sm:px-0">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-6 py-2 text-sm sm:text-base rounded-full transition-all touch-manipulation ${selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-blue-50 shadow-md'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
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

      {/* All Books */}
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

      {/* Footer */}
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
