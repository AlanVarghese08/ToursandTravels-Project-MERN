import express from "express";
import {
  createBooking,
  getAllBooking,
  getBooking,
  updateBookingStatus,
  deleteBooking,
  getBookingsByUserId,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/:id", getBookingsByUserId);
router.patch("/:id", updateBookingStatus);
router.get("/", getAllBooking);
router.delete("/:id", deleteBooking);

export default router;
