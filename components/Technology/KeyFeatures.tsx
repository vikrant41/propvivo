import React from "react";
import SectionTitle from "../CommonComponents/SectionTitle";
import Timeline from "./Timeline";

const KeyFeatures = () => {
  return (
    <>
      <section className="py-9 md:py-16 relative">
        <div className="container relative">
          <SectionTitle subtitle="KEY FEATURES" title="Tech Addons We Offer" />

          <div className="relative">
            <Timeline data={""} />
            <img
              src="./img/mapShape2.png"
              className="absolute top-0 left-0 right-0 w-full h-full"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default KeyFeatures;
