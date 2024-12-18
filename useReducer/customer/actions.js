

export const SET_SHOW_UPLOAD_FORM = "SET_SHOW_UPLOAD_FORM";
export const SET_SHOW_BULK_PREVIEW_FROM = "SET_SHOW_BULK_PREVIEW_FROM";
export const SET_SHOW_UPLOAD_SUCCESS = "SET_SHOW_UPLOAD_SUCCESS";
export const SET_SHOW_MERGE_CUSTOMER_FORM = "SET_SHOW_MERGE_CUSTOMER_FORM";
export const SET_TRANSFER_OWNERSHIP = "SET_TRANSFER_OWNERSHIP";
export const SET_TRANSFER_OWNERSHIP_SUCCESS = "SET_TRANSFER_OWNERSHIP_SUCCESS";
export const SET_MERGE_CUSTOMER_CONFIRMATION = "SET_MERGE_CUSTOMER_CONFIRMATION";
export const SET_SHOW_MERGE_CUSTOMER_SUCCESS = "SET_SHOW_MERGE_CUSTOMER_SUCCESS";

export const SET_SHOW_SINGLE_UPLOAD_FORM = "SET_SHOW_SINGLE_UPLOAD_FORM";


export const setBulkUploadForm = (dispatch, payload) =>
  dispatch({ type: SET_SHOW_UPLOAD_FORM, payload });
  
  export const setShowBulkPreviewForm = (dispatch, payload) =>
  dispatch({ type: SET_SHOW_BULK_PREVIEW_FROM, payload });
  
  export const setShowUplaodSuccess = (dispatch, payload) =>
  dispatch({ type: SET_SHOW_UPLOAD_SUCCESS, payload });
  
  export const setShowMergeCustomerForm = (dispatch, payload) =>
  dispatch({ type: SET_SHOW_MERGE_CUSTOMER_FORM, payload });
  
  export const setTransferOwnership = (dispatch, payload) =>
  dispatch({ type: SET_TRANSFER_OWNERSHIP, payload });
  
  export const setTransferOwnershipSuccess = (dispatch, payload) =>
  dispatch({ type: SET_TRANSFER_OWNERSHIP_SUCCESS, payload });
  
  export const setMergeCustomerConfirmation = (dispatch, payload) =>
  dispatch({ type: SET_MERGE_CUSTOMER_CONFIRMATION, payload });
  
  export const setShowMergeCustomerSuccess = (dispatch, payload) =>
  dispatch({ type: SET_SHOW_MERGE_CUSTOMER_SUCCESS, payload });
  

  export const setSingleUploadFrom = (dispatch, payload) =>
    dispatch({ type: SET_SHOW_SINGLE_UPLOAD_FORM, payload });
