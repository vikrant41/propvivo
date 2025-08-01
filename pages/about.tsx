import React, { useEffect } from "react";
import TopBanner from "../components/CommonComponents/TopBanner";
import { useBreadcrumbs } from "../contexts/BreadCrumbContext";
import OurMission from "../components/About/OurMission";
import OurStory from "../components/About/OurStory";
import OurTeam from "../components/About/OurTeam";
import Ourvalues from "../components/About/OurValues";
import OurKeymilestones from "../components/About/OurKeymilestones";

const about = () => {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([{ name: "propVIVO", href: "/" }, { name: "About Us" }]);
  }, [setBreadcrumbs]);

  return (
    <>
      <TopBanner backgroundImage="./img/aboutBanner.jpg" title="About Us" />
      <OurMission />
      <OurKeymilestones />
      <OurStory />
      {/* <OurTeam /> */}
      <Ourvalues />
    </>
  );
};

export default about;
