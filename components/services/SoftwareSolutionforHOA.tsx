import React from "react";
import ServiceBtns from "./ServiceBtns";

const platformFeatures = [
  {
    title: "Customizable Dashboards",
    description:
      "Tailor your dashboard to track key metrics and manage operations efficiently.",
  },
  {
    title: "Streamlined Communication",
    description:
      "Centralized tools for managing announcements, updates, and member interactions.",
  },
  {
    title: "Financial Oversight",
    description:
      "Access real-time financial reports, manage budgets, and track expenses seamlessly.",
  },
  {
    title: "Violation Tracking",
    description:
      "Report, track, and resolve community violations in an organized and transparent manner.",
  },
  {
    title: "Meeting Management",
    description:
      "Schedule and document meetings with ease, ensuring effective collaboration.",
  },
];


const SoftwareSolutionforHOA = () => {
  return (
    <>
      <img src="./img/self-management-association-management.jpg" />
      <p>
        Not every association requires full-service management. For those who prefer a hands-on approach, our Self-Manage Platform is the perfect solution. Designed to empower HOAs with user-friendly tools, it simplifies Community Management while maintaining control in the hands of the Board and Homeowners. 
      </p>
      <h4>Key Features of the Self-Manage Platform </h4>
      <ul className="space-y-2">
        {platformFeatures.map((item, index) => (
          <li key={index} className="leading-relaxed">
            <strong className="font-semibold">{item.title}</strong>
            <br />
            {item.description}
          </li>
        ))}
      </ul>
      <p>Our platform offers the flexibility and control associations need to operate effectively while eliminating the hassle of complex processes. </p>

      <ServiceBtns />
    </>
  );
};

export default SoftwareSolutionforHOA;
