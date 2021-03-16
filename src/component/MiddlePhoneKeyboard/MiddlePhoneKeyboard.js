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
	handelMute,
	mute,
	isCall,
	inCall,
}) {
	return (
		<>
			{inCall && !isCall && (
				<div className={style.inCall_wrapper}>
					<div
						id="callBtn"
						className={style.callBtn2}
						onClick={handelCall}
					>
						<img src={phone_img_src} alt="X" />
					</div>
					{/* <div className={style.downCallBtn} onClick={handelEndCall}>
						<img src={downCall_img_src} alt="X" />
					</div> */}
				</div>
			)}

			{isCall ? (
				<div className={style.callListWrapper}>
					<div className={style.keyboardBtn}>
						<img src={keyboard_img_src} alt="X" />
						{isCall ? <span>Клавиатура</span> : <span>Скрыть</span>}
					</div>
					<div className={style.downCallBtn} onClick={handelEndCall}>
						<img src={downCall_img_src} alt="X" />
					</div>

					<div
						id="muteBtn"
						onClick={handelMute}
						className={style.muteBtn}
					>
						<img src={mute_img_src} alt="X" />
						{mute ? <span>Вкл. мик</span> : <span>Выкл. мик</span>}
					</div>
				</div>
			) : (
				<>
					{!isCall && !inCall && (
						<div className={style.callListWrapper}>
							<div className={style.keyboardBtn}>
								<img src={keyboard_img_src} alt="X" />
								<span>Клавиатура</span>
							</div>
							<div
								id="callBtn"
								className={style.callBtn2}
								onClick={handelCall}
							>
								<img src={phone_img_src} alt="X" />
							</div>

							<div
								className={style.eraseBtn}
								onClick={removeHandler}
							>
								<img src={dell_btn_img_src} alt="X" />
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
}
