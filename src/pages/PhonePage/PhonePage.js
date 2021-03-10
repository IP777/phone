import { useEffect, useState } from "react";
import style from "./PhonePage.module.css";
import logo from "../../assets/image/807f5eca0a528174731841552be4ce8f.png";
import Draggable from "react-draggable";
import timeWidget from "../../component/TimeWidget/TimeWidget";
import PhoneHeader from "../../component/PhoneHeader/PhoneHeader";
import Keyboard from "../../component/Keyboard/Keyboard";
import LineList from "../../component/LineList/LineList";
import PhoneFooter from "../../component/PhoneFooter/PhoneFooter";
import MiddlePhoneKeyboard from "../../component/MiddlePhoneKeyboard/MiddlePhoneKeyboard";
import { connect } from "react-redux";
import { getSession } from "../../redux/reducer/session";
import JsSIP from "jssip";

function PhonePage({ session }) {
	const [state, setState] = useState({
		keyboardIsOn: true,
		pressNumber: false,
	});

	const [sipConnect, setSipConnect] = useState(false);
	const [sipUa, setSipUa] = useState({});
	const [sipCall, setSipCall] = useState({});
	const [sipAudio, setSipAudio] = useState();

	const [phoneNumder, setPhoneNumder] = useState(["+", "3", "8", "0"]);

	const pressKey = (number) => {
		setPhoneNumder([...phoneNumder, number]);

		if (!state.pressNumber) {
			setState({ ...state, pressNumber: true });
		}
	};

	const removeHandler = () => {
		if (phoneNumder.length === 1) {
			setState({ ...state, pressNumber: false });
			return;
		}
		setPhoneNumder(phoneNumder.slice(0, phoneNumder.length - 1));
	};

	const handelCall = () => {
		// Обработка событии исх. звонка
		var eventHandlers = {
			progress: function (e) {
				console.log("call is in progress");

				session.connection.ontrack = function (e) {
					console.log(e);
					sipAudio.srcObject = e.streams[0];
				};
			},
			failed: function (e) {
				console.log("call failed with cause: " + e.cause);
			},
			ended: function (e) {
				console.log("call ended with cause: " + e.cause);
			},
			confirmed: function (e) {
				console.log("call confirmed");
				console.log(e);
			},
		};

		var options = {
			eventHandlers: eventHandlers,
			mediaConstraints: { audio: true, video: false },
		};

		const callSession = sipUa.call(phoneNumder.join(""), options);

		setSipCall(callSession);
	};

	const handelEndCall = () => {
		sipCall.terminate();
	};

	useEffect(() => {
		if (!sipConnect) {
			JsSIP.debug.enable("JsSIP:*");
			var socket = new JsSIP.WebSocketInterface(session.host);
			var configuration = {
				sockets: [socket],
				uri: session.userUrl,
				password: session.userPass,
			};

			var ua = new JsSIP.UA(configuration);

			// События регистрации клиента
			ua.on("connected", function (e) {
				/* Код */
				console.log("UA connected");
			});
			ua.on("disconnected", function (e) {
				/* Код */
			});

			ua.on("registered", function (e) {
				/* Код */
			});
			ua.on("unregistered", function (e) {
				/* Код */
				console.log("UA unregistered");
			});
			ua.on("registrationFailed", function (e) {
				/*Код */
				console.error("UA registrationFailed", e.cause);
			});

			setSipConnect(true);

			// Запускаем
			// ua.start();
			setSipUa(ua);

			//Подключение к микрофону потоковый звук
			const remoteAudio = new window.Audio();
			remoteAudio.autoplay = true;

			setSipAudio(remoteAudio);
		}
	});

	return (
		<Draggable>
			<div className={style.wrapper}>
				<PhoneHeader />
				<div className={style.main}>
					<div className={style.mainHeader}>{timeWidget()}</div>
					{state.pressNumber ? (
						<span>{phoneNumder}</span>
					) : (
						<img src={logo} alt="logo" />
					)}

					<LineList />
					<Keyboard pressKey={pressKey} phoneNumber={phoneNumder} />
					<MiddlePhoneKeyboard
						handelCall={handelCall}
						handelEndCall={handelEndCall}
						removeHandler={removeHandler}
					/>
				</div>
				<PhoneFooter />
			</div>
		</Draggable>
	);
}

const mapStateToProps = (state) => ({
	session: getSession(state),
});

export default connect(mapStateToProps)(PhonePage);
