const express = require("express");
const router = express.Router();

const donorController = require("../controllers/donorController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const auditMiddleware = require("../middleware/auditMiddleware");

// Donor Profile Create - Donor only
router.post(
  "/profile",
  authMiddleware,
  roleMiddleware("donor"),

  auditMiddleware({
    action: "CREATE_DONOR_PROFILE",
    resource: "Donor",

    getResourceId: async (req, data) => {
      const Donor = require("../models/Donor");

      const donor = await Donor.findOne({
        userId: req.user.id,
      });

      return donor?._id || null;
    },

    getDescription: (req, data) =>
      data?.message || "Donor profile created successfully",
  }),

  donorController.createProfile
);

// Get My Profile
router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("donor"),
  donorController.getMyProfile
);

// Donor Profile Update - Donor only
router.put(
  "/profile",
  authMiddleware,
  roleMiddleware("donor"),

  auditMiddleware({
    action: "UPDATE_DONOR_PROFILE",
    resource: "Donor",

    getResourceId: async (req, data) => {
      const Donor = require("../models/Donor");

      const donor = await Donor.findOne({
        userId: req.user.id,
      });

      return donor?._id || null;
    },

    getDescription: (req, data) =>
      data?.message || "Donor profile updated successfully",
  }),

  donorController.updateProfile
);

// Check Donor Eligibility
router.get(
  "/eligibility",
  authMiddleware,
  roleMiddleware("donor"),
  donorController.checkEligibility
);

module.exports = router;