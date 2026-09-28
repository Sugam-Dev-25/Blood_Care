import {
  Bell,
  List,
  UserCircle,
} from "@phosphor-icons/react";
import useAuth from "../../../hooks/useAuth";

const Header = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          aria-label="Open menu"
        >
          <List size={24} />
        </button>

        <div>
          <h1 className="text-lg font-bold text-gray-900">
            Blood Care
          </h1>

          <p className="hidden text-xs text-gray-500 sm:block">
            Blood Bank Management System
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative rounded-xl p-2.5 text-gray-600 transition hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell size={22} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600" />
        </button>

        <div className="hidden items-center gap-2 border-l border-gray-200 pl-3 sm:flex">
          <UserCircle
            size={34}
            weight="duotone"
            className="text-red-600"
          />

          <div className="leading-tight">
            <p className="text-sm font-semibold text-gray-900">
              {user?.name || "User"}
            </p>

            <p className="text-xs capitalize text-gray-500">
              {user?.role || "User"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;