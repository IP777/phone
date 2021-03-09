import {
	SET_USER_TOKEN,
	SET_USER_EMAIL,
	SET_IS_LOADED,
} from "../constants/session";

const initialState = {
	isLoaded: false,
	userToken: "",
	// userEmail: "",
	// userName: "",
};

export default function user(state = initialState, { type, payload }) {
	switch (type) {
		case SET_IS_LOADED:
			return { ...state, isLoaded: payload };
		case SET_USER_TOKEN:
			return { ...state, userToken: payload };
		// case SET_USER_EMAIL:
		// 	return { ...state, userEmail: payload };

		default:
			return state;
	}
}
