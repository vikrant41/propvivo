import React, { useEffect } from "react";
import { useBreadcrumbs } from "../contexts/BreadCrumbContext";
import TopBanner from "../components/CommonComponents/TopBanner";
import OurServices from "../components/services/OurServices";

const services = () => {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([{ name: "PropVivo", href: "/" }, { name: "Services" }]);
  }, [setBreadcrumbs]);

  return (
    <>
      <TopBanner backgroundImage="./img/Banner.jpg" title="Services" />
      <OurServices />
    </>
  );
};

export default services;
