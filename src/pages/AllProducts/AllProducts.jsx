import { useState, useEffect } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState("card"); // 'card' or 'table'
  const [filterActive, setFilterActive] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosSecure.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [axiosSecure]);

  // Challenge: Filter Functionality
  const displayedProducts = filterActive 
    ? products.filter(p => p.minimum_selling_quantity > 100)
    : products;

  if (loading) {
    return <div className="flex justify-center my-20"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  return (
    <div className="my-10 max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold">All Wholesale Products</h2>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* Challenge: Filter Button */}
          <button 
            onClick={() => setFilterActive(!filterActive)} 
            className={`btn ${filterActive ? 'btn-secondary' : 'btn-outline btn-secondary'}`}
          >
            {filterActive ? "Show All Products" : "Available > 100 Min Qty"}
          </button>

          {/* Challenge: Toggle View Dropdown/Buttons */}
          <div className="join border border-base-300 rounded-lg">
            <button 
              onClick={() => setViewType("card")} 
              className={`join-item btn ${viewType === "card" ? "btn-active btn-primary" : "bg-base-100"}`}
            >
              Card View
            </button>
            <button 
              onClick={() => setViewType("table")} 
              className={`join-item btn ${viewType === "table" ? "btn-active btn-primary" : "bg-base-100"}`}
            >
              Table View
            </button>
          </div>
        </div>
      </div>

      {displayedProducts.length === 0 ? (
        <p className="text-center text-gray-500 my-20 text-xl">No products found.</p>
      ) : viewType === "card" ? (
        /* CARD VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map(product => (
            <div key={product._id} className="card bg-base-100 shadow-xl border border-base-200">
              <figure className="h-48"><img src={product.image} alt={product.name} className="w-full h-full object-cover" /></figure>
              <div className="card-body p-5">
                <h2 className="card-title text-lg truncate">{product.name}</h2>
                <div className="badge badge-accent badge-outline text-xs mb-2">{product.category}</div>
                <p className="text-sm font-semibold text-gray-500">Brand: {product.brand}</p>
                <div className="flex justify-between mt-2">
                  <span className="font-bold text-lg">${product.price}</span>
                  <span className="text-sm text-error font-semibold">Min Qty: {product.minimum_selling_quantity}</span>
                </div>
                <p className="text-sm">Stock: {product.main_quantity}</p>
                <div className="card-actions justify-end mt-4 gap-2">
                  <Link to={`/update-product/${product._id}`} className="btn btn-warning btn-sm">Update</Link>
                  <Link to={`/product/${product._id}`} className="btn btn-primary btn-sm">Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl border border-base-200">
          <table className="table w-full">
            <thead className="bg-base-200 text-base-content">
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Brand / Category</th>
                <th>Price</th>
                <th>Stock / Min Qty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.map(product => (
                <tr key={product._id} className="hover">
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={product.image} alt={product.name} />
                      </div>
                    </div>
                  </td>
                  <td className="font-bold">{product.name}</td>
                  <td>
                    {product.brand}
                    <br/>
                    <span className="badge badge-ghost badge-sm">{product.category}</span>
                  </td>
                  <td className="font-bold">${product.price}</td>
                  <td>
                    Stock: {product.main_quantity} <br/>
                    <span className="text-error text-xs font-bold">Min: {product.minimum_selling_quantity}</span>
                  </td>
                  <td className="space-x-2">
                    <Link to={`/update-product/${product._id}`} className="btn btn-warning btn-xs">Update</Link>
                    <Link to={`/product/${product._id}`} className="btn btn-primary btn-xs">Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllProducts;