import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  useAddOneTimePaymentMutation,
  useValidatePaymentCardNumberMutation,
} from "../../slices/ResaleCertificate";
import CryptoJS from "crypto-js";
import { BankIcon, CardIcon } from "./Icons";
import PaymentLoader from "./PaymentLoader";
import PaymentSuccessCard from "./PaymentSuccessCard";
import PaymentFailed from "./PaymentFailed";

export default function PaymentCardForm({
  formData,
  setRequestStatus,
  setPaymentData,
  onPaymentSuccess,
  demandStatementFee,
  transferFee,
  associationDetails,
  addressId,
}) {
  // ALL HOOKS
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [paymentResponseData, setPaymentResponseData] = useState(null);

  // Initial values for the form
  const initialValues = {
    paymentMethod: "card",
    // cardHolderName: "",
    accountHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    zipCode: "",
    routingNumber: "",
    confirmRoutingNumber: "",
    bankAccountNumber: "",
    confirmBankAccountNumber: "",
    accountType: "Checking",
  };

  // Card Payment Schema
  // const cardValidationSchema = Yup.object().shape({
  //   accountType: Yup.string().required("Account Type name is required"),
  //   cardHolderName: Yup.string().required("Card holder name is required"),
  //   cardNumber: Yup.string()
  //     .matches(/^[0-9]{16}$/, "Card number must be 16 digits")
  //     .required("Card number is required"),
  //   expiryDate: Yup.string()
  //     .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Invalid expiry date")
  //     .required("Expiry date is required"),
  //   cvv: Yup.string()
  //     .matches(/^[0-9]{3}$/, "CVV must be 3 digits")
  //     .required("CVV is required"),
  //   zipCode: Yup.string()
  //     .matches(/^[0-9]{5}$/, "Zip code must be 5 digits")
  //     .required("Zip code is required"),
  // });

  // Bank Payment Schema
  const bankValidationSchema = Yup.object().shape({
    accountType: Yup.string().required("Account Type name is required"),
    accountHolderName: Yup.string()
      .required("Name is required")
      .min(3, "Account holder name min length should be 3")
      .max(22, "Length should be between 3 to 22"),
    routingNumber: Yup.string()
      .length(9, "Length should be 9")
      .matches(/^\d{9}$/, "Routing number must be numeric")
      .required("Routing number is required"),
    confirmRoutingNumber: Yup.string()
      .oneOf([Yup.ref("routingNumber")], "Routing numbers must match")
      .required("Confirm routing number is required"),
    bankAccountNumber: Yup.string()
      .matches(/^\d{9,18}$/, "Length should be between 9 to 18")
      .required("Bank account number is required"),
    confirmBankAccountNumber: Yup.string()
      .oneOf([Yup.ref("bankAccountNumber")], "Account numbers must match")
      .required("Confirm bank account number is required"),
  });

  // Luhn algorithm for card number validation
  const luhnCheck = (cardNumber) => {
    const clean = cardNumber.replace(/\D/g, "");
    let sum = 0;
    let shouldDouble = false;
    for (let i = clean.length - 1; i >= 0; i--) {
      let digit = parseInt(clean[i], 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  // Card Payment Schema
  const cardValidationSchema = Yup.object().shape({
    accountType: Yup.string().required("Account type is required"),
    accountHolderName: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces")
      .min(3, "Length should be between 3 to 22")
      .max(22, "Length should be between 3 to 22")
      .required("Name is required"),
    cardNumber: Yup.string()
      .matches(/^\d{13,19}$/, "Card number must be between 13 and 19 digits")
      .required("Card number is required")
      .test("is-valid-card", "Card number is invalid", async function (value) {
        if (!value || value.length < 13) return true;

        try {
          const response = await triggerValidateCardNumber({
            creditCardNumber: value,
          }).unwrap();

          const isValid = response?.data?.isValidCardNumber;
          return isValid;
        } catch (err) {
          return this.createError({
            message: "Error validating card number. Try again.",
          });
        }
      }),
    expiryDate: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Format must be MM/YY")
      .test("expiry-date", "Card has expired", (value) => {
        if (!value) return false;
        const [month, year] = value.split("/");
        const now = new Date();
        const expMonth = parseInt(month, 10);
        const expYear = 2000 + parseInt(year, 10);
        const expiry = new Date(expYear, expMonth);
        return expiry > now;
      })
      .required("Expiry date is required"),
    cvv: Yup.string()
      .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
      .required("CVV is required"),
    zipCode: Yup.string()
      // .matches(/^\d{5}(-\d{4})?$/, "Zip code must be 5 digits or ZIP+4 format")
      .required("Zip code is required"),
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

  const [
    triggerValidateCardNumber,
    { data: validationData, error: validationError },
  ] = useValidatePaymentCardNumberMutation();

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
    const transformedExpiryDate = values?.expiryDate.replace("/", "");
    const payLoad = {
      AccountHolderName: values.accountHolderName,
      BankRoutingNumber: values.routingNumber,
      ConfirmBankRoutingNumber: values.confirmRoutingNumber,
      AccountNumber: values.bankAccountNumber,
      ConfirmAccountNumber: values.confirmBankAccountNumber,
      AccountType: values?.accountType || "Checking",
      Amount: Math.round(parseFloat(formData.price) * 100) / 100,
      // AccountHolderName :values?.cardHolderName,
      CardNumber: values?.cardNumber,
      CVV: values?.cvv,
      ZipCode: values?.zipCode,
      ExpirationDate: transformedExpiryDate,
    };
    setPaymentStatus("loading");
    try {
      // Encrypt the payload before sending it
      const encryptedPayload = encrypt(payLoad);

      // Send the encrypted payload to the backend API
      const response = await AddOneTimePaymentRequest({
        paymentInformation: encryptedPayload,
        legalEntityId: associationDetails?.id,
        legalEntityCode: associationDetails?.code,
        propertyId: addressId,
        paymentMethod: paymentMethod === "card" ? "CC" : "Bank",
      });
      if ("data" in response) {
        // Access the nested data
        if (response.data && response.data.data) {
          setPaymentData(response.data.data);
          setRequestStatus(true);
          setPaymentStatus("success");
          setPaymentResponseData(response.data.data);
          if (onPaymentSuccess) {
            onPaymentSuccess();
          }
        } else {
          setPaymentStatus("error");
        }
      } else {
        setPaymentStatus("error");
      }
    } catch (error) {
      setPaymentStatus("error");
    }
  };

  const handleRetryPayment = () => {
    setPaymentStatus("idle");
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
          <PaymentSuccessCard
            paymentResponseData={paymentResponseData}
            demandStatementFee={demandStatementFee}
            transferFee={transferFee}
          />
        ) : paymentStatus === "error" ? (
          <PaymentFailed
            handleRetryPayment={handleRetryPayment}
            paymentResponseData={paymentResponseData}
            demandStatementFee={demandStatementFee}
            transferFee={transferFee}
          />
        ) : (
          <div className="w-full max-w-xl p-6 mr-20 bg-white rounded-md border">
            <h3 className="text-lg font-bold">Select Payment Option</h3>
            <p className="text-gray-600 text-sm">
              All transactions are secure and encrypted
            </p>
            <div className="flex overflow-hidden mt-4 space-x-3">
              <button
                className={`flex items-center justify-start space-x-2 px-4 py-2 flex-1 rounded-md border-2 ${
                  paymentMethod === "card"
                    ? "bg-borderBg text-btnDarkBlue border-btnDarkBlue"
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
                    ? "bg-borderBg text-btnDarkBlue border-btnDarkBlue"
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
                return (
                  <Form>
                    {paymentMethod === "card" && (
                      <div className="mt-4 space-y-2 text-black">
                        <div className="">
                          <label className="block mt-4">Card Holder Name</label>
                          <Field
                            name="accountHolderName"
                            className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500 text-17"
                            placeholder="Caroline Marine"
                            maxLength={22}
                            onKeyDown={(e) => {
                              const allowedKeys = [
                                "Backspace",
                                "Tab",
                                "ArrowLeft",
                                "ArrowRight",
                                "Delete",
                                " ",
                              ];
                              const isLetter = /^[a-zA-Z_]$/.test(e.key);
                              if (!isLetter && !allowedKeys.includes(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />

                          {errors.accountHolderName &&
                            touched.accountHolderName && (
                              <div className="text-red-500 text-sm">
                                {errors.accountHolderName}
                              </div>
                            )}
                        </div>
                        <div className="">
                          <label className="block mt-4">Card Number</label>
                          {/* <Field
                            name="cardNumber"
                            className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500"
                            placeholder="XXXX-XXXX-8224"
                            onCopy={(e) => e.preventDefault()}
                            onPaste={(e) => e.preventDefault()}
                            onCut={(e) => e.preventDefault()}
                          /> */}
                          <Field
                            name="cardNumber"
                            type="text"
                            inputMode="numeric"
                            maxLength={19}
                            className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500"
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                            onCopy={(e) => e.preventDefault()}
                            onPaste={(e) => e.preventDefault()}
                            onCut={(e) => e.preventDefault()}
                            onKeyDown={(e) => {
                              const allowedKeys = [
                                "Backspace",
                                "ArrowLeft",
                                "ArrowRight",
                                "Tab",
                                "Delete",
                              ];
                              if (
                                e.currentTarget.value.length >= 19 &&
                                !allowedKeys.includes(e.key)
                              ) {
                                e.preventDefault();
                              }
                              if (
                                !/^\d$/.test(e.key) &&
                                !allowedKeys.includes(e.key)
                              ) {
                                e.preventDefault();
                              }
                            }}
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
                              onCopy={(e) => e.preventDefault()}
                              onPaste={(e) => e.preventDefault()}
                              onCut={(e) => e.preventDefault()}
                            />
                            {errors.expiryDate && touched.expiryDate && (
                              <div className="text-red-500 text-sm">
                                {errors.expiryDate}
                              </div>
                            )}
                          </div>
                          <div>
                            <label className="block mt-4">CVV</label>
                            {/* <Field
                              name="cvv"
                              className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500"
                              placeholder="124"
                              onCopy={(e) => e.preventDefault()}
                              onPaste={(e) => e.preventDefault()}
                              onCut={(e) => e.preventDefault()}
                            /> */}
                            <Field
                              name="cvv"
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              maxLength={4}
                              placeholder="124"
                              className="w-full p-2 border-b-2 focus:outline-none focus:border-blue-500"
                              onCopy={(e) => e.preventDefault()}
                              onPaste={(e) => e.preventDefault()}
                              onCut={(e) => e.preventDefault()}
                              onKeyDown={(e) => {
                                const allowedKeys = [
                                  "Backspace",
                                  "ArrowLeft",
                                  "ArrowRight",
                                  "Tab",
                                  "Delete",
                                ];
                                if (
                                  !/^[0-9]$/.test(e.key) &&
                                  !allowedKeys.includes(e.key)
                                ) {
                                  e.preventDefault();
                                }
                              }}
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
                            onCopy={(e) => e.preventDefault()}
                            onPaste={(e) => e.preventDefault()}
                            onCut={(e) => e.preventDefault()}
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
                        {/* Payment Method Dropdown */}
                        <div className="">
                          <label className="block mt-4">Account Type </label>
                          <div className="col-span-4">
                            <div className="flex items-center border-b border-gray-o-60">
                              <Field
                                as="select"
                                name="accountType"
                                className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                              >
                                <option value="Checking">Checking</option>
                                <option value="Saving">Saving</option>
                              </Field>
                            </div>
                            {errors.accountType && touched.accountType && (
                              <div className="text-red-500 text-sm">
                                {errors.accountType}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="block">Account Holder Name</label>
                          {/* <Field
                            name="accountHolderName"
                            className="w-full border-b-2 focus:outline-none focus:border-blue-500"
                            placeholder="Caroline Marine"
                          /> */}
                          <Field
                            name="accountHolderName"
                            className="w-full border-b-2 focus:outline-none focus:border-blue-500"
                            placeholder="Caroline Marine"
                            maxLength={22}
                            onKeyDown={(e) => {
                              const allowedKeys = [
                                "Backspace",
                                "Tab",
                                "ArrowLeft",
                                "ArrowRight",
                                "Delete",
                                " ",
                              ];
                              const isLetterOrUnderscore = /^[a-zA-Z_]$/.test(
                                e.key
                              );
                              if (
                                !isLetterOrUnderscore &&
                                !allowedKeys.includes(e.key)
                              ) {
                                e.preventDefault();
                              }
                            }}
                            onPaste={(e) => e.preventDefault()}
                            onCopy={(e) => e.preventDefault()}
                            onCut={(e) => e.preventDefault()}
                          />

                          {errors.accountHolderName &&
                            touched.accountHolderName && (
                              <div className="text-red-500 text-sm">
                                {errors.accountHolderName}
                              </div>
                            )}
                        </div>

                        <div>
                          <div className="flex items-center text-blue-700 text-sm mt-4 -mb-4">
                            <span className="inline-flex items-center justify-center w-4 h-4 text-white bg-blue-500 rounded-full text-xs font-bold mr-1">
                              ℹ
                            </span>
                            <span>
                              If your routing number is less than 9 digits,
                              please prepend it with <strong>0</strong>.
                            </span>
                          </div>
                          <label className="block mt-4">Routing Number</label>
                          <Field
                            name="routingNumber"
                            type="text"
                            inputMode="numeric"
                            maxLength={9}
                            pattern="\d*"
                            className="w-full border-b-2 focus:outline-none focus:border-blue-500"
                            placeholder="XXXX-XXXX-8224"
                            onCopy={(e) => e.preventDefault()}
                            onPaste={(e) => e.preventDefault()}
                            onCut={(e) => e.preventDefault()}
                            onKeyDown={(e) => {
                              const allowedKeys = [
                                "Backspace",
                                "ArrowLeft",
                                "ArrowRight",
                                "Tab",
                                "Delete",
                              ];
                              if (
                                e.currentTarget.value.length >= 9 &&
                                !allowedKeys.includes(e.key)
                              ) {
                                e.preventDefault();
                              }
                              if (
                                !/^\d$/.test(e.key) &&
                                !allowedKeys.includes(e.key)
                              ) {
                                e.preventDefault();
                              }
                            }}
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
                            type="text"
                            inputMode="numeric"
                            maxLength={9}
                            pattern="\d*"
                            className="w-full border-b-2 focus:outline-none focus:border-blue-500"
                            placeholder="XXXX-XXXX-8224"
                            onCopy={(e) => e.preventDefault()}
                            onPaste={(e) => e.preventDefault()}
                            onCut={(e) => e.preventDefault()}
                            onKeyDown={(e) => {
                              const allowedKeys = [
                                "Backspace",
                                "ArrowLeft",
                                "ArrowRight",
                                "Tab",
                                "Delete",
                              ];
                              // Block further input beyond 9 digits
                              if (
                                e.currentTarget.value.length >= 9 &&
                                !allowedKeys.includes(e.key)
                              ) {
                                e.preventDefault();
                              }
                              if (
                                !/^\d$/.test(e.key) &&
                                !allowedKeys.includes(e.key)
                              ) {
                                e.preventDefault();
                              }
                            }}
                          />
                          {errors.confirmRoutingNumber &&
                            touched.confirmRoutingNumber && (
                              <div className="text-red-500 text-sm">
                                {errors.confirmRoutingNumber}
                              </div>
                            )}
                        </div>
                        <div>
                          {/* <div className="flex items-start text-blue-700 text-sm mt-4 -mb-4">
                            <span className="mr-1 text-base font-bold">ℹ️</span>
                            <span>
                              If your account number is less than 9 digits,
                              please prepend it with <strong>0</strong>.
                            </span>
                          </div> */}
                          <div className="flex items-center text-blue-700 text-sm mt-4 -mb-4">
                            <span className="inline-flex items-center justify-center w-4 h-4 text-white bg-blue-500 rounded-full text-xs font-bold mr-1">
                              ℹ
                            </span>
                            <span>
                              If your account number is less than 9 digits,
                              please prepend it with <strong>0</strong>.
                            </span>
                          </div>
                          <label className="block mt-4">
                            Bank Account Number
                          </label>
                          <Field
                            name="bankAccountNumber"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            minLength={9}
                            maxLength={18}
                            placeholder="XXXX-XXXX-8224"
                            className="w-full border-b-2 focus:outline-none focus:border-blue-500"
                            onCopy={(e) => e.preventDefault()}
                            onPaste={(e) => e.preventDefault()}
                            onCut={(e) => e.preventDefault()}
                            onKeyDown={(e) => {
                              const allowedKeys = [
                                "Backspace",
                                "ArrowLeft",
                                "ArrowRight",
                                "Tab",
                                "Delete",
                              ];
                              if (
                                !/^[0-9]$/.test(e.key) &&
                                !allowedKeys.includes(e.key)
                              ) {
                                e.preventDefault();
                              }
                            }}
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
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={16}
                            placeholder="XXXX-XXXX-8224"
                            className="w-full border-b-2 focus:outline-none focus:border-blue-500"
                            onCopy={(e) => e.preventDefault()}
                            onPaste={(e) => e.preventDefault()}
                            onCut={(e) => e.preventDefault()}
                            onKeyDown={(e) => {
                              const allowedKeys = [
                                "Backspace",
                                "ArrowLeft",
                                "ArrowRight",
                                "Tab",
                                "Delete",
                              ];
                              if (
                                !/^[0-9]$/.test(e.key) &&
                                !allowedKeys.includes(e.key)
                              ) {
                                e.preventDefault();
                              }
                            }}
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
                        className="w-full bg-accent1 text-white py-2 rounded-full"
                      >
                        Pay | ${formData?.price || "0.00"}
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
