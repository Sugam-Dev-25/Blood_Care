import { useEffect, useState } from "react";
import {
  Calendar,
  ClipboardText,
  Drop,
  Plus,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import RequestService from "../../../api/RequestService";
import Loader from "../../../components/common/Loader";
import StatusBadge from "../../../components/dashboard/StatusBadge";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response =
          await RequestService.getMyRequests();

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

    fetchRequests();
  }, []);

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            My Blood Requests
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View and track your blood requests.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate("/hospital/create-request")
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <Plus size={20} />
          New Request
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Requests
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {requests.length}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Pending
          </p>

          <p className="mt-2 text-3xl font-bold text-yellow-600">
            {
              requests.filter(
                (request) =>
                  request.status === "pending"
              ).length
            }
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Approved
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {
              requests.filter(
                (request) =>
                  request.status === "approved"
              ).length
            }
          </p>
        </div>
      </div>

      {/* Requests */}
      {requests.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <ClipboardText
              size={34}
              weight="duotone"
              className="text-red-600"
            />
          </div>

          <h2 className="mt-4 text-xl font-bold text-gray-900">
            No Blood Requests
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            You have not submitted any blood requests yet.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/hospital/create-request")
            }
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <Plus size={19} />
            Create Request
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request._id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                {/* Request Info */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                    <Drop
                      size={27}
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
                        : "Units"}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <StatusBadge
                  status={request.status}
                />
              </div>

              {/* Details */}
              <div className="mt-5 grid gap-4 border-t border-gray-100 pt-5 md:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Reason
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {request.reason}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Request Date
                  </p>

                  <p className="mt-1 flex items-center gap-2 text-sm text-gray-700">
                    <Calendar size={16} />

                    {request.createdAt
                      ? new Date(
                          request.createdAt
                        ).toLocaleDateString()
                      : "Date not available"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;