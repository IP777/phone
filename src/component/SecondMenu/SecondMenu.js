import useTimeNow from "./helpers/useTimeNow";
import style from "./SecondMenu.module.sass";
import search_img_src from "../../assets/image/search.svg";
import dot_img_src from "../../assets/image/dot-menu.svg";
import clock_img_src from "../../assets/image/clock.svg";

export default function SecondMenu({ status }) {
	const timer = useTimeNow();

	const callStatus = (status) => {
		switch (status) {
			case "inCall":
				return "Входящий...";
			case "call":
				return "Вызов...";
			case "talk":
				return "Разговор...";
			default:
				break;
		}
	};

	return (
		<div className={style.sm_wrapper}>
			<div className={style.time}>
				<img src={clock_img_src} alt="O" />
				{timer}
			</div>
			{status && <span>{callStatus(status)}</span>}
			<nav>
				<img src={search_img_src} alt="O" />
				<img src={dot_img_src} alt=":" />
			</nav>
		</div>
	);
}
