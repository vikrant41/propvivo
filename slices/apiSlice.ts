import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://pvintegratedapp.azurewebsites.net/",
    baseUrl: "http://localhost:3300/",
    prepareHeaders(headers) {
      headers.set("authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyNzVjZjE5LTkyNDctNDg4Yy1iZjA4LWEzNmJhY2I5YjQ4ZSIsIm5iZiI6MTY2OTI2Mjg2NSwiZXhwIjoxNjY5ODY3NjY1LCJpYXQiOjE2NjkyNjI4NjV9.fTvbETf2aLHsIIdoFrYzUSpT4EXrUlM7j6jLbyju1qk");
      return headers;
    },
  }),
  tagTypes: [
    "FiscalYear",
    "Legal",
    "Contracts",
    "FiscalYearDetail",
    "Currency",
    "COA",
    "COADetail",
    "Bank",
    "Role",
    "Account",
    "RemoteDeposit",
    "ImageException",
    "Bank",
    "Account",
    "Transaction",
    "RemoteDeposit",
    "ImageException",
    "LegalEntityType",
    "Association",
    "Customer",
    "Invoice",
    "Payment",
    "Charges",
    "Transactions",
    "Violations",
    "PaymentPlan",
    "Amortization",
    "InvoiceDetails",
    "DelinquencyNotice",
    "InCollection",
    "CoreFeature",
    "Permission",
    "RolePermission",
    "PrepaidReport",
    "InvoiceReport",
    "IncomeStatement",
    "DelinquencyReport",
    "BalanceSheet",
    "Department",
    "Teams",
    "Users"
  ],
  endpoints: (builder) => ({}),
});
