export default function timeNow(time) {
	const dateNow = time ? new Date(time) : new Date();

	const hoursNow =
		dateNow.getHours() < 10 ? `0${dateNow.getHours()}` : dateNow.getHours();
	const minutesNow =
		dateNow.getMinutes() < 10
			? `0${dateNow.getMinutes()}`
			: dateNow.getMinutes();
	const secondsNow =
		dateNow.getSeconds() < 10
			? `0${dateNow.getSeconds()}`
			: dateNow.getSeconds();

	return `${hoursNow}:${minutesNow}:${secondsNow}`;
}
