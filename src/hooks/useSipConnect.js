import { useEffect, useState } from "react";
import JsSIP from "jssip";

export default function useSipConnect(auth) {
	const [sipConnect, setSipConnect] = useState(false);
	const [sipUa, setSipUa] = useState({});
	const [sipAudio, setSipAudio] = useState();

	useEffect(() => {
		if (!sipConnect) {
			JsSIP.debug.enable("JsSIP:*");
			const socket = new JsSIP.WebSocketInterface(auth.host);
			socket.via_transport = "wss";
			const configuration = {
				sockets: [socket],
				uri: auth.userUrl,
				name: auth.userName,
				password: auth.userPass,
				register_expires: auth.registerExpires,
				session_timers_refresh_method: auth.sessionTimersRefrMethod,
				realm: 30,
			};

			const ua = new JsSIP.UA(configuration);

			// События регистрации клиента
			ua.on("connected", function (e) {
				console.log("UA connected");
			});
			ua.on("disconnected", function (e) {});
			ua.on("registered", function (e) {});
			ua.on("unregistered", function (e) {});
			ua.on("registrationFailed", function (e) {
				console.error("UA registrationFailed", e.cause);
			});

			setSipConnect(true);

			// Запускаем
			ua.start();
			setSipUa(ua);

			//Подключение к микрофону потоковый звук
			let remoteAudio = new window.Audio();
			remoteAudio.autoplay = true;

			let oSipAudio = new window.Audio();

			setSipAudio(remoteAudio);
		}
	});

	return { sipUa, sipAudio };
}
