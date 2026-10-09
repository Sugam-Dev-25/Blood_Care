const Hospital = require("../models/Hospital");
const User = require("../models/User");
const DonorProfile = require("../models/DonorProfile");
const BloodInventory = require("../models/BloodInventory");
const BloodRequest = require("../models/BloodRequest");
const sendEmail = require("../utils/sendEmail");
const AuditLog = require("../models/AuditLog");

class AdminController {

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

      const hospital = await Hospital.findById(id).populate(
        "userId",
        "name email",
      );

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

      // Send email notification
      if (hospital.userId?.email) {
        const hospitalName = hospital.userId.name || "Hospital";

        const subject =
          status === "approved"
            ? "Blood Care - Hospital Account Approved"
            : "Blood Care - Hospital Account Rejected";

        const emailMessage =
          status === "approved"
            ? `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2 style="color: #a61f1f;">Blood Care</h2>
              <p>Hello ${hospitalName},</p>
              <p>Your hospital account has been <strong>approved</strong>.</p>
              <p>You can now log in and use Blood Care hospital services.</p>
              <p>Thank you for joining Blood Care.</p>
            </div>
          `
            : `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2 style="color: #a61f1f;">Blood Care</h2>
              <p>Hello ${hospitalName},</p>
              <p>Your hospital account has been <strong>rejected</strong>.</p>
              <p>Please contact the Blood Care administration team for further information.</p>
            </div>
          `;

        try {
          await sendEmail(hospital.userId.email, subject, emailMessage);
        } catch (emailError) {
          console.error("Hospital notification email failed:", emailError);
        }
      }

      return res.status(200).json({
        success: true,
        message: `Hospital ${status} successfully`,
        hospital,
      });
    } catch (error) {
      console.error("Update Hospital Status Error:", error);

      return res.status(500).json({
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

  getAuditLogs = async (req, res) => {
    try {
      const { page = 1, limit = 10, action, status, search } = req.query;

      const currentPage = Math.max(1, parseInt(page, 10) || 1);
      const pageLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));

      const filter = {};

      // Filter by action
      if (action) {
        filter.action = action;
      }

      // Filter by status
      if (["success", "failed"].includes(status)) {
        filter.status = status;
      }

      // Search by username, action, resource or description
      if (search) {
        const searchRegex = new RegExp(
          search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          "i",
        );

        filter.$or = [
          { userName: searchRegex },
          { action: searchRegex },
          { resource: searchRegex },
          { description: searchRegex },
        ];
      }

      const totalLogs = await AuditLog.countDocuments(filter);

      const logs = await AuditLog.find(filter)
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * pageLimit)
        .limit(pageLimit)
        .lean();

      return res.status(200).json({
        success: true,
        message: "Audit logs fetched successfully",
        logs,
        pagination: {
          currentPage,
          limit: pageLimit,
          totalLogs,
          totalPages: Math.ceil(totalLogs / pageLimit),
        },
      });
    } catch (error) {
      console.error("Get Audit Logs Error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch audit logs",
      });
    }
  };
}

module.exports = new AdminController();
