import React from 'react'
import ServiceBtns from './ServiceBtns'
import { ComplianceLegalIcon1, ComplianceLegalIcon2, ComplianceLegalIcon3, ComplianceLegalIcon4, ComplianceLegalIcon5, ComplianceLegalIcon6, KeyBenefitShape1, KeyBenefitShape2, PillarShape1 } from '../shared/Icons';

const complianceServices = [
  {
    icon: <ComplianceLegalIcon1 />,
    title: "Regulatory Compliance",
    description:
      "Stay up to date with local, state, and federal regulations to avoid penalties and ensure seamless operations.",
  },
  {
    icon: <ComplianceLegalIcon2 />,
    title: "CC&R Enforcement",
    description:
      "Assist in interpreting and enforcing Covenants, Conditions & Restrictions (CC&Rs) to maintain community standards.",
  },
  {
    icon: <ComplianceLegalIcon3 />,
    title: "Violation Management",
    description:
      "Automate the process of issuing notices for violations and track resolution progress for complete transparency.",
  },
  {
    icon: <ComplianceLegalIcon4 />,
    title: "Policy Development",
    description:
      "Help draft and update policies that reflect the needs of your community while maintaining legal validity.",
  },
  {
    icon: <ComplianceLegalIcon5 />,
    title: "Legal Support",
    description:
      "Collaborate with experienced attorneys to handle disputes, collection efforts, and other legal matters.",
  },
  {
    icon: <ComplianceLegalIcon6 />,
    title: "Document Management",
    description:
      "Organize and store critical legal and compliance documents securely for easy access when needed.",
  },
];

const ComplianceLegalServices = () => {
  return (
    <>
      <section className="py-12 md:py-16 bg-pvLightBlue">
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-7">
            <div className="space-y-6">
              <h2 className="lg:text-45">Compliance & Legal</h2>
              <p>
                Managing compliance and legal requirements is critical for the smooth operation of any HOA. Our comprehensive services ensure your association stays aligned with Local Regulations and Community Rules while addressing legal challenges effectively.
              </p>
            </div>
            <div className="relative">
              <div>
                <KeyBenefitShape1 className="absolute -top-7 -left-8" />
                <KeyBenefitShape2 className="absolute -bottom-7 right-1" />
                <PillarShape1 className="absolute -top-9 -right-4 lg:-right-8" />
                <img src="./img/service4.png" className="relative w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container relative">
          <div className="text-center mb-7">
            <h3 className="leading-snug lg:text-4xl">
              HOA Compliance Made Easy with Smart Software
            </h3>
            <p className="lg:text-xl">
              Streamline your operations with our comprehensive administrative solutions
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-4 md:gap-8 mb-5 md:mb-11">
            {complianceServices.map((feature, index) => (
              <div
                className="p-4 md:py-5 md:px-2 rounded-lg shadow-keyShadow text-center bg-white"
                key={index}
              >
                <div className="mb-5 flex justify-center">{feature.icon}</div>
                <div className="">
                  <h5 className="mb-2">{feature.title}</h5>
                  <div className="text-17 text-accent2">
                    {feature.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ServiceBtns />
        </div>
      </section>
    </>
  )
}

export default ComplianceLegalServices