import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiStar, FiShoppingCart, FiArrowRight } from "react-icons/fi";
import { getProductByQuery } from "../api/Products";
import { getProductsByCategory } from "../api/Categories";
import Breadcrumbs from "../components/Breadcrumbs";

const ProductsPage = () => {
  const { productId } = useParams();
  const [searchProducts, setSearchProducts] = useState(null);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [cartLoading, setCartLoading] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await getProductByQuery(productId);
        setSearchProducts(fetchedProducts);
        if (fetchedProducts.length > 0) {
          setCategory(fetchedProducts[0].category);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [productId]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await getProductByQuery(productId);
        setSearchProducts(fetchedProducts);
        if (fetchedProducts.length > 0) {
          setCategory(fetchedProducts[0].category);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [productId]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await getProductByQuery(productId);
        setSearchProducts(fetchedProducts);
        if (fetchedProducts.length > 0) {
          setCategory(fetchedProducts[0].category);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [productId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategory = await getProductsByCategory(category);
        setProducts(fetchedCategory);
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };
    if (category) fetchCategories();
  }, [category]);

  const relatedProducts = products.slice(0, 9);

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
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs />
      <div className="text-center mb-12">
        <h1 className="text-xs sm:text-xl font-bold text-gray-900 text-center mb-8">
          Search Results for{" "}
          <span className="text-sm sm:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text leading-tighter tracking-tighter text-transparent">
            "{productId}"
          </span>
        </h1>
        <p className="text-gray-600 text-sm md:text-lg">
          {products.length} premium products found
        </p>
      </div>

      {searchProducts && searchProducts.length > 0 ? (
        <section className="mb-12 sm:mb-16">
          <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {searchProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-white text-gray-900 rounded-2xl shadow-lg overflow-hidden p-1 md:p-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 md:hover:scale-105"
                role="article"
                aria-labelledby={`product-title-${product.id}`}
              >
                {/* Image Section */}
                <div className="relative overflow-hidden rounded-t-xl sm:rounded-t-2xl aspect-square">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover"
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
                    <div className="flex flex-col gap-1 mb-2">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                        {product.title}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {product.brand ? product.brand : "unknown"}
                      </span>
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
                        <div className="flex items-center gap-1 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                i < Math.round(product.rating)
                                  ? "fill-current"
                                  : ""
                              }`}
                            />
                          ))}
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
            ))}
          </div>
        </section>
      ) : (
        !loading && (
          // Only show this block when not loading and no results
          <div className="text-center py-20">
            <div className="inline-block bg-gray-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                Try searching for something else...
              </p>
              <div className="animate-bounce">
                <FiArrowRight className="w-12 h-12 text-gray-400 mx-auto transform rotate-90" />
              </div>
            </div>
          </div>
        )
      )}

      {products.length > 0 && (
        <section className="mt-12 sm:mt-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8 px-2">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Related Products
            </h2>
            <span className="text-sm sm:text-base text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
              {category}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {relatedProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-white text-gray-900 rounded-2xl shadow-lg overflow-hidden p-1 md:p-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 md:hover:scale-105"
                role="article"
                aria-labelledby={`product-title-${product.id}`}
              >
                {/* Image Section */}
                <div className="relative overflow-hidden rounded-t-xl sm:rounded-t-2xl aspect-square">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover"
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
                    <div className="flex flex-col gap-1 mb-2">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                        {product.title}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {product.brand ? product.brand : "unknown"}
                      </span>
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
                        <div className="flex items-center gap-1 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                i < Math.round(product.rating)
                                  ? "fill-current"
                                  : ""
                              }`}
                            />
                          ))}
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
            ))}
          </div>
        </section>
      )}

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

export default ProductsPage;
