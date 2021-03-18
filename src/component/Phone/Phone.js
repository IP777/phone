import { useState, useEffect } from "react";
import SecondMenu from "../../component/SecondMenu/SecondMenu";
import PhoneHeader from "../../component/PhoneHeader/PhoneHeader";
import Keyboard from "../../component/Keyboard/Keyboard";
import LineList from "../../component/LineList/LineList";
import PhoneFooter from "../../component/PhoneFooter/PhoneFooter";
import MiddlePhoneKeyboard from "../../component/MiddlePhoneKeyboard/MiddlePhoneKeyboard";
import HoldKeyboard from "../../component/HoldKeyboard/HoldKeyboard";

import useSipConnect from "../../hooks/useSipConnect";
import useSipSession from "../../hooks/useSipSession";

import style from "./Phone.module.sass";
import add_btn_img_src from "../../assets/image/add-btn.svg";
import logo from "../../assets/image/807f5eca0a528174731841552be4ce8f.png";

export default function Phone({ auth, loginWithToken, position, handlers }) {
	const [state, setState] = useState({
		isCall: false,
		inCall: false,
		pressNumber: false,
		sessionOn: false,
		mute: false,
		hold: false,
		statusDot: "active",
		statusCall: "",
		savePhone: true,
	});

	const [phoneNumder, setPhoneNumder] = useState([]);
	// Хук авторизации
	const { sipUa, sipAudio } = useSipConnect(auth);

	//Управление отображением клавиатуры на странице
	const inComingCall = (e) => {
		if (e) {
			setState({
				...state,
				isCall: false,
				inCall: e,
				statusDot: "incall",
				statusCall: "inCall",
			});
		} else {
			setState({
				...state,
				statusDot: "active",
				statusCall: "",
			});
		}
	};
	// Хук сессии
	const { session } = useSipSession({ sipUa, sipAudio, inComingCall });

	useEffect(() => {
		if (localStorage.getItem("number") && state.savePhone) {
			setPhoneNumder(localStorage.getItem("number").split(","));
			setState({ ...state, savePhone: false, pressNumber: true });
		}
	});

	const pressKey = (number) => {
		setPhoneNumder([...phoneNumder, ...number]);
		if (!state.pressNumber) {
			setState({ ...state, pressNumber: true });
		}
	};

	const removeHandler = () => {
		if (phoneNumder.length === 1) {
			setState({ ...state, pressNumber: false });
			setPhoneNumder([]);
			localStorage.removeItem("number");
			return;
		}
		setPhoneNumder(phoneNumder.slice(0, phoneNumder.length - 1));
	};

	const handelCall = () => {
		//Проверяем создалась сессия и есть ли входящий если нету то кнопка работает на звонок
		if (session && session.direction === "incoming") {
			setState({ ...state, isCall: true });

			session.answer({
				mediaConstraints: { audio: true, video: false },
			});

			session.connection.addEventListener("track", (e) => {
				sipAudio.srcObject = e.streams[0];
				sipAudio.play();
			});
		} else {
			//Проверка если не набрали номер
			if (phoneNumder.length === 0) {
				return;
			}
			// Обработка событии исх. звонка
			const eventHandlers = {
				progress: function (e) {
					setState({ ...state, isCall: true, statusCall: "call" });
				},
				failed: function (e) {
					setState({ ...state, isCall: false, statusCall: "" });
				},
				ended: function (e) {
					setState({ ...state, isCall: false, statusCall: "" });
				},
				confirmed: function (e) {
					setState({ ...state, statusCall: "talk" });
				},
			};

			sipUa.call(phoneNumder.join(""), {
				eventHandlers: eventHandlers,
				mediaConstraints: { audio: true, video: false },
			});

			console.log(phoneNumder.join(""));
			localStorage.setItem("number", phoneNumder);
		}
	};

	const handelEndCall = () => {
		session.terminate();
		setState({ ...state, isCall: false, inCall: false });
	};

	const handelMute = () => {
		if (state.mute) {
			setState({ ...state, mute: false });
			session.unmute({
				audio: true,
				video: false,
			});
		} else {
			setState({ ...state, mute: true });
			session.mute();
		}
	};

	const handelHold = () => {
		if (state.hold) {
			session.unhold();
			setState({ ...state, hold: false, statusDot: "hold" });
		} else {
			session.hold();
			setState({ ...state, hold: true, statusDot: "active" });
		}
	};

	return (
		<div
			className={style.wrapper}
			some="some text"
			style={{
				left: position.x,
				top: position.y,
			}}
		>
			<PhoneHeader
				name={auth.userName}
				status={state.statusDot}
				onMouseDown={handlers.downHandler}
				onMouseUp={handlers.upHandler}
			/>
			<div className={style.main}>
				<SecondMenu status={state.statusCall} />
				{state.isCall ? (
					<div className={style.phoneNumder}>{phoneNumder}</div>
				) : (
					<div className={style.phone_wrapper}>
						{state.pressNumber && !state.inCall ? (
							<div className={style.phoneNumder_wrapper}>
								<div className={style.add_contact_block}>
									<img src={add_btn_img_src} alt="+" />
									<div>Добавить контакт</div>
								</div>
								<div className={style.phoneNumder}>
									{phoneNumder}
								</div>
							</div>
						) : (
							<>
								{state.inCall ? (
									<div
										className={
											style.logo +
											" " +
											style.incoming_wrapper
										}
									>
										<div>Входящий звонок</div>
									</div>
								) : (
									<div className={style.logo}>
										<img
											draggable="false"
											src={logo}
											alt="logo"
										/>
										<div>Введите контактные данные</div>
									</div>
								)}
							</>
						)}
					</div>
				)}
				<LineList />
				{state.isCall ? (
					<HoldKeyboard handelHold={handelHold} isHold={state.hold} />
				) : (
					<>
						{!state.inCall && (
							<Keyboard
								pressKey={pressKey}
								phoneNumber={phoneNumder}
							/>
						)}
					</>
				)}
				<MiddlePhoneKeyboard
					handelCall={handelCall}
					handelEndCall={handelEndCall}
					handelMute={handelMute}
					removeHandler={removeHandler}
					mute={state.mute}
					isCall={state.isCall}
					inCall={state.inCall}
				/>
			</div>
			<PhoneFooter />
		</div>
	);
}
