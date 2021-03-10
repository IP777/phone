import {
	SET_USER_TOKEN,
	SET_USER_NAME,
	SET_USER_PASS,
	SET_USER_URL,
	SET_HOST,
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

export const setUserName = (payload) => ({
	type: SET_USER_NAME,
	payload,
});

export const setUserPass = (payload) => ({
	type: SET_USER_PASS,
	payload,
});

export const setUserUrl = (payload) => ({
	type: SET_USER_URL,
	payload,
});

export const setHost = (payload) => ({
	type: SET_HOST,
	payload,
});
