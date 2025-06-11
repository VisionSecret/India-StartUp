import axios from "axios";

const baseCategoriesURL = "https://dummyjson.com/products/categories";
const baseCategoryProductsURL = "https://dummyjson.com/products/category/";

// Fetch categories
export const getCategoriesData = async () => {
  try {
    const { data } = await axios.get(baseCategoriesURL);
    return data; // returns array of category names
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }
};

// Fetch products by category
export const getProductsByCategory = async (category) => {
  try {
    const { data } = await axios.get(`${baseCategoryProductsURL}${category}`);
    return data.products || [];
  } catch (error) {
    console.error(
      `Error fetching products for category "${category}":`,
      error.message
    );
    return [];
  }
};
