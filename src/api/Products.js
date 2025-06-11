import axios from "axios";

const baseProductsURL = "https://dummyjson.com/products";

// Fetch all products
export const getProductData = async () => {
  try {
    const { data } = await axios.get(baseProductsURL);
    return data.products; // returns only products array
  } catch (error) {
    console.error("Failed to fetch products:", error.message);
    return [];
  }
};

// Fetch products by query
export const getProductByQuery = async (query) => {
  try {
    const { data } = await axios.get(`${baseProductsURL}/search?q=${query}`);
    return data.products || [];
  } catch (error) {
    console.error("Failed to fetch products by query:", error.message);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const { data } = await axios.get(`${baseProductsURL}/${id}`);
    return data || [];
  } catch (error) {
    console.error("Failed to fetch products by query:", error.message);
    return [];
  }
};
