const express = require("express");
const router = express.Router();

const donationController = require("../controllers/donationController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Admin - Record Donation
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  donationController.recordDonation
);
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("donor"),
  donationController.getMyDonations
);

module.exports = router;