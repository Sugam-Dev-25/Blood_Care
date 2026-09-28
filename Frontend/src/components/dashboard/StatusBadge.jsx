const StatusBadge = ({ status }) => {
  const statusConfig = {
    approved: {
      label: "Approved",
      className: "bg-green-100 text-green-700",
    },

    pending: {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-700",
    },

    rejected: {
      label: "Rejected",
      className: "bg-red-100 text-red-700",
    },

    active: {
      label: "Active",
      className: "bg-green-100 text-green-700",
    },

    inactive: {
      label: "Inactive",
      className: "bg-gray-100 text-gray-600",
    },

    completed: {
      label: "Completed",
      className: "bg-blue-100 text-blue-700",
    },
  };

  const config = statusConfig[status?.toLowerCase()] || {
    label: status || "Unknown",
    className: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;