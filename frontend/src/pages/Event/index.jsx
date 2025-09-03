// path: src/pages/Event.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { HiShoppingCart } from "react-icons/hi";
import { RiFolderInfoFill } from "react-icons/ri";
import { BottomLine, Footer } from "../../components";

// Temporary mock data (replace with API call later)
const events = [
  {
    id: 1,
    title: "Raisa Live Concert",
    artist: "Raisa",
    date: "June 18, 2023, 19:00 WIB",
    venue: "GBK Main Stadium",
    image:
      "https://res.cloudinary.com/du541igfh/image/upload/v1686241499/Blog%20Portfolio%20Gilbert/Project/mern-ticket/eventImg_nt6div.png",
    slug: "raisa-live-concert",
  },
  {
    id: 2,
    title: "Comedy Nights with Trevor",
    artist: "Trevor Noah",
    date: "July 10, 2023, 20:00 WIB",
    venue: "Nairobi Arena",
    image:
      "https://images.unsplash.com/photo-1581322336688-d60293b5d7e3?auto=format&fit=crop&w=800&q=80",
    slug: "comedy-nights-trevor",
  },
  {
    id: 3,
    title: "Summer Vibes Festival",
    artist: "Various Artists",
    date: "August 2, 2023, 14:00 WIB",
    venue: "Beachfront Park",
    image:
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=80",
    slug: "summer-vibes-festival",
  },
  {
    id: 4,
    title: "AfroBeats Explosion",
    artist: "Burna Boy",
    date: "August 18, 2023, 19:00 WIB",
    venue: "Kasarani Stadium",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    slug: "afrobeats-explosion",
  },
  {
    id: 5,
    title: "Rock Legends Night",
    artist: "Linkin Park",
    date: "September 10, 2023, 19:00 WIB",
    venue: "Wembley Arena",
    image:
      "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=800&q=80",
    slug: "rock-legends-night",
  },
  {
    id: 6,
    title: "Jazz & Soul Evening",
    artist: "Adele",
    date: "September 22, 2023, 19:00 WIB",
    venue: "Royal Albert Hall",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    slug: "jazz-soul-evening",
  },
  {
    id: 7,
    title: "Cultural Fusion Fest",
    artist: "Various Artists",
    date: "October 5, 2023, 15:00 WIB",
    venue: "Uhuru Park",
    image:
      "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=800&q=80",
    slug: "cultural-fusion-fest",
  },
];

const Event = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Limit events on homepage to 6
  const displayedEvents = isHomePage ? events.slice(0, 6) : events;

  return (
    <>
      <section className="py-24 px-4 md:px-12 bg-gradient-to-b from-indigo-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="mb-12 text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <h3 className="text-indigo-500 uppercase tracking-widest text-sm mb-2">
              Don’t Miss Out
            </h3>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
              Upcoming{" "}
              <span className="text-indigo-600 dark:text-indigo-400">Events</span>
            </h1>
            <BottomLine />
          </motion.div>

          {/* Event Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition transform hover:-translate-y-2 duration-500"
              >
                {/* Event Image */}
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    {event.date.split(",")[0]}
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6 pb-28">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {event.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    {event.artist}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {event.venue}
                  </p>
                </div>

                {/* Action Buttons fixed at bottom */}
                <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col sm:flex-row gap-3 bg-white dark:bg-gray-800">
                  <Link
                    to={`/events/${event.slug}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl 
                    bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold 
                    transition shadow-md dark:bg-indigo-800 dark:hover:bg-indigo-700 dark:text-white"
                  >
                    Buy Ticket <HiShoppingCart className="text-lg" />
                  </Link>

                  <Link
                    to={`/events/${event.slug}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl 
                    bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium 
                    transition shadow-md dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                  >
                    View Event <RiFolderInfoFill className="text-lg" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* More Button (only on homepage) */}
          {isHomePage && events.length > 6 && (
            <div className="mt-12 text-center">
              <Link to="/event">
                <button className="px-8 py-4 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-all shadow-md hover:shadow-xl">
                  View More Events →
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer only if not homepage */}
      {!isHomePage && <Footer />}
    </>
  );
};

export default Event;
