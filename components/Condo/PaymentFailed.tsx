import React from "react";
import { FailedIcon } from "./Icons";

const PaymentFailed = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto h-[400px] flex flex-col justify-center">
      {/* Success Icon */}
      <div className="flex justify-center mb-2">
        <FailedIcon />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-center text-gray-800">
        Payment Failed
      </h3>
      <p className="text-gray-600 text-sm mb-6 text-center">
        Sorry, your payment was not successful. Please retry your payment.
      </p>
      <hr />
      {/* Payment Details */}
      <div className="text-left space-y-2 text-sm mt-4">
        <div className="flex justify-between">
          <span>Invoice Amount</span>
          <span>$110.00</span>
        </div>
        <div className="flex justify-between">
          <span>Demand Statement Fees</span>
          <span>$100.00</span>
        </div>
        <div className="flex justify-between">
          <span>Transfer Fee</span>
          <span>$10.00</span>
        </div>
        <div className="flex justify-between">
          <span>Transaction Fee</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total Paid Amount</span>
          <span>$110.00</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Status</span>
          <span className="text-red-500">Failed</span>
        </div>
      </div>

      {/* Download Receipt Button */}
      <div className="mt-6">
        <button className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300">
          Retry
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;


