import React from "react";

const Timeline = ({ data }) => {
  return (
    <>
      <div className="timeline relative z-10 overflow-y-hidden mt-12 py-2">
        <ul>
          {data?.map((item, index) => (
            <li key={index}>
              <div className="content shadow-keyShadow p-4 md:py-5 md:px-6 bg-white rounded-lg space-y-3">
                <div className={`absolute left-0 -top-2 md:top-0 ml-2 md:-ml-2 z-20 pointPosition`}>
                  <div className="pulse w-10 h-10 rounded-full bg-white shadow-timelineShadow flex items-center justify-center group transition-all duration-300 scale-75 md:scale-100">
                    <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center" style={{ background: item.titleColor }}>
                      <div className="w-3 h-3 rounded-full bg-white" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {item.icon}
                  <h5 className="mb-0">{item.year}</h5>
                </div>

                <h5 className={`mb-2`} style={{ color: item.titleColor }}>
                  {item.title}
                </h5>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Timeline;
