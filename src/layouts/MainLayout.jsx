import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer"; // Ensure you create a basic Footer
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
  const location = useLocation();

  // Dynamic Title Logic
  useEffect(() => {
    const path = location.pathname;
    let title = "B2B Wholesale";
    
    if (path === '/') title = "Home | B2B Wholesale";
    else if (path === '/login') title = "Login | B2B Wholesale";
    else if (path === '/register') title = "Register | B2B Wholesale";
    else if (path === '/all-products') title = "All Products | B2B Wholesale";
    else if (path === '/add-product') title = "Add Product | B2B Wholesale";
    else if (path === '/cart') title = "Cart | B2B Wholesale";

    document.title = title;
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
        
    <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      {/* Outlet renders the specific page content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;