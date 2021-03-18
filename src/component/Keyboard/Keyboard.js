import style from "./Keyboard.module.sass";

export default function Keyboard({ pressKey, phoneNumber }) {
	const lengthFunc = (val) => {
		phoneNumber.length !== 25 && pressKey(val);
	};

	const handlerOnClick = (e) => {
		lengthFunc(e.target.value);
	};
	const handelNullClick = () => {
		lengthFunc([0]);
	};
	const handlerOnRightClick = (e) => {
		e.preventDefault();

		if (phoneNumber.length === 0) {
			lengthFunc(["+", "3", "8", "0"]);
		} else {
			lengthFunc("+");
		}
	};

	return (
		<ul className={style.callBtn}>
			<li>
				<input type="button" value="1" onClick={handlerOnClick} />
			</li>
			<li>
				<input type="button" value="2" onClick={handlerOnClick} />
			</li>
			<li>
				<input type="button" value="3" onClick={handlerOnClick} />
			</li>
			<li>
				<input type="button" value="4" onClick={handlerOnClick} />
			</li>
			<li>
				<input type="button" value="5" onClick={handlerOnClick} />
			</li>
			<li>
				<input type="button" value="6" onClick={handlerOnClick} />
			</li>
			<li>
				<input type="button" value="7" onClick={handlerOnClick} />
			</li>
			<li>
				<input type="button" value="8" onClick={handlerOnClick} />
			</li>
			<li>
				<input type="button" value="9" onClick={handlerOnClick} />
			</li>
			<li>
				<input type="button" value="*" onClick={handlerOnClick} />
			</li>
			<li>
				<div
					className={style.zero}
					onClick={handelNullClick}
					onContextMenu={handlerOnRightClick}
					value="0"
				>
					<div>0</div>
					<div>+</div>
				</div>
			</li>
			<li>
				<input type="button" value="#" onClick={handlerOnClick} />
			</li>
		</ul>
	);
}
