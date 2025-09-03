import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { RiFolderInfoFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { SecondaryBtn } from "../..";

// Mock Cloudinary media URLs (replace with API fetch later)
const slides = [
  { type: "image", url: "https://res.cloudinary.com/demo/image/upload/v1686241499/event1.jpg" },
  { type: "image", url: "https://res.cloudinary.com/demo/image/upload/v1686241499/event2.jpg" },
  { type: "video", url: "https://res.cloudinary.com/demo/video/upload/v1686241499/event3.mp4" },
];

// Mock dynamic text from Admin (replace with API fetch later)
const adminContent = {
  title: "Sammy-Kioko Events",
  highlights: [
    "Raisa Live Concert",
    "GBK Main Stadium",
    "June 18, 2023, 19:00 WIB",
  ],
  description:
    "Finally here! Sammy-Kioko Events brings you unforgettable live experiences. Get ready for concerts, comedy shows, and more — brought closer to you.",
};

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slideshow auto change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // change every 5 sec
    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      {/* Background */}
      {slide.type === "image" ? (
        <img
          src={slide.url}
          alt="Event Slide"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      ) : (
        <video
          src={slide.url}
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      {/* Banner Content */}
      <motion.div
        className="relative z-10 text-center text-white px-6 md:px-12 max-w-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">{adminContent.title}</h1>

        <TypeAnimation
          className="text-2xl md:text-3xl font-bold mb-6"
          sequence={adminContent.highlights.flatMap((item) => [item, 2000])}
          wrapper="div"
          cursor={true}
          repeat={Infinity}
        />

        <p className="mb-8 text-lg md:text-xl">{adminContent.description}</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold transition shadow-lg"
          >
            Buy Ticket <HiShoppingCart />
          </Link>

          <Link to="/event">
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-black font-medium transition shadow-md"
            >
              View Event <RiFolderInfoFill />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;
