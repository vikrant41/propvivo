import React from "react";
import { Button } from "../CommonComponents/Button";
import { CallBlueIcon } from "../shared/Icons";

const ServiceBtns = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 pt-5">
        <Button>Request a Proposal</Button>
        <Button variant="secondary">
          <CallBlueIcon /> Contact Us for Custom Solutions
        </Button>
      </div>
    </>
  );
};

export default ServiceBtns;
