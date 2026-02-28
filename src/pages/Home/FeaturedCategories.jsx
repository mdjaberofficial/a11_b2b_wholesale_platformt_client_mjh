import { Fade } from "react-awesome-reveal";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router";

const FeaturedCategories = () => {
  // Mock data representing different categories as requested
  const featuredProducts = [
    { _id: "1", name: "Industrial Steel Lathe", brand: "MachinPro", category: "Industrial Machinery", min_qty: 5, desc: "High-precision steel lathe for manufacturing.", price: 4500, rating: 4.8, image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500" },
    { _id: "2", name: "Noise Cancelling Headphones", brand: "Sony", category: "Electronics", min_qty: 50, desc: "Premium wireless over-ear headphones.", price: 250, rating: 4.9, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
    { _id: "3", name: "Cotton Blend T-Shirts", brand: "ApparelCo", category: "Fashion & Apparel", min_qty: 200, desc: "Blank, high-quality t-shirts for custom printing.", price: 4.5, rating: 4.5, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500" },
    { _id: "4", name: "Smart Refrigerator", brand: "Samsung", category: "Home Appliances", min_qty: 10, desc: "Energy-efficient smart fridge with touch panel.", price: 1200, rating: 4.7, image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500" },
    { _id: "5", name: "Ceramic Brake Pads", brand: "AutoStop", category: "Automotive Parts", min_qty: 100, desc: "Durable ceramic brake pads for sedans.", price: 15, rating: 4.6, image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500" }
  ];

  return (
    <div className="my-16">
      <Fade direction="up">
        <h2 className="text-3xl font-bold text-center mb-8 border-b-4 border-primary inline-block pb-2 mx-auto flex w-max">Top Wholesale Categories</h2>
      </Fade>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
          <Fade key={product._id} cascade damping={0.1}>
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <figure className="h-48 w-full"><img src={product.image} alt={product.name} className="w-full h-full object-cover" /></figure>
              <div className="card-body p-5">
                <div className="flex justify-between items-start">
                  <h2 className="card-title text-lg">{product.name}</h2>
                  <div className="badge badge-primary badge-outline text-xs">{product.category}</div>
                </div>
                <p className="text-sm text-gray-500 font-semibold">{product.brand}</p>
                <p className="text-sm mt-2 line-clamp-2">{product.desc}</p>
                <div className="flex justify-between items-center mt-3">
                  <p className="font-bold text-lg">${product.price} <span className="text-xs font-normal text-gray-500">/ unit</span></p>
                  <p className="text-sm font-semibold text-error">Min Qty: {product.min_qty}</p>
                </div>
                <ReactStars count={5} value={product.rating} size={20} edit={false} isHalf={true} activeColor="#ffd700" />
                <div className="card-actions justify-end mt-4">
                  <Link to={`/product/${product._id}`} className="btn btn-primary w-full">View Details</Link>
                </div>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;