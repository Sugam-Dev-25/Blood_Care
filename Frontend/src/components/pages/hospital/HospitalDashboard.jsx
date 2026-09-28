import { useEffect, useState } from "react";
import {
  ClipboardText,
  CheckCircle,
  Clock,
  Hospital,
  XCircle,
  Drop,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";

import HospitalService from "../../../api/HospitalService";
import RequestService from "../../../api/RequestService";
import Loader from "../../../components/common/Loader";
import StatCard from "../../../components/dashboard/StatCard";
import StatusBadge from "../../../components/dashboard/StatusBadge";

const HospitalDashboard = () => {
  const [hospital, setHospital] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [hospitalResponse, requestResponse] =
          await Promise.all([
            HospitalService.getProfile(),
            RequestService.getMyRequests(),
          ]);

        setHospital(hospitalResponse?.hospital || null);

        setRequests(
          requestResponse?.requests || []
        );
      } catch (error) {
        // Hospital profile may exist but requests can be
        // unavailable while hospital is not approved.
        if (error.response?.status === 403) {
          try {
            const hospitalResponse =
              await HospitalService.getProfile();

            setHospital(
              hospitalResponse?.hospital || null
            );
          } catch (profileError) {
            toast.error(
              profileError.response?.data?.message ||
                "Failed to load hospital information"
            );
          }
        } else {
          toast.error(
            error.response?.data?.message ||
              "Failed to load dashboard"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader text="Loading hospital dashboard..." />
      </div>
    );
  }

  const pendingRequests = requests.filter(
    (request) => request.status === "pending"
  ).length;

  const approvedRequests = requests.filter(
    (request) => request.status === "approved"
  ).length;

  const rejectedRequests = requests.filter(
    (request) => request.status === "rejected"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Hospital Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your hospital and blood requests.
        </p>
      </div>

      {/* Hospital Status */}
      {hospital && (
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
              <Hospital
                size={26}
                weight="duotone"
                className="text-red-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {hospital.hospitalName}
              </h2>

              <p className="text-sm text-gray-500">
                Registration:{" "}
                {hospital.registrationNumber}
              </p>
            </div>
          </div>

          <StatusBadge
            status={hospital.status}
          />
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Requests"
          value={requests.length}
          description="All blood requests"
          icon={ClipboardText}
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
        />

        <StatCard
          title="Pending"
          value={pendingRequests}
          description="Awaiting approval"
          icon={Clock}
          iconColor="text-yellow-600"
          iconBg="bg-yellow-100"
        />

        <StatCard
          title="Approved"
          value={approvedRequests}
          description="Approved requests"
          icon={CheckCircle}
          iconColor="text-green-600"
          iconBg="bg-green-100"
        />

        <StatCard
          title="Rejected"
          value={rejectedRequests}
          description="Rejected requests"
          icon={XCircle}
          iconColor="text-red-600"
          iconBg="bg-red-100"
        />
      </div>

      {/* Recent Requests */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Recent Blood Requests
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your latest blood requests.
            </p>
          </div>

          <Drop
            size={24}
            weight="duotone"
            className="text-red-600"
          />
        </div>

        {requests.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <ClipboardText
              size={40}
              weight="duotone"
              className="mx-auto text-gray-300"
            />

            <h3 className="mt-3 font-semibold text-gray-900">
              No Blood Requests
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Your blood requests will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {requests.slice(0, 5).map((request) => (
              <div
                key={request._id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                    <Drop
                      size={23}
                      weight="duotone"
                      className="text-red-600"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {request.bloodGroup}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {request.units}{" "}
                      {request.units === 1
                        ? "Unit"
                        : "Units"}
                      {" • "}
                      {request.reason}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400">
                    {request.createdAt
                      ? new Date(
                          request.createdAt
                        ).toLocaleDateString()
                      : ""}
                  </span>

                  <StatusBadge
                    status={request.status}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approval Notice */}
      {hospital?.status !== "approved" && (
        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
          <div className="flex gap-3">
            <Clock
              size={24}
              weight="duotone"
              className="mt-0.5 shrink-0 text-yellow-600"
            />

            <div>
              <h3 className="font-semibold text-yellow-800">
                Hospital Approval Pending
              </h3>

              <p className="mt-1 text-sm text-yellow-700">
                Your hospital profile must be approved by an
                administrator before you can create blood
                requests.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalDashboard;