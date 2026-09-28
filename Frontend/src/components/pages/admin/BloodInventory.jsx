import { useEffect, useState } from "react";
import {
  Drop,
  Plus,
  PencilSimple,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";

import InventoryService from "../../../api/InventoryService";
import Loader from "../../../components/common/Loader";
import Modal from "../../../components/common/Modal";

const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

const BloodInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [units, setUnits] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchInventory = async () => {
    try {
      const response =
        await InventoryService.getInventory();

      setInventory(response?.inventory || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load blood inventory"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const getUnits = (bloodGroup) => {
    const item = inventory.find(
      (item) => item.bloodGroup === bloodGroup
    );

    return item?.units || 0;
  };

  const openAddModal = () => {
    setSelectedGroup("");
    setUnits("");
    setShowModal(true);
  };

  const openUpdateModal = (bloodGroup) => {
    setSelectedGroup(bloodGroup);
    setUnits(getUnits(bloodGroup));
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!selectedGroup) {
      toast.error("Please select a blood group");
      return;
    }

    if (!units || Number(units) < 0) {
      toast.error("Please enter valid units");
      return;
    }

    try {
      setSaving(true);

      const existing = inventory.find(
        (item) =>
          item.bloodGroup === selectedGroup
      );

      if (existing) {
        await InventoryService.updateUnits(
          selectedGroup,
          Number(units)
        );

        toast.success(
          "Blood inventory updated successfully"
        );
      } else {
        await InventoryService.addBlood({
          bloodGroup: selectedGroup,
          units: Number(units),
        });

        toast.success(
          "Blood added to inventory successfully"
        );
      }

      setShowModal(false);
      await fetchInventory();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update inventory"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader text="Loading blood inventory..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Blood Inventory
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage available blood units.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <Plus size={20} />
          Add Blood
        </button>
      </div>

      {/* Inventory Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {bloodGroups.map((bloodGroup) => {
          const units = getUnits(bloodGroup);

          return (
            <div
              key={bloodGroup}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Blood Group
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-gray-900">
                    {bloodGroup}
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                  <Drop
                    size={24}
                    weight="duotone"
                    className="text-red-600"
                  />
                </div>
              </div>

              <div className="mt-6">
                <p className="text-3xl font-bold text-red-600">
                  {units}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Available Units
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  openUpdateModal(bloodGroup)
                }
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <PencilSimple size={18} />
                Update Units
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={
          inventory.some(
            (item) =>
              item.bloodGroup === selectedGroup
          )
            ? "Update Blood Units"
            : "Add Blood Inventory"
        }
      >
        <form
          onSubmit={handleSave}
          className="space-y-5"
        >
          {/* Blood Group */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Blood Group
            </label>

            <select
              value={selectedGroup}
              onChange={(e) =>
                setSelectedGroup(e.target.value)
              }
              disabled={
                inventory.some(
                  (item) =>
                    item.bloodGroup === selectedGroup
                )
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:bg-gray-100"
            >
              <option value="">
                Select blood group
              </option>

              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          {/* Units */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Units
            </label>

            <input
              type="number"
              min="0"
              value={units}
              onChange={(e) =>
                setUnits(e.target.value)
              }
              placeholder="Enter blood units"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BloodInventory;