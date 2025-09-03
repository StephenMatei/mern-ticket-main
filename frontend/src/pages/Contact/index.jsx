import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MdSend, MdEmail } from "react-icons/md";
import {
  FaPhoneAlt,
  FaLocationArrow,
  FaLinkedin,
  FaTwitterSquare,
  FaInstagramSquare,
} from "react-icons/fa";
import { BottomLine, Footer } from "../../components";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Load socials from env
  const linkedin = import.meta.env.VITE_LINKEDIN_URL || "#";
  const twitter = import.meta.env.VITE_TWITTER_URL || "#";
  const instagram = import.meta.env.VITE_INSTAGRAM_URL || "#";

  const handleSend = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        toast.success("Message sent successfully!");
        e.target.reset();
      })
      .catch(() => toast.error("Failed to send. Try again later."))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-indigo-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="mb-12 text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <h3 className="text-indigo-500 uppercase tracking-widest text-sm mb-2">
              Get In Touch
            </h3>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
              Contact <span className="text-indigo-600 dark:text-indigo-400">Us</span>
            </h1>
            <BottomLine />
          </motion.div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-10"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Send a Message
              </h2>
              <form ref={form} onSubmit={handleSend} className="space-y-5">
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  className="text-white input-field w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  className="text-white input-field w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  required
                />
                <input
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  className="text-white input-field w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  required
                />
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  className="text-white input-field w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition duration-300 shadow-lg"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send <MdSend />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Right: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col justify-center space-y-8"
            >
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-2xl text-indigo-500" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  +254 712 345 678
                </span>
              </div>
              <div className="flex items-center gap-4">
                <MdEmail className="text-2xl text-indigo-500" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  support@tikons.com
                </span>
              </div>
              <div className="flex items-center gap-4">
                <FaLocationArrow className="text-2xl text-indigo-500" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Nairobi, Kenya
                </span>
              </div>

              <div className="flex gap-6 mt-6">
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-3xl text-indigo-600 hover:scale-110 hover:text-indigo-800 dark:hover:text-indigo-400 transition-transform duration-300"
                >
                  <FaLinkedin />
                </a>
                <a
                  href={twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="text-3xl text-indigo-600 hover:scale-110 hover:text-indigo-800 dark:hover:text-indigo-400 transition-transform duration-300"
                >
                  <FaTwitterSquare />
                </a>
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-3xl text-indigo-600 hover:scale-110 hover:text-indigo-800 dark:hover:text-indigo-400 transition-transform duration-300"
                >
                  <FaInstagramSquare />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer only if not homepage */}
      {!isHomePage && <Footer />}
    </>
  );
};

export default Contact;
