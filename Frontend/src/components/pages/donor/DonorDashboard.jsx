import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Drop,
  Heartbeat,
  User,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";

import DonorService from "../../../api/DonorService";
import Loader from "../../../components/common/Loader";
import StatCard from "../../../components/dashboard/StatCard";
import StatusBadge from "../../../components/dashboard/StatusBadge";

const DonorDashboard = () => {
  const [eligibility, setEligibility] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEligibility = async () => {
      try {
        const response = await DonorService.checkEligibility();

        setEligibility(response);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load donor information"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEligibility();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader text="Loading dashboard..." />
      </div>
    );
  }

  const isEligible = eligibility?.eligible;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Donor Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your donor profile and donation activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Donation Status"
          value={isEligible ? "Eligible" : "Not Eligible"}
          description={
            isEligible
              ? "You can donate blood"
              : "Please check your eligibility date"
          }
          icon={Heartbeat}
          iconColor={
            isEligible
              ? "text-green-600"
              : "text-red-600"
          }
          iconBg={
            isEligible
              ? "bg-green-100"
              : "bg-red-100"
          }
        />

        <StatCard
          title="Next Donation"
          value={
            eligibility?.eligibilityDate
              ? new Date(
                  eligibility.eligibilityDate
                ).toLocaleDateString()
              : "Available"
          }
          description="Eligibility date"
          icon={CalendarCheck}
        />

        <StatCard
          title="Blood Donation"
          value="Donate"
          description="Help save lives"
          icon={Drop}
        />
      </div>

      {/* Eligibility Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
              <User
                size={26}
                weight="duotone"
                className="text-red-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Donation Eligibility
              </h2>

              <p className="text-sm text-gray-500">
                Current blood donation status
              </p>
            </div>
          </div>

          <StatusBadge
            status={isEligible ? "approved" : "pending"}
          />
        </div>

        <div className="mt-5 border-t border-gray-100 pt-5">
          {isEligible ? (
            <p className="text-sm text-green-600">
              You are currently eligible to donate blood.
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Your next eligible donation date is{" "}
              <strong>
                {eligibility?.eligibilityDate
                  ? new Date(
                      eligibility.eligibilityDate
                    ).toLocaleDateString()
                  : "not available"}
              </strong>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;