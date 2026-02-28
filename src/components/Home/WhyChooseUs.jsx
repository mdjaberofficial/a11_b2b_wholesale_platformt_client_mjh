const WhyChooseUs = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16 px-4">
      <div className="p-6 bg-base-200 rounded-xl text-center">
        <div className="text-4xl mb-2">🚛</div>
        <h3 className="font-bold text-xl">Global Logistics</h3>
        <p>Reliable shipping to over 120 countries worldwide.</p>
      </div>
      <div className="p-6 bg-base-200 rounded-xl text-center">
        <div className="text-4xl mb-2">💎</div>
        <h3 className="font-bold text-xl">Verified Suppliers</h3>
        <p>Direct access to thousands of certified manufacturers.</p>
      </div>
      <div className="p-6 bg-base-200 rounded-xl text-center">
        <div className="text-4xl mb-2">💳</div>
        <h3 className="font-bold text-xl">Secure Payments</h3>
        <p>Escrow protection for all high-volume transactions.</p>
      </div>
    </div>
  );
};

export default WhyChooseUs;