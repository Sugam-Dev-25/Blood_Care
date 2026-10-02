
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import bannerImage from "../../../../assets/Home-Banner.jpeg";

const HomeBanner = () => {
  return (
    <section
      className="relative flex min-h-[420px] items-center overflow-hidden bg-cover bg-center sm:min-h-[460px] lg:min-h-[480px]"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/65 to-slate-950/25" />

      {/* Decorative Glow */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-red-600/15 blur-3xl" />

      {/* Banner Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-12 lg:py-14">
        <div className="max-w-3xl">

          {/* Heading - Completely White */}
          <h1 className="!text-white text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Donate Blood,
            <span className="block !text-white">
              Save Lives.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-xl !text-white/90 text-sm leading-7 sm:text-base sm:leading-8 lg:text-lg">
            Your one simple act can make a lifetime of difference.
            Join Blood Care to connect donors, hospitals, and communities
            and help save lives when it matters most.
          </p>

          {/* CTA Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-red-700 px-6 py-3.5 text-sm font-bold !text-white shadow-lg shadow-red-950/30 transition-all duration-300 hover:-translate-y-1 hover:bg-red-800 hover:shadow-xl sm:px-7 sm:text-base"
            >
              Become a Donor
              <ArrowRight
                size={19}
                weight="bold"
                className="text-white transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-lg border border-white/60 bg-white/10 px-7 py-3.5 text-sm font-bold !text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:!text-red-800 sm:text-base"
            >
              Sign In
            </Link>
          </div>

          {/* Supporting Text */}
          <p className="mt-4 text-xs font-medium tracking-wide !text-white/80 sm:text-sm">
            Be a hero. Give the gift of life.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;