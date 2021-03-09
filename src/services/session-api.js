import { API_URL } from "../constants/sessions";

//https://soft.cabinet24.com.ua/user/login/token

export const loginRequestApi = (data) => {
	return fetch(`${API_URL}/user/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then((res) => {
		if (res.ok) {
			return res.json();
		}
		return res.json();
	});
};
