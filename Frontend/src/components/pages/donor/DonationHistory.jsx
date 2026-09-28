import { useEffect, useState } from "react";
import {
  Calendar,
  Drop,
  PlusCircle,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";

import DonationService from "../../../api/DonationService";
import Loader from "../../../components/common/Loader";
import StatusBadge from "../../../components/dashboard/StatusBadge";

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await DonationService.getMyDonations();

        setDonations(
          response?.donations ||
            response?.data ||
            []
        );
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load donation history"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader text="Loading donations..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            My Donations
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View your blood donation history.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          <Drop size={20} weight="fill" />
          {donations.length} Donation
          {donations.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Empty State */}
      {donations.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <Drop
              size={32}
              weight="duotone"
              className="text-red-600"
            />
          </div>

          <h2 className="mt-4 text-xl font-bold text-gray-900">
            No Donations Yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            Your blood donation history will appear here
            after your first donation is recorded.
          </p>
        </div>
      ) : (
        /* Donation List */
        <div className="space-y-4">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                {/* Left */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                    <Drop
                      size={26}
                      weight="duotone"
                      className="text-red-600"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {donation.bloodGroup}
                    </h3>

                    <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                      <Calendar size={16} />
                      {donation.donationDate
                        ? new Date(
                            donation.donationDate
                          ).toLocaleDateString()
                        : "Date not available"}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-gray-500">
                      Units
                    </p>

                    <p className="mt-1 text-lg font-bold text-gray-900">
                      {donation.units || 0}
                    </p>
                  </div>

                  <StatusBadge
                    status="completed"
                  />
                </div>
              </div>

              {/* Eligibility */}
              {donation.eligibilityDate && (
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-500">
                    Next eligible donation date:
                    <span className="ml-1 font-semibold text-gray-900">
                      {new Date(
                        donation.eligibilityDate
                      ).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationHistory;