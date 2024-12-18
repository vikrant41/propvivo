import {
  SET_SHOW_UPLOAD_FORM,
  SET_SHOW_BULK_PREVIEW_FROM,
  SET_SHOW_UPLOAD_SUCCESS,
  SET_SHOW_MERGE_CUSTOMER_FORM,
  SET_TRANSFER_OWNERSHIP,
  SET_TRANSFER_OWNERSHIP_SUCCESS,
  SET_MERGE_CUSTOMER_CONFIRMATION,
  SET_SHOW_MERGE_CUSTOMER_SUCCESS,
  SET_SHOW_SINGLE_UPLOAD_FORM,
} from "./actions";


export const initialState = {
  showUploadForm: false,
  setShowBulkPreviewFrom: false,
  setShowUploadSuccess: false,
  setShowMergeCustomerForm: false,
  setTransferOwnership: false,
  setTransferOwnershipSuccess: false,
  setMergeCustomerConfirmation: false,
  setShowMergeCustomerSuccess:false,
  setSingleUploadFrom:false
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SHOW_UPLOAD_FORM:
      return { ...state, showUploadForm: payload };
    case SET_SHOW_BULK_PREVIEW_FROM:
      return { ...state, setShowBulkPreviewFrom: payload };
    case SET_SHOW_UPLOAD_SUCCESS:
      return { ...state, setShowUploadSuccess: payload };
    case SET_SHOW_MERGE_CUSTOMER_FORM:
      return { ...state, setShowMergeCustomerForm: payload };
    case SET_TRANSFER_OWNERSHIP:
      return { ...state, setTransferOwnership: payload };
    case SET_TRANSFER_OWNERSHIP_SUCCESS:
      return { ...state, setTransferOwnershipSuccess: payload };
    case SET_MERGE_CUSTOMER_CONFIRMATION:
      return { ...state, setMergeCustomerConfirmation: payload };
    case SET_SHOW_MERGE_CUSTOMER_SUCCESS:
      return { ...state, setShowMergeCustomerSuccess: payload };
    case SET_SHOW_SINGLE_UPLOAD_FORM:
      return { ...state, setSingleUploadFrom: payload };
    default:
      return state;
  }
};
