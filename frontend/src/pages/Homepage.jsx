import { Link } from "react-router-dom";
import { Home, Heart, Flame, ShoppingBag, User } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Entry animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-grid-gray-100/25 pointer-events-none"></div>
      
      {/* Animated Entry Overlay */}
      {isLoading && (
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ originY: 0 }}
          className="fixed inset-0 bg-black z-50"
        />
      )}
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 backdrop-blur-md bg-white/80 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* Brand Logo and Name with Animation */}
          <Link to="/" className="group flex items-center space-x-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg"
            >
              L
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent"
            >
              Choco
            </motion.span>
          </Link>

          {/* Navigation Links */}
          <ul className="flex space-x-8">
            {[
              { to: "/", icon: Home, label: "Home" },
              { to: "/trending", icon: Flame, label: "Trending" },
              { to: "/favourites", icon: Heart, label: "Favourites" },
              { to: "/cart", icon: ShoppingBag, label: "Cart" },
              { to: "/account", icon: User, label: "Account" }
            ].map(({ to, icon: Icon, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="group relative text-gray-600 transition-colors duration-300 flex items-center space-x-2"
                >
                  <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="relative">
                    {label}
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-black transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Hero Section with Animation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-black mb-4 relative inline-block">
            Welcome to Choco
            <div className="absolute -inset-1 border border-black/10 rounded-lg -z-10 transform rotate-2"></div>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover the latest trends in fashion and style
          </p>
          <Link
            to="/shop"
            className="group relative inline-block py-3 px-8 text-sm font-medium bg-black text-white rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-900"
          >
            <span className="relative z-10">Explore Collection</span>
            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out opacity-10"></div>
          </Link>
        </motion.section>

        {/* Trending Collections Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-black mb-6">Trending Collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Summer Vibes", "Casual Wear", "Formal Elegance"].map((collection, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                key={index}
                className="group bg-white rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl relative"
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                <img
                  src={`/api/placeholder/400/300`}
                  alt={collection}
                  className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-6 relative">
                  <h3 className="text-lg font-semibold text-black mb-2">{collection}</h3>
                  <p className="text-gray-600 mb-4">
                    Explore the latest in {collection.toLowerCase()}
                  </p>
                  <Link
                    to={`/collection/${collection.toLowerCase()}`}
                    className="inline-flex items-center text-black font-medium group-hover:text-gray-700"
                  >
                    Shop Now
                    <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section>
          <h2 className="text-2xl font-semibold text-black mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((product) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * product }}
                key={product}
                className="group bg-white rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={`/api/placeholder/400/300`}
                    alt={`Product ${product}`}
                    className="w-full h-48 object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-black mb-2">Product {product}</h3>
                  <p className="text-gray-600 mb-4">Stylish and comfortable clothing for every occasion.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-black font-bold">$99.99</span>
                    <button className="relative overflow-hidden bg-black text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transform hover:-translate-y-1">
                      <span className="relative z-10">Add to Cart</span>
                      <div className="absolute inset-0 bg-white transform -translate-x-full hover:translate-x-0 transition-transform duration-500 ease-in-out opacity-10"></div>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Add Product Button (Relocated) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <Link
            to="/AddProduct"
            className="group flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Add Product</span>
          </Link>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default HomePage;