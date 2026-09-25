const BloodInventory = require("../models/BloodInventory");

class BloodInventoryController {
  // Add Blood Inventory
  addBlood = async (req, res) => {
    try {
      const { bloodGroup, units } = req.body;

      if (!bloodGroup || units === undefined) {
        return res.status(400).json({
          success: false,
          message: "Blood group and units are required",
        });
      }

      if (units < 0) {
        return res.status(400).json({
          success: false,
          message: "Units cannot be negative",
        });
      }

      const existingBlood = await BloodInventory.findOne({
        bloodGroup,
      });

      if (existingBlood) {
        return res.status(400).json({
          success: false,
          message: "Blood group already exists in inventory",
        });
      }

      const blood = await BloodInventory.create({
        bloodGroup,
        units,
      });

      res.status(201).json({
        success: true,
        message: "Blood inventory added successfully",
        blood,
      });
    } catch (error) {
      console.error("Add Blood Inventory Error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

  // Get All Blood Inventory
  getInventory = async (req, res) => {
    try {
      const inventory = await BloodInventory.find().sort({
        bloodGroup: 1,
      });

      res.status(200).json({
        success: true,
        inventory,
      });
    } catch (error) {
      console.error("Get Blood Inventory Error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

  // Update Blood Units
  updateUnits = async (req, res) => {
    try {
      const { bloodGroup } = req.params;
      const { units } = req.body;

      if (units === undefined) {
        return res.status(400).json({
          success: false,
          message: "Units are required",
        });
      }

      if (units < 0) {
        return res.status(400).json({
          success: false,
          message: "Units cannot be negative",
        });
      }

      const blood = await BloodInventory.findOne({
        bloodGroup,
      });

      if (!blood) {
        return res.status(404).json({
          success: false,
          message: "Blood group not found in inventory",
        });
      }

      blood.units = units;

      await blood.save();

      res.status(200).json({
        success: true,
        message: "Blood units updated successfully",
        blood,
      });
    } catch (error) {
      console.error("Update Blood Units Error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
}

module.exports = new BloodInventoryController();