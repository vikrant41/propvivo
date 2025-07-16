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
    description:
      "Centralized document storage with secure access control and version tracking.",
    featureImg: "./img/featureImage1.png",
  },
  {
    id: 1,
    icon: <FeatureIcon2 />,
    title: "Task Management",
    description:
      "Streamlined board task tracking with automated workflows and deadlines.",
    featureImg: "./img/featureImage2.png",
  },
  {
    id: 2,
    icon: <FeatureIcon3 />,
    title: "Financial Dashboard",
    description:
      "Real-time financial reporting with budget tracking and expense management.",
    featureImg: "./img/featureImage3.png",
  },
  {
    id: 3,
    icon: <FeatureIcon4 />,
    title: "Communication Hub",
    description:
      "Integrated call and email tracking with response time analytics.",
    featureImg: "./img/featureImage4.png",
  },
  {
    id: 4,
    icon: <FeatureIcon5 />,
    title: "Analytics & Reports",
    description:
      "Streamlined board task tracking with automated workflows and deadlines.",
    featureImg: "./img/featureImage5.png",
  },
  {
    id: 5,
    icon: <FeatureIcon6 />,
    title: "Meeting Management",
    description:
      "Real-time financial reporting with budget tracking and expense management.",
    featureImg: "./img/featureImage6.png",
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
            subtitle="FEATURES"
            title="Features We Offer"
            content="Empowering Property Management with Cutting-Edge Features that Simplify, Streamline, and Elevate Your Operations. Discover Smart Solutions Designed to Enhance Efficiency and Improve Community Living Experiences."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {featureData.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 flex flex-col justify-between gap-5">
                <div>
                  <div className="flex items-center gap-x-3 pb-5">
                    {feature.icon}
                    <h5 className="mb-0">{feature.title}</h5>
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
