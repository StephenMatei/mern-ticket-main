// path: src/pages/About/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { BottomLine, Footer } from "../../components";
import { useLocation } from "react-router-dom";

const About = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <section className="py-24 px-6 md:px-12 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="mb-12 text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <h3 className="text-indigo-500 uppercase tracking-widest text-sm mb-2">
              About Us
            </h3>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900">
              Sammy-Kioko <span className="text-indigo-600">Events</span>
            </h1>
            <BottomLine />
          </motion.div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                Welcome to <span className="font-bold text-indigo-600">Sammy-Kioko Events</span>, 
                your trusted platform for unforgettable experiences. We specialize in 
                connecting fans with their favorite celebrities, organizing world-class 
                events, and making ticketing seamless and accessible for everyone.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether it’s live concerts, comedy nights, cultural festivals, or exclusive 
                meet-and-greets, we bring people together through entertainment. 
                Our mission is simple: <span className="italic">create memories that last a lifetime.</span>
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                With Sammy-Kioko Events, you’ll always stay updated on the latest shows, 
                buy tickets securely, and enjoy a smooth event experience from start to finish.
              </p>
            </motion.div>

            {/* Right: Image/Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <img
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80"
                alt="Sammy-Kioko Events"
                className="rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
            </motion.div>
          </div>

          {/* Why Choose Us */}
          <motion.div
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                Seamless Ticketing
              </h3>
              <p className="text-gray-600">
                Easy and secure booking for all your favorite events.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                World-Class Events
              </h3>
              <p className="text-gray-600">
                From concerts to festivals, experience unforgettable entertainment.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                Celebrity Access
              </h3>
              <p className="text-gray-600">
                Get closer to your favorite stars with exclusive meet-and-greets.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer only if not homepage */}
      {!isHomePage && <Footer />}
    </>
  );
};

export default About;
