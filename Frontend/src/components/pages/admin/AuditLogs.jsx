import { useCallback, useEffect, useState } from "react";
import {
  MagnifyingGlass,
  ArrowClockwise,
  Eye,
  X,
  ClockCounterClockwise,
  CaretLeft,
  CaretRight,
  CheckCircle,
  XCircle,
  Funnel,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";

import AdminService from "../../../api/AdminService";
import Loader from "../../../components/common/Loader";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState("");
  const [action, setAction] = useState("");

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    totalLogs: 0,
    totalPages: 0,
  });

  const [selectedLog, setSelectedLog] = useState(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);

    try {
      const response = await AdminService.getAuditLogs({
        page,
        limit: 10,
        search,
        status,
        action,
      });

      setLogs(response.logs || []);

      setPagination(
        response.pagination || {
          currentPage: 1,
          limit: 10,
          totalLogs: 0,
          totalPages: 0,
        }
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load audit logs"
      );
    } finally {
      setLoading(false);
    }
  }, [page, search, status, action]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };

  const handleActionChange = (event) => {
    setAction(event.target.value);
    setPage(1);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatAction = (value = "") =>
    value
      .toLowerCase()
      .split("_")
      .map((word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");

  const getStatusBadge = (value) => {
    if (value === "success") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold capitalize text-green-700 ring-1 ring-inset ring-green-200">
          <CheckCircle size={15} weight="fill" />
          Success
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold capitalize text-red-700 ring-1 ring-inset ring-red-200">
        <XCircle size={15} weight="fill" />
        Failed
      </span>
    );
  };

  const availableActions = [
    "USER_REGISTER",
    "USER_LOGIN",
    "CREATE_DONOR_PROFILE",
    "UPDATE_DONOR_PROFILE",
    "CREATE_HOSPITAL_PROFILE",
    "APPROVE_HOSPITAL",
    "REJECT_HOSPITAL",
    "ACTIVATE_DONOR",
    "DEACTIVATE_DONOR",
    "RECORD_DONATION",
    "ADD_BLOOD_INVENTORY",
    "UPDATE_BLOOD_INVENTORY",
    "APPROVE_BLOOD_REQUEST",
    "REJECT_BLOOD_REQUEST",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
              <ClockCounterClockwise
                size={27}
                weight="duotone"
                className="text-red-600"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Audit Logs
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Monitor user activities and system events.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={fetchLogs}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <ArrowClockwise
            size={18}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Matching Logs
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {pagination.totalLogs}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Current Page
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {pagination.totalPages
              ? `${pagination.currentPage} / ${pagination.totalPages}`
              : "0 / 0"}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <form
          onSubmit={handleSearch}
          className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_200px_240px_auto]"
        >
          <div className="relative">
            <MagnifyingGlass
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchInput}
              onChange={(event) =>
                setSearchInput(event.target.value)
              }
              placeholder="Search user, action, resource..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <select
            value={status}
            onChange={handleStatusChange}
            className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
          >
            <option value="">All Statuses</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>

          <select
            value={action}
            onChange={handleActionChange}
            className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
          >
            <option value="">All Actions</option>

            {availableActions.map((item) => (
              <option key={item} value={item}>
                {formatAction(item)}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <Funnel size={17} />
            Apply
          </button>
        </form>
      </div>

      {/* Audit Logs Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="font-bold text-gray-900">
              Activity History
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Newest activities appear first.
            </p>
          </div>

          <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
            {pagination.totalLogs} logs
          </span>
        </div>

        {loading ? (
          <div className="flex min-h-64 items-center justify-center">
            <Loader text="Loading audit logs..." />
          </div>
        ) : logs.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <ClockCounterClockwise
              size={44}
              className="mx-auto text-gray-300"
            />

            <h3 className="mt-4 font-semibold text-gray-800">
              No audit logs found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      User
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Action
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Resource
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Date & Time
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Details
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {logs.map((log) => (
                    <tr
                      key={log._id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">
                          {log.userName || "Unknown User"}
                        </p>

                        <p className="mt-1 text-xs capitalize text-gray-500">
                          {log.userRole || "Unknown role"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-gray-800">
                          {formatAction(log.action)}
                        </p>

                        <p className="mt-1 max-w-xs text-xs text-gray-500">
                          {log.description || "No description"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-gray-800">
                          {log.resource || "N/A"}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {log.resourceId
                            ? String(log.resourceId).slice(-8)
                            : "No resource ID"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        {getStatusBadge(log.status)}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                        {formatDate(log.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => setSelectedLog(log)}
                          aria-label="View audit log details"
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                        >
                          <Eye size={17} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                Showing{" "}
                {pagination.totalLogs === 0
                  ? 0
                  : (pagination.currentPage - 1) *
                      pagination.limit +
                    1}{" "}
                to{" "}
                {Math.min(
                  pagination.currentPage * pagination.limit,
                  pagination.totalLogs
                )}{" "}
                of {pagination.totalLogs} logs
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={
                    page <= 1 || loading
                  }
                  onClick={() =>
                    setPage((current) =>
                      Math.max(1, current - 1)
                    )
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <CaretLeft size={17} />
                  Previous
                </button>

                <span className="px-2 text-sm font-semibold text-gray-700">
                  {pagination.currentPage || page}
                </span>

                <button
                  type="button"
                  disabled={
                    page >= pagination.totalPages ||
                    loading
                  }
                  onClick={() =>
                    setPage((current) => current + 1)
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <CaretRight size={17} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Log Details Modal */}
      {selectedLog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-950/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedLog(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="audit-details-title"
            className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <h2
                  id="audit-details-title"
                  className="text-xl font-bold text-gray-900"
                >
                  Audit Log Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Complete activity information
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                aria-label="Close audit details"
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              >
                <X size={22} />
              </button>
            </div>

            <div className="grid gap-5 p-6 sm:grid-cols-2">
              <DetailItem
                label="User Name"
                value={selectedLog.userName}
              />

              <DetailItem
                label="User Role"
                value={selectedLog.userRole}
              />

              <DetailItem
                label="Action"
                value={selectedLog.action}
              />

              <DetailItem
                label="Resource"
                value={selectedLog.resource}
              />

              <DetailItem
                label="Resource ID"
                value={selectedLog.resourceId}
              />

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </p>

                <div className="mt-2">
                  {getStatusBadge(selectedLog.status)}
                </div>
              </div>

              <DetailItem
                label="IP Address"
                value={selectedLog.ipAddress}
              />

              <DetailItem
                label="Date & Time"
                value={formatDate(selectedLog.createdAt)}
              />

              <div className="sm:col-span-2">
                <DetailItem
                  label="Description"
                  value={selectedLog.description}
                />
              </div>

              <div className="sm:col-span-2">
                <DetailItem
                  label="User Agent"
                  value={selectedLog.userAgent}
                />
              </div>

              {selectedLog.metadata && (
                <div className="sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Metadata
                  </p>

                  <pre className="mt-2 overflow-x-auto rounded-xl bg-gray-50 p-4 text-xs text-gray-700">
                    {JSON.stringify(
                      selectedLog.metadata,
                      null,
                      2
                    )}
                  </pre>
                </div>
              )}

              <div className="sm:col-span-2">
                <DetailItem
                  label="Log ID"
                  value={selectedLog._id}
                />
              </div>
            </div>

            <div className="flex justify-end border-t border-gray-200 px-6 py-4">
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="min-w-0">
    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
      {label}
    </p>

    <p className="mt-2 break-words text-sm font-medium text-gray-800">
      {value === null ||
      value === undefined ||
      value === ""
        ? "N/A"
        : String(value)}
    </p>
  </div>
);

export default AuditLogs;