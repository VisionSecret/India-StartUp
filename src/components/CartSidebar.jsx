import { useDispatch, useSelector } from "react-redux";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { removeFromCart } from "../features/cart/cartSlice";
import { FiArrowUpRight } from "react-icons/fi";

const CartSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [cartLoading, setCartLoading] = useState(false);

  const handleCartClick = () => {
    setCartLoading(true);
    setTimeout(() => setCartLoading(false), 1300);
  };

  const handleShop = () => navigate("/shop");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest(".cart-sidebar")) onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (cartLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className={`cart-sidebar fixed top-0 right-0 w-full md:w-[26rem] h-screen z-50 bg-white shadow-2xl transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Fixed Header */}
      <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
        <button
          onClick={onClose}
          className="text-3xl text-gray-500 hover:text-red-500 transition"
        >
          &times;
        </button>
      </div>

      {/* Scrollable content */}
      <div className="overflow-y-auto max-h-[calc(100vh-4rem)] p-4">
        {items.length > 0 ? (
          <>
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 object-cover rounded-md"
                  />
                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <h3 className="text-gray-900 font-semibold text-sm md:text-base">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 text-xs md:text-sm">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="text-blue-600 font-bold text-sm md:text-base">
                        ₹{item.price}
                      </p>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-red-500 hover:underline text-xs md:text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total & Actions */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-md text-gray-700 font-medium">
                  Total:
                </span>
                <span className="text-lg font-bold text-gray-900">
                  ₹
                  {items
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    onClose();
                    handleCartClick();
                    setTimeout(() => navigate("/cart"), 700);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold py-3 rounded-md transition duration-300"
                  aria-label="Proceed to checkout"
                >
                  View Cart
                </button>
                <button
                  onClick={() => {
                    onClose();
                    handleCartClick();
                    setTimeout(() => navigate("/shop"), 700);
                  }}
                  className="w-full group flex items-center justify-center gap-1 text-blue-700 border border-blue-600 text-sm sm:text-base font-semibold py-3 rounded-md transition duration-500"
                  aria-label="Continue Shopping"
                >
                  Continue Shopping
                  <FiArrowUpRight className="text-blue-700 opacity-0 group-hover:opacity-100 text-xl -translate-x-10 group-hover:translate-x-0 transition duration-500" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-6 mt-52 text-center">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 text-4xl">
              <TiShoppingCart />
            </div>
            <p className="text-gray-600 text-lg font-medium">
              Your cart is empty.
            </p>
            <button
              onClick={handleShop}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md transition"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
