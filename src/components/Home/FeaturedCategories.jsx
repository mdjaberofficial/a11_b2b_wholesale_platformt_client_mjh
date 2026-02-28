import { Fade } from "react-awesome-reveal";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router";

const FeaturedCategories = () => {
  const categories = [
    { name: "Electronics", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500" },
    { name: "Fashion", img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500" },
    { name: "Machinery", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500" },
    { name: "Home Appliances", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500" },
    { name: "Office Supplies", img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500" }
  ];

  return (
    <div className="my-16 px-4">
      <Fade direction="up">
        <h2 className="text-3xl font-bold text-center mb-8">Wholesale Categories</h2>
      </Fade>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat, i) => (
          <div key={i} className="card bg-base-100 shadow-xl image-full cursor-pointer hover:scale-105 transition-transform">
            <figure><img src={cat.img} alt={cat.name} /></figure>
            <div className="card-body items-center justify-center">
              <h2 className="card-title text-white">{cat.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;