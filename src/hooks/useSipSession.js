import { useEffect, useState } from "react";

export default function useSipConnect({ sipUa, sipAudio, inComingCall }) {
	const [session, setSession] = useState();

	//Можно было б сюда засунуть ивенты нажатие кнопок #button.addEventListner
	//возможно так бы оно лучше работало. Но мне кажется как то странно писать
	//ванилаjs стилем в реакте...
	useEffect(() => {
		//Проверки что б сессия не обновлялась по кругу
		if (!(sipUa.constructor === Object) && !sipUa.isConnected()) {
			sipUa.on("newRTCSession", (e) => {
				const session = e.session;
				//Задумка была такова что б прокидывать сессию дальше в основной
				//компонент звонилки и в нем уже подключать поптоковый звук
				//но в основной компонент прилитает пустой обьект не успевает обновится..
				if (session.direction === "incoming") {
					console.log("incoming");
					//Пробовал прокидывать состояние сессии но они не обновляются в нутри компонента
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
