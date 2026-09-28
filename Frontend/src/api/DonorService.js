import Api from "./Api";

const DonorService = {
  // Create donor profile
  createProfile: async (profileData) => {
    const response = await Api.post(
      "/donor/profile",
      profileData
    );

    return response.data;
  },

  // Get logged-in donor profile
  getProfile: async () => {
    const response = await Api.get(
      "/donor/profile"
    );

    return response.data;
  },

  // Update donor profile
  updateProfile: async (profileData) => {
    const response = await Api.put(
      "/donor/profile",
      profileData
    );

    return response.data;
  },

  // Check donor eligibility
  checkEligibility: async () => {
    const response = await Api.get(
      "/donor/eligibility"
    );

    return response.data;
  },
};

export default DonorService;