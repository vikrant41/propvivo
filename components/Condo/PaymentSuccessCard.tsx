import React from "react";
import { SuccessIcon } from "./Icons";

const PaymentSuccessCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-lg mx-auto">
      {/* Success Icon */}
      <div className="flex justify-center mb-2">
        <SuccessIcon />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-center text-gray-800">
        Request Submitted Successfully
      </h3>
      <p className="text-gray-600 text-sm mb-6 text-center">
        Your request for a Resale Certificate has been submitted successfully. A
        confirmation for both your request and payment will be sent to the email
        provided.
      </p>
      <hr />
      {/* Payment Details */}
      <div className="text-left space-y-2 text-sm mt-4">
        <div className="flex justify-between font-semibold">
          <span>Invoice Number</span>
          <span className="text-gray-700">8339266-932-2244</span>
        </div>
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
        <div className="flex justify-between">
          <span>Paid On</span>
          <span>02/12/2025 01:14 PM</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Status</span>
          <span className="text-green-600">Approved</span>
        </div>
      </div>

      {/* Download Receipt Button */}
      <div className="mt-6">
        <button className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300">
          Download Receipt
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessCard;
