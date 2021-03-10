import { useEffect, useState } from "react";
import JsSIP from "jssip";

export default function useSipConnect(session) {
	const [sipConnect, setSipConnect] = useState(false);
	const [sipUa, setSipUa] = useState({});
	const [sipAudio, setSipAudio] = useState();

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
				console.log("UA connected");
			});
			ua.on("disconnected", function (e) {});

			ua.on("registered", function (e) {});
			ua.on("unregistered", function (e) {
				console.log("UA unregistered");
			});
			ua.on("registrationFailed", function (e) {
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

	return { sipUa, sipAudio };
}
