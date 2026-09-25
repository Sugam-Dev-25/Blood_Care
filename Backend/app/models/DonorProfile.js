const mongoose = require("mongoose");

const donorProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    lastDonationDate: {
      type: Date,
      default: null,
    },

    totalDonations: {
      type: Number,
      default: 0,
    },

    eligibilityDate: {
      type: Date,
      default: null,
    },

    medicalNotes: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "deactivated"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DonorProfile", donorProfileSchema);