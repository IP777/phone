import style from "./MiddlePhoneKeyboard.module.css";

export default function MiddlePhoneKeyboard({
	handelCall,
	removeHandler,
	handelEndCall,
}) {
	return (
		<div className={style.callListWrapper}>
			<input type="button" value="Клавиатура" />
			<input type="button" value="Call" onClick={handelCall} />
			<input type="button" value="unCall" onClick={handelEndCall} />
			<input type="button" value="Remove" onClick={removeHandler} />
		</div>
	);
}
