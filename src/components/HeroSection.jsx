import React, { useEffect, useState } from "react";
import { addToCart } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import { FiStar, FiShoppingCart, FiArrowRight } from "react-icons/fi";
import CategoryGrid from "./CategoryGrid";
import { getProductsByCategory } from "../api/Categories";
import { FaRegStar } from "react-icons/fa";

const HeroSection = () => {
  const dispatch = useDispatch();
  const [cartLoading, setCartLoading] = useState({});
  const [loading, setLoading] = useState(true);
  const [kitchenAccessories, setKitchenAccessories] = useState([]);
  const [mobileAccessories, setMobileAccessories] = useState([]);
  const [womenDresses, setWomenDresses] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      const kitchen = await getProductsByCategory("kitchen-accessories");
      setKitchenAccessories(kitchen);

      const mobile = await getProductsByCategory("mobile-accessories");
      setMobileAccessories(mobile);

      const dresses = await getProductsByCategory("womens-dresses");
      setWomenDresses(dresses);

      setLoading(false);
    };

    fetchAll();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleAddToCart = (product) => {
    setCartLoading((prevState) => ({
      ...prevState,
      [product.id]: true,
    }));
    dispatch(addToCart(product));
    notify();

    setTimeout(() => {
      setCartLoading((prevState) => ({
        ...prevState,
        [product.id]: false,
      }));
    }, 2000);
  };

  const notify = () =>
    toast.success("✅ Item successfully added to your cart!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: false,
    });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] bg-gradient-to-tr from-blue-50 via-white to-blue-100 text-gray-700 overflow-hidden">
        {/* Sparkle Icon */}
        <div className="relative mb-6">
          <div className="text-blue-600 animate-ping-slow absolute top-0 left-0">
            <FaRegStar className="text-5xl opacity-30" />
          </div>
          <FaRegStar className="text-6xl text-blue-500 animate-bounce drop-shadow" />
        </div>

        {/* Welcome Text */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Welcome to Your Favorite Marketplace
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-4 text-center">
          Preparing your personalized experience...
        </p>

        {/* Animated dots */}
        <div className="flex space-x-2 mt-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
          <span className="w-3 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
        </div>
      </div>
    );
  }

  const renderProductCard = (product) => (
    <React.Fragment key={product.id}>
      {/* Desktop Card */}
      <div
        className="hidden sm:block bg-white rounded-xl sm:rounded-2xl shadow-xs sm:shadow-sm hover:shadow-md transition-shadow duration-300"
        role="article"
        aria-labelledby={`product-title-${product.id}`}
      >
        <div className="relative overflow-hidden rounded-t-xl sm:rounded-t-2xl aspect-square">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-contain object-center"
          />
          {product.discountPercentage > 15 && (
            <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs sm:text-sm font-bold">
              {Math.round(product.discountPercentage)}% OFF
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-3 sm:p-4">
          <Link to={`/product-details/${product.id}`}>
            <div className="flex flex-col gap-1 mb-2">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                {product.title}
              </h3>
              <span className="text-sm text-gray-500">{product.brand}</span>
            </div>

            <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4 leading-tight">
              {product.description}
            </p>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-base sm:text-lg font-bold text-blue-600">
                    ₹{product.price}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-400 line-through">
                    ₹
                    {(
                      product.price /
                      (1 - product.discountPercentage / 100)
                    ).toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <button
            onClick={() => handleAddToCart(product)}
            className="w-full flex items-center justify-center gap-1 sm:gap-2 
                                    bg-gradient-to-r from-blue-500 to-indigo-600 
                                    text-white rounded-lg font-medium 
                                    text-xs sm:text-sm 
                                    py-2 sm:py-3
                                    hover:opacity-90 transition-opacity"
            disabled={cartLoading[product.id]}
          >
            {cartLoading[product.id] ? (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="hidden sm:inline">Adding...</span>
              </div>
            ) : (
              <>
                <FiShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Card */}
      <div className="block sm:hidden mt-6">
        <Link
          to={`/product-details/${product.id}`}
          className="flex flex-col items-center gap-3 rounded-2xl overflow-hidden p-2"
        >
          {/* Product Image */}
          <div className="w-full aspect-square rounded-lg overflow-hidden bg-[#ffffff] relative">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover object-center"
            />
            {product.discountPercentage > 15 && (
              <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-[10px] font-semibold">
                {Math.round(product.discountPercentage)}% OFF
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="text-lg font-bold text-zinc-800 text-center line-clamp-2 tracking-tighter leading-tight">
            {product.title}
          </h3>
        </Link>
      </div>
    </React.Fragment>
  );

  return (
    <>
      <div className="hero relative bg-blue-50">
        <div className="px-4 sm:px-6 py-10">
          <CategoryGrid />

          {/* Kitchen Accessories Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1 bg-zinc-500 rounded-full"></div>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Kitchen Accessories
              </h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {kitchenAccessories.slice(0, 12).map((product) => (
                <React.Fragment key={product.id}>
                  {renderProductCard(product)}
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* Mobile Accessories Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1 bg-zinc-500 rounded-full"></div>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Mobile Accessories
              </h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {mobileAccessories.slice(0, 8).map((product) => (
                <React.Fragment key={product.id}>
                  {renderProductCard(product)}
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* Women's Dresses Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1 bg-zinc-500 rounded-full"></div>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Women’s Dresses
              </h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {womenDresses.slice(0, 4).map((product) => (
                <React.Fragment key={product.id}>
                  {renderProductCard(product)}
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* View All Button */}
          <div className="mt-16 flex justify-center">
            <Link to={"/shop"}>
              <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:gap-3">
                View All Products
                <IoMdArrowDropdown className="w-5 h-5 transform group-hover:rotate-180 transition-transform" />
              </button>
            </Link>
          </div>

          <ToastContainer
            position="top-right"
            autoClose={2500}
            limit={3}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastClassName={() =>
              "relative flex items-start gap-2 p-4 rounded-xl shadow-lg bg-blue-50 text-blue-900 border border-blue-200 text-sm sm:text-base font-medium"
            }
            bodyClassName={() => "flex flex-col"}
            progressClassName="!bg-blue-500 rounded-full"
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
