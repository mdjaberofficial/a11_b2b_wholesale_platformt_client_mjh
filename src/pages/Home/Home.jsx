import Banner from "../../components/Home/Banner";
import FeaturedCategories from "../../components/Home/FeaturedCategories";
import Newsletter from "../../components/Home/Newsletter";
import WhyChooseUs from "../../components/Home/WhyChooseUs";

const Home = () => {
  return (
    <div className="space-y-10">
      <Banner />
      <FeaturedCategories />
      <WhyChooseUs />
      <Newsletter />
    </div>
  );
};

export default Home;