import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShopSidebar from "../components/ShopSidebar";
import { getProductData } from "../api/Products";
import { getCategoriesData, getProductsByCategory } from "../api/Categories";
import { FiStar, FiShoppingCart, FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { FiPackage } from "react-icons/fi";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    categories: [],
    minPrice: null,
    maxPrice: null,
  });

  const dispatch = useDispatch();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const data = await getCategoriesData();
      setCategories(data);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);

      // No categories selected — fetch all products
      if (appliedFilters.categories.length === 0) {
        const data = await getProductData();
        setProducts(data);
        setLoading(false);
        return;
      }

      const allProducts = [];

      for (const category of appliedFilters.categories) {
        const data = await getProductsByCategory(category);
        if (data) {
          allProducts.push(...data);
        }
      }

      // Deduplicate by product ID
      const seenIds = {};
      const uniqueProducts = [];

      for (const product of allProducts) {
        if (!seenIds[product.id]) {
          seenIds[product.id] = true;
          uniqueProducts.push(product);
        }
      }

      setProducts(uniqueProducts);
      setLoading(false);
    };

    fetchCategoryProducts();
  }, [appliedFilters]);

  // Add to cart handler
  const handleAddToCart = (product) => {
    setCartLoading((prev) => ({ ...prev, [product.id]: true }));
    dispatch(addToCart(product));
    notify();
    setTimeout(() => {
      setCartLoading((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  // Toast notification
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

  const filteredProducts = products.filter((product) => {
    const meetsMin =
      appliedFilters.minPrice == null ||
      product.price >= appliedFilters.minPrice;
    const meetsMax =
      appliedFilters.maxPrice == null ||
      product.price <= appliedFilters.maxPrice;
    return meetsMin && meetsMax;
  });

  // Loading spinner
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
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex">
        {/* Sidebar - Fixed on Desktop, Slide-in on Mobile */}
        <div
          className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 z-30 lg:static lg:transform-none lg:w-80 lg:shadow-none ${
            showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <ShopSidebar
            categories={categories}
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            onApplyFilters={(filters) => {
              setAppliedFilters({
                categories: filters.categories,
                // brands: filters.brands,
                minPrice: filters.minPrice || null,
                maxPrice: filters.maxPrice || null,
              });
            }}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumbs */}
            <Breadcrumbs />
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowSidebar(true)}
              className="lg:hidden w-full px-4 py-2.5 mb-4 bg-white text-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <div className="flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">Filters</span>
              </div>
            </button>

            {/* Product Grid */}
            <main className="w-full">
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600">
                  <FiPackage className="text-6xl sm:text-7xl text-blue-500 mb-6" />
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    No products found
                  </h2>
                  <p className="text-gray-500 text-sm sm:text-base max-w-md">
                    Try changing your filters or explore other categories. We
                    couldn’t find anything that matched your search.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white text-gray-900 rounded-2xl shadow-lg overflow-hidden p-1 md:p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 md:hover:scale-105"
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
                              <span className="hidden sm:inline">
                                Adding...
                              </span>
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
              )}
            </main>
          </div>
        </div>
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

export default Shop;
