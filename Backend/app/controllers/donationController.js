const Donation = require("../models/Donation");
const DonorProfile = require("../models/DonorProfile");
const BloodInventory = require("../models/BloodInventory");

class DonationController {
  // Record Donation
  recordDonation = async (req, res) => {
    try {
      const { donorId, donationDate, notes } = req.body;

      if (!donorId || !donationDate) {
        return res.status(400).json({
          success: false,
          message: "Donor ID and donation date are required",
        });
      }

      // Find donor
      const donor = await DonorProfile.findById(donorId);

      if (!donor) {
        return res.status(404).json({
          success: false,
          message: "Donor not found",
        });
      }

      // Check donor status
      if (donor.status !== "active") {
        return res.status(400).json({
          success: false,
          message: "Donor is not active",
        });
      }

      // Create donation record
      const donation = await Donation.create({
        donorId: donor._id,
        bloodGroup: donor.bloodGroup,
        units: 1,
        donationDate,
        notes: notes || "",
      });

      // Update donor information
      donor.totalDonations += 1;
      donor.lastDonationDate = donationDate;

      const eligibilityDate = new Date(donationDate);

      eligibilityDate.setDate(eligibilityDate.getDate() + 90);

      donor.eligibilityDate = eligibilityDate;

      await donor.save();

      // Find blood inventory
      let blood = await BloodInventory.findOne({
        bloodGroup: donor.bloodGroup,
      });

      // If blood group does not exist, create it
      if (!blood) {
        blood = await BloodInventory.create({
          bloodGroup: donor.bloodGroup,
          units: 1,
        });
      } else {
        blood.units += 1;
        await blood.save();
      }

      res.status(201).json({
        success: true,
        message: "Donation recorded successfully",
        donation,
        donor,
        inventory: blood,
      });
    } catch (error) {
      console.error("Record Donation Error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
  getMyDonations = async (req, res) => {
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

      const donations = await Donation.find({
        donorId: donor._id,
      }).sort({ donationDate: -1 });

      res.status(200).json({
        success: true,
        donations,
      });
    } catch (error) {
      console.error("Get My Donations Error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
}

module.exports = new DonationController();
