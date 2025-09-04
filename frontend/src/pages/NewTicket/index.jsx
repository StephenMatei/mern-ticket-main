import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket } from "../../features/tickets/ticketSlice";
import { Footer } from "../../components";

function NewTicket() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [seating, setSeating] = useState("Platinum");
  const [payment, setPayment] = useState("Bank BRI");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !description) {
      toast.error("Please fill in all required fields");
      return;
    }

    dispatch(createTicket({ name, email, phone, seating, payment, description }))
      .unwrap()
      .then(() => {
        navigate("/tickets");
        toast.success("Ticket successfully created!");
      })
      .catch(toast.error);
  };

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-8 text-center text-indigo-700">
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition"
          >
            ← Back
          </button>
        </div>
        <h1 className="text-3xl font-bold">Buy Ticket</h1>
        <p className="text-gray-500 mt-2">Fill out the form below to book your ticket</p>
      </section>

      {/* Form */}
      <section className="max-w-xl mx-auto px-6 mb-16">
        <form
          onSubmit={onSubmit}
          className="bg-white shadow-md rounded-2xl p-8 space-y-6"
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              placeholder="e.g. +254 700 123 456"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Seating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Seating</label>
            <select
              value={seating}
              onChange={(e) => setSeating(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Platinum">Platinum</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Reguler">Reguler</option>
            </select>
          </div>

          {/* Payment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Bank BRI">Bank BRI</option>
              <option value="Bank BCA">Bank BCA</option>
              <option value="Gopay">Gopay</option>
              <option value="Dana">Dana</option>
            </select>
          </div>

          {/* Notes / Additional Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes / Additional Info</label>
            <textarea
              placeholder="Any details you want to add"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
            >
              Submit
            </button>
          </div>
        </form>
      </section>

      <Footer />
    </>
  );
}

export default NewTicket;
