import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import SocialLogin from "./SocialLogin";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(() => {
        // Update user profile with Name and Photo URL
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            toast.success("Registration Successful!");
            navigate("/"); // Redirect to Home
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 border border-base-200">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
          
          <div className="form-control">
            <label className="label"><span className="label-text">Full Name</span></label>
            <input type="text" {...register("name", { required: true })} placeholder="John Doe" className="input input-bordered" />
            {errors.name && <span className="text-error text-sm mt-1">Name is required</span>}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Photo URL</span></label>
            <input type="url" {...register("photoURL", { required: true })} placeholder="https://example.com/photo.jpg" className="input input-bordered" />
            {errors.photoURL && <span className="text-error text-sm mt-1">Photo URL is required</span>}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input type="email" {...register("email", { required: true })} placeholder="email@example.com" className="input input-bordered" />
            {errors.email && <span className="text-error text-sm mt-1">Email is required</span>}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input 
              type="password" 
              {...register("password", { 
                required: "Password is required", 
                minLength: { value: 6, message: "Must be at least 6 characters" },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[a-z])/,
                  message: "Must have an Uppercase and a Lowercase letter"
                }
              })} 
              placeholder="••••••••" 
              className="input input-bordered" 
            />
            {errors.password && <span className="text-error text-sm mt-1">{errors.password.message}</span>}
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary">Register</button>
          </div>

          <SocialLogin />

          <p className="text-center mt-4 text-sm">
            Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;