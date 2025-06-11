import { useState, useEffect} from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import {
  FiArrowUp,
  FiHelpCircle,
  FiCreditCard,
  FiGlobe,
  FiShoppingBag,
} from "react-icons/fi";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 relative">
      {/* Floating Back to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
      >
        <FiArrowUp className="w-5 h-5" />
      </button>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          {/* Customer Support */}
          <div className="space-y-3">
            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
              <FiHelpCircle className="w-5 h-5 text-blue-400" />
              Customer Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
              <FiGlobe className="w-5 h-5 text-green-400" />
              Our Company
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Payment & Services */}
          <div className="space-y-3">
            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
              <FiCreditCard className="w-5 h-5 text-purple-400" />
              Payment Methods
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
                <FiCreditCard className="w-4 h-4" />
                <span>Credit/Debit Cards</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
                <FiShoppingBag className="w-4 h-4" />
                <span>Wallet Payments</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
                <FiCreditCard className="w-4 h-4" />
                <span>UPI Payments</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
                <FiShoppingBag className="w-4 h-4" />
                <span>Net Banking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Social */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-500 text-center">
              © {new Date().getFullYear()} BagBasket. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
