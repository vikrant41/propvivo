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
    icon: <FeatureIcon1 />,
    title: "Document Management",
    description: "Manage all documents online to ensure successful governance.",
  },
  {
    id: 1,
    icon: <FeatureIcon2 />,
    title: "Board Task",
    description:
      "Track all board task/projects to provide real time updates on progress.",
  },
  {
    id: 2,
    icon: <FeatureIcon3 />,
    title: "Financial Management",
    description:
      "All financial data / reports are available online for homeowners and board members.",
  },
  {
    id: 3,
    icon: <FeatureIcon4 />,
    title: "Call & Email Tracking",
    description:
      "Track all calls and emails online via our portal, including recorded phone calls.",
  },
  {
    id: 4,
    icon: <FeatureIcon5 />,
    title: "Architecture Request",
    description: "Manage improvement of your homes/unit online.",
  },
  {
    id: 5,
    icon: <FeatureIcon6 />,
    title: "Meetings",
    description:
      "Coordinate, Organize, Take meeting minutes and items to track completely online.",
  },
];

const FeatureOffer = () => {
  return (
    <>
      <section className="py-9 md:py-16 relative bg-pvLightBlue">
        <img
          src="./img/mapShape.png"
          className="absolute top-0 left-0 right-0 w-full h-full"
        />
        <div className="container relative">
          <SectionTitle
            subtitle="FEATURES"
            title="Features We Offer"
            content="Empowering Property Management with Cutting-Edge Features that Simplify, Streamline, and Elevate Your Operations. Discover Smart Solutions Designed to Enhance Efficiency and Improve Community Living Experiences."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {featureData.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6">
                <div className="flex items-center gap-x-3 border-b border-gray-o-50 pb-5 mb-5">
                  {feature.icon}
                  <h5 className="mb-0">{feature.title}</h5>
                </div>
                <div>{feature.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureOffer;
