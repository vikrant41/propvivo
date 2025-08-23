import React from "react";
import {
  OurhmServiceIcon1,
  OurhmServiceIcon2,
  OurhmServiceIcon3,
  PillarInnovationIcon,
  PillarReliabilityIcon,
  PillarTransparencyIcon,
  RightBlueArrowIcon,
} from "../shared/Icons";
import SubHeading from "../CommonComponents/SubHeading";
import Link from "next/link";
import { useRouter } from "next/router";

const featureData = [
  {
    id: 0,
    icon: <OurhmServiceIcon1 />,
    title: "Full-Service <br/> HOA Management",
    description:
      "Our professionally qualified team supports every aspect of your association's operations, ensuring smooth and reliable day-to-day management for your community.",
    link: "/services",
  },
  {
    id: 1,
    icon: <OurhmServiceIcon2 />,
    title: "Financial-Only<br/> HOA Management",
    description:
      "Gain a complete, 360° view of your association’s financial records with our financial-only management service giving your board confidence, accuracy, and transparency.",
    link: "/services#tab2",
  },
  {
    id: 2,
    icon: <OurhmServiceIcon3 />,
    title: "Software Solution<br/> for Self-Managed HOAs",
    description:
      "Empower your board with our easy-to-use platform to manage your community and homeowners association independently, with full control and transparency.",
    link: "/services#tab3",
  },
];

function OurhmServices() {
  const router = useRouter();
  return (
    <section className="py-9 md:py-16 relative bg-pvLightBlue">
      <div className="container relative">
        <div className="text-center mb-9 md:mb-12">
          <SubHeading text="OUR SERVICES" />
          <h2 className="leading-snug pt-2 mb-1">
            Our HOA Management Services
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {featureData.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg py-8 px-7 shadow-testimonialShadow flex flex-col items-center gap-2 text-center"
            >
              <div className="shrink-0 h-14">{feature.icon}</div>
              <h5 className="mb-2 font-medium" dangerouslySetInnerHTML={{ __html: feature.title }} />

              <div>{feature.description}</div>
              <div className="mt-2">
                <Link href={feature.link} passHref>
                  <a
                    className={`font-outfit text-accent1 flex items-center gap-2 group`}
                  >
                    Read More <RightBlueArrowIcon className="group-hover:translate-x-1 transition-all duration-300" />
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurhmServices;
