import { useEffect, useState } from "react";

export default function ShopSidebar({
  categories,
  showSidebar,
  setShowSidebar,
  onApplyFilters,
  selectedCategories,
  setSelectedCategories,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) {
  const [showAllCategories, setShowAllCategories] = useState(false);

  const initialCategoriesToShow = 10;
  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, initialCategoriesToShow);

  const handleCategoryChange = (slug) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const handleClearAll = async () => {
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
    setShowSidebar(false);
    onApplyFilters({
      categories: selectedCategories,
      minPrice,
      maxPrice,
    });
  };

  const handleApply = () => {
    onApplyFilters({
      categories: selectedCategories,
      minPrice,
      maxPrice,
    });
    setShowSidebar(false);
  };

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        <button
          onClick={() => setShowSidebar(false)}
          className="text-gray-500 hover:text-gray-700 lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Clear All */}
      <div className="mb-6">
        <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
          <span className="text-zinc-700 font-medium">Applied Filters</span>
          <button
            onClick={handleClearAll}
            className="text-red-600 font-medium hover:text-red-700"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Product Categories */}
      <div className="mb-8 flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Product Category
        </h3>
        <div className="space-y-2">
          {visibleCategories.map((cat) => (
            <label
              key={cat.slug}
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.slug)}
                onChange={() => handleCategoryChange(cat.slug)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">{cat.name}</span>
            </label>
          ))}
        </div>
        {categories.length > initialCategoriesToShow && (
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="text-blue-600 text-sm mt-4 hover:underline"
          >
            {showAllCategories ? "Show Less" : "Show More"}
          </button>
        )}
      </div>

      {/* Price Range */}
      <div className="border-t pt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Price Range
        </h3>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-500 mb-1">Min</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="1"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-500 mb-1">Max</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="1400"
            />
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <div className="mt-auto py-4 border-t">
        <button
          onClick={handleApply}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 bg-black/30 lg:hidden">
          <div className="absolute top-0 left-0 h-full w-80 bg-white p-6 overflow-y-auto">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop Permanent Sidebar */}
      <div className="hidden lg:block h-full w-full bg-white p-4 overflow-y-auto border-r border-gray-200 z-40">
        {sidebarContent}
      </div>
    </>
  );
}
