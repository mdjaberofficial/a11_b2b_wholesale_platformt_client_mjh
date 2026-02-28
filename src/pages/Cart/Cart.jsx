import { useState, useEffect, useContext } from "react";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Fetch cart items specific to the logged-in user
        const { data } = await axiosSecure.get(`/api/cart?email=${user.email}`);
        setCartItems(data);
      } catch (error) {
        toast.error("Failed to load your cart.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchCart();
    }
  }, [user, axiosSecure]);

  const handleCancelOrder = (id, itemName, quantity) => {
    // SweetAlert2 Confirmation Dialog
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to cancel your order of ${quantity}x ${itemName}. This will restore the items back to the main inventory.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send DELETE request to your Express server
          const response = await axiosSecure.delete(`/api/cart/${id}`);
          
          if (response.data.deleteResult.deletedCount > 0) {
            // Update the UI by filtering out the deleted item
            setCartItems(cartItems.filter(item => item._id !== id));
            
            Swal.fire(
              "Cancelled!",
              "Your wholesale order has been cancelled and stock has been restored.",
              "success"
            );
          }
        } catch (error) {
          toast.error("Failed to cancel the order. Please try again.");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center border-b-4 border-primary inline-block pb-2">My Wholesale Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-xl">
          <h3 className="text-2xl font-semibold mb-4">Your cart is currently empty.</h3>
          <p className="text-gray-500">Looks like you haven't placed any wholesale orders yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div key={item._id} className="card bg-base-100 shadow-xl border border-base-200 transition-transform hover:-translate-y-1 duration-300">
              <figure className="h-48 relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 badge badge-secondary shadow-md">
                  {item.category}
                </div>
              </figure>
              
              <div className="card-body p-5">
                <h2 className="card-title text-xl mb-1">{item.name}</h2>
                <p className="text-sm font-semibold text-gray-500 mb-4">Brand: {item.brand}</p>
                
                <div className="bg-base-200 p-3 rounded-lg mb-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold">Unit Price:</span>
                    <span>${item.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-primary">Qty Ordered:</span>
                    <span className="font-bold">{item.purchaseQuantity} Units</span>
                  </div>
                  <div className="divider my-1"></div>
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-secondary">
                      ${(item.price * item.purchaseQuantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-gray-400 mb-4 text-center">
                  Purchased on: {new Date(item.purchaseDate).toLocaleDateString()}
                </div>

                <div className="card-actions justify-end mt-auto">
                  <button 
                    onClick={() => handleCancelOrder(item._id, item.name, item.purchaseQuantity)} 
                    className="btn btn-error btn-outline w-full"
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;