import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-xl font-bold text-indigo-600">Sammy-Kioko Events</h2>
          <p className="mt-3 text-gray-600 text-sm">
            Your trusted platform for concerts, comedy shows, cultural festivals,
            and unforgettable experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-gray-600 text-sm">
            <li>
              <a href="/about" className="hover:text-indigo-600 transition">About</a>
            </li>
            <li>
              <a href="/event" className="hover:text-indigo-600 transition">Events</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-indigo-600 transition">Contact</a>
            </li>
            <li>
              <a href="/register" className="hover:text-indigo-600 transition">Register</a>
            </li>
            <li>
              <a href="/login" className="hover:text-indigo-600 transition">Login</a>
            </li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Get in Touch</h3>
          <p className="mt-3 text-gray-600 text-sm">📍 Nairobi, Kenya</p>
          <p className="text-gray-600 text-sm">📞 +254 700 123 456</p>
          <p className="text-gray-600 text-sm">📧 support@sammykiokoevents.com</p>

          {/* Social Media */}
          <div className="flex gap-4 mt-4 text-gray-500">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-100 py-4">
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Sammy-Kioko Events. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
