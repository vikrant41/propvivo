import React from "react";
import SectionTitle from "../CommonComponents/SectionTitle";
import {
  FeatureIcon1,
  FeatureIcon2,
  FeatureIcon3,
  FeatureIcon4,
  FeatureIcon5,
  FeatureIcon6,
} from "../shared/Icons";

const featureData = [
  {
    id: 0,
    icon: <FeatureIcon3 />,
    title: "Financial Dashboard",
    description:
      "Get real-time insights into budgets, expenses, and financial health all in one place.",
    featureImg: "./img/featureImage3.png",
  },
  {
    id: 1,
    icon: <FeatureIcon6 />,
    title: "Meeting Management",
    description:
      "Plan and run meetings with built-in agenda tools, minutes capture, and follow-up tracking.",
    featureImg: "./img/featureImage6.png",
  },
  {
    id: 2,
    icon: <FeatureIcon1 />,
    title: "Document Management",
    description:
      "Centralized document storage with secure access controls, version history, and easy retrieval.",
    featureImg: "./img/featureImage1.png",
  },

  {
    id: 3,
    icon: <FeatureIcon4 />,
    title: "Violation Management",
    description:
      "Simplify violation handling with digital notices, reminders, and transparent tracking for fair enforcement.",
    featureImg: "./img/featureImage4.png",
  },
  {
    id: 4,
    icon: <FeatureIcon5 />,
    title: "ARC Management",
    description:
      "Simplify architectural requests with digital submissions, approvals, and tracking for faster decisions.",
    featureImg: "./img/featureImage5.png",
  },
  {
    id: 5,
    icon: <FeatureIcon2 />,
    title: "Task Management",
    description:
      "Track board tasks efficiently with intuitive workflows, reminders, and deadline alerts.",
    featureImg: "./img/featureImage2.png",
  },
];

const FeatureOffer = () => {
  return (
    <>
      <section className="py-9 md:py-16 relative bg-pvLightBlue">
        {/* <img
          src="./img/mapShape.png"
          className="absolute top-0 left-0 right-0 w-full h-full"
        /> */}
        <div className="container relative">
          <SectionTitle
            subtitle="KEY FEATURES WE OFFER"
            title="Elevate Your Management Experience"
            content="Empowering property management with cutting-edge tools that simplify, streamline, and elevate operations. Discover smart solutions designed to enhance efficiency and enrich the community living experience"
            maxWidth="914px"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {featureData.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 flex flex-col justify-between gap-5"
              >
                <div>
                  <div className="flex items-center gap-x-3 pb-5">
                    {feature.icon}
                    <h5 className="mb-0 font-medium">{feature.title}</h5>
                  </div>
                  <div>{feature.description}</div>
                </div>
                <div>
                  <img src={feature.featureImg} className="" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureOffer;
