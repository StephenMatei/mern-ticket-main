import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiShoppingCart } from "react-icons/hi";
import { Footer } from "../../components";

// Temporary mock data (replace with API call later)
const events = [
  {
    slug: "raisa-live-concert",
    title: "Raisa Live Concert",
    artist: "Raisa",
    date: "June 18, 2023, 19:00 WIB",
    venue: "GBK Main Stadium",
    image:
      "https://res.cloudinary.com/du541igfh/image/upload/v1686241499/Blog%20Portfolio%20Gilbert/Project/mern-ticket/eventImg_nt6div.png",
    description: `Raisa event will take place at the Gelora Bung Karno Main Stadium. 
    Raisa invited collaborators & special guests to participate. Expect stunning stage productions & visuals.`,
    ticketTypes: [
      { id: 1, name: "Regular", price: 30 },
      { id: 2, name: "VIP", price: 80 },
      { id: 3, name: "VVIP", price: 150 },
    ],
  },
  {
    slug: "comedy-nights-trevor",
    title: "Comedy Nights with Trevor",
    artist: "Trevor Noah",
    date: "July 10, 2023, 20:00 WIB",
    venue: "Nairobi Arena",
    image:
      "https://images.unsplash.com/photo-1581322336688-d60293b5d7e3?auto=format&fit=crop&w=1200&q=800",
    description: `A night of laughter with Trevor Noah. Exclusive stand-up show at Nairobi Arena.`,
    ticketTypes: [
      { id: 1, name: "Standard", price: 25 },
      { id: 2, name: "Premium", price: 50 },
    ],
  },
];

const EventDetail = () => {
  const { slug } = useParams();
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return (
      <div className="pt-20 text-center text-gray-600 dark:text-gray-400">
        <p>Event not found.</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[60vh]">
        <img
          src={event.image}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg"
          >
            {event.title}
          </motion.h1>
          <p className="mt-3 text-lg text-gray-200">
            {event.date} • {event.venue}
          </p>
        </div>
      </section>

      {/* Content + Ticket Selector */}
      <section className="py-12 px-4 md:px-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: About */}
          <div className="lg:col-span-2">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold mb-4 text-gray-900 dark:text-white"
            >
              About the Event
            </motion.h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              {event.description}
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Location
            </h3>
            <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
              {/* Placeholder for Google Maps embed */}
              <iframe
                title="event-location"
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!..."
                loading="lazy"
              ></iframe>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
              Reviews
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Reviews feature coming soon.
            </p>
          </div>

          {/* Right: Ticket Selector */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24 h-fit"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Tickets
            </h3>
            <div className="space-y-3">
              {event.ticketTypes.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2"
                >
                  <span className="text-gray-800 dark:text-gray-300">
                    {ticket.name}
                  </span>
                  <span className="font-bold text-indigo-600">
                    ${ticket.price}
                  </span>
                </div>
              ))}
            </div>
            <Link to="/new-ticket">
              <button className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition">
                <span>Buy Ticket</span>
                <HiShoppingCart />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default EventDetail;
