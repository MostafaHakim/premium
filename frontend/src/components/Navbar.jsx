import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../assets/icon.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50 font-kalpurush">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
                <img className="rounded-xl" src={Icon} alt="Primeum Icon" />
              </div>
              <span className="text-white font-bold text-xl hidden sm:block">
                প্রিমিয়াম মশারি
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-xl">
            <Link
              to="/"
              className="text-white hover:text-yellow-300 font-medium transition-colors duration-300 flex items-center gap-2"
            >
              <span>🏠</span>
              হোম
            </Link>

            <Link
              to="/draw"
              className="text-white hover:text-yellow-300 font-medium transition-colors duration-300 flex items-center gap-2"
            >
              <span>🎲</span>
              ড্র দেখুন
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-4"></div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Cart */}
            <Link to="/cart" className="text-white relative">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-300 focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slideDown">
          <div className="px-4 py-3 space-y-2">
            <Link
              to="/"
              className="block py-3 text-gray-700 hover:text-blue-600 font-medium border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              🏠 হোম
            </Link>
            <Link
              to="/products"
              className="block py-3 text-gray-700 hover:text-blue-600 font-medium border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              🛍️ প্রোডাক্ট
            </Link>
            <Link
              to="/draw"
              className="block py-3 text-gray-700 hover:text-blue-600 font-medium border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              🎲 ড্র
            </Link>
            <Link
              to="/winners"
              className="block py-3 text-gray-700 hover:text-blue-600 font-medium border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              🏆 বিজয়ী
            </Link>
            <Link
              to="/contact"
              className="block py-3 text-gray-700 hover:text-blue-600 font-medium border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              📞 যোগাযোগ
            </Link>
          </div>
        </div>
      )}

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
