import React from "react";
import registrationImage from "../../../../assets/Home-Banner.jpeg";
import screeningImage from "../../../../assets/Home-Banner.jpeg";
import donationImage from "../../../../assets/Home-Banner.jpeg";
const donationSteps = [
  {
    number: "1",
    title: "REGISTRATION",
    image: registrationImage,
    description:
      "You need to complete a very simple registration form, which contains all required contact information to enter the donation process.",
  },
  {
    number: "2",
    title: "SCREENING",
    image: screeningImage,
    description:
      "A drop of blood from your finger will be taken for a simple test to ensure that your blood iron levels are suitable for the donation process.",
  },
  {
    number: "3",
    title: "DONATION",
    image: donationImage,
    description:
      "After successfully passing the screening test, you will be directed to a donor bed for donation. The process usually takes only 6–10 minutes.",
  },
];
const DonationProcess = () => {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {" "}
      <div className="mx-auto max-w-7xl">
        {" "}
        {/* Section Heading */}{" "}
        <div className="mb-10 text-center sm:mb-12">
          {" "}
          <h2 className="text-3xl font-extrabold tracking-wide text-gray-800 sm:text-4xl md:text-5xl">
            {" "}
            DONATION PROCESS{" "}
          </h2>{" "}
          <div className="mx-auto mt-4 h-[3px] w-20 bg-red-600" />{" "}
          <p className="mx-auto mt-5 max-w-4xl text-base leading-7 text-gray-600 sm:text-lg md:text-xl">
            {" "}
            The donation process from the time you arrive at the center until
            the time you leave.{" "}
          </p>{" "}
        </div>{" "}
        {/* Donation Steps */}{" "}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {" "}
          {donationSteps.map((step) => (
            <article
              key={step.number}
              className="group overflow-hidden bg-gray-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {" "}
              {/* Image */}{" "}
              <div className="relative h-56 overflow-hidden sm:h-64">
                {" "}
                <img
                  src={step.image}
                  alt={step.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />{" "}
                {/* Number Badge */}{" "}
                <div className="absolute bottom-0 right-0 flex h-24 w-24 items-center justify-center bg-red-600/85 sm:h-28 sm:w-28">
                  {" "}
                  <span className="text-6xl font-extrabold text-white sm:text-7xl">
                    {" "}
                    {step.number}{" "}
                  </span>{" "}
                </div>{" "}
              </div>{" "}
              {/* Card Content */}{" "}
              <div className="min-h-[250px] p-6 sm:p-7">
                {" "}
                <h3 className="text-2xl font-bold tracking-wide text-gray-900 sm:text-3xl">
                  {" "}
                  {step.title}{" "}
                </h3>{" "}
                <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg sm:leading-[1.8]">
                  {" "}
                  {step.description}{" "}
                </p>{" "}
              </div>{" "}
            </article>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
};
export default DonationProcess;
