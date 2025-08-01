import React from 'react'
import { PillarInnovationIcon, PillarReliabilityIcon, PillarTransparencyIcon } from '../shared/Icons';
import SectionTitle from '../CommonComponents/SectionTitle';
import SubHeading from '../CommonComponents/SubHeading';

const featureData = [
  {
    id: 0,
    icon: <PillarInnovationIcon />,
    title: "Innovation",
    description: "Driving smarter community management through forward-thinking technology and automation.",
  },
  {
    id: 1,
    icon: <PillarTransparencyIcon />,
    title: "Transparency",
    description:
      "Transparent communication and workflows keep everyone informed and aligned.",
  },
  {
    id: 2,
    icon: <PillarReliabilityIcon />,
    title: "Reliability",
    description:
      "Dependable tech with 99.9% uptime and dedicated support, always when you need it.",
  },
];

function ThreeCorePillars() {
  return (
    <section className="py-9 md:py-16 relative">
        <div className="container relative">

          <div className="text-center mb-9 md:mb-12">
              <SubHeading text="OUR CORE" />
              <h2 className="leading-snug pt-2 mb-1">
                Our Three Core Pillars
              </h2>
              <div className="mx-auto mt-5 space-y-2">
                <p>
                  <strong>Our commitment begins with three core pillars: Innovation, Transparency, and Reliability.</strong><br /> These pillars guide how we serve HOA communities ensuring peace of mind, open communication, and consistently high-quality service. With decades of experience in association management, we turn these values into real-world results for Communities, Condominiums, and Homeowners Associations across the U.S.
                </p>
              </div>
            </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {featureData.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-testimonialShadow flex flex-col justify-center items-center gap-2 text-center">
                  {feature.icon}
                  <h5 className="mb-0 font-medium">{feature.title}</h5>

                <div>{feature.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default ThreeCorePillars