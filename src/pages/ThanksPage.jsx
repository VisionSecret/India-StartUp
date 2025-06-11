import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaShoppingBag,
  FaTruck,
  FaShareAlt,
} from "react-icons/fa";
import Breadcrumbs from "../components/Breadcrumbs";

const ThanksPage = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [shopLoading, setShopLoading] = useState(false);

  const handleShoping = () => {
    setShopLoading(true);
    setTimeout(() => {
      setShopLoading(false);
      navigate("/shop");
    }, 1300);
  };

  if (shopLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col justify-center items-center px-4 py-10">
      <div className="bg-white max-w-xl w-full shadow-xl rounded-lg p-8 text-center">
        <Breadcrumbs />
        <FaCheckCircle className="mx-auto text-green-500 text-6xl animate-bounce" />
        <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-800">
          Thank You for Your Order!
        </h2>
        <p className="mt-2 text-gray-600 text-sm md:text-base">
          We’ve received your order and are processing it. You’ll get updates
          via email soon.
        </p>

        <div className="mt-6 bg-white border rounded-lg shadow-sm p-4 sm:p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            🧾 Order Summary
          </h3>

          {/* Order Info */}
          <div className="text-sm text-gray-500 space-y-1 mb-4">
            <p>
              <span className="font-medium text-gray-700">Order ID:</span>{" "}
              <strong>#12345</strong>
            </p>
            <p>
              <span className="font-medium text-gray-700">
                Estimated Delivery:
              </span>{" "}
              <strong>3–5 business days</strong>
            </p>
          </div>

          {/* Product Image Gallery */}
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 gap-3 mt-6">
            {cart.items.length > 0 ? (
              cart.items.map((item) => (
                <div key={item.id} className="relative group">
                  <img
                    src={item.image || "https://via.placeholder.com/100"}
                    alt={item.name}
                    className="w-full h-fit sm:h-24 md:h-24 object-cover rounded-md border"
                  />
                  <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5 text-[7px] md:text-sm">
                    x{item.quantity}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 italic col-span-full text-center">
                No items found.
              </p>
            )}
          </div>

          {/* Total Section */}
          <div className="mt-6 border-t pt-4 flex justify-between text-lg font-semibold text-gray-900">
            <span>Total</span>
            <span>${cart.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={handleShoping}
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 w-full md:w-auto"
          >
            <FaShoppingBag />
            Continue Shopping
          </button>
          <button
            className="flex items-center justify-center gap-2 text-gray-600 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 py-2 px-4 rounded-md w-full md:w-auto transition duration-300"
            onClick={() => alert("Sharing not implemented.")}
          >
            <FaShareAlt />
            Share Order
          </button>
        </div>

        <div className="mt-4 flex justify-center items-center gap-2 text-gray-400 text-sm">
          <FaTruck />
          Track your order from your account
        </div>
      </div>
    </div>
  );
};

export default ThanksPage;
