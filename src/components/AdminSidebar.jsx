import React, { useState } from "react";
import {
  HiOutlineViewGrid,
  HiOutlineMenuAlt2,
  HiOutlineX,
  HiOutlineUser,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineClipboardList,
  HiPlusCircle,
} from "react-icons/hi";
import { Link } from "react-router-dom";

const sidebarLinks = [
  {
    name: "Products",
    icon: <HiOutlineViewGrid size={22} />,
    to: "#",
    active: true,
  },
  { name: "Orders", icon: <HiOutlineClipboardList size={22} />, to: "#" },
  { name: "Users", icon: <HiOutlineUser size={22} />, to: "#" },
  // { name: "Analytics", icon: <HiOutlineChartBar size={22} />, to: "#" },
  { name: "Settings", icon: <HiOutlineCog size={22} />, to: "#" },
];

const AdminSidebar = ({ active = "products", onAddProduct }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="fixed top-4 right-4 z-50 md:hidden bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-2 rounded-full shadow-lg"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <HiOutlineMenuAlt2 size={28} />
      </button>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`bg-gradient-to-b from-blue-700 to-indigo-900 text-white shadow-xl h-screen fixed z-50 transition-all duration-300 w-64 md:left-0 top-0 left-0
        ${open ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}
        style={{ minWidth: 256 }}
      >
        <div className="flex flex-col gap-4 p-6 border-b border-blue-800">
          <div className="flex items-center justify-between mb-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 ">
              <img
                src="/images/BagBasket-logo.webp"
                alt="Logo"
                className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover border-2 border-blue-500 p-1"
              />
            </Link>
            <button
              className="md:hidden"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
            >
              <HiOutlineX size={28} />
            </button>
          </div>
          <button
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 rounded-2xl shadow-xl hover:scale-105 hover:from-green-500 hover:to-blue-600 transition-all duration-200 text-lg z-50 animate-bounce-slow"
            onClick={onAddProduct}
            style={{ minWidth: 180 }}
          >
            <HiPlusCircle className="text-2xl" />
            Add Product
          </button>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2">
            {sidebarLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.to}
                  className={`flex items-center gap-3 px-6 py-3 rounded-l-full transition font-semibold text-lg ${
                    link.name.toLowerCase() === active
                      ? "bg-white/10 backdrop-blur text-white shadow-lg"
                      : "hover:bg-white/5"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
