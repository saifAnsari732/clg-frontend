import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BACK } from "./Util";
import "./style.css";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BACK}/user/login`, {
        email: formData.email,
        password: formData.password,
      },{
        withCredentials: true, // Ensure cookies are sent with the request

      });

      // Handle successful login
      toast.success("Login successful!");
      navigate("/profile");
      localStorage.setItem("authToken", response.data.user.token);
      // Redirect to dashboard or home page
    } catch (error) {
      // Handle different error scenarios
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 401) {
          toast.error("Invalid username or password");
        } else if (error.response.status === 500) {
          toast.error("Server error. Please try again later");
        } else {
          toast.error(error.response.data.message || "Login failed");
        }
      } else if (error.request) {
        // Request was made but no response received
        toast.error("Network error. Please check your connection");
      } else {
        // Something else happened
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      <Toaster position="top-center" />
    
      <div className="w-full max-w-md bg-gradient-to-br bg-green-400 from-teal-700 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
        <div className="p-8">
          <h1 className="text-4xl  font-bold text-center text-black mb-8">
            LOGIN
          </h1>

          <form id='log' onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="log"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-gray-700">Remember me</label>
              </div>

              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold text-lg shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  LOGGING IN...
                </>
              ) : (
                "LOGIN"
              )}
            </button>

            <p className="text-center text-gray-600 ">
              <Link to="/AdminLogin" className="text-blue-700 mr-5 text-2xl ">
              
              AdminLogin
              </Link> 
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                REGISTER
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
