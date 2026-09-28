import Api from "./Api";

const RequestService = {
  // Hospital creates a blood request
  createRequest: async (requestData) => {
    const response = await Api.post(
      "/blood-request",
      requestData
    );

    return response.data;
  },

  // Hospital gets its own requests
  getMyRequests: async () => {
    const response = await Api.get(
      "/blood-request/my"
    );

    return response.data;
  },

  // Admin gets all blood requests
  getAllRequests: async () => {
    const response = await Api.get(
      "/blood-request"
    );

    return response.data;
  },

  // Admin approves or rejects a request
  updateRequestStatus: async (requestId, status) => {
    const response = await Api.put(
      `/blood-request/${requestId}/status`,
      {
        status,
      }
    );

    return response.data;
  },
};

export default RequestService;