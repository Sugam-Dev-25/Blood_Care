const express = require("express");
const router = express.Router();

const bloodInventoryController = require("../controllers/bloodInventoryController");
const BloodInventory = require("../models/BloodInventory");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const auditMiddleware = require("../middleware/auditMiddleware");

// Add blood inventory - Admin only
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),

  auditMiddleware({
    action: "ADD_BLOOD_INVENTORY",
    resource: "BloodInventory",

    getResourceId: async (req, data) => {
      const blood = await BloodInventory.findOne({
        bloodGroup: req.body.bloodGroup,
      });

      return blood?._id || null;
    },

    getDescription: (req, data) =>
      data?.message || "Blood inventory added successfully",
  }),

  bloodInventoryController.addBlood
);

// Get all blood inventory - Logged in users
router.get(
  "/",
  authMiddleware,
  bloodInventoryController.getInventory
);

// Update blood units - Admin only
router.put(
  "/:bloodGroup",
  authMiddleware,
  roleMiddleware("admin"),

  auditMiddleware({
    action: "UPDATE_BLOOD_INVENTORY",
    resource: "BloodInventory",

    getResourceId: async (req, data) => {
      const blood = await BloodInventory.findOne({
        bloodGroup: req.params.bloodGroup,
      });

      return blood?._id || null;
    },

    getDescription: (req, data) =>
      data?.message || "Blood inventory updated successfully",
  }),

  bloodInventoryController.updateUnits
);

module.exports = router;