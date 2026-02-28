import { Slide } from "react-awesome-reveal";

const WhyChooseUs = () => {
  return (
    <div className="bg-base-200 py-12 px-6 rounded-xl my-16">
      <h2 className="text-3xl font-bold text-center mb-10">Why Source With Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Slide direction="left" triggerOnce>
          <div className="text-center">
            <div className="text-5xl mb-4">🌍</div>
            <h3 className="text-xl font-bold mb-2">Global Network</h3>
            <p>Connect with verified manufacturers and distributors from over 50 countries.</p>
          </div>
        </Slide>
        <Slide direction="up" triggerOnce>
          <div className="text-center">
            <div className="text-5xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold mb-2">Secure Transactions</h3>
            <p>Your wholesale payments are protected with our state-of-the-art escrow system.</p>
          </div>
        </Slide>
        <Slide direction="right" triggerOnce>
          <div className="text-center">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-xl font-bold mb-2">Bulk Discounts</h3>
            <p>Access exclusive tier-based pricing the more quantity you order.</p>
          </div>
        </Slide>
      </div>
    </div>
  );
};

export default WhyChooseUs;