import { BREADCRUMB_BUTTON_TEXT, SHOW_BREADCRUMB_MODAL } from "./constants";


export const updateBreadcrumbAction = (value) => ({
	type: BREADCRUMB_BUTTON_TEXT,
	payload: value,
});

export const showBreadcrumbModel = (value) => ({
	type: SHOW_BREADCRUMB_MODAL,
	payload: value,
});