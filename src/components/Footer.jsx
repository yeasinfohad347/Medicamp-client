import { Link } from "react-router";
import logo from "../assets/logo.png";
const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
      <aside>
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <img src={logo} alt="logo" className="w-8 h-8" />
          <span className="text-primary">MEDICAMP</span>
        </Link>
        <p>
          MediCamp Management System
          <br />
          Providing reliable medical camp coordination since 2025
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a href="#" className="link link-hover">
          Camp Registration
        </a>
        <a href="#" className="link link-hover">
          Camp Management
        </a>
        <a href="#" className="link link-hover">
          Feedback & Ratings
        </a>
        <a href="#" className="link link-hover">
          Payment Integration
        </a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a href="#" className="link link-hover">
          About Us
        </a>
        <a href="#" className="link link-hover">
          Contact
        </a>
        <a href="#" className="link link-hover">
          Careers
        </a>
        <a href="#" className="link link-hover">
          Press Kit
        </a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a href="#" className="link link-hover">
          Terms of Use
        </a>
        <a href="#" className="link link-hover">
          Privacy Policy
        </a>
        <a href="#" className="link link-hover">
          Cookie Policy
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
