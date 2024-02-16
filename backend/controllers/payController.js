import Payment from "../models/Payment.js";

export const createPayment = async (req, res) => {
  const newPayment = new Payment(req.body);
  try {
    const savedPayment = await newPayment.save();
    res.status(200).json({
      success: true,
      message: "Payment created successfully",
      data: savedPayment,
    });
  } catch (err) {
    console.error("Error saving payment:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
