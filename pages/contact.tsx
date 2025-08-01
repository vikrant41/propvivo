import React, { useEffect } from "react";
import TopBanner from "../components/CommonComponents/TopBanner";
import { useBreadcrumbs } from "../contexts/BreadCrumbContext";
import ContactSection from "../components/Contact/ContactSection";

const contact = () => {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([{ name: "propVIVO", href: "/" }, { name: "Contact Us" }]);
  }, [setBreadcrumbs]);

  return (
    <>
      <TopBanner backgroundImage="./img/aboutBanner.jpg" title="Contact Us" />
      <ContactSection />
    </>
  );
};

export default contact;
