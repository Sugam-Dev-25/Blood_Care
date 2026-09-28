import Api from "./Api";

const InventoryService = {
  // Get complete blood inventory
  getInventory: async () => {
    const response = await Api.get("/blood-inventory");

    return response.data;
  },

  // Admin adds a new blood group to inventory
  addBlood: async (inventoryData) => {
    const response = await Api.post(
      "/blood-inventory",
      inventoryData
    );

    return response.data;
  },

  // Admin updates units of a blood group
  updateUnits: async (bloodGroup, units) => {
    const response = await Api.put(
      `/blood-inventory/${bloodGroup}`,
      {
        units,
      }
    );

    return response.data;
  },
};

export default InventoryService;