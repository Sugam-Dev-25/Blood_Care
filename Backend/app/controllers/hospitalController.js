const Hospital = require("../models/Hospital");

class HospitalController {
  createProfile = async (req, res) => {
    try {
      const {
        hospitalName,
        registrationNumber,
        address,
        contactPerson,
      } = req.body;

      if (
        !hospitalName ||
        !registrationNumber ||
        !address ||
        !contactPerson
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Hospital name, registration number, address and contact person are required",
        });
      }

      const existingHospital = await Hospital.findOne({
        userId: req.user.id,
      });

      if (existingHospital) {
        return res.status(400).json({
          success: false,
          message: "Hospital profile already exists",
        });
      }

      const existingRegistration = await Hospital.findOne({
        registrationNumber,
      });

      if (existingRegistration) {
        return res.status(400).json({
          success: false,
          message: "Registration number already exists",
        });
      }

      const hospital = await Hospital.create({
        userId: req.user.id,
        hospitalName,
        registrationNumber,
        address,
        contactPerson,
      });

      res.status(201).json({
        success: true,
        message: "Hospital profile created successfully",
        hospital,
      });
    } catch (error) {
      console.error("Create Hospital Profile Error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

  getMyProfile = async (req, res) => {
    try {
      const hospital = await Hospital.findOne({
        userId: req.user.id,
      }).populate("userId", "name email phone");

      if (!hospital) {
        return res.status(404).json({
          success: false,
          message: "Hospital profile not found",
        });
      }

      res.status(200).json({
        success: true,
        hospital,
      });
    } catch (error) {
      console.error("Get Hospital Profile Error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
}

module.exports = new HospitalController();