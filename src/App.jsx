import React, { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

import Layout from "./components/Layout.jsx";
import Shop from "./pages/Shop.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import ThanksPage from "./pages/ThanksPage.jsx";
import ReturnsPolicy from "./pages/ReturnsPolicy.jsx";
import SignUp from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import Home from "./pages/HomePage.jsx";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import Categories from "./pages/Categories.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="cart" element={<Cart />} />
      <Route path="categories" element={<Categories />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="thankspage" element={<ThanksPage />} />
      <Route path="returnspolicy" element={<ReturnsPolicy />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="products/:productId" element={<ProductsPage />} />
      <Route path="category/:categoryId" element={<CategoryPage />} />
      <Route path="product-details/:productId" element={<ProductDetail />} />
    </Route>
  )
);

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
