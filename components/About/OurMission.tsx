import React from "react";
import {
  MissionIcon1,
  MissionIcon2,
  MissionIcon3,
  PillarShape1,
  PillarShape3,
  TopLeftIcon1,
  TopLeftIcon2,
} from "../shared/Icons";
import { Button } from "../CommonComponents/Button";

const ourMissionData = [
  {
    id: 0,
    icon: <MissionIcon1 />,
    title: "Technology Transparency",
    description: "At Propvivo, our mission is simple yet profound",
  },
  {
    id: 1,
    icon: <MissionIcon2 />,
    title: "Data-Driven Insights",
    description:
      "At Propvivo, our mission is simple yet profound",
  },
  {
    id: 2,
    icon: <MissionIcon3 />,
    title: "Service Level Agreements (SLAs)",
    description:
      "At Propvivo, our mission is simple yet profiund: to revolutionize HOA management through cutting-edge technology.",
  },
];

const OurMission = () => {
  return (
    <>
      <section className="py-12 md:py-16 bg-pvLightBlue">
        <div className="relative">
          <div className="container">
            <div className="grid md:grid-cols-7 items-center gap-8 md:gap-x-10 lg:gap-x-16">
              <div className="relative md:col-span-3">
                <PillarShape1 className="absolute -top-9 -left-6 md:-left-9" />
                <PillarShape3 className="absolute -right-2 md:-right-5 -bottom-5" />
                <div className="border-8 border-white shadow-imageshadow relative">
                  <img src="./img/OurMission1.jpg" className="w-full h-full" />
                </div>
              </div>
              <div className="md:col-span-4">
                <div className="flex gap-x-5">
                  <h2>Our Mission</h2>
                  <div className="relative">
                    <TopLeftIcon1 className="absolute bottom-4 -left-1" />
                    <TopLeftIcon2 className="relative" />
                  </div>
                </div>
                <p>
                  At Propvivo, our mission is simple yet profound: to
                  revolutionize HOA management through cutting-edge technology
                  and a commitment to transparency. We believe managing
                  communities should be easy, so we built an intuitive,
                  data-driven platform for HOAs and homeowners.
                </p>

                <div className="grid md:grid-cols-2 gap-4 my-7">
                  {ourMissionData.map((data, index) => (
                    <div
                      key={index}
                      className={`bg-white rounded-xl p-6 ${
                        index > 1 ? "md:col-span-2" : ""
                      }`}
                    >
                      <div className="flex items-center gap-x-3 mb-4">
                        {data.icon}
                        <h6 className="mb-0">{data.title}</h6>
                      </div>
                      <div>{data.description}</div>
                    </div>
                  ))}
                </div>

                <Button>Join Us on Our Journey</Button>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurMission;
