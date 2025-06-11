import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const productCategories = [
  {
    name: "Groceries",
    url: "https://dummyjson.com/products/category/groceries",
    brand: "groceries",
  },
  {
    name: "Kitchen Accessories",
    url: "https://dummyjson.com/products/category/kitchen-accessories",
    brand: "kitchen-accessories",
  },
  {
    name: "Sports Accessories",
    url: "https://dummyjson.com/products/category/sports-accessories",
    brand: "sports-accessories",
  },
];

const useCategoryData = (url) => {
  const [data, setData] = useState({ products: [], total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(url);
        setData({ products: data.products.slice(0, 4), total: data.total });
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching ${url}:`, err.message);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading };
};

const CategoryCard = ({ cat }) => {
  const { data, loading } = useCategoryData(cat.url);

  return (
    <Link
      to={`/category/${cat.brand}`}
      className="group transition-all duration-300 hover:-translate-y-1"
    >
      <div className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col justify-between h-full">
        <div className="grid grid-cols-2 gap-1 p-1 sm:gap-2 sm:p-3 relative">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 animate-pulse h-16 sm:h-24 md:h-28 w-full rounded-md"
                />
              ))
            : data.products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-gray-100 h-16 sm:h-24 md:h-28 w-full rounded-md overflow-hidden"
                >
                  <img
                    src={prod.thumbnail}
                    alt={prod.title}
                    className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}

          {!loading && data.total > 4 && (
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 min-w-[60px] sm:min-w-[72px] h-[1.40rem] sm:h-7 px-2 sm:px-3 
  bg-white text-blue-700 text-[10px] sm:text-sm font-medium rounded-full 
  flex items-center justify-center gap-1 shadow-md ring-1 ring-blue-300 z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h4v4H4V6zm6 0h4v4h-4V6zm6 0h4v4h-4V6zM4 12h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 18h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"
                />
              </svg>
              <span className="whitespace-nowrap">+{data.total - 4} more</span>
            </div>
          )}
        </div>

        <div className="py-2 sm:py-3 px-1 text-center">
          <h3 className="text-[10px] sm:text-sm md:text-base font-semibold text-gray-800 truncate">
            {cat.name}
          </h3>
        </div>
      </div>
    </Link>
  );
};

const CategoryGrid = () => {
  return (
    <section className="px-2 sm:px-6 pt-2 pb-10 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6 sm:mb-10">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Popular Collections
          </h2>
          <p className="text-gray-600 font-medium mt-1 sm:mt-2">
            Explore our curated product categories
          </p>
        </div>
        <Link
          to="/categories"
          className="text-sm sm:text-base font-medium text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
        >
          View all categories
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {productCategories.map((cat, index) => (
          <CategoryCard key={index} cat={cat} />
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
