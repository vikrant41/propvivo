import React, { useState, useEffect } from "react";
import { Button } from "../CommonComponents/Button";
import {
  KeyBenefitShape1,
  KeyBenefitShape2,
  KeyBenefitShape3,
} from "../shared/Icons";
import { useRouter } from "next/router";

type propsType = {
  imageSrc?: any;
  icon?: any;
  title?: string;
  description?: string;
  features?: string[];
};

const css = `
.slider-container {
	width: 100%;
	margin: 0 auto;
}

.slick-slider .slick-prev,
.slick-slider .slick-next {
	background: #4790CD;
	width: 68px;
	height: 68px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 100px;
	transition: all 0.5s;
	z-index: 10;
}

.slick-slider .slick-prev:hover,
.slick-slider .slick-next:hover {
	background: black;
	transition: all 0.5s;
}

.slick-slider .slick-next {
	right: -30px;
}

.slick-slider .slick-prev {
	left: -30px;
}

.slick-slider .slick-prev:before,
.slick-slider .slick-next:before {
	content: "";
}

.KeyBenefitSlider .slick-slider .slick-dots li button:before {
	background: #fff;
	content: "";
	width: 10px;
	height: 10px;
	border-radius: 50px;
}

.KeyBenefitSlider .slick-list {
	box-shadow: 0px 4px 50px 0px #00000014;
	border-radius: 14px;
	background: #fff;
}

.KeyBenefitSlider .slick-slider .slick-dots li.slick-active button:before {
	opacity: 1;
}

.KeyBenefitSlider .slick-slider .slick-dots li button {
	padding: 0;
	width: 100%;
	height: 100%;
}

.KeyBenefitSlider .slick-slider .slick-dots li {
	width: auto;
	height: auto;
	margin: 0;
}

.slick-slider .slick-dots li:before {
	content: "";
	width: 100%;
	height: 4px;
	background: #4790CD;
	position: absolute;
	left: 0;
	right: 0;
  opacity: 0;
  transition: all 0.5s;
}

.KeyBenefitSlider .slick-slider .slick-dots li.slick-active:before {
	opacity: 1;
}

.KeyBenefitSlider .slick-slider .slick-dots li .customDot {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 20px 30px;
}

.KeyBenefitSlider .slick-slider .slick-dots li .customDot span {
	font-size: 18px;
	font-weight: 600;
	color: #1B1B1B;
}

.KeyBenefitSlider .slick-slider .slick-dots li .customDot svg {
	width: 40px;
	height: 40px;
}

.KeyBenefitSlider .slick-slider .slick-dots {
	display: flex !important;
	justify-content: space-between;
	position: relative;
	border-top: 1px solid #D9D9D9;
	margin-top: 30px;
}

@media (max-width: 1024px){
.slick-slider .slick-prev, .slick-slider .slick-next {
    width: 48px;
    height: 48px;
    }
.slick-slider .slick-next{
 right: -10px;
}
.slick-slider .slick-prev{
 left: -10px
}
 .KeyBenefitSlider .slick-slider .slick-dots li .customDot{
 gap: 8px;
 padding: 10px;
 }
}

@media (max-width: 767px){
.slick-slider .slick-next, .slick-slider .slick-prev, .KeyBenefitSlider .slick-slider .slick-dots{
 display: none!important;
}
}

`;

const KeyBenefitSlides: React.FC<propsType> = ({
  imageSrc,
  icon,
  title,
  description,
  features,
}) => {

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

  return (
    <>
      <style>{css}</style>
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-7 gap-y-7 lg:gap-x-8 items-end p-7 md:p-12 bg-white">
        <div
          className="space-y-5 lg:col-span-3 text-left"
          style={{ minWidth: "240px", maxWidth: isMobile ? "100%" : "549px" }}
        >
          {icon}
          <h4>{title}</h4>
          {/* <div className="self-stretch">
            {description?.split("<br/>").map((text, index) => (
              <p key={index}>{text.trim()}</p>
            ))}
          </div> */}
          <div
            className="self-stretch space-y-2 text-sm text-gray-600"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <div className="mt-8">
            <Button
              onClick={() => router.push("/contact")}
            >
              Connect to Explore
            </Button>
          </div>
        </div>
        <div className="relative lg:col-span-4">
          <div>
            <KeyBenefitShape1 className="absolute -top-7 -left-8" />
            <KeyBenefitShape2 className="absolute -top-5 right-36" />
            <KeyBenefitShape3 className="absolute -top-9 -right-4" />
            <img
              loading="lazy"
              src={imageSrc?.src}
              className="rounded-2xl z-10 relative shadow-slideShadow"
              alt={title}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default KeyBenefitSlides;
