import React from "react";
import SectionTitle from "../CommonComponents/SectionTitle";
import {
  FeatureIcon1,
  FeatureIcon2,
  FeatureIcon5,
  KeyFeature1,
  KeyFeature2,
  KeyFeature3,
  KeyFeature4,
  KeyFeature5,
  KeyFeature6,
  OurStoryShapeIcon,
} from "../shared/Icons";
import Timeline from "../Technology/Timeline";

const timelineData = [
  {
    icon: <KeyFeature1 />,
    year: "2013",
    title: "Company Foundation",
    description:
      "Incorporated propVIVO with our first office in Bellevue, WA. Started our journey to revolutionize HOA management.",
    titleColor: "#FC500A",
  },
  {
    icon: <KeyFeature2 />,
    year: "2014 - 2018",
    title: "First Clients & Growth",
    description:
      "Signed our first contract with TCH client. Achieved highest number of client acquisitions in our early years. Onboarded our biggest client with 475 lots (WDS).",
    titleColor: "#4CAF50",
  },
  {
    icon: <KeyFeature3 />,
    year: "2019 - 2022",
    title: "Digital Transformation",
    description:
      "Successfully launched propVIVO Official Portal. Opened international office in Surat and initiated mobile app project.",
    titleColor: "#14B8A6",
  },
  {
    icon: <KeyFeature4 />,
    year: "2023",
    title: "Revenue Milestone",
    description:
      "Achieved 51% revenue growth to $1.51 Million USD. Secured 3 provisional patents pending approval.",
    titleColor: "#FFB000",
  },
  {
    icon: <KeyFeature5 />,
    year: "2024",
    title: "AI Innovation Era",
    description:
      "Launched AI Co-Pilot project in Estonia. Built mobile app for Homeland City and founded Neuralia.AI company.",
    titleColor: "#EF4444",
  },
  {
    icon: <KeyFeature6 />,
    year: "2025",
    title: "Redefining propVIVO",
    description:
      "Introduced smarter tools, new interface, and optimized performance for scale and efficiency.",
    titleColor: "#3B82F6",
  },
];

const OurStory = () => {
  return (
    <>
      <section className="py-12 md:py-16 bg-pvLightBlue">
        <div className="relative">
          {/* <OurStoryShapeIcon className="absolute -top-28 right-0 w-48 md:w-auto" /> */}
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
                    <img
                      src="./img/processArrow.png"
                      className="object-contain"
                    />
                    <span className="font-caveat text-pvBlack text-15 md:text-2xl lg:whitespace-nowrap -ml-9 mt-20">
                      Redefining HOA management.
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-4">
                <p>
                  Propvivo was founded to address inefficiencies in HOA
                  management caused by outdated systems. Delays, compliance
                  issues, and fragmented communication inspired us to create a
                  modern platform that simplifies operations and enhances
                  transparency. Our technology streamlines processes with
                  automated tasks, centralized communication, and real-time
                  data, empowering HOAs to operate efficiently while ensuring
                  faster resolutions and greater accountability for all
                  stakeholders.
                </p>
              </div>
            </div>

            
            <div className="relative">
            <Timeline data={timelineData} />
            <img
              src="./img/mapShape2.png"
              className="absolute top-52 left-0 right-0 w-full h-auto"
            />
          </div>

          </div>
        </div>

        
      </section>
    </>
  );
};

export default OurStory;
