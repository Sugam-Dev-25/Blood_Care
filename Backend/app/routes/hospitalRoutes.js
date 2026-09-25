const express = require("express");

const router = express.Router();

const hospitalController = require("../controllers/hospitalController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/profile",
  authMiddleware,
  roleMiddleware("hospital"),
  hospitalController.createProfile
);

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("hospital"),
  hospitalController.getMyProfile
);

module.exports = router;