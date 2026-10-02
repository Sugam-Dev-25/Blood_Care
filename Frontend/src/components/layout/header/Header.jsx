import {
  Bell,
  List,
  UserCircle,
  CaretDown,
  Drop,
} from "@phosphor-icons/react";
import useAuth from "../../../hooks/useAuth";

const Header = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-gray-200/80 bg-white/95 px-4 shadow-sm backdrop-blur-md md:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl p-2.5 text-gray-600 transition-all duration-200 hover:bg-red-50 hover:text-red-800 lg:hidden"
          aria-label="Open menu"
        >
          <List size={24} weight="bold" />
        </button>

        {/* Brand */}
        <div className="flex items-center gap-3">
          {/* Small Brand Icon - Mobile/Tablet */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 lg:hidden">
            <Drop
              size={22}
              weight="fill"
              className="text-red-800"
            />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900 md:text-xl">
              Blood Care
            </h1>

            <p className="hidden text-xs font-medium text-gray-500 sm:block">
              Blood Bank Management System
            </p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notification */}
        <button
          type="button"
          className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all duration-200 hover:border-red-100 hover:bg-red-50 hover:text-red-800"
          aria-label="Notifications"
        >
          <Bell
            size={22}
            weight="duotone"
            className="transition-transform duration-200 group-hover:scale-105"
          />

          {/* Notification Dot */}
          <span className="absolute right-[9px] top-[8px] h-2.5 w-2.5 rounded-full border-2 border-white bg-red-700" />
        </button>

        {/* Divider */}
        <div className="hidden h-9 w-px bg-gray-200 sm:block" />

        {/* User Profile */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
            <UserCircle
              size={28}
              weight="duotone"
              className="text-red-800"
            />
          </div>

          {/* User Info */}
          <div className="hidden leading-tight sm:block">
            <p className="max-w-[150px] truncate text-sm font-bold text-gray-900">
              {user?.name || "User"}
            </p>

            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

              <p className="text-xs font-medium capitalize text-gray-500">
                {user?.role || "User"}
              </p>
            </div>
          </div>

          {/* Dropdown Icon */}
          <CaretDown
            size={16}
            weight="bold"
            className="hidden text-gray-400 sm:block"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;