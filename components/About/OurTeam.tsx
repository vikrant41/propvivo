import React from "react";
import SectionTitle from "../CommonComponents/SectionTitle";
import { ArrowIcon, QuoteIcon } from "../shared/Icons";
import Slider from "react-slick";

const css1 = `
.ourTeamWrap .slick-slider {
    width: calc(100% + 80px);
}
.ourTeamWrap .slick-dots li {
    width: 12px;
    height: 12px;
    margin: 0px 4px;
    display: flex;
    align-items: center;
    transition: all 0.3s;
}

.ourTeamWrap .slick-dots li button {
    width: 12px;
    height: 12px;
    padding: 0;
    border: 1px solid #4790CD;
    border-radius: 10px;
}

.ourTeamWrap .slick-dots li.slick-active {
    width: 28px;
}

.ourTeamWrap .slick-dots li.slick-active button {
    width: 26px;
    height: 8px;
    background: #4790CD;
    transition: all 0.5s;
}

.ourTeamWrap .slick-dots {
    display: flex !important;!i;!;
    justify-content: center;
    align-items: center;
}
.ourTeamWrap .slick-slider .slick-track .slick-slide {
    padding: 0 30px;
}

.ourTeamWrap .slick-slider .slick-prev,
.ourTeamWrap .slick-slider .slick-next {
	background: #4790CD;
	width: 68px;
	height: 68px;
    margin-top: -25px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 100px;
	transition: all 0.5s;
	z-index: 20;
}

.ourTeamWrap .slick-slider .slick-prev:hover,
.ourTeamWrap .slick-slider .slick-next:hover {
	background: black;
	transition: all 0.5s;
}

.ourTeamWrap .slick-slider .slick-next {
	right: 120px;
}

.ourTeamWrap .slick-slider .slick-prev {
	left: 40px;
}

.ourTeamWrap .slick-slider .slick-prev:before,
.ourTeamWrap .slick-slider .slick-next:before {
	content: "";
}

  
@media (min-width: 768px){
  .ourTeamWrap .slick-slider .slick-list {
    margin: 0 -30px;
}
}

@media (max-width: 767px){
.ourTeamWrap .slick-slider {
    width: 100%;
}
  .ourTeamWrap .slick-slider .slick-prev, .ourTeamWrap .slick-slider .slick-next {
    width: 50px;
    height: 50px;
  }
    .ourTeamWrap .slick-slider .slick-next {
	right: 5px;
}

.ourTeamWrap .slick-slider .slick-prev {
	left: 5px;
}
    .ourTeamWrap .slick-slider .slick-list {
    margin: 0 -15px;
}

}`;

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

const OurTeam = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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

  const teamData = [
    {
      id: 0,
      authorImg: "./img/teamMember1.jpg",
      authorName: "Jonathan Trott",
      authorDetails: "Founder & CEO",
    },
    {
      id: 1,
      authorImg: "./img/teamMember2.jpg",
      authorName: "Steven R.",
      authorDetails: "Vice President of Customer Success",
    },
    {
      id: 2,
      authorImg: "./img/teamMember3.jpg",
      authorName: "Elina Ray",
      authorDetails: "Product Manager",
    },
    {
      id: 3,
      authorImg: "./img/teamMember2.jpg",
      authorName: "Grime Smith",
      authorDetails: "Product Manager",
    },
    {
      id: 4,
      authorImg: "./img/teamMember3.jpg",
      authorName: "Steven R.",
      authorDetails: "Vice President",
    },
  ];

  return (
    <>
      <section className="py-9 md:py-16 relative bg-pvLightBlue ourTeamWrap">
        <style>{css1}</style>
        <div className="container relative">
          <div className="relative">
            <SectionTitle
              subtitle="OUR TEAM"
              title="Meet Our Experts"
              content="With a shared commitment to innovation and customer satisfaction, they drive our mission to deliver exceptional property management solutions."
              maxWidth={"650px"}
            />
          </div>
        </div>

        <div className="teamSlider padLeft overflow-x-hidden relative after:absolute after:right-0 after:top-0 after:w-full after:h-full after:z-10">
          <Slider {...settings}>
            {teamData.map((data, index) => (
              <div key={index} className="">
                <div className="flex flex-col gap-3">
                  <img
                    src={data.authorImg}
                    alt={data.authorName || "Author"}
                    className="rounded-3xl object-cover"
                  />
                  <div>
                    <div className="text-pvBlack font-medium font-outfit text-22">
                      {data.authorName || "Anonymous"}
                    </div>
                    <p>{data.authorDetails}</p>
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

export default OurTeam;
