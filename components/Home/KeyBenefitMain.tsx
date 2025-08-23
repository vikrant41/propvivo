import React from "react";
import Slider from "react-slick";
import {
  ArrowIcon,
  DataDrivenIcon,
  SLAsIcon,
  TechnologyTransparencyIcon,
} from "../shared/Icons";
import SectionTitle from "../CommonComponents/SectionTitle";
import KeyBenefitSlides from "./KeyBenefitSlides";

import KeyBenefitImg1 from "../../public/img/AccountingDashboard.png";
import KeyBenefitImg2 from "../../public/img/AccountingDashboard2.png";
import KeyBenefitImg3 from "../../public/img/AccountingDashboard3.png";
import SubHeading from "../CommonComponents/SubHeading";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "flex" }}
      onClick={onClick}
    >
      <ArrowIcon />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "flex" }}
      onClick={onClick}
    >
      <ArrowIcon className="rotate-180" />
    </div>
  );
}

const KeyBenefitMain = (props) => {
  const keyData = [
    {
      id: 0,
      imageSrc: KeyBenefitImg1,
      icon: <TechnologyTransparencyIcon />,
      title: "Technology Transparency",
      description: `
      <p>Experience unmatched clarity in HOA management with our platform that delivers real-time tracking of operations, financials, and communications.</p>
      <p>This transparency builds trust and empowers boards and homeowners to make informed decisions quickly. </p>
      <ul class="list-disc pl-5 mt-2 space-y-2">
        <li>Full visibility into community activities.</li>
        <li>Enhance trust through accessible data.</li>
        <li>Modern interface designed for simplicity.</li>
      </ul>
    `,
    },
    {
      id: 1,
      imageSrc: KeyBenefitImg2,
      icon: <DataDrivenIcon />,
      title: "Data-Driven Insights",
      description: `
      <p>Turn complex data into actionable intelligence with our analytics tools. Gain deep insights into community trends, financial health, and resident engagement to proactively improve operations and plan strategically.</p>
      <ul class="list-disc pl-5 mt-2 space-y-2">
        <li>Analytics that drive smarter decision-making.</li>
        <li>Monitor key performance indicators easily.</li>
        <li>Data visualization designed for busy managers.</li>
      </ul>
    `,
    },
    {
      id: 2,
      imageSrc: KeyBenefitImg3,
      icon: <SLAsIcon />,
      title: "Service Level Agreements (SLAs)",
      description: `
      <p>Ensure consistent quality and accountability with clearly defined SLAs that track service requests and turnaround times. Our platform helps enforce standards, reducing delays and boosting resident satisfaction.</p>
      <ul class="list-disc pl-5 mt-2 space-y-2">
        <li>Clear benchmarks for service delivery.</li>
        <li>Automated tracking and reporting of requests.</li>
        <li>Improve responsiveness and operational efficiency.</li>
      </ul>
    `,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    customPaging: (i) => (
      <div className="customDot">
        {keyData[i].icon}
        <span>{keyData[i].title}</span>
      </div>
    ),
  };

  return (
    <>
      <section className="py-14 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-96 after:bg-pvLightBlue after:-z-10">
        <div className="container">
          <div className="flex flex-col items-center justify-center">
            <div className="text-center mb-9 md:mb-12">
              <SubHeading text="WHY PROPVIVO" />
              <h2 className="leading-snug pt-2 mb-1 mx-auto" style={{maxWidth: "800px"}}>
                Your Modern, Transparent, and 
                Reliable HOA Partner
              </h2>
              <div className="mx-auto mt-5 space-y-2">
                <p>
                  Partner with a leader that combines expertise with advanced
                  technology to deliver customized solutions for your property
                  management needs. Enjoy unmatched reliability, tailored
                  support, and streamlined processes that boost efficiency and
                  enhance community satisfaction.
                </p>
              </div>
            </div>

            <div className="slider-container KeyBenefitSlider">
              <Slider {...settings}>
                {keyData.map((item, index) => (
                  <KeyBenefitSlides
                    key={item.id}
                    imageSrc={item.imageSrc}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default KeyBenefitMain;
