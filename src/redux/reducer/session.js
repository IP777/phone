import {
	SET_IS_LOADED,
	SET_USER_TOKEN,
	SET_USER_NAME,
	SET_USER_PASS,
	SET_USER_URL,
	SET_HOST,
	SET_REGISTER_EXPIRIES,
	SET_SESSION_TIMERS_REFRESH_METHOD,
	SET_RELAMS,
} from "../constants/session";

const initialState = {
	isLoaded: false,
	userToken: "",
	userName: "",
	userPass: "",
	userUrl: "",
	host: "",
	registerExpires: "",
	sessionTimersRefrMethod: "",
	realm: "",
};

export default function user(state = initialState, { type, payload }) {
	switch (type) {
		case SET_IS_LOADED:
			return { ...state, isLoaded: payload };
		case SET_USER_TOKEN:
			return { ...state, userToken: payload };
		case SET_USER_NAME:
			return { ...state, userName: payload };
		case SET_USER_PASS:
			return { ...state, userPass: payload };
		case SET_USER_URL:
			return { ...state, userUrl: payload };
		case SET_HOST:
			return { ...state, host: payload };
		case SET_REGISTER_EXPIRIES:
			return { ...state, registerExpires: payload };
		case SET_SESSION_TIMERS_REFRESH_METHOD:
			return { ...state, sessionTimersRefrMethod: payload };
		case SET_RELAMS:
			return { ...state, realm: payload };
		default:
			return state;
	}
}

export const isLoggedInSelector = (state) => Boolean(state.session.userToken);
export const isUriInSelector = (state) => Boolean(state.session.userUrl);
export const getSession = (state) => state.session;
export const getToken = (state) => state.session.userToken;
