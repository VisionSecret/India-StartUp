import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
<<<<<<< HEAD
import { Outlet } from "react-router-dom";
=======
import { Outlet, useLocation } from "react-router-dom";
>>>>>>> a2786f5039974abf90a5191b424c023bdaf6d5f0
import MobileNavigationBar from "./MobileNavigationBar";

function Layout() {
  const [isMobile, setIsMobile] = useState(false);
<<<<<<< HEAD
=======
  const location = useLocation();
  const isAdminDashboard = location.pathname.startsWith("/admin-dashboard");
>>>>>>> a2786f5039974abf90a5191b424c023bdaf6d5f0

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
      {!isAdminDashboard && <Header />}
      <Outlet />
<<<<<<< HEAD
      {isMobile && <MobileNavigationBar />}
      <Footer />
=======
      {!isAdminDashboard && isMobile && <MobileNavigationBar />}
      {!isAdminDashboard && <Footer />}
>>>>>>> a2786f5039974abf90a5191b424c023bdaf6d5f0
    </>
  );
}

export default Layout;
