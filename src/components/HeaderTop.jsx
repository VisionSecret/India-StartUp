import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaShippingFast,
  FaHeadset,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const HeaderTop = () => {
  return (
    <div className="bg-blue-600 text-gray-100 text-sm border-b border-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center md:justify-between items-center py-2">

          {/* LEFT — Social Icons (Always Visible) */}
          <div className="flex items-center justify-center space-x-3">
            <a href="#" className="hover:text-white" aria-label="Facebook">
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-white" aria-label="Twitter">
              <FaTwitter className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-white" aria-label="Instagram">
              <FaInstagram className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-white" aria-label="YouTube">
              <FaYoutube className="w-4 h-4" />
            </a>
          </div>

          {/* RIGHT — Contact Info (Only on md+) */}
          <div className="hidden md:flex items-center space-x-6 text-xs">
            <a href="tel:+1234567890" className="flex items-center gap-1 hover:text-white">
              <FaPhoneAlt className="w-3 h-3" />
              <span>+92 300 1234567</span>
            </a>
            <a href="mailto:info@example.com" className="flex items-center gap-1 hover:text-white">
              <FaEnvelope className="w-3 h-3" />
              <span>info@bagbasket.com</span>
            </a>
            <Link to="/returnspolicy" className="flex items-center gap-1 hover:text-white">
              <FaShippingFast className="w-3 h-3" />
              <span>Returns & Orders</span>
            </Link>
            <div className="flex items-center gap-1 hover:text-white">
              <FaHeadset className="w-3 h-3" />
              <span>24/7 Support</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
