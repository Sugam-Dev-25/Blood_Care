import { useEffect, useState } from "react";
import {
  CalendarCheck,
  CheckCircle,
  Clock,
  Drop,
  Warning,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";

import DonorService from "../../../api/DonorService";
import Loader from "../../../components/common/Loader";

const Eligibility = () => {
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
            "Failed to check eligibility"
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
        <Loader text="Checking eligibility..." />
      </div>
    );
  }

  const isEligible = eligibility?.eligible;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Donation Eligibility
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Check whether you are currently eligible to donate blood.
        </p>
      </div>

      {/* Main Status */}
      <div
        className={`rounded-2xl border bg-white p-6 shadow-sm ${
          isEligible
            ? "border-green-200"
            : "border-yellow-200"
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-full ${
              isEligible
                ? "bg-green-100"
                : "bg-yellow-100"
            }`}
          >
            {isEligible ? (
              <CheckCircle
                size={42}
                weight="fill"
                className="text-green-600"
              />
            ) : (
              <Clock
                size={42}
                weight="fill"
                className="text-yellow-600"
              />
            )}
          </div>

          <h2 className="mt-5 text-2xl font-bold text-gray-900">
            {isEligible
              ? "You Are Eligible"
              : "You Are Not Eligible Yet"}
          </h2>

          <p className="mt-2 max-w-xl text-sm text-gray-500">
            {eligibility?.message ||
              (isEligible
                ? "You can currently donate blood."
                : "Please wait until your next eligible donation date.")}
          </p>
        </div>
      </div>

      {/* Information Cards */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Status */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
              <Drop
                size={26}
                weight="duotone"
                className="text-red-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Donation Status
              </p>

              <h3
                className={`mt-1 text-xl font-bold ${
                  isEligible
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {isEligible
                  ? "Eligible"
                  : "Not Eligible"}
              </h3>
            </div>
          </div>
        </div>

        {/* Eligibility Date */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <CalendarCheck
                size={26}
                weight="duotone"
                className="text-blue-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Next Eligibility Date
              </p>

              <h3 className="mt-1 text-xl font-bold text-gray-900">
                {eligibility?.eligibilityDate
                  ? new Date(
                      eligibility.eligibilityDate
                    ).toLocaleDateString()
                  : "Available Now"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Information */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex gap-4">
          <Warning
            size={24}
            weight="duotone"
            className="mt-0.5 shrink-0 text-orange-500"
          />

          <div>
            <h3 className="font-semibold text-gray-900">
              Important Information
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Blood donation eligibility is calculated based
              on your previous donation date. Please make sure
              your donor information is accurate before
              donating.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eligibility;