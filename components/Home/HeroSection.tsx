import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "../CommonComponents/Button";
import {
  CheckboxIcon,
  FbColoredIcon,
  InstagramColoredIcon,
  LinkedInColoredIcon,
  TopLeftIcon1,
  TopLeftIcon2,
  TopLeftIcon3,
  VideoIcon,
  XColoredIcon,
  YellowBorderIcon,
} from "../shared/Icons";
import SubHeading from "../CommonComponents/SubHeading";
import Link from "next/link";

const HeroSection = () => {
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const socialIcons = [
    {
      id: 1,
      link: "https://www.instagram.com/propvivo/?hl=en",
      icon: <InstagramColoredIcon />,
    },
    {
      id: 2,
      link: "https://www.facebook.com/Propvivo",
      icon: <FbColoredIcon />,
    },
    { id: 3, link: "", icon: <LinkedInColoredIcon /> },
    { id: 4, link: "", icon: <XColoredIcon /> },
  ];

  return (
    <section className="py-9 lg:py-16 bg-pvLightBlue">
      <div className="relative">
        <div className="">
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="space-y-4 md:space-y-5 lg:w-1/2 px-8 xl:pr-0 xl:pl-0 padLeft">
              {/* <SubHeading
                text="SINCE 2013"
                showRightLine={false}
                isLeft={true}
              /> */}
              <div
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
              </div>
              <h1 className="leading-tight space-x-3">
                Revolutionizing <br />
                <span className="text-accent1 relative lg:pl-0 lg:pr-2 inline-block">
                  <YellowBorderIcon className="absolute w-24 lg:w-full -top-5 lg:-top-2 -left-2 lg:-left-3 " />{" "}
                  HOA{" "}
                </span>{" "}
                Management
              </h1>
              <div
                className="padLeft"
                style={{
                  // maxWidth: !isMobile ? "540px" : "auto",
                  maxWidth: isMobile ? "100%" : "540px",
                }}
              >
                <p>
                  Streamline operations, reduce delinquencies, ensure
                  compliance, and experience HOA management like never before.
                  With a suite of powerful tools and intuitive features,
                  simplify your day-to-day tasks, improve and deliver a seamless
                  experience to your community.
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-7 pt-3 pb-2">
                <div className="flex items-center gap-x-2 text-pvBlack">
                  <CheckboxIcon />
                  No credit card required
                </div>
                <div className="flex items-center gap-x-2 text-pvBlack">
                  <CheckboxIcon />
                  15-day free trial
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4">
                <Button onClick={() => router.push("/about")}>
                  Explore Platform
                </Button>
                <Button variant="secondary">
                  <VideoIcon /> Request a Demo
                </Button>
              </div>
              <div className="pt-2 md:pt-6">
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
              </div>
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
              <img src="./img/DashboardView.png" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
