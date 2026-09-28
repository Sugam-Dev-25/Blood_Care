import { useEffect, useState } from "react";
import {
  CheckCircle,
  ClipboardText,
  Drop,
  XCircle,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";

import RequestService from "../../../api/RequestService";
import Loader from "../../../components/common/Loader";
import StatusBadge from "../../../components/dashboard/StatusBadge";

const BloodRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchRequests = async () => {
    try {
      const response =
        await RequestService.getAllRequests();

      setRequests(response?.requests || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load blood requests"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (
    requestId,
    status
  ) => {
    try {
      setProcessingId(requestId);

      await RequestService.updateRequestStatus(
        requestId,
        status
      );

      toast.success(
        `Blood request ${
          status === "approved"
            ? "approved"
            : "rejected"
        } successfully`
      );

      await fetchRequests();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update request"
      );
    } finally {
      setProcessingId(null);
    }
  };

  const pendingCount = requests.filter(
    (request) => request.status === "pending"
  ).length;

  const approvedCount = requests.filter(
    (request) => request.status === "approved"
  ).length;

  const rejectedCount = requests.filter(
    (request) => request.status === "rejected"
  ).length;

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader text="Loading blood requests..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Blood Requests
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Review and manage hospital blood requests.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Pending Requests
          </p>

          <p className="mt-2 text-3xl font-bold text-yellow-600">
            {pendingCount}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Approved Requests
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {approvedCount}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Rejected Requests
          </p>

          <p className="mt-2 text-3xl font-bold text-red-600">
            {rejectedCount}
          </p>
        </div>
      </div>

      {/* Empty State */}
      {requests.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
          <ClipboardText
            size={48}
            weight="duotone"
            className="mx-auto text-gray-300"
          />

          <h2 className="mt-4 text-xl font-bold text-gray-900">
            No Blood Requests
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            There are no blood requests yet.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {requests.map((request) => (
            <div
              key={request._id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              {/* Top */}
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                    <Drop
                      size={26}
                      weight="duotone"
                      className="text-red-600"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {request.bloodGroup}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {request.units}{" "}
                      {request.units === 1
                        ? "Unit"
                        : "Units"}{" "}
                      Required
                    </p>
                  </div>
                </div>

                <StatusBadge
                  status={request.status}
                />
              </div>

              {/* Details */}
              <div className="mt-5 grid gap-4 border-t border-gray-100 pt-5 md:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Hospital
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {request.hospitalId
                      ?.hospitalName ||
                      "Unknown Hospital"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Registration
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    {request.hospitalId
                      ?.registrationNumber ||
                      "Not available"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Request Date
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    {request.createdAt
                      ? new Date(
                          request.createdAt
                        ).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>
              </div>

              {/* Reason */}
              <div className="mt-4 rounded-xl bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Reason
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {request.reason}
                </p>
              </div>

              {/* Actions */}
              {request.status === "pending" && (
                <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    disabled={
                      processingId === request._id
                    }
                    onClick={() =>
                      handleStatusChange(
                        request._id,
                        "rejected"
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <XCircle size={19} />

                    {processingId === request._id
                      ? "Processing..."
                      : "Reject"}
                  </button>

                  <button
                    type="button"
                    disabled={
                      processingId === request._id
                    }
                    onClick={() =>
                      handleStatusChange(
                        request._id,
                        "approved"
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <CheckCircle size={19} />

                    {processingId === request._id
                      ? "Processing..."
                      : "Approve"}
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

export default BloodRequests;