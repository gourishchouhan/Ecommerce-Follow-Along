import { Link } from "react-router-dom";
import { Home, Heart, Flame, ShoppingBag, User } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 relative overflow-hidden">
      {/* Background light effects */}
      <div className="absolute w-96 h-96 -top-48 -right-48 bg-orange-100 rounded-full opacity-20"></div>
      <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-orange-50 rounded-full opacity-20"></div>

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* Brand Logo and Name */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              L
            </div>
            <span className="text-xl font-bold text-gray-900">
            ਲੀਡੇ</span>
          </Link>

          {/* Navigation Links */}
          <ul className="flex space-x-8">
            <li>
              <Link
                to="/"
                className="text-gray-600 hover:text-orange-600 transition-colors duration-300 flex items-center space-x-2"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/trending"
                className="text-gray-600 hover:text-orange-600 transition-colors duration-300 flex items-center space-x-2"
              >
                <Flame className="w-5 h-5" />
                <span>Trending</span>
              </Link>
            </li>
            <li>
              <Link
                to="/favourites"
                className="text-gray-600 hover:text-orange-600 transition-colors duration-300 flex items-center space-x-2"
              >
                <Heart className="w-5 h-5" />
                <span>Favourites</span>
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="text-gray-600 hover:text-orange-600 transition-colors duration-300 flex items-center space-x-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Cart</span>
              </Link>
            </li>
            <li>
              <Link
                to="/account"
                className="text-gray-600 hover:text-orange-600 transition-colors duration-300 flex items-center space-x-2"
              >
                <User className="w-5 h-5" />
                <span>Account</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Welcome to ਲੀਡੇ
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover the latest trends in fashion and style
          </p>
          <Link
            to="/shop"
            className="inline-block py-3 px-6 text-sm font-medium rounded-lg text-white overflow-hidden transition-all duration-300 
            bg-gradient-to-r from-orange-500 to-orange-600 
            hover:from-orange-600 hover:to-orange-700
            shadow-[0_2px_8px_rgba(251,146,60,0.25)]
            hover:shadow-[0_8px_20px_rgba(251,146,60,0.35)]
            transform hover:-translate-y-1 active:translate-y-0"
          >
            Explore Collection
          </Link>
        </section>

        {/* Trending Collections Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Trending Collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Summer Vibes", "Casual Wear", "Formal Elegance"].map((collection, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <img
                  src={`https://picsum.photos/seed/${collection}/400/300`}
                  alt={collection}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{collection}</h3>
                  <p className="text-gray-600 mb-4">
                    Explore the latest in {collection.toLowerCase()}
                  </p>
                  <Link
                    to={`/collection/${collection.toLowerCase()}`}
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Shop Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((product) => (
              <div
                key={product}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <img
                  src={`https://picsum.photos/seed/${product}/400/300`}
                  alt={`Product ${product}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Product {product}</h3>
                  <p className="text-gray-600 mb-4">Stylish and comfortable clothing for every occasion.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-600 font-bold">$99.99</span>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;