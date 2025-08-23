import React from "react";
import ServiceBtns from "./ServiceBtns";
import { KeyBenefitShape1, KeyBenefitShape2, PillarShape1, SoftwareSolutioHOAIcon1, SoftwareSolutioHOAIcon2, SoftwareSolutioHOAIcon3, SoftwareSolutioHOAIcon4, SoftwareSolutioHOAIcon5, SoftwareSolutioHOAIcon6 } from "../shared/Icons";

const platformFeatures = [
  {
    icon: <SoftwareSolutioHOAIcon1 />,
    title: "Customizable Dashboards",
    description:
      "Tailor your dashboard to track key metrics and manage operations efficiently.",
  },
  {
    icon: <SoftwareSolutioHOAIcon2 />,
    title: "Streamlined Communication",
    description:
      "Centralized tools for managing announcements, updates, and member interactions.",
  },
  {
    icon: <SoftwareSolutioHOAIcon3 />,
    title: "Financial Oversight",
    description:
      "Access real-time financial reports, manage budgets, and track expenses seamlessly.",
  },
  {
    icon: <SoftwareSolutioHOAIcon4 />,
    title: "Amenity Management",
    description:
      "Residents can book, track, and manage amenity reservations with ease, clarity and full transparency.",
  },
  {
    icon: <SoftwareSolutioHOAIcon5 />,
    title: "Violation Tracking",
    description:
      "Homeowners can report violations online, providing full transparency for the Board.",
  },
  {
    icon: <SoftwareSolutioHOAIcon6 />,
    title: "Meeting Management",
    description:
      "Schedule and document meetings with ease, ensuring effective collaboration.",
  },
];


const SoftwareSolutionforHOA = () => {
  return (
    <>
      <section className="py-12 md:py-16 bg-pvLightBlue">
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-7">
            <div className="space-y-6">
              <h2 className="lg:text-45">Software Solution for HOA</h2>
              <p>
                Not every association requires full-service management. For those who prefer a hands-on approach, our Self-Manage Platform is the perfect solution. Designed to empower HOAs with user-friendly tools, it simplifies Community Management while maintaining control in the hands of the Board and Homeowners.
              </p>
            </div>
            <div className="relative">
              <div>
                <KeyBenefitShape1 className="absolute -top-7 -left-8" />
                <KeyBenefitShape2 className="absolute -bottom-7 right-1" />
                <PillarShape1 className="absolute -top-9 -right-4 lg:-right-8" />
                <img src="./img/service3.png" className="relative w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container relative">
          <div className="text-center mb-7">
            <h3 className="leading-snug lg:text-4xl">
              HOA Compliance Made Easy with Smart Software
            </h3>
            <p className="lg:text-xl">
              Streamline your operations with our comprehensive administrative solutions
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-4 md:gap-8 mb-5 md:mb-11">
            {platformFeatures.map((feature, index) => (
              <div
                className="p-4 md:py-5 md:px-4 rounded-lg shadow-keyShadow text-center bg-white"
                key={index}
              >
                <div className="mb-5 flex justify-center">{feature.icon}</div>
                <div className="">
                  <h5 className="mb-2">{feature.title}</h5>
                  <div className="text-base text-accent2">
                    {feature.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ServiceBtns />
        </div>
      </section>
    </>
  );
};

export default SoftwareSolutionforHOA;
