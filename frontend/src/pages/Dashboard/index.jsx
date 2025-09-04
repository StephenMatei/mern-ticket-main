// path: frontend/src/pages/dashboard/Dashboard.jsx
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import { Footer } from "../../components";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  // Reusable primary button style (no Shared.css)
  const btnPrimary =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full " +
    "bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold " +
    "shadow-lg transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 " +
    "hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus:outline-none " +
    "focus-visible:ring-2 focus-visible:ring-indigo-500 !text-white"; // keep text visible

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-8 text-center text-primary">
        <h1 className="text-3xl font-bold">
          Welcome {user?.name || "Guest"} 👋
        </h1>
        <p className="text-accent mt-2">Manage your tickets & events below</p>
      </section>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12 px-4">
        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <h3 className="text-xl font-semibold text-primary">Tickets</h3>
          <p className="text-gray-600">3 Purchased</p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <h3 className="text-xl font-semibold text-primary">Active</h3>
          <p className="text-gray-600">2 Ongoing</p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <h3 className="text-xl font-semibold text-primary">Closed</h3>
          <p className="text-gray-600">5 Completed</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20 px-4">
        {/* Create Ticket (unchanged look, now inlined Tailwind) */}
        <Link to="/new-ticket" className={btnPrimary}>
          <span>Create Ticket</span>
          <FaQuestionCircle className="shrink-0" />
        </Link>

        {/* View My Tickets (now identical style) */}
        <Link to="/tickets" className={btnPrimary}>
          <span>View My Tickets</span>
          <FaTicketAlt className="shrink-0" />
        </Link>
      </div>

      {/* Upcoming Events */}
      <div className="max-w-5xl mx-auto mb-24 px-4">
        <h2 className="text-2xl font-bold text-primary mb-6">Upcoming Events</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="font-semibold text-lg">Raisa Live Concert</h3>
            <p className="text-gray-600">Sep 20, 2025</p>
            <Link to="/events/1" className={`${btnPrimary} mt-4 w-full`}>
              Buy Ticket
            </Link>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="font-semibold text-lg">Indie Music Fest</h3>
            <p className="text-gray-600">Oct 5, 2025</p>
            <Link to="/events/2" className={`${btnPrimary} mt-4 w-full`}>
              Buy Ticket
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pb-20">
        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
