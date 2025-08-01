import React from "react";
import ServiceBtns from "./ServiceBtns";
import { KeyBenefitShape1, KeyBenefitShape2, PillarShape1, VendorCoordinationIcon1, VendorCoordinationIcon2, VendorCoordinationIcon3, VendorCoordinationIcon4, VendorCoordinationIcon5, VendorCoordinationIcon6, VendorCoordinationIcon7 } from "../shared/Icons";

const vendorManagementServices = [
  {
    icon: <VendorCoordinationIcon1 />,
    title: "Vendor Selection",
    description:
      "Assist in selecting reliable vendors and contractors through a detailed bidding and evaluation process.",
  },
  {
    icon: <VendorCoordinationIcon2 />,
    title: "Contract Negotiation",
    description:
      "Negotiate contracts to secure favorable terms while ensuring compliance with community requirements.",
  },
  {
    icon: <VendorCoordinationIcon3 />,
    title: "Performance Monitoring",
    description:
      "Track vendor and contractor performance to ensure timely and quality delivery of services.",
  },
  {
    icon: <VendorCoordinationIcon4 />,
    title: "Expense Management",
    description:
      "Categorize and monitor expenses, ensuring that all costs align with the approved budget.",
  },
  {
    icon: <VendorCoordinationIcon5 />,
    title: "Legal Support",
    description:
      "Collaborate with experienced attorneys to handle disputes, collection efforts, and other legal matters.",
  },
  {
    icon: <VendorCoordinationIcon6 />,
    title: "Transparent Communication",
    description:
      "Act as a liaison between the Board, vendors, and contractors, ensuring clarity and alignment on expectations.",
  },
  {
    icon: <VendorCoordinationIcon7 />,
    title: "Issue Resolution",
    description:
      "Address and resolve any vendor-related issues promptly to avoid disruptions in operations.",
  },
];


const VendorContractorCoordination = () => {
  return (
    <>
      <section className="py-12 md:py-16 bg-pvLightBlue">
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-7">
            <div className="space-y-6">
              <h2 className="lg:text-45">Vendor Coordination</h2>
              <p>
                Efficient Vendor and Contractor Management is essential for maintaining the smooth operation of your community. Our comprehensive coordination services ensure timely execution of projects, transparent communication, and cost-effective solutions.
              </p>
            </div>
            <div className="relative">
              <div>
                <KeyBenefitShape1 className="absolute -top-7 -left-8" />
                <KeyBenefitShape2 className="absolute -bottom-7 right-1" />
                <PillarShape1 className="absolute -top-9 -right-4 lg:-right-8" />
                <img src="./img/service5.png" className="relative w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container relative">
          <div className="text-center mb-7">
            <h3 className="leading-snug lg:text-4xl">
              Seamless Vendor Coordination
            </h3>
            <p className="lg:text-xl">
              Keep your community running smoothly with expert vendor and contractor management
            </p>
          </div>

          <div className="flex flex-wrap justify-center -mx-4">
            {vendorManagementServices.map((feature, index) => (
              <div className="md:basis-1/2 mxl:basis-1/3 px-4 mb-4 md:mb-8" key={index}>
                <div className="h-full flex flex-col p-4 md:p-5 rounded-lg shadow-keyShadow text-center bg-white">
                  <div className="mb-5 flex justify-center">{feature.icon}</div>
                  <div>
                    <h5 className="mb-2">{feature.title}</h5>
                    <div className="text-17 text-accent2">
                      {feature.description}
                    </div>
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

export default VendorContractorCoordination;
