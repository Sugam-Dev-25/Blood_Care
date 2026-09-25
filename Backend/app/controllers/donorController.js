const DonorProfile = require("../models/DonorProfile");

class DonorController {
  createProfile = async (req, res) => {
    try {
      const { bloodGroup, dob, lastDonationDate, medicalNotes } = req.body;

      if (!bloodGroup || !dob) {
        return res.status(400).json({
          success: false,
          message: "Blood group and date of birth are required",
        });
      }

      const existingProfile = await DonorProfile.findOne({
        userId: req.user.id,
      });

      if (existingProfile) {
        return res.status(400).json({
          success: false,
          message: "Donor profile already exists",
        });
      }

      const donorProfile = await DonorProfile.create({
        userId: req.user.id,
        bloodGroup,
        dob,
        lastDonationDate: lastDonationDate || null,
        medicalNotes: medicalNotes || "",
      });

      res.status(201).json({
        success: true,
        message: "Donor profile created successfully",
        donorProfile,
      });
    } catch (error) {
      console.error("Create Donor Profile Error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

  getMyProfile = async (req, res) => {
    try {
      const donorProfile = await DonorProfile.findOne({
        userId: req.user.id,
      }).populate("userId", "name email phone");

      if (!donorProfile) {
        return res.status(404).json({
          success: false,
          message: "Donor profile not found",
        });
      }

      res.status(200).json({
        success: true,
        donorProfile,
      });
    } catch (error) {
      console.error("Get Donor Profile Error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

  updateProfile = async (req, res) => {
    try {
      const { bloodGroup, dob, lastDonationDate, medicalNotes } = req.body;

      const donorProfile = await DonorProfile.findOne({
        userId: req.user.id,
      });

      if (!donorProfile) {
        return res.status(404).json({
          success: false,
          message: "Donor profile not found",
        });
      }

      if (bloodGroup) {
        donorProfile.bloodGroup = bloodGroup;
      }

      if (dob) {
        donorProfile.dob = dob;
      }

      if (lastDonationDate !== undefined) {
        donorProfile.lastDonationDate = lastDonationDate;

        if (lastDonationDate) {
          const eligibilityDate = new Date(lastDonationDate);

          eligibilityDate.setDate(eligibilityDate.getDate() + 90);

          donorProfile.eligibilityDate = eligibilityDate;
        } else {
          donorProfile.eligibilityDate = null;
        }
      }

      if (medicalNotes !== undefined) {
        donorProfile.medicalNotes = medicalNotes;
      }

      await donorProfile.save();

      res.status(200).json({
        success: true,
        message: "Donor profile updated successfully",
        donorProfile,
      });
    } catch (error) {
      console.error("Update Donor Profile Error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

  checkEligibility = async (req, res) => {
    try {
      const donor = await DonorProfile.findOne({
        userId: req.user.id,
      });

      if (!donor) {
        return res.status(404).json({
          success: false,
          message: "Donor profile not found",
        });
      }

      if (donor.status !== "active") {
        return res.status(403).json({
          success: false,
          message: "Donor account is deactivated",
        });
      }

      const today = new Date();

      let eligible = true;

      if (donor.eligibilityDate) {
        eligible = today >= new Date(donor.eligibilityDate);
      }

      res.status(200).json({
        success: true,
        eligible,
        eligibilityDate: donor.eligibilityDate,
        message: eligible
          ? "Donor is eligible to donate blood"
          : "Donor is not eligible to donate blood yet",
      });
    } catch (error) {
      console.error("Check Donor Eligibility Error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
}

module.exports = new DonorController();
