import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const { data } = await axiosSecure.get(`/api/my-products?email=${user.email}`);
        setMyProducts(data);
      } catch (error) {
        toast.error("Failed to load your products.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchMyProducts();
    }
  }, [user, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this! The product will be permanently removed from the marketplace.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/api/products/${id}`);
          if (response.data.deletedCount > 0) {
            setMyProducts(myProducts.filter(product => product._id !== id));
            Swal.fire("Deleted!", "Your product has been deleted.", "success");
          }
        } catch (error) {
          toast.error("Failed to delete the product.");
        }
      }
    });
  };

  if (loading) return <div className="flex justify-center my-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center border-b-4 border-primary inline-block pb-2">My Listed Products</h2>

      {myProducts.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-xl">
          <h3 className="text-2xl font-semibold mb-4">You haven't listed any products yet.</h3>
          <Link to="/add-product" className="btn btn-primary">Add Your First Product</Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl border border-base-200">
          <table className="table w-full">
            <thead className="bg-base-200 text-base-content">
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myProducts.map(product => (
                <tr key={product._id} className="hover">
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={product.image} alt={product.name} />
                      </div>
                    </div>
                  </td>
                  <td className="font-bold">{product.name}</td>
                  <td><span className="badge badge-ghost badge-sm">{product.category}</span></td>
                  <td className="font-bold text-primary">${product.price}</td>
                  <td>{product.main_quantity} Units</td>
                  <td className="space-x-2">
                    <Link to={`/update-product/${product._id}`} className="btn btn-warning btn-xs">Update</Link>
                    <button onClick={() => handleDelete(product._id)} className="btn btn-error btn-xs">Delete</button>
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

export default MyProducts;