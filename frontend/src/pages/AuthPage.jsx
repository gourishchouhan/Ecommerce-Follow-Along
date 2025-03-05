import { useState, useEffect } from "react";
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
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = [
    {
      src: "https://res.cloudinary.com/dwhdvrdol/image/upload/v1741075662/photo-1490481651871-ab68de25d43d_cjlzdc.jpg",
      title: "Timeless Style",
      description: "Classic looks for every day",
    },
    {
      src: "https://res.cloudinary.com/dwhdvrdol/image/upload/v1741075639/photo-1445205170230-053b83016050_khnzpm.jpg",
      title: "Bold Choices",
      description: "Stand out with confidence",
    },
    {
      src: "https://res.cloudinary.com/dwhdvrdol/image/upload/v1741075616/photo-1470309864661-68328b2cd0a5_invybq.jpg",
      title: "Daily Deals",
      description: "Great finds at great prices",
    },
    {
      src: "https://res.cloudinary.com/dwhdvrdol/image/upload/v1741075582/photo-1483985988355-763728e1935b_ehyevm.jpg",
      title: "Fresh Drops",
      description: "New styles every week",
    },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!isLogin && !formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const endpoint = isLogin ? "/api/user/login" : "/api/user/signup";
        const url = `http://localhost:5000${endpoint}`;
  
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        const result = await response.json();
        console.log("API Response:", result);
  
        if (!response.ok) {
          throw new Error(result.message || "Something went wrong");
        }
  
        // Store the token in localStorage
        localStorage.setItem("token", result.data.token);
  
        navigate("/home");
      } catch (error) {
        console.error("Authentication error:", error);
        setErrors({ general: error.message || "Authentication failed. Please try again." });
      }
    } else {
      setErrors(formErrors);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-200">
        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={carouselImages[currentImageIndex].src}
              alt={carouselImages[currentImageIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800/70 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <motion.div
            key={`content-${currentImageIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-2">
              {carouselImages[currentImageIndex].title}
            </h3>
            <p className="text-gray-200">
              {carouselImages[currentImageIndex].description}
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? "bg-white scale-125" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              {isLogin ? "Welcome Back" : "Join Choco"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin ? "Sign in to your account" : "Create an account today"}
            </p>
          </div>

          {errors.general && (
            <div className="p-2 bg-red-100 text-red-600 rounded-md text-sm text-center">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-gray-800 focus:outline-none bg-gray-50 text-gray-800 transition-all duration-300 hover:border-gray-400"
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-gray-800 focus:outline-none bg-gray-50 text-gray-800 transition-all duration-300 hover:border-gray-400"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-gray-800 focus:outline-none bg-gray-50 text-gray-800 transition-all duration-300 hover:border-gray-400"
                    placeholder={isLogin ? "Enter your password" : "Create a password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors duration-200 rounded-full hover:bg-gray-100 p-1.5"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-gray-800 focus:outline-none bg-gray-50 text-gray-800 transition-all duration-300 hover:border-gray-400"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors duration-200 rounded-full hover:bg-gray-100 p-1.5"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>
              )}
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {!isLogin && (
              <div className="flex items-center gap-2">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-gray-800 focus:ring-gray-600 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <span className="text-gray-800 hover:text-gray-900 cursor-pointer">
                    Terms
                  </span>{" "}
                  and{" "}
                  <span className="text-gray-800 hover:text-gray-900 cursor-pointer">
                    Privacy Policy
                  </span>
                </label>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gray-800 text-white rounded-md font-medium relative overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <span className="relative z-10 group-hover:scale-105 inline-block transition-transform duration-200">
                {isLogin ? "Sign In" : "Sign Up"}
              </span>
              <div className="absolute inset-0 bg-gray-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>

            <div className="text-center text-sm">
              <span className="text-gray-600">
                {isLogin ? "New here? " : "Already registered? "}
              </span>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-gray-800 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                {isLogin ? "Create an account" : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;