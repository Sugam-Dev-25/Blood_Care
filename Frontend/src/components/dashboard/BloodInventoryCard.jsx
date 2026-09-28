const BloodInventoryCard = ({ bloodGroup, units }) => {
  const isLowStock = units <= 5;
  const isEmpty = units === 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            Blood Group
          </p>

          <h3 className="mt-1 text-3xl font-bold text-red-600">
            {bloodGroup}
          </h3>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          <span className="text-lg font-bold text-red-600">
            🩸
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {units}
          </p>

          <p className="text-sm text-gray-500">
            {units === 1 ? "Unit Available" : "Units Available"}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isEmpty
              ? "bg-red-100 text-red-700"
              : isLowStock
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {isEmpty
            ? "Out of Stock"
            : isLowStock
            ? "Low Stock"
            : "Available"}
        </span>
      </div>
    </div>
  );
};

export default BloodInventoryCard;