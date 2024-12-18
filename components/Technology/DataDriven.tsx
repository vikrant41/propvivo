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

const DataDriven = (props) => {
  const router = useRouter();

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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className=" bg-pvLightBlue overflow-hidden">
      <div className="relative">
        <div className="">
          <div className="flex flex-col lg:flex-row">
            <div className="space-y-4 md:space-y-5 lg:w-1/2 padLeft py-9 md:py-16 pl-4 lg:pl-0">
              <h2>Data-Driven Insights</h2>
              <div style={{ maxWidth: isMobile ? "100%" : "540px" }} className="padLeft">
                <p>
                  Turning data into actionable insights, our property management
                  platform empowers decision-makers with real-time performance
                  tracking and predictive analytics. By analyzing trends, we
                  identify potential risks such as delinquency spikes and
                  compliance issues before they impact your operations. Our
                  tools transform raw data into clear insights, helping you stay
                  proactive, optimize management, and enhance overall community
                  health.
                </p>
                <p>
                  Our HOA automation platform provides property managers with
                  Real-time Transparency and Data-driven Tools, using advanced
                  analytics to track key metrics, identify trends, and predict
                  issues, enabling proactive decision-making and smoother
                  operations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-x-4 pt-5">
                <Button>Download Brochure</Button>
                <Button variant="secondary">
                  <VideoIcon /> Request a Demo
                </Button>
              </div>
            </div>
            <div
              className="relative lg:w-1/2 pt-3 lg:pt-12 pb-10 lg:pb-16 pl-4 lg:pl-20 pr-4 lg:pr-0 bg-bottom bg-no-repeat"
              style={{ backgroundImage: `url(./img/datadrivenMain.png)` }}
            >
              <div className="relative z-10">
                <img src="./img/dataProcessImg.png" />
                <div className="grid grid-cols-12 items-start justify-between gap-5 md:gap-10 pt-7">
                  <div className="mt-6 col-span-2 hidden md:block">
                    <img src="./img/dataBulbImg.png" />
                    <img src="./img/databelowBlub.png" className="-ml-3 mt-1" />
                  </div>
                  <img src="./img/dataMainTwoImg.png" className="w-full col-span-12 md:col-span-10" />
                </div>
              </div>
              {/* <img src="./img/datadrivenMain.png" className="w-full h-full absolute top-0 right-0" /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataDriven;
