// src/components/shared/Footer.jsx
const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded mt-10">
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Wholesale Rules</a>
        <a className="link link-hover">Press kit</a>
      </nav> 
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by B2B Wholesale Ltd</p>
      </aside>
    </footer>
  );
};

export default Footer;