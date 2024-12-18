import React from "react";
import { OurValuesIcon1, OurValuesIcon2, OurValuesIcon3, OurValuesIcon4 } from "../shared/Icons";

const valuesData = [
  {
    id: 0,
    bgColor: "#FFF1EE",
    icon: <OurValuesIcon1 />,
    title: "Customer-Centricity",
    description: "We prioritize your needs and strive to provide seamless experiences that exceed expectations",
  },
  {
    id: 1,
    bgColor: "#F0F8FF",
    icon: <OurValuesIcon2 />,
    title: "Innovation",
    description:
      "Leveraging the latest technology, we create forward-thinking solutions for today's challenges",
  },
  {
    id: 2,
    bgColor: "#FFF9EB",
    icon: <OurValuesIcon3 />,
    title: "Transparency",
    description:
      "With clear communication and openness, we foster trust and ensure clarity in all interactions",
  },
  {
    id: 3,
    bgColor: "#F8FFEA",
    icon: <OurValuesIcon4 />,
    title: "Accountability",
    description:
      "Our commitment to responsibility guides our actions and keeps us aligned with our promises to clients",
  },
];

const Ourvalues = () => {
  return (
    <>
      <section className="py-9 md:py-16 relative">
        <img
          src="./img/mapShape.png"
          className="absolute top-0 left-0 right-0 w-full h-full"
        />
        <div className="container relative">
          <h2 className="leading-snug mb-10 md:mb-16 pb-4 text-center">Our Values, Our Assurance</h2>

          <div className="grid md:grid-cols-2 gap-10 md:gap-15">
            {valuesData.map((data, index) => (
              <div key={index} className="bg-white rounded-2xl pt-9 pb-6 px-6 md:p-9 relative" style={{ backgroundColor: data.bgColor }}>
                <div className="absolute right-7 md:right-20 -top-10 border-8 border-white rounded-xl scale-75 md:scale-100">
                  {data.icon}
                </div>
                <h5 className="mb-3 text-2xl">{data.title}</h5>
                <p>{data.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Ourvalues;
