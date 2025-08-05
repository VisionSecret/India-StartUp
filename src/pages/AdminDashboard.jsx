import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../api/AdminProducts";

const initialForm = {
  title: "",
  price: "",
  description: "",
  category: "",
  brand: "",
  thumbnail: "",
};

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleAdd() {
    setForm(initialForm);
    setEditMode(false);
    setModalOpen(true);
    setFormError(null);
  }

  function handleEdit(product) {
    setForm({
      title: product.title || "",
      price: product.price || "",
      description: product.description || "",
      category: product.category || "",
      brand: product.brand || "",
      thumbnail: product.thumbnail || product.images?.[0] || "",
    });
    setSelectedProduct(product);
    setEditMode(true);
    setModalOpen(true);
    setFormError(null);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    try {
      if (editMode && selectedProduct) {
        await updateProduct(selectedProduct.id, {
          ...form,
          price: Number(form.price),
        });
      } else {
        await addProduct({
          ...form,
          price: Number(form.price),
        });
      }
      setModalOpen(false);
      setSelectedProduct(null);
      fetchProducts();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  }

  function handleDelete(id) {
    setDeleteId(id);
    setDeleteError(null);
  }

  async function confirmDelete() {
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      await deleteProduct(deleteId);
      setDeleteId(null);
      fetchProducts();
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200">
      <AdminSidebar onAddProduct={handleAdd} />
      <main className="flex-1 ml-0 md:ml-64 p-6 overflow-y-auto relative">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-lg">
            Product Management
          </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {loading ? (
            <div className="col-span-full flex justify-center items-center h-40">
              <span className="loader border-4 border-indigo-600 border-t-transparent rounded-full w-10 h-10 animate-spin"></span>
              <span className="ml-4 text-indigo-600 font-semibold">
                Loading products...
              </span>
            </div>
          ) : error ? (
            <div className="col-span-full text-red-600 font-semibold">
              {error}
            </div>
          ) : products.length === 0 ? (
            <div className="col-span-full text-gray-500 text-center">
              No products found.
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="relative flex flex-col items-center justify-center bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 p-3 group cursor-pointer focus-within:ring-2 focus-within:ring-blue-400"
                tabIndex={0}
              >
                <button
                  className="flex flex-col items-center justify-center w-full h-full focus:outline-none"
                  style={{ background: "none", border: "none" }}
                  onClick={() => handleEdit(product)}
                  tabIndex={-1}
                >
                  <img
                    src={product.thumbnail || product.images?.[0]}
                    alt={product.title}
                    className="object-cover rounded-md w-14 h-14 mb-2 border border-gray-100 shadow-sm group-hover:scale-105 transition-transform"
                  />
                  <div className="text-xs font-semibold text-gray-900 truncate w-full text-center mb-1">
                    {product.title}
                  </div>
                  <div className="text-sm font-bold text-blue-700">
                    ${product.price}
                  </div>
                </button>
              </div>
            ))
          )}
        </div>
        {/* Add/Edit Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-2xl p-0 relative border border-white/30 animate-modalPop overflow-hidden">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl z-10"
                onClick={() => setModalOpen(false)}
              >
                &times;
              </button>

              {/* Modern Delete icon (hover/focus only for this card) */}
              <button
                className="absolute top-3 left-3 z-10 p-2 rounded-full bg-white shadow-lg border-0 text-red-500 opacity-100 hover:scale-95 focus-within:opacity-100 focus-within:scale-105 transition-all duration-300 hover:ring-2 hover:ring-red-300 hover:ring-offset-2 hover:ring-offset-white"
                title="Delete"
                aria-label="Delete product"
                onClick={() => {
                  setDeleteId(1);
                }}
                tabIndex={0}
              >
                {/* Heroicons solid trash icon */}
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.366-.446.958-.599 1.493-.447.535.152.92.624.92 1.18V4h3.25A1.25 1.25 0 0115 5.25v.5a.75.75 0 01-.75.75h-12a.75.75 0 01-.75-.75v-.5A1.25 1.25 0 013.25 4H6.5v-.168c0-.556.385-1.028.92-1.18.535-.152 1.127.001 1.493.447zM4.5 7.25a.75.75 0 01.75-.75h7.5a.75.75 0 01.75.75v7.5A2.25 2.25 0 0111.25 17H6.75A2.25 2.25 0 014.5 14.75v-7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Image Preview/Upload */}
                <div className="md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 p-8 gap-4 border-b md:border-b-0 md:border-r border-white/30">
                  <div className="w-40 h-40 rounded-2xl bg-white/60 shadow-inner flex items-center justify-center overflow-hidden border-2 border-indigo-200">
                    {form.thumbnail ? (
                      <img
                        src={form.thumbnail}
                        alt="Preview"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-gray-400 text-6xl">🖼️</span>
                    )}
                  </div>
                  <input
                    type="text"
                    name="thumbnail"
                    value={form.thumbnail}
                    onChange={handleChange}
                    placeholder="Paste image URL..."
                    className="w-full mt-2 border border-indigo-200 rounded-xl px-4 py-2 bg-white/60 focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
                  />
                  <span className="text-xs text-gray-500 text-center">
                    Paste a product image URL above to preview
                  </span>
                </div>
                {/* Form Fields */}
                <form
                  onSubmit={handleSubmit}
                  className="md:w-1/2 p-8 space-y-4 flex flex-col justify-center"
                >
                  <h2 className="text-2xl font-extrabold mb-2 text-gray-900 drop-shadow text-center md:text-left">
                    {editMode ? "Edit Product" : "Add Product"}
                  </h2>
                  <div>
                    <label className="block font-semibold mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="w-full border border-indigo-200 rounded-xl px-4 py-2 bg-white/60 focus:ring-2 focus:ring-indigo-400 outline-none"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block font-semibold mb-1">Price</label>
                      <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full border border-indigo-200 rounded-xl px-4 py-2 bg-white/60 focus:ring-2 focus:ring-indigo-400 outline-none"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block font-semibold mb-1">Brand</label>
                      <input
                        type="text"
                        name="brand"
                        value={form.brand}
                        onChange={handleChange}
                        className="w-full border border-indigo-200 rounded-xl px-4 py-2 bg-white/60 focus:ring-2 focus:ring-indigo-400 outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block font-semibold mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full border border-indigo-200 rounded-xl px-4 py-2 bg-white/60 focus:ring-2 focus:ring-indigo-400 outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="w-full border border-indigo-200 text-xs rounded-xl px-4 py-2 bg-white/60 focus:ring-2 focus:ring-indigo-400 outline-none"
                      required
                      rows={3}
                    />
                  </div>
                  {formError && (
                    <div className="text-red-600 font-semibold">
                      {formError}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 rounded-xl font-bold shadow hover:from-indigo-700 hover:to-blue-600 transition mt-2"
                    disabled={formLoading}
                  >
                    {formLoading
                      ? editMode
                        ? "Saving..."
                        : "Adding..."
                      : editMode
                      ? "Save Changes"
                      : "Add Product"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white/80 backdrop-blur-2xl rounded-2xl shadow-2xl w-full max-w-sm p-8 relative border border-white/30 animate-modalPop">
              <h2 className="text-xl font-extrabold mb-4 text-gray-900 drop-shadow">
                Delete Product
              </h2>
              <p className="mb-4 text-gray-700">
                Are you sure you want to delete this product?
              </p>
              {deleteError && (
                <div className="text-red-600 font-semibold mb-2">
                  {deleteError}
                </div>
              )}
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold"
                  onClick={() => setDeleteId(null)}
                  disabled={deleteLoading}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:from-red-600 hover:to-pink-600"
                  onClick={confirmDelete}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
