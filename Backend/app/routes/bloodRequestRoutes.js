const express = require("express");
const router = express.Router();

const bloodRequestController = require("../controllers/bloodRequestController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Hospital - Create blood request
router.post(
  "/",
  authMiddleware,
  roleMiddleware("hospital"),
  bloodRequestController.createRequest,
);

// Hospital - Get own requests
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("hospital"),
  bloodRequestController.getMyRequests,
);

// Admin - Get all blood requests
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  bloodRequestController.getAllRequests,
);

// Admin - Approve or Reject Blood Request
router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  bloodRequestController.updateRequestStatus
);

module.exports = router;
