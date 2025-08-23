import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "../CommonComponents/Button";
import {
  HoaIcon,
  MoneyIcon,
  NoFeesIcon,
  OperationsIcon,
  ReliableSupportIcon,
  StaredIcon,
  StarIcon,
  TopLeftIcon1,
  TopLeftIcon2,
  TopLeftIcon3,
  TrustCommunitiesIcon,
  VideoIcon,
  YellowBorderIcon,
} from "../shared/Icons";
import Link from "next/link";

const HeroSection = () => {
  const router = useRouter();
  const routeTo =
    process.env.NEXT_PUBLIC_LOGIN_URL;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const socialIcons = [
  //   {
  //     id: 1,
  //     link: "https://www.instagram.com/propvivo/?hl=en",
  //     icon: <InstagramColoredIcon />,
  //   },
  //   {
  //     id: 2,
  //     link: "https://www.facebook.com/Propvivo",
  //     icon: <FbColoredIcon />,
  //   },
  //   { id: 3, link: "", icon: <LinkedInColoredIcon /> },
  //   { id: 4, link: "", icon: <XColoredIcon /> },
  // ];

  return (
    <section className="py-9 lg:py-16 bg-pvLightBlue">
      <div className="relative">
        <div className="">
          <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-3">
            <div className="space-y-4 md:space-y-5 lg:w-1/2 px-8 xl:pr-0 xl:pl-0 padLeft">
              {/* <div
                className={`flex items-center justify-start gap-2.5`}
                style={{ gap: "10px" }}
              >
                <div
                  className="w-7 h-0.5 bg-lightGreen rounded-xl"
                  style={{ height: "3px" }}
                />
                <div className="font-outfit text-base uppercase tracking-wide text-pvBlack">
                  SINCE 2013
                </div>
              </div> */}
              <h1 className="leading-tight space-x-3">
                Transparent 
                <span className="text-accent1 relative mx-2 lg:ml-3 inline-block">
                  <span className="relative z-10">HOA{" "}</span>
                  <YellowBorderIcon className="absolute w-24 lg:w-full lg:min-w-40 -top-5 lg:-top-2 -left-2 lg:-left-3 z-0" />{" "}
                </span><br />
                Management
              </h1>
              <div
                className="padLeft"
                style={
                  {
                    // maxWidth: !isMobile ? "540px" : "auto",
                    // maxWidth: isMobile ? "100%" : "540px",
                  }
                }
              >
                <p>
                 {`We deliver HOA management that’s transparent, responsive, and tailored to your community’s needs. We streamline operations, reduce delinquencies, automate compliance, and enhance communication all from one intuitive platform. Whatever your community needs, we help you manage smarter and serve better.`}
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4 pt-2 md:pt-8">
                <Button onClick={() => router.push("/RequestProposal")}>
                Request for Proposal
              </Button>
                {/* <Button
                  variant="secondary"
                  onClick={() => router.push("/contact")}
                >
                  <VideoIcon /> Request a Demo
                </Button> */}
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-2 pt-4 md:pt-8 pb-2 font-outfit font-medium text-base">
                <div className="flex items-center gap-x-4 text-associationGray leading-tight text-base">
                  <TrustCommunitiesIcon className="flex-shrink-0" />
                  Trusted Communities
                </div>
                <div className="flex items-center gap-x-4 text-associationGray leading-tight text-base">
                  <OperationsIcon className="flex-shrink-0" />
                  Transparent Operations
                </div>
                <div className="flex items-center gap-x-4 text-associationGray leading-tight text-base">
                  <ReliableSupportIcon className="flex-shrink-0" />
                  24/7 Customer Support
                </div>
              </div>
              
              {/* <div className="pt-2 md:pt-6">
                <h3 className="text-lg text-pvBlack">Follow us on:</h3>
                <div className="flex gap-x-4 mt-5">
                  {socialIcons.map((item) => (
                    <Link key={item.id} href={item.link} passHref>
                      <a target="_blank" rel="noopener noreferrer">
                        {item.icon}
                      </a>
                    </Link>
                  ))}
                </div>
              </div> */}
            </div>
            <div className="relative lg:w-1/2">
              <div className="flex flex-col md:flex-row items-end justify-between mb-6 px-4 md:px-9 relative">
                <div className="-mb-3 hidden md:block">
                  <TopLeftIcon1 className="absolute bottom-0" />
                  <TopLeftIcon2 className="relative" />
                </div>
                <TopLeftIcon3 className="absolute left-28 -bottom-20 hidden md:block" />
                <div className="flex flex-col md:flex-row items-end gap-1">
                  <span className="font-caveat text-pvBlack text-2xl">
                    Now Integrated with
                  </span>
                  <img
                    src="./img/TopArrowImg.png"
                    className="-mb-6 hidden md:block"
                  />
                  <img src="./img/CoPilotImg.png" className="" />
                </div>
              </div>
              <img
                src="./img/DashboardView.png"
                // className="w-full md:w-11/12"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
