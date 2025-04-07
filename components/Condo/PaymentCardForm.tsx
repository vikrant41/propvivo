import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useAddOneTimePaymentMutation } from "../../slices/ResaleCertificate";
import CryptoJS from "crypto-js";
import { BankIcon, CardIcon } from "./Icons";
import PaymentLoader from "./PaymentLoader";
import PaymentSuccessCard from "./PaymentSuccessCard";
import PaymentFailed from "./PaymentFailed";

export default function PaymentCardForm({
  formData,
  setRequestStatus,
  setPaymentData,
}) {
  // ALL HOOKS
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentStatus, setPaymentStatus] = useState("idle");

  // Initial values for the form
  const initialValues = {
    paymentMethod: "card",
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    zipCode: "",
    routingNumber: "",
    confirmRoutingNumber: "",
    bankAccountNumber: "",
    confirmBankAccountNumber: "",
  };

  // Card Payment Schema
  const cardValidationSchema = Yup.object().shape({
    cardHolderName: Yup.string().required("Card holder name is required"),
    cardNumber: Yup.string()
      .matches(/^[0-9]{16}$/, "Card number must be 16 digits")
      .required("Card number is required"),
    expiryDate: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Invalid expiry date")
      .required("Expiry date is required"),
    cvv: Yup.string()
      .matches(/^[0-9]{3}$/, "CVV must be 3 digits")
      .required("CVV is required"),
    zipCode: Yup.string()
      .matches(/^[0-9]{5}$/, "Zip code must be 5 digits")
      .required("Zip code is required"),
  });

  // Bank Payment Schema
  const bankValidationSchema = Yup.object().shape({
    cardHolderName: Yup.string().required("Card holder name is required"),
    routingNumber: Yup.string()
      .matches(/^[0-9]{9}$/, "Invalid routing number")
      .required("Routing number is required"),
    confirmRoutingNumber: Yup.string()
      .oneOf([Yup.ref("routingNumber")], "Routing numbers must match")
      .required("Confirm routing number is required"),
    // bankAccountNumber: Yup.string()
    //   // .matches(/^[0-9]{10}$/, "Invalid account number")
    //   .required("Bank account number is required"),
    confirmBankAccountNumber: Yup.string()
      .oneOf([Yup.ref("bankAccountNumber")], "Account numbers must match")
      .required("Confirm bank account number is required"),
  });

  // oneTime Payment api calling
  const [
    AddOneTimePaymentRequest,
    {
      data: addData,
      isLoading: paymentProcessing,
      isSuccess: isParameterSuccess,
      error: addError,
      isError: addIsError,
    },
  ] = useAddOneTimePaymentMutation();

  const secretKey = "SuperSecretKey123";

  // Function to generate AES Key and IV from secret key (similar to your backend logic)
  const generateKeyAndIV = (secretKey) => {
    const sha256Key = CryptoJS.SHA256(secretKey).toString(CryptoJS.enc.Hex);
    const key = CryptoJS.enc.Hex.parse(sha256Key);
    const iv = CryptoJS.enc.Hex.parse(sha256Key.substring(0, 32));
    return { key, iv };
  };

  // Function to encrypt the object to a string using AES
  const encrypt = (obj) => {
    const { key, iv } = generateKeyAndIV(secretKey);
    const jsonString = JSON.stringify(obj);
    const encrypted = CryptoJS.AES.encrypt(jsonString, key, { iv }).toString();
    return encrypted;
  };

  // The submit handler function
  const handleSubmit = async (values) => {
    const payLoad = {
      AccountHolderName: values.cardHolderName,
      BankRoutingNumber: values.routingNumber,
      ConfirmBankRoutingNumber: values.confirmRoutingNumber,
      AccountNumber: values.bankAccountNumber,
      ConfirmAccountNumber: values.confirmBankAccountNumber,
      AccountType: "Checking",
      Amount: "10.00",
    };
    setPaymentStatus("loading");
    // const payLoad = {
    //   AccountHolderName: "Sam Leo",
    //   BankRoutingNumber: "124000025",
    //   ConfirmBankRoutingNumber: "124000025",
    //   AccountNumber: "987654321",
    //   ConfirmAccountNumber: "987654321",
    //   AccountType: "Checking",
    //   Amount: 10.0,
    // };

    try {
      // Encrypt the payload before sending it
      const encryptedPayload = encrypt(payLoad);

      // Send the encrypted payload to the backend API
      const response = await AddOneTimePaymentRequest({
        paymentInformation: encryptedPayload,
      });
      if ("data" in response) {
        // Access the nested data
        if (response.data && response.data.data) {
          setPaymentData(response.data.data);
          setRequestStatus(true);
          setPaymentStatus("success");
        } else {
          setPaymentStatus("error");
        }
      } else {
        setPaymentStatus("error");
      }
    } catch (error) {
      setPaymentStatus("error");
      console.error("Payment failed: ", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between p-10 bg-gray-100">
        <div className="flex flex-col justify-top ml-20">
          <div className="text-black font-bold text-2xl my-4">
            Request Details
          </div>
          <div className="my-1">
            <span>Requester Type : </span>
            <span>{formData?.requestorType}</span>
          </div>
          <div className="my-1">
            <span>Association Name : </span>
            <span>{formData?.associationName}</span>
          </div>
          <div className="my-1">
            <span>Property Address : </span>
            <span>{formData?.propertyAddress}</span>
          </div>
          <div className="my-1">
            <span>Requester First Name : </span>
            <span>{formData?.requesterFirstName}</span>
          </div>
          <div className="my-1">
            <span>Requester Last Name : </span>
            <span>{formData?.requesterLastName}</span>
          </div>
          <div className="my-1">
            <span>Requester Company : </span>
            <span>{formData?.requesterCompany}</span>
          </div>
          <div className="my-1">
            <span>Requester Email Address : </span>
            <span>{formData?.requesterEmail}</span>
          </div>
          <div className="my-1">
            <span>Requester Phone Number : </span>
            <span>{formData?.requesterPhone}</span>
          </div>
          <div className="my-1">
            <span>Estimated Closing Date : </span>
            <span>{formData?.closingDate}</span>
          </div>
          <div className="my-1">
            <span>Order Type : </span>
            <span>{formData?.orderType}</span>
          </div>
          <div className="my-1">
            <span>Escrow Number : </span>
            <span>{formData?.escrowNumber}</span>
          </div>
          <div className="my-1">
            <span>Amount Charged : </span>
            <span>{formData?.price}</span>
          </div>
        </div>
        {/* Payment Card */}
        {paymentStatus === "loading" ? (
          <PaymentLoader />
        ) : paymentStatus === "success" ? (
          <PaymentSuccessCard />
        ) : paymentStatus === "error" ? (
          <PaymentFailed />
        ) : (
          <div className="w-full max-w-md p-6 mr-20 bg-white rounded-md border">
            <h3 className="text-lg font-bold">Select Payment Option</h3>
            <p className="text-gray-600 text-sm">
              All transactions are secure and encrypted
            </p>
            <div className="flex overflow-hidden mt-4 space-x-3">
              <button
                className={`flex items-center justify-start space-x-2 px-4 py-2 flex-1 rounded-md border-2 ${
                  paymentMethod === "card"
                    ? "bg-[#F3FAFF] text-[#4790CD] border-[#4790CD]"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <CardIcon />
                <span>Card</span>
              </button>
              <button
                className={`flex items-center justify-start space-x-2 px-4 py-2 flex-1 rounded-md border-2 ${
                  paymentMethod === "bank"
                    ? "bg-[#F3FAFF] text-[#4790CD] border-[#4790CD]"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setPaymentMethod("bank")}
              >
                <BankIcon />
                <span>Bank</span>
              </button>
            </div>

            {/* Formik Form */}
            <Formik
              initialValues={initialValues}
              validationSchema={
                paymentMethod === "card"
                  ? cardValidationSchema
                  : bankValidationSchema
              }
              onSubmit={handleSubmit}
            >
              {({ errors, touched, handleChange, handleBlur, values }) => {
                console.log("value", values);
                return (
                  <Form>
                    {paymentMethod === "card" && (
                      <div className="mt-4 space-y-2 text-black">
                        <div className="">
                          <label className="block mt-4">Card Holder Name</label>
                          <Field
                            name="cardHolderName"
                            className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500 text-17"
                            placeholder="Caroline Marine"
                          />
                          {errors.cardHolderName && touched.cardHolderName && (
                            <div className="text-red-500 text-sm">
                              {errors.cardHolderName}
                            </div>
                          )}
                        </div>

                        <div className="">
                          <label className="block mt45">Card Number</label>
                          <Field
                            name="cardNumber"
                            className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500"
                            placeholder="XXXX-XXXX-8224"
                          />
                          {errors.cardNumber && touched.cardNumber && (
                            <div className="text-red-500 text-sm">
                              {errors.cardNumber}
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block mt-4">Expiry Date</label>
                            <Field
                              name="expiryDate"
                              className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500"
                              placeholder="MM/YY"
                            />
                            {errors.expiryDate && touched.expiryDate && (
                              <div className="text-red-500 text-sm">
                                {errors.expiryDate}
                              </div>
                            )}
                          </div>
                          <div>
                            <label className="block mt-4">CVV</label>
                            <Field
                              name="cvv"
                              className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500"
                              placeholder="124"
                            />
                            {errors.cvv && touched.cvv && (
                              <div className="text-red-500 text-sm">
                                {errors.cvv}
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block mt-4">Zip Code</label>
                          <Field
                            name="zipCode"
                            className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500"
                            placeholder="82246"
                          />
                          {errors.zipCode && touched.zipCode && (
                            <div className="text-red-500 text-sm">
                              {errors.zipCode}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {paymentMethod === "bank" && (
                      <div className="mt-4 space-y-2 text-black">
                        <div className="mt-4">
                          <label className="block">Card Holder Name</label>
                          <Field
                            name="cardHolderName"
                            className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500"
                            placeholder="Caroline Marine"
                          />
                          {errors.cardHolderName && touched.cardHolderName && (
                            <div className="text-red-500 text-sm">
                              {errors.cardHolderName}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block mt-4">Routing Number</label>
                          <Field
                            name="routingNumber"
                            className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500"
                            placeholder="XXXX-XXXX-8224"
                          />
                          {errors.routingNumber && touched.routingNumber && (
                            <div className="text-red-500 text-sm">
                              {errors.routingNumber}
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block mt-4">
                            Confirm Routing Number
                          </label>
                          <Field
                            name="confirmRoutingNumber"
                            className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500"
                            placeholder="XXXX-XXXX-8224"
                          />
                          {errors.confirmRoutingNumber &&
                            touched.confirmRoutingNumber && (
                              <div className="text-red-500 text-sm">
                                {errors.confirmRoutingNumber}
                              </div>
                            )}
                        </div>
                        <div>
                          <label className="block mt-4">
                            Bank Account Number
                          </label>
                          <Field
                            name="bankAccountNumber"
                            className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500"
                            placeholder="XXXX-XXXX-8224"
                          />
                          {errors.bankAccountNumber &&
                            touched.bankAccountNumber && (
                              <div className="text-red-500 text-sm">
                                {errors.bankAccountNumber}
                              </div>
                            )}
                        </div>
                        <div>
                          <label className="block mt-4">
                            Confirm Bank Account Number
                          </label>
                          <Field
                            name="confirmBankAccountNumber"
                            className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500"
                            placeholder="XXXX-XXXX-8224"
                          />
                          {errors.confirmBankAccountNumber &&
                            touched.confirmBankAccountNumber && (
                              <div className="text-red-500 text-sm">
                                {errors.confirmBankAccountNumber}
                              </div>
                            )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-2 mt-4">
                      <button
                        type="submit"
                        className="w-full bg-[#4790CD] text-white py-2 rounded-full"
                      >
                        Pay | ${formData?.formData?.price || "0.00"}
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
}
