import style from "./LoginPage.module.css";
import { useState } from "react";
import { connect } from "react-redux";
import { loginWithResponse } from "../../redux/operations/sessionOperations";

function LoginPage({ loginWithResponse }) {
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
			email: "danilo.bilyi@gmail.com",
			password: "DG-WToq8Lo3bGWGegeO3ASDASDQRFUWKYG7YOF5n",
		});

		if (loginResp.error) {
			alert(loginResp.error);
		}
	};

	const handlerChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handelOnFocus = (e) => {
		setValid({ ...valid, [e.target.name]: true });
	};

	return (
		<form className={style.form} onSubmit={submitHandler}>
			<h2>Залогинится</h2>
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
			<input className={style.submit} type="submit" value="Отправить" />
		</form>
	);
}

// export default LoginPage;

const mapDispatchToProps = {
	loginWithResponse,
};

export default connect(null, mapDispatchToProps)(LoginPage);
