import style from "./PhoneHeader.module.sass";
import angle_down_img_src from "../../assets/image/angle-down.svg";
import x_btn_img_src from "../../assets/image/x-btn.svg";

export default function PhoneHeader({ name, status, onMouseDown, onMouseUp }) {
	const callStatus = (status) => {
		switch (status) {
			case "active":
				return style.status_dot_active;
			case "hold":
				return style.status_dot_hold;
			case "incall":
				return style.status_dot_inCall;
			default:
				break;
		}
	};

	return (
		<div
			className={style.header}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
		>
			<div className={style.statusDot + " " + callStatus(status)} />
			<div className={style.name}>{name}</div>
			<div className={style.nav}>
				<img
					draggable="false"
					className={style.drop_dawn}
					src={angle_down_img_src}
					alt="\/"
				/>
				<img
					draggable="false"
					className={style.close_btn}
					src={x_btn_img_src}
					alt="x"
				/>
			</div>
		</div>
	);
}
