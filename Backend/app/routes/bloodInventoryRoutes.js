const express = require("express");
const router = express.Router();

const bloodInventoryController = require("../controllers/bloodInventoryController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Add blood inventory - Admin only
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
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
  bloodInventoryController.updateUnits
);

module.exports = router;