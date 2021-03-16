import { useState } from "react";
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
import { loginWithToken } from "../../redux/operations/sessionOperations";
import useSipConnect from "../../hooks/useSipConnect";
import useSipSession from "../../hooks/useSipSession";
import style from "./PhonePage.module.sass";
import add_btn_img_src from "../../assets/image/add-btn.svg";

function PhonePage({ auth, loginWithToken }) {
	const [state, setState] = useState({
		isCall: false,
		inCall: false,
		pressNumber: false,
		sessionOn: false,
		mute: false,
		hold: false,
	});

	const [phoneNumder, setPhoneNumder] = useState([]);
	// Хук авторизации
	const { sipUa, sipAudio } = useSipConnect(auth);

	//Управление отображением клавиатуры на странице
	const inComingCall = (e) => {
		setState({ ...state, isCall: false, inCall: e });
	};
	// Хук сессии
	const { session } = useSipSession({ sipUa, sipAudio, inComingCall });

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
			console.log("inCall");
			setState({ ...state, isCall: true });
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
		} else {
			console.log("call");
			//Проверка если не набрали номер
			if (phoneNumder.length === 0) {
				return;
			}
			// Обработка событии исх. звонка
			const eventHandlers = {
				progress: function (e) {
					console.log("call is in progress");
					setState({ ...state, isCall: true });
					// session.connection.addEventListener("track", (e) => {
					// 	sipAudio.srcObject = e.streams[0];
					// 	sipAudio.play();
					// });
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

			// const callSession = sipUa.
			sipUa.call(phoneNumder.join(""), {
				eventHandlers: eventHandlers,
				mediaConstraints: { audio: true, video: false },
			});

			console.log(phoneNumder.join(""));
		}
	};

	const handelEndCall = () => {
		console.log(session);
		session.terminate();
		setState({ ...state, isCall: false, inCall: false });
	};

	const handelMute = () => {
		if (state.mute) {
			setState({ ...state, mute: false });
			console.log("unmute");
			session.unmute({
				audio: true,
				video: false,
			});
		} else {
			setState({ ...state, mute: true });
			console.log("mute");
			session.mute();
		}
	};

	const handelHold = () => {
		if (state.hold) {
			session.unhold();
			console.log("unhold");
			setState({ ...state, hold: false });
		} else {
			session.hold();
			console.log("hold");
			setState({ ...state, hold: true });
		}
	};

	return (
		<Draggable>
			<div className={style.wrapper} some="some text">
				<PhoneHeader name={auth.userName} />
				<div className={style.main}>
					<SecondMenu status={state.inCall ? "inCall" : null} />
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
								<>
									{state.inCall ? (
										<div
											className={
												style.logo +
												" " +
												style.incaming_wrapper
											}
										>
											<span>Входящий звонок</span>
										</div>
									) : (
										<div className={style.logo}>
											<img src={logo} alt="logo" />
											<span>
												Введите контактные данные
											</span>
										</div>
									)}
								</>
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
		</Draggable>
	);
}

const mapStateToProps = (state) => ({
	auth: getSession(state),
});

const mapDispatchToProps = {
	loginWithToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhonePage);
