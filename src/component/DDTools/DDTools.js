import { useState, useEffect } from "react";

export default function DDTools({ Component }) {
	const [state, setState] = useState({
		mousePush: false,
	});
	const [mouse, setMouse] = useState({
		posX: 100,
		posY: 50,
	});
	const [shiftMouse, setShiftMouse] = useState({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		const mouseMove = (e) => {
			setMouse({
				posX: e.pageX + shiftMouse.x,
				posY: e.pageY + shiftMouse.y,
			});
		};

		if (state.mousePush) {
			document.addEventListener("mousemove", mouseMove);
		}
		return () => document.removeEventListener("mousemove", mouseMove);
	});

	const downHandler = (e) => {
		setShiftMouse({ x: mouse.posX - e.clientX, y: mouse.posY - e.clientY });
		setState({ mousePush: true });
	};
	const upHandler = (e) => {
		setState({ mousePush: false });
	};

	return (
		<Component
			position={{ x: mouse.posX, y: mouse.posY }}
			handlers={{ downHandler, upHandler }}
		/>
	);
}
