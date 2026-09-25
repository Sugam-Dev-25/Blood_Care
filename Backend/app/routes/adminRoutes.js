const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
  "/hospitals",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getAllHospitals
);

router.put(
  "/hospitals/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.updateHospitalStatus
);

router.get(
  "/donors",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getAllDonors
);

router.get(
  "/donor-profiles",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getAllDonorProfiles
);

router.put(
  "/donors/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.updateDonorStatus
);

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getDashboardStats
);

module.exports = router;