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
      <p>Experience unmatched clarity in HOA management through our transparent, real-time platform. Monitor operations, financials, and communications with ease — promoting accountability and smarter decisions.</p>
      <ul class="list-disc pl-5 mt-2 space-y-2">
        <li><strong>Empowers communities with complete visibility</strong></li>
        <li>Eliminates blind spots for enhanced oversight</li>
        <li>User-friendly design powered by advanced technology</li>
      </ul>
    `,
    },
    {
      id: 1,
      imageSrc: KeyBenefitImg2,
      icon: <DataDrivenIcon />,
      title: "Data-Driven Insights",
      description: `
      <p>Gain real-time visibility into every aspect of your community's management with our transparent platform. HOA boards and managers can effortlessly track operations, financials, and communications to ensure accountability and informed decisions. </p>
      <ul class="list-disc pl-5 mt-2 space-y-2">
        <li><strong>Empowers Communities with Full Transparency </strong></li>
        <li>Eliminates blind spots with comprehensive visibility.</li>
        <li>Intuitive and easy to use with advanced technology.</li>
      </ul>
    `,
    },
    {
      id: 2,
      imageSrc: KeyBenefitImg3,
      icon: <SLAsIcon />,
      title: "Service Level Agreements (SLAs)",
      description: `
      <p>Achieve clarity and reliability with our robust SLAs. Our platform ensures seamless service tracking for HOA operations, enhancing efficiency and accountability at every level. </p>
      <ul class="list-disc pl-5 mt-2 space-y-2">
        <li><strong>Delivers Consistent and Measurable Results </strong></li>
        <li>Replaces ambiguity with clear service benchmarks. </li>
        <li>Designed for ease of use and precision. </li>
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
              <h4 className="leading-snug pt-2 mb-1">
                Your Modern, Transparent, and Reliable HOA Partner
              </h4>
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
