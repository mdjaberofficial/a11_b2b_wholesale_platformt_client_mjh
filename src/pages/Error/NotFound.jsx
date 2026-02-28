import Lottie from "lottie-react";
import { Link } from "react-router";
// We will fetch a free 404 Lottie JSON animation from a public URL
import notFoundAnimation from "../../assets/lottie/404-animation.json"; 

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 px-4">
      <div className="max-w-md w-full text-center">
        {/* Lottie Animation Player */}
        <Lottie 
          animationData={notFoundAnimation} 
          loop={true} 
          className="w-full h-64 md:h-96 mb-8"
        />
        
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-500 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link to="/" className="btn btn-primary btn-wide">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;