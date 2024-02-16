import mongoose from "mongoose";
import bcrypt from "bcrypt";

const paySchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Types.ObjectId,
      ref: "Booking",
    },
    nameOnCard: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
      set: (value) => bcrypt.hashSync(value, 10),
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
      set: (value) => bcrypt.hashSync(value, 10),
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paySchema);
