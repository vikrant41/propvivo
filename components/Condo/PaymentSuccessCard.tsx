import React from "react";
import { SuccessIcon } from "./Icons";
import { formatDateWithTime } from "../../Utils/Utils";

const PaymentSuccessCard = ({
  paymentResponseData,
  demandStatementFee,
  transferFee,
  condoResponse,
}) => {
  // Parse and calculate fees
  const demandFee = parseFloat(demandStatementFee) || 0;
  const transfer = parseFloat(transferFee) || 0;
  const transaction = paymentResponseData?.additionalFee
    ? parseFloat(paymentResponseData.additionalFee)
    : 0;
  const totalAmountPaid = demandFee + transfer + transaction;

  // Download Payment Reciept
  const handleDownloadReceipt = async () => {
    const receiptUrl = condoResponse?.data?.paymentReceipt?.[0]?.uri;
    if (!receiptUrl) {
      return;
    }
    try {
      const response = await fetch(receiptUrl);
      const blob = await response.blob();

      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "PaymentReceipt.pdf";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.open(blobUrl, "_blank");
    } catch (error) {
      console.error("Failed to download or open the PDF:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mr-20">
      {/* Success Icon */}
      <div className="flex justify-center mb-2">
        <SuccessIcon />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-center text-gray-800 mb-0">
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
        <div className="flex justify-between">
          <span>Invoice Number</span>
          <span className="font-bold text-pvBlack">
            {paymentResponseData?.transactionId}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Invoice Amount</span>
          <span className="font-bold text-pvBlack">
            ${parseFloat(paymentResponseData?.amount || 0).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Demand Statement Fees</span>
          <span className="font-bold text-pvBlack">
            ${demandStatementFee.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Transfer Fee</span>
          <span className="font-bold text-pvBlack">
            ${transferFee.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Transaction Fee</span>
          <span className="font-bold text-pvBlack">
            ${transaction.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total Paid Amount</span>
          <span className="font-bold text-pvBlack">
            ${totalAmountPaid.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Paid On</span>
          <span className="font-bold text-pvBlack">
            {formatDateWithTime(
              paymentResponseData?.effectiveDate ||
                paymentResponseData?.transactionDate
            )}
          </span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Status</span>
          <span className="text-green-600">
            {paymentResponseData?.transactionStatus}
          </span>
        </div>
      </div>

      {/* Download Receipt Button */}
      <div className="mt-6">
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300"
          onClick={handleDownloadReceipt}
        >
          Download Receipt
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessCard;
