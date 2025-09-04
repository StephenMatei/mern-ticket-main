import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, closeTicket } from "../../features/tickets/ticketSlice";
import { getNotes, createNote } from "../../features/notes/noteSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Footer, Loader, NoteItem } from "../../components";

const customStyles = {
  content: {
    width: "600px",
    maxWidth: "90%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "12px",
    padding: "24px",
  },
};

Modal.setAppElement("#root");

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { ticket } = useSelector((state) => state.tickets);
  const { notes } = useSelector((state) => state.notes);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticketId } = useParams();

  useEffect(() => {
    dispatch(getTicket(ticketId)).unwrap().catch(toast.error);
    dispatch(getNotes(ticketId)).unwrap().catch(toast.error);
  }, [ticketId, dispatch]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
      .unwrap()
      .then(() => {
        toast.success("Ticket Closed");
        navigate("/tickets");
      })
      .catch(toast.error);
  };

  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }))
      .unwrap()
      .then(() => {
        setNoteText("");
        closeModal();
      })
      .catch(toast.error);
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (!ticket) {
    return <Loader />;
  }

  return (
    <>
      <div className="max-w-4xl mx-auto pt-24 pb-20 px-4">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition"
        >
          ← Back
        </button>

        {/* Ticket details */}
        <div className="bg-white shadow-md rounded-2xl p-6 relative">
          {/* Status badge */}
          <span
            className={`absolute top-6 right-6 px-3 py-1 rounded-full text-white text-sm font-medium ${
              ticket.status === "new" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {ticket.status}
          </span>

          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Ticket ID: {ticket._id}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p>
              <span className="font-medium">Date Submitted:</span>{" "}
              {new Date(ticket.createdAt).toLocaleString("en-US")}
            </p>
            <p>
              <span className="font-medium">Seating:</span> {ticket.seating}
            </p>
            <p>
              <span className="font-medium">Payment:</span> {ticket.payment}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-gray-800 mb-1">
              Description of Issue:
            </h3>
            <p className="text-gray-600">{ticket.description}</p>
          </div>
        </div>

        {/* Notes section */}
        <div className="bg-white shadow-md rounded-2xl p-6 mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Notes</h2>
            {ticket.status !== "closed" && (
              <button
                onClick={openModal}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition"
              >
                <FaPlus /> Add Note
              </button>
            )}
          </div>

          {Array.isArray(notes) && notes.length > 0 ? (
            <div className="space-y-3">
              {notes.map((note) => (
                <NoteItem key={note._id} note={note} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No notes yet</p>
          )}
        </div>

        {/* Close button */}
        {ticket.status !== "closed" && (
          <div className="flex justify-end mt-6">
            <button
              onClick={onTicketClose}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
            >
              Close Ticket
            </button>
          </div>
        )}

        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add Note"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Add Note</h2>
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
              ✕
            </button>
          </div>
          <form onSubmit={onNoteSubmit} className="space-y-4">
            <textarea
              name="noteText"
              id="noteText"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 outline-none"
              placeholder="Note text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition"
            >
              Submit
            </button>
          </form>
        </Modal>
      </div>
      <Footer />
    </>
  );
}

export default Ticket;
