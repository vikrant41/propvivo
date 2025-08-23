import React from "react";
import ServiceBtns from "./ServiceBtns";
import {
  ComplianceLegalIcon1,
  ComplianceLegalIcon2,
  ComplianceLegalIcon3,
  ComplianceLegalIcon4,
  ComplianceLegalIcon5,
  ComplianceLegalIcon6,
  FullServiceIcon1,
  FullServiceIcon10,
  FullServiceIcon11,
  FullServiceIcon12,
  FullServiceIcon2,
  FullServiceIcon3,
  FullServiceIcon4,
  FullServiceIcon5,
  FullServiceIcon6,
  FullServiceIcon7,
  FullServiceIcon8,
  FullServiceIcon9,
  KeyBenefitShape1,
  KeyBenefitShape2,
  KeyBenefitShape3,
  PillarShape1,
} from "../shared/Icons";
import SectionTitle from "../CommonComponents/SectionTitle";

const operationsSupportList = [
  {
    icon: <FullServiceIcon1 />,
    title: "Bidding Engine",
    description:
      "Our proprietary bidding engine performs cost-benefit analysis to recommend the best options for your association.",
  },
  {
    icon: <FullServiceIcon2 />,
    title: "Emergency Support",
    description:
      "With 24/7 call center service, we're ready to handle emergencies. Homeowners can easily submit requests via our portal.",
  },
  {
    icon: <FullServiceIcon3 />,
    title: "Property Inspections",
    description:
      "Our association managers deliver detailed property inspection reports, including observations and images, to the Board.",
  },
  {
    icon: <FullServiceIcon4 />,
    title: "Violation Reporting",
    description:
      "Homeowners can report violations online, providing full transparency for the Board.",
  },
  {
    icon: <FullServiceIcon12 />,
    title: "Meeting Coordination",
    description:
      "Manage meetings with RSVP, attendance, agendas, minutes, and proxies ensuring smooth Board support through the portal.",
  },
  {
    icon: <FullServiceIcon5 />,
    title: "Violation Letters",
    description:
      "We automate violation letter issuance and reduce the paper trail, aligning with CC&Rs and Board directives.",
  },
];

const financialFeatures = [

  {
    icon: <FullServiceIcon7 />,
    title: "Budgeting and Forecasting",
    description:
      "We analyze past budgets, forecast needs, and coordinate reserve studies with seamless Board collaboration.",
  },
  {
    icon: <FullServiceIcon8 />,
    title: "Billing and Financial Reporting",
    description:
      "Mail billing statements, create accrual-based financial reports, and manage owner payments, including ACH.",
  },
  {
    icon: <FullServiceIcon9 />,
    title: "Vendor Payments",
    description:
      "Efficiently reimburse vendors for Board-approved or budgeted expenses.",
  },
  {
    icon: <FullServiceIcon10 />,
    title: "Delinquency Collection",
    description:
      "Work with reputable attorneys to collect overdue assessment fees, ensuring compliance and financial stability.",
  },
    {
    icon: <FullServiceIcon6 />,
    title: "Risk & Investment Services",
    description:
      "Secure insurance quotes with guidance, track claims through the portal, and assist the Board with investment of funds.",
  },
  {
    icon: <FullServiceIcon11 />,
    title: "Tax and Audit Services",
    description:
      "Prepare tax returns, process federal income tax payments, and provide audit reports.",
  },
];

const complianceFeatures = [

  {
    icon: <ComplianceLegalIcon1 />,
    title: "Record Management",
    description:
      "Maintain financial, correspondence, and governance records for the Association.",
  },
  {
    icon: <ComplianceLegalIcon2 />,
    title: "Case Tracking",
    description:
      "Homeowner correspondence is tracked through our Case Management System for easy access.",
  },
  {
    icon: <ComplianceLegalIcon3 />,
    title: "Homeowner & Renter Data",
    description:
      "Ownership and renter details are reviewed and validated monthly to ensure records remain accurate.",
  },
  {
    icon: <ComplianceLegalIcon4 />,
    title: "Document Requests",
    description:
      "Provide requested documents within 24 hours via USPS or as instructed by the Board",
  },
    {
    icon: <ComplianceLegalIcon5 />,
    title: "Project Oversight",
    description:
      "We provide project management services, monitor milestones, budgets, inspections, and share status reports with the Board.",
  },
  {
    icon: <ComplianceLegalIcon6 />,
    title: "Legal Support",
    description:
      "Compile and provide required documents if the Association is involved in legal action.",
  },
];

const FullServiceHOAmanagement = () => {
  return (
    <>
      <section className="py-12 md:py-16 bg-pvLightBlue">
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-7">
            <div className="space-y-6">
              <h2 className="lg:text-45">Full Service Management</h2>
              <p>
                For associations that require Financial Expertise without full-service management, our Financial Only Management provides dedicated support for managing financial operations and assisting the Board in maintaining financial discipline.
              </p>
            </div>
            <div className="relative">
              <div>
                <KeyBenefitShape1 className="absolute -top-7 -left-8" />
                <KeyBenefitShape2 className="absolute -bottom-7 right-1" />
                <PillarShape1 className="absolute -top-9 -right-4 lg:-right-8" />
                <img src="./img/service2.png" className="relative w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:pt-16 md:pb-10">
        <div className="container relative">
          <div className="text-center mb-7">
            <h3 className="leading-snug lg:text-4xl">
              Administrative Management
            </h3>
            <p className="lg:text-xl">
              Streamline your operations with our comprehensive administrative solutions
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-4 md:gap-8 mb-5 md:mb-11">
            {operationsSupportList.map((feature, index) => (
              <div className="p-4 md:p-5 rounded-lg shadow-keyShadow text-center bg-white" key={index}>
                  <div className="mb-5 flex justify-center">{feature.icon}</div>
                  <div>
                    <h5 className="mb-2">{feature.title}</h5>
                    <div className="text-base text-accent2">
                      {feature.description}
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-pvLightBlue">
        <div className="container relative">
          <div className="text-center mb-7">
            <h3 className="leading-snug lg:text-4xl">Financial Management</h3>
            <p className="lg:text-xl">
              Comprehensive financial solutions for transparent and efficient
              HOA operations
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-4 md:gap-8 mb-5 md:mb-11">
            {financialFeatures.map((feature, index) => (
              <div
                className="p-4 md:p-5 rounded-lg shadow-keyShadow text-center bg-white"
                key={index}
              >
                <div className="mb-5 flex justify-center">{feature.icon}</div>
                <div className="">
                  <h5 className="mb-2">{feature.title}</h5>
                  <div className="text-base text-accent2">
                    {feature.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ServiceBtns />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container relative">
          <div className="text-center mb-7">
            <h3 className="leading-snug lg:text-4xl">Records & Compliance Management</h3>
            <p className="lg:text-xl">
              Accurate records and oversight to support governance and property management
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-4 md:gap-8 mb-5 md:mb-11">
            {complianceFeatures.map((feature, index) => (
              <div
                className="p-4 md:p-5 rounded-lg shadow-keyShadow text-center bg-white"
                key={index}
              >
                <div className="mb-5 flex justify-center">{feature.icon}</div>
                <div className="">
                  <h5 className="mb-2">{feature.title}</h5>
                  <div className="text-base text-accent2">
                    {feature.description}
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

export default FullServiceHOAmanagement;
