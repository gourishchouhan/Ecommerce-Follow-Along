import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        // Here you would typically make an API call to authenticate
        console.log("Auth attempt with:", formData);

        // If authentication is successful, navigate to homepage
        navigate("/home"); // or whatever your homepage route is
      } catch (error) {
        console.error("Authentication error:", error);
        // Handle any authentication errors here
        setErrors({ general: "Authentication failed. Please try again." });
      }
    } else {
      setErrors(formErrors);
    }
  };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const carouselImages = [
    {
      src: "/api/placeholder/800/1000",
      title: "Premium Fashion",
      description: "Discover the latest trends in fashion"
    },
    {
      src: "/api/placeholder/800/1000",
      title: "Luxury Collection",
      description: "Exclusive designs for unique style"
    },
    {
      src: "/api/placeholder/800/1000",
      title: "Seasonal Deals",
      description: "Best offers on premium products"
    },
    {
      src: "/api/placeholder/800/1000",
      title: "New Arrivals",
      description: "Fresh styles added daily"
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!isLogin && !formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Auto-advance carousel every 5 seconds
  useState(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image Carousel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={carouselImages[currentImageIndex].src}
            alt="Fashion"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="object-cover w-full h-full"
          />
        </AnimatePresence>

        {/* Carousel Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
          <motion.h3
            key={`title-${currentImageIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold mb-2"
          >
            {carouselImages[currentImageIndex].title}
          </motion.h3>
          <motion.p
            key={`desc-${currentImageIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/80"
          >
            {carouselImages[currentImageIndex].description}
          </motion.p>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin ? "Sign in to your account" : "Join us today"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              {!isLogin && (
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 hover:bg-white hover:shadow-sm"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
              )}

              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 hover:bg-white hover:shadow-sm"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="group">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 hover:bg-white hover:shadow-sm"
                    placeholder={isLogin ? "Enter your password" : "Create a password"}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              {!isLogin && (
                <div className="group">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 hover:bg-white hover:shadow-sm"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
              )}
            </div>

            {isLogin && (
              <div className="flex items-center justify-end">
                <button className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                  Forgot your password?
                </button>
              </div>
            )}

            {!isLogin && (
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                  I agree to the Terms and Privacy Policy
                </label>
              </div>
            )}

            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-black overflow-hidden transition-all duration-500
              hover:bg-white hover:text-black
              shadow-[0_2px_8px_rgba(0,0,0,0.25)]
              hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)]
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
              transform hover:-translate-y-1 active:translate-y-0"
            >
              <span className="relative z-10">
                {isLogin ? "Sign in" : "Sign up"}
              </span>
              <span className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              <span className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></span>
            </button>

            <div className="text-center text-sm">
              <span className="text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-black hover:text-gray-700 transition duration-300 ease-in-out"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
