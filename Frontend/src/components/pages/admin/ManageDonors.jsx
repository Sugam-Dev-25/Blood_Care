import { useEffect, useState } from "react";
import {
  CheckCircle,
  Drop,
  Envelope,
  Phone,
  UserCircle,
  XCircle,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";

import AdminService from "../../../api/AdminService";
import Loader from "../../../components/common/Loader";
import StatusBadge from "../../../components/dashboard/StatusBadge";

const ManageDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

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

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleStatusChange = async (
    donorId,
    status
  ) => {
    try {
      setProcessingId(donorId);

      await AdminService.updateDonorStatus(
        donorId,
        status
      );

      toast.success(
        `Donor ${
          status === "active"
            ? "activated"
            : "deactivated"
        } successfully`
      );

      await fetchDonors();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update donor status"
      );
    } finally {
      setProcessingId(null);
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
          Manage Donors
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View and manage registered blood donors.
        </p>
      </div>

      {/* Donors */}
      {donors.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
          <UserCircle
            size={48}
            weight="duotone"
            className="mx-auto text-gray-300"
          />

          <h2 className="mt-4 text-xl font-bold text-gray-900">
            No Donors Found
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            No donor profiles have been created yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {donors.map((donor) => (
            <div
              key={donor._id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                    <UserCircle
                      size={28}
                      weight="duotone"
                      className="text-red-600"
                    />
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-900">
                      {donor.userId?.name ||
                        "Unknown Donor"}
                    </h2>

                    <div className="mt-1 flex items-center gap-2">
                      <Drop
                        size={16}
                        weight="fill"
                        className="text-red-600"
                      />

                      <span className="text-sm font-semibold text-red-600">
                        {donor.bloodGroup}
                      </span>
                    </div>
                  </div>
                </div>

                <StatusBadge status={donor.status} />
              </div>

              {/* Contact */}
              <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">
                <div className="flex items-center gap-3">
                  <Envelope
                    size={18}
                    className="text-gray-400"
                  />

                  <span className="text-sm text-gray-600">
                    {donor.userId?.email ||
                      "Email not available"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone
                    size={18}
                    className="text-gray-400"
                  />

                  <span className="text-sm text-gray-600">
                    {donor.userId?.phone ||
                      "Phone not available"}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    Total Donations
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-900">
                    {donor.totalDonations || 0}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    Date of Birth
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {donor.dob
                      ? new Date(
                          donor.dob
                        ).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>
              </div>

              {/* Eligibility */}
              {donor.eligibilityDate && (
                <div className="mt-3 rounded-xl bg-blue-50 p-4">
                  <p className="text-xs text-blue-600">
                    Next Eligibility Date
                  </p>

                  <p className="mt-1 text-sm font-semibold text-blue-900">
                    {new Date(
                      donor.eligibilityDate
                    ).toLocaleDateString()}
                  </p>
                </div>
              )}

              {/* Action */}
              <div className="mt-5 border-t border-gray-100 pt-5">
                {donor.status === "active" ? (
                  <button
                    type="button"
                    disabled={
                      processingId === donor._id
                    }
                    onClick={() =>
                      handleStatusChange(
                        donor._id,
                        "deactivated"
                      )
                    }
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <XCircle size={19} />

                    {processingId === donor._id
                      ? "Processing..."
                      : "Deactivate Donor"}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={
                      processingId === donor._id
                    }
                    onClick={() =>
                      handleStatusChange(
                        donor._id,
                        "active"
                      )
                    }
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <CheckCircle size={19} />

                    {processingId === donor._id
                      ? "Processing..."
                      : "Activate Donor"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageDonors;