const express = require("express");

const router = express.Router();

const donorController = require("../controllers/donorController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/profile",
  authMiddleware,
  roleMiddleware("donor"),
  donorController.createProfile
);

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("donor"),
  donorController.getMyProfile
);

router.put(
  "/profile",
  authMiddleware,
  roleMiddleware("donor"),
  donorController.updateProfile
);

router.get(
  "/eligibility",
  authMiddleware,
  roleMiddleware("donor"),
  donorController.checkEligibility
);

module.exports = router;