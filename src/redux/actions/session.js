import {
	SET_USER_TOKEN,
	SET_USER_EMAIL,
	SET_IS_LOADED,
} from "../constants/session";

export const isLoaded = (payload) => ({
	type: SET_IS_LOADED,
	payload,
});

export const setUserToken = (payload) => ({
	type: SET_USER_TOKEN,
	payload,
});

export const setUserEmail = (payload) => ({
	type: SET_USER_EMAIL,
	payload,
});
