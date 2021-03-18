import { useEffect, useState } from "react";

export default function useTimeNow() {
	const [timer, setTimer] = useState();

	const timeFunc = () => {
		const dateNow = new Date();

		const hoursNow =
			dateNow.getHours() < 10
				? `0${dateNow.getHours()}`
				: dateNow.getHours();
		const minutesNow =
			dateNow.getMinutes() < 10
				? `0${dateNow.getMinutes()}`
				: dateNow.getMinutes();
		const secondsNow =
			dateNow.getSeconds() < 10
				? `0${dateNow.getSeconds()}`
				: dateNow.getSeconds();

		return `${hoursNow}:${minutesNow}:${secondsNow}`;
	};

	useEffect(() => {
		const timer = setInterval(() => {
			setTimer(timeFunc());
		}, 1000);
		return () => clearInterval(timer);
	});

	return timer;
}
