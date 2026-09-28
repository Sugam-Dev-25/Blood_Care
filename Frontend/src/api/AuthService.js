import Api from "./Api";

const AuthService = {
  register: async (userData) => {
    const response = await Api.post("/auth/register", userData);

    return response.data;
  },

  login: async (loginData) => {
    const response = await Api.post("/auth/login", loginData);

    return response.data;
  },

  getMe: async () => {
    const response = await Api.get("/users/me");

    return response.data;
  },
};

export default AuthService;