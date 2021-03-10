export default function name() {
	function timeNow() {
		const dateNow = new Date();

		const hoursNow =
			dateNow.getHours() < 10
				? `0${dateNow.getHours()}`
				: dateNow.getHours();
		const minutesNow =
			dateNow.getMinutes() < 10
				? `0${dateNow.getMinutes()}`
				: dateNow.getMinutes();

		return `${hoursNow}:${minutesNow}`;
	}

	return timeNow();
}
