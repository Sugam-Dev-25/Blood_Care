import Api from "./Api";

const AdminService = {
  // Dashboard statistics
  getDashboardStats: async () => {
    const response = await Api.get("/admin/dashboard");
    return response.data;
  },

  // Get all hospitals
  getAllHospitals: async () => {
    const response = await Api.get("/admin/hospitals");
    return response.data;
  },

  // Approve / Reject hospital
  updateHospitalStatus: async (hospitalId, status) => {
    const response = await Api.put(
      `/admin/hospitals/${hospitalId}/status`,
      { status }
    );

    return response.data;
  },

  // Get all donor users
  getAllDonors: async () => {
    const response = await Api.get("/admin/donors");
    return response.data;
  },

  // Get donor profiles
  getAllDonorProfiles: async () => {
    const response = await Api.get("/admin/donor-profiles");
    return response.data;
  },

  // Activate / Deactivate donor
  updateDonorStatus: async (donorId, status) => {
    const response = await Api.put(
      `/admin/donors/${donorId}/status`,
      { status }
    );

    return response.data;
  },

  // Get audit logs
  getAuditLogs: async (params = {}) => {
    const response = await Api.get("/admin/audit-logs", {
      params,
    });

    return response.data;
  },
};

export default AdminService;