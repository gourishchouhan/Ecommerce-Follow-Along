import { Link } from "react-router-dom";
import { Home, Heart, Flame, ShoppingBag, User, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]); // State for fetched products

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 800);
    

    // Fetch products from backend
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        if (data.status === "success") {
          setProducts(data.data.products);
        } else {
          console.error("Failed to fetch products:", data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    return () => clearTimeout(timer);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-gray-100 text-gray-800 relative overflow-hidden"
    >
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="fixed inset-0 bg-gray-200 z-50 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-t-gray-600 border-gray-300 rounded-full"
          />
        </motion.div>
      )}

      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 bg-white shadow-md z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold text-xl"
            >
              C
            </motion.div>
            <span className="text-2xl font-semibold text-gray-800">Choco</span>
          </Link>
          <ul className="flex space-x-8">
            {[
              { to: "/", icon: Home, label: "Home" },
              { to: "/trending", icon: Flame, label: "Trending" },
              { to: "/favourites", icon: Heart, label: "Favourites" },
              { to: "/cart", icon: ShoppingBag, label: "Cart" },
              { to: "/my-products", icon: User, label: "My Products" }, // Matches route
              { to: "/account", icon: User, label: "Account" },
            ].map(({ to, icon: Icon, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="group flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                >
                  <Icon className="w-5 h-5 group-hover:scale-105 transition-transform duration-300" />
                  <span className="relative">
                    {label}
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gray-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome to Choco
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover quality fashion that fits your style.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/shop"
              className="inline-block px-8 py-3 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-700 transition-colors duration-300"
            >
              Shop Now
            </Link>
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Trending Collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Summer Looks", "Casual Fits", "Work Wear"].map((collection, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, rotate: 0.5 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={`/api/placeholder/400/300`}
                    alt={collection}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{collection}</h3>
                  <p className="text-gray-600 mb-4">
                    Explore {collection.toLowerCase()} essentials.
                  </p>
                  <motion.div whileHover={{ x: 5 }} className="text-gray-800 font-medium">
                    <Link to={`/collection/${collection.toLowerCase()}`}>Shop Now →</Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <motion.div
                  key={product._id}
                  whileHover={{ y: -5, rotate: 0.5 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={product.images[0] || "/api/placeholder/400/300"} // Use Cloudinary URL
                      alt={product.name}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">${product.price}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-300"
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600">No products available yet.</p>
            )}
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Link
            to="/AddProduct"
            className="flex items-center justify-center w-14 h-14 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition-colors duration-300"
          >
            <motion.div
              animate={{ rotate: [0, 90] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              <Plus className="w-6 h-6" />
            </motion.div>
          </Link>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default HomePage;