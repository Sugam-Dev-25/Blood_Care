const Loader = ({ size = "medium", text = "Loading..." }) => {
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-6 h-6 border-2",
    large: "w-10 h-10 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-gray-200 border-t-red-600`}
      />

      {text && (
        <p className="text-sm text-gray-500">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;