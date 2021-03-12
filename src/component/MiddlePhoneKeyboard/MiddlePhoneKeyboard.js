import style from "./MiddlePhineKeyboard.module.sass";
import keyboard_img_src from "../../assets/image/keyboard 1.svg";
import dell_btn_img_src from "../../assets/image/dell-btn.svg";
import phone_img_src from "../../assets/image/phone.svg";
import mute_img_src from "../../assets/image/muteBtn.svg";
import downCall_img_src from "../../assets/image/downCall.svg";

export default function MiddlePhoneKeyboard({
	handelCall,
	removeHandler,
	handelEndCall,
	isCall,
}) {
	return (
		<div className={style.callListWrapper}>
			{isCall ? (
				<>
					<div className={style.keyboardBtn}>
						<img src={keyboard_img_src} alt="X" />
						<span>Скрыть</span>
					</div>
					<div className={style.downCallBtn} onClick={handelCall}>
						<img src={downCall_img_src} alt="X" />
					</div>

					<div className={style.muteBtn} onClick={removeHandler}>
						<img src={mute_img_src} alt="X" />
						<span>Выкл. мик</span>
					</div>
				</>
			) : (
				<>
					<div className={style.keyboardBtn}>
						<img src={keyboard_img_src} alt="X" />
						<span>Клавиатура</span>
					</div>
					<div className={style.callBtn2} onClick={handelCall}>
						<img src={phone_img_src} alt="X" />
					</div>

					<div className={style.eraseBtn} onClick={removeHandler}>
						<img src={dell_btn_img_src} alt="X" />
					</div>
				</>
			)}
		</div>
	);
}
