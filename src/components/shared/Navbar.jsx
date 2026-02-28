import { useContext } from "react";
import { Link, NavLink } from "react-router";


// Add this import at the top of Navbar.jsx
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("Logged out successfully"))
      .catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/categories">Categories</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/all-products">All Products</NavLink></li>
          <li><NavLink to="/add-product">Add Product</NavLink></li>
          <li><NavLink to="/my-products">My Products</NavLink></li>
          <li><NavLink to="/cart">Cart</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4 md:px-8">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl font-bold text-primary">
          B2B Wholesale
        </Link>
      </div>
      
      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navLinks}
        </ul>
      </div>

      {/* Auth / User Profile */}
    
      <div className="navbar-end gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            {/* User Avatar with React Tooltip */}
            <div className="avatar">
              <div 
                id="user-avatar-tooltip" 
                className="w-10 rounded-full border-2 border-primary cursor-pointer"
              >
                <img src={user?.photoURL || "https://i.ibb.co/MgsTCcv/avater.jpg"} alt="User Avatar" />
              </div>
            </div>
            
            {/* The Tooltip Component */}
            <Tooltip 
              anchorSelect="#user-avatar-tooltip" 
              content={user?.displayName || "Wholesale User"} 
              place="bottom"
              className="z-50 font-bold"
            />

            <button onClick={handleLogOut} className="btn btn-error btn-sm text-white hidden sm:flex">
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline btn-primary btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;