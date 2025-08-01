import React from "react";
import ServiceBtns from "./ServiceBtns";
import {
  FinancialManagementIcon1,
  FinancialManagementIcon2,
  FinancialManagementIcon3,
  FinancialManagementIcon4,
  FinancialManagementIcon5,
  FinancialManagementIcon6,
  KeyBenefitShape1,
  KeyBenefitShape2,
  PillarShape1,
} from "../shared/Icons";

const financialSections = [
  {
    icon: <FinancialManagementIcon1 />,
    title: "Budgeting",
    description:
      "Stay up to date with local, state, and federal regulations to avoid penalties and ensure seamless operations.",
  },
  {
    icon: <FinancialManagementIcon2 />,
    title: "Accounts Receivable / Collections",
    description:
      "We simplify collections with multiple payment options and automated reminders to support timely homeowner assessments.",
  },
  {
    icon: <FinancialManagementIcon3 />,
    title: "Disbursements / Accounts Payable",
    description:
      "We manage and process vendor payments efficiently, ensuring timely disbursements aligned with Board approvals and contracts.",
  },
  {
    icon: <FinancialManagementIcon4 />,
    title: "Financial Reporting",
    description:
      "We deliver real-time, customizable financial reports, offering on-demand access to monthly statements and Board-ready summaries.",
  },
  {
    icon: <FinancialManagementIcon5 />,
    title: "Auditing / Tax Returns",
    description:
      "We streamline audits and tax filings with expert preparation and seamless submission for timely Board review.",
  },
  {
    icon: <FinancialManagementIcon6 />,
    title: "Collections / Delinquency",
    description:
      "We track delinquent accounts, issue notices, and collaborate with legal partners to enforce collection policies effectively.",
  },
];
const FinancialOnlyHOAmanagement = () => {
  return (
    <>
      <section className="py-12 md:py-16 bg-pvLightBlue">
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-7">
            <div className="space-y-6">
              <h2 className="lg:text-45">Financial Management</h2>
              <p>
                For associations that require Financial Expertise without
                full-service management, our Financial Only Management provides
                dedicated support for managing financial operations and
                assisting the Board in maintaining financial discipline.
              </p>
            </div>
            <div className="relative">
              <div>
                <KeyBenefitShape1 className="absolute -top-7 -left-8" />
                <KeyBenefitShape2 className="absolute -bottom-7 right-1" />
                <PillarShape1 className="absolute -top-9 -right-4 lg:-right-8" />
                <img src="./img/service1.png" className="relative w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container relative">
          <div className="text-center mb-7">
            <h3 className="leading-snug lg:text-4xl">
              Accurate, Transparent, and Board-Ready Financial Oversight
            </h3>
            <p className="lg:text-xl">
              Protect your community with expert legal support and regulatory
              compliance solutions
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-4 md:gap-8 mb-5 md:mb-11">
            {financialSections.map((feature, index) => (
              <div
                className="p-4 md:py-5 md:px-2 rounded-lg shadow-keyShadow text-center bg-white"
                key={index}
              >
                <div className="mb-5 flex justify-center">{feature.icon}</div>
                <div className="">
                  <h5 className="mb-2">{feature.title}</h5>
                  <div className="text-17 text-accent2">
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

export default FinancialOnlyHOAmanagement;
