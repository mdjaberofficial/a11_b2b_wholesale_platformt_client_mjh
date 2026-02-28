import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  
  // Initialize react-hook-form
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Fetch the existing product data to pre-fill the form
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosSecure.get(`/api/products/${id}`);
        // 'reset' dynamically populates the form fields with the fetched data!
        reset(data); 
      } catch (error) {
        toast.error("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, axiosSecure, reset]);

  const onSubmit = async (data) => {
    // Format numeric values just like we did in AddProduct
    const updatedData = {
      name: data.name,
      image: data.image,
      brand: data.brand,
      category: data.category,
      description: data.description,
      price: parseFloat(data.price),
      rating: parseFloat(data.rating),
      main_quantity: parseInt(data.main_quantity),
      minimum_selling_quantity: parseInt(data.minimum_selling_quantity),
    };

    try {
      const response = await axiosSecure.put(`/api/products/${id}`, updatedData);
      
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Product details have been updated successfully.",
          icon: "success",
          confirmButtonText: "View Products"
        }).then(() => {
          navigate('/all-products');
        });
      } else {
        toast("No changes were made.", { icon: "ℹ️" });
      }
    } catch (error) {
      toast.error("Failed to update product.");
      console.error(error);
    }
  };

  if (loading) return <div className="flex justify-center my-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-base-100 shadow-2xl rounded-xl border border-base-200">
      <h2 className="text-3xl font-bold text-center mb-8">Update Product Details</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label"><span className="label-text">Product Image URL</span></label>
            <input type="url" {...register("image", { required: true })} className="input input-bordered w-full" />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Product Name</span></label>
            <input type="text" {...register("name", { required: true })} className="input input-bordered w-full" />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Brand Name</span></label>
            <input type="text" {...register("brand", { required: true })} className="input input-bordered w-full" />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Category</span></label>
            <select {...register("category", { required: true })} className="select select-bordered w-full">
              <option value="Electronics & Gadgets">Electronics & Gadgets</option>
              <option value="Home & Kitchen Appliances">Home & Kitchen Appliances</option>
              <option value="Fashion & Apparel">Fashion & Apparel</option>
              <option value="Industrial Machinery & Tools">Industrial Machinery & Tools</option>
              <option value="Health & Beauty">Health & Beauty</option>
              <option value="Automotive Parts & Accessories">Automotive Parts & Accessories</option>
              <option value="Office Supplies & Stationery">Office Supplies & Stationery</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Total Stock (Main Quantity)</span></label>
            <input type="number" {...register("main_quantity", { required: true, min: 0 })} className="input input-bordered w-full" />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Minimum Selling Quantity</span></label>
            <input type="number" {...register("minimum_selling_quantity", { required: true, min: 1 })} className="input input-bordered w-full" />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Price per Unit ($)</span></label>
            <input type="number" step="0.01" {...register("price", { required: true, min: 0 })} className="input input-bordered w-full" />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Rating (1-5)</span></label>
            <input type="number" step="0.1" {...register("rating", { required: true, min: 1, max: 5 })} className="input input-bordered w-full" />
          </div>
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Short Description</span></label>
          <textarea {...register("description", { required: true })} className="textarea textarea-bordered w-full h-24"></textarea>
        </div>

        <button type="submit" className="btn btn-warning w-full mt-4 font-bold text-lg">Save Updates</button>
      </form>
    </div>
  );
};

export default UpdateProduct;