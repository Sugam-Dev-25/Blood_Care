import Api from "./Api";

const DonationService = {
  // Get logged-in donor donation history
  getMyDonations: async () => {
    const response = await Api.get("/donation/my");
    return response.data;
  },

  // Admin records a donation
  recordDonation: async (donationData) => {
    const response = await Api.post(
      "/donation",
      donationData
    );

    return response.data;
  },
};

export default DonationService;