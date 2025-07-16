import React from "react";
import ServiceBtns from "./ServiceBtns";

const operationsSupportList = [
  {
    title: "Bidding Engine",
    description:
      "Our proprietary bidding engine performs cost-benefit analysis to recommend the best options for your association.",
  },
  {
    title: "Emergency Support",
    description:
      "With 24/7 call center service, we’re ready to handle emergencies. Homeowners can easily submit requests via our portal.",
  },
  {
    title: "Property Inspections",
    description:
      "Our association managers deliver detailed property inspection reports, including observations and images, to the Board.",
  },
  {
    title: "Violation Reporting",
    description:
      "Homeowners can report violations online, providing full transparency for the Board.",
  },
  {
    title: "Violation Letters",
    description:
      "We automate violation letter issuance and reduce the paper trail, aligning with CC&Rs and Board directives.",
  },
];

const financialFeatures = [
  {
    title: "Real-Time Insights",
    description:
      "Access real-time financial information for every aspect of association management.",
  },
  {
    title: "Budgeting and Forecasting",
    description:
      "We analyze past budgets, forecast needs, and coordinate reserve studies with seamless Board collaboration.",
  },
  {
    title: "Billing and Financial Reporting",
    description:
      "Prepare and mail billing statements, create accrual-based financial reports, and manage owner payments, including ACH.",
  },
  {
    title: "Vendor Payments",
    description:
      "Efficiently reimburse vendors for Board-approved or budgeted expenses.",
  },
  {
    title: "Delinquency Collection",
    description:
      "Work with reputable attorneys to collect overdue assessment fees, ensuring compliance and financial stability.",
  },
  {
    title: "Tax and Audit Services",
    description:
      "Prepare tax returns, process federal income tax payments, and provide audit reports.",
  },
];

const FullServiceHOAmanagement = () => {
  return (
    <>
      <img src="./img/association-management.jpg" />
      <p>
        From planning to execution, we provide dedicated support to meet the
        operational needs of your association. Our comprehensive services can be
        tailored to your association’s unique requirements, ensuring effective
        management at every step.
      </p>
      <h4>Administrative Management</h4>
      <ul className="space-y-2">
        {operationsSupportList.map((item, index) => (
          <li key={index} className="leading-relaxed">
            <strong className="font-semibold">{item.title}</strong>
            <br />
            {item.description}
          </li>
        ))}
      </ul>

      <h4>Financial Management</h4>
      <ul className="space-y-2">
        {financialFeatures.map((item, idx) => (
          <li key={idx} className="leading-relaxed">
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

export default FullServiceHOAmanagement;
