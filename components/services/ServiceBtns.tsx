import React from "react";
import { Button } from "../CommonComponents/Button";
import { CallBlueIcon } from "../shared/Icons";
import { useRouter } from "next/router";

const ServiceBtns = () => {
  const router = useRouter();
  const routeTo =
    process.env.NEXT_PUBLIC_LOGIN_URL || "http://login.devpropvivo.co/login";
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center gap-4 pt-5">
        <Button onClick={() => window.open(routeTo, "_blank")}>Request a Proposal</Button>
        <Button variant="secondary" onClick={() => router.push("/contact")}>
          <CallBlueIcon /> Contact Us for Custom Solutions
        </Button>
      </div>
    </>
  );
};

export default ServiceBtns;
