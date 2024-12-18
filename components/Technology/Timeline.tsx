import React from "react";
import { KeyFeature1, KeyFeature2, KeyFeature3, KeyFeature4 } from "../shared/Icons";

const Timeline = () => {
  return (
    <>
      <div className="timeline relative z-10 overflow-y-hidden">
        <ul>
          <li>
            <div className="content">
              <KeyFeature1 className="absolute left-0 md:left-auto md:-right-7 top-0 w-8 md:w-max h-8 md:h-max" />
              <h4 className="mb-2">Delinquency Management</h4>
              <p>
                Our delinquency management system efficiently tracks and
                resolves overdue payments, maintaining financial stability and
                positive homeowner relationships
              </p>
            </div>
          </li>

          <li>
            <div className="content">
              <KeyFeature2 className="absolute left-0 md:-left-7 top-0 w-8 md:w-max h-8 md:h-max" />
              <h4 className="mb-2">Compliance Tracking & Reporting</h4>
              <p>
                We ensure consistent compliance tracking & reporting, keeping
                your HOA board informed and proactive with detailed reports on
                community rules
              </p>
            </div>
          </li>

          <li>
            <div className="content">
              <KeyFeature3 className="absolute left-0 md:left-auto md:-right-7 top-0 w-8 md:w-max h-8 md:h-max" />
              <h4 className="mb-2">SLA Integration</h4>
              <p>
                Our platform supports SLA integration, ensuring service
                providers meet standards for maintenance, landscaping, and
                repairs
              </p>
            </div>
          </li>

          <li>
            <div className="content">
              <KeyFeature4 className="absolute left-0 md:-left-7 top-0 w-8 md:w-max h-8 md:h-max" />
              <h4 className="mb-2">Customizable Reports</h4>
              <p>
                With our customizable reports, your HOA can generate tailored
                insights, from financial summaries to service performance
                metrics
              </p>
            </div>
          </li>

        </ul>
      </div>
    </>
  );
};

export default Timeline;
