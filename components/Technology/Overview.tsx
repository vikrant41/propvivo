import React from "react";
import SubHeading from "../CommonComponents/SubHeading";
import { TransparencyIcon } from "../shared/Icons";

const Overview = () => {
  return (
    <>
      <section className="py-9 md:py-16 relative">
        <div className="container relative">
          <div className="relative">
            <div className="text-center">
              <SubHeading text="PLATFORM OVERVIEW" />
              <h2 className="leading-snug pt-2 mb-1">
                A Revolutionary HOA Management Platform <br />
                Built for{" "}
                <TransparencyIcon className="inline-block mr-1 relative top-2" />
                <span className="text-accent1">ransparency </span>
                and <span className="text-accent1">Efficiency</span>.
              </h2>
            </div>
          </div>
        </div>
        <div className="after:absolute after:bottom-0 after:left-0 after:w-full after:h-32 lg:after:h-96 after:bg-pvLightBlue after:z-0 mt-7 md:mt-16">
          <div className="container relative z-10">
            <div className="shadow-imgShadow">
              <img src="/img/overviewImg.png" className="w-full" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Overview;
