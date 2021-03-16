import { useState, useEffect } from "react";
import logo from "../../assets/image/807f5eca0a528174731841552be4ce8f.png";
import Draggable from "react-draggable";
import SecondMenu from "../../component/SecondMenu/SecondMenu";
import PhoneHeader from "../../component/PhoneHeader/PhoneHeader";
import Keyboard from "../../component/Keyboard/Keyboard";
import LineList from "../../component/LineList/LineList";
import PhoneFooter from "../../component/PhoneFooter/PhoneFooter";
import MiddlePhoneKeyboard from "../../component/MiddlePhoneKeyboard/MiddlePhoneKeyboard";
import HoldKeyboard from "../../component/HoldKeyboard/HoldKeyboard";
import { connect } from "react-redux";
import { getSession } from "../../redux/reducer/session";
import useSipConnect from "../../hooks/useSipConnect";
import useSipSession from "../../hooks/useSipSession";
import style from "./PhonePage.module.sass";
import add_btn_img_src from "../../assets/image/add-btn.svg";

function PhonePage({ auth }) {
	const [state, setState] = useState({
		isCall: false,
		pressNumber: false,
		sessionOn: false,
		mute: false,
		hold: false,
	});

	const [sipCall, setSipCall] = useState({});
	const [phoneNumder, setPhoneNumder] = useState([]);
	// Хук авторизации
	const { sipUa, sipAudio } = useSipConnect(auth);
	// Хук сессии
	const { session } = useSipSession({ sipUa, sipAudio });

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
			return;
		}
		setPhoneNumder(phoneNumder.slice(0, phoneNumder.length - 1));
	};

	const handelCall = () => {
		//Проверяем создалась сессия и есть ли входящий если нету то кнопка работает на звонок
		if (session && session.direction === "incoming") {
			document
				.querySelector("#callBtn")
				.addEventListener("click", (e) => {
					e.stopPropagation();
					session.answer({
						mediaConstraints: {
							audio: true,
							video: false,
						},
					});
					session.connection.addEventListener("track", (e) => {
						sipAudio.srcObject = e.streams[0];
						sipAudio.play();
					});
				});
		} else {
			//Проверка если не набрали номер
			if (phoneNumder.length === 0) {
				return;
			}
			// Обработка событии исх. звонка
			const eventHandlers = {
				progress: function (e) {
					console.log("call is in progress");
					setState({ ...state, isCall: true });
				},
				failed: function (e) {
					console.log("call failed with cause: " + e.cause);
					setState({ ...state, isCall: false });
				},
				ended: function (e) {
					console.log("call ended with cause: " + e.cause);
					setState({ ...state, isCall: false });
				},
				confirmed: function (e) {
					console.log("call confirmed");
				},
			};

			const callSession = sipUa.call(phoneNumder.join(""), {
				eventHandlers: eventHandlers,
				mediaConstraints: { audio: true, video: false },
			});

			console.log(phoneNumder.join(""));
			setSipCall(callSession);
		}
	};

	const handelEndCall = () => {
		sipCall.terminate();
		setState({ ...state, isCall: false });
	};

	const handelMute = () => {
		if (state.mute) {
			setState({ ...state, mute: false });
			console.log("unmute");
			sipCall.unmute({
				audio: true,
				video: false,
			});
		} else {
			setState({ ...state, mute: true });
			console.log("mute");
			sipCall.mute();
		}
	};

	const handelHold = () => {
		if (state.hold) {
			sipCall.unhold();
			console.log("unhold");
			setState({ ...state, hold: false });
		} else {
			sipCall.hold();
			console.log("hold");
			setState({ ...state, hold: true });
		}
	};

	return (
		<Draggable>
			<div className={style.wrapper} some="some text">
				<PhoneHeader name={auth.userName} />
				<div className={style.main}>
					<SecondMenu status={null} />
					{state.isCall ? (
						<span className={style.phoneNumder}>{phoneNumder}</span>
					) : (
						<div className={style.phone_wrapper}>
							{state.pressNumber ? (
								<div className={style.phoneNumder_wrapper}>
									<div className={style.add_contact_block}>
										<img src={add_btn_img_src} alt="+" />
										<span>Добавить контакт</span>
									</div>
									<span className={style.phoneNumder}>
										{phoneNumder}
									</span>
								</div>
							) : (
								<div className={style.logo}>
									<img src={logo} alt="logo" />
									<span>Введите контактные данные</span>
								</div>
							)}
						</div>
					)}
					<LineList />
					{state.isCall ? (
						<HoldKeyboard
							handelHold={handelHold}
							isHold={state.hold}
						/>
					) : (
						<Keyboard
							pressKey={pressKey}
							phoneNumber={phoneNumder}
						/>
					)}
					<MiddlePhoneKeyboard
						handelCall={handelCall}
						handelEndCall={handelEndCall}
						handelMute={handelMute}
						removeHandler={removeHandler}
						mute={state.mute}
						isCall={state.isCall}
					/>
				</div>
				<PhoneFooter />
			</div>
		</Draggable>
	);
}

const mapStateToProps = (state) => ({
	auth: getSession(state),
});

export default connect(mapStateToProps)(PhonePage);
