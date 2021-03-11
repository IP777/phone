import "./MiddlePhineKeyboard.sass";
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
		<div className="callListWrapper">
			{isCall ? (
				<>
					<div className="keyboardBtn">
						<img src={keyboard_img_src} alt="X" />
						<span>Скрыть</span>
					</div>
					<div className="downCallBtn" onClick={handelCall}>
						<img src={downCall_img_src} alt="X" />
					</div>

					<div className="muteBtn" onClick={removeHandler}>
						<img src={mute_img_src} alt="X" />
						<span>Выкл. мик</span>
					</div>
				</>
			) : (
				<>
					<div className="keyboardBtn">
						<img src={keyboard_img_src} alt="X" />
						<span>Клавиатура</span>
					</div>
					<div className="callBtn2" onClick={handelCall}>
						<img src={phone_img_src} alt="X" />
					</div>

					<div className="eraseBtn" onClick={removeHandler}>
						<img src={dell_btn_img_src} alt="X" />
					</div>
				</>
			)}
		</div>
	);
}
