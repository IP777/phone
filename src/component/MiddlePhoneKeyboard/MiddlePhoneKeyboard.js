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
						{isCall ? <div>Клавиатура</div> : <div>Скрыть</div>}
					</div>
					<div className={style.downCallBtn} onClick={handelEndCall}>
						<img src={downCall_img_src} alt="X" />
					</div>

					<div onClick={handelMute} className={style.muteBtn}>
						<img src={mute_img_src} alt="X" />
						{mute ? <div>Вкл. мик</div> : <div>Выкл. мик</div>}
					</div>
				</div>
			) : (
				<>
					{!isCall && !inCall && (
						<div className={style.callListWrapper}>
							<div className={style.keyboardBtn}>
								<img src={keyboard_img_src} alt="X" />
								<div>Клавиатура</div>
							</div>
							<div
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
