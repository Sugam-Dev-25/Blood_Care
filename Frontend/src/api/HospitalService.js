import Api from "./Api";

const HospitalService = {
  // Create hospital profile
  createProfile: async (profileData) => {
    const response = await Api.post(
      "/hospital/profile",
      profileData
    );

    return response.data;
  },

  // Get logged-in hospital profile
  getProfile: async () => {
    const response = await Api.get(
      "/hospital/profile"
    );

    return response.data;
  },
};

export default HospitalService;