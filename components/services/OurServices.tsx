import React from "react";
import Tabs from "../CommonComponents/Tabs";
import FullServiceHOAmanagement from "./FullServiceHOAmanagement";
import FinancialOnlyHOAmanagement from "./FinancialOnlyHOAmanagement";
import SoftwareSolutionforHOA from "./SoftwareSolutionforHOA";
import ComplianceLegalServices from "./ComplianceLegalServices";
import VendorContractorCoordination from "./VendorContractorCoordination";
import { ServiceTabHoverIcon1, ServiceTabHoverIcon2, ServiceTabHoverIcon3, ServiceTabHoverIcon4, ServiceTabHoverIcon5, ServiceTabIcon1, ServiceTabIcon2, ServiceTabIcon3, ServiceTabIcon4, ServiceTabIcon5 } from "../shared/Icons";

const OurServices = () => {
  const tabsData = [
    {
      id: "tab1",
      label: "Full-Service Management",
      content: <FullServiceHOAmanagement />,
      icon: <ServiceTabIcon1 />,
      activeIcon: <ServiceTabHoverIcon1 />,
      activeBgColor: "bg-blue-o-400",
    },
    {
      id: "tab2",
      label: "Financial Management",
      content: <FinancialOnlyHOAmanagement />,
      icon: <ServiceTabIcon2 />,
      activeIcon: <ServiceTabHoverIcon2 />,
      activeBgColor: "bg-pvGreen",
    },
    {
      id: "tab3",
      label: "Software Solution for HOA",
      content: <SoftwareSolutionforHOA />,
      icon: <ServiceTabIcon3 />,
      activeIcon: <ServiceTabHoverIcon3 />,
      activeBgColor: "bg-pvDarkYellow",
    },
    {
      id: "tab4",
      label: "Compliance & Legal",
      content: <ComplianceLegalServices />,
      icon: <ServiceTabIcon4 />,
      activeIcon: <ServiceTabHoverIcon4 />,
      activeBgColor: "bg-pvDarkRed",
    },
    {
      id: "tab5",
      label: "Vendor Coordination",
      content: <VendorContractorCoordination />,
      icon: <ServiceTabIcon5 />,
      activeIcon: <ServiceTabHoverIcon5 />,
      activeBgColor: "bg-pvPurple",
    },
  ];

  return (
    <>
      <section className="pt-9 md:pt-16 relative">
          <Tabs tabs={tabsData} defaultActiveId="tab1" />
      </section>
    </>
  );
};

export default OurServices;
