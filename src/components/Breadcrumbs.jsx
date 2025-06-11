import { Link, useLocation } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { MdKeyboardArrowRight } from "react-icons/md";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const Breadcrumbs = ({
  productCategory,
  productTitle,
  onCategoryClick, // optional click handler for category span
}) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // If productCategory is passed, render custom breadcrumbs for product pages
  if (productCategory && productTitle) {
    return (
      <div className="flex items-center gap-1 text-sm text-gray-600 px-6 pt-6 sm:pt-3 md:pt-0 mb-7 md:mb-10 flex-wrap">
        <Link
          to="/"
          className="flex items-center gap-1 hover:text-black transition"
        >
          <HiHome className="text-lg" />
          <span className="hidden sm:inline">Home</span>
        </Link>

        <MdKeyboardArrowRight className="text-xl text-gray-400" />

        <span
          onClick={onCategoryClick}
          className="cursor-pointer hover:text-black"
        >
          {capitalize(productCategory)}
        </span>

        <MdKeyboardArrowRight className="text-xl text-gray-400" />

        <span className="text-gray-900 font-medium text-xs sm:text-sm">
          {productTitle}
        </span>
      </div>
    );
  }

  // Otherwise, fallback to auto path-based breadcrumbs
  return (
    <div className="flex items-center gap-1 text-sm text-gray-600 px-4 sm:px-0 sm:pt-0 mb-7 sm:mb-8 flex-wrap">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-black transition"
      >
        <HiHome className="text-base sm:text-lg" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {pathnames.map((segment, index) => {
        const path = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={index} className="flex items-center gap-1">
            <MdKeyboardArrowRight className="text-lg sm:text-xl text-gray-400" />
            {isLast ? (
              <span className="text-gray-500">
                {decodeURIComponent(capitalize(segment))}
              </span>
            ) : (
              <Link
                to={path}
                className="hover:text-black transition text-gray-600"
              >
                {decodeURIComponent(capitalize(segment))}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
