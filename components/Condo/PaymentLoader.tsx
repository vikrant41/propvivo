import React from "react";
import { DollarIcon, PaymentLoaderIcon } from "./Icons";

const PaymentLoader = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto h-[400px] flex flex-col justify-center">
      {/* Success Icon */}
      <div className="flex justify-center mb-2">
        <PaymentLoaderIcon />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-center text-gray-800">
        Processing Payment
      </h3>
      <p className="text-gray-600 text-sm mb-6 text-center">
        Your payment is under processing. It may take while to process your
        payment. Don’t go back.
      </p>
    </div>
  );
};

export default PaymentLoader;


