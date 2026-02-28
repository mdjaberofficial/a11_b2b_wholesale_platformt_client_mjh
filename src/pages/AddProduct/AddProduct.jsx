import { useContext } from "react";
import { useForm } from "react-hook-form";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";

const AddProduct = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    // Format numeric values before sending to the database
    const newProduct = {
      ...data,
      price: parseFloat(data.price),
      rating: parseFloat(data.rating),
      main_quantity: parseInt(data.main_quantity),
      minimum_selling_quantity: parseInt(data.minimum_selling_quantity),
      sellerEmail: user.email,
      sellerName: user.displayName,
      createdAt: new Date().toISOString()
    };

    try {
      // POST request to your Express server
      const response = await axiosSecure.post('/api/products', newProduct);
      if (response.data.insertedId) {
        toast.success("Product added successfully!");
        reset(); // Clear the form
      }
    } catch (error) {
      toast.error("Failed to add product.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-base-100 shadow-2xl rounded-xl border border-base-200">
      <h2 className="text-3xl font-bold text-center mb-8">Add New Wholesale Product</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image URL */}
          <div className="form-control">
            <label className="label"><span className="label-text">Product Image URL</span></label>
            <input type="url" {...register("image", { required: true })} className="input input-bordered w-full" placeholder="https://..." />
          </div>

          {/* Product Name */}
          <div className="form-control">
            <label className="label"><span className="label-text">Product Name</span></label>
            <input type="text" {...register("name", { required: true })} className="input input-bordered w-full" placeholder="e.g., Industrial Lathe" />
          </div>

          {/* Brand Name */}
          <div className="form-control">
            <label className="label"><span className="label-text">Brand Name</span></label>
            <input type="text" {...register("brand", { required: true })} className="input input-bordered w-full" placeholder="e.g., Sony, MachinPro" />
          </div>

          {/* Category Dropdown */}
          <div className="form-control">
            <label className="label"><span className="label-text">Category</span></label>
            <select {...register("category", { required: true })} className="select select-bordered w-full">
              <option value="">Select Category</option>
              <option value="Electronics & Gadgets">Electronics & Gadgets</option>
              <option value="Home & Kitchen Appliances">Home & Kitchen Appliances</option>
              <option value="Fashion & Apparel">Fashion & Apparel</option>
              <option value="Industrial Machinery & Tools">Industrial Machinery & Tools</option>
              <option value="Health & Beauty">Health & Beauty</option>
              <option value="Automotive Parts & Accessories">Automotive Parts & Accessories</option>
              <option value="Office Supplies & Stationery">Office Supplies & Stationery</option>
            </select>
          </div>

          {/* Main Quantity */}
          <div className="form-control">
            <label className="label"><span className="label-text">Total Stock (Main Quantity)</span></label>
            <input type="number" {...register("main_quantity", { required: true, min: 0 })} className="input input-bordered w-full" placeholder="Total units available" />
          </div>

          {/* Minimum Selling Quantity */}
          <div className="form-control">
            <label className="label"><span className="label-text">Minimum Selling Quantity</span></label>
            <input type="number" {...register("minimum_selling_quantity", { required: true, min: 1 })} className="input input-bordered w-full" placeholder="Min units per order" />
          </div>

          {/* Price */}
          <div className="form-control">
            <label className="label"><span className="label-text">Price per Unit ($)</span></label>
            <input type="number" step="0.01" {...register("price", { required: true, min: 0 })} className="input input-bordered w-full" placeholder="0.00" />
          </div>

          {/* Rating */}
          <div className="form-control">
            <label className="label"><span className="label-text">Rating (1-5)</span></label>
            <input type="number" step="0.1" {...register("rating", { required: true, min: 1, max: 5 })} className="input input-bordered w-full" placeholder="4.5" />
          </div>
        </div>

        {/* Short Description */}
        <div className="form-control">
          <label className="label"><span className="label-text">Short Description</span></label>
          <textarea {...register("description", { required: true })} className="textarea textarea-bordered w-full h-24" placeholder="Briefly describe the product..."></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">Add Product to Inventory</button>
      </form>
    </div>
  );
};

export default AddProduct;