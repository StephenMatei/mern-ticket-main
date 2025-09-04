// path: backend/models/ticketModel.js
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    seating: {
      type: String,
      required: [true, "Please select a seating"],
      enum: ["Platinum", "Gold", "Silver", "Reguler"],
    },
    payment: {
      type: String,
      required: [true, "Please select a payment"],
      enum: ["Bank BRI", "Bank BCA", "Gopay", "Dana"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description of the issue"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
