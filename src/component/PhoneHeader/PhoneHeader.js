import style from "./PhoneHeader.module.sass";
import angle_down_img_src from "../../assets/image/angle-down.svg";
import x_btn_img_src from "../../assets/image/x-btn.svg";

export default function PhoneHeader({ name }) {
	return (
		<div className={style.header}>
			<div className={style.statusDot + " " + style.status_dot_active} />
			<span>{name}</span>
			<div>
				<img
					className={style.drop_dawn}
					src={angle_down_img_src}
					alt="\/"
				/>
				<img className={style.close_btn} src={x_btn_img_src} alt="x" />
			</div>
		</div>
	);
}
