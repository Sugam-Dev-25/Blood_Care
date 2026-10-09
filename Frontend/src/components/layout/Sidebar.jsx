import {
  House,
  Users,
  Hospital,
  Drop,
  ClipboardText,
  SignOut,
  CalendarCheck,
  CaretRight,
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

      {
        label: "Audit Logs",
        path: "/admin/audit-logs",
        icon: ClipboardText,
      },
    ],
  };

  const items = menuItems[role] || [];

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col overflow-hidden border-r border-red-950/30 bg-gradient-to-b from-red-900 via-red-800 to-red-950 shadow-xl">
      {/* =================================
          Decorative Background
      ================================= */}

      <div className="pointer-events-none absolute -bottom-10 -left-8 opacity-10">
        <Drop
          size={180}
          weight="fill"
          className="text-white"
        />
      </div>

      <div className="pointer-events-none absolute -bottom-16 right-[-35px] opacity-[0.07]">
        <Drop
          size={190}
          weight="fill"
          className="text-white"
        />
      </div>

      {/* =================================
          Logo
      ================================= */}

      <div className="relative z-10 flex h-[76px] items-center border-b border-white/10 px-6">
        <div className="flex items-center gap-3">
          {/* Logo Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md">
            <Drop
              size={23}
              weight="fill"
              className="!text-red-800"
            />
          </div>

          {/* Logo Text */}
          <div>
            <h1 className="text-xl font-bold tracking-tight !text-white">
              Blood Care
            </h1>

            <p className="text-[10px] font-medium tracking-wide !text-white/70">
              BLOOD BANK MANAGEMENT
            </p>
          </div>
        </div>
      </div>

      {/* =================================
          Navigation
      ================================= */}

      <nav className="relative z-10 flex-1 space-y-2 overflow-y-auto px-3 py-6">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "!bg-white !text-red-800 shadow-lg shadow-red-950/20"
                    : "!text-white hover:!bg-white/10 hover:!text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active Indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-red-700" />
                  )}

                  {/* Menu Icon */}
                  <Icon
                    size={21}
                    weight={isActive ? "fill" : "duotone"}
                    className={
                      isActive
                        ? "!text-red-700"
                        : "!text-white"
                    }
                  />

                  {/* Menu Label */}
                  <span
                    className={
                      isActive
                        ? "!text-red-800"
                        : "!text-white"
                    }
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* =================================
          Bottom Section
      ================================= */}

      <div className="relative z-10 border-t border-white/10 p-4">
        {/* System Status */}
        <div className="mb-3 flex items-center gap-2 px-2 text-[11px] !text-white/70">
          <span className="h-2 w-2 rounded-full bg-green-400 shadow-sm shadow-green-300" />

          <span className="!text-white/70">
            System Active
          </span>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={logout}
          className="group flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-semibold !text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:!text-white"
        >
          <SignOut
            size={21}
            weight="duotone"
            className="!text-white transition-transform duration-200 group-hover:-translate-x-0.5"
          />

          <span className="!text-white">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;