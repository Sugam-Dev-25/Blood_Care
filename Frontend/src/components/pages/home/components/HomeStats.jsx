
import {
  Heartbeat,
  Stethoscope,
  UsersThree,
  Buildings,
} from "@phosphor-icons/react";

const stats = [
  {
    id: 1,
    value: "2,578",
    label: "Success Smile",
    icon: Heartbeat,
    iconColor: "text-red-500",
  },
  {
    id: 2,
    value: "3,235",
    label: "Happy Donors",
    icon: Stethoscope,
    iconColor: "text-red-500",
  },
  {
    id: 3,
    value: "3,568",
    label: "Happy Recipient",
    icon: UsersThree,
    iconColor: "text-red-500",
  },
  {
    id: 4,
    value: "1,364",
    label: "Total Awards",
    icon: Buildings,
    iconColor: "text-red-500",
  },
];

const HomeStats = () => {
  return (
    <section className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.id}
              className="group flex min-h-[250px] flex-col items-center justify-center bg-white px-5 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-h-[280px]"
            >
              {/* Icon */}
              <Icon
                size={62}
                weight="fill"
                className={`${stat.iconColor} transition-transform duration-300 group-hover:scale-110`}
              />

              {/* Number */}
              <h3 className="mt-7 text-3xl font-bold leading-none text-red-500 sm:text-4xl">
                {stat.value}
              </h3>

              {/* Label */}
              <p className="mt-5 text-xl font-medium text-gray-950 sm:text-2xl">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HomeStats;