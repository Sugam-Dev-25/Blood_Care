import { useState } from "react";
import {
  ClipboardText,
  Drop,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import RequestService from "../../../api/RequestService";

const CreateRequest = () => {
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      setSubmitting(true);

      const requestData = {
        bloodGroup: formData.bloodGroup,
        units: Number(formData.units),
        reason: formData.reason,
      };

      await RequestService.createRequest(requestData);

      toast.success(
        "Blood request created successfully"
      );

      reset();

      navigate("/hospital/requests");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create blood request"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Create Blood Request
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Submit a request for the blood your hospital needs.
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Card Header */}
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
              Blood Request Details
            </h2>

            <p className="text-sm text-gray-500">
              Enter the required blood group and quantity.
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 p-6"
        >
          {/* Blood Group */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Blood Group
            </label>

            <select
              {...register("bloodGroup", {
                required: "Blood group is required",
              })}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
            >
              <option value="">
                Select blood group
              </option>

              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

            {errors.bloodGroup && (
              <p className="mt-1 text-xs text-red-600">
                {errors.bloodGroup.message}
              </p>
            )}
          </div>

          {/* Units */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Required Units
            </label>

            <input
              type="number"
              min="1"
              placeholder="Enter number of blood units"
              {...register("units", {
                required: "Units are required",
                min: {
                  value: 1,
                  message: "Units must be at least 1",
                },
              })}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />

            {errors.units && (
              <p className="mt-1 text-xs text-red-600">
                {errors.units.message}
              </p>
            )}
          </div>

          {/* Reason */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Reason
            </label>

            <textarea
              rows="5"
              placeholder="Enter the reason for this blood requirement"
              {...register("reason", {
                required: "Reason is required",
              })}
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />

            {errors.reason && (
              <p className="mt-1 text-xs text-red-600">
                {errors.reason.message}
              </p>
            )}
          </div>

          {/* Info */}
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex gap-3">
              <ClipboardText
                size={22}
                weight="duotone"
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <p className="text-sm leading-6 text-blue-700">
                Your request will be sent to the administrator
                for approval. Blood units will be deducted from
                inventory only after approval.
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end border-t border-gray-100 pt-5">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <PaperPlaneTilt size={20} />

              {submitting
                ? "Submitting..."
                : "Submit Blood Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;