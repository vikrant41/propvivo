import React, { useEffect, useState } from "react";

const keyMilestoneData = [
  {
    id: 0,
    title: "Compliance Issues",
    percentage: "40%",
    description:
      "<strong>Reduction</strong> in compliance issues for early clients.",
  },
  {
    id: 1,
    title: "Faster Service",
    percentage: "50%",
    description:
      "<strong>Faster</strong> service request resolutions. Enhancing community satisfaction.",
  },
  {
    id: 2,
    title: "Resident engagement",
    percentage: "30%",
    description:
      "<strong>Increase</strong> in resident engagement through communication tools.",
  },
];

const OurKeymilestones = () => {
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
      <section className="py-12 md:py-16">
        <div className="container relative">
          <div className="">
            <div
              className="flex flex-col items-center justify-center text-center mx-auto"
              style={{ maxWidth: isMobile ? "100%" : "975px" }}
            >
              <h3 className="font-semibold md:text-4xl">
                Our Key{" "}
                <span className="bg-text-gradient bg-clip-text text-transparent">
                  Milestones
                </span>
              </h3>
              <p>
                Celebrating a journey of innovation and impact, we take pride in
                the progress we’ve made to transform HOA management. These
                achievements highlight our commitment to excellence
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 mt-8">
              {keyMilestoneData.map((data, index) => {
                const bgClasses = [
                  "bg-lightGreen/10",
                  "bg-pvYellow/10",
                  "bg-pvOrange/10",
                ];
                const textColor = [
                  "text-lightGreen",
                  "text-pvYellow",
                  "text-pvOrange",
                ];
                return (
                  <div
                    key={index}
                    className={`${bgClasses[index]} py-8 px-5 rounded-lg shadow-keyShadow text-center`}
                  >
                    <div className="mb-5">
                      <h2 className={`${textColor[index]}`}>
                        {data.percentage}
                      </h2>
                    </div>
                    <div className="">
                      <h5 className="mb-2">{data.title}</h5>
                      <div
                        className="text-17 text-accent2"
                        dangerouslySetInnerHTML={{ __html: data.description }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurKeymilestones;
