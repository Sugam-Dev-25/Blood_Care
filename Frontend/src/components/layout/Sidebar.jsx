import {
  House,
  Users,
  Hospital,
  Drop,
  ClipboardText,
  SignOut,
  CalendarCheck,
} from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { role, logout } = useAuth();

  const menuItems = {
    donor: [
      {
        label: "Dashboard",
        path: "/donor/dashboard",
        icon: House,
      },
      {
        label: "My Profile",
        path: "/donor/profile",
        icon: Users,
      },
      {
        label: "My Donations",
        path: "/donor/donations",
        icon: Drop,
      },
      {
        label: "Eligibility",
        path: "/donor/eligibility",
        icon: CalendarCheck,
      },
    ],

    hospital: [
      {
        label: "Dashboard",
        path: "/hospital/dashboard",
        icon: House,
      },
      {
        label: "Blood Requests",
        path: "/hospital/requests",
        icon: ClipboardText,
      },
      {
        label: "My Profile",
        path: "/hospital/profile",
        icon: Hospital,
      },
    ],

    admin: [
      {
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: House,
      },
      {
        label: "Donors",
        path: "/admin/donors",
        icon: Users,
      },
      {
        label: "Hospitals",
        path: "/admin/hospitals",
        icon: Hospital,
      },
      {
        label: "Blood Inventory",
        path: "/admin/inventory",
        icon: Drop,
      },
      {
        label: "Blood Requests",
        path: "/admin/requests",
        icon: ClipboardText,
      },
      {
        label: "Donations",
        path: "/admin/donations",
        icon: Drop,
      },
    ],
  };

  const items = menuItems[role] || [];

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600">
            <Drop size={22} weight="fill" className="text-white" />
          </div>

          <span className="text-xl font-bold text-gray-900">Blood Care</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-red-50 text-red-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <Icon size={20} weight="duotone" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 p-4">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <SignOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
