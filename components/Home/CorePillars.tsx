import React from "react";
import {
  DashedBorder,
  PillarShape1,
  PillarShape2,
  PillarShape3,
} from "../shared/Icons";

const CorePillars = () => {
  return (
    <>
      <section className="py-12 md:py-16">
        <div className="relative">
          <div className="container">
            <div className="grid lg:grid-cols-2 items-center gap-7 lg:gap-x-10">
              <div className="relative">
                <PillarShape1 className="absolute -top-5 -left-5" />
                <PillarShape2 className="absolute left-0 bottom-0" />
                <PillarShape3 className="absolute right-0 bottom-0" />
                <div className="border-8 border-white shadow-imageshadow relative m-5">
                  <img
                    src="./img/ThreePillarImg.jpg"
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div>
                <h2>Our Three Core Pillars</h2>
                <p>
                  Our business foundation is based on three core pillars: Trust,
                  Transparency & Excellence. Based on our experience of the
                  community association management needs we have enabled our
                  business to bring this core proposition in our daily
                  operations and deliver a high-quality service in the area of
                  Community, Condominium and Homeowners Association.
                </p>
                <div className="flex justify-between items-start pt-3 text-2xl font-outfit font-medium text-center relative overflow-x-hidden">
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                    <DashedBorder />
                  </div>
                  <div className="text-lightGreen relative after:absolute after:w-2 after:h-2 after:rounded-full after:bg-gray-o-600 after:top-1/2 after:-translate-y-1/2 after:-right-20 after:-mt-1.5">
                    <img src="./img/pillar1.png" className="w-auto mx-auto" />
                    <div className="text-sm md:text-xl lg:text-2xl">Trust</div>
                  </div>
                  <div className="text-pvOrange relative after:absolute after:w-2 after:h-2 after:rounded-full after:bg-gray-o-600 after:top-1/2 after:-translate-y-1/2 after:-right-14 after:-mt-1.5">
                    <img src="./img/pillar2.png" className="w-auto mx-auto" />
                    <div className="text-sm md:text-xl lg:text-2xl">Transparency</div>
                  </div>
                  <div className="text-accent1 relative">
                    <img src="./img/pillar3.png" className="w-auto mx-auto" />
                    <div className="text-sm md:text-xl lg:text-2xl">Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CorePillars;
