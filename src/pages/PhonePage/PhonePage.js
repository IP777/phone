import { useState } from "react";
import logo from "../../assets/image/807f5eca0a528174731841552be4ce8f.png";
import Draggable from "react-draggable";
import SecondMenu from "../../component/SecondMenu/SecondMenu";
import PhoneHeader from "../../component/PhoneHeader/PhoneHeader";
import Keyboard from "../../component/Keyboard/Keyboard";
import LineList from "../../component/LineList/LineList";
import PhoneFooter from "../../component/PhoneFooter/PhoneFooter";
import MiddlePhoneKeyboard from "../../component/MiddlePhoneKeyboard/MiddlePhoneKeyboard";
import { connect } from "react-redux";
import { getSession } from "../../redux/reducer/session";
import useSipConnect from "../../hooks/useSipConnect";
import "./PhonePage.sass";

function PhonePage({ session }) {
	const [state, setState] = useState({
		keyboardIsOn: true,
		pressNumber: false,
	});
	const [sipCall, setSipCall] = useState({});
	const [phoneNumder, setPhoneNumder] = useState([]);
	const { sipUa, sipAudio } = useSipConnect(session);

	const pressKey = (number) => {
		setPhoneNumder([...phoneNumder, number]);
		if (!state.pressNumber) {
			setState({ ...state, pressNumber: true });
		}
		if (phoneNumder.length === 0) {
			setPhoneNumder(["+", "3", "8", "0", number]);
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
		// Обработка событии исх. звонка
		const eventHandlers = {
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

		const callSession = sipUa.call(phoneNumder.join(""), {
			eventHandlers: eventHandlers,
			mediaConstraints: { audio: true, video: false },
		});

		setSipCall(callSession);
	};

	const handelEndCall = () => {
		sipCall.terminate();
	};

	return (
		<Draggable>
			<div className="wrapper">
				<PhoneHeader name={session.userName} />
				<div className="main">
					<SecondMenu status={null} />
					{state.pressNumber ? (
						<span>{phoneNumder}</span>
					) : (
						<div className="logo">
							<img src={logo} alt="logo" />
							<span>Введите контактные данные</span>
						</div>
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
