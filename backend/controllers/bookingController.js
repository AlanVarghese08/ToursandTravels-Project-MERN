import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "Your tour is booked",
      data: savedBooking,
    });
  } catch (err) {
    res.status(200).json({ success: false, message: "internal server error" });
  }
};

export const getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Booking.findById(id);

    res.status(200).json({
      success: true,
      message: "successfull",
      data: book,
    });
  } catch (err) {
    res.status(404).json({
      success: true,
      message: "not found",
    });
  }
};
export const getBookingsByUserId = async (req, res) => {
  const userId = req.params.id.trim();
  try {
    const bookings = await Booking.find({ userId: userId });

    res.status(200).json({
      success: true,
      message: "Successfully retrieved user bookings",
      data: bookings,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
      error: err.message,
    });
  }
};

export const getAllBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const books = await Booking.find(id);

    res.status(200).json({
      success: true,
      count: books.length,
      message: "successfull",
      data: books,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: "Internal server error",
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body; // Assuming the new status is passed in the request body

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!updatedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, data: updatedBooking });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
