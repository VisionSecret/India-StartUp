import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../api/Products";
import { FaStar, FaShoppingCart, FaHeart, FaShareAlt } from "react-icons/fa";
import {
  FiPackage,
  FiClock,
  FiInfo,
  FiChevronDown,
  FiTag,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [cartLoading, setCartLoading] = useState({});
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [activeAccordion, setActiveAccordion] = useState("description");
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductById(productId);
        setProduct(data);
        setSelectedImage(data.thumbnail);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = (product) => {
    setCartLoading((prevState) => ({
      ...prevState,
      [product.id]: true,
    }));
    dispatch(addToCart(product));
    notify();

    setTimeout(() => {
      setCartLoading((prevState) => ({
        ...prevState,
        [product.id]: false,
      }));
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

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="flex space-x-2 mb-4">
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-100"></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-200"></div>
          </div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white shadow-xl rounded-xl p-8 max-w-md text-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the product you're looking for. It may have been
            removed or is temporarily unavailable.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => goBack()}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300"
            >
              Go Back
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          productCategory={product.category}
          productTitle={product.title}
          onCategoryClick={goBack}
        />

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="md:flex">
            {/* Images Gallery */}
            <div className="md:w-1/2 p-6">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-100 mb-4">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-contain transition-opacity duration-300"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition">
                    <FaHeart className="text-gray-500 hover:text-red-500" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition">
                    <FaShareAlt className="text-gray-500 hover:text-blue-600" />
                  </button>
                </div>
              </div>

              <div className="flex overflow-x-auto pb-2 -mx-1 scrollbar-hide">
                {Array.isArray(product.images) &&
                  product.images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`flex-shrink-0 m-1 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedImage === img
                          ? "border-blue-500 scale-105"
                          : "border-transparent hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        src={img}
                        alt={`preview-${idx}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </div>
                  ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-6 border-l border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mb-2">
                    {product.category}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {product.title}
                  </h1>
                  <p className="text-gray-500 text-sm">{product.brand}</p>
                </div>
                <div className="flex items-center text-yellow-500">
                  {Array.from({ length: Math.round(product.rating || 0) }).map(
                    (_, i) => (
                      <FaStar key={i} className="fill-current" />
                    )
                  )}
                  <span className="ml-1 text-sm text-gray-700">
                    ({product.rating || 0})
                  </span>
                </div>
              </div>

              <div className="my-6 py-4 border-y border-gray-100">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹
                    {typeof product.price === "number"
                      ? product.price.toFixed(2)
                      : "0.00"}
                  </span>
                  {product.discountPercentage > 0 && (
                    <span className="text-sm text-red-500 line-through">
                      ₹
                      {(
                        product.price *
                        (1 + product.discountPercentage / 100)
                      ).toFixed(2)}
                    </span>
                  )}
                  {product.discountPercentage > 15 && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                      Save {product.discountPercentage}%
                    </span>
                  )}
                </div>
                <p className="text-teal-600 text-sm flex items-center">
                  <FiPackage className="mr-1" />
                  {product.stock > 10
                    ? "In Stock"
                    : product.stock > 0
                    ? `Only ${product.stock} left!`
                    : "Out of Stock"}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={cartLoading[product.id]}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {cartLoading[product.id] ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <FaShoppingCart />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition duration-300">
                  <FaHeart />
                </button>
              </div>

              {/* Product Actions */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FiPackage className="text-gray-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Delivery</p>
                    <p className="text-sm font-medium">Free shipping</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FiClock className="text-gray-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Estimated</p>
                    <p className="text-sm font-medium">2-4 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Accordion */}
          <div className="border-t border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Product Details
            </h2>

            {/* Accordion Section */}
            <div className="space-y-3">
              <div
                className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                  activeAccordion === "specifications"
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleAccordion("specifications")}
                >
                  <div className="flex items-center">
                    <FiPackage
                      className={`mr-3 ${
                        activeAccordion === "specifications"
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    />
                    <span className="font-medium">Specifications</span>
                  </div>
                  <FiChevronDown
                    className={`transform transition-transform duration-300 ${
                      activeAccordion === "specifications"
                        ? "rotate-180 text-blue-600"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                {activeAccordion === "specifications" && (
                  <div className="px-4 pb-4">
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex">
                        <strong className="w-32 text-gray-600">Brand:</strong>
                        <span>{product.brand || "N/A"}</span>
                      </li>
                      <li className="flex">
                        <strong className="w-32 text-gray-600">SKU:</strong>
                        <span>{product.sku || "N/A"}</span>
                      </li>
                      <li className="flex">
                        <strong className="w-32 text-gray-600">Weight:</strong>
                        <span>
                          {product.weight ? `${product.weight}kg` : "N/A"}
                        </span>
                      </li>
                      <li className="flex">
                        <strong className="w-32 text-gray-600">
                          Dimensions:
                        </strong>
                        <span>
                          {product.dimensions
                            ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`
                            : "N/A"}
                        </span>
                      </li>
                      <li className="flex">
                        <strong className="w-32 text-gray-600">Stock:</strong>
                        <span>{product.stock || 0}</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div
                className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                  activeAccordion === "policies"
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleAccordion("policies")}
                >
                  <div className="flex items-center">
                    <FiClock
                      className={`mr-3 ${
                        activeAccordion === "policies"
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    />
                    <span className="font-medium">Policies</span>
                  </div>
                  <FiChevronDown
                    className={`transform transition-transform duration-300 ${
                      activeAccordion === "policies"
                        ? "rotate-180 text-blue-600"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                {activeAccordion === "policies" && (
                  <div className="px-4 pb-4">
                    <div className="space-y-2 text-gray-700 text-sm">
                      <p className="flex">
                        <strong className="w-32 text-gray-600">
                          Warranty:
                        </strong>
                        <span>{product.warrantyInformation || "N/A"}</span>
                      </p>
                      <p className="flex">
                        <strong className="w-32 text-gray-600">
                          Shipping:
                        </strong>
                        <span>{product.shippingInformation || "N/A"}</span>
                      </p>
                      <p className="flex">
                        <strong className="w-32 text-gray-600">
                          Return Policy:
                        </strong>
                        <span>{product.returnPolicy || "N/A"}</span>
                      </p>
                      <p className="flex">
                        <strong className="w-32 text-gray-600">
                          Minimum Order:
                        </strong>
                        <span>{product.minimumOrderQuantity || 1}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="p-6 border-t border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Customer Reviews
              </h2>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition">
                Write a Review
              </button>
            </div>

            {Array.isArray(product.reviews) && product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((r, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-sm transition"
                  >
                    <div className="flex items-center mb-3">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {r.reviewerName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(r.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-yellow-500 mb-2">
                      {Array.from({ length: r.rating || 0 }).map((_, i) => (
                        <FaStar key={i} className="fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700">{r.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No reviews yet
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Be the first to share your thoughts! Your review will help
                  others make informed decisions.
                </p>
              </div>
            )}
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
    </div>
  );
};

export default ProductDetail;
