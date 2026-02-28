import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";

// Public Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import NotFound from "../pages/Error/NotFound";

// Protected Pages
import AllProducts from "../pages/AllProducts/AllProducts";
import AddProduct from "../pages/AddProduct/AddProduct";
import Cart from "../pages/Cart/Cart";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import UpdateProduct from "../pages/UpdateProduct/UpdateProduct";
import MyProducts from "../pages/MyProducts/MyProducts"; // We will build this next!

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />, // Catches all undefined routes (404)
    children: [
      // ----- PUBLIC ROUTES -----
      { 
        path: "/", 
        element: <Home /> 
      },
      { 
        path: "/login", 
        element: <Login /> 
      },
      { 
        path: "/register", 
        element: <Register /> 
      },

      // ----- PROTECTED ROUTES -----
      { 
        path: "/all-products", 
        element: <PrivateRoute><AllProducts /></PrivateRoute> 
      },
      { 
        path: "/add-product", 
        element: <PrivateRoute><AddProduct /></PrivateRoute> 
      },
      { 
        path: "/cart", 
        element: <PrivateRoute><Cart /></PrivateRoute> 
      },
      { 
        // Dynamic route for viewing a single product
        path: "/product/:id", 
        element: <PrivateRoute><ProductDetails /></PrivateRoute> 
      },
      { 
        // Dynamic route for updating a specific product
        path: "/update-product/:id", 
        element: <PrivateRoute><UpdateProduct /></PrivateRoute> 
      },
      { 
        // Route for viewing user's own added products
        path: "/my-products", 
        element: <PrivateRoute><MyProducts /></PrivateRoute> 
      }
    ]
  }
]);