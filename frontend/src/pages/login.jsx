import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br relative overflow-hidden">
      {/* Light effect in the background */}
      <div className="absolute w-96 h-96 -top-48 -right-48 bg-orange-100 rounded-full opacity-20"></div>
      <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-orange-50 rounded-full opacity-20"></div>

      <div className="relative max-w-md w-full p-10 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] transform hover:scale-[1.01] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        {/* Subtle gradient overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white via-white/80 to-gray-50/50"></div>
        
        <div className="relative text-center">
          <h2 className="mt-6 text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>

        <form className="mt-8 space-y-6 relative" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-orange-600 hover:text-orange-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-white overflow-hidden transition-all duration-300 
            bg-gradient-to-r from-orange-500 to-orange-600 
            hover:from-orange-600 hover:to-orange-700
            shadow-[0_2px_8px_rgba(251,146,60,0.25)]
            hover:shadow-[0_8px_20px_rgba(251,146,60,0.35)]
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
            transform hover:-translate-y-1 active:translate-y-0
            before:absolute before:w-24 before:h-full before:bg-white/20
            before:-left-12 before:skew-x-[30deg] before:transition-all before:duration-1000
            hover:before:translate-x-[400px]"
          >
            Sign in
          </button>

          <div className="text-center text-sm mt-4">
            <span className="text-gray-600">Don&apos;t have an account? </span>
            <Link to="/signup" className="font-medium text-orange-600 hover:text-orange-500 transition duration-300 ease-in-out">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;