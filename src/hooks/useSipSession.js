import { useEffect, useState } from "react";

export default function useSipConnect({ sipUa, sipAudio, inComingCall }) {
	const [session, setSession] = useState();

	useEffect(() => {
		//Проверки что б сессия не обновлялась по кругу
		if (!(sipUa.constructor === Object) && !sipUa.isConnected()) {
			sipUa.on("newRTCSession", (e) => {
				const session = e.session;
				if (session.direction === "incoming") {
					console.log("incoming");
					//Костыль желательно переделать структуру программы
					// console.log(session.isInProgress());
					const timer = setInterval(() => {
						if (session.isEnded()) {
							inComingCall(false);
							clearInterval(timer);
						}
					}, 500);
					setSession(session);
					inComingCall(true, session.remote_identity.uri.user);
				} else {
					setSession(session);
					session.connection.addEventListener("track", (e) => {
						sipAudio.srcObject = e.streams[0];
						sipAudio.play();
					});
				}
			});
		}
	});

	return { session };
}
