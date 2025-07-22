import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "../CommonComponents/Button";
import {
  CheckboxIcon,
  DataDrivenShapeIcon,
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
    <section
      className=" bg-pvLightBlue relative py-12 md:py-16 bg-no-repeat bg-right-bottom"
      style={{ backgroundImage: `url(./img/datadrivenMain.png)` }}
    >
      <DataDrivenShapeIcon className="absolute -bottom-20 left-0 w-48 md:w-auto pointer-events-none" />
      <div className="relative">
        <div className="container relative">
          <div className="flex flex-col lg:flex-row">
            <div className="space-y-4 md:space-y-5 lg:w-1/2 ">
              <h2>Data-Driven Insights</h2>
              <div
                style={{ maxWidth: isMobile ? "100%" : "540px" }}
                className="padLeft"
              >
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
                {/* <Button>Download Brochure</Button> */}
                <Button onClick={() => router.push("/RequestProposal")}>
                  Request for Proposal
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => router.push("/contact")}
                >
                  <VideoIcon /> Request a Demo
                </Button>
              </div>
            </div>
            <div className="relative lg:w-1/2 bg-bottom bg-no-repeat">
              <div className="relative z-10">
                <div className="flex items-start gap-8 mb-4">
                  <img src="./img/dataProcessImg.png" />
                  <div className="hidden md:block relative bottom-6">
                    <img src="./img/dataBulbImg.png" />
                  </div>
                </div>
                <img src="./img/dataMainTwoImg.png" className="" />
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
