import { useEffect, useState } from "react";
import {
  CheckCircle,
  Hospital,
  MapPin,
  Phone,
  XCircle,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";

import AdminService from "../../../api/AdminService";
import Loader from "../../../components/common/Loader";
import StatusBadge from "../../../components/dashboard/StatusBadge";

const ManageHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchHospitals = async () => {
    try {
      const response =
        await AdminService.getAllHospitals();

      setHospitals(response?.hospitals || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load hospitals"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const handleStatusChange = async (
    hospitalId,
    status
  ) => {
    try {
      setProcessingId(hospitalId);

      await AdminService.updateHospitalStatus(
        hospitalId,
        status
      );

      toast.success(
        `Hospital ${
          status === "approved"
            ? "approved"
            : "rejected"
        } successfully`
      );

      await fetchHospitals();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update hospital status"
      );
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader text="Loading hospitals..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Manage Hospitals
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Review and manage registered hospitals.
        </p>
      </div>

      {/* Hospitals */}
      {hospitals.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
          <Hospital
            size={44}
            weight="duotone"
            className="mx-auto text-gray-300"
          />

          <h2 className="mt-4 text-xl font-bold text-gray-900">
            No Hospitals Found
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            No hospitals have registered yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {hospitals.map((hospital) => (
            <div
              key={hospital._id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50">
                    <Hospital
                      size={27}
                      weight="duotone"
                      className="text-red-600"
                    />
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-900">
                      {hospital.hospitalName}
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      Reg. No:{" "}
                      {hospital.registrationNumber}
                    </p>
                  </div>
                </div>

                <StatusBadge
                  status={hospital.status}
                />
              </div>

              {/* Details */}
              <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={19}
                    className="mt-0.5 shrink-0 text-gray-400"
                  />

                  <p className="text-sm text-gray-600">
                    {hospital.address}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Hospital
                    size={19}
                    className="shrink-0 text-gray-400"
                  />

                  <p className="text-sm text-gray-600">
                    Contact Person:{" "}
                    <span className="font-medium text-gray-900">
                      {hospital.contactPerson}
                    </span>
                  </p>
                </div>

                {hospital.userId && (
                  <>
                    <div className="flex items-center gap-3">
                      <Phone
                        size={19}
                        className="shrink-0 text-gray-400"
                      />

                      <p className="text-sm text-gray-600">
                        {hospital.userId.phone ||
                          "Phone not available"}
                      </p>
                    </div>

                    <p className="pl-8 text-sm text-gray-500">
                      {hospital.userId.email}
                    </p>
                  </>
                )}
              </div>

              {/* Actions */}
              {hospital.status === "pending" && (
                <div className="mt-5 flex gap-3 border-t border-gray-100 pt-5">
                  <button
                    type="button"
                    disabled={
                      processingId === hospital._id
                    }
                    onClick={() =>
                      handleStatusChange(
                        hospital._id,
                        "approved"
                      )
                    }
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <CheckCircle size={19} />

                    {processingId === hospital._id
                      ? "Processing..."
                      : "Approve"}
                  </button>

                  <button
                    type="button"
                    disabled={
                      processingId === hospital._id
                    }
                    onClick={() =>
                      handleStatusChange(
                        hospital._id,
                        "rejected"
                      )
                    }
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <XCircle size={19} />
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageHospitals;