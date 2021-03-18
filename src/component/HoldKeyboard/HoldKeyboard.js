import style from "./HoldKeyboard.module.sass";
import conference_img_src from "../../assets/image/conference.svg";
import transfer_img_src from "../../assets/image/transfer.svg";
import hold_img_src from "../../assets/image/hold.svg";

export default function HoldKeyboard({ handelHold, isHold }) {
	return (
		<div className={style.holdListWrapper}>
			<div className={style.keyboardBtn}>
				<img src={conference_img_src} alt="X" />
				<div>Конференция</div>
			</div>
			<div className={style.keyboardBtn}>
				<img src={transfer_img_src} alt="X" />
				<div>Трансфер</div>
			</div>
			<div
				id="muteBtn"
				className={style.keyboardBtn}
				onClick={handelHold}
			>
				<img src={hold_img_src} alt="X" />
				<div>{isHold ? "Продолжить" : "Удержать"}</div>
			</div>
		</div>
	);
}
