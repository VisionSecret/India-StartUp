import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import MobileNavigationBar from "./MobileNavigationBar";

function Layout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 769) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      {isMobile && <MobileNavigationBar />}
      <Footer />
    </>
  );
}

export default Layout;
