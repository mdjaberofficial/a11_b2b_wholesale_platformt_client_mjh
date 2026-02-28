const Newsletter = () => {
  return (
    <div className="bg-primary text-primary-content p-10 rounded-2xl my-10 text-center">
      <h2 className="text-3xl font-bold mb-4">Subscribe to Wholesale Alerts</h2>
      <p className="mb-6">Get the latest deals from global suppliers directly in your inbox.</p>
      <div className="flex max-w-md mx-auto gap-2">
        <input type="email" placeholder="business@email.com" className="input input-bordered w-full text-black" />
        <button className="btn btn-secondary">Join</button>
      </div>
    </div>
  );
};

export default Newsletter;