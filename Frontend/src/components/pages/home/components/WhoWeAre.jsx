
import React from "react";
import whoWeAreImage from "../../../../assets/Home-Banner.jpeg";

const features = [
  "Specialist blood donors and clinical supervision.",
  "Increasing communication with our members.",
  "High quality assessment, diagnosis and treatment.",
  "Examine critically to ensure alignment.",
  "The extra care of a multi-disciplinary team.",
];

const WhoWeAre = () => {
  return (
    <section className="overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-0">
          {/* Left Content */}
          <div className="relative z-10 bg-gray-50 px-6 py-8 sm:px-8 sm:py-10 lg:col-span-7 lg:-mr-12 lg:px-12 lg:py-10">
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-gray-700 sm:text-5xl">
              Who We Are?
            </h2>

            <div className="mt-3 h-[3px] w-20 bg-red-500" />

            <p className="mt-7 text-base leading-8 text-gray-700 sm:text-lg">
              Blood Care is a reliable blood donation management platform
              connecting donors, hospitals, and administrators to support
              blood donation and improve access to life-saving resources.
            </p>

            {/* Features */}
            <ul className="mt-5 space-y-3.5">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-base leading-7 text-gray-700 sm:text-lg"
                >
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full border border-red-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Image - No Video */}
          <div className="relative lg:col-span-5">
            <div className="h-[280px] overflow-hidden sm:h-[380px] lg:h-[465px]">
              <img
                src={whoWeAreImage}
                alt="Blood donation and patient care"
                className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;