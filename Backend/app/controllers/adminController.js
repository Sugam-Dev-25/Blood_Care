const Hospital = require("../models/Hospital");
const User = require("../models/User");
const DonorProfile = require("../models/DonorProfile");
const BloodInventory = require("../models/BloodInventory");
const BloodRequest = require("../models/BloodRequest");

class AdminController {
  // Get All Hospitals
  getAllHospitals = async (req, res) => {
    try {
      const hospitals = await Hospital.find()
        .populate("userId", "name email phone")
        .sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        hospitals,
      });
    } catch (error) {
      console.error("Get All Hospitals Error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

  updateHospitalStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Status must be approved or rejected",
        });
      }

      const hospital = await Hospital.findById(id);

      if (!hospital) {
        return res.status(404).json({
          success: false,
          message: "Hospital not found",
        });
      }

      if (hospital.status !== "pending") {
        return res.status(400).json({
          success: false,
          message: "Hospital has already been processed",
        });
      }

      hospital.status = status;

      await hospital.save();

      res.status(200).json({
        success: true,
        message: `Hospital ${status} successfully`,
        hospital,
      });
    } catch (error) {
      console.error("Update Hospital Status Error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

  getAllDonors = async (req, res) => {
    try {
      const donors = await User.find({
        role: "donor",
      }).select("-password");

      res.status(200).json({
        success: true,
        donors,
      });
    } catch (error) {
      console.error("Get All Donors Error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

  getAllDonorProfiles = async (req, res) => {
    try {
      const donors = await DonorProfile.find()
        .populate("userId", "name email phone address")
        .sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        donors,
      });
    } catch (error) {
      console.error("Get All Donor Profiles Error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

  updateDonorStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["active", "deactivated"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Status must be active or deactivated",
        });
      }

      const donor = await DonorProfile.findById(id);

      if (!donor) {
        return res.status(404).json({
          success: false,
          message: "Donor profile not found",
        });
      }

      donor.status = status;

      await donor.save();

      res.status(200).json({
        success: true,
        message: `Donor ${status} successfully`,
        donor,
      });
    } catch (error) {
      console.error("Update Donor Status Error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

  getDashboardStats = async (req, res) => {
    try {
      const totalDonors = await User.countDocuments({
        role: "donor",
      });

      const totalHospitals = await Hospital.countDocuments();

      const pendingHospitals = await Hospital.countDocuments({
        status: "pending",
      });

      const pendingRequests = await BloodRequest.countDocuments({
        status: "pending",
      });

      const inventory = await BloodInventory.find()
        .select("bloodGroup units -_id")
        .sort({ bloodGroup: 1 });

      res.status(200).json({
        success: true,
        statistics: {
          totalDonors,
          totalHospitals,
          pendingHospitals,
          pendingRequests,
          inventory,
        },
      });
    } catch (error) {
      console.error("Get Dashboard Stats Error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
}

module.exports = new AdminController();
