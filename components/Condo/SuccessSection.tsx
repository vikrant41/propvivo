import React from "react";
import { SuccessIcon } from "./Icons";

const SuccessSection = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-lg px-4 py-8 space-y-2">
        {/* Success Icon */}
        <div className="flex justify-center mb-2">
          <SuccessIcon />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-center text-gray-800">
          Request Submitted Successfully
        </h3>

        <p className="text-gray-600 text-sm mb-6 text-center">
          {/* Your request for a Resale Certificate has been submitted successfully. A
        confirmation for both your request and payment will be sent to the email
        provided. */}
          Your Request for Demand Request has been submitted successfully. A
          confirmation for both your request will be sent to the email provided.
        </p>
      </div>
    </div>
  );
};

export default SuccessSection;
