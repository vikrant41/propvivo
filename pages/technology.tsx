import React, { useEffect } from "react";
import TopBanner from "../components/CommonComponents/TopBanner";
import { useBreadcrumbs } from "../contexts/BreadCrumbContext";
import Overview from "../components/Technology/Overview";
import KeyFeatures from "../components/Technology/KeyFeatures";
import DataDriven from "../components/Technology/DataDriven";

const technology = () => {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([{ name: "PropVivo", href: "/" }, { name: "Technology" }]);
  }, [setBreadcrumbs]);

  return (
    <>
      <TopBanner backgroundImage="./img/Banner.jpg" title="Technology" />
      <Overview />
      <KeyFeatures />
      <DataDriven />
    </>
  );
};

export default technology;
