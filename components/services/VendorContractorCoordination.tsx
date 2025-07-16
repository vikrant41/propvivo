import React from "react";
import ServiceBtns from "./ServiceBtns";

const vendorManagementServices = [
  {
    title: "Vendor Selection",
    description:
      "Assist in selecting reliable vendors and contractors through a detailed bidding and evaluation process.",
  },
  {
    title: "Contract Negotiation",
    description:
      "Negotiate contracts to secure favourable terms while ensuring compliance with community requirements.",
  },
  {
    title: "Performance Monitoring",
    description:
      "Track vendor and contractor performance to ensure timely and quality delivery of services.",
  },
  {
    title: "Expense Management",
    description:
      "Categorize and monitor expenses, ensuring that all costs align with the approved budget.",
  },
  {
    title: "Legal Support",
    description:
      "Collaborate with experienced attorneys to handle disputes, collection efforts, and other legal matters.",
  },
  {
    title: "Transparent Communication",
    description:
      "Act as a liaison between the Board, vendors, and contractors, ensuring clarity and alignment on expectations.",
  },
  {
    title: "Issue Resolution",
    description:
      "Address and resolve any vendor-related issues promptly to avoid disruptions in operations.",
  },
];


const VendorContractorCoordination = () => {
  return (
    <>
      <img src="./img/association-management4.jpg" />
      <p>
        For associations that require Financial Expertise without full-service
        management, our Financial Only Management provides dedicated support for
        managing financial operations and assisting the Board in maintaining
        financial discipline. 
      </p>
      <h4>Key Services We Offer </h4>
      <ul className="space-y-2">
        {vendorManagementServices.map((item, index) => (
          <li key={index} className="leading-relaxed">
            <strong className="font-semibold">{item.title}</strong>
            <br />
            {item.description}
          </li>
        ))}
      </ul>

      <ServiceBtns />
    </>
  );
};

export default VendorContractorCoordination;
