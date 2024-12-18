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
      description:
        "Gain real-time visibility into every aspect of your community's management with our transparent platform. HOA boards and managers can easily track operations, financials, and communications, ensuring accountability and informed decisions. <br/>Gives Visibility That Empowers Your Community. Replaces Blind Spots with Full Visibility for Your Community. <br/>Easy to Use by enhanced Technology!",
    },
    {
      id: 1,
      imageSrc: KeyBenefitImg1,
      icon: <DataDrivenIcon />,
      title: "Data-Driven Insights",
      description:
        "Gain real-time visibility into every aspect of your community's management with our transparent platform. HOA boards and managers can easily track operations, financials, and communications, ensuring accountability and informed decisions. <br/>Gives Visibility That Empowers Your Community. Replaces Blind Spots with Full Visibility for Your Community. <br/>Easy to Use by enhanced Technology!",
    },
    {
      id: 2,
      imageSrc: KeyBenefitImg1,
      icon: <SLAsIcon />,
      title: "Service Level Agreements (SLAs)",
      description:
        "Gain real-time visibility into every aspect of your community's management with our transparent platform. HOA boards and managers can easily track operations, financials, and communications, ensuring accountability and informed decisions. <br/>Gives Visibility That Empowers Your Community. Replaces Blind Spots with Full Visibility for Your Community. <br/>Easy to Use by enhanced Technology!",
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
      <section className="pt-3 pb-14 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-96 after:bg-pvLightBlue after:-z-10">
        <div className="container">
          <div className="flex flex-col items-center justify-center">
            <SectionTitle
              subtitle="WHY PROPVIVO"
              title="Key Benefits"
              content="Choose a trusted partner that blends industry-leading expertise with cutting-edge technology to provide tailored solutions for all your property management challenges. Experience unparalleled reliability, personalized support, and seamless processes designed to elevate efficiency and community satisfaction."
            />

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
