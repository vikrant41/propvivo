import React from "react";
import SectionTitle from "../CommonComponents/SectionTitle";
import {
  CheckboxIcon,
  GetStartedShapeLeftIcon,
  GetStartedShapeRightIcon,
  OnboardIcon1,
  OnboardIcon2,
  OnboardIcon3,
} from "../shared/Icons";
import SubHeading from "../CommonComponents/SubHeading";

const onBoardData = [
  {
    number: "01",
    gradient: "linear-gradient(75.12deg, #7DBEF6 -9.26%, #0065BB 142.84%)",
    icon: <OnboardIcon1 />,
    title: "Sign Up & Onboard",
    description:
      "Create your account and we'll help you set up your community profile in under 24 hours.",
    features: ["Free consultation call", "Guided platform setup", "Data migration assistance"],
  },
  {
    number: "02",
    gradient: "linear-gradient(75.12deg, #B985EE -9.26%, #47008E 142.84%)",
    icon: <OnboardIcon2 />,
    title: "Customize & Configure",
    description:
      "Tailor the platform to your community's specific needs with our guided setup process.",
    features: ["Smart workflow automation", "Custom brand integration", "Advanced user permissions"],
  },
  {
    number: "03",
    gradient: "linear-gradient(75.12deg, #4FD678 -9.26%, #00992E 142.84%)",
    icon: <OnboardIcon3 />,
    title: "Launch & Manage",
    description:
      "Tailor the platform to your community's specific needs with our guided setup process.",
    features: ["Real-time analytics dashboard", "24/7 premium support", "Comprehensive training program"],
  },
];

const OnboardingSteps = () => {
  return (
    <>
      <section className="py-9 md:pt-16 md:pb-32 relative bg-pvLightBlue">
        <GetStartedShapeLeftIcon className="absolute -top-20 left-0 w-48 md:w-auto" />
        <GetStartedShapeRightIcon className="absolute -top-24 right-0 w-48 md:w-auto" />
        <div className="container relative">
          <div className="text-center mb-9 md:mb-12">
            <SubHeading text="HOW IT WORKS" />
            <h2 className="leading-tight pt-2 mb-1">
              Get Started in <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #4790CD 0%, #7448D5 80.8%, #A200DD 100%)",
                }}
              >
                Three Simple Steps
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {onBoardData.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-lg px-6 py-8 flex flex-col justify-between gap-5 relative"
              >
                <div>
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                      style={{ background: step.gradient }}
                    >
                      {step.number}
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-3 text-center">
                    {step.icon}
                    <h5 className="mb-0">{step.title}</h5>

                    <div>{step.description}</div>
                  </div>
                  <ul className="mt-5 space-y-2 text-left">
                    {step.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-17 text-pvBlack gap-2"
                      >
                        <CheckboxIcon />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OnboardingSteps;
