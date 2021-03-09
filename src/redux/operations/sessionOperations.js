import { setUserToken, setUserEmail, isLoaded } from "../actions/session";
import { loginRequestApi } from "../../services/session-api";

export const loginWithResponse = (credentials) => async (dispath) => {
	try {
		const response = await loginRequestApi(credentials);
		if (!response.error) {
			dispath(setUserToken(response.data.token));
		}
		dispath(isLoaded(true));
		console.log(response);
		return response;
	} catch (error) {
		throw new Error(error);
	}
};

// export const getInitialData = () => (dispatch) => {
// 	const userData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

// 	if (userData) {
// 		dispatch(setUserToken(userData.token));
// 		dispatch(setUserName(userData.name));
// 		dispatch(setUserEmail(userData.email));
// 	}
// 	dispatch(isLoaded(true));
// };
