import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  clearCart,
  updateQuantity,
} from "../features/cart/cartSlice";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { FiArrowUpRight } from "react-icons/fi";
import Breadcrumbs from "../components/Breadcrumbs";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Navigate to shop page when cart is empty
  const handleEmpty = () => {
    setTimeout(() => {
      navigate("/shop");
    }, 1000);
  };

  // Navigate to checkout page if cart has items
  const handleCheckout = () => {
    if (items.length > 0) {
      setLoading(true);
      setTimeout(() => {
        navigate("/checkout");
        setLoading(false);
      }, 1300);
    } else {
      alert("No Items found..");
    }
  };

  // Handle quantity increase or decrease
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 0) {
      // Dispatch updateQuantity action with item id and new quantity
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  // Show loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-100"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-[70vh]">
      <Breadcrumbs />
      <div className="relative flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="w-full lg:w-2/3">
          <div className="flex items-center justify-between border-b pb-4 mb-6">
            <h1 className="text-2xl font-semibold text-zinc-800">Your Cart</h1>
            {items.length > 0 && (
              <button
                onClick={() => dispatch(clearCart())}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
              >
                Clear Cart
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-5 mt-24">
              <TiShoppingCart className="text-6xl text-zinc-400" />
              <p className="text-zinc-600 text-lg">Your cart is empty.</p>
              <button
                onClick={handleEmpty}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 gap-3 sm:gap-6"
                >
                  {/* Top Row: Image + Name + Price */}
                  <div className="flex items-center justify-between w-full gap-3">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-md border border-zinc-200"
                      />
                      <div className="flex flex-col">
                        <h2 className="text-base sm:text-lg font-semibold text-zinc-800 max-w-[160px] sm:max-w-none break-words">
                          {item.name}
                        </h2>
                        <p className="text-zinc-800 font-bold sm:hidden">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Price (Desktop Only) */}
                    <div className="hidden sm:block text-right">
                      <p className="text-zinc-800 text-lg font-bold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Row: Quantity Controls + Delete Button */}
                  <div className="flex items-center justify-between sm:justify-start gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-zinc-800 font-bold rounded transition"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        -
                      </button>
                      <span className="min-w-[24px] text-center text-zinc-600 font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-zinc-800 font-bold rounded transition"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 hover:text-red-700 transition"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/3">
          <div className="md:sticky md:top-7 bg-white p-5 sm:p-6 rounded-lg shadow-md space-y-5 w-full max-w-md mx-auto">
            <h2 className="text-lg sm:text-xl font-semibold text-zinc-800 border-b pb-3">
              Order Summary
            </h2>

            {/* Subtotal Row */}
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-zinc-600">Subtotal</span>
              <span className="text-zinc-800 font-medium">
                ₹
                {items
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>

            {/* Discount Row */}
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-zinc-600">Discount</span>
              <span className="text-zinc-800 font-medium">0%</span>
            </div>

            {/* Divider */}
            <div className="border-t border-zinc-200 pt-3 flex justify-between text-base sm:text-lg font-semibold text-zinc-800">
              <span>Total</span>
              <span>
                ₹
                {items
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>

            {/* Checkout Button */}
            <div className="flex flex-col items-center justify-center gap-3">
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold py-3 rounded-md transition duration-300"
                aria-label="Proceed to checkout"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={handleEmpty}
                className="w-full group flex items-center justify-center gap-1 text-blue-700 border border-blue-600 text-sm sm:text-base font-semibold py-3 rounded-md transition duration-500"
                aria-label="Continue Shopping"
              >
                Continue Shopping
                <FiArrowUpRight className="text-blue-700 opacity-0 group-hover:opacity-100 text-xl -translate-x-10 group-hover:translate-x-0 transition duration-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
