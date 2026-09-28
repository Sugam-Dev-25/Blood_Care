import { useEffect, useState } from "react";
import {
  FloppyDisk,
  Hospital,
  MapPin,
  IdentificationCard,
  User,
} from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import HospitalService from "../../../api/HospitalService";
import Loader from "../../../components/common/Loader";
import StatusBadge from "../../../components/dashboard/StatusBadge";

const HospitalProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [hospitalData, setHospitalData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await HospitalService.getProfile();

        const hospital = response?.hospital;

        if (hospital) {
          setHasProfile(true);
          setHospitalData(hospital);

          reset({
            hospitalName: hospital.hospitalName || "",
            registrationNumber:
              hospital.registrationNumber || "",
            address: hospital.address || "",
            contactPerson:
              hospital.contactPerson || "",
          });
        }
      } catch (error) {
        if (error.response?.status !== 404) {
          toast.error(
            error.response?.data?.message ||
              "Failed to load hospital profile"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  const onSubmit = async (formData) => {
    try {
      setSaving(true);

      if (hasProfile) {
        // Backend currently does not have update profile API.
        toast.error(
          "Hospital profile update is not available yet"
        );
        return;
      }

      const response =
        await HospitalService.createProfile(formData);

      if (response?.hospital) {
        setHospitalData(response.hospital);
        setHasProfile(true);

        reset({
          hospitalName:
            response.hospital.hospitalName || "",
          registrationNumber:
            response.hospital.registrationNumber || "",
          address:
            response.hospital.address || "",
          contactPerson:
            response.hospital.contactPerson || "",
        });
      }

      toast.success("Hospital profile created successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to save hospital profile"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader text="Loading hospital profile..." />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Hospital Profile
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your hospital information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Card Header */}
        <div className="flex items-center gap-4 border-b border-gray-200 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
            <Hospital
              size={28}
              weight="duotone"
              className="text-red-600"
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Hospital Information
            </h2>

            <p className="text-sm text-gray-500">
              Provide your hospital registration details.
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 p-6"
        >
          {/* Hospital Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Hospital Name
            </label>

            <div className="relative">
              <Hospital
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                placeholder="Enter hospital name"
                disabled={hasProfile}
                {...register("hospitalName", {
                  required: "Hospital name is required",
                })}
                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            {errors.hospitalName && (
              <p className="mt-1 text-xs text-red-600">
                {errors.hospitalName.message}
              </p>
            )}
          </div>

          {/* Registration Number */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Registration Number
            </label>

            <div className="relative">
              <IdentificationCard
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                placeholder="Enter registration number"
                disabled={hasProfile}
                {...register("registrationNumber", {
                  required:
                    "Registration number is required",
                })}
                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 text-sm uppercase outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            {errors.registrationNumber && (
              <p className="mt-1 text-xs text-red-600">
                {errors.registrationNumber.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Address
            </label>

            <div className="relative">
              <MapPin
                size={20}
                className="absolute left-4 top-4 text-gray-500"
              />

              <textarea
                rows="3"
                placeholder="Enter hospital address"
                disabled={hasProfile}
                {...register("address", {
                  required: "Address is required",
                })}
                className="w-full resize-none rounded-xl border border-gray-300 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            {errors.address && (
              <p className="mt-1 text-xs text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Contact Person */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Contact Person
            </label>

            <div className="relative">
              <User
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                placeholder="Enter contact person name"
                disabled={hasProfile}
                {...register("contactPerson", {
                  required: "Contact person is required",
                })}
                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            {errors.contactPerson && (
              <p className="mt-1 text-xs text-red-600">
                {errors.contactPerson.message}
              </p>
            )}
          </div>

          {/* Status */}
          {hospitalData && (
            <div className="border-t border-gray-100 pt-5">
              <p className="mb-2 text-sm font-medium text-gray-700">
                Hospital Status
              </p>

              <StatusBadge
                status={hospitalData.status}
              />
            </div>
          )}

          {/* Submit */}
          {!hasProfile && (
            <div className="flex justify-end border-t border-gray-100 pt-5">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FloppyDisk size={20} />

                {saving
                  ? "Saving..."
                  : "Create Hospital Profile"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default HospitalProfile;