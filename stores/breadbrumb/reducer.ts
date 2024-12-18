
import { BREADCRUMB_BUTTON_TEXT, SHOW_BREADCRUMB_MODAL } from "./constants";



const initialState = {
    name: "",
    show: false,
};

  
export const breadcrumbModalReducer = (state = initialState, action) => {
	const { payload, type } = action;
	switch (type) {
	case BREADCRUMB_BUTTON_TEXT:
		return { ...state, name: payload };
    case SHOW_BREADCRUMB_MODAL:
			return { ...state, show: payload};
		default:
			return state;
	}
};
