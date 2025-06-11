import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategoriesData } from "../api/Categories";
import {
  FiHome,
  FiShoppingBag,
  FiFileText,
  FiShoppingCart,
  FiPhoneCall,
  FiX,
  FiTag,
  FiChevronRight,
} from "react-icons/fi";

const Headerbar = ({ onClose }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategoriesData();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-gradient-to-b from-indigo-100 to-purple-50 h-full w-full md:w-[400px] shadow-2xl transform transition-all duration-300">
        <div className="flex flex-col justify-between sm:flex-none h-full p-6">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Explore BagBasket
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-purple-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Main Navigation */}
            <nav className="space-y-4 mb-8">
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all"
              >
                <FiHome className="w-5 h-5 text-indigo-600" />
                <span className="font-semibold text-gray-700">Home</span>
              </Link>
              <Link
                to="/shop"
                onClick={onClose}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all"
              >
                <FiShoppingBag className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-gray-700">Shop</span>
              </Link>
              <Link
                to="/returnspolicy"
                onClick={onClose}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all"
              >
                <FiFileText className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-700">Our Policy</span>
              </Link>
              <Link
                to="/checkout"
                onClick={onClose}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all"
              >
                <FiShoppingCart className="w-5 h-5 text-pink-600" />
                <span className="font-semibold text-gray-700">Checkout</span>
              </Link>
              <Link
                to="/contact"
                onClick={onClose}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all"
              >
                <FiPhoneCall className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-700">Contact</span>
              </Link>
            </nav>

            {/* Today's Deals */}
            <Link to="/shop" onClick={onClose} className="block mb-8">
              <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-4 rounded-xl flex items-center justify-between hover:scale-[1.02] transition-transform">
                <div>
                  <h3 className="font-bold text-lg">Today's Deals</h3>
                  <p className="text-sm opacity-90">Limited time offers</p>
                </div>
                <FiTag className="w-6 h-6" />
              </div>
            </Link>

            {/* Categories */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
              <Link
                to="/categories"
                onClick={onClose}
                className="text-2xl font-semibold flex items-center gap-x-1.5"
              >
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Categories
                </span>
                <FiChevronRight className="text-purple-600 mt-1.5" />
              </Link>
            </div>
          </div>

          {/* <div className="block md:hidden">
            <h1 className="text-lg text-gray-500 font-bold text-center">
              © {new Date().getFullYear()} BagBasket. All rights reserved.
            </h1>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Headerbar;
