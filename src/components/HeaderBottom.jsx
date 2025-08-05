import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import CartSidebar from "./CartSidebar";
import { getCategoriesData, getProductsByCategory } from "../api/Categories";
import { getProductByQuery } from "../api/Products";
import { IoSearchSharp, IoChevronDown } from "react-icons/io5";
import { useSelector } from "react-redux";

const HeaderBottom = ({ isSticky }) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchProduct, setSearchProduct] = useState([]); // Categories
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [showMobileCat, setShowMobileCat] = useState(false);
  const [showDesktopCat, setShowDesktopCat] = useState(false);
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);

  // Functions
  const handleInputFocus = () => setInputFocus(true);
  const handleInputBlur = () => setTimeout(() => setInputFocus(false), 200);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.style.overflow = isSidebarOpen ? "auto" : "hidden";
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategoriesData();
      setSearchProduct(data);
    };
    fetchCategories();
  }, []);

  // Fetch products (without debouncing)
  const fetchProducts = async (query, category) => {
    try {
      setIsLoading(true);

      const products = category
        ? await getProductsByCategory(category)
        : await getProductByQuery(query);

      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredProducts(filtered);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    const isClick = e.type === "click";
    if (query || isClick) {
      setInputFocus(true);
    }
    setSearchQuery(query);
    if (query.trim() || selectedCategory) {
      fetchProducts(query, selectedCategory);
    } else {
      setFilteredProducts([]);
    }
  };

  // Handle search submission
  const handleSearchBtn = async (e) => {
    const isEnterKey = e.key === "Enter";
    const isClick = e.type === "click";

    if (isEnterKey || isClick) {
      const trimmedQuery = searchQuery.trim();
      if (trimmedQuery) {
        navigate(`/products/${trimmedQuery}`);
      } else {
        navigate("/shop");
      }
      // setSearchQuery("");
      setFilteredProducts([]);
      setInputFocus(false);
    }
  };

  const productsData = filteredProducts.slice(0, 4);

  return (
    <>
      <header
        className={`z-50 bg-white shadow-md border-b border-gray-200 transition-all duration-1000 ${
          isSticky && "fixed top-0 left-0 w-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-2 h-16 md:h-20 flex items-center justify-between gap-2 md:gap-4">
          {/* Location Info */}
          <div className="hidden lg:flex items-center gap-2 group">
            <FaLocationDot className="text-blue-600 text-2xl w-10 h-10 p-2 bg-gray-100 rounded-full transition-transform group-hover:scale-125" />
            <div className="text-sm">
              <p className="text-gray-500 font-medium">Deliver to</p>
              <p className="font-semibold text-gray-800">India</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-sm sm:max-w-md md:max-w-2xl relative">
            <div
              className={`flex items-center rounded-l-sm rounded-r-xl md:rounded-lg transition-all duration-300 ${
                inputFocus
                  ? "bg-white ring-2 ring-blue-500 shadow-lg"
                  : "bg-gray-200"
              }`}
            >
              {/* Mobile Category Toggle Button */}
              <div className="md:hidden px-2 relative">
                <button
                  onClick={() => setShowMobileCat((prev) => !prev)}
                  className="flex items-center gap-1 text-xs text-gray-700 font-medium max-w-[100px] truncate"
                >
                  <span className="truncate inline-block max-w-[70px]">
                    {selectedCategory
                      ? searchProduct.find((c) => c.slug === selectedCategory)
                          ?.name
                      : ""}
                  </span>
                  <IoChevronDown className="text-lg shrink-0" />
                </button>

                {/* Dropdown for mobile */}
                {showMobileCat && (
                  <div className="absolute z-50 mt-2 bg-white shadow-md rounded-md w-40 max-h-60 overflow-y-auto">
                    <button
                      className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                      onClick={() => {
                        setSelectedCategory("");
                        setShowMobileCat(false);
                      }}
                    >
                      All Categories
                    </button>
                    {searchProduct.map((category) => (
                      <button
                        key={category.slug}
                        onClick={() => {
                          setSelectedCategory(category.slug);
                          setShowMobileCat(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop Category Selector */}
              <div className="hidden md:block relative w-48">
                <button
                  onClick={() => setShowDesktopCat((prev) => !prev)}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 shadow-md text-gray-800 text-sm flex justify-between items-center"
                >
                  <span>
                    {selectedCategory
                      ? searchProduct.find((c) => c.slug === selectedCategory)
                          ?.name
                      : "All Categories"}
                  </span>
                  <IoChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {showDesktopCat && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-white shadow-md rounded-md max-h-60 overflow-y-auto z-50 border">
                    <button
                      className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                      onClick={() => {
                        setSelectedCategory("");
                        setShowDesktopCat(false);
                      }}
                    >
                      All Categories
                    </button>
                    {searchProduct.map((category) => (
                      <button
                        key={category.slug}
                        onClick={() => {
                          setSelectedCategory(category.slug);
                          setShowDesktopCat(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Input */}
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onKeyDown={handleSearchBtn}
                  className="w-full h-10 md:h-12 px-3 md:px-4 bg-transparent placeholder:font-medium placeholder:text-sm md:placeholder:text-lg text-gray-800 placeholder-gray-400 focus:outline-none"
                  placeholder="Search 10000+ Products"
                />

                {/* Suggestions Dropdown */}
                {inputFocus && (
                  <div className="absolute top-full left-0 right-0 bg-white rounded-b-xl shadow-2xl z-50 max-h-80 overflow-y-auto border-t border-gray-100">
                    {isLoading ? (
                      <div className="p-4 text-center text-gray-500 flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-blue-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Loading...
                      </div>
                    ) : productsData.length > 0 ? (
                      productsData.map((product) => (
                        <Link
                          key={product.id}
                          to={`/products/${product.title}`}
                          className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border-b last:border-0"
                          onClick={() => setInputFocus(false)}
                        >
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <span className="text-gray-800 text-sm truncate">
                            {product.title}
                          </span>
                          <IoSearchSharp className="text-gray-400 ml-auto shrink-0" />
                        </Link>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        No results found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearchBtn}
                className="h-10 md:h-12 px-3 md:px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-r-lg text-white"
              >
                <IoSearchSharp className="text-xl md:text-2xl" />
              </button>
            </div>
          </div>

          {/* Right Buttons (unchanged, looks good) */}
          <div className="flex items-center gap-2 md:gap-4">
            <a
              href="tel:+923001234567"
              className="relative hidden sm:flex items-center gap-1 md:gap-2 bg-green-500 hover:bg-green-600 text-white rounded-lg px-2 md:px-4 py-2 md:py-2.5 transition-all group"
            >
              <FaPhoneAlt className="text-sm md:text-lg" />
              <span className="hidden md:inline text-sm font-medium">
                +923001234567
              </span>
              <span className="absolute hidden md:group-hover:block -top-7 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2">
                WhatsApp
              </span>
            </a>

            <button
              onClick={toggleSidebar}
              className="relative bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-2 md:px-4 py-2 md:py-2.5 transition-all"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {items.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Cart Sidebar with Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>
      <CartSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
};

export default HeaderBottom;
