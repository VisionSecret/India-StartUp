import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AiOutlineHome,
  AiOutlineAppstore,
  AiOutlineUnorderedList,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const MobileNavigationBar = () => {
  const location = useLocation();
  const cartCount = useSelector((state) => state.cart.items.length);

  // Only show on mobile
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 shadow-lg md:hidden">
      <div className="flex justify-between items-center px-2 py-1 relative">
        {/* Home */}
        <Link to="/" className="flex flex-col items-center flex-1 py-2">
          <AiOutlineHome
            size={30}
            color={location.pathname === "/" ? "#2563eb" : "#6b7280"}
          />
          <span
            className={`text-xs mt-1 ${
              location.pathname === "/"
                ? "text-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Home
          </span>
        </Link>
        {/* Shop (with HOT sticker) */}
        <Link
          to="/shop"
          className="flex flex-col items-center flex-1 py-2 relative"
        >
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 z-10">
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
              HOT
            </span>
          </span>
          <AiOutlineAppstore
            size={30}
            color={
              location.pathname.startsWith("/shop") ? "#2563eb" : "#6b7280"
            }
          />
          <span
            className={`text-xs mt-1 ${
              location.pathname.startsWith("/shop")
                ? "text-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Shop
          </span>
        </Link>
        {/* Categories */}
        <Link
          to="/categories"
          className="flex flex-col items-center flex-1 py-2"
        >
          <AiOutlineAppstore
            size={30}
            color={
              location.pathname.startsWith("/categories")
                ? "#2563eb"
                : "#6b7280"
            }
          />
          <span
            className={`text-xs mt-1 ${
              location.pathname.startsWith("/categories")
                ? "text-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Categories
          </span>
        </Link>

        {/* Floating Cart Button */}
        {location.pathname !== "/cart" && (
          <Link
            to="/cart"
            className="absolute bottom-28 right-4 bg-green-600 rounded-full shadow-lg flex items-center px-4 py-2 gap-2 min-w-[48px]"
          >
            <AiOutlineShoppingCart size={28} color="#fff" />
            <span className="text-white font-semibold text-base">
              {cartCount} Products
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default MobileNavigationBar;
