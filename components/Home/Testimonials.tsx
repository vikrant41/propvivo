import React from "react";
import SectionTitle from "../CommonComponents/SectionTitle";
import { ArrowIcon, QuoteIcon } from "../shared/Icons";
import Slider from "react-slick";

const css1 = `
.TestimonialWrap .slick-dots li {
    width: 12px;
    height: 12px;
    margin: 0px 4px;
    display: flex;
    align-items: center;
    transition: all 0.3s;
}

.TestimonialWrap .slick-dots li button {
    width: 12px;
    height: 12px;
    padding: 0;
    border: 1px solid #4790CD;
    border-radius: 10px;
}

.TestimonialWrap .slick-dots li button:before {display: none;}

.TestimonialWrap .slick-slider .slick-dots li:before {
    display: none;
}

.TestimonialWrap .slick-dots li.slick-active {
    width: 28px;
}

.TestimonialWrap .slick-dots li.slick-active button {
    width: 26px;
    height: 8px;
    background: #4790CD;
    transition: all 0.5s;
}

.TestimonialWrap .slick-dots {
    display: flex !important;!i;!;
    justify-content: center;
    align-items: center;
}
.TestimonialWrap .slick-slider .slick-track .slick-slide {
    padding: 0 15px;
}
  
@media (min-width: 768px){
  .TestimonialWrap .slick-slider .slick-list {
    margin: 0 -15px;
    padding-bottom: 30px;
}
}`;

const Testimonials = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1, 
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const testimonialsData = [
    {
      id: 0,
      star: 5,
      description:
        "We recently moved out and had some issue with our HOA payments. Ashish in the team was very helpful as he was able to understand the situation and help to drive the issue to closure timely. Thanks to the team!",
      authorImg: "./img/authorImg.png",
      authorName: "Lan Yao",
      authorDetails: "Home Owner, Spring Vallry",
    },
    {
      id: 1,
      star: 4,
      description:
        "Had unresolved fees since takeover. I called and somebody answered. The guy Paul actually called back like he said he would and announced all late fees were taken care of as requested. Yeah!",
      authorImg: "./img/authorImg2.png",
      authorName: "Zac Jackson",
      authorDetails: "Home Owner, SA Association",
    },
    {
      id: 2,
      star: 5,
      description:
        "Propvivo is a great HOA management company. They have a great digital solution for associations. The people are professional, honest, very knowledgeable about anything HOA. They are flexible and can tailor their solutions to the individual needs of each HOA.",
      authorImg: "./img/authorImg3.png",
      authorName: "Steven Bathiche",
      authorDetails: "Board Member, Aspire Association",
    },
  ];

  return (
    <>
      <section className="py-9 md:py-16 relative TestimonialWrap">
        <style>{css1}</style>
        <img
          src="./img/mapShape.png"
          className="absolute top-0 left-0 right-0 w-full h-full"
        />
        <div className="container relative">
          <div className="relative">
            <QuoteIcon className="absolute top-2 hidden md:block" />
            <QuoteIcon className="absolute top-2 right-0 transform -scale-x-100 hidden md:block" />
            <SectionTitle
              subtitle="CUSTOMER TESTIMONIALS"
              title="Loved by Users Like You"
              content="100+ Associations have switched to propVIVO Platform and many more to count on."
            />
          </div>

          <Slider {...settings}>
            {testimonialsData.map((props, index) => (
              <div
                key={index}
                className="p-7 bg-white shadow-testimonialShadow rounded-xl space-y-7"
              >
                <div className="flex gap-x-3">
                  {[...Array(5)].map((_, idx) => (
                    <svg
                      key={idx}
                      xmlns="http://www.w3.org/2000/svg"
                      width={18}
                      height={18}
                      viewBox="0 0 18 18"
                      fill={idx < props.star ? "currentColor" : "none"}
                      stroke={idx < props.star ? "none" : "currentColor"}
                      className={` ${
                        idx < props.star ? "text-yellow-500" : "text-gray-300"
                      }`}
                    >
                      <path
                        d="M17.3203 7.93603L13.7969 11.011L14.8523 15.5892C14.9082 15.8285 14.8923 16.079 14.8065 16.3093C14.7208 16.5396 14.5691 16.7396 14.3703 16.8841C14.1716 17.0287 13.9346 17.1114 13.6891 17.1221C13.4436 17.1327 13.2003 17.0707 12.9898 16.9438L8.99688 14.522L5.0125 16.9438C4.80201 17.0707 4.55879 17.1327 4.31326 17.1221C4.06773 17.1114 3.83078 17.0287 3.63203 16.8841C3.43328 16.7396 3.28155 16.5396 3.19582 16.3093C3.11009 16.079 3.09415 15.8285 3.15 15.5892L4.20391 11.0157L0.67969 7.93603C0.49329 7.77526 0.358504 7.56304 0.292233 7.32598C0.225963 7.08892 0.231158 6.83757 0.307168 6.60345C0.383177 6.36933 0.526617 6.16287 0.719501 6.00994C0.912384 5.85702 1.14612 5.76445 1.39141 5.74384L6.03672 5.34149L7.85 1.01649C7.94469 0.789554 8.10441 0.595704 8.30905 0.459352C8.51369 0.323 8.7541 0.250244 9 0.250244C9.2459 0.250244 9.48631 0.323 9.69095 0.459352C9.89559 0.595704 10.0553 0.789554 10.15 1.01649L11.9688 5.34149L16.6125 5.74384C16.8578 5.76445 17.0915 5.85702 17.2844 6.00994C17.4773 6.16287 17.6207 6.36933 17.6967 6.60345C17.7728 6.83757 17.7779 7.08892 17.7117 7.32598C17.6454 7.56304 17.5106 7.77526 17.3242 7.93603H17.3203Z"
                        fill="#F6C460"
                        className={`${
                          idx < props.star ? "fill-[#F6C460]" : "fill-gray-300"
                        }`}
                      />
                    </svg>
                  ))}
                </div>
                <p className="line-clamp-3 overflow-hidden">{props.description}</p>
                <div className="flex items-center gap-4">
                  <img
                    src={props.authorImg}
                    alt={props.authorName || "Author"}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-pvBlack font-medium font-outfit">
                      {props.authorName || "Anonymous"}
                    </div>
                    <p className="text-15">{props.authorDetails}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
