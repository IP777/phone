import {
	setUserToken,
	setUserName,
	setUserPass,
	setUserUrl,
	setHost,
	isLoaded,
} from "../actions/session";
import { loginRequestApi } from "../../services/session-api";

export const loginWithResponse = (credentials) => async (dispath) => {
	try {
		const response = await loginRequestApi(credentials);
		if (!response.error) {
			dispath(setUserToken(response.data.token));
			dispath(setUserName(response.data.name));
			dispath(setUserPass(response.data.password));
			dispath(setUserUrl(response.data.uri));
			dispath(setHost(response.data.host));
		}
		dispath(isLoaded(true));
		return response;
	} catch (error) {
		throw new Error(error);
	}
};
