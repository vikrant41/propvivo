import React from "react";
import { FailedIcon } from "./Icons";

const PaymentFailedTwice = ({
  paymentResponseData,
  demandStatementFee,
  transferFee,
}) => {
  const demandFee = parseFloat(demandStatementFee) || 0;
  const transfer = parseFloat(transferFee) || 0;
  const transactionRaw = paymentResponseData?.additionalFee;
  const transaction =
    transactionRaw !== null && transactionRaw !== undefined
      ? parseFloat(transactionRaw)
      : 0;
  const totalAmountPaid = demandFee + transfer + transaction;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mr-20 flex flex-col justify-center">
      {/* Success Icon */}
      <div className="flex justify-center mb-2">
        <FailedIcon />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-center text-gray-800">
        Payment Failed
      </h3>
      <p className="text-gray-600 text-sm mb-6 text-center">
        The payment attempt failed twice. For assistance, please contact us at
        <span className="text-blue-500"> +1 (888) 392-3515</span> or
        <span className="text-blue-500"> support@propvivo.com</span>.
      </p>
      <hr />
      {/* Payment Details */}
      <div className="text-left space-y-2 text-sm mt-4">
        <div className="flex justify-between">
          <span>Invoice Amount</span>
          <span>
            ${parseFloat(paymentResponseData?.amount || 0).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Demand Statement Fees</span>
          <span>${demandStatementFee?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Transfer Fee</span>
          <span>${transferFee?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Transaction Fee</span>
          <span>${transaction?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total Paid Amount</span>
          <span>${totalAmountPaid.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Status</span>
          <span className="text-red-500">Failed</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedTwice;
