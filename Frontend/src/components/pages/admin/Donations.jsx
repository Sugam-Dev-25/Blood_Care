import { useEffect, useState } from "react";
import {
  Calendar,
  Drop,
  PlusCircle,
  UserCircle,
} from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import DonationService from "../../../api/DonationService";
import AdminService from "../../../api/AdminService";
import Loader from "../../../components/common/Loader";

const Donations = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const selectedDonorId = watch("donorId");

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response =
          await AdminService.getAllDonorProfiles();

        setDonors(response?.donors || []);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load donors"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  const selectedDonor = donors.find(
    (donor) => donor._id === selectedDonorId
  );

  const onSubmit = async (formData) => {
    try {
      setSaving(true);

      await DonationService.recordDonation({
        donorId: formData.donorId,
        bloodGroup: selectedDonor.bloodGroup,
        units: Number(formData.units),
        donationDate: formData.donationDate,
      });

      toast.success(
        "Donation recorded successfully"
      );

      reset();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to record donation"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader text="Loading donors..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Donations
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Record blood donations from registered donors.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-gray-200 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
            <PlusCircle
              size={28}
              weight="duotone"
              className="text-red-600"
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Record Donation
            </h2>

            <p className="text-sm text-gray-500">
              Add a donor blood donation record.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 p-6"
        >
          {/* Donor */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Select Donor
            </label>

            <select
              {...register("donorId", {
                required: "Donor is required",
              })}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
            >
              <option value="">
                Select donor
              </option>

              {donors.map((donor) => (
                <option
                  key={donor._id}
                  value={donor._id}
                >
                  {donor.userId?.name || "Unknown Donor"}{" "}
                  - {donor.bloodGroup}
                </option>
              ))}
            </select>

            {errors.donorId && (
              <p className="mt-1 text-xs text-red-600">
                {errors.donorId.message}
              </p>
            )}
          </div>

          {/* Donor Info */}
          {selectedDonor && (
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <UserCircle
                  size={28}
                  weight="duotone"
                  className="text-red-600"
                />

                <div>
                  <p className="font-semibold text-gray-900">
                    {selectedDonor.userId?.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Blood Group:{" "}
                    <span className="font-semibold text-red-600">
                      {selectedDonor.bloodGroup}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Units + Date */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Units */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Units
              </label>

              <input
                type="number"
                min="1"
                placeholder="Enter units"
                {...register("units", {
                  required: "Units are required",
                  min: {
                    value: 1,
                    message: "Units must be at least 1",
                  },
                })}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />

              {errors.units && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.units.message}
                </p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Donation Date
              </label>

              <input
                type="date"
                {...register("donationDate", {
                  required: "Donation date is required",
                })}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />

              {errors.donationDate && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.donationDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end border-t border-gray-100 pt-5">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Drop size={20} weight="fill" />

              {saving
                ? "Recording..."
                : "Record Donation"}
            </button>
          </div>
        </form>
      </div>

      {/* Information */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <div className="flex gap-3">
          <Calendar
            size={24}
            weight="duotone"
            className="mt-0.5 text-blue-600"
          />

          <div>
            <h3 className="font-semibold text-gray-900">
              Donation Information
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              After recording a donation, the donor's
              donation count, eligibility date and blood
              inventory will be updated automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donations;