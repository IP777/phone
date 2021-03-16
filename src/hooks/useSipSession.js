import { useEffect, useState } from "react";

export default function useSipConnect({ sipUa, sipAudio }) {
	const [session, setSession] = useState();

	useEffect(() => {
		if (!(sipUa.constructor === Object)) {
			sipUa.on("newRTCSession", (e) => {
				console.log(`session on`);
				const session = e.session;
				setSession(session);

				if (session.direction === "incoming") {
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
							session.connection.addEventListener(
								"track",
								(e) => {
									sipAudio.srcObject = e.streams[0];
									sipAudio.play();
								}
							);
						});
				} else {
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
