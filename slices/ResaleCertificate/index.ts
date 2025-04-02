
import { requestSubType, requestType } from "../../components/Helper/Helper";
import {
  generateBodyPayload,
  generateQueryParams,
  newApislice,
} from "../apiSlice"; 
import { get } from "http";

export const ResaleCertificateSlice = newApislice.injectEndpoints({
  endpoints: (builder) => ({
    addOneTimePayment: builder.mutation<any, any>({
      query: (data) => ({
        url: `/Payment/OneTimePayment`,
        method: "POST",
        body: generateBodyPayload(
          requestSubType.Add,
          requestType.OneTimePayment,
          data
        ),
      }),
      invalidatesTags: ["OneTimePayment"],
    }),
  }),
});

export const {
    useAddOneTimePaymentMutation
} = ResaleCertificateSlice;
