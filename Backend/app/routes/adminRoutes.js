const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const auditMiddleware = require("../middleware/auditMiddleware");

router.get(
  "/hospitals",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getAllHospitals,
);

router.put(
  "/hospitals/:id/status",
  authMiddleware,
  roleMiddleware("admin"),

  auditMiddleware({
    action: "UPDATE_HOSPITAL_STATUS",
    resource: "Hospital",

    getResourceId: (req) => req.params.id,

    getDescription: (req, data) => data?.message || "Hospital status updated",
  }),

  adminController.updateHospitalStatus,
);

router.get(
  "/donors",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getAllDonors,
);

router.get(
  "/donor-profiles",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getAllDonorProfiles,
);

router.put(
  "/donors/:id/status",
  authMiddleware,
  roleMiddleware("admin"),

  auditMiddleware({
    action: (req) =>
      req.body.status === "active"
        ? "ACTIVATE_DONOR"
        : "DEACTIVATE_DONOR",

    resource: "Donor",

    getResourceId: (req) => req.params.id,

    getDescription: (req, data) =>
      data?.message || "Donor status updated",
  }),

  adminController.updateDonorStatus,
);

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getDashboardStats,
);

router.get(
  "/audit-logs",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getAuditLogs,
);

module.exports = router;
