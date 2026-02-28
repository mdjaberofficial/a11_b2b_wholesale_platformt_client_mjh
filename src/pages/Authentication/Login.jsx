import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";

import SocialLogin from "./SocialLogin";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Destination to send the user after successful login
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        toast.success("Login Successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message || "Invalid credentials. Please try again.");
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 border border-base-200">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>
          
          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input type="email" {...register("email", { required: true })} placeholder="email@example.com" className="input input-bordered" />
            {errors.email && <span className="text-error text-sm mt-1">Email is required</span>}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input type="password" {...register("password", { required: true })} placeholder="••••••••" className="input input-bordered" />
            {errors.password && <span className="text-error text-sm mt-1">Password is required</span>}
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>

          <SocialLogin />

          <p className="text-center mt-4 text-sm">
            Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;