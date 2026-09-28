import { useEffect, useState } from "react";
import {
  Calendar,
  Drop,
  FloppyDisk,
  Note,
  UserCircle,
} from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import DonorService from "../../../api/DonorService";
import Loader from "../../../components/common/Loader";
import StatusBadge from "../../../components/dashboard/StatusBadge";

const DonorProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await DonorService.getProfile();

        const profile = response?.donorProfile;

        if (profile) {
          setHasProfile(true);
          setProfileData(profile);

          reset({
            bloodGroup: profile.bloodGroup || "",
            dob: profile.dob ? profile.dob.split("T")[0] : "",
            lastDonationDate: profile.lastDonationDate
              ? profile.lastDonationDate.split("T")[0]
              : "",
            medicalNotes: profile.medicalNotes || "",
          });
        }
      } catch (error) {
        if (error.response?.status !== 404) {
          toast.error(
            error.response?.data?.message || "Failed to load profile",
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

      const profileDataToSend = {
        bloodGroup: formData.bloodGroup,
        dob: formData.dob,
        lastDonationDate: formData.lastDonationDate || null,
        medicalNotes: formData.medicalNotes || "",
      };

      let response;

      if (hasProfile) {
        response = await DonorService.updateProfile(profileDataToSend);

        toast.success("Profile updated successfully");
      } else {
        response = await DonorService.createProfile(profileDataToSend);

        setHasProfile(true);

        toast.success("Profile created successfully");
      }

      if (response?.donorProfile) {
        setProfileData(response.donorProfile);

        reset({
          bloodGroup: response.donorProfile.bloodGroup || "",
          dob: response.donorProfile.dob
            ? response.donorProfile.dob.split("T")[0]
            : "",
          lastDonationDate: response.donorProfile.lastDonationDate
            ? response.donorProfile.lastDonationDate.split("T")[0]
            : "",
          medicalNotes: response.donorProfile.medicalNotes || "",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader text="Loading profile..." />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your donor information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Card Header */}
        <div className="flex items-center gap-4 border-b border-gray-200 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
            <UserCircle size={28} weight="duotone" className="text-red-600" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Donor Information
            </h2>

            <p className="text-sm text-gray-500">
              Keep your donation information up to date.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
          {/* Blood Group + DOB */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Blood Group */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Blood Group
              </label>

              <div className="relative">
                <Drop
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500"
                />

                <select
                  {...register("bloodGroup", {
                    required: "Blood group is required",
                  })}
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              {errors.bloodGroup && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.bloodGroup.message}
                </p>
              )}
            </div>

            {/* DOB */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Date of Birth
              </label>

              <div className="relative">
                <Calendar
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="date"
                  {...register("dob", {
                    required: "Date of birth is required",
                  })}
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

              {errors.dob && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.dob.message}
                </p>
              )}
            </div>
          </div>

          {/* Last Donation Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Last Donation Date
            </label>

            <div className="relative">
              <Calendar
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="date"
                {...register("lastDonationDate")}
                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            <p className="mt-1 text-xs text-gray-500">
              Leave empty if you have never donated.
            </p>
          </div>

          {/* Medical Notes */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Medical Notes
            </label>

            <div className="relative">
              <Note size={20} className="absolute left-4 top-4 text-gray-500" />

              <textarea
                rows="4"
                placeholder="Enter any relevant medical information"
                {...register("medicalNotes")}
                className="w-full resize-none rounded-xl border border-gray-300 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>
          </div>

          {/* Read Only Information */}
          {profileData && (
            <div className="grid gap-4 border-t border-gray-100 pt-6 sm:grid-cols-3">
              {/* Total Donations */}
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-500">
                  Total Donations
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {profileData.totalDonations ?? 0}
                </p>
              </div>

              {/* Eligibility */}
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-500">
                  Eligibility Date
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {profileData.eligibilityDate
                    ? new Date(profileData.eligibilityDate).toLocaleDateString()
                    : "Available"}
                </p>
              </div>

              {/* Status */}
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-500">
                  Account Status
                </p>

                <div className="mt-2">
                  <StatusBadge status={profileData.status || "active"} />
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end border-t border-gray-100 pt-5">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FloppyDisk size={20} />

              {saving
                ? "Saving..."
                : hasProfile
                  ? "Update Profile"
                  : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonorProfile;
