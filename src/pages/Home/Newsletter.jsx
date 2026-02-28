import { Fade } from "react-awesome-reveal";

const Newsletter = () => {
  return (
    <div className="my-16 p-8 bg-primary text-primary-content rounded-xl text-center">
      <Fade direction="up">
        <h2 className="text-3xl font-bold mb-4">Stay Ahead in Wholesale</h2>
        <p className="mb-6 max-w-xl mx-auto">Subscribe to our B2B newsletter to receive the latest industry trends, exclusive supplier discounts, and platform updates directly in your inbox.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-lg mx-auto">
          <input type="email" placeholder="Enter your business email" className="input input-bordered w-full text-base-content" />
          <button className="btn btn-secondary">Subscribe</button>
        </div>
      </Fade>
    </div>
  );
};

export default Newsletter;