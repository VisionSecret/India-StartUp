import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategoriesData } from "../api/Categories";
import {
  FiSmile,
  FiDroplet,
  FiHome,
  FiShoppingBag,
  FiWatch,
  FiSmartphone,
  FiSun,
  FiShoppingCart,
  FiTablet,
  FiStar,
} from "react-icons/fi";
import { IoShirtOutline } from "react-icons/io5";
import { GiAmpleDress } from "react-icons/gi";
import { IoGlasses } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import { BsLaptop } from "react-icons/bs";
import { GiRunningShoe } from "react-icons/gi";
import { PiMotorcycleFill } from "react-icons/pi";
import { CiMobile3 } from "react-icons/ci";
import { MdSportsSoccer } from "react-icons/md";
import { AiOutlineWoman } from "react-icons/ai";
import { PiHandbagSimpleBold } from "react-icons/pi";
import { GiJewelCrown } from "react-icons/gi";
import { BsWatch } from "react-icons/bs";
import { GiBallerinaShoes } from "react-icons/gi";
import Breadcrumbs from "../components/Breadcrumbs";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with your actual data fetching
  useEffect(() => {
    setLoading(true);
    const fetchCategories = async () => {
      const data = await getCategoriesData();
      setCategories(data);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const categoryIcons = {
    beauty: <FiSmile className="w-6 h-6" />,
    fragrances: <FiDroplet className="w-6 h-6" />,
    furniture: <FiHome className="w-6 h-6" />,
    groceries: <FiShoppingBag className="w-6 h-6" />,
    "home-decoration": <FiStar className="w-6 h-6" />,
    "kitchen-accessories": <FaKitchenSet className="w-6 h-6" />,
    laptops: <BsLaptop className="w-6 h-6" />,
    "mens-shirts": <IoShirtOutline className="w-6 h-6" />,
    "mens-shoes": <GiRunningShoe className="w-6 h-6" />,
    "mens-watches": <BsWatch className="w-6 h-6" />,
    "mobile-accessories": <FiSmartphone className="w-6 h-6" />,
    motorcycle: <PiMotorcycleFill className="w-6 h-6" />,
    "skin-care": <FiSun className="w-6 h-6" />,
    smartphones: <CiMobile3 className="w-6 h-6" />,
    "sports-accessories": <MdSportsSoccer className="w-6 h-6" />,
    sunglasses: <IoGlasses className="w-6 h-6" />,
    tablets: <FiTablet className="w-6 h-6" />,
    tops: <AiOutlineWoman className="w-6 h-6" />,
    vehicle: <FaCar className="w-6 h-6" />,
    "womens-bags": <PiHandbagSimpleBold className="w-6 h-6" />,
    "womens-dresses": <GiAmpleDress className="w-6 h-6" />,
    "womens-jewellery": <GiJewelCrown className="w-6 h-6" />,
    "womens-shoes": <GiBallerinaShoes className="w-6 h-6" />,
    "womens-watches": <FiWatch className="w-6 h-6" />,
  };

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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs />

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Product Categories
          </h1>
          <p className="text-gray-600">
            Explore our wide range of premium collections
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <div className="text-blue-600">
                    {categoryIcons[category.slug] || (
                      <FiShoppingCart className="w-6 h-6" />
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Explore {category.name.toLowerCase()} collection
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-blue-600 font-medium">
                <span>View Products</span>
                <svg
                  className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
