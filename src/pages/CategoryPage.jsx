import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProductsByCategory } from "../api/Categories";
import Breadcrumbs from "../components/Breadcrumbs";

const CategoryPage = () => {
  const { categoryId } = useParams(); // Get category from URL params
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState({});
  const dispatch = useDispatch();

  // Fetch products when categoryName changes
  useEffect(() => {
    const fetchedProducts = async () => {
      setLoading(true);
      if (categoryId) {
        const data = await getProductsByCategory(categoryId);
        setProducts(data);
        setLoading(false);
      }
    };

    fetchedProducts();
  }, [categoryId]); // Add categoryId as dependency

  const handleAddToCart = (product) => {
    setCartLoading((prevState) => ({ ...prevState, [product.id]: true }));
    dispatch(addToCart(product));
    notify();

    setTimeout(() => {
      setCartLoading((prevState) => ({ ...prevState, [product.id]: false }));
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs />
      <div className="text-center mb-12">
        <h1 className="text-sm sm:text-xl font-bold text-gray-900 text-center mb-3">
          Exploring Category:{" "}
          <span className="text-lg sm:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {categoryId}
          </span>
        </h1>
        <p className="text-gray-600 text-sm md:text-lg">
          {products.length} premium products found
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-t-xl aspect-square">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {product.discountPercentage > 12 && (
                <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs sm:text-sm font-bold">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="p-3 sm:p-4">
              <Link to={`/product-details/${product.id}`}>
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <h2 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                    {product.title}
                  </h2>
                  <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {product.brand}
                  </span>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="space-y-1">
                    <span className="text-base sm:text-lg font-bold text-blue-600">
                      ₹{product.price}
                    </span>
                    {product.discountPercentage && (
                      <span className="text-xs sm:text-sm text-gray-400 line-through block">
                        ₹
                        {(
                          product.price /
                          (1 - product.discountPercentage / 100)
                        ).toFixed(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          i < Math.round(product.rating) ? "fill-current" : ""
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
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
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
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
  );
};

export default CategoryPage;
