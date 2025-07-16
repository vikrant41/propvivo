import React from 'react'
import ServiceBtns from './ServiceBtns'

const complianceServices = [
  {
    title: "Regulatory Compliance",
    description:
      "Stay up to date with local, state, and federal regulations to avoid penalties and ensure seamless operations.",
  },
  {
    title: "CC&R Enforcement",
    description:
      "Assist in interpreting and enforcing Covenants, Conditions & Restrictions (CC&Rs) to maintain community standards.",
  },
  {
    title: "Violation Management",
    description:
      "Automate the process of issuing notices for violations and track resolution progress for complete transparency.",
  },
  {
    title: "Policy Development",
    description:
      "Help draft and update policies that reflect the needs of your community while maintaining legal validity.",
  },
  {
    title: "Legal Support",
    description:
      "Collaborate with experienced attorneys to handle disputes, collection efforts, and other legal matters.",
  },
  {
    title: "Document Management",
    description:
      "Organize and store critical legal and compliance documents securely for easy access when needed.",
  },
];

const ComplianceLegalServices = () => {
  return (
    <>
      <img src="./img/association-management3.jpg" />
      <p>
        For associations that require Financial Expertise without full-service
        management, our Financial Only Management provides dedicated support for
        managing financial operations and assisting the Board in maintaining
        financial discipline. 
      </p>
      <h4>Key Services We Offer </h4>
      <ul className="space-y-2">
        {complianceServices.map((item, index) => (
          <li key={index} className="leading-relaxed">
            <strong className="font-semibold">{item.title}</strong>
            <br />
            {item.description}
          </li>
        ))}
      </ul>

      <ServiceBtns />
    </>
  )
}

export default ComplianceLegalServices