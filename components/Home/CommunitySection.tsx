import React from "react";
import { Button } from "../CommonComponents/Button";

const CommunitySection = () => {
  return (
    <>
      <section className="py-9 md:py-20 relative bg-pvLightBlue ">
        <div className="after:absolute after:bg-accent/60 after:top-0 after:left-0 after:w-full after:h-full after:z-10">
          <img
            src="./img/CommunityBg.jpg"
            className="absolute top-0 left-0 right-0 w-full h-full z-10"
          />
        </div>
        <div className="container relative z-10">
          <div className="flex flex-col justify-center gap-5 text-center">
            <h2 className="text-white leading-tight">
              Ready to Transform Your Community? <br />
              Let's Get Started...
            </h2>
            <div className="flex justify-center">
              <Button>Request for Proposal</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommunitySection;
