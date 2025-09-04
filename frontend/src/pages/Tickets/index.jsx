import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTickets } from "../../features/tickets/ticketSlice";
import { BiSearch } from "react-icons/bi";
import { Loader, Footer } from "../../components";
import { FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Tickets() {
  const { tickets } = useSelector((state) => state.tickets);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (!tickets) {
    return <Loader />;
  }

  return (
    <>
      <div className="rounded-sm border border-stroke px-5 pt-20 pb-4 shadow-default sm:px-7.5 xl:pb-1 mt-6 parent my-20">
        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition"
          >
            ← Back
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex justify-between items-center mt-4 flex-col md:flex-row md:justify-between">
          <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Type to search.."
              className="w-full rounded-lg border border-stroke bg-white py-2 pl-10 pr-4 font-medium outline-none transition focus:border-primary active:border-primary text-gray-700"
            />
            <span className="absolute left-3 top-2.5 text-xl text-gray-500">
              <BiSearch />
            </span>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="max-w-full overflow-x-auto py-4">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-center">
                <th className="py-4 px-4 font-medium text-gray-700">Date</th>
                <th className="py-4 px-4 font-medium text-gray-700">Name</th>
                <th className="py-4 px-4 font-medium text-gray-700">Email</th>
                <th className="py-4 px-4 font-medium text-gray-700">Phone</th>
                <th className="py-4 px-4 font-medium text-gray-700">Seating</th>
                <th className="py-4 px-4 font-medium text-gray-700">Payment</th>
                <th className="py-4 px-4 font-medium text-gray-700">Status</th>
                <th className="py-4 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr className="text-center" key={ticket._id}>
                  <td className="border-b border-accent py-5 px-4">
                    <span className="text-gray-800">
                      {new Date(ticket.createdAt).toLocaleString("en-US")}
                    </span>
                  </td>
                  <td className="border-b border-accent py-5 px-4">
                    <span className="text-gray-800">{ticket.name}</span>
                  </td>
                  <td className="border-b border-accent py-5 px-4">
                    <span className="text-gray-800">{ticket.email}</span>
                  </td>
                  <td className="border-b border-accent py-5 px-4">
                    <span className="text-gray-800">{ticket.phone}</span>
                  </td>
                  <td className="border-b border-accent py-5 px-4">
                    <span className="text-gray-800">{ticket.seating}</span>
                  </td>
                  <td className="border-b border-accent py-5 px-4">
                    <span className="text-gray-800">{ticket.payment}</span>
                  </td>
                  <td className="border-b border-accent py-5 px-4">
                    <div
                      className={`inline-block rounded-full px-4 py-1 text-white font-medium ${
                        ticket.status === "new"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {ticket.status}
                    </div>
                  </td>
                  <td className="border-b border-accent py-5 px-4">
                    <Link
                      to={`/ticket/${ticket._id}`}
                      className="flex justify-center"
                    >
                      <button className="p-2 rounded-lg hover:bg-gray-200 transition">
                        <FaRegEye className="text-indigo-600 text-2xl" />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Tickets;
