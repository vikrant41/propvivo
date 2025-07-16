import React from "react";
import ServiceBtns from "./ServiceBtns";

const financialSections = [
  {
    title: "Budgeting",
    items: [
      "propVIVO will capture the approved budget of the last 3 years and prepare an Annual Budget for the Board prior to end of the fiscal accounting year.",
      "propVIVO will research and analyze the operational needs and reserve study.",
      "Our team works closely with all the local authorities to ensure we have captured the details to provide an accurate forecast for services like utilities etc.",
      "We present the details to the Board for review and approval. After Budget approval, we plan the Budget meeting for ratification.",
    ],
  },
  {
    title: "Collection / Accounts Receivables",
    items: [
      "Collection of assessments is the most critical aspect of managing the associations.",
      "Our portal permits the homeowner to select the payment option most convenient for them, such as online payment, sign up for ACH, send payment via check, or call our Toll-Free number to make a payment.",
      "propVIVO stays on top of Assessment Collection with homeowners through friendly Reminder emails/mails.",
    ],
  },
  {
    title: "Disbursements / Accounts Payable",
    items: [
      "A seamless process to collect invoicing from vendors.",
      "Categorization of expenses to recurring and ad hoc categories to ensure transparency. Payment to ad hoc vendors with board’s approval through the portal.",
      "The Recurring Expenses are based on contractual obligations and are paid at the contract amount.",
      "Timely Payment and reimbursement to vendors.",
    ],
  },
  {
    title: "Financial Reporting",
    items: [
      "propVIVO provides information in real time for all aspects of association management to the Board Members and Homeowners.",
      "Balance Sheet, Income Statement, Prepaid Report, Delinquency Report, Bank Statement, etc.",
      "In tailoring the portal, we will work with the Board to understand exactly what and how you want to see information. Board Members will be able to generate reports on demand, or they can ask the Association Manager to generate the report.",
      "On a monthly basis, we will generate a report of all information requested by the Board and post this to the portal for Board Member review.",
    ],
  },
  {
    title: "Auditing / Tax Returns",
    items: [
      "The propVIVO accounting system helps auditors and tax consultants timely prepare tax returns and audit reports.",
      "propVIVO submits completed the Audit / Tax Returns to the Board.",
    ],
  },
  {
    title: "Collection / Delinquency",
    items: [
      "propVIVO sends regular notices to the Delinquent Homeowners. propVIVO provides the Board with the alerts and notifications of homeowners who have not paid their assessment fee.",
      "propVIVO has teamed with highly reputable attorneys to support efforts in collecting delinquent assessment fees. propVIVO helps association draft the collection policy if unavailable.",
    ],
  },
];

const FinancialOnlyHOAmanagement = () => {
  return (
    <>
      <img src="./img/association-management2.jpg" />
      <p>
        For associations that require Financial Expertise without full-service
        management, our Financial Only Management provides dedicated support for
        managing financial operations and assisting the Board in maintaining
        financial discipline. 
      </p>

      <div className="space-y-8">
        {financialSections.map((section, idx) => (
          <div key={idx}>
            <h4>{section.title}</h4>
            <ul className="space-y-2">
              {section.items.map((point, pointIdx) => (
                <li key={pointIdx}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h4>Budgeting</h4>
      <ul>
        <li>
          Analyze the past three years’ budgets to prepare an accurate Annual
          Budget for Board approval. 
        </li>
        <li>
          Research operational needs and reserve studies to forecast financial
          requirements, including utilities. 
        </li>
        <li>
          Facilitate Board reviews, approvals, and Budget ratification
          meetings. 
        </li>
      </ul>

      <h4>Collection / Accounts Receivables</h4>
      <ul>
        <li>
          Offer multiple payment options, including online, ACH, checks, or
          toll-free payments, for Homeowners' convenience.
        </li>
        <li>
          Send friendly reminders to Homeowners for Timely Assessment Payments.
        </li>
      </ul>

      <h4>Disbursements / Accounts Payable</h4>
      <ul>
        <li>
          Manage vendor invoices with clear categorization of recurring and ad
          hoc expenses.
        </li>
        <li>
          Process timely payments to vendors, ensuring compliance with
          contractual obligations and Board approvals. 
        </li>
      </ul>

      <h4>Financial Reporting</h4>
      <ul>
        <li>
          Provide real-time access to reports such as Balance Sheets, Income
          Statements, Delinquency Reports, and more. 
        </li>
        <li>
          Tailor the portal to display information as per Board preferences,
          allowing on-demand or scheduled report generation. 
        </li>
        <li>Post monthly financial reports for Board review. </li>
      </ul>

      <h4>Auditing / Tax Returns</h4>
      <ul>
        <li>
          Support timely preparation of tax returns and audit reports with our
          advanced accounting system. 
        </li>
        <li>
          Submit completed audits and tax returns to the Board for review. 
        </li>
      </ul>

      <h4>Collection / Delinquency</h4>
      <ul>
        <li>
          Send notices to delinquent Homeowners and provide the Board with
          updates on unpaid assessments. 
        </li>
        <li>
          Partner with reputable attorneys to assist in collecting overdue fees
          and help draft collection policies if needed. 
        </li>
      </ul>

      <ServiceBtns />
    </>
  );
};

export default FinancialOnlyHOAmanagement;
