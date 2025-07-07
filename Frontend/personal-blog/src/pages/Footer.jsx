import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-14 pb-6 px-6 md:px-20 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Branding */}
        <div>
          <Link
            to="/"
            className="text-2xl font-bold text-purple-600 mb-4 block"
          >
            Dev<span className="text-gray-800">Blog</span>
          </Link>
          <p className="text-sm mb-4 leading-relaxed">
            Sharing code, stories, and insights. Explore tech, tutorials, and tools to improve your developer journey.
          </p>
          <p className="font-medium mb-2">Follow Us</p>
          <div className="flex gap-3 text-white text-lg">
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 p-2 rounded-full"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-500 p-2 rounded-full"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-500 p-2 rounded-full"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 p-2 rounded-full"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-2 rounded-full"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Blog Categories */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/category/web-development">Web Development</Link></li>
            <li><Link to="/category/javascript">JavaScript</Link></li>
            <li><Link to="/category/react">React & Next.js</Link></li>
            <li><Link to="/category/backend">Backend & APIs</Link></li>
            <li><Link to="/category/life">Life & Productivity</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
     
            <li><Link to="/write">Write a Blog</Link></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900">Stay Updated</h4>
          <p className="text-sm mb-3">Get the latest blogs straight to your inbox.</p>
          <form className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="border-t border-gray-300 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} DevBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
