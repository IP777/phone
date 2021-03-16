import { useEffect, useState } from "react";

export default function useSipConnect({ sipUa, sipAudio, inComingCall }) {
	const [session, setSession] = useState();

	useEffect(() => {
		if (!(sipUa.constructor === Object) && !sipUa.isConnected()) {
			sipUa.on("newRTCSession", (e) => {
				console.log(`session on`);
				const session = e.session;

				if (session.direction === "incoming") {
					console.log("incoming");
					// console.log(session.isInProgress());
					// console.log(session.isEnded());

					setSession(session);
					inComingCall(true);
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
