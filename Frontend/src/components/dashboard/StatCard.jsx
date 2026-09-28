const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  iconColor = "text-red-600",
  iconBg = "bg-red-100",
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h3>

          {description && (
            <p className="mt-2 text-xs text-gray-500">
              {description}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
          >
            <Icon size={24} weight="duotone" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;