const express = require("express");
const router = express.Router();

const donationController = require("../controllers/donationController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const auditMiddleware = require("../middleware/auditMiddleware");

// Admin - Record Donation
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),

  auditMiddleware({
    action: "RECORD_DONATION",
    resource: "Donation",

    getResourceId: (req, data) =>
      data?.donation?._id || null,

    getDescription: (req, data) =>
      data?.message || "Donation recorded successfully",
  }),

  donationController.recordDonation
);
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("donor"),
  donationController.getMyDonations
);

module.exports = router;