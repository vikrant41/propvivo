import React, { useEffect, useRef, useState } from "react";
import SectionTitle from "../CommonComponents/SectionTitle";
import { ArrowIcon, QuoteIcon } from "../shared/Icons";
import Slider from "react-slick";

const css1 = `
.TestimonialWrap .rev_slider{
    max-width: 960px;
    margin: 0 auto;
}
.TestimonialWrap .slick-slider {
  margin-left: -12%;
  margin-right: -12%;
}

.TestimonialWrap .slick-list {
  padding-top: 10% !important;
  padding-bottom: 10% !important;
  padding-left: 15% !important;
  padding-right: 15% !important;
}

.TestimonialWrap .slick-track {
  max-width: 100% !important;
  transform: translate3d(0, 0, 0) !important;
  perspective: 100px;
}

.TestimonialWrap .rev_slide {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  opacity: 0;
  width: 100% !important;
  transform: translate3d(0, 0, 0);
  transition: transform 1s, opacity 1s;
  max-width: 100%;
  box-sizing: border-box;
  max-width: 808px;
  min-height: 380px;
}

.TestimonialWrap .slick-current {
  opacity: 1;
  position: relative;
  display: block;
  z-index: 2;
}

.TestimonialWrap .slick-snext {
  opacity: 1;
  transform: translate3d(19%, 0, -10px) scale(0.8);
  z-index: 1;
  perspective: 1000px;
  overflow: hidden;
}

.TestimonialWrap .slick-sprev {
  opacity: 1;
      transform: translate3d(-18%, 0, -10px) scale(0.8);
    overflow: hidden;
}

.TestimonialWrap .test {
  display: block;
  width: 100%;
  height: 300px;
  background: #c00;
  box-shadow: inset 0px 0px 0px 3px #000;
}

.TestimonialWrap .slick-dots button {
  width: 12px;
  height: 12px;
  border-radius: 9999px;
  background-color: white;
  opacity: 0.4;
  transition: opacity 0.3s;
}

.TestimonialWrap .slick-dots li.slick-active button {
  opacity: 1;
}

.TestimonialWrap .rev-dots .dots {
    width: 12px;
    height: 12px;
    display: flex;
    align-items: center;
    transition: all 0.3s;
    padding: 0;
    border: 1px solid #4790CD;
    border-radius: 10px;
    background-color: #fff;
}

.TestimonialWrap .rev-dots .dots.dot-active {
    width: 28px;
    background-color: #4790CD;
}

@media(max-width: 991px){
.TestimonialWrap .rev_slider {max-width: calc(100% - 120px);}
}

@media(max-width: 767px){
.TestimonialWrap .rev_slider {max-width: calc(100% - 40px);}
.TestimonialWrap .slick-sprev {transform: translate3d(-15%, 0, -10px) scale(0.8);}
.TestimonialWrap .slick-snext {transform: translate3d(15%, 0, -10px) scale(0.8);} 
}

`;

const testimonialsData = [
  {
    id: 0,
    star: 5,
    title: "Their Experience in Headlines",
    description:
      "The support team was exceptionally attentive, swiftly addressing a long-standing concern with fairness and efficiency. Their prompt response and clear communication demonstrated a deep understanding of the issue, they maintained a high level of professionalism and empathy, which made a real difference.",
    subTitle:
      "Ashish was incredibly responsive and helped resolve a long-pending issue quickly and fairly",
    authorName: "Lan Yao",
    authorDetails: "Home Owner, Spring Vallry",
  },
  {
    id: 1,
    star: 5,
    title: "propVIVO is a great HOA management company.",
    description:
      "propVIVO is a great HOA management company. They have a great digital solution for associations. The people are professional, honest, very knowledgeable about anything HOA. They are flexible and can tailor their solutions to the individual needs of each HOA.",
    subTitle: "",
    authorName: "Steven Bathiche",
    authorDetails: "Board Member, Aspire Association",
  },
  {
    id: 2,
    star: 5,
    title: "Had unresolved fees since takeover.",
    description:
      "Had unresolved fees since takeover. I called and somebody answered. The guy Paul actually called back like he said he would and announced all late fees were taken care of as requested. Yeah!",
    subTitle: "",
    authorName: "Zac Jackson",
    authorDetails: "Home Owner, SA Association",
  },
  {
    id: 3,
    star: 5,
    title: "I am giving propVIVO 5 Stars",
    description:
      "I'm President of Loomis Trail HOA, located in Northwest Washington. After 1 year of experience working with the propVIVO management team assigned to our HOA, we have improved HOA Communications. We have improved HOA Fiscal Transparency, and we have improved HOA Governing Documents. Today, I am giving propVIVO 5 Stars. Change is never easy. If you are willing to collaborate with a cutting-edge management team, to bring about positive change, then I recommend propVIVO.",
    subTitle: "",
    authorName: "Renee J.",
    authorDetails: "President, Loomis Trail HOA",
  },
];

const Testimonials = () => {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const total = testimonialsData.length;

  const getSlideClass = (index) => {
    if (index === activeSlide) return "slick-current";
    if (index === (activeSlide + 1) % total) return "slick-snext";
    if (index === (activeSlide - 1 + total) % total) return "slick-sprev";
    return "";
  };

  const getVisibleSlides = () => {
    const indices = [
      (activeSlide - 1 + total) % total,
      activeSlide,
      (activeSlide + 1) % total,
    ];
    return indices.map((i) => ({
      index: i,
      className: getSlideClass(i),
      content: testimonialsData[i],
    }));
  };

  const settings = {
    arrows: false, 
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    beforeChange: (_, next) => setActiveSlide(next),
  };

  // Initialize once
  useEffect(() => {
    setActiveSlide(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000); 
    return () => clearInterval(interval);
  }, [activeSlide]);

  const handlePrev = () => sliderRef.current?.slickPrev();
  const handleNext = () => sliderRef.current?.slickNext();

  return (
    <>
      <section className="py-9 md:py-16 relative TestimonialWrap text-white">
        <style>{css1}</style>
        <div className="after:absolute after:bg-accent/60 after:top-0 after:left-0 after:w-full after:h-full after:z-10">
          <img
            src="./img/testimonialBg.jpg"
            className="absolute top-0 left-0 right-0 w-full h-full z-10"
          />
        </div>
        <div className="container relative z-10">
          <div className="relative">
            <QuoteIcon className="absolute top-2 hidden md:block" />
            <QuoteIcon className="absolute top-2 right-0 transform -scale-x-100 hidden md:block" />
            <div className="text-center mb-9 md:mb-12">
              <div
                className={`flex items-center justify-center gap-2.5 text-white`}
                style={{ gap: "10px" }}
              >
                <div
                  className="w-7 h-0.5 bg-lightGreen rounded-xl"
                  style={{ height: "3px" }}
                />
                <div className="font-outfit text-base tracking-wide">
                  Real Experiences, Real Results
                </div>
                <div
                  className="w-7 h-0.5 bg-lightGreen rounded-xl"
                  style={{ height: "3px" }}
                />
              </div>
              <h2 className="leading-snug pt-2 mb-1 text-white">
                Stories from our Happy Customers
              </h2>
              <div className="mx-auto mt-1 space-y-2 text-white">
                <p className="text-white">
                  Numerous Associations Have Switched to the propVIVO Platform,
                  with Many More Joining
                </p>
              </div>
            </div>
          </div>

          <div className="rev_slider relative">
            {/* Display only visible slides with transforms */}
            <div className="relative">
              {getVisibleSlides().map(({ index, className, content }) => (
                <div
                  key={index}
                  className={`p-4 md:p-8 bg-white shadow-testimonialShadow rounded-xl space-y-5 font-outfit text-center rev_slide ${className}`}
                >
                  <div className="text-pvBlack font-semibold text-2xl">
                    {content.title}
                  </div>

                  <p className="text-pvBlack font-medium line-clamp-5 overflow-hidden">
                    {content.description}
                  </p>
                  <p className="text-accent2 text-base font-karla">
                    {content.subTitle}
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div>
                      <div className="text-pvBlack font-medium font-outfit text-base">
                        - {content.authorName || "Anonymous"}
                      </div>
                      <p className="text-accent2 text-base font-karla">
                        {content.authorDetails}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center gap-x-3">
                    {[...Array(5)].map((_, idx) => (
                      <svg
                        key={idx}
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                        viewBox="0 0 18 18"
                        fill={idx < content.star ? "currentColor" : "none"}
                        stroke={idx < content.star ? "none" : "currentColor"}
                        className={` ${
                          idx < content.star
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      >
                        <path
                          d="M17.3203 7.93603L13.7969 11.011L14.8523 15.5892C14.9082 15.8285 14.8923 16.079 14.8065 16.3093C14.7208 16.5396 14.5691 16.7396 14.3703 16.8841C14.1716 17.0287 13.9346 17.1114 13.6891 17.1221C13.4436 17.1327 13.2003 17.0707 12.9898 16.9438L8.99688 14.522L5.0125 16.9438C4.80201 17.0707 4.55879 17.1327 4.31326 17.1221C4.06773 17.1114 3.83078 17.0287 3.63203 16.8841C3.43328 16.7396 3.28155 16.5396 3.19582 16.3093C3.11009 16.079 3.09415 15.8285 3.15 15.5892L4.20391 11.0157L0.67969 7.93603C0.49329 7.77526 0.358504 7.56304 0.292233 7.32598C0.225963 7.08892 0.231158 6.83757 0.307168 6.60345C0.383177 6.36933 0.526617 6.16287 0.719501 6.00994C0.912384 5.85702 1.14612 5.76445 1.39141 5.74384L6.03672 5.34149L7.85 1.01649C7.94469 0.789554 8.10441 0.595704 8.30905 0.459352C8.51369 0.323 8.7541 0.250244 9 0.250244C9.2459 0.250244 9.48631 0.323 9.69095 0.459352C9.89559 0.595704 10.0553 0.789554 10.15 1.01649L11.9688 5.34149L16.6125 5.74384C16.8578 5.76445 17.0915 5.85702 17.2844 6.00994C17.4773 6.16287 17.6207 6.36933 17.6967 6.60345C17.7728 6.83757 17.7779 7.08892 17.7117 7.32598C17.6454 7.56304 17.5106 7.77526 17.3242 7.93603H17.3203Z"
                          fill="#F6C460"
                          className={`${
                            idx < content.star
                              ? "fill-[#F6C460]"
                              : "fill-gray-300"
                          }`}
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Hidden Slick for slide state tracking only */}
            <div className="opacity-0 pointer-events-none absolute top-0 h-full">
              <Slider
                ref={sliderRef}
                {...settings}
                beforeChange={(_, next) => setActiveSlide(next)}
              >
                {testimonialsData.map((content, index) => (
                  <div key={index}>{/* ...your slide content here... */}</div>
                ))}
              </Slider>
            </div>

            {/* Custom Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 z-50 flex justify-between items-center w-full">
              <button
                onClick={handlePrev}
                className="w-10 md:w-16 h-10 md:h-16 -ml-7 rounded-full bg-accent1 hover:bg-pvBlack flex justify-center items-center transition-all duration-300"
              >
                <ArrowIcon className="rotate-180" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 md:w-16 h-10 md:h-16 -mr-7 rounded-full bg-accent1 hover:bg-pvBlack flex justify-center items-center transition-all duration-300"
              >
                <ArrowIcon />
              </button>
            </div>

            <div className="flex justify-center mt-8 gap-2 rev-dots">
  {testimonialsData.map((_, index) => (
    <button
      key={index}
      onClick={() => sliderRef.current?.slickGoTo(index)}
      className={`dots ${
        index === activeSlide ? "dot-active" : ""
      }`}
    ></button>
  ))}
</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
