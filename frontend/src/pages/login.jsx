import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:bg-white hover:shadow-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:bg-white hover:shadow-sm"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-orange-600 hover:text-orange-500 transition duration-300 ease-in-out"
              >
                Forgot password?
              </a>
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
        </form>
      </div>
    </div>
  );
};

export default Login;