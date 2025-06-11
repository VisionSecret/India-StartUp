import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaShoppingCart, FaRegUser, FaFireAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import Headerbar from "./Headerbar";
import { Link } from "react-router-dom";
import HeaderBottom from "./HeaderBottom";
import HeaderTop from "./HeaderTop";
import CartSidebar from "./CartSidebar";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const items = useSelector((state) => state.cart.items);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 84) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleItemClick = (item) => {
    setActiveItem(item);
    if (item !== "All") setIsSidebarOpen(false);
  };

  const toggleCartSidebar = () => {
    setIsCartOpen(!isCartOpen);
    handleItemClick("Cart");
    document.body.style.overflow = !isCartOpen ? "hidden" : "auto";
  };

  return (
    <div className="w-full pt-3 bg-white shadow-md border-b border-gray-200">
      {/* <HeaderTop /> */}

      <div className="flex items-center justify-between h-20 px-4 sm:px-10">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="/images/BagBasket-logo.webp"
            alt="Logo"
            className="h-16 w-16 md:h-14 md:w-14 rounded-full object-cover border-2 border-blue-500 p-1"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex-1 flex justify-end">
          <ul className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Menu */}
            <li className="md:hidden">
              <button
                onClick={toggleSidebar}
                className={`p-2 rounded-lg ${
                  isSidebarOpen ? "bg-blue-100" : "hover:bg-blue-100/70"
                } transition-colors`}
              >
                {isSidebarOpen ? (
                  <FiX className="h-6 w-6 text-blue-700" />
                ) : (
                  <FiMenu className="h-6 w-6 text-blue-700" />
                )}
              </button>
            </li>

            {/* All */}
            <li className="hidden md:block">
              <button
                onClick={() => {
                  toggleSidebar();
                  handleItemClick("All");
                }}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeItem === "All" ? "bg-blue-100" : "hover:bg-gray-100"
                } transition-colors`}
              >
                <FiMenu className="mr-2 text-blue-700" />
                <span className="text-gray-800 font-medium">All</span>
              </button>
            </li>

            {/* Deals */}
            <li>
              <Link
                to="/shop"
                onClick={() => handleItemClick("Deals")}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeItem === "Deals" ? "bg-blue-100" : "hover:bg-gray-100"
                } transition-colors`}
              >
                <FaFireAlt className="text-red-500 mr-2" />
                <span className="text-gray-800 font-medium">Deals</span>
              </Link>
            </li>

            {/* Cart */}
            <li className="hidden md:block">
              <Link
                onClick={() => handleItemClick("Cart")}
                to="/cart"
                className={`flex items-center p-2 rounded-lg ${
                  activeItem === "Cart" ? "bg-blue-100" : "hover:bg-gray-100"
                } transition-colors`}
              >
                <FaShoppingCart className="text-blue-700 h-6 w-6" />
                <span className="hidden md:inline ml-2 text-gray-800 font-medium">
                  Cart
                </span>
              </Link>
            </li>

            {/* Login */}
            <li>
              <Link
                to="/login"
                onClick={() => handleItemClick("Account")}
                className={`flex items-center p-2 rounded-lg ${
                  activeItem === "Account" ? "bg-blue-100" : "hover:bg-gray-100"
                } transition-colors`}
              >
                <FaRegUser className="text-blue-700 h-6 w-6" />
                <span className="hidden md:inline ml-2 text-gray-800 font-medium">
                  Login
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className={`relative ${isSticky ? "md:relative" : ""}`}>
        <HeaderBottom isSticky={isSticky} />
      </div>

      {isSidebarOpen && <Headerbar onClose={toggleSidebar} />}
      <CartSidebar isOpen={isCartOpen} onClose={toggleCartSidebar} />
    </div>
  );
};

export default Header;
