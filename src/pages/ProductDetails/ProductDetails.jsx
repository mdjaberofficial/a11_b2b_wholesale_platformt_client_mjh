import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import ReactStars from "react-rating-stars-component";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../contexts/AuthContext";


const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchaseQuantity, setPurchaseQuantity] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosSecure.get(`/api/products/${id}`);
        setProduct(data);
        // Automatically set the counter to the minimum required quantity
        setPurchaseQuantity(data.minimum_selling_quantity);
      } catch (error) {
        toast.error("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, axiosSecure]);

  // Modal Counter Logic
  const handleIncrease = () => {
    if (purchaseQuantity < product.main_quantity) {
      setPurchaseQuantity(prev => prev + 1);
    } else {
      toast.error("You cannot buy more than the available stock!");
    }
  };

  const handleDecrease = () => {
    if (purchaseQuantity > 1) {
      setPurchaseQuantity(prev => prev - 1);
    }
  };

  // Final Checkout Logic
  const handleCheckout = async () => {
    // 1. Strict Validation as per requirements
    if (purchaseQuantity < product.minimum_selling_quantity) {
      toast.error(`Minimum wholesale order is ${product.minimum_selling_quantity} units.`);
      return;
    }
    if (purchaseQuantity > product.main_quantity) {
      toast.error("Insufficient stock available.");
      return;
    }

    // 2. Prepare Cart Object
    const cartItem = {
      productId: product._id,
      name: product.name,
      image: product.image,
      category: product.category,
      brand: product.brand,
      price: product.price,
      purchaseQuantity: purchaseQuantity,
      buyerEmail: user.email,
      buyerName: user.displayName,
      purchaseDate: new Date().toISOString()
    };

    try {
      // 3. Send to Backend
      const response = await axiosSecure.post('/api/cart', cartItem);
      if (response.data.insertResult.insertedId) {
        toast.success("Successfully added to your wholesale cart!");
        document.getElementById("buy_modal").close();
        navigate('/cart'); // Send them to the cart to review
      }
    } catch (error) {
      toast.error("Checkout failed. Please try again.");
    }
  };

  if (loading) return <div className="flex justify-center my-20"><span className="loading loading-spinner loading-lg"></span></div>;
  if (!product) return <div className="text-center my-20">Product not found.</div>;

  return (
    <div className="max-w-6xl mx-auto my-10 p-4">
      <div className="card lg:card-side bg-base-100 shadow-2xl border border-base-200">
        <figure className="lg:w-1/2 p-8 bg-base-200">
          <img src={product.image} alt={product.name} className="rounded-xl shadow-lg w-full object-cover" />
        </figure>
        <div className="card-body lg:w-1/2 justify-center">
          <div className="badge badge-primary mb-2">{product.category}</div>
          <h2 className="card-title text-4xl font-bold">{product.name}</h2>
          <p className="text-lg text-gray-500 font-semibold mb-4">Brand: {product.brand}</p>
          
          <div className="flex items-center gap-4 mb-4">
            <ReactStars count={5} value={product.rating} size={24} edit={false} isHalf={true} activeColor="#ffd700" />
            <span className="font-bold text-lg text-primary">${product.price} / unit</span>
          </div>

          <p className="text-base-content mb-6 leading-relaxed">{product.description}</p>
          
          <div className="stats shadow bg-base-200 mb-6">
            <div className="stat">
              <div className="stat-title">Available Stock</div>
              <div className="stat-value text-2xl">{product.main_quantity}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Min Order Qty</div>
              <div className="stat-value text-2xl text-error">{product.minimum_selling_quantity}</div>
            </div>
          </div>

          <div className="card-actions justify-end">
            <button 
              className="btn btn-primary btn-lg w-full" 
              onClick={() => document.getElementById("buy_modal").showModal()}
              disabled={product.main_quantity === 0}
            >
              {product.main_quantity === 0 ? "Out of Stock" : "Buy Now"}
            </button>
          </div>
        </div>
      </div>

      {/* --- CHECKOUT MODAL --- */}
      <dialog id="buy_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-2xl mb-4">Confirm Wholesale Order</h3>
          
          <div className="space-y-4">
            {/* Read-Only User Info */}
            <div className="form-control">
              <label className="label"><span className="label-text">Buyer Name</span></label>
              <input type="text" value={user?.displayName || ''} readOnly className="input input-bordered bg-base-200" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Buyer Email</span></label>
              <input type="text" value={user?.email || ''} readOnly className="input input-bordered bg-base-200" />
            </div>

            {/* Quantity Controller */}
            <div className="form-control mt-4">
              <label className="label"><span className="label-text font-bold">Purchase Quantity</span></label>
              <div className="flex items-center gap-4">
                <button type="button" onClick={handleDecrease} className="btn btn-square btn-outline font-bold text-xl">-</button>
                <input 
                  type="number" 
                  value={purchaseQuantity} 
                  readOnly 
                  className="input input-bordered text-center text-xl font-bold w-24" 
                />
                <button type="button" onClick={handleIncrease} className="btn btn-square btn-outline font-bold text-xl">+</button>
              </div>
              <label className="label">
                <span className="label-text-alt text-error font-bold">Minimum required: {product.minimum_selling_quantity}</span>
              </label>
            </div>

            <div className="divider"></div>
            <div className="flex justify-between items-center font-bold text-xl">
              <span>Total Cost:</span>
              <span className="text-primary">${(product.price * purchaseQuantity).toFixed(2)}</span>
            </div>
          </div>

          <div className="modal-action">
            <button onClick={handleCheckout} className="btn btn-primary">Confirm Purchase</button>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProductDetails;