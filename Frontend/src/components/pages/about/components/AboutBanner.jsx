import { Link } from "react-router-dom";
import { ArrowRight, Heartbeat, House } from "@phosphor-icons/react";
import bannerImage from "../../../../assets/Home-Banner.jpeg";

const AboutBanner = () => {
  return (
    <section
      className="relative flex min-h-[280px] items-center overflow-hidden bg-cover bg-center sm:min-h-[320px] lg:min-h-[350px]"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/40" />

      {/* Decorative Glow */}
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-red-600/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-48 w-48 rounded-full bg-red-500/10 blur-3xl" />

      {/* Banner Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-2 text-sm font-medium text-white/75">
            <Link
              to="/"
              className="flex items-center gap-1.5 transition hover:text-red-400"
            >
              <House size={16} weight="fill" />
              Home
            </Link>

            <span className="text-red-400">/</span>
            <span className="text-white">About Us</span>
          </div>

          {/* Label */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm sm:text-sm">
            <Heartbeat size={18} weight="fill" className="text-red-400" />
            Who We Are
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight !text-white sm:text-5xl md:text-6xl">
            About Blood Care
            
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
            We connect blood donors, hospitals, and communities through a
            simple and reliable platform, helping make life-saving blood
            available when every second matters.
          </p>

          {/* CTA */}
          <div className="mt-6">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 rounded-lg bg-red-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-800 hover:shadow-xl sm:text-base"
            >
              Join Our Mission
              <ArrowRight
                size={18}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBanner;
