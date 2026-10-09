const express = require("express");
const router = express.Router();

const hospitalController = require("../controllers/hospitalController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const auditMiddleware = require("../middleware/auditMiddleware");

// Create Hospital Profile - Hospital only
router.post(
  "/profile",
  authMiddleware,
  roleMiddleware("hospital"),

  auditMiddleware({
    action: "CREATE_HOSPITAL_PROFILE",
    resource: "Hospital",

    getResourceId: async (req, data) => {
      const Hospital = require("../models/Hospital");

      const hospital = await Hospital.findOne({
        userId: req.user.id,
      });

      return hospital?._id || null;
    },

    getDescription: (req, data) =>
      data?.message || "Hospital profile created successfully",
  }),

  hospitalController.createProfile
);

// Get Hospital Profile
router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("hospital"),
  hospitalController.getMyProfile
);

module.exports = router;