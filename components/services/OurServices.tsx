import React from "react";
import Tabs from "../CommonComponents/Tabs";
import FullServiceHOAmanagement from "./FullServiceHOAmanagement";
import FinancialOnlyHOAmanagement from "./FinancialOnlyHOAmanagement";
import SoftwareSolutionforHOA from "./SoftwareSolutionforHOA";
import ComplianceLegalServices from "./ComplianceLegalServices";
import VendorContractorCoordination from "./VendorContractorCoordination";

const OurServices = () => {
  const tabsData = [
    {
      id: "tab1",
      label: "Full Service HOA management",
      content: <FullServiceHOAmanagement />,
    },
    {
      id: "tab2",
      label: "Financial Only HOA management",
      content: <FinancialOnlyHOAmanagement /> ,
    },
    {
      id: "tab3",
      label: "Software Solution for HOA",
      content: <SoftwareSolutionforHOA />,
    },
    {
      id: "tab4",
      label: "Compliance & Legal Services",
      content: <ComplianceLegalServices />
    },
    {
      id: "tab5",
      label: "Vendor & Contractor Coordination",
      content: <VendorContractorCoordination />
    },
  ];

  return (
    <>
      <section className="py-9 md:py-16 relative">
        <div className="container relative">
          <Tabs tabs={tabsData} defaultActiveId="tab1" />
        </div>
      </section>
    </>
  );
};

export default OurServices;
