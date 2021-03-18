import style from "./LoginPage.module.sass";
import { useState } from "react";

export default function LoginPage({ loginWithResponse, history }) {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const [valid, setValid] = useState({
		email: true,
		password: true,
	});

	const submitHandler = async (e) => {
		e.preventDefault();

		if (user.email.length === 0 || !user.email.includes("@")) {
			alert("Введите правильно email");
			setValid({ ...valid, email: false });
			return;
		}

		if (user.password.length <= 3) {
			alert("Пароль должен состоять из не менее 3 цыфр.");
			setValid({ ...valid, password: false, comfirmPassword: false });
			return;
		}

		const loginResp = await loginWithResponse({
			email: user.email,
			password: user.password,
		});

		if (loginResp.error) {
			alert(loginResp.error);
		}

		if (loginResp.data.uri) {
			history.push("/");
		}
	};

	const handlerChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handelOnFocus = (e) => {
		setValid({ ...valid, [e.target.name]: true });
	};

	return (
		<>
			<form className={style.form} onSubmit={submitHandler}>
				<h2>Войти</h2>
				<input
					name="email"
					className={valid.email ? style.input : style.input_invalid}
					type="text"
					placeholder="email"
					onChange={handlerChange}
					onFocus={handelOnFocus}
				/>
				<input
					name="password"
					className={valid.email ? style.input : style.input_invalid}
					type="password"
					placeholder="password"
					onChange={handlerChange}
					onFocus={handelOnFocus}
				/>
				<input
					className={style.submit}
					type="submit"
					value="Отправить"
				/>
			</form>
		</>
	);
}
