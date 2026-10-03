const BloodRequest = require("../models/BloodRequest");
const Hospital = require("../models/Hospital");
const BloodInventory = require("../models/BloodInventory");
const sendEmail = require("../utils/sendEmail");

class BloodRequestController {
  // Create Blood Request
  createRequest = async (req, res) => {
    try {
      const { bloodGroup, units, reason } = req.body;

      if (!bloodGroup || !units || !reason) {
        return res.status(400).json({
          success: false,
          message: "Blood group, units and reason are required",
        });
      }

      if (units < 1) {
        return res.status(400).json({
          success: false,
          message: "Units must be at least 1",
        });
      }

      // Find hospital profile of logged-in user
      const hospital = await Hospital.findOne({
        userId: req.user.id,
      });

      if (!hospital) {
        return res.status(404).json({
          success: false,
          message: "Hospital profile not found",
        });
      }

      if (hospital.status !== "approved") {
        return res.status(403).json({
          success: false,
          message: "Hospital is not approved yet",
        });
      }

      const request = await BloodRequest.create({
        hospitalId: hospital._id,
        bloodGroup,
        units,
        reason,
      });

      res.status(201).json({
        success: true,
        message: "Blood request created successfully",
        request,
      });
    } catch (error) {
      console.error("Create Blood Request Error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

  // Get Hospital's Own Requests
  getMyRequests = async (req, res) => {
    try {
      const hospital = await Hospital.findOne({
        userId: req.user.id,
      });

      if (!hospital) {
        return res.status(404).json({
          success: false,
          message: "Hospital profile not found",
        });
      }

      const requests = await BloodRequest.find({
        hospitalId: hospital._id,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        requests,
      });
    } catch (error) {
      console.error("Get My Blood Requests Error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

  // Get All Requests - Admin
  getAllRequests = async (req, res) => {
    try {
      const requests = await BloodRequest.find()
        .populate(
          "hospitalId",
          "hospitalName registrationNumber address contactPerson",
        )
        .sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        requests,
      });
    } catch (error) {
      console.error("Get All Blood Requests Error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

  // Approve or Reject Blood Request
  updateRequestStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Status must be approved or rejected",
        });
      }

      const request = await BloodRequest.findById(id);

      if (!request) {
        return res.status(404).json({
          success: false,
          message: "Blood request not found",
        });
      }

      if (request.status !== "pending") {
        return res.status(400).json({
          success: false,
          message: "This request has already been processed",
        });
      }

      // Reject request
      if (status === "rejected") {
        request.status = "rejected";
        await request.save();

        // Send rejection email
        try {
          const hospital = await Hospital.findById(request.hospitalId).populate(
            "userId",
            "name email",
          );

          if (hospital?.userId?.email) {
            await sendEmail(
              hospital.userId.email,
              "Blood Care - Blood Request Rejected",
              `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                  <h2 style="color: #a61f1f;">Blood Care</h2>
                  <p>Hello ${hospital.userId.name || "Hospital"},</p>
                  <p>Your blood request has been <strong>rejected</strong>.</p>
                  <p><strong>Blood Group:</strong> ${request.bloodGroup}</p>
                  <p><strong>Units Requested:</strong> ${request.units}</p>
                  <p>Please contact the Blood Care administration team for further information.</p>
                </div>
              `,
            );
          }
        } catch (emailError) {
          console.error("Request rejection email failed:", emailError);
        }

        return res.status(200).json({
          success: true,
          message: "Blood request rejected successfully",
          request,
        });
      }

      // Find blood inventory
      const blood = await BloodInventory.findOne({
        bloodGroup: request.bloodGroup,
      });

      if (!blood) {
        return res.status(400).json({
          success: false,
          message: "Blood group is not available in inventory",
        });
      }

      // Check available units
      if (blood.units < request.units) {
        return res.status(400).json({
          success: false,
          message: "Not enough blood units available",
        });
      }

      // Deduct requested units
      blood.units = blood.units - request.units;
      await blood.save();

      // Approve request
      request.status = "approved";
      await request.save();

      // Send approval email
      try {
        const hospital = await Hospital.findById(request.hospitalId).populate(
          "userId",
          "name email",
        );

        if (hospital?.userId?.email) {
          await sendEmail(
            hospital.userId.email,
            "Blood Care - Blood Request Approved",
            `
              <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #a61f1f;">Blood Care</h2>
                <p>Hello ${hospital.userId.name || "Hospital"},</p>
                <p>Your blood request has been <strong>approved</strong>.</p>
                <p><strong>Blood Group:</strong> ${request.bloodGroup}</p>
                <p><strong>Units Requested:</strong> ${request.units}</p>
                <p>Your request has been processed successfully.</p>
                <p>Thank you for using Blood Care.</p>
              </div>
            `,
          );
        }
      } catch (emailError) {
        console.error("Request approval email failed:", emailError);
      }

      return res.status(200).json({
        success: true,
        message: "Blood request approved successfully",
        request,
        remainingUnits: blood.units,
      });
    } catch (error) {
      console.error("Update Blood Request Status Error:", error);

      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
}

module.exports = new BloodRequestController();
