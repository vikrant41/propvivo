import React from "react";
import SectionTitle from "../CommonComponents/SectionTitle";
import { FeatureIcon1, FeatureIcon2, FeatureIcon5, OurStoryShapeIcon } from "../shared/Icons";

const keyMilestoneData = [
  {
    id: 0,
    icon: <FeatureIcon1 />,
    title: "Compliance Issues",
    percentage: "40%",
    description: "Reduction in compliance issues for early clients.",
  },
  {
    id: 1,
    icon: <FeatureIcon2 />,
    title: "Faster Service",
    percentage: "50%",
    description:
      "Faster service request resolutions. Enhancing community satisfaction.",
  },
  {
    id: 2,
    icon: <FeatureIcon5 />,
    title: "Resident engagement",
    percentage: "30%",
    description: "increase in resident engagement through communication tools.",
  },
];

const OurStory = () => {
  return (
    <>
      <section className="py-12 md:py-16">
        <div className="relative">
          <OurStoryShapeIcon className="absolute -top-28 right-0 w-48 md:w-auto" />
          <div className="container relative">
            <SectionTitle subtitle="OUR STORY" title="Journey to Success" />
            <div className="grid md:grid-cols-7 items-center gap-8 md:gap-x-10 lg:gap-x-16">
              <div className="relative md:col-span-3">
                <h4 className="font-medium leading-none mb-9">
                  Revolutionizing HOA Management for Modern Communities
                </h4>
                <div className="flex items-center">
                  <img src="./img/HomeImg.png" />
                  <div className="flex items-center -mt-9 -ml-4">
                  <img src="./img/processArrow.png" className="object-contain" />
                  <span className="font-caveat text-pvBlack text-15 md:text-2xl lg:whitespace-nowrap -ml-9 mt-20">
                    Redefining HOA management.
                  </span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-4">
                <p>
                  propVIVO was founded to address inefficiencies in HOA management caused by outdated systems. Delays, compliance issues, and fragmented communication inspired us to create a modern platform that simplifies operations and enhances transparency. 
                </p>
                <p>
                  Our technology streamlines processes with automated tasks, centralized communication, and real-time data, empowering HOAs to operate efficiently while ensuring faster resolutions and greater accountability for all stakeholders. 
                </p>
              </div>
            </div>

            <div className="p-5 md:p-7 rounded-3xl shadow-slideShadow space-y-8 mt-8 md:mt-16">
              <div className="flex flex-col items-center justify-center text-center">
                <h4 className="font-medium">Our Key Milestones</h4>
                <p>
                  Celebrating a journey of innovation and impact, we take pride in the progress we’ve made to transform HOA management. These achievements highlight our commitment to excellence:
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {keyMilestoneData.map((data, index) => (
                  <div
                    key={index}
                    className="md:border-r border-gray-o-50 last-of-type:border-r-0"
                  >
                    <div className="flex items-center gap-x-3 mb-4">
                      {data.icon}
                      <h5 className="mb-0">{data.title}</h5>
                    </div>
                    <div className="flex gap-x-1.5">
                      <span className="text-xl md:text-3xl text-pvBlack font-semibold">
                        {data.percentage}
                      </span>
                      {data.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurStory;
