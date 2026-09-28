import { useEffect, useState } from "react";
import {
  UsersThree,
  Hospital,
  Clock,
  ClipboardText,
  Drop,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";

import AdminService from "../../../api/AdminService";
import Loader from "../../../components/common/Loader";
import StatCard from "../../../components/dashboard/StatCard";

const AdminDashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response =
          await AdminService.getDashboardStats();

        setStatistics(response?.statistics || null);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load admin dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader text="Loading admin dashboard..." />
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-sm text-red-600">
          Failed to load dashboard statistics.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Monitor donors, hospitals, requests and blood
          inventory.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Donors"
          value={statistics.totalDonors}
          description="Registered donors"
          icon={UsersThree}
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
        />

        <StatCard
          title="Total Hospitals"
          value={statistics.totalHospitals}
          description="Registered hospitals"
          icon={Hospital}
          iconColor="text-purple-600"
          iconBg="bg-purple-100"
        />

        <StatCard
          title="Pending Hospitals"
          value={statistics.pendingHospitals}
          description="Awaiting approval"
          icon={Clock}
          iconColor="text-yellow-600"
          iconBg="bg-yellow-100"
        />

        <StatCard
          title="Pending Requests"
          value={statistics.pendingRequests}
          description="Blood requests"
          icon={ClipboardText}
          iconColor="text-red-600"
          iconBg="bg-red-100"
        />
      </div>

      {/* Blood Inventory */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-4 border-b border-gray-200 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
            <Drop
              size={28}
              weight="duotone"
              className="text-red-600"
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Blood Inventory
            </h2>

            <p className="text-sm text-gray-500">
              Current available blood units.
            </p>
          </div>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2 md:grid-cols-4">
          {statistics.inventory?.map((item) => (
            <div
              key={item.bloodGroup}
              className="rounded-xl border border-gray-200 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Blood Group
                  </p>

                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {item.bloodGroup}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
                  <Drop
                    size={20}
                    weight="fill"
                    className="text-red-600"
                  />
                </div>
              </div>

              <div className="mt-4">
                <p className="text-3xl font-bold text-red-600">
                  {item.units}
                </p>

                <p className="text-xs text-gray-500">
                  Available Units
                </p>
              </div>
            </div>
          ))}
        </div>

        {(!statistics.inventory ||
          statistics.inventory.length === 0) && (
          <div className="px-6 py-12 text-center">
            <Drop
              size={40}
              weight="duotone"
              className="mx-auto text-gray-300"
            />

            <p className="mt-3 text-sm text-gray-500">
              No blood inventory available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;