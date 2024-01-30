import express from "express";
import { createReview } from "../controllers/reviewController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
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
router.get("/userbookings/:id", getBookingsByUserId);
router.patch("/:id", updateBookingStatus);
router.get("/", getAllBooking);
router.delete("/:id", deleteBooking);

export default router;
